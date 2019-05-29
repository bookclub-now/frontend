import { stopSubmit, setSubmitSucceeded } from 'redux-form';

/* eslint-disable consistent-return */
const apiRequest = ({ type, params }) => ({
  type: `${type}_REQUEST`,
  requestType: type,
  params,
});

const apiResponse = ({ type, params, response }) => ({
  type: `${type}_RESPONSE`,
  requestType: type,
  response,
  params,
});

const apiError = ({ type, params, error }) => ({
  type: `${type}_ERROR`,
  requestType: type,
  params,
  error: { error, type },
});

export const requestApi = ({ type, method, params, form }) => async (
  dispatch,
  // eslint-disable-next-line no-unused-vars
  getState,
) => {
  try {
    dispatch(apiRequest({ type, params }));

    const { account } = getState();
    const auth = {
      data: {
        token: account.token,
      },
    };

    const response = await method({ auth, params });

    switch (response.status) {
      // dispatch(logout());
      // break;
      case 401:
        dispatch(apiError({ type, params, error: response }));
        return response;
      case 422:
      case 403:
        dispatch(apiError({ type, params, error: response }));
        dispatch(stopSubmit(form, response.body.errors));
        return response;
      case 200:
      case 201:
      case 204:
        dispatch(apiResponse({ type, params, response }));
        dispatch(setSubmitSucceeded(form));
        return response;
      default:
        // TODO auto-retry downtime errors (test out restarting the server)
        throw new Error(`Unhandled API response ${response.status}`);
    }
  } catch (error) {
    // Logger.error(error, { params, state: getState() });
    dispatch(apiError({ type, params, error }));
    throw error;
  }
};
