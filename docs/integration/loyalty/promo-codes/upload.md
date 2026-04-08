# Добавить промокоды в список

Метод позволяет добавить массив промокодов в указанный список.  

```
POST https://api.rees46.ru/promo_codes
```

## Параметры

| Параметр    | Обязателен? | Описание                        |
|-------------|-------------|---------------------------------|
| shop_id     | Да          | API-ключ                        |
| shop_secret | Да          | Секретный API-ключ              |
| id          | Да          | Идентификатор списка промокодов |
| codes       | Да          | Массив промокодов               |


## Запрос

Пример запроса:

::: code-group

```shell [S2S]
curl --header "Content-Type: application/json" \
  --request POST \
  --data-binary "@data.json" \
  https://api.rees46.ru/promo_codes
```
:::

Пример JSON-тела:

```json payload.json
{
    "shop_id": "...",
    "shop_secret": "...",
    "id": 715,
    "codes": ["abc", "123", "ohmy"]
}
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
  "success": false,
  "payload": {
    "message": "Shop not found"
  }
}
```