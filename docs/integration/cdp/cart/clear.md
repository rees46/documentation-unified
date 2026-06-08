# Очистка корзины клиента

Этот метод просто очищает корзину клиента на стороне CDP. Это действие не вызывает никаких событий и не равносильно событию [очистки корзины](../standard-events/remove-from-cart.md).

Это серверный метод, поэтому запросы можно делать по любому идентификатору клиента.

```
DELETE https://api.rees46.ru/products/cart/clear
```

## Параметры

| Параметр     | Тип     | Обязателен? | Описание                                   |
|--------------|---------|-------------|--------------------------------------------|
| shop_id      | String  | Да          | API-ключ                                   |
| shop_secret  | String  | Да          | Секретный API-ключ                         |
| phone*       | String  | Да          | Номер телефона клиента                     |
| email*       | String  | Да          | Email клиента                              |
| loyalty_id*  | String  | Да          | Идентификатор программы лояльности клиента |
| external_id* | String  | Да          | Внешний идентификатор клиента              |
| telegram_id* | String  | Да          | Telegram ID клиента                        |

:::info Идентификаторы
Параметры, отмеченные [*] — обязателен хотя бы один из них.
:::

## Запрос

Пример запроса:
```shell [S2S]
# По номеру телефона
curl --location --request DELETE 'https://api.rees46.ru/products/cart/clear?phone=...&shop_id=...&shop_secret=...'

# По email
curl --location --request DELETE 'https://api.rees46.ru/products/cart/clear?email=...&shop_id=...&shop_secret=...'

# По идентификатору программы лояльности
curl --location --request DELETE 'https://api.rees46.ru/products/cart/clear?loyalty_id=...&shop_id=...&shop_secret=...'

# По внешнему идентификатору пользователя
curl --location --request DELETE 'https://api.rees46.ru/products/cart/clear?external_id=...&shop_id=...&shop_secret=...'

# По Telegram ID
curl --location --request DELETE 'https://api.rees46.ru/products/cart/clear?telegram_id=...&shop_id=...&shop_secret=...'

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
    "message": "Shop not found"
  }
}
```