# История заказов покупателя

Возвращает список заказов покупателя из программы лояльности. Не путать с заказами из CDP: они работают параллельно и CDP вернет все заказы клиента, в том числе оформленные до вступления в программу лояльности.

```
GET https://api.rees46.ru/loyalty/checkout/history
```


## Параметры


| Параметр    | Обязателен? | Описание                                     |
|-------------|-------------|----------------------------------------------|
| shop_id     | Да          | API-ключ                                     |
| shop_secret | Да          | Секретный ключ API                           |
| identifier  | Да          | Идентификатор участника программы лояльности |


## Запрос

Пример запроса:

```shell 
curl https://api.rees46.ru/loyalty/checkout/history?shop_id=...&shop_secret=...&identifier=...
```

## Ответ

Пример ответа сервера:

```json 
{
  "success": true,
  "payload": {
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

Расшифровка ответа:


| Параметр                          | Описание                                                                                                                                     |
|-----------------------------------|----------------------------------------------------------------------------------------------------------------------------------------------|
| success                           | Запрос выполнен успешно или нет                                                                                                              |
| payload.message                   | Сообщение с результатом обработки запроса                                                                                                    |
| payload.orders[]                  | Список заказов                                                                                                                               |
| payload.orders[].id               | Идентификатор заказа                                                                                                                         |
| payload.orders[].date             | Дата заказа                                                                                                                                  |
| payload.orders[].status           | Статус заказа                                                                                                                                |
| payload.orders[].total            | Сумма к оплате, равна значению `order_to_pay` из [`checkout/estimate`](./estimate.md)                                                        |
| payload.orders[].items[]          | Список товаров в заказе                                                                                                                      |
| payload.orders[].items[].id       | Артикул товара                                                                                                                               |
| payload.orders[].items[].name     | Название товара из товарного фида. Если товара нет в товарном фиде, будет `---`                                                              |
| payload.orders[].items[].quantity | Количество единиц товара                                                                                                                     |
| payload.orders[].items[].price    | Цена товара после применения всех скидок, равна значению `items[].total_after_discounts_per_product` из [`checkout/estimate`](./estimate.md) |


В случае ошибки данных вернет подобную структуру:

```json 
{
  "success": false,
  "payload": {
    "message": "Loyalty program member is not found"
  }
}
```
