# Установка iOS SDK 

:::danger TODO
Актуализировать
:::

Note: В мобильном приложении это делается только при запуске приложения.

## Шаг 1. Установка SDK


```swift 
// ## При работе с CocoaPods

// 1. В Podfile:
target '...' do
  // ...
  // 1.1. Добавьте это:
  pod 'REES46'
  // ...
end

// 1.2. И это (для того, чтобы работало в симуляторе)
post_install do |installer|
  installer.pods_project.build_configurations.each do |config|
    config.build_settings["EXCLUDED_ARCHS[sdk=iphonesimulator*]"] = "arm64"
  end
end

// ## Swift package manager (XCode >= 11)
// 1. Кликните меню File
// 2. Выберите "Swift Packages"
// 3. Кликните в "Add Package Dependency..."
// 4. Укажите URL репозитория с SDK: https://github.com/rees46/ios-sdk.git
```

## Шаг 2. Запуск сессии

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