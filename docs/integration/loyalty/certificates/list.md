# Список сертификатов пула 

Метод возвращает список всех существующих сертификатов конкретного пула.

Сертификаты фильтруются датам события. Доступные события:
- Дата создания.
- Дата активации.
- Дата деактивации.


```
GET https://api.rees46.ru/loyalty/certificates
```

## Параметры

| Параметр    | Обязателен? | Описание                                                                                    |
|-------------|-------------|---------------------------------------------------------------------------------------------|
| shop_id     | Да          | API-ключ                                                                                    |
| shop_secret | Да          | Секретный ключ API                                                                          |
| code        | Да          | Уникальный код пула сертификатов                                                            |
| event       | Да          | Тип события для фильтрации по дате. Одно значение из: `created`, `activated`, `deactivated` |
| date_from   | Да          | Начало периода события в формате `YYYY-MM-DD`                                               |
| date_to     | Да          | Конец периода события в формате `YYYY-MM-DD`                                                |

## Запрос

Пример запроса:

```shell 
curl https://api.rees46.ru/loyalty/loyalty/certificates?shop_id=...&shop_secret=...&code=...&event=...&date_from...&date_to...
```

## Ответ

Пример ответа сервера:

```json 
{
  "status": "success",
  "payload": {
    "certificates": [],
    "pool": {
      "id": 5,
      "status": "active",
      "name": "MN TEST2",
      "description": "",
      "nominal": 1000,
      "flexible_nominal": false,
      "max_flexible_nominal": 10000,
      "personal": false,
      "code": "CERTIFICATES_POOL_CODE",
      "expiration_days": 0,
      "streams": [],
      "location_ids": [],
      "min_order_value": 2000,
      "payable_order_share": 100,
      "exclude_products": [
        {
          "sku": {
            "values": "291383",
            "operator": "in"
          },
          "brand": {
            "values": [
              "navien",
              "asus",
              "onkron",
              "nanoleaf"
            ],
            "operator": "in"
          },
          "price": {
            "value": 50000,
            "operator": "more_than_or_equal_to"
          },
          "category": {
            "values": [
              "af-new-year",
              "af-gift-baskets",
              "af-alcohol-gift",
              "af-cosmetic-kits"
            ],
            "operator": "in"
          }
        },
        {
          "sku": {
            "values": "291396",
            "operator": "in"
          },
          "brand": {
            "values": [
              "honor",
              "sony",
              "kingslong"
            ],
            "operator": "in"
          },
          "price": {
            "value": 200,
            "operator": "more_than_or_equal_to"
          },
          "category": {
            "values": [
              "14",
              "127",
              "481"
            ],
            "operator": "in"
          }
        }
      ],
      "promo": false,
      "activation_delay": 0
    }
  }
}
```

Расшифровка ответа:

| Параметр                                       | Описание                                                                       |
|------------------------------------------------|--------------------------------------------------------------------------------|
| success                                        | Запрос выполнен успешно или нет                                                |
| payload.certificates[]                         | Список [объектов сертификатов](./object-certificate.md)                        |
| payload.pool                                   | Объект [пула сертификатов](./object-pool.md)                                   |

Вот пример запроса с ошибкой. Он содержит информацию о статусе запроса и расшифровку ошибки:

```json 
{
  "status": "error",
  "message": "Parameter `event` is not valid"
}
```