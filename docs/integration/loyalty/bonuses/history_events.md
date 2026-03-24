# История бонусных транзакций за события

Возвращает список бонусных транзакций за действия (события). Это бонусы, которые начисляются либо через кастомное событие расширенной CDP либо явно [через API](./reward.md).

```
GET https://api.rees46.ru/loyalty/bonuses/event_bonus_history
```

## Параметры

| Параметр             | Обязателен? | Описание                                                                       |
|----------------------|-------------|--------------------------------------------------------------------------------|
| shop_id              | Да          | API-ключ                                                                       |
| shop_secret          | Да          | Секретный ключ API                                                             |
| identifier           | Да          | Идентификатор участника программы лояльности                                   |
| limit                | Нет         | Количество транзакций в ответе. Не более 50                                    |
| offset               | Нет         | Смещение от первой транзакции в ответе для постраничного вывода                |

## Запрос

Пример запроса:

```shell 
curl https://api.rees46.ru/loyalty/bonuses/event_bonus_history?shop_id=...&shop_secret=...&identifier=...
```

## Ответ

Пример ответа сервера:

```json 
{
  "success": true,
  "payload": {
    "transactions": [
      {
        "id": 3334566,
        "status": "confirmed",
        "event": "...",
        "amount": 300,
        "remaining_amount": 300,
        "date": "2025-01-01",
        "activation_date": "2025-01-14",
        "expiration_date": "2026-01-01",
        "cancellable": true
      },
      {
        "id": 33345456,
        "status": "confirmed",
        "event": "...",
        "amount": 300,
        "remaining_amount": 200,
        "date": "2025-01-01",
        "activation_date": "2025-01-14",
        "expiration_date": "2026-01-01",
        "cancellable": false
      }
    ]
  }
}
```

Расшифровка ответа:

| Параметр                                 | Описание                                                                          |
|------------------------------------------|-----------------------------------------------------------------------------------|
| success                                  | Запрос выполнен успешно или нет                                                   |
| payload.transactions                     | Массив транзакций                                                                 |
| payload.transactions[]                   | Объект транзакции                                                                 |
| payload.transactions[].id                | Идентификатор транзакции                                                          |
| payload.transactions[].status            | Статус                                                                            |
| payload.transactions[].event             | Событие-источник транзакции для бонусов за действие                               |
| payload.transactions[].order_id          | Идентификатор заказа, если транзакция из заказа                                   |
| payload.transactions[].amount            | Сумма транзакции. Если меньше нуля, значит списание                               |
| payload.transactions[].remaining_amount  | Остаток от начисления, если бонусы транзакции уже частично использованы в заказах |
| payload.transactions[].date              | Дата создания транзакции                                                          |
| payload.transactions[].activation_date   | Дата активации транзакции                                                         |
| payload.transactions[].expiration_date   | Дата сгорания транзакции                                                          |
| payload.transactions[].cancellable       | Булевый флаг, можно ли отменить транзакцию или нет                                |

В случае ошибки ответ будет в формате:

```json 
{
  "success": false,
  "payload": {
    "message": "Identifier is not valid"
  }
}
```