# Информация о заказе

Метод позволяет получить информацию о заказе программы лояльности. Не путать с общими заказами из CDP (они работают параллельно).



```
GET https://api.rees46.ru/loyalty/checkout/details
```


## Параметры


| Параметр    | Обязателен? | Описание           |
|-------------|-------------|--------------------|
| shop_id     | Да          | API-ключ           |
| shop_secret | Да          | Секретный ключ API |
| order_id    | Да          | Номер заказа       |


## Запрос

Пример запроса:

```shell 
curl https://api.rees46.ru/loyalty/checkout/details?shop_id=...&shop_secret=...&order_id=...
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
    "message": "Order ABC not found"
  }
}
```
