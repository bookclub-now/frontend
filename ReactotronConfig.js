import Reactotron from 'reactotron-react-native';
import { reactotronRedux } from 'reactotron-redux';

import { NativeModules } from 'react-native';

let scriptHostname;
if (__DEV__) {
  /* eslint-disable prefer-destructuring */
  scriptHostname = NativeModules.SourceCode.scriptURL
    .split('://')[1]
    .split(':')[0];
}

const reactotron = Reactotron.configure({ host: scriptHostname })
  .useReactNative()
  .use(reactotronRedux());

export default reactotron;
