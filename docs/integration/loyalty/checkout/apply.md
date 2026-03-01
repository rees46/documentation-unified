# Создание заказа и блокировка средств

Когда на стороне продавца заказ создан и готов к оплате, необходимо создать заказ на нашей стороне, заблокировать бонусы, сертификаты и промокоды во избежание фрода.

Метод получает тот же набор параметров, что и в [`checkout/estimate`](./estimate.md), а также обязательно идентификатор текущего заказа.

::: info Важно
Номер заказа `order_id` должен быть уникальным. Если ранее вы подтверждали или отменяли заказ с таким же `order_id`, запрос выполнится с ошибкой.

При этом, если заказ все еще в начальном статусе и покупатель перед оплатой решил еще раз изменить состав заказа, вы можете безопасно делать повторные запросы `checkout/apply` с тем же номером заказа.
:::

::: warning Особо важно
Если клиент еще не перешел к оплате, а просто меняет содержимое корзины, не используйте данный метод для расчета скидок, т.к. блокировка и разблокировка бонусов и сертификатов будет создавать лишние транзакции в логах системы, что в последующем усложнит идентификацию фрода.
:::

```
POST https://api.rees46.ru/loyalty/checkout/apply
```


## Параметры

Те же самые параметры, что и в [`checkout/estimate`](./estimate.md), с той разницей, что `order_id` является обязательным.

## Запрос

Пример запроса:

```shell 
curl --header "Content-Type: application/json" \
  --request POST \
  --data-binary "@payload.json" \
  https://api.rees46.ru/loyalty/checkout/apply
```

Пример JSON-тела:

```json payload.json
{
  "shop_id":        "...",
  "shop_secret":    "...",
  "order_id":       "...",
  "identifier":     "...",
  "payment_type":   "...",
  "promo_codes":    ["...", "..."],
  "certificates":   ["...", "..."],
  "charge_bonuses": true,
  "bonuses_amount": 500, 
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
    "order_id": "...",
    "identifier": "...",
    "payment_type": "...",
    "products_total": 5,
    "order_total": 6000,
    "saved_total": 1100,
    "saved_by_discounts": 400,
    "saved_by_bonuses": 600,
    "saved_by_offers": 0,
    "saved_by_certificates": 100,
    "order_to_pay": 4900,
    "order_bonuses_to_charge": 500,
    "bonuses_balance": 1000,
    "bonuses_reward": 500,
    "bonuses_referrer_reward": 0,
    "referrer_identifier": "...",
    "referral_program": 21,
    "applied_promotions": [],
    "rewarded_stickers": {},
    "used_stickers": {},
    "stickers_balance": {},
    "promo_codes": [],
    "promo_codes_failed": [],
    "certificates": [],
    "certificates_failed": [],
    "items": [
      {
        "uniqid": "...",
        "quantity": 4,
        "price": 1000,
        "total": 4000,
        "discountable": true,
        "bonusable": true,
        "rewardable": true,
        "paid_with_offers": 0,
        "paid_with_offers_per_product": 0,
        "paid_with_referral_discounts": 0,
        "paid_with_referral_discounts_per_product": 0,
        "paid_with_discounts": 500,
        "paid_with_discounts_per_product": 100,
        "paid_with_bonuses": 500,
        "paid_with_bonuses_per_product": 100,
        "paid_with_certificates": 100,
        "paid_with_certificates_per_product": 25,
        "bonuses_reward": 400,
        "bonuses_reward_per_product": 100,
        "bonuses_reward_loyalty_program": {
          "total": 40,
          "per_product": 10
        },
        "bonuses_reward_referral_program": {
          "total": 80,
          "per_product": 20
        },
        "bonuses_reward_promotions": {
          "33": { "total": 100, "per_product": 25 },
          "17": { "total": 180, "per_product": 45 }
        },
        "certificates": {
          "14": { "id": 14, "code": "...", "pool_id": 11, "amount": 100, "amount_per_product": 25 },
          "32": { "id": 31, "code": "...", "pool_id": 19, "amount": 160, "amount_per_product": 40 }
        },
        "bonuses_used": 500,
        "bonuses_used_per_product": 125,
        "total_after_discounts": 3500,
        "total_after_discounts_per_product": 875
      },
      ...
    ]
  }
}
```

Расшифровка ответа: то же самое, что и в [`checkout/estimate`](./estimate.md).

В случае ошибки данных вернет подобную структуру:

```json 
{
  "success": false,
  "payload": {
    "message": "Cart contains line items with the same product ID",
    "identifier": "..."
  }
}
```
