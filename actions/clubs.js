import { Amplitude, DangerZone, Constants } from 'expo';
import idx from 'idx';
import {
  CREATE_CLUB,
  GET_CLUBS,
  JOIN_CLUB,
  LEAVE_CLUB,
  GET_COMMENTS_COUNT,
  ADD_LAST_SEEN,
} from './types';
import {
  addClub,
  getClubs as getClubsService,
  joinClub as joinClubService,
  leaveClub as leaveClubService,
  clubComments as clubCommentsService,
} from '../services/BookClubApi';
import { requestApi } from '../services/api';
import { registerNotificationToken, validatePasswordRecovery } from './account';
import { goBack } from './navigation';

export const createClub = book => async dispatch => {
  const response = await dispatch(
    requestApi({
      type: CREATE_CLUB,
      method: addClub,
      params: {
        name: book.title,
        author: book.authors,
        chapters: book.chapters,
        google_book_id: book.id,
        photo_url: book.cover,
      },
    }),
  );

  if (response.ok) {
    Amplitude.logEvent('bookclub.created');
    dispatch(getClubs());
    dispatch(registerNotificationToken());
  }
};

export const getClubs = () => async dispatch =>
  dispatch(
    await requestApi({
      type: GET_CLUBS,
      method: getClubsService,
    }),
  );

export const joinClub = params => async dispatch => {
  const response = await dispatch(
    requestApi({
      type: JOIN_CLUB,
      method: joinClubService,
      params,
    }),
  );

  if (response.ok) {
    dispatch(getClubs());

    Amplitude.logEvent('bookclub.joined');
    dispatch(registerNotificationToken());
  }
};

export const getCommentsCount = id => async dispatch => {
  await dispatch(
    requestApi({
      type: GET_COMMENTS_COUNT,
      method: clubCommentsService,
      params: { id },
    }),
  );
};

export const addLastSeen = (id, chapter, commentsCount, timestampt) => (
  dispatch,
  getState,
) => {
  const { clubs } = getState();
  let lastSeenComments = idx(clubs, _ => _.lastSeen[id]) || {};

  dispatch({
    type: ADD_LAST_SEEN,
    payload: {
      [id]: { ...lastSeenComments, [chapter]: { commentsCount, timestampt } },
    },
  });
};

export const leaveClub = params => async dispatch => {
  const response = await dispatch(
    requestApi({
      type: LEAVE_CLUB,
      method: leaveClubService,
      params,
    }),
  );

  if (response.ok) {
    dispatch(getClubs());
    Amplitude.logEvent('bookclub.left');
    goBack();
  }
};

export const shareClub = (id, code, title, cover) => async () => {
  try {
    const branchObject = await DangerZone.Branch.createBranchUniversalObject(
      `join_club/${id}/${code}`,
      {
        title,
        contentImageUrl: cover,
        contentDescription: `Hey, I started a ${title} BookClub and want you to join the conversation! Follow this link to download`,
      },
    );

    const shareOptions = {
      messageHeader: title,
      messageBody: `Hey, I started a ${title} BookClub and want you to join the conversation! Follow this link to download:\n\n`,
    };

    const linkProperties = {
      feature: 'share',
      channel: Constants.manifest.releaseChannel,
    };

    const { completed, error } = await branchObject.showShareSheet(
      shareOptions,
      linkProperties,
    );

    if (completed) {
      Amplitude.logEvent('bookclub.shared');
    } else if (error) {
      Amplitude.logEventWithProperties('members.invited.error', {
        type: 'share',
        error,
      });
    }
  } catch (error) {
    Amplitude.logEventWithProperties('bookclub.shared.error', {
      type: 'share',
      error,
    });
  }
};

export const parseUniversalLinks = (url, uri) => dispatch => {
  if (url && url.indexOf('join_club/') !== -1) {
    const data = url
      .substring(url.indexOf('join_club/') + 10, url.length)
      .split('/');

    const params = {
      id: data[0],
      join_code: data[1],
    };
    dispatch(joinClub(params));
  }
  if (uri && uri.indexOf('reset_password/') !== -1) {
    const data = uri
      .substring(uri.indexOf('reset_password/') + 14, uri.length)
      .split('/');

    const params = {
      id: data[1],
      reset_token: data[2],
    };
    dispatch(validatePasswordRecovery(params));
  }
};
