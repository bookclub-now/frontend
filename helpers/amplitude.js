import { logEvent } from '../services/eventLogger';

export const routeEvents = {
  Home: { name: 'home.viewed' },
  CreateClub: { name: 'createclub.viewed' },
  Chapters: { name: 'chapters.viewed' },
  Thread: { name: 'thread.viewed' },
  Profile: { name: 'profile.viewed' },
  Terms: { name: 'terms.viewed' },
};

export const logScreenView = routeName => {
  const event = routeEvents[routeName];
  if (event) logEvent(event.name, event.properties);
};
