# Список категорий NPS

Метод возвращает список категорий NPS, которые можно использовать для опроса клиентов. Категориями является то, что клиенты оценивают продукт или услугу на основе своей лояльности и рекомендаций. Например, процесс оплаты заказа или доставку или результат обращения в колл-центр.

Информация о категории используется в форме получения отзыва в методе [nps/create](./create.md).

```
GET https://api.rees46.ru/nps/categories
```

## Параметры

| Параметр     | Тип     | Обязателен? | Описание |
|--------------|---------|-------------|----------|
| shop_id      | String  | Да          | API-ключ |


## Запрос

Пример запроса:

```shell [S2S]
curl "https://api.rees46.ru/nps/categories?shop_id=..."
```


## Ответ

Пример ответа сервера:

```json 
[
  {
    "name": "...",
    "code": "...",
    "detractor_question": "...",
    "promoter_question": "...",
    "passive_question": "...",
    "detractor_success": "...",
    "promoter_success": "...",
    "passive_success": "..."
  },
  {
    "name": "...",
    "code": "...",
    "detractor_question": "...",
    "promoter_question": "...",
    "passive_question": "...",
    "detractor_success": "...",
    "promoter_success": "...",
    "passive_success": "..."
  }
]
```

:::warning Внимание
В будущем структура будет приведена к стандарту ответа:

```json
{
  "status": "success",
  "payload": {
    "categories": [
      {
        "name": "...",
        "code": "...",
        "detractor_question": "...",
        "promoter_question": "...",
        "passive_question": "...",
        "detractor_success": "...",
        "promoter_success": "...",
        "passive_success": "..."
      },
      {
        "name": "...",
        "code": "...",
        "detractor_question": "...",
        "promoter_question": "...",
        "passive_question": "...",
        "detractor_success": "...",
        "promoter_success": "...",
        "passive_success": "..."
      }
    ]
  }
}
```
:::

Расшифровка свойств ответа:

| Свойство           | Тип     | Описание                                                  |
|--------------------|---------|-----------------------------------------------------------|
| name               | String  | Название категории                                        |
| code               | String  | Уникальный код категории                                  |
| detractor_question | String  | Вопрос для оценки от 0 до 6                               |
| passive_question   | String  | Вопрос для оценки от 7 до 8                               |
| promoter_question  | String  | Вопрос для оценки от 9 до 10                              |
| detractor_success  | String  | Сообщение с благодарностью за отзыв для оценки от 0 до 6  |
| passive_success    | String  | Сообщение с благодарностью за отзыв для оценки от 7 до 8  |
| promoter_success   | String  | Сообщение с благодарностью за отзыв для оценки от 9 до 10 |


В случае ошибки ответ будет в формате:

```json 
{
  "status": "error",
  "payload": {
    "message": "Invalid API key"
  }
}
```