import { createStackNavigator } from 'react-navigation';
import Welcome from '../screens/Welcome';
import Login from '../screens/Login';
import SignUp from '../screens/SignUp';
import PasswordRecovery from '../screens/PasswordRecovery';
import PasswordReset from '../screens/PasswordReset';
import NavigationService from '../services/NavigationService';

const OnboardingStack = createStackNavigator(
  {
    Login,
    SignUp,
    PasswordRecovery,
    PasswordReset,
    Welcome,
  },
  { transitionConfig: NavigationService.dynamicModalTransition },
);

export default OnboardingStack;
