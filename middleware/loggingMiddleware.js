import { logScreenView } from '../helpers/amplitude';

const loggingMiddleware = () => next => action => {
  switch (action.type) {
    case 'NAVIGATION_ROUTE_CHANGED':
      logScreenView(action.routeName);
      break;
  }
  try {
    return next(action);
  } catch (error) {
    // eslint-disable-next-line no-console
    // console.log(error);
    throw error;
  }
};

export default loggingMiddleware;
