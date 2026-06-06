# Управление подписками

Метод позволяет управлять подписками клиента на типы и каналы рассылок. Может использоваться для синхронизации изменений подписок в CDP из личного кабинета клиента в вашей платформе.

:::warning Важно
В целях безопасности, все запросы с фронта требуют наличия `did`, чтобы исключить возможность отписывать или подписывать клиентов простым указанием `email` или `phone`. В запросах с бэкенда `did` не нужен, но требуется секретный ключ. 
:::

```
POST https://api.rees46.ru/subscriptions/manage
```

## Параметры

| Параметр                  | Обязателен? | Описание                                                                                        |
|---------------------------|-------------|-------------------------------------------------------------------------------------------------|
| shop_id                   | Да          | API-ключ                                                                                        |
| shop_secret               | Да          | Секретный API-ключ                                                                              |
| did*                      | Да          | [Идентификатор устройства](../entities/did.md). Подставляется автоматически при запросах из SDK |
| sid                       | Да          | [Идентификатор сессии](../entities/sid.md). Подставляется автоматически при запросах из SDK     |
| email*                    | Да          | Email клиента                                                                                   |
| phone*                    | Да          | Телефон клиента                                                                                 |
| external_id*              | Да          | Внешний идентификатор клиента                                                                   |
| loyalty_id*               | Да          | Идентификатор внешней программы лояльности клиента                                              |
| telegram_id*              | Да          | Telegram ID клиента                                                                             |
| email_bulk                | Нет         | Булевое значение с флагом подписки или отписки на массовую email рассылку                       |
| email_chain               | Нет         | Булевое значение с флагом подписки или отписки на триггерную email рассылку                     |
| email_transactional       | Нет         | Булевое значение с флагом подписки или отписки на транзакционную email рассылку                 |
| sms_bulk                  | Нет         | Булевое значение с флагом подписки или отписки на массовую SMS рассылку                         |
| sms_chain                 | Нет         | Булевое значение с флагом подписки или отписки на триггерную SMS рассылку                       |
| sms_transactional         | Нет         | Булевое значение с флагом подписки или отписки на транзакционную SMS рассылку                   |
| web_push_bulk             | Нет         | Булевое значение с флагом подписки или отписки на массовую web push рассылку                    |
| web_push_chain            | Нет         | Булевое значение с флагом подписки или отписки на триггерную web push рассылку                  |
| web_push_transactional    | Нет         | Булевое значение с флагом подписки или отписки на транзакционную web push рассылку              |
| mobile_push_bulk          | Нет         | Булевое значение с флагом подписки или отписки на массовую mobile push рассылку                 |
| mobile_push_chain         | Нет         | Булевое значение с флагом подписки или отписки на триггерную mobile push рассылку               |
| mobile_push_transactional | Нет         | Булевое значение с флагом подписки или отписки на транзакционную mobile push рассылку           |
| telegram_bulk             | Нет         | Булевое значение с флагом подписки или отписки на массовую Telegram рассылку                    |
| telegram_chain            | Нет         | Булевое значение с флагом подписки или отписки на триггерную Telegram рассылку                  |
| telegram_transactional    | Нет         | Булевое значение с флагом подписки или отписки на транзакционную Telegram рассылку              |
| whatsapp_bulk             | Нет         | Булевое значение с флагом подписки или отписки на массовую WhatsApp рассылку                    |
| whatsapp_chain            | Нет         | Булевое значение с флагом подписки или отписки на триггерную WhatsApp рассылку                  |
| whatsapp_transactional    | Нет         | Булевое значение с флагом подписки или отписки на транзакционную WhatsApp рассылку              |
| max_bulk                  | Нет         | Булевое значение с флагом подписки или отписки на массовую MAX рассылку                         |
| max_chain                 | Нет         | Булевое значение с флагом подписки или отписки на триггерную MAX рассылку                       |
| max_transactional         | Нет         | Булевое значение с флагом подписки или отписки на транзакционную MAX рассылку                   |
| wallet_bulk               | Нет         | Булевое значение с флагом подписки или отписки на массовую Wallet рассылку                      |

:::info Идентификаторы
Параметры, отмеченные [*] - обязателен хотя бы один из них. На стороне сайта или мобильных приложений SDK автоматически передает `did`.
:::

:::info Если флаг не указан
Для отписки нужно указать `false`, для подписки `true`. Если флаг не указан, то при обработке запроса он не меняется.
:::

## Запрос

Пример запроса:

::: code-group
```shell [S2S]
# Полный пример
curl 'https://api.rees46.ru/subscriptions/manage' \
    -X 'POST' \
    -H 'Content-Type: application/json' \
    --data-raw '{"shop_id": "...", "shop_secret": "...", "did": "...", "sid": "...", "email": "...", "phone": "...", "email_bulk": true, "email_chain": false, "email_transactional": true}'

```

```javascript [JS SDK]
// Изменение сразу всех каналов и типов рассылок
r46('subscription', 'manage', {
  email: 'my@example.com',
  phone: '+100000000000',
  email_bulk: true,
  email_chain: true,
  email_transactional: true,
  sms_bulk: true,
  sms_chain: true,
  sms_transactional: true,
  web_push_bulk: true,
  web_push_chain: true,
  web_push_transactional: true,
  mobile_push_bulk: true,
  mobile_push_chain: true,
  mobile_push_transactional: true,
  telegram_bulk: true,
  telegram_chain: true,
  telegram_transactional: true,
  whatsapp_bulk: true,
  whatsapp_chain: true,
  whatsapp_transactional: true,
  max_bulk: true,
  max_chain: true,
  max_transactional: true,
  mobile_wallet_bulk: true
});

// Изменение только специфичных каналов и типов
r46('subscription', 'manage', {
  email: 'my@example.com',
  phone: '+100000000000',
  email_chain: true,
  sms_bulk: true,
  sms_transactional: true
});

// Изменение подписки на SMS и email без указания номера телефона
r46('subscription', 'manage', {
  email: 'my@example.com',
  email_chain: true,
  sms_bulk: true,
  sms_transactional: true
});

// Изменение подписки на email без указания email
r46('subscription', 'manage', {
  phone: '+100000000000',
  email_chain: true,
  sms_bulk: true,
  sms_transactional: true
});

// Изменение подписки только по `did`
r46('subscription', 'manage', {
  email_chain: true,
  sms_bulk: true,
});
```

```swift [iOS] 
// Изменение подписки только по `did`
sdk.manageSubscription(bulkEmail: true)

// С контактными данными
sdk.manageSubscription(email: "my@example.com", phone: "+10000000000", emailBulk: true, smsBulk: true)

// Отписка без указания контактных данных (только с `did`)
sdk.manageSubscription(emailBulk: false, smsBulk: false)

// Со всеми данными
sdk.manageSubscription(email: "my@example.com", phone: "+10000000000", userExternalId: "String", userLoyaltyId: "String", telegramId: "String",
  emailBulk: true,
  emailChain: true,
  emailTransactional: true,
  smsBulk: true,
  smsChain: true,
  smsTransactional: true,
  webPushBulk: true,
  webPushChain: true,
  webPushTransactional: true,
  mobilePushBulk: true,
  mobilePushChain: true,
  mobilePushTransactional: true
)
```


```kotlin [Kotlin]
// Только с `did` без указания контактов
val subscriptions = hashMapOf<String, Boolean>()
subscriptions["email_bulk"] = true
sdk.manageSubscription(null, null, subscriptions)

// С email и телефоном
val subscriptions = hashMapOf<String, Boolean>()
subscriptions["email_bulk"] = true
sdk.manageSubscription("my@example.com", "+10000000000", subscriptions)

// С email, телефоном и коллбэком
val subscriptions = hashMapOf<String, Boolean>()
subscriptions["email_bulk"] = true
sdk.manageSubscription("my@example.com", "+10000000000", subscriptions, listener)

// С контактными данными
val subscriptions = hashMapOf<String, Boolean>()
subscriptions["email_bulk"] = true
subscriptions["sms_chain"] = false
sdk.manageSubscription("my@example.com", "+10000000000", "externalID", "loyaltyId", "telegramId", subscriptions)

// С контактными данными и коллбэком
val subscriptions = hashMapOf<String, Boolean>()
subscriptions["email_bulk"] = true
subscriptions["email_transactional"] = false
subscriptions["sms_chain"] = true
sdk.manageSubscription("my@example.com", "+10000000000", "externalID", "loyaltyId", "telegramId", subscriptions, listener)

// Отписка без указания контактов (только с `did`)
val subscriptions = hashMapOf<String, Boolean>()
subscriptions["email_bulk"] = false
subscriptions["sms_bulk"] = false
sdk.manageSubscription(null, null, subscriptions)
```


```java [Java (deprecated)]
// Только с `did` без указания контактов
HashMap<String, Boolean> subscriptions = new HashMap<>();
subscriptions.put("email_bulk", true);
REES46.manageSubscription(null, null, subscriptions);

// С email и телефоном
HashMap<String, Boolean> subscriptions = new HashMap<>();
subscriptions.put("email_bulk", true);
REES46.manageSubscription("my@example.com", "+10000000000", subscriptions);

// С email, телефоном и коллбэком
HashMap<String, Boolean> subscriptions = new HashMap<>();
subscriptions.put("email_bulk", true);
REES46.manageSubscription("my@example.com", "+10000000000", subscriptions, listener);

// С контактными данными
HashMap<String, Boolean> subscriptions = new HashMap<>();
subscriptions.put("email_bulk", true);
subscriptions.put("sms_chain", false);
REES46.manageSubscription("my@example.com", "+10000000000", "externalID", "loyaltyId", "telegramId", subscriptions);

// С контактными данными и коллбэком
HashMap<String, Boolean> subscriptions = new HashMap<>();
subscriptions.put("email_bulk", true);
subscriptions.put("email_transactional", false);
subscriptions.put("sms_chain", true);
REES46.manageSubscription("my@example.com", "+10000000000", "externalID", "loyaltyId", "telegramId", subscriptions, listener);

// Отписка без указания контактов (только с `did`)
HashMap<String, Boolean> subscriptions = new HashMap<>();
subscriptions.put("email_bulk", false);
subscriptions.put("sms_bulk", false);
REES46.manageSubscription(null, null, subscriptions);
```


```javascript [ReactNative]
TODO описать
```
:::


## Ответ

Пример ответа сервера:

```json 
{
  "status": "success"
}
```

В случае ошибки ответ будет в формате:

```json 
{
  "status": "error",
  "payload": {
    "message": "Device ID is not valid"
  }
}
```

