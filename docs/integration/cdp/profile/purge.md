# Удаление персональных данных профиля

Полностью обезличивает профиль. Полезно применять в случае отзыва покупателем персональных данных.

Обнуляемые свойства:

- phone;
- email;
- first_name;
- last_name;
- middle_name;
- loyalty_id;
- external_id;
- кастомные свойства клиента.

```
DELETE https://api.rees46.ru/profile/purge
```


## Параметры

| Параметр     | Обязателен? | Описание                                           |
|--------------|-------------|----------------------------------------------------|
| shop_id      | Да          | API-ключ                                           |
| shop_secret  | Да          | Секретный API-ключ                                 |
| email*       | Нет         | Email клиента                                      |
| phone*       | Нет         | Телефон клиента                                    |
| external_id* | Нет         | Внешний идентификатор клиента                      |
| loyalty_id*  | Нет         | Идентификатор внешней программы лояльности клиента |
| telegram_id* | Нет         | Telegram ID клиента                                |


## Запрос

Пример запроса:

```shell [S2S]
// Базовый пример
curl 'https://api.rees46.ru/profile/purge' \
    -X 'DELETE' \
    -H 'Content-Type: application/json' \
    --data-raw '{"shop_id":"SHOP_ID", "shop_secret":"SHOP_SECRET", "email":"EMAIL"}'
```

## Ответ

Пример ответа сервера:

```json 
{
  "status": "success"
}
```

В случае ошибки ответ будет в формате:

```json 
{
  "status": "error",
  "payload": {
    "message": "Profile not found"
  }
}
```