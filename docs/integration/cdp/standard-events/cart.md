# Добавление в корзину

Нужно передавать это событие, когда клиент добавляет товар в корзину.

:::warning Важно
Если товар можно добавить в корзину из результатов поиска или из просмотра товаров в категории, это событие тоже нужно передавать. При этом, если клиент перешел на список товаров из поиска REES46, то нужно передать и атрибуцию параметрами `recommended_by` и `recommended_code`.
:::

На данное событие завязаны следующие механики платформы:

1. Триггер "Брошенная корзина"
2. Триггер "Цена на товар в корзине снижена"
3. Отображение корзины в карточке клиента
4. Некоторые товарные метрики
5. Метрики инструментов, таких как "товарные рекомендации", "сторис", "слайдеры", рассылки и пр.


```
POST https://api.rees46.ru/push
```

## Параметры

| Параметр         | Обязателен? | Описание                                                                                                                                                                                                                 |
|------------------|-------------|--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| shop_id          | Да          | API-ключ                                                                                                                                                                                                                 |
| did*             | Да          | [Идентификатор устройства](../entities/did.md)                                                                                                                                                                           |
| sid              | Да          | [Идентификатор сессии](../entities/sid.md) . Обязателен при передаче `did`, желателен при других идентификаторах, если есть возможность                                                                                  |
| email*           | Да          | Email клиента                                                                                                                                                                                                            |
| phone*           | Да          | Телефон клиента                                                                                                                                                                                                          |
| external_id*     | Да          | Внешний идентификатор клиента                                                                                                                                                                                            |
| loyalty_id*      | Да          | Идентификатор внешней программы лояльности клиента                                                                                                                                                                       |
| telegram_id*     | Да          | Telegram ID клиента                                                                                                                                                                                                      |
| event            | Да          | Код события. В данном случае `cart`                                                                                                                                                                                      |
| segment          | Нет         | Идентификатор сегмента для встроенных A/B-тестов. Значения: `A` или `B` (латиница)                                                                                                                                       |
| recommended_by   | Нет         | Признак атрибуцированного события – инструмент. Значения обычно берутся из ссылки на товар, возвращаемый нашим API                                                                                                       |
| recommended_code | Нет         | Признак атрибуцированного события – идентификатор. Значения обычно берутся из ссылки на товар, возвращаемый нашим API                                                                                                    |
| stream           | Нет         | [Стрим](../entities/stream.md)                                                                                                                                                                                           |
| referer          | Нет         | Страница сайта, на которой произошло событие                                                                                                                                                                             |
| items            | Да          | Массив товаров для события. Может содержать как один товар, так и полное содержимое корзины                                                                                                                              |
| items[]          | Да          | Объект товара                                                                                                                                                                                                            |
| items[].id       | Да          | Идентификатор (артикул) товара, который указан в импорте товара                                                                                                                                                          |
| items[].quantity | Да          | Количество единиц этого товара в корзине клиента. По-умолчанию равно `1`                                                                                                                                                 |
| items[].price    | Нет         | Цена товара (устарело)                                                                                                                                                                                                   |
| items[].name     | Нет         | Название товара (устарело)                                                                                                                                                                                               |
| items[].brand    | Нет         | Бренд товара (устарело)                                                                                                                                                                                                  |
| items[].stock    | Нет         | Флаг, что товар все еще в наличии (устарело)                                                                                                                                                                             |
| full_cart        | Нет         | Булевый флаг. Если `true`, то корзина клиента полностью перезаписывается тем, что отправлено в запросе. Если `false` или отсутствует, то переданные в запросе товары добавляются к уже существующему содержимому корзины | 

:::info Идентификаторы
Параметры, отмеченные [*] - обязателен хотя бы один из них. На стороне сайта или мобильных приложений SDK автоматически передает `did`.
:::

:::info Совет про `full_cart`
Используйте событие без `full_cart`, когда пользователь добавляет товар в корзину с карточки товара или из списка товаров. 

А когда клиент меняет содержимое корзины на ее странице, передавайте все ее содержимое и флаг `full_cart=true`, чтобы гарантированно синхронизировать корзину. Это важно, чтобы в триггере "Брошенная корзина" уходил актуальный список товаров.
:::

:::warning Про атрибуцию
Если клиент добавляет товар в корзину из результатов поиска или из блока рекомендаций, не забудьте передавать параметры `recommended_by` и `recommended_code`.
:::

## Запрос

:::danger TODO
Ревью мобильных SDK
:::

Пример запроса:

::: code-group
```shell [S2S]
# Добавление товара в корзину
curl 'https://api.rees46.ru/push' \
    -X 'POST' \
    -H 'Content-Type: application/json' \
    --data-raw '{"event":"cart", "shop_id":"SHOP_ID", "did":"DEVICE_ID", "sid":"SEANCE_ID", "segment":"A", "items":[{"id":"PRODUCT_ID"}]}'

# Добавление с атрибуцией
curl 'https://api.rees46.ru/push' \
    -X 'POST' \
    -H 'Content-Type: application/json' \
    --data-raw '{"event":"cart", "shop_id":"SHOP_ID", "did":"DEVICE_ID", "sid":"SEANCE_ID", "segment":"A", "recommended_by":"dynamic", "recommended_code":"UNIQUE_RECOMMENDER_CODE", "items":[{"id":"PRODUCT_ID"}]}'

# Перезаписать корзину новым содержимым
curl 'https://api.rees46.ru/push' \
    -X 'POST' \
    -H 'Content-Type: application/json' \
    --data-raw '{"event":"cart", "shop_id":"SHOP_ID", "did":"DEVICE_ID", "sid":"SEANCE_ID", "segment":"A", "full_cart": true, "items":[{"id":"PRODUCT_ID_1"}, {"id":"PRODUCT_ID_2"}]}'

# Очистить корзину
curl 'https://api.rees46.ru/push' \
    -X 'POST' \
    -H 'Content-Type: application/json' \
    --data-raw '{"event":"cart", "shop_id":"SHOP_ID", "did":"DEVICE_ID", "sid":"SEANCE_ID", "segment":"A", "full_cart": true, "items":[]}'
```

```javascript [JS SDK]
// Добавление одного товара в корзину
r46('track', 'cart', 'id');

// Добавление с атрибуцией и количеством единиц товара
r46('track', 'cart', {
  id: "...",
  amount: 3,
  recommended_by: 'dynamic',
  recommended_code: 'UNIQUE_RECOMMENDER_CODE'
});

// Полностью перезаписать корзину
r46('track', 'cart', [
  {
    id: FIRST_PRODUCT_ID,
    amount: 3
  },
  {
    id: LAST_PRODUCT_ID,
    amount: 1
  }
]);

// TODO: добавление с размером одежды и другими служебными свойствами

// Очистить корзину
r46('track', 'cart', []);
```

```swift [iOS] 
// Добавление товара в корзину
sdk.track(event: .productAddedToCart(id: "PRODUCT_ID", amount: 3)) { trackResponse in
    // ... обработка коллбэков показана в описании события "Просмотр товара"
}

// TODO: добавление с размером одежды и другими служебными свойствами

// Полностью синхронизировать корзину
sdk.track(event: .synchronizeCart(items: [CartItem(productId: "784"), CartItem(productId: "785", quantity: 3)]  )) { _ in
  print("Cart is synced callback")
}
```


```kotlin [Kotlin]
// Простое добавление товара в корзину
sdk.trackEventManager.track(Params.TrackEvent.CART, "37")

// Добавление с атрибуцией, количеством товара и служебными свойствами
val cart = Params().apply {
    put(
        Params.Item("37").apply {
            set(Params.Item.COLUMN.FASHION_SIZE, "M")
            set(Params.Item.COLUMN.AMOUNT, 2)
        }
    )
    put(Params.RecommendedBy(Params.RecommendedBy.TYPE.RECOMMENDATION, "e9ddb9cdc66285fac40c7a897760582a"))

}
sdk.trackEventManager.track(Params.TrackEvent.CART, cart)

// Полностью синхронизировать корзину
val fullCart = Params().apply {
    put(Params.Parameter.FULL_CART, true)
    put(
        Params.Item("37").apply {
            set(Params.Item.COLUMN.AMOUNT, 2)
            set(Params.Item.COLUMN.FASHION_SIZE, "M")
        }
    )
    put(
        Params.Item("40").apply {
            set(Params.Item.COLUMN.AMOUNT, 1)
            set(Params.Item.COLUMN.FASHION_SIZE, "M")
        }
    )
}
sdk.trackEventManager.track(Params.TrackEvent.CART, fullCart)
```


```java [Java (deprecated)]
// Простое добавление товара в корзину
REES46.track(Params.TrackEvent.CART, "37");

// Добавление с атрибуцией, количеством товара и служебными свойствами
Params cart = new Params();
cart
    .put(new Params.Item("37")
        .set(Params.Item.COLUMN.FASHION_SIZE, "M")
        .set(Params.Item.COLUMN.AMOUNT, 2)
    )
    .put(new Params.RecommendedBy(Params.RecommendedBy.TYPE.RECOMMENDATION, "e9ddb9cdc66285fac40c7a897760582a"));
REES46.track(Params.TrackEvent.CART, cart);

// Полностью синхронизировать корзину
Params full_cart = new Params();
full_cart
    .put(Params.Parameter.FULL_CART, true)
    .put(new Params.Item("37")
        .set(Params.Item.COLUMN.AMOUNT, 2)
        .set(Params.Item.COLUMN.FASHION_SIZE, "M")
    )
    .put(new Params.Item("40")
        .set(Params.Item.COLUMN.AMOUNT, 1)
        .set(Params.Item.COLUMN.FASHION_SIZE, "M")
    );
REES46.track(Params.TrackEvent.CART, full_cart);
```


```javascript [ReactNative]
// Простое добавление товара в корзину
sdk.track("cart", "id");

// Добавление с атрибуцией и количеством товара
sdk.track("cart", {
  id: PRODUCT_ID,
  amount: PRODUCT_QUANTITY,
  recommended_by: 'dynamic',
  recommended_code: 'UNIQUE_RECOMMENDER_CODE'
});

// Полностью синхронизировать корзину
sdk.track("cart", [
  {
    id: FIRST_PRODUCT_ID,
    amount: FIRST_PRODUCT_QUANTITY
  },
  ...
  {
    id: LAST_PRODUCT_ID,
    amount: LAST_PRODUCT_QUANTITY
  }
]);
```
:::


## Ответ

Пример ответа сервера:

```json 
{
  "status": "success"
}
```

В случае, если к событию добавлен попап, то в ответе будет объект попапа, который нужно показать посетителю:

```json 
{
  "status": "success",
  "popup": {
    "id": 337,
    "channels": [],
    "position": "...",
    "delay": 0,
    "html": "...",
    "web_push_system": false,
    "popup_actions": { ... }
  }
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

## Справочник ошибок

| Сценарий                                         | Пример запроса                                                                             | Код ошибки                                 |
|:-------------------------------------------------|:-------------------------------------------------------------------------------------------|:-------------------------------------------|
| **HTTP Method Validation**                       |                                                                                            |                                            |
| Использование не-POST метода                     | `GET /push?event=cart&items[][id]=123`                                                     | `405 Method Not Allowed`                   |
| **Authentication & Shop Validation**             |                                                                                            |                                            |
| Запрос без `shop_id`                             | `POST /push` (без параметров)                                                              | `401 Unauthorized`                         |
| Пустой `shop_id`                                 | `POST /push?shop_id=&event=cart&items[][id]=123`                                           | `422 Unprocessable`                        |
| Некорректный формат `shop_id` (не 30 hex)        | `POST /push?shop_id=INVALID_ID&event=cart&items[][id]=123`                                 | `422 Unprocessable`                        |
| Несуществующий `shop_id`                         | `POST /push?shop_id=000000000000000000000000000000&event=cart&items[][id]=123`             | `404 Not Found`                            |
| **Device Validation**                            |                                                                                            |                                            |
| Корректный `shop_id`, но без `did`               | `POST /push?shop_id={valid}&event=cart&items[][id]=123`                                    | `401 Unauthorized`                         |
| Пустой `did` (трактуется как отсутствие)         | `POST /push?shop_id={valid}&did=&event=cart&items[][id]=123`                               | `401 Unauthorized`                         |
| Некорректный формат `did`                        | `POST /push?shop_id={valid}&did=INVALID_ID&event=cart&items[][id]=123`                     | `422 Unprocessable`                        |
| Несуществующий `did`                             | `POST /push?shop_id={valid}&did=0000000000&event=cart&items[][id]=123`                     | `404 Not Found`                            |
| **Shop Status Validation**                       |                                                                                            |                                            |
| Магазин неактивен (`non-active`)                 | `POST /push?shop_id={non_active}&did={valid}&event=cart&items[][id]=123`                   | `403 Access Denied`                        |
| Магазин ограничен (`restricted`)                 | `POST /push?shop_id={restricted}&did={valid}&event=cart&items[][id]=123`                   | `403 Access Denied`                        |
| У магазина истекла оплата                        | `POST /push?shop_id={unpaid}&did={valid}&event=cart&items[][id]=123`                       | `403 Access Denied`                        |
| **Required Parameters Validation**               |                                                                                            |                                            |
| Отсутствует параметр `event`                     | `POST /push?items[][id]=123&shop_id={valid}&did={valid}`                                   | `422 Unprocessable`                        |
| Пустой параметр `event`                          | `POST /push?event=&items[][id]=123&shop_id={valid}&did={valid}`                            | `422 Unprocessable`                        |
| Некорректное значение `event` (не 'cart')        | `POST /push?event=INVALID&items[][id]=123&shop_id={valid}&did={valid}`                     | `422 Unprocessable`                        |
| **Items Validation**                             |                                                                                            |                                            |
| Отсутствует параметр `items`                     | `POST /push?event=cart&shop_id={valid}&did={valid}`                                        | `422 Unprocessable`                        |
| Пустой `items` (не массив)                       | `POST /push?event=cart&items=&shop_id={valid}&did={valid}`                                 | `422 Unprocessable`                        |
| Пустой массив `items` (добавление)               | `POST /push` (JSON: `{"event": "cart", "items": [], ...}`)                                 | `422 Unprocessable`                        |
| Пустой массив `items` c `full_cart: true`        | `POST /push` (JSON: `{"event": "cart", "full_cart": true, "items": [], ...}`)              | `200 OK`                                   |
| Все `items` отфильтрованы из-за некорректного ID | `POST /push` (JSON: `{"event": "cart", "items": [{"id": "Hello\\World"}], ...}`)           | `422 Unprocessable`                        |
| **Optional Parameters Validation**               |                                                                                            |                                            |
| Пустой `stream`                                  | `POST /push?event=cart&items[][id]=123&stream=&shop_id={valid}&did={valid}`                | `422 Unprocessable`                        |
| `stream` не строка (массив)                      | `POST /push?event=cart&items[][id]=123&stream[]=42&shop_id={valid}&did={valid}`            | `422 Unprocessable`                        |
| Пустой `sid`                                     | `POST /push?event=cart&items[][id]=123&sid=&shop_id={valid}&did={valid}`                   | `422 Unprocessable`                        |
| `sid` не строка                                  | `POST /push?event=cart&items[][id]=123&sid[]=42&shop_id={valid}&did={valid}`               | `422 Unprocessable`                        |
| Пустой `referer`                                 | `POST /push?event=cart&items[][id]=123&referer=&shop_id={valid}&did={valid}`               | `422 Unprocessable`                        |
| `referer` не строка                              | `POST /push?event=cart&items[][id]=123&referer[]=42&shop_id={valid}&did={valid}`           | `422 Unprocessable`                        |
| Пустой `segment`                                 | `POST /push?event=cart&items[][id]=123&segment=&shop_id={valid}&did={valid}`               | `422 Unprocessable`                        |
| Некорректный `segment` (не 'A' или 'B')          | `POST /push?event=cart&items[][id]=123&segment=C&shop_id={valid}&did={valid}`              | `422 Unprocessable`                        |
| Пустой `recommended_by`                          | `POST /push?event=cart&items[][id]=123&recommended_by=&shop_id={valid}&did={valid}`        | `422 Unprocessable`                        |
| Некорректный `recommended_by`                    | `POST /push?event=cart&items[][id]=123&recommended_by=INVALID&shop_id={valid}&did={valid}` | `422 Unprocessable`                        |
| Пустой `recommended_code`                        | `POST /push?event=cart&items[][id]=123&recommended_code=&shop_id={valid}&did={valid}`      | `422 Unprocessable`                        |
| Пустой `source` (строка)                         | `POST /push?event=cart&items[][id]=123&source=&shop_id={valid}&did={valid}`                | `422 Unprocessable`                        |
| Некорректный `source` (не JSON)                  | `POST /push?event=cart&items[][id]=123&source=not-json&shop_id={valid}&did={valid}`        | `422 Unprocessable`                        |
| **Item Amount/Quantity Logic**                   |                                                                                            |                                            |
| `items.amount: -1` (ниже минимума)               | `POST /push` (JSON: `{"items": [{"id": "x", "amount": -1}], ...}`)                         | `200 OK` (amount становится `1`)           |
| `items.amount: 1001` (выше максимума)            | `POST /push` (JSON: `{"items": [{"id": "x", "amount": 1001}], ...}`)                       | `200 OK` (amount становится `1000`)        |
| `items.quantity: -1` (синоним amount)            | `POST /push` (JSON: `{"items": [{"id": "x", "quantity": -1}], ...}`)                       | `200 OK` (amount становится `1`)           |
| **Item Price Logic**                             |                                                                                            |                                            |
| `items.price: -1` (отрицательное число)          | `POST /push` (JSON: `{"items": [{"id": "x", "price": -1}], ...}`)                          | `200 OK` (поле `price` отсутствует)        |
| `items.price: -0.1` (отрицательный float)        | `POST /push` (JSON: `{"items": [{"id": "x", "price": -0.1}], ...}`)                        | `200 OK` (поле `price` отсутствует)        |
| `items.price: '-666'` (отрицательная строка)     | `POST /push` (JSON: `{"items": [{"id": "x", "price": "-666"}], ...}`)                      | `200 OK` (поле `price` отсутствует)        |
| `items.price: 'asdasd'` (не число)               | `POST /push` (JSON: `{"items": [{"id": "x", "price": "asdasd"}], ...}`)                    | `200 OK` (поле `price` отсутствует)        |
| **Item Other Fields Logic**                      |                                                                                            |                                            |
| `items.line_id: ''` (пустая строка)              | `POST /push` (JSON: `{"items": [{"id": "x", "line_id": ""}], ...}`)                        | `200 OK` (поле `line_id` отсутствует)      |
| `items.fashion_size: ''` (пустая строка)         | `POST /push` (JSON: `{"items": [{"id": "x", "fashion_size": ""}], ...}`)                   | `200 OK` (поле `fashion_size` отсутствует) |
| Пустой `items.id`                                | `POST /push` (JSON: `{"items": [{"id": ""}, {"id": "valid"}], ...}`)                       | `200 OK` (пустой ID фильтруется)           |
| Слишком длинный `items.id`                       | `POST /push` (JSON: `{"items": [{"id": "aaaa...(>255 chars)"}, ...]}`)                     | `200 OK` (длинный ID фильтруется)          |
