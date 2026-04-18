# Установка Android SDK Kotlin  

:::danger TODO
Актуализировать
:::

## Шаг 1. Установка SDK


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

## Шаг 2. Запуск сессии

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