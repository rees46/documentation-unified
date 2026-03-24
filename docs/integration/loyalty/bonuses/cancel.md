# Отмена бонусов за действие

Метод позволяет отменить [транзакцию за действие](./reward.md) (вознаграждение).


```
PATCH https://app.rees46.ru/loyalty/bonuses/cancel
```

## Параметры

| Параметр       | Обязателен? | Описание                                                                                                                                                        |
|----------------|-------------|-----------------------------------------------------------------------------------------------------------------------------------------------------------------|
| shop_id        | Да          | API-ключ                                                                                                                                                        |
| shop_secret    | Да          | Секретный ключ API                                                                                                                                              |
| identifier     | Да          | Номер телефона клиента, идентификатор участника ПЛ                                                                                                              |
| transaction_id | Да          | Идентификатор транзакции, которую хотим отменить                                                                                                                |

## Запрос

Пример запроса:

```shell 
curl --header "Content-Type: application/json" \
  --request PATCH \
  --data-binary "@payload.json" \
  https://api.rees46.ru/loyalty/bonuses/cancel
```

Пример JSON-тела:

```json payload.json
{
    "shop_id": "...",
    "shop_secret": "...",
    "identifier": "7XXXXXXXXX",
    "id": "3387"
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
    "message": "Identifier is not valid"
  }
}
```