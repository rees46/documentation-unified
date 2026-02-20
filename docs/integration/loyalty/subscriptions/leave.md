# Удаление подписки клиента

Особой необходимости для удаления подписки клиента нет. Если клиент ее не продлил, она автоматически перестанет работать.

Если клиент переходит на другой тариф этой же подписки, проще использовать метод [создания подписки](./join.md) с указанием нового тарифа.

```
DELETE https://api.rees46.ru/loyalty/subscriptions/members/leave
```

## Параметры

| Параметр          | Обязателен? | Описание                                             |
|-------------------|-------------|------------------------------------------------------|
| shop_id           | Да          | API-ключ                                             |
| shop_secret       | Да          | Секретный ключ API                                   |
| identifier        | Да          | Номер телефона клиента, идентификатор участника ПЛ   |
| subscription      | Да          | Уникальный код подписки                              |

## Запрос

Пример запроса:

```shell 
curl --header "Content-Type: application/json" \
  --request DELETE \
  --data-binary "@payload.json" \
  https://api.rees46.ru/loyalty/subscriptions/members/leave
```

Пример JSON-тела:

```json payload.json
{
    "shop_id": "...",
    "shop_secret": "...",
    "identifier": "7XXXXXXXXX",
    "subscription": "marketplace"
}
```


## Ответ

Пример ответа сервера:

```json 
{
  "success": true,
  "payload": {
    "message": "The subscription is cancelled",
    "member": {
      "identifier": "...",
      "subscription": "...",
      "plan": "...",
      "paid_till": "...",
      "limits_reset_date": "..."
    }
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

| Параметр                    | Описание                                                             |
|-----------------------------|----------------------------------------------------------------------|
| success                     | Запрос выполнен успешно или нет                                      |
| payload.message             | Сообщение с результатом обработки запроса                            |
| payload.member              | Объект подписчика                                                    |
| payload.member.identifier   | Идентификатор участника программы лояльности в формате `7XXXXXXXXXX` |
| payload.member.subscription | Уникальный код подписки                                              |
