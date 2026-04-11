# Подписка на появление товара в наличии

Клиент может подписаться на появление определенного товара в наличии.

1. Триггер "Товар снова в наличии"
2. Отчет о спросе на товары

:::info Автоматическая отписка
Когда клиенту уходит триггерное письмо с уведомлением о товаре в наличии, данная подписка автоматически удаляется, чтобы не отправлять повторных уведомлений.
:::

## Параметры

| Параметр    | Обязателен? | Описание                                                                                                                                |
|-------------|-------------|-----------------------------------------------------------------------------------------------------------------------------------------|
| shop_id     | Да          | API-ключ                                                                                                                                |
| did         | Да          | [Идентификатор устройства](../entities/did.md)                                                                                          |
| sid         | Да          | [Идентификатор сессии](../entities/sid.md) . Обязателен при передаче `did`, желателен при других идентификаторах, если есть возможность |
| email       | Нет         | Email клиента, если есть                                                                                                                |
| phone       | Нет         | Номер телефона клиента, если есть                                                                                                       |
| item_id     | Да          | Идентификатор товара                                                                                                                    | 
| item_ids    | Нет         | Если товаров несколько, можно передать их в строке через запятую в `item_ids` вместо `item_id`                                          | 
| properties  | Нет         | Объект с дополнительными свойствами товара, на который подписывается клиент: `fashion_sizes`, `fashion_color` и `barcode`               | 

## Запрос

:::danger TODO
Ревью мобильных SDK
:::

Пример запроса:

::: code-group
```shell [S2S]
# Подписаться на товар с определенными свойствами
curl --location --request POST 'https://api.rees46.ru/subscriptions/subscribe_for_product_available' \
--header 'Content-Type: application/json' \
--data-raw '{
    "shop_id":"SHOP_ID",
    "email":"EMAIL",
    "item_id":"11111",
    "phone":"PHONE",
    "did":"DeviceID",
    "properties": {"fashion_size":"XL", "barcode": "222222"}
}'

# Подписаться на несколько товаров
curl --location --request POST 'https://api.rees46.ru/subscriptions/unsubscribe_from_product_available' \
--header 'Content-Type: application/json' \
--data-raw '{
    "shop_id":"SHOP_ID",
    "email":"EMAIL",
    "phone":"PHONE",
    "did":"DeviceID",
    "item_ids":"11111, 22222, 333333"
}'

# Отписаться от всех товаров
curl --location --request POST 'https://api.rees46.ru/subscriptions/unsubscribe_from_product_available' \
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
// Подписаться на появление товара в наличии с определенными свойствами
r46('subscribe_trigger', 'product_available', {email: 'John.Doe@store.com', item: '3323', properties: {fashion_size: "XL", barcode: "222222"}});

// Подписаться на несколько товаров
r46('unsubscribe_trigger', 'product_available', {email: 'John.Doe@store.com', item_ids: [3323, 100500, 'ABCDEF']});

// Отписаться от всех товаров
r46('unsubscribe_trigger', 'product_available', {email: 'John.Doe@store.com', item_ids: []});
```

```swift [iOS] 
// Подписаться на один товар с расширенными свойствами
sdk.subscribeForBackInStock(id: "PRODUCT_ID", email: "USER_EMAIL", phone: "USER_PHONE", fashionSize: ["SIZE1", "SIZE2"]) { result in
    switch result {
    case .success:
        // Handle success
    case .failure(let error):
        // Handle failure
    }
}

// Отписаться от определенных товаров
sdk.unsubscribeForBackInStock(itemIds: ["ITEM_ID1", "ITEM_ID2"], email: "USER_EMAIL", phone: "USER_PHONE") { result in
    switch result {
    case .success:
        // Handle success
    case .failure(let error):
        // Handle failure
    }
}
sdk.unsubscribeForBackInStock(itemIds: [], email: "USER_EMAIL", phone: "USER_PHONE") { result in
    switch result {
    case .success:
        // Handle success
    case .failure(let error):
        // Handle failure
    }
}
```


```kotlin [Kotlin]
// Подписаться на определенный товар
sdk.subscribeForBackInStock(YOUR_PRODUCT_ID)

// Подписаться на определенный товар с указанием email
sdk.subscribeForBackInStock(YOUR_PRODUCT_ID, YOUR_EMAIL)

// Подписаться на определенный товар с указанием номера телефона
sdk.subscribeForBackInStock(YOUR_PRODUCT_ID, YOUR_PHONE_NUMBER)

// Подписаться на определенный товар определенного размера (одежда)
val properties = JSONObject()
  properties.put("fashion_size", YOUR_FASHION_SIZE)
  sdk.subscribeForBackInStock(YOUR_PRODUCT_ID, YOUR_EMAIL, null, properties, null)

// Отписаться от определенных товаров
sdk.unsubscribeForBackInStock(arrayOf(YOUR_PRODUCT_ID_1, YOUR_PRODUCT_ID_2, YOUR_PRODUCT_ID_3))

// Отписаться от всех товаров
sdk.unsubscribeForBackInStock(arrayOf())
```


```java [Java (deprecated)]
// Подписаться на определенный товар
REES46.subscribeForBackInStock("PRODUCT_ID");

// Подписаться на определенный товар с указанием email
REES46.subscribeForBackInStock("PRODUCT_ID", "mail@example.com");

// Подписаться на определенный товар с указанием номера телефона
REES46.subscribeForBackInStock("PRODUCT_ID", "+19999999999");

// Подписаться на определенный товар определенного размера (одежда)
JSONObject properties = new JSONObject();
properties.put("fashion_size", "XL");
REES46.subscribeForBackInStock("PRODUCT_ID", properties, "mail@example.com", null, null);

// Отписаться от определенных товаров
REES46.unsubscribeForBackInStock(new String[] {"11111", "22222", "33333"});

// Отписаться от всех товаров
REES46.unsubscribeForBackInStock(new String[] {});
```


```javascript [ReactNative]
// Подписаться на определенный товар определенного размера (одежда)
REES46.triggers('subscribe_for_product_available', {email: 'John.Doe@store.com', item: '3323', properties: {fashion_size: "XL"}});

// Отписаться от определенных товаров
REES46.triggers('unsubscribe_from_product_available', {email: 'John.Doe@store.com', item_ids: [3323, 100500, 'ABCDEF']});

// Отписаться от всех товаров
REES46.triggers('unsubscribe_from_product_available', {email: 'John.Doe@store.com', item_ids: []});


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