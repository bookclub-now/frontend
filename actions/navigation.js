import NavigationService from '../services/NavigationService';

export const navigateToCreateClub = () => {
  NavigationService.navigate('CreateClub');
};

export const goBack = () => {
  NavigationService.goBack();
};

export const navigateToSignUp = () => {
  NavigationService.navigate('SignUp');
};

export const navigateToLogin = () => {
  NavigationService.navigate('Login');
};

export const navigateToHome = () => {
  NavigationService.navigate('Main');
};

export const navigateToProfile = () => {
  NavigationService.navigate('Profile');
};

export const navigateToChapters = club => {
  NavigationService.navigate('Chapters', { club });
};

export const navigateToThread = params => {
  NavigationService.navigate('Thread', params);
};

export const navigateToTermsOfServices = () => {
  NavigationService.navigate('Terms');
};

export const navigateToResetPassword = params => {
  NavigationService.navigate('PasswordReset', { params });
};

export const selectNavigator = (authenticated, navigation, notification) => {
  if (authenticated) {
    if (notification) {
      NavigationService.navigate('Thread', {
        club: { id: notification.club_id },
        chapter: notification.chapter,
      });
    }
    navigation.navigate('Main');
  } else {
    navigation.navigate('Onboarding');
  }
};
