# BookClub Mobile App

A project Description

## Installation

1. Create an [Expo](https://expo.io/) account.
2. Install Expo CLI: `npm install expo --global`
3. Download iOS or Android Expo app on your device.
4. Login to Expo in the app and via command-line (`expo login`)
5. Install dependencies: `yarn install`
6. Run app: `npm start` and type `i` to open in iOS Simulator

## Publishing

### Via Expo:

```
expo publish --release-channel prod
```

### To App Store

```
expo build:ios --release-channel prod
```

1. Upload .ipa via Application Loader

### To Play Store

```
expo build:android --release-channel prod
```

Then upload .apk to Google Play Console
