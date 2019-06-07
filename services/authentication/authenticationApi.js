import Config from '../../config';

/**
 * SignIn with email and password
 *
 * @param {string} email Email
 * @param {string} password Password
 *
 */
export const signIn = async ({ params }) => {
  const response = await fetch(`${Config.API_URL}/accounts/signin`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(params),
  });

  return handleResponse(response);
};

/**
 * Password recovery
 *
 * @param {string} email Email
 *
 */
export const passwordRecovery = async ({ params }) => {
  const response = await fetch(
    `${Config.API_URL}/accounts/password_reset/issue`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(params),
    },
  );

  return handleResponse(response);
};

/**
 * Check password recovery
 *
 * @param {string} id user id
 * @param {string} reset_token reset token
 *
 */
export const validatePasswordRecovery = async ({ params }) => {
  const response = await fetch(
    `${Config.API_URL}/accounts/password_reset/check_token`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(params),
    },
  );

  return handleResponse(response);
};

/**
 * Check password recovery
 *
 * @param {string} id user id
 * @param {string} reset_token reset token
 * @param {string} password new password
 *
 */
export const resetPassword = async ({ params }) => {
  const response = await fetch(`${Config.API_URL}/accounts/password_reset`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(params),
  });

  return handleResponse(response);
};

/**
 * SignUp request
 *
 * @param {string} first_name FirstName
 * @param {string} last_name LastName
 * @param {string} email Email
 * @param {string} phone_number PhoneNumber
 * @param {string} password Password
 */
export const signUp = async ({ params }) => {
  const response = await fetch(`${Config.API_URL}/accounts/signup`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(params),
  });

  return handleResponse(response);
};

export const profile = async ({ auth }) => {
  const uri = `${Config.API_URL}/accounts`;

  const response = await fetch(uri, {
    method: 'GET',
    headers: headers(auth),
  });

  return handleResponse(response);
};

const headers = auth => ({
  'Content-Type': 'application/json',
  accept: 'application/json',
  authorization: `Bearer ${auth.data.token}`,
});

const handleResponse = async response => {
  if (response.status === 500) throw new Error(await response.text());
  let body = '';
  if (response._bodyText) body = await response.json();
  return { ok: response.ok, status: response.status, body };
};
