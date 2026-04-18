# Установка ReactNative SDK


:::danger TODO
Актуализировать
:::

## Шаг 1. Установка SDK

```javascript [React Native]

/* If you are using version 1.8 or above, you don't need to use permissions like SCHEDULE_EXACT_ALARM or USE_EXACT_ALARM. */

/* Add required packages: */

yarn add @rees46/rn-sdk
yarn add @react-native-async-storage/async-storage

/*  Starting from 4.0.0 we support [Expo](https://expo.dev). This means that 'react-native-device-info' no longer is required.*/

/* If your application doesn't use Expo:*/

yarn add react-native-device-info

/* If your application uses Expo, use this function to create a unique ID for each app Installation or create your own implementation*/

import * as Application from 'expo-application'
import * as SecureStore from 'expo-secure-store'
import 'react-native-get-random-values'
import { v4 as uuidv4 } from 'uuid'

async function getDeviceId() {
  if (Application.getAndroidId) {
    return Application.getAndroidId()
  }

  let uniqueId = await SecureStore.getItemAsync('uniqueId')
  if (!uniqueId) {
    uniqueId = uuidv4()
    await SecureStore.setItemAsync('uniqueId', uniqueId)
  }

  return uniqueId
}
/* RN SDK initialization with Expo will look like this:*/

const rnsdk = new @rees46('YOUR_SHOP_ID', 'stream', false, true, {
  id: await getDeviceId(),
});

/* For push notifications also add: */

yarn add @react-native-firebase/app
yarn add @react-native-firebase/messaging
yarn add @notifee/react-native
```


## Шаг 2. Запуск сессии

```javascript [React Native]

/* On application launch initialize the SDK: */

import REES46 from '@rees46/rn-sdk';

/*
   The parameter autoSendPushToken is responsible for automatically sending the push notification token upon initialization.
   Its default value is true, meaning the token will be sent automatically.
   Set it to false if you want to manage token sending manually.
*/

const sdk = new REES46("YOUR_SHOP_ID", "stream", "debug", "autoSendPushToken");

/* RN SDK initialization with Expo will look like this. You can use your own function implementation to create a unique ID for each application installation*/

const sdk = new @rees46('YOUR_SHOP_ID', 'stream', false, true, {
  id: await getDeviceId(),
});

/* Initialization is async, so you have a method to test, if SDK is initialized or not: */

sdk.isInit(); // returns true/false

/*

To collect push tokens, you need to make some platform-specific adjustments.

*/

// ** For iOS:

// Open your /ios/{projectName}/AppDelegate.m file, and add the following: At the top of the file, import the Firebase SDK:
import <Firebase.h>

  // Open a terminal window and navigate to the location of the Xcode project for your app

  cd ios/
  pod install

  // ** For Android

  // In your android/build.gradle

  buildscript {
    dependencies {
      ...
      //Add this \/
      classpath 'com.google.gms:google-services:4.3.4'
    }
  }
  

  // In your android/app/build.gradle add
  apply plugin: 'com.google.gms.google-services'
```
