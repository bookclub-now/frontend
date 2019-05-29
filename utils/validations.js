export const required = value =>
  value === null || value === '' || value === undefined
    ? 'Required'
    : undefined;

export const passwordConfirmation = (value, allValues) =>
  value !== allValues.password ? `Passwords don't match` : undefined;

export const email = value =>
  value && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)
    ? 'Invalid email address'
    : undefined;
