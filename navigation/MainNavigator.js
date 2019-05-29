import { createStackNavigator } from 'react-navigation';
import Home from '../screens/Home';
import CreateClub from '../screens/CreateClub';
import Chapters from '../screens/Chapters';
import Thread from '../screens/Thread';
import Profile from '../screens/Profile';
import Terms from '../screens/Terms';
import NavigationService from '../services/NavigationService';

const MainStack = createStackNavigator(
  {
    Home,
    CreateClub,
    Chapters,
    Thread,
    Profile,
    Terms,
  },
  { transitionConfig: NavigationService.dynamicModalTransition },
);

export default MainStack;
