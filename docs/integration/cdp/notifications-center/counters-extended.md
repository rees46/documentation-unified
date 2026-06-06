# Расширенный счетчик отправленных и прочитанных сообщений

Метод позволяет получить счетчик отправленных и прочитанных сообщений для центра уведомлений. Это расширенная версия метода [notifications/counters](./counters.md), поддерживающая несколько каналов и типов рассылок в одном запросе.

```
GET https://api.rees46.ru/notifications/counters/extended
```

## Параметры

| Параметр     | Обязателен? | Описание                                                                                                           |
|--------------|-------------|--------------------------------------------------------------------------------------------------------------------|
| shop_id      | Да          | API-ключ                                                                                                           |
| shop_secret  | Да          | Секретный API-ключ                                                                                                 |
| did*         | Да          | [Идентификатор устройства](../entities/did.md)                                                                     |
| phone*       | Да          | Телефон клиента                                                                                                    |
| email*       | Да          | Email клиента                                                                                                      |
| loyalty_id*  | Да          | Идентификатор участника программы лояльности                                                                       |
| external_id* | Да          | Внешний идентификатор клиента                                                                                      |
| date_from    | Да          | Дата, с которой проверять отправленные сообщения в формате `YYYY-MM-DD`                                            |
| channel      | Да          | Каналы сообщений через запятую: `email`, `sms`, `web_push`, `mobile_push`, `telegram`, `whatsapp`, `max`, `wallet` |
| type         | Да          | Типы сообщений через запятую: `bulk`, `chain` или `transactional`                                                  |

:::info Идентификаторы
Параметры, отмеченные [*] — обязателен хотя бы один из них.
:::

## Запрос

Пример запроса:

```shell [S2S]
curl 'https://api.rees46.ru/notifications/counters/extended?type=bulk,chain&channel=email&email=...&shop_id=...&shop_secret=...'
```

## Ответ

Пример ответа сервера:

```json 
{
  "status": "success",
  "payload":{
    "counters": {
      "channels": {
        "email": {
          "bulk": {
            "sent": 2,
            "opened": 2,
            "clicked": 1
          },
          "chain": {},
          "transactional": {}
        },
        "web_push": {},
        "mobile_push": {},
        "whatsapp": {},
        "sms": {}
      }
    }
  }
}
```

Расшифровка свойств ответа:

| Property                  | Type   | Description                                                                               |
|---------------------------|--------|-------------------------------------------------------------------------------------------|
| status                    | String | Текстовый статус результата обработки запроса                                             |
| payload                   | Object | Объект с ответом                                                                          |
| payload.counters          | Object | Объект со счетчиками                                                                      |
| payload.counters.channels | Object | Объект со счетчиками, где ключом выступает значение каждого канала из параметра `channel` |

В случае ошибки ответ будет в формате:

```json 
{
  "status": "error",
  "payload": {
    "message": "Invalid secret key"
  }
}
```