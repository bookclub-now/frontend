import { Amplitude } from 'expo';

export const logEvent = (eventName, properties = {}) => {
  if (properties) Amplitude.logEventWithProperties(eventName, properties);
  else Amplitude.logEvent(eventName);

  // eslint-disable-next-line no-console
  // if (__DEV__) console.log('Logged event', eventName, properties);
};
