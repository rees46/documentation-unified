# Список заказов подписчика

Метод позволяет получить список заказов подписчика на определенной подписке.

```
GET https://api.rees46.ru/loyalty/subscriptions/orders
```

## Параметры

| Параметр     | Обязателен? | Описание                                              |
|--------------|-------------|-------------------------------------------------------|
| shop_id      | Да          | API-ключ                                              |
| shop_secret  | Да          | Секретный ключ API                                    |
| subscription | Да          | Уникальный код подписки                               |
| identifier   | Да          | Идентификатор подписчика (номер телефона)             |
| date_from    | Нет         | Дата "от" в формате `YYYY-MM-DD` для фильтра заказов  |
| date_to      | Нет         | Дата "до" в формате `YYYY-MM-DD` для фильтра заказов  |

## Запрос

Пример запроса:

```shell 
curl https://api.rees46.ru/loyalty/subscriptions/orders?shop_id=...&shop_secret=...&subscription=...&date_from=...&date_to_...
```

## Ответ

Пример ответа сервера:

```json 
{
  "success": true,
  "payload": {
    "message": "Successful request",
    "orders": [
      {
        "id": "...",
        "date": "...",
        "status": "...",
        "total": "...",
        "items": [
          {
            "id": "...",
            "name": "...",
            "quantity": 5,
            "price": 371
          },
          ...
        ]
      },
      ...
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

| Параметр                           | Описание                                                                                                                                     |
|------------------------------------|----------------------------------------------------------------------------------------------------------------------------------------------|
| success                            | Запрос выполнен успешно или нет                                                                                                              |
| payload.message                    | Сообщение с результатом обработки запроса                                                                                                    |
| payload.orders[]                   | Список заказов                                                                                                                               |
| payload.orders[].id                | Идентификатор заказа                                                                                                                         |
| payload.orders[].date              | Дата заказа                                                                                                                                  |
| payload.orders[].status            | Статус заказа                                                                                                                                |
| payload.orders[].total             | Сумма к оплате, равна значению `order_to_pay` из [`checkout/estimate`](./estimate.md)                                                        |
| payload.orders[].items[]           | Список товаров в заказе                                                                                                                      |
| payload.orders[].items[].id        | Артикул товара                                                                                                                               |
| payload.orders[].items[].name      | Название товара из товарного фида. Если товара нет в товарном фиде, будет `---`                                                              |
| payload.orders[].items[].quantity  | Количество единиц товара                                                                                                                     |
| payload.orders[].items[].price     | Цена товара после применения всех скидок, равна значению `items[].total_after_discounts_per_product` из [`checkout/estimate`](./estimate.md) |
| ayload.members[].limits_reset_date | Дата, когда будет выполнен следующий сброс лимитов                                                                                           |