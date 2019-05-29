import { AsyncStorage } from 'react-native';

const loadStateFromStorage = async () => {
  const storedState = await AsyncStorage.getItem('@Speakeasy:state');
  // TODO: if session is almost expired, login again (await), save storage (no await), then return
  return storedState ? JSON.parse(storedState) : null;
};

const saveStateToStorage = async state =>
  AsyncStorage.setItem('@Speakeasy:state', JSON.stringify(state));

const clearStateFromStorage = async () =>
  AsyncStorage.removeItem('@Speakeasy:state');

export default {
  loadStateFromStorage,
  saveStateToStorage,
  clearStateFromStorage,
};
