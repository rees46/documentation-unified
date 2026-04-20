# Установка ReactNative SDK

:::danger TODO
Актуализировать. Доп параметры типа API host
:::

## Шаг 1. Установка SDK

Добавьте необходимые пакеты:

```bash 
yarn add @rees46/rn-sdk
yarn add @react-native-async-storage/async-storage
```

Мы поддерживаем [Expo](https://expo.dev). Это значит, что `react-native-device-info` больше не требуется добавлять вручную. 
Если вы не используете `Expo`, нужно добавить пакет:

```bash 
yarn add react-native-device-info
```

Для поддержки мобильных пушей также добавьте:

```bash
yarn add @react-native-firebase/app
yarn add @react-native-firebase/messaging
yarn add @notifee/react-native
```


## Шаг 2. Запуск сессии

Базовая инициализация SDK:

```javascript
import REES46 from '@rees46/rn-sdk';
const sdk = new REES46("YOUR_SHOP_ID");

// Инициализация асинхронная. В дальнейшем вы можете проверить, инициализирован ли SDK
if(sdk.isInit()) {
  
}
```

Дополнительные свойства:

| Свойство               | Назначение                                                                                                                |
|------------------------|---------------------------------------------------------------------------------------------------------------------------|
| `apiDomain`            | Кастомный домен REES46 API в случае on-premise                                                                            |
| `enableLogs`           | Булевый параметр для включения логов                                                                                      |
| `parentViewController` | Без этого параметра `in-app` попапы не будут показываться                                                                 |
| `needReInitialization` | Флаг необходимости провести переинициализацию SDK и запрос новых `did` и `sid` с сервера                                  |
| `sendAdvertisingId`    | Булевый флаг о том, чтобы вместо генерации `did` использовать `Apple Advertising Identifier (IDFA)`. По умолчанию `false` |

:::info Флаг `needReInitialization`
По-умолчанию мобильный SDK не делает повторных запросов к серверу во время инициализации, если в хранилище телефона уже есть `did` и `sid`.
Это ускоряет запуск приложения и уменьшает количество запросов к API.

Но если у вас в приложении есть выбор страны и для каждой страны есть отдельный ключ API, то `did` от одного магазина
не будет работать в другом и все запросы рекомендаций, поиска и пр. будут возвращаться с ошибкой.

Поэтому, при смене страны (по факту API-ключа) нужно вызвать инициализацию с этим флагом, чтобы SDK получил новый `did` с сервера.

При обычном запуске приложения в инициализации SDK этот флаг передавать не нужно.
:::

```javascript
const stream = 'iPhone';
const debug = true;
const autoSendPushToken = false;
const sdk = new REES46("YOUR_SHOP_ID", stream, debug, autoSendPushToken);
```

Инициализация с помощью Expo выглядит так:

```javascript
const stream = 'iPhone';
const debug = true;
const autoSendPushToken = false;
const sdk = new @rees46('YOUR_SHOP_ID', stream, debug, autoSendPushToken);
```

:::info TODO
Перенести в механики.
:::

Если вам нужна своя функция генерации `did`, это можно сделать следующим образом:

```javascript 
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

const stream = 'ios';
const debug = true;
const autoSendPushToken = false;
const sdk = new @rees46('YOUR_SHOP_ID', stream, debug, autoSendPushToken, {
  id: await getDeviceId(),
});
```


## Шаг 3. Получение mobile push токенов

### Для iOS

Откройте `ios/{projectName}/AppDelegate.m` и добавьте в начало файла:

```
#import <Firebase.h>
```

Откройте терминал, перейдите в папку проекта и выполните:

```bash
cd ios/
pod install
```

### Для Android

В файл `android/build.gradle` добавьте:

```
buildscript {
  dependencies {
    ...
    classpath 'com.google.gms:google-services:4.3.4'
  }
}
```

В файл `android/app/build.gradle` добавьте:

```
apply plugin: 'com.google.gms.google-services'
```

Инициализация без Expo:

```javascript
import REES46 from '@rees46/rn-sdk';

// Автоматически получаем mobile push токены. По умолчанию `true`
const autoSendPushToken = true;
const sdk = new REES46("YOUR_SHOP_ID", 'ios', true, autoSendPushToken);
```

Пример с Expo:

```javascript
// Автоматически получаем mobile push токены. По умолчанию `true`
const autoSendPushToken = true;
const sdk = new @rees46('YOUR_SHOP_ID', 'ios', false, autoSendPushToken);
```
