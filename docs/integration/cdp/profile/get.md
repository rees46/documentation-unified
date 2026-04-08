# Чтение профиля

Вы можете получать данные двумя способами:

1. Полный профиль с помощью CURL-запроса с передачей `shop_secret`.
2. Ограниченный профиль с нечувствительными данными из SDK без передачи секретного ключа. Это может потребоваться для проверки некоторых свойств, чтобы кастомизировать интерфейс сайта или мобильного приложения под посетителя.

```
GET https://api.rees46.ru/profile
```

## Параметры

| Параметр                      | Обязателен? | Описание                                                                                                                |
|-------------------------------|-------------|-------------------------------------------------------------------------------------------------------------------------|
| shop_id                       | Да          | API-ключ                                                                                                                |
| shop_secret                   | Нет         | Секретный API-ключ для получения полного профиля клиента                                                                |
| did*                          | Да          | Идентификатор устройства                                                                                                |
| email*                        | Нет         | Email клиента                                                                                                           |
| phone*                        | Нет         | Телефон клиента                                                                                                         |
| external_id*                  | Нет         | Внешний идентификатор клиента                                                                                           |
| loyalty_id*                   | Нет         | Идентификатор внешней программы лояльности клиента                                                                      |
| telegram_id*                  | Нет         | Telegram ID клиента                                                                                                     |

:::info Идентификаторы
Параметры, отмеченные [*] - обязателен хотя бы один из них. На стороне сайта или мобильных приложений SDK автоматически передает `did`.
:::

## Запрос

Пример запроса:

::: code-group

```shell [S2S]
curl https://api.rees46.ru/profile?shop_id=...&shop_secret=...&email=...
```

```javascript [JS SDK]
r46('profile', 'get', function(profile) {
    // В коллбэке доступен объект профиля
    console.log(profile);
  },
  // Укажите `true`, если JS SDK работает в режиме SPA-сайта. Иначе по-умолчанию используется `false`
  false
);
```

```swift [iOS] 
// NOT IMPLEMENTED YET: DEV-4062
```


```kotlin [Kotlin]
// NOT IMPLEMENTED YET: DEV-4063
```


```java [Java (deprecated)] 
// NOT SUPPORTED
```


```javascript [ReactNative]
sdk.getProfile().then((profile) => {
  // В случае успеха
  console.log(profile)
}).catch((err) => {
  // В случае ошибки запроса
  console.log(err)
})
```
:::



## Ответ

:::info Свойства ответа
Набор свойств ответа может отличаться в зависимости настроек вашего проекта и активированных сервисов.
:::

Пример ответа сервера, если запрос без секретного ключа:

```json
{
    "has_email": true,
    "computed_gender": null,
    "gender": null,
    "bought_something": false,
    "id": "...",
    "custom_properties": {}
}
```

Пример ответа сервера, если запрос с секретным ключом:

```json 
{
  "first_name": "...",
  "last_name": "...",
  "email": "...",
  "phone": "...",
  "fb_id": "...",
  "vk_id": "...",
  "telegram_id": "...",
  "loyalty_id": "...",
  "loyalty_card_location": "...",
  "loyalty_status": "...",
  "loyalty_bonuses": "...",
  "loyalty_bonuses_to_next_level": "...",
  "gender": "...",
  "location": "...",
  "age": "...",
  "birthday": "...",
  "bought_something": "...",
  "tags": [
    "...",
    "..."
  ],
  "custom_properties": {
    "prop_key_1": "prop_value",
    "prop_key_2": "prop_value"
  },
  "additional_phones": [],
  "additional_emails": [],
  "additional_loyalty_ids": [],
  "orders": [
    {
      "id": "...",
      "value": "...",
      "status": "...",
      "items": [
        {
          "id": "...",
          "price": "...",
          "name": "...",
          "quantity": "..."
        },
        {
          "id": "...",
          "price": "...",
          "name": "...",
          "quantity": "..."
        }
      ]
    }
  ]
}
```

В случае ошибки ответ будет в формате:

```json 
{
  "status": "error",
  "payload": {
    "message": "Shop not found"
  }
}
```