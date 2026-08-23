# Установка Flutter SDK


## Шаг 1. Установка SDK

Добавьте пакет в проект:

```bash
flutter pub add rees46_sdk
```

Или вручную в `pubspec.yaml`:

```yaml
dependencies:
  rees46_sdk: ^0.2.0
```

Весь публичный API экспортируется одним импортом:

```dart
import 'package:rees46_sdk/rees46_sdk.dart';
```

Flutter SDK — тонкая обёртка над нативными [Android](https://github.com/rees46/android-sdk)
и [iOS](https://github.com/rees46/ios-sdk) SDK: хранилище, сессия, идентификаторы и доставка
пушей работают на нативной стороне. Нативные зависимости подтягиваются вместе с пакетом,
добавлять их отдельно не нужно.

### Android

Единственное требование к приложению — `minSdk 24`. Актуальные версии Flutter используют это
значение по умолчанию, так что в свежем проекте менять ничего не нужно. Задайте его явно,
только если в `android/app/build.gradle.kts` прописано меньшее значение:

```kotlin
android {
    defaultConfig {
        minSdk = 24
    }
}
```

Нативный Android SDK публикуется на JitPack. Плагин объявляет этот репозиторий в своём
Gradle-модуле, поэтому обычному проекту правки не нужны. Но если в
`android/settings.gradle.kts` репозитории объявлены централизованно
(`RepositoriesMode.FAIL_ON_PROJECT_REPOS` или `PREFER_SETTINGS`), добавьте JitPack туда —
иначе зависимость не разрешится:

```kotlin
dependencyResolutionManagement {
    repositoriesMode.set(RepositoriesMode.FAIL_ON_PROJECT_REPOS)
    repositories {
        google()
        mavenCentral()
        maven(url = "https://jitpack.io")
    }
}
```

Для мобильных пушей создайте приложение в консоли Firebase, положите `google-services.json`
в `android/app/` и подключите плагин Google Services в `android/app/build.gradle.kts`:

```kotlin
plugins {
    id("com.google.gms.google-services")
}
```

:::info Версия Java
Версию Java в приложении подгонять под плагин не нужно: `compileOptions` и `jvmTarget`
действуют только на тот модуль, где объявлены. Приложение на Java 8 или 11 собирается с
плагином, скомпилированным на Java 17. Важна версия JDK, на котором работает сам Gradle, —
для Android Gradle Plugin 8 нужен JDK 17 или новее.
:::

### iOS

Отдельных шагов не требуется: podspec плагина сам объявляет нативную зависимость и
минимальную версию iOS 13.0, `pod install` выполняется в составе `flutter run`, а плагин
регистрирует собственный application delegate — править `AppDelegate` не нужно.

Для мобильных пушей включите в Xcode у таргета `Runner` возможности **Push Notifications**
и **Background Modes** → *Remote notifications*, а ключ APNs загрузите в личный кабинет REES46.


## Шаг 2. Запуск сессии

Инициализируйте SDK один раз и как можно раньше — обычно в `main()` до `runApp`.
Минимально необходимый режим старта сессии:

```dart
import 'package:flutter/widgets.dart';
import 'package:rees46_sdk/rees46_sdk.dart';

late final PersonalizationSdk sdk;

void main() {
  WidgetsFlutterBinding.ensureInitialized();

  sdk = Rees46.initialize(
    const Rees46Config(shopId: 'YOUR_SHOP_ID'),
  );

  runApp(const MyApp());
}
```

Точка входа в SDK — класс `Rees46`. Метод `Rees46.initialize` возвращает хэндл синхронно и
запускает нативную инициализацию в фоне. Вызовы, сделанные сразу после него, ставятся в
очередь на нативной стороне до готовности сессии, поэтому хэндлом можно пользоваться сразу.

Пример со всеми возможными параметрами:

```dart
sdk = Rees46.initialize(
  const Rees46Config(
    shopId: 'YOUR_SHOP_ID',
    apiDomain: 'api.rees46.ru',
    stream: 'android',
    autoSendPushToken: true,
    needReInitialization: false,
  ),
);
```

Дополнительные свойства для расширенного управления SDK:


| Свойство               | Значение по-умолчанию | Назначение                                                                               |
|------------------------|-----------------------|------------------------------------------------------------------------------------------|
| `shopId`               | —                     | API-ключ проекта. Единственный обязательный параметр                                      |
| `apiDomain`            | `api.rees46.ru`       | Кастомный домен REES46 API в случае on-premise                                            |
| `stream`               | `android` / `ios`     | [Стрим](../entities/stream.md). По умолчанию — текущая платформа                          |
| `autoSendPushToken`    | `true`                | Автоматически получать mobile push токен                                                  |
| `needReInitialization` | `false`               | Флаг необходимости провести переинициализацию SDK и запрос новых `did` и `sid` с сервера   |

:::info Ошибки инициализации
`Rees46.initialize` не возвращает `Future`, поэтому неверная конфигурация проявляется как
`PlatformException` на первом же вызове через хэндл: код `bad_args` — пустой `shopId`,
код `init_failed` — ошибка нативной инициализации.
:::

:::info Флаг `needReInitialization`
По-умолчанию мобильный SDK не делает повторных запросов к серверу во время инициализации, если в хранилище телефона уже есть `did` и `sid`.
Это ускоряет запуск приложения и уменьшает количество запросов к API.

Но если у вас в приложении есть выбор страны и для каждой страны есть отдельный ключ API, то `did` от одного магазина
не будет работать в другом и все запросы рекомендаций, поиска и пр. будут возвращаться с ошибкой.

Поэтому, при смене страны (по факту API-ключа) нужно вызвать инициализацию с этим флагом, чтобы SDK получил новый `did` с сервера.

При обычном запуске приложения в инициализации SDK этот флаг передавать не нужно.
:::

Пример:

```dart
final sdk = Rees46.initialize(
  Rees46Config(
    shopId: AppEnvironments.shopId,
    apiDomain: AppEnvironments.apiDomain,
    needReInitialization: true,
  ),
);
```

Проверить, что сессия поднялась, можно так:

```dart
final sid = await sdk.getSid();   // идентификатор сессии
final did = await sdk.getDid();   // идентификатор устройства, выданный REES46
```

Непустой `did` означает, что нативный SDK завершил обмен с API.


## Шаг 3. Несколько магазинов в одном приложении

Одно приложение может работать с несколькими магазинами одновременно — например, когда для
каждой страны используется свой ключ API. Каждый магазин получает собственный нативный
инстанс с изолированным хранилищем, сессией и `did`, поэтому переинициализация из шага 2
в этом сценарии не нужна.

Магазины можно зарегистрировать заранее и инициализировать при первом обращении:

```dart
Rees46.registerShops(const [
  Rees46Config(shopId: 'SHOP_ID_A'),
  Rees46Config(shopId: 'SHOP_ID_B'),
]);

final shopA = Rees46.getInstance('SHOP_ID_A');
```

Передайте `eagerInit: true`, чтобы проинициализировать все магазины сразу.

| Метод                             | Назначение                                                                          |
|-----------------------------------|-------------------------------------------------------------------------------------|
| `Rees46.initialize(config)`       | Инициализирует магазин немедленно и возвращает хэндл                                 |
| `Rees46.registerShops(configs)`   | Регистрирует магазины; инициализация — при первом обращении                          |
| `Rees46.getInstance([shopId])`    | Возвращает хэндл магазина                                                            |
| `Rees46.isInitialized([shopId])`  | Проверяет, поднят ли инстанс магазина                                                |

:::info Обращение к инстансу
`Rees46.getInstance()` без аргумента работает, только пока зарегистрирован ровно один магазин.
Если магазинов несколько, метод выбросит `AmbiguousShopException` — обращайтесь к инстансам
явно, по `shopId`. Для незарегистрированного идентификатора выбрасывается
`UnknownShopIdException`.
:::
