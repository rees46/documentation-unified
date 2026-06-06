# Список отзывов

Метод возвращает список всех сохраненных в платформе отзывов NPS. 

Метод возвращает максимум 1000 отзывов в запросе. Пагинации нет. Поэтому рекомендуется использовать даты для ограничения выборки по дням.



```
GET https://api.rees46.ru/nps/reviews
```

## Параметры

| Параметр    | Тип     | Обязателен? | Описание                                                      |
|-------------|---------|-------------|---------------------------------------------------------------|
| shop_id     | String  | Да          | API-ключ                                                      |
| shop_secret | String  | Да          | Секретный API-ключ                                            |
| date_from   | String  | Нет         | Дата начала периода выборки отзывов в формате `YYYY-MM-DD`    |
| date_to     | String  | Нет         | Дата окончания периода выборки отзывов в формате `YYYY-MM-DD` |
| channel     | String  | Нет         | Код канала из [nps/channels](./channels.md)                   |
| category    | String  | Нет         | Код категории из [nps/categories](./categories.md)            |

## Запрос

Пример запроса:

```shell [S2S]
curl "https://api.rees46.ru/nps/reviews?shop_id=...&shop_secret=...&date_from=...&date_to=...&channel=...&category=..."
```

## Ответ

Пример ответа сервера:

```json 
[
  {
    "id": 1,
    "channel": "email",
    "category": "delivery",
    "rate": 7,
    "comment": "Lorem ipsum",
    "client_id": 1515915625535836508,
    "email": "example@test.com",
    "phone": "79876543210",
    "created_at": "2023-07-21T02:35:06.374Z"
  },
  {
    "id": 2,
    "channel": "popup",
    "category": "checkout",
    "rate": 9,
    "comment": null,
    "client_id": 1515915625535836508,
    "email": "example@test.com",
    "phone": "79876543210",
    "created_at": "2023-07-21T02:35:06.374Z"
  }
]
```

:::warning Внимание
В будущем структура будет приведена к стандарту ответа:

```json
{
  "status": "success",
  "payload": {
    "reviews": [
      {
        "id": 1,
        "channel": "email",
        "category": "delivery",
        "rate": 7,
        "comment": "Lorem ipsum",
        "client_id": 1515915625535836508,
        "email": "example@test.com",
        "phone": "79876543210",
        "created_at": "2023-07-21T02:35:06.374Z"
      },
      {
        "id": 2,
        "channel": "popup",
        "category": "checkout",
        "rate": 9,
        "comment": null,
        "client_id": 1515915625535836508,
        "email": "example@test.com",
        "phone": "79876543210",
        "created_at": "2023-07-21T02:35:06.374Z"
      }
    ]
  }
}
```

Рекомендуем подготовить обработчик ответа под новую структуру, чтобы ваша интеграция не сломалась.
:::

Расшифровка свойств ответа:

| Свойство   | Тип     | Описание                      |
|------------|---------|-------------------------------|
| id         | Integer | Идентификатор отзыва          |
| channel    | String  | Код канала                    |
| category   | String  | Код категории                 |
| rate       | Integer | Оценка                        |
| comment    | String  | Комментарий к оценке          |
| client_id  | Integer | Идентификатор клиента в CDP   |
| email      | String  | Email клиента в CDP           |
| phone      | String  | Номер телефона клиента в CDP  |
| created_at | String  | Дата и время получения отзыва |


В случае ошибки ответ будет в формате:

```json 
{
  "status": "error",
  "payload": {
    "message": "Invalid API key"
  }
}
```