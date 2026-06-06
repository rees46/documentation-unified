# Проверка статуса подписки

Метод возвращает информацию о текущих статусах подписок клиента на тип и канал рассылки.

Независимо от того, какой идентификатор клиента передан, проверяются все типы и каналы.

```
GET https://api.rees46.ru/subscriptions/check
```

## Параметры

| Параметр    | Обязателен? | Описание                        |
|-------------|-------------|---------------------------------|
| shop_id     | Да          | API-ключ                        |
| shop_secret | Да          | Секретный API-ключ              |
| email*      | Да          | Email клиента                   |
| phone*      | Да          | Телефон клиента                 |
| did*        | Да          | [Идентификатор устройства](../entities/did.md) |

:::info Идентификаторы
Параметры, отмеченные [*] — обязателен хотя бы один из них. На стороне сайта или мобильных приложений SDK автоматически передает `did`.
:::


## Запрос

Пример запроса:

::: code-group
```shell [S2S]
curl 'https://api.rees46.ru/subscriptions/check?shop_id=...&shop_secret=...&email=...'
```

```javascript [JS SDK]
r46('subscription', 'check',
  function (subscriptions) {
    console.log(subscriptions)
  },
  function(error) {
    console.log(error)
  }
);
```

```swift [iOS] 
// Пока не реализовано
```


```kotlin [Kotlin]
// Пока не реализовано
```


```javascript [ReactNative]
// Пока не реализовано
```
:::

## Ответ

Пример ответа сервера:

```json 
{
  "exists": false,
  "email_bulk": false,
  "email_chain": false,
  "email_transactional": false,
  "email_invalid": false,
  "email_blacklisted": false,
  "email_bounced": false,
  "email_suppressed": false,
  "email_confirmed": false,
  "web_push_bulk": false,
  "web_push_chain": false,
  "web_push_transactional": false,
  "mobile_push_bulk": false,
  "mobile_push_chain": false,
  "mobile_push_transactional": false,
  "sms_bulk": false,
  "sms_chain": false,
  "sms_transactional": false,
  "telegram_bulk": false,
  "telegram_chain": false,
  "telegram_transactional": false,
  "whatsapp_bulk": false,
  "whatsapp_chain": false,
  "whatsapp_transactional": false,
  "max_bulk": false,
  "max_chain": false,
  "max_transactional": false,
  "wallet_bulk": false
}
```

Расшифровка свойств ответа:


| Свойство                  | Тип     | Описание                                                                        |
|---------------------------|---------|---------------------------------------------------------------------------------|
| exists                    | Boolean | Существует ли клиент с таким идентификатором в CDP?                             |
| email_bulk                | Boolean | Есть ли у пользователя `email` и подписка на массовую рассылку                  |
| email_chain               | Boolean | Есть ли у пользователя `email` и подписка на триггерную рассылку                |
| email_transactional       | Boolean | Есть ли у пользователя `email` и подписка на транзакционную рассылку            |
| email_invalid             | Boolean | Флаг, что email невалиден                                                       |
| email_blacklisted         | Boolean | Флаг, что email в черном списке                                                 |
| email_bounced             | Boolean | Флаг, что email bounced (не существует)                                         |
| email_suppressed          | Boolean | Флаг, что email заблокирован (нельзя менять статус подписки)                    |
| email_confirmed           | Boolean | Флаг, что email подтвержден                                                     |
| web_push_bulk             | Boolean | Есть ли у пользователя web push токен и подписка на массовую рассылку           |
| web_push_chain            | Boolean | Есть ли у пользователя web push токен и подписка на триггерную рассылку         |
| web_push_transactional    | Boolean | Есть ли у пользователя web push токен и подписка на транзакционную рассылку     |
| mobile_push_bulk          | Boolean | Есть ли у пользователя mobile push токен и подписка на массовую рассылку        |
| mobile_push_chain         | Boolean | Есть ли у пользователя mobile push токен и подписка на триггерную рассылку      |
| mobile_push_transactional | Boolean | Есть ли у пользователя mobile push токен и подписка на транзакционную рассылку  |
| sms_bulk                  | Boolean | Есть ли у пользователя номер телефона и подписка на массовую SMS рассылку       |
| sms_chain                 | Boolean | Есть ли у пользователя номер телефона и подписка на триггерную SMS рассылку     |
| sms_transactional         | Boolean | Есть ли у пользователя номер телефона и подписка на транзакционную SMS рассылку |
| telegram_bulk             | Boolean | Есть ли у пользователя Telegram и подписка на массовую рассылку                 |
| telegram_chain            | Boolean | Есть ли у пользователя Telegram и подписка на триггерную рассылку               |
| telegram_transactional    | Boolean | Есть ли у пользователя Telegram и подписка на транзакционную рассылку           |
| whatsapp_bulk             | Boolean | Есть ли у пользователя WhatsApp и подписка на массовую рассылку                 |
| whatsapp_chain            | Boolean | Есть ли у пользователя WhatsApp и подписка на триггерную рассылку               |
| whatsapp_transactional    | Boolean | Есть ли у пользователя WhatsApp и подписка на транзакционную рассылку           |
| max_bulk                  | Boolean | Есть ли у пользователя MAX и подписка на массовую рассылку                      |
| max_chain                 | Boolean | Есть ли у пользователя MAX и подписка на триггерную рассылку                    |
| max_transactional         | Boolean | Есть ли у пользователя MAX и подписка на транзакционную рассылку                |
| wallet_bulk               | Boolean | Есть ли у пользователя Wallet и подписка на массовую рассылку                   |

В случае ошибки ответ будет в формате:

```json 
{
  "status": "error",
  "payload": {
    "message": "Invalid secret key"
  }
}
```

