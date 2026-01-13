# Подключение SDK

## Установка SDK

Для автоматической идентификации анонимных посетителей на сайте и в мобильных приложениях необходимо установить SDK:

::: code-group

```javascript [Web]

// Put this code in the <head> section of web page.
// During initialization, the cookieless parameter is set to false by default.
// If cookies are unavailable in the browser, the cookieless parameter is set to true.
// When cookieless is true, local storage is used instead of cookies.
(function(r){
    window.r46=window.r46||function(){(window.r46.q=window.r46.q||[]).push(arguments)};
    var c="https://cdn.rees46.ru",v="/v3.js",s={link:[{href:c,rel:"dns-prefetch"},{href:c,rel:"preconnect"},{href:c+v,rel:"preload",as:"script"}],script:[{src:c+v,async:""}]};
    Object.keys(s).forEach(function(c){s[c].forEach(function(d){var e=document.createElement(c),a;for(a in d)e.setAttribute(a,d[a]);document.head.appendChild(e)})});
})();
```

```swift [iOS]

// Cocoapods
target '...' do
  // ...
  // Add this
  pod 'REES46'
  // ...
end
// ... and this (to be able to run it on simulators):
post_install do |installer|
  installer.pods_project.build_configurations.each do |config|
    config.build_settings["EXCLUDED_ARCHS[sdk=iphonesimulator*]"] = "arm64"
  end
end

// Swift package manager (XCode >= 11)
// 1. Click File menu
// 2. Swift Packages
// 3. Add Package Dependency...
// 4. Specify the git URL for SDK repo: https://github.com/rees46/ios-sdk.git
```

```kotlin [Android Kotlin]

// 1. Add to dependencies:
dependencies {
    implementation 'com.rees46:rees46-sdk:+'
}

// 2. Append to your project build.gradle
buildscript {
    dependencies {
        ...
        classpath 'com.google.gms:google-services:4.3.10'
    }
}

// 3. Append to your app module `build.gradle` after line `id 'com.android.application'`
plugins {
    id 'com.google.gms.google-services'
    id 'org.jetbrains.kotlin.android'
}

// 4. Create your app in the Firebase console
//    and copy file google-services.json to your app root path.
//    Sync gradle now.

// 5. Library versions used in the SDK:
// Java 22
// Kotlin 2.0.0
// Gradle 8.8
// Android Gradle Plugin 8.5.1

// If your application uses Dagger for dependency injection, don't delete Dagger dependencies.
// If you use Dagger, its dependencies and the kapt plugin must remain in your gradle files.
// The structure for such a project should look similar to the example below:

plugins {
    id 'kotlin-kapt'
}

dependencies {
    implementation 'com.rees46:rees46-sdk:+'
    implementation 'com.google.dagger:dagger:DAGGER_VERSION'
    kapt 'com.google.dagger:dagger-compiler:DAGGER_COMPILER_VERSION'
}
```

```java [Android Java]

// DEPRECATED

// 1. Add to dependencies:
implementation 'com.rees46:rees46-sdk:+'
implementation 'com.google.firebase:firebase-bom:29.0.3'
implementation 'com.google.firebase:firebase-messaging:23.0.0'

// 2. Append to your project build.gradle
buildscript {
    dependencies {
        ...
        classpath 'com.google.gms:google-services:4.3.10'
    }
}

// 3. Append to your app module build.gradle after line apply plugin: 'com.android.application'
apply plugin: 'com.google.gms.google-services'

// 4. Create your app in the Firebase console
//    and copy file google-services.json to your app root path.
//    Sync gradle now.

// 5. Library versions used in the SDK:
// Java 22
// Kotlin 2.0.0
// Gradle 8.8
// Android Gradle Plugin 8.5.1
```

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

:::

## Запуск сессии

После установки SDK необходимо стартовать сессию пользователя. На сайте это делается при каждом открытии каждой страницы сайта. В мобильном приложении это делается только при запуске приложения.

::: code-group

```javascript [Web]

/*
Put this line right after setup code
*/
r46('init', 'SHOP_ID', 'STREAM', success, failure, options, isSpa);

/*
Cookie-less Mode
*/
const options = {
  cookieless: false
};

r46('init', 'SHOP_ID', 'STREAM', success, failure, options);
/*
Control of device ID
If you use any external device management system,
your own device ID can be assigned to the client.
*/
const options = {
  did: 'example'
};

r46('init', 'SHOP_ID', 'STREAM', success, failure, options);
/*
SPA support mode
The default value of the isSpa parameter is false.
The client's session ID is checked during the tracking process.
The check starts only if isSpa parameter is true.
If the session ID has expired, a new one will be requested from the server.
*/
const isSpa = true;

r46('init', 'SHOP_ID', 'STREAM', success, failure, options, isSpa);

/*
In the options parameter, custom domains can be configured
through which API requests will be routed.
api_host — custom value for API requests
cdn_host — URL for CDN requests. If empty, the default value will be used
pictures_host — URL for pictures. If empty, the default value will be used
*/
r46('init', 'SHOP_ID', 'STREAM', null, null, {
  api_host: 'api.custom.com',
  cdn_host: '',
  pictures_host: undefined,
});
```

```swift [iOS]

/*
shopId – Required parameter. The shop identifier.
apiDomain – API domain for server communication.
enableLogs – Optional parameter. Enables logs for debugging purposes during development.
parentViewController – Optional parameter. Without it, in-app notifications will not be displayed.
needReInitialization – Optional parameter. Allows reinitialization of the SDK and clears local storage.
sendAdvertisingId – Optional parameter. Default value is false. If set to true, the SDK will attempt to send the Apple Advertising Identifier (IDFA).

Important:

If you set sendAdvertisingId to true, you must add the NSUserTrackingUsageDescription key to your application's Info.plist file. This is a mandatory requirement.

When sendAdvertisingId is true and the NSUserTrackingUsageDescription key is present in Info.plist, the iOS SDK will automatically handle requesting user permission to access IDFA.

*/

import REES46

sdk = createPersonalizationSDK(
  shopId: AppEnvironments.shopId,
  apiDomain: AppEnvironments.apiDomain,
  enableLogs: true,
  parentViewController: (window?.rootViewController)!,
  needReInitialization: true,
  sendAdvertisingId: true,
  { error in
      // Assign the SDK instance to a global variable for reuse across the application.
      globalSDK = self.sdk

      // Notify other parts of the application about the successful initialization of the SDK.
      NotificationCenter.default.post(name: globalSDKNotificationNameMainInit, object: nil)
  }
)

```

```kotlin [Android Kotlin]

private lateinit var sdk: SDK

/**
 * Entry point for the application's activity where the SDK is initialized.
 * The SDK supports two types of initialization:
 * - **Basic Initialization:** Only the required parameters are provided for minimal configuration.
 * - **Extended Initialization:** Includes optional parameters for more advanced customization.
 *
 * You can choose the initialization method that best suits your application's needs.
 */
override fun onCreate(savedInstanceState: Bundle?) {
  super.onCreate(savedInstanceState)
  sdk = SDK()

  /**
  * Initializes the SDK with a simple configuration.
  * This method is suitable if you only need the basic functionality of the SDK.
  *
  * @param context Context - Required. The application context used for SDK initialization.
  * @param shopId String - Required. The shop identifier, necessary for the SDK to function.
  *
  * @example
  * sdk.initialize(
  *  context = applicationContext,
  *  shopId = "YOUR_SHOP_ID"
  * )
  */
  sdk.initialize(
    context = context,
    shopId = shopId
  )

  /**
  * Initializes the SDK with an extended configuration.
  * This method provides additional options for advanced use cases.
  *
  * @param context Context - Required. The application context used for SDK initialization.
  * @param shopId String - Required. The shop identifier, necessary for the SDK to function.
  * @param apiDomain String? - Optional. The API domain that the SDK will interact with. Default is null.
  * @param tag String? - Optional. A tag used for configuring logs, making it easier to identify SDK messages.
  *                      Default value is "SDK," but you can specify your own tag name.
  * @param autoSendPushToken Boolean - Optional. Enables automatic token sending during initialization. Default is true.
  * @param needReInitialization Boolean - Optional. Allows you to reinitialize the SDK and clear the storage. Default is false.
  *
  * @example
  * sdk.initialize(
  *   context = applicationContext,
  *   shopId = "YOUR_SHOP_ID",
  *   apiDomain = "YOUR_API_DOMAIN",
  *   tag = "CustomTag",
  *   autoSendPushToken = true,
  *   needReInitialization = false
  * )
  */
  sdk.initialize(
    context = applicationContext,
    shopId = SHOP_ID,
    apiDomain = API_DOMAIN,
    tag = TAG,
    autoSendPushToken = true,
    needReInitialization = false
  )
}
```

```java [Android Java]

// DEPRECATED

private rees46 rees46;

@Override
public void onCreate() {
  super.onCreate();
    sdk = rees46.initialize(getApplicationContext(), SHOP_ID, API_DOMAIN);
}
```

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

:::
