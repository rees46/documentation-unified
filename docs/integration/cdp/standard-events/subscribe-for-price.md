# Подписка на снижение цены

Клиент может подписаться на снижение цены определенного товара в определенной локации.

1. Триггер "Цена на товар снижена"
2. Отчет о спросе на снижение цены товаров

:::info Автоматическая отписка
Когда клиенту уходит триггерное письмо с уведомлением о снижении цены, данная подписка автоматически удаляется, чтобы не отправлять повторных уведомлений.
:::

## Параметры

| Параметр | Обязателен? | Описание                                                                                                                                |
|----------|-------------|-----------------------------------------------------------------------------------------------------------------------------------------|
| shop_id  | Да          | API-ключ                                                                                                                                |
| did      | Да          | [Идентификатор устройства](../entities/did.md)                                                                                          |
| sid      | Да          | [Идентификатор сессии](../entities/sid.md) . Обязателен при передаче `did`, желателен при других идентификаторах, если есть возможность |
| email    | Нет         | Email клиента, если есть                                                                                                                |
| phone    | Нет         | Номер телефона клиента, если есть                                                                                                       |
| item_id  | Да          | Идентификатор товара                                                                                                                    | 
| item_ids | Нет         | Если товаров несколько, можно передать их в строке через запятую в `item_ids` вместо `item_id`                                          | 
| price    | Да          | Текущая цена товара                                                                                                                     |

## Запрос

:::danger TODO
Ревью мобильных SDK
:::

Пример запроса:

::: code-group
```shell [S2S]
# Подписаться на снижение цены товара
curl --location --request POST 'https://api.rees46.ru/subscriptions/subscribe_for_product_price' \
--header 'Content-Type: application/json' \
--data-raw '{
    "shop_id":"SHOP_ID",
    "email":"EMAIL",
    "phone":"PHONE",
    "did":"DeviceID",
    "item_id":"11111",
    "price": "1000"
}'

# Отписаться от снижения цены на несколько товаров
curl --location --request POST 'https://api.rees46.ru/subscriptions/unsubscribe_from_product_price' \
--header 'Content-Type: application/json' \
--data-raw '{
    "shop_id":"SHOP_ID",
    "email":"EMAIL",
    "phone":"PHONE",
    "did":"DeviceID",
    "item_ids":"11111, 22222, 333333"
}'

# Удалить все подписки на снижение цены клиента
curl --location --request POST 'https://api.rees46.ru/subscriptions/unsubscribe_from_product_price' \
--header 'Content-Type: application/json' \
--data-raw '{
    "shop_id":"SHOP_ID",
    "email":"EMAIL",
    "phone":"PHONE",
    "did":"DeviceID",
    "item_ids":""
}'
```

```javascript [JS SDK]
// Подписаться на снижение цены
r46('subscribe_trigger', 'product_price_decrease', {email: 'John.Doe@store.com', item: '3323', price: 160});

// Отписаться от определенных товаров
r46('unsubscribe_trigger', 'product_price_decrease', {email: 'John.Doe@store.com', item_ids: [3323, 100500, 'ABCDEF']});

// Очистить все попдиски клиента на снижение цены
r46('unsubscribe_trigger', 'product_price_decrease', {email: 'John.Doe@store.com', item_ids: []});
```

```swift [iOS] 
// Подписаться на один товар
sdk.subscribeForPriceDrop(id: "PRODUCT_ID", currentPrice: 333.49);

// Подпсаться на товар с указанием email
sdk.subscribeForPriceDrop(id: "PRODUCT_ID", currentPrice: 333.49, email: "mail@example.com");

// Подписаться с указанием номера телефона
sdk.subscribeForPriceDrop(id: "PRODUCT_ID", currentPrice: 333.49, phone: "+19999999999");

// Отписаться от определенных товаров
sdk.unsubscribeForPriceDrop(
   itemIds: ["PRODUCT_ID"],
   currentPrice: 333.49,
   email: "USER_EMAIL",
   phone: "USER_PHONE"
)

// Отписаться от всех товаров
sdk.unsubscribeForPriceDrop(
   itemIds: [],
   currentPrice: 333.49,
   email: "USER_EMAIL",
   phone: "USER_PHONE"
)
```


```kotlin [Kotlin]
// Подписаться на определенный товар
sdk.subscribeForPriceDrop(YOUR_PRODUCT_ID, YOUR_PRICE)

// Подписаться на определенный товар с указанием email
sdk.subscribeForPriceDrop(YOUR_PRODUCT_ID, YOUR_PRICE, YOUR_EMAIL)

// Подписаться на определенный товар с указанием номера телефона
sdk.subscribeForPriceDrop(YOUR_PRODUCT_ID, YOUR_PRICE, null, YOUR_PHONE_NUMBER)

// Отписаться от определенных товаров
sdk.unsubscribeForPriceDrop(arrayOf(YOUR_PRODUCT_ID_1, YOUR_PRODUCT_ID_2, YOUR_PRODUCT_ID_3))

// Отписаться от всех товаров
sdk.unsubscribeForPriceDrop(arrayOf())
```


```java [Java (deprecated)]
// Подписаться на определенный товар
rees46.subscribeForPriceDrop(YOUR_PRODUCT_ID, YOUR_PRICE);

// Подписаться на определенный товар с указанием email
rees46.subscribeForPriceDrop(YOUR_PRODUCT_ID, YOUR_PRICE, YOUR_EMAIL);

// Подписаться на определенный товар с указанием номера телефона
rees46.subscribeForPriceDrop(YOUR_PRODUCT_ID, YOUR_PRICE, null, YOUR_PHONE_NUMBER);

// Отписаться от определенных товаров
rees46.unsubscribeForPriceDrop(arrayOf<String>(YOUR_PRODUCT_ID_1, YOUR_PRODUCT_ID_2, YOUR_PRODUCT_ID_3));

// Отписаться от всех товаров
rees46.unsubscribeForPriceDrop(arrayOf<String>());
```


```javascript [ReactNative]
TBD
```
:::


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
    "message": "Device ID is not valid"
  }
}
```