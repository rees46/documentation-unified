# История бонусных транзакций

Возвращает список бонусных транзакций на пополнение и списание за указанный период.

```
GET https://api.rees46.ru/loyalty/bonuses/history
```

## Параметры

| Параметр             | Обязателен? | Описание                                                                       |
|----------------------|-------------|--------------------------------------------------------------------------------|
| shop_id              | Да          | API-ключ                                                                       |
| shop_secret          | Да          | Секретный ключ API                                                             |
| identifier           | Да          | Идентификатор участника программы лояльности                                   |
| limit                | Нет         | Количество транзакций в ответе. Не более 50                                    |
| offset               | Нет         | Смещение от первой транзакции в ответе для постраничного вывода                |
| status               | Нет         | Статус транзакций: `pending`, `confirmed`, `spent`, `cancelled`, `expired`     |
| activation_date_from | Нет         | Фильтрация по дате активации бонусов. Начало периода в формате `YYYY-MM-DD`    |
| activation_date_to   | Нет         | Фильтрация по дате активации бонусов. Окончание периода в формате `YYYY-MM-DD` |
| expiration_date_from | Нет         | Фильтрация по дате сгорания бонусов. Начало периода в формате `YYYY-MM-DD`     |
| expiration_date_to   | Нет         | Фильтрация по дате сгорания бонусов. Окончание периода в формате `YYYY-MM-DD`  |
| created_date_from    | Нет         | Фильтрация по дате создания бонусов. Начало периода в формате `YYYY-MM-DD`     |
| created_date_to      | Нет         | Фильтрация по дате создания бонусов. Окончание периода в формате `YYYY-MM-DD`  |

## Запрос

Пример запроса:

```shell 
curl https://api.rees46.ru/loyalty/bonuses/history?shop_id=...&shop_secret=...&identifier=...&offset=0&limit=50&status=active&...
```

## Ответ

Пример ответа сервера:

```json 
{
  "success": true,
  "payload": {
    "transactions": [
      {
        "date": "2025-01-01",
        "status": "confirmed",
        "event_source": "order",
        "event": null,
        "order_id": "pc19843",
        "amount": -300,
        "activation_date": "2025-01-14",
        "expiration_date": "2026-01-01"
      },
      {
        "date": "2025-01-01",
        "status": "confirmed",
        "event_source": "custom",
        "event": "registration",
        "order_id": null,
        "amount": 1000,
        "activation_date": "2025-01-14",
        "expiration_date": "2026-01-01"
      }
    ]
  }
}
```

Расшифровка ответа:

| Параметр                               | Описание                                                                               |
|----------------------------------------|----------------------------------------------------------------------------------------|
| success                                | Запрос выполнен успешно или нет                                                        |
| payload.transactions                   | Массив транзакций                                                                      |
| payload.transactions[]                 | Объект транзакции                                                                      |
| payload.transactions[].date            | Дата создания транзакции                                                               |
| payload.transactions[].status          | Статус                                                                                 |
| payload.transactions[].event_source    | Источник транзакции. `order` - транзакция от заказа, все остальное - событийные бонусы |
| payload.transactions[].event           | Событие-источник транзакции для бонусов за действие                                    |
| payload.transactions[].order_id        | Идентификатор заказа, если транзакция из заказа                                        |
| payload.transactions[].amount          | Сумма транзакции. Если меньше нуля, значит списание                                    |
| payload.transactions[].activation_date | Дата активации транзакции                                                              |
| payload.transactions[].expiration_date | Дата сгорания транзакции                                                               |

В случае ошибки ответ будет в формате:

```json 
{
  "success": false,
  "payload": {
    "message": "Identifier is not valid"
  }
}
```