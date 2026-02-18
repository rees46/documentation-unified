# Продление подписки клиента

Продление уже существующей подписки без изменения других ее свойств. Используйте этот метод, когда списали с клиента оплату за подписку и передайте дату, до которой эта подписка продлена.

```
PATCH https://api.rees46.ru/loyalty/subscriptions/prolong
```

## Параметры

| Параметр          | Обязателен? | Описание                                             |
|-------------------|-------------|------------------------------------------------------|
| shop_id           | Да          | API-ключ                                             |
| shop_secret       | Да          | Секретный ключ API                                   |
| identifier        | Да          | Номер телефона клиента, идентификатор участника ПЛ   |
| subscription      | Да          | Уникальный код подписки                              |
| paid_till         | Да          | Новый срок действия подписки, в формате `YYYY-MM-DD` |

## Запрос

Пример запроса:

```shell 
curl --header "Content-Type: application/json" \
  --request PATCH \
  --data-binary "@payload.json" \
  https://api.rees46.ru/loyalty/subscriptions/prolong
```

Пример JSON-тела:

```json payload.json
{
    "shop_id": "...",
    "shop_secret": "...",
    "identifier": "7XXXXXXXXX",
    "subscription": "marketplace",
    "paid_till": "2026-10-01"
}
```


## Ответ

Пример ответа сервера:

```json 
{
  "success": true,
  "payload": {
    "message": "The subscription is prolonged",
    "identifier": "...",
    "subscription": "...",
    "plan": "...",
    "paid_till": "...",
    "limits_reset_date": "..."
  }
}
```

В случае ошибки ответ будет в формате:

```json 
{
  "success": false,
  "payload": {
    "message": "Identifier is not valid"
  }
}
```

Расшифровка ответа:

| Параметр                  | Описание                                                             |
|---------------------------|----------------------------------------------------------------------|
| success                   | Запрос выполнен успешно или нет                                      |
| payload.message           | Сообщение с результатом обработки запроса                            |
| payload.identifier        | Идентификатор участника программы лояльности в формате `7XXXXXXXXXX` |
| payload.subscription      | Уникальный код подписки                                              |
| payload.plan              | Уникальный код плана                                                 |
| payload.paid_till         | Дата, до которой оплачена подписка                                   |
| payload.limits_reset_date | Дата, когда будет выполнен следующий сброс лимитов                   |