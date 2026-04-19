# Установка Android SDK Kotlin  

:::danger TODO
Актуализировать.
Выяснить про остальные свойства: стрим, коллбэки
:::

## Шаг 1. Установка SDK

Добавьте в зависимости:

```kotlin
dependencies {
    implementation 'com.rees46:rees46-sdk:+'
}
```

Добавьте в `build.gradle` проекта:

```kotlin
buildscript {
    dependencies {
        ...
        classpath 'com.google.gms:google-services:4.3.10'
    }
}
```

Добавьте в `build.gradle` модуля приложения после строки `id 'com.android.application'`:

```kotlin
plugins {
    id 'com.google.gms.google-services'
    id 'org.jetbrains.kotlin.android'
}
```

Создайте свое приложение в консоли Firebase и скопируйте файл `google-services.json` в корень проекта. Синхронизируйте `gradle`.

:::info Версии библиотек, используемые в SDK: 
- Java 22
- Kotlin 2.0.0
- Gradle 8.8
- Android Gradle Plugin 8.5.1
:::

Если ваше приложение использует `Dagger` для `dependency injection`, не удаляйте зависимости `Dagger`.
`Dagger` и `kapt` должны оставаться в файлах `gradle`. Структура проекта будет похожа на этот пример:

```kotlin
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

Добавьте в класс `Application`:

```kotlin
private lateinit var sdk: SDK

override fun onCreate(savedInstanceState: Bundle?) {
  super.onCreate(savedInstanceState)
  sdk = SDK()
  
  sdk.initialize(
    context = context,
    shopId = "SHOP_ID"
  )
}
```

Параметр `context` – контекст приложения, необходимый для инициализации SDK.

SDK может инициализироваться как в простом режиме (пример выше), так и с расширениями. 

Пример с дополнительными свойствами:

```kotlin
sdk.initialize(
    context = context,
    shopId = SHOP_ID,
    apiDomain = API_DOMAIN,
    tag = TAG,
    autoSendPushToken = true,
    needReInitialization = false
  )
```

| Свойство               | Назначение                                                                |
|------------------------|---------------------------------------------------------------------------|
| `apiDomain`            | Кастомный домен REES46 API в случае on-premise                            |
| `tag`                  | Тег для логов. По-умолчанию `SDK`                                         |
| `autoSendPushToken`    | Булевый флаг для автоматического запроса mobile push токена               |
| `needReInitialization` | Флаг необходимости провести переинициализацию SDK и очистки хранилища SDK |


