import { createSwitchNavigator } from 'react-navigation';

import MainNavigator from './MainNavigator';
import OnboardingNavigator from './OnboardingNavigator';
import Loading from '../screens/Loading';

export default createSwitchNavigator(
  {
    LoadingScreen: Loading,
    Main: MainNavigator,
    Onboarding: OnboardingNavigator,
  },
  {
    initialRouteName: 'LoadingScreen',
  },
);
