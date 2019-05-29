import {
  NavigationActions,
  StackActions,
  StackViewTransitionConfigs,
} from 'react-navigation';

const IOS_MODAL_ROUTES = ['PasswordRecovery', 'PasswordReset', 'CreateClub'];

let _navigator;

function setTopLevelNavigator(navigatorRef) {
  _navigator = navigatorRef;
}

function navigate(routeName, params) {
  _navigator.dispatch(
    NavigationActions.navigate({
      routeName,
      params,
    }),
  );
}

function goBack(key = null) {
  _navigator.dispatch(NavigationActions.back({ key }));
}

function reset(routeName, params) {
  _navigator.dispatch(
    StackActions.reset({
      index: 0,
      actions: [
        NavigationActions.navigate({
          routeName,
          params,
        }),
      ],
    }),
  );
}

function getActiveRouteParams(navigationState) {
  if (!navigationState) navigationState = _navigator.state.nav;
  const route = navigationState.routes[navigationState.index];

  // dive into nested navigators
  if (route.routes) return getActiveRouteParams(route);

  return route.params;
}

function getActiveRouteName(navigationState) {
  if (!navigationState) navigationState = _navigator.state.nav;
  const route = navigationState.routes[navigationState.index];

  // dive into nested navigators
  if (route.routes) return getActiveRouteName(route);

  return route.routeName;
}

const dynamicModalTransition = (transitionProps, prevTransitionProps) => {
  const isModal = IOS_MODAL_ROUTES.some(
    screenName =>
      screenName === transitionProps.scene.route.routeName ||
      (prevTransitionProps &&
        screenName === prevTransitionProps.scene.route.routeName),
  );
  return StackViewTransitionConfigs.defaultTransitionConfig(
    transitionProps,
    prevTransitionProps,
    isModal,
  );
};

export default {
  navigate,
  setTopLevelNavigator,
  goBack,
  reset,
  getActiveRouteName,
  getActiveRouteParams,
  dynamicModalTransition,
};
