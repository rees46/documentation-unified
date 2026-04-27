# Установка ReactNative SDK

:::danger TODO
Актуализировать. Доп параметры типа API host
:::

## Шаг 1. Установка SDK

Добавьте необходимые пакеты:

```bash 
yarn add @rees46/react-native-sdk
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
import REES46 from '@rees46/react-native-sdk';
const stream = Platform.OS;
const enableLogs = true;
const autoSendPushToken = true;
const sdk = new REES46("YOUR_SHOP_ID", stream, enableLogs, autoSendPushToken);

// Инициализация асинхронная. В дальнейшем вы можете проверить, инициализирован ли SDK
if(sdk.isInit()) {
  
}
```

Дополнительные свойства:

| Свойство               | Значение по-умолчанию | Назначение                                                                               |
|------------------------|-----------------------|------------------------------------------------------------------------------------------|
| `shopId`               |                       | API-ключ проекта                                                                         |
| `stream`               |                       | [Стрим](../entities/stream.md)                                                           |
| `autoSendPushToken`    | `true`                | Булевый флаг для автоматического запроса mobile push токена                              |
| `enableLogs `          | `true`                | Булевый флаг включения логов                                                             |


Инициализация с помощью Expo выглядит так:

```javascript
const stream = 'ios';
const debug = true;
const autoSendPushToken = true;
const sdk = new @rees46('YOUR_SHOP_ID', stream, debug, autoSendPushToken);
```

[//]: # (:::info TODO)

[//]: # (Перенести в механики)

[//]: # (:::)

[//]: # ()
[//]: # (Если вам нужна своя функция генерации `did`, это можно сделать следующим образом:)

[//]: # ()
[//]: # (```javascript )

[//]: # (import * as Application from 'expo-application')

[//]: # (import * as SecureStore from 'expo-secure-store')

[//]: # (import 'react-native-get-random-values')

[//]: # (import { v4 as uuidv4 } from 'uuid')

[//]: # ()
[//]: # (async function getDeviceId&#40;&#41; {)

[//]: # (  if &#40;Application.getAndroidId&#41; {)

[//]: # (    return Application.getAndroidId&#40;&#41;)

[//]: # (  })

[//]: # ()
[//]: # (  let uniqueId = await SecureStore.getItemAsync&#40;'uniqueId'&#41;)

[//]: # (  if &#40;!uniqueId&#41; {)

[//]: # (    uniqueId = uuidv4&#40;&#41;)

[//]: # (    await SecureStore.setItemAsync&#40;'uniqueId', uniqueId&#41;)

[//]: # (  })

[//]: # ()
[//]: # (  return uniqueId)

[//]: # (})

[//]: # ()
[//]: # (const stream = 'ios';)

[//]: # (const debug = true;)

[//]: # (const autoSendPushToken = false;)

[//]: # (const sdk = new @rees46&#40;'YOUR_SHOP_ID', stream, debug, autoSendPushToken, {)

[//]: # (  id: await getDeviceId&#40;&#41;,)

[//]: # (}&#41;;)

[//]: # (```)


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
import REES46 from '@rees46/react-native-sdk';

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
