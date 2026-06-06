# Список всех сообщений, отправленных клиенту

Метод возвращает список сообщений, отправленных клиенту в указанный период и статусы взаимодействия с каждым из них (просмотр, клик, жалоба, отписка и пр.).

```
GET https://api.rees46.ru/notifications
```

## Параметры

| Параметр     | Тип данных | Обязателен? | Описание                                                                                                                                                                                                                                                                         |
|--------------|------------|-------------|----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| shop_id      | String     | Да          | API-ключ                                                                                                                                                                                                                                                                         |
| shop_secret  | String     | Да          | Секретный API-ключ                                                                                                                                                                                                                                                               |
| phone*       | String     | Да          | Телефон клиента                                                                                                                                                                                                                                                                  |
| email*       | String     | Да          | Email клиента                                                                                                                                                                                                                                                                    |
| loyalty_id*  | String     | Да          | Идентификатор участника программы лояльности                                                                                                                                                                                                                                     |
| external_id* | String     | Да          | Внешний идентификатор клиента                                                                                                                                                                                                                                                    |
| date_from    | String     | Нет         | `DEPRECATED`. Дата в формате `YYYY-MM-DD`. Если указана, то выбираются сообщения, начиная с этой даты до текущего времени. Указывайте интервал не более 2 недель, иначе запрос будет выполняться очень долго                                                                     |
| type         | String     | Нет         | Список типов рассылок через запятую, по которым нужно получить сообщения: `bulk`, `trigger`, `transactional`, `chain`. Типы `chain` и `trigger` идентичны. Обязательно указывайте только нужные вам типы рассылок: чем больше типов выбрано, тем дольше будет выполняться запрос |
| channel      | String     | Нет         | Список каналов через запятую: `email`, `sms`, `web_push`, `mobile_push`, `telegram`, `whatsapp`, `max`, `wallet`. Обязательно указывайте только нужные вам каналы рассылок: чем больше каналов выбрано, тем дольше будет выполняться запрос                                      |
| page         | Integer    | Нет         | Номер страницы для пагинации. По умолчанию: 1. Минимум: 1.                                                                                                                                                                                                                       |
| limit        | Integer    | Нет         | Количество строк в ответе на страницу. По умолчанию: 20. Минимум: 1. Максимум: 50.                                                                                                                                                                                               |


:::info Идентификаторы
Параметры, отмеченные [*] — обязателен хотя бы один из них. 
:::

:::warning Внимание
Не используйте очень старый параметр `date_from`, т.к. он значительно увеличивает нагрузку на базу данных и запрос может выполняться очень долго.
:::

## Запрос

Пример запроса:

::: code-group
```shell [S2S]
curl 'https://api.rees46.ru/notifications?shop_id=...&shop_secret=...&email=...&channel=email&type=bulk'
```

```javascript [JS SDK]
// Не поддерживается в целях безопасности
```

```swift [iOS] 
sdk.getAllNotifications(
  type: String,
  phone: String?,
  email: String?,
  userExternalId: String?,
  userLoyaltyId: String?,
  channel: String?,
  limit: Int?,
  page: Int?,
  dateFrom: String?
) {
  Result<UserPayloadResponse, SDKError> in // Result response
}
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
  "status": "success",
  "payload": {
    "messages": [
      {
        "type": "trigger",
        "campaign_id": ...,
        "code": "...",
        "date": "2023-07-06",
        "sent_at": "2023-07-06T14:25:21.000Z",
        "subject": "...",
        "body": "...",
        "url": "...",
        "icon": "...",
        "picture": "...",
        "statistics": {
          "opened": true,
          "clicked": false,
          "hard_bounced": false,
          "soft_bounced": false,
          "complained": false,
          "unsubscribed": false,
          "purchased": false
        }
      }, ...
    ]
  }
}
```

Расшифровка свойств ответа:

| Свойство                                   | Тип     | Описание                                                        |
|--------------------------------------------|---------|-----------------------------------------------------------------|
| status                                     | String  | Текстовый статус результата обработки запроса                   |
| payload                                    | Object  | Объект с ответом                                                |
| payload.messages[]                         | Array   | Массив отправленных сообщений                                   |
| payload.messages[].type                    | String  | Тип рассылки                                                    |
| payload.messages[].campaign_id             | Integer | Идентификатор рассылки                                          |
| payload.messages[].code                    | String  | Уникальный код сообщения                                        |
| payload.messages[].date                    | String  | Дата отправки в формате `YYYY-MM-DD`                            |
| payload.messages[].sent_at                 | String  | Дата и время отправки в формате `YYYY-MM-DDTHH:mm:ss.SSSZ`      |
| payload.messages[].subject                 | String  | Тема сообщения (для email и некоторых видов push рассылок)      |
| payload.messages[].body                    | String  | Тело сообщения (для коротких рассылок типа `push` или `sms`)    |
| payload.messages[].url                     | String  | Ссылка на целевую страницу для каналов типа `push` или `wallet` |
| payload.messages[].icon                    | String  | Ссылка на иконку для `push` рассылок                            |
| payload.messages[].picture                 | String  | Ссылка на дополнительную картинку для `push` рассылок           |
| payload.messages[].statistics              | Object  | Объект с результатами взаимодействия клиента с сообщением       |
| payload.messages[].statistics.opened       | Boolean | Сообщение было открыто?                                         |
| payload.messages[].statistics.clicked      | Boolean | Был ли переход из сообщения по ссылке?                          |
| payload.messages[].statistics.hard_bounced | Boolean | Был ли hard bounce при отправке сообщения                       |
| payload.messages[].statistics.soft_bounced | Boolean | Был ли soft bounce при отправке сообщения                       |
| payload.messages[].statistics.complained   | Boolean | Была ли жалоба от получателя (для канала `email`)               |
| payload.messages[].statistics.unsubscribed | Boolean | Была ли отписка клиентом по ссылке из рассылки?                 |
| payload.messages[].statistics.purchased    | Boolean | Была ли покупка, атрибуцированная на это сообщение?             |
 
В случае ошибки ответ будет в формате:

```json 
{
  "status": "error",
  "payload": {
    "message": "Invalid secret key"
  }
}
```

