# Проверка одноразового кода 

Верифицирует допустимость действия проверкой одноразового кода.

```
GET https://api.rees46.ru/loyalty/otp/check
```
## Параметры

| Параметр    | Обязателен? | Описание                                                |
|-------------|-------------|---------------------------------------------------------|
| shop_id     | Да          | API-ключ                                                |
| shop_secret | Да          | Секретный ключ API                                      |
| identifier  | Да          | Номер телефона клиента                                  |
| event       | Да          | Код события (действия), допустимость которого проверяем |
| code        | Да          | Значение одноразового кода из сообщения                 |


## Запрос

Пример запроса:

```shell 
curl https://api.rees46.ru/loyalty/subscriptions/otp/check?shop_id=...&shop_secret=...&identifier=...&event=...&code=...
```

Пример JSON-тела:

```json payload.json
{
    "shop_id": "...",
    "shop_secret": "...",
    "identifier": "7XXXXXXXXX",
    "event": "verify_phone",
    "code": "33871"
}
```


## Ответ

Пример ответа сервера:

```json 
{
  "success": true
}
```

В случае ошибки ответ будет в формате:

```json 
{
  "success": false,
  "payload": {
    "message": "Code is not correct"
  }
}
```
