import Config from '../../config';

export const getClubs = async ({ auth }) => {
  const uri = `${Config.API_URL}/clubs`;

  const response = await fetch(uri, {
    method: 'GET',
    headers: headers(auth),
  });

  return handleResponse(response);
};

export const addClub = async ({ params, auth }) => {
  const uri = `${Config.API_URL}/clubs`;

  const response = await fetch(uri, {
    method: 'POST',
    headers: headers(auth),
    body: JSON.stringify(params),
  });

  return handleResponse(response);
};

export const registerNotificationToken = async ({ params, auth }) => {
  const uri = `${Config.API_URL}/accounts/add_expo_push_token`;

  const response = await fetch(uri, {
    method: 'POST',
    headers: headers(auth),
    body: JSON.stringify(params),
  });

  return handleResponse(response);
};

export const removeNotificationToken = async ({ params, auth }) => {
  const uri = `${Config.API_URL}/accounts/remove_expo_push_token`;

  const response = await fetch(uri, {
    method: 'POST',
    headers: headers(auth),
    body: JSON.stringify(params),
  });

  return handleResponse(response);
};

export const joinClub = async ({ params, auth }) => {
  const uri = `${Config.API_URL}/clubs/${params.id}/join`;

  const response = await fetch(uri, {
    method: 'POST',
    headers: headers(auth),
    body: JSON.stringify(params),
  });

  return handleResponse(response);
};

export const clubComments = async ({ params, auth }) => {
  const uri = `${Config.API_URL}/clubs/${params.id}/chat_info`;

  const response = await fetch(uri, {
    method: 'GET',
    headers: headers(auth),
  });

  return handleResponse(response);
};

export const leaveClub = async ({ params, auth }) => {
  const uri = `${Config.API_URL}/clubs/${params.id}/join`;

  const response = await fetch(uri, {
    method: 'DELETE',
    headers: headers(auth),
    body: JSON.stringify(params),
  });

  return handleResponse(response);
};

const headers = auth => ({
  'Content-Type': 'application/json',
  accept: 'application/json',
  authorization: `Bearer ${auth.data.token}`,
});

const handleResponse = async response => {
  if (response.status === 500 || response.status === 401)
    throw new Error(await response.text());
  let body = '';
  if (response._bodyText) body = await response.json();
  return { ok: response.ok, status: response.status, body };
};
