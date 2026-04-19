# Установка Android SDK Java  

:::danger Устарело
Java SDK устарел и поддерживаться не будет. Используйте [Kotlin](./kotlin.md).
:::

## Шаг 1. Установка SDK

Добавьте в зависимости:

```java
implementation 'com.rees46:rees46-sdk:+'
implementation 'com.google.firebase:firebase-bom:29.0.3'
implementation 'com.google.firebase:firebase-messaging:23.0.0'
```

Добавьте в `build.gradle` проекта:

```java
buildscript {
    dependencies {
        // ...
        classpath 'com.google.gms:google-services:4.3.10'
    }
}
```

Добавьте в `build.gradle` модуля после строки `com.android.application`

```java
apply plugin: 'com.google.gms.google-services'
```

Создайте свое приложение в консоли Firebase и скопируйте файл `google-services.json` в корень проекта. Синхронизируйте `gradle`.

:::info Версии библиотек, используемые в SDK:
- Java 22
- Kotlin 2.0.0
- Gradle 8.8
- Android Gradle Plugin 8.5.1- 
:::


## Шаг 2. Запуск сессии

```java
private rees46 rees46;

@Override
public void onCreate() {
  super.onCreate();
    sdk = rees46.initialize(getApplicationContext(), SHOP_ID, API_DOMAIN);
}
```