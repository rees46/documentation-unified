# Статус клиента, бенефиты и остатки лимитов

Возвращает информацию об участнике подписки, а также информацию о текущих бенефитах и остатках лимитов.

```
GET https://api.rees46.ru/loyalty/subscriptions/status
```

## Параметры

| Параметр          | Обязателен? | Описание                                                                                                                                                                                                  |
|-------------------|-------------|-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| shop_id           | Да          | API-ключ                                                                                                                                                                                                  |
| shop_secret       | Да          | Секретный ключ API                                                                                                                                                                                        |
| identifier        | Да          | Номер телефона клиента, идентификатор участника ПЛ                                                                                                                                                        |

## Запрос

Пример запроса:

```shell 
curl https://api.rees46.ru/loyalty/subscriptions/status?shop_id=...&shop_secret=...&identifier=...
```

## Ответ

Пример ответа сервера:

```json 
{
  "success": true,
  "payload": {
    "message": "Successful request",
    "member": {
      "identifier": "...",
      "subscription": "...",
      "plan": "...",
      "paid_till": "...",
      "limits_reset_date": "..."
    },
    "benefits": [
      {
        "code": "...",
        "name": "...",
        "data_type": "boolean",
        "value": true
      },
      {
        "code": "...",
        "name": "...",
        "data_type": "integer",
        "value": 3
      },
      {
        "code": "...",
        "name": "...",
        "data_type": "promos",
        "value": {
          "promotions": [
            {
              "id": 117,
              "name": "...",
              "status": "active"
            },
            {
              "id": 13,
              "name": "...",
              "status": "inactive"
            }
          ],
          "limit": 5000,
          "used": 3700,
          "left": 1300
        }
      }
    ]
  }
}
```

В случае ошибки ответ будет в формате:

```json 
{
  "success": false,
  "payload": {
    "message": "API secret is not correct"
  }
}
```

Расшифровка ответа:

| Параметр                                     | Описание                                                                                                                                                                               |
|----------------------------------------------|----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| success                                      | Запрос выполнен успешно или нет                                                                                                                                                        |
| payload.message                              | Сообщение с результатом обработки запроса                                                                                                                                              |
| payload.member                               | Объект с информацией о клиенте                                                                                                                                                         |
| payload.member.identifier                    | Идентификатор участника программы лояльности в формате `7XXXXXXXXXX`                                                                                                                   |
| payload.member.subscription                  | Уникальный код подписки                                                                                                                                                                |
| payload.member.plan                          | Уникальный код плана                                                                                                                                                                   |
| payload.member.paid_till                     | Дата, до которой оплачена подписка                                                                                                                                                     |
| payload.member.limits_reset_date             | Дата, когда будет выполнен следующий сброс лимитов                                                                                                                                     |
| payload.benefits[]                           | Массив со списком бенефитов клиента                                                                                                                                                    |
| payload.benefits[].code                      | Уникальный код бенефита                                                                                                                                                                |
| payload.benefits[].name                      | Название бенефита                                                                                                                                                                      |
| payload.benefits[].data_type                 | Тип бенефита: `boolean` для флагов, `integer` для числовых лимитов, `promos` для акций                                                                                                 |
| payload.benefits[].value                     | Значение бенефита: для типа `boolean` допустимы `true` и `false`, для типа `integer` число от `0` до `1,000,000`, для типа `promos` объект с детальной информацией об акциях и лимитах |
| payload.benefits[].value.promotions[]        | Массив акций в бенефите                                                                                                                                                                |
| payload.benefits[].value.promotions[].id     | Идентификатор акции                                                                                                                                                                    |
| payload.benefits[].value.promotions[].name   | Название акции                                                                                                                                                                         |
| payload.benefits[].value.promotions[].status | Статус акции: `draft`, `scheduled`, `inactive`, `active`, `archived`                                                                                                                   |
| payload.benefits[].value.limit               | Лимит скидок по указанным акциям                                                                                                                                                       |
| payload.benefits[].value.used                | Сколько скидок уже получено по этим акциям в текущий расчетный период                                                                                                                  |
| payload.benefits[].value.left                | Сколько скидок еще можно получить до конца расчетного период                                                                                                                           |


 