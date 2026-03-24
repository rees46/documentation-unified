# Получение промокода из списка

Метод возвращает промокод для клиента.

```
GET https://api.rees46.ru/promo_codes/fetch
```

## Параметры

| Параметр | Обязателен? | Описание                                   |
|----------|-------------|--------------------------------------------|
| shop_id  | Да          | API-ключ                                   |
| id       | Да          | Идентификатор списка промокодов            |
| did      | Да          | Идентификатор устройства клиента из JS SDK |
| sid      | Да          | Идентификатор сессии клиента из JS SDK     |



## Запрос

Пример запроса:

::: code-group

```shell [S2S]
curl https://api.rees46.ru/promo_codes/fetch?shop_id=...&shop_secret=...&offset=0&limit=30&active=true&exclude=3,1,44
```

```js [JS SDK]
r46("get_promo_code", 
  {
    id: PROMOCODE_LIST_ID
  }, 
  success_callback, 
  error_callback
);
```
:::



## Ответ

Пример ответа сервера:

```json 
{
  "code":  "UNIQUE_CODE"
}
```

Расшифровка ответа:

| Параметр            | Описание                        |
|---------------------|---------------------------------|
| code                | Выданный клиенту промокод       |

В случае ошибки ответ будет в формате:

```json 
{
  "success": false,
  "payload": {
    "message": "Shop not found"
  }
}
```