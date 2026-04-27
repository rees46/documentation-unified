# Установка iOS SDK 

:::danger TODO
Актуализировать.
Выяснить про остальные свойства: стрим, коллбэки
:::

Note: В мобильном приложении это делается только при запуске приложения.

## Шаг 1. Установка SDK

### Cocoapods

Добавьте в Podfile:

```bash
target 'MyApp' do
  use_frameworks!
  pod 'REES46'
  # ...
end

# Чтобы работало в симуляторе
post_install do |installer|
  installer.pods_project.build_configurations.each do |config|
    config.build_settings["EXCLUDED_ARCHS[sdk=iphonesimulator*]"] = "arm64"
  end
end
```

### Swift Package Manager

1. Кликните меню `File`
2. Выберите `Swift Packages`
3. Кликните `Add Package Dependency...`
4. Укажите URL репозитория с SDK: `https://github.com/rees46/ios-sdk.git`


## Шаг 2. Запуск сессии

Минимально необходимый режим старта сессии:

```swift 
import REES46

personalizationSDK = createPersonalizationSDK(shopId: "YOUR_SHOP_ID") { error in
  if let error {
    // Инициализация завершилась с ошибкой, можно ее обработать
    return
  }
  // Сессия поднята, только теперь можно вызывать методы SDK. Обновляйте UI на главном потоке
}
```

Пример со всеми возможными параметрами:

```swift 
personalizationSDK = createPersonalizationSDK(
            shopId: "YOUR_SHOP_ID",
            apiDomain: "api.rees46.ru",
            stream: "ios",
            enableLogs: false,
            autoSendPushToken: true,
            sendAdvertisingId: false,   
            parentViewController: rootViewController,
            enableAutoPopupPresentation: true,
            needReInitialization: false
) { error in
  if let error {
    // обработка ошибки инициализации
    return
  }
}
```

Дополнительные свойства для расширенного управления SDK:


| Свойство                       | Значение по-умолчанию | Назначение                                                                                          |
|--------------------------------|-----------------------|-----------------------------------------------------------------------------------------------------|
| `apiDomain`                    | api.rees46.ru         | Кастомный домен REES46 API в случае on-premise                                                      |
| `stream `                      | ios                   | [Стрим](../entities/stream.md)                                                                      |
| `enableLogs`                   | false                 | Булевый параметр для включения логов                                                                |
| `autoSendPushToken`            | true                  | Автоматически получать mobile push токен                                                            |
| `parentViewController`         | rootViewController    | Без этого параметра `in-app` попапы не будут показываться                                           |
| `needReInitialization`         | false                 | Флаг необходимости провести переинициализацию SDK и запрос новых `did` и `sid` с сервера            |
| `sendAdvertisingId`            | false                 | Булевый флаг о том, чтобы вместо генерации `did` использовать `Apple Advertising Identifier (IDFA)` |
| `enableAutoPopupPresentation`  | true                  | Булевый флаг о том, чтобы автоматически показывать in-app попапы                                    |

:::info Важно
Если вы установили `sendAdvertisingId` в `true`, нужно добавить `NSUserTrackingUsageDescription` в файл `Info.plist` приложения. Это обязательно.
В этом случае SDK будет автоматически запрашивать разрешение на доступ к `IDFA`.
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

```swift
import REES46

let sdk = createPersonalizationSDK(
  shopId: AppEnvironments.shopId,
  apiDomain: AppEnvironments.apiDomain,
  enableLogs: true,
  parentViewController: (window?.rootViewController)!,
  needReInitialization: true,
  sendAdvertisingId: true,
) { error in
  if let error {
    // обработка ошибки инициализации
    return
  }
}
```

