# Установка Android SDK Kotlin  

## Шаг 1. Установка SDK

Добавьте репозиторий JitPack в ваш файл сборки:

::: code-group
```gradle [settings.gradle]
dependencyResolutionManagement {
    repositoriesMode.set(RepositoriesMode.FAIL_ON_PROJECT_REPOS)
    repositories {
        mavenCentral()
        maven { url 'https://jitpack.io' }
    }
}
```

```gradle [settings.gradle.kts]
dependencyResolutionManagement {
    repositoriesMode.set(RepositoriesMode.FAIL_ON_PROJECT_REPOS)
    repositories {
        mavenCentral()
        maven { url = uri("https://jitpack.io") }
    }
}
```
:::

Добавьте в зависимости:

::: code-group
```gradle [settings.gradle]
dependencies {
    implementation 'com.github.rees46:android-sdk:Tag'
}
```

```gradle [settings.gradle.kts]
dependencies {
    implementation("com.github.rees46:android-sdk:Tag")
}
```
:::


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
import android.app.Application
import com.personalization.SDK

class MyApplication : Application() {

    lateinit var sdk: SDK

    override fun onCreate() {
        super.onCreate()

        sdk = SDK()
        sdk.initialize(
            context = applicationContext,
            shopId = "YOUR_SHOP_ID"
        )
    }
}
```

Параметр `context` – контекст приложения, необходимый для инициализации SDK.

SDK может инициализироваться как в простом режиме (пример выше), так и с расширениями. 

Пример с дополнительными свойствами:

```kotlin
sdk = SDK()
sdk.initialize(
    context = applicationContext,
    shopId = "YOUR_SHOP_ID",
    apiDomain = "api.rees46.ru",
    tag = "SDK",
    preferencesKey = "DEFAULT_STORAGE_KEY", // нужно чтобы развести стораджи для разных инстансов
    stream = "android",
    autoSendPushToken = true,
    needReInitialization = false,
    addTrailingSlash = true // добавляет слэш к appDomain 
)
```

| Свойство               | Значение по-умолчанию | Назначение                                                                                    |
|------------------------|-----------------------|-----------------------------------------------------------------------------------------------|
| `shopId`               |                       | API-ключ проекта                                                                              |
| `apiDomain`            | `api.rees46.ru`       | Кастомный домен REES46 API в случае on-premise                                                |
| `tag`                  | `SDK`                 | Тег для логов                                                                                 |
| `preferencesKey`       | `DEFAULT_STORAGE_KEY` | Нужно, чтобы разнести storage для разных инстансов, если есть выбор страны с разными `shopId` |
| `stream`               | `android`             | [Стрим](../entities/stream.md)                                                                |
| `autoSendPushToken`    | `true`                | Булевый флаг для автоматического запроса mobile push токена                                   |
| `needReInitialization` | `false`               | Флаг необходимости провести переинициализацию SDK и запрос новых `did` и `sid` с сервера      |
| `addTrailingSlash`     | `true`                | Добавляет слеш `/` к `apiDomain`                                                              |

:::info Флаг `needReInitialization`
По-умолчанию мобильный SDK не делает повторных запросов к серверу во время инициализации, если в хранилище телефона уже есть `did` и `sid`.
Это ускоряет запуск приложения и уменьшает количество запросов к API.

Но если у вас в приложении есть выбор страны и для каждой страны есть отдельный ключ API, то `did` от одного магазина
не будет работать в другом и все запросы рекомендаций, поиска и пр. будут возвращаться с ошибкой.

Поэтому, при смене страны (по факту API-ключа) нужно вызвать инициализацию с этим флагом, чтобы SDK получил новый `did` с сервера.

При обычном запуске приложения в инициализации SDK этот флаг передавать не нужно.
:::
