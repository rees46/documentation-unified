# Акции для клиента

Возвращает список всех активных акций, подходящих для клиента и его корзины. Метод полезен, если вы хотите вывести шильдики (бейджи) акций на текущем списке товаров.

Метод безопасный, его можно вызывать с фронта. 

```
GET https://api.rees46.ru/loyalty/promos/for-client
```

## Параметры

| Параметр                | Обязателен? | Описание                                                                                                                                                                                                            |
|-------------------------|-------------|---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| shop_id                 | Да          | API-ключ                                                                                                                                                                                                            |
| did                     | Да*         | Идентификатор устройства клиента из SDK. Обязателен, если не переданы другие идентификаторы клиента                                                                                                                 |
| seance                  | Да*         | Идентификатор сессии клиента. Обязателен, если передается `did`                                                                                                                                                     |
| email                   | Нет         | Email клиента, если есть                                                                                                                                                                                            |
| phone                   | Нет         | Телефон клиента, если есть                                                                                                                                                                                          |
| external_id             | Нет         | Внешний идентификатор клиента, если есть                                                                                                                                                                            |
| loyalty_id              | Нет         | Идентификатор клиента во внешней программе лояльности, если есть                                                                                                                                                    |
| telegram_id             | Нет         | Идентификатор пользователя Telegram, если есть                                                                                                                                                                      |
| location_id             | Нет         | Идентификатор локации (города, точки продаж)                                                                                                                                                                        |
| promo_codes             | Нет         | Список промокодов (массив строк)                                                                                                                                                                                    |
| charge_bonuses          | Нет         | Булевый флаг, списывать бонусы или нет. По-умолчанию `false`                                                                                                                                                        |
| subscription            | Нет         | Код подписки клиента, если есть                                                                                                                                                                                     |
| stream                  | Нет         | Стрим                                                                                                                                                                                                               |
| current_time            | Нет         | Локальное время в точке продаж в формате `HH:MM`, если есть акции, которые работают в определенное время (например, "счастливые часы"). Если время не указано, берется текущее время на сервере в таймзоне магазина |

## Запрос

Пример запроса:

```shell 
curl https://api.rees46.ru/loyalty/promos/for-client?shop_id=...&did=...&sid=...
```

## Ответ

Пример ответа сервера:

```json 
{
  "success": true,
  "payload": {
    "promotions": [
      {
        "id": 33,
        "name": "...",
        "start_date": "2026-01-01",
        "finish_date": "2026-01-14",
        "stream": "ios",
        "badge_label": "-50%",
        "badge_color": "#AABB00",
        "description": "...",
        "reward_type": "discount",
        "reward_rules": {
          "amount_type": "percentage",
          "reward_type": "discount",
          "amount_value": 100,
          "exclude_products": [],
          "include_products": [
            {
              "sku": {
                "values": "300275",
                "operator": "in"
              },
              "brand": {
                "values":[],
                "operator": "in"
              },
              "price": {
                "value": 0,
                "operator": "more_than_or_equal_to"
              },
              "category": {
                "values": [],
                "operator":"in"
              },
              "quantity": {
                "value": 0,
                "operator": "equal"
              }
            }
          ],
          "ignore_discount_limit": true,
          "bonuses_earn_activation": "default",
          "bonuses_earn_expiration": "default",
          "bonuses_earn_activation_value": 0,
          "bonuses_earn_expiration_value": 0
        }
      },
      {
        "id": 12,
        "name": "...",
        "start_date": "2026-01-01",
        "finish_date": "2026-01-14",
        "stream": null,
        "badge_label": "1+1=3",
        "badge_color": "#AA0000",
        "description": "...",
        "reward_type": "bonuses_earn",
        "reward_rules": {}
      }
    ]
  }
}
```

Расшифровка ответа:

| Параметр                          | Описание                                                                                                          |
|-----------------------------------|-------------------------------------------------------------------------------------------------------------------|
| success                           | Запрос выполнен успешно или нет                                                                                   |
| payload.promotions                | Массив акций                                                                                                      |
| payload.promotions[]              | Объект акции                                                                                                      |
| payload.promotions[].id           | Идентификатор акции                                                                                               |
| payload.promotions[].name         | Название акции                                                                                                    |
| payload.promotions[].description  | Описание акции                                                                                                    |
| payload.promotions[].start_date   | Дата начала действия акции                                                                                        |
| payload.promotions[].finish_date  | Дата окончания действия акции                                                                                     |
| payload.promotions[].stream       | Стрим, в котором действует акция                                                                                  |
| payload.promotions[].badge_label  | Текст бейджа                                                                                                      |
| payload.promotions[].badge_color  | Цвет бейджа                                                                                                       |
| payload.promotions[].reward_type  | Тип вознаграждения: `discount`, `bonuses_earn`, `bonuses_usage`                                                   |
| payload.promotions[].reward_rules | Правила вознаграждения: JSON объект с указанием, на какие товары, категории или бренды применяется вознаграждение |

В случае ошибки ответ будет в формате:

```json 
{
  "success": false,
  "payload": {
    "message": "Shop not found"
  }
}
```