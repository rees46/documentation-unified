# Акции под корзину

Более старая реализация списка акций под корзину клиента. Возможно, лучше пользоваться [методом акций для клиента](./client.md). Данный метод вернет список акций, которые можно показать в корзине клиента.

```
POST https://api.rees46.ru/loyalty/promos/cart
```

## Параметры

| Параметр                | Обязателен? | Описание                                                                                                                                                                                                            |
|-------------------------|-------------|---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| shop_id                 | Да          | API-ключ                                                                                                                                                                                                            |
| shop_secret             | Да          | Секретный ключ API                                                                                                                                                                                                  |
| identifier              | Да          | Идентификатор участника программы лояльности                                                                                                                                                                        |
| cart_items[]            | Нет         | Массив товаров или услуг в корзине покупателя. Не может быть пустым                                                                                                                                                 |
| cart_items[].product_id | Да          | Артикул товара или услуги                                                                                                                                                                                           |
| cart_items[].price      | Да          | Исходная цена товара до применения скидок и акций                                                                                                                                                                   |
| cart_items[].quantity   | Да          | Количество единиц данного товара в корзине                                                                                                                                                                          |
| promo_codes             | Нет         | Список промокодов (массив строк)                                                                                                                                                                                    |
| charge_bonuses          | Нет         | Булевый флаг, списывать бонусы или нет. По-умолчанию `false`                                                                                                                                                        |
| subscription            | Нет         | Код подписки клиента, если есть                                                                                                                                                                                     |
| stream                  | Нет         | Стрим                                                                                                                                                                                                               |
| current_time            | Нет         | Локальное время в точке продаж в формате `HH:MM`, если есть акции, которые работают в определенное время (например, "счастливые часы"). Если время не указано, берется текущее время на сервере в таймзоне магазина |

## Запрос

Пример запроса:

```shell 
curl --header "Content-Type: application/json" \
  --request POST \
  --data-binary "@payload.json" \
  https://api.rees46.ru/loyalty/promos/cart
```
Пример JSON-тела:

```json payload.json
{
  "shop_id":        "...",
  "did":            "...",
  "sid":            "...",
  "promo_codes":    ["...", "..."],
  "charge_bonuses": true,
  "stream":         "pos",
  "current_time":   "17:31",
  "cart_items": [
    {"product_id": "...", "price": 1000, "quantity": 4},
    {"product_id": "...", "price": 2000, "quantity": 1, "discountable": false, "bonusable": false, "rewardable": false }
  ]
}
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

| Параметр                         | Описание                         |
|----------------------------------|----------------------------------|
| success                          | Запрос выполнен успешно или нет  |
| payload.promotions               | Массив акций                     |
| payload.promotions[]             | Объект акции                     |
| payload.promotions[].id          | Идентификатор акции              |
| payload.promotions[].name        | Название акции                   |
| payload.promotions[].description | Описание акции                   |
| payload.promotions[].start_date  | Дата начала действия акции       |
| payload.promotions[].finish_date | Дата окончания действия акции    |
| payload.promotions[].stream      | Стрим, в котором действует акция |
| payload.promotions[].badge_label | Текст бейджа                     |
| payload.promotions[].badge_color | Цвет бейджа                      |

В случае ошибки ответ будет в формате:

```json 
{
  "success": false,
  "payload": {
    "message": "Shop not found"
  }
}
```