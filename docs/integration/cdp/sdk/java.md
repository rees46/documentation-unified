# Установка Android SDK Java  

:::danger Устарело
Java SDK устарел и поддерживаться не будет. Используйте [Kotlin](./kotlin.md).
:::


:::danger TODO
Актуализировать
:::

## Шаг 1. Установка SDK

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


## Шаг 2. Запуск сессии

```java [Android Java]

// DEPRECATED

private rees46 rees46;

@Override
public void onCreate() {
  super.onCreate();
    sdk = rees46.initialize(getApplicationContext(), SHOP_ID, API_DOMAIN);
}
```