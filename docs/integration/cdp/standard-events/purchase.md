# Покупка

Покупка заказа отслеживается с сайта или мобильных приложений. Заказы с касс в рознице лучше передавать через [импорт заказов и синхронизацию статусов](../orders/sync.md).

При передаче купленных товаров важно передавать как количество единиц каждого купленного товара, так и цену, по которой была куплена одна единица товара с учетом всех скидок. Цена может отличаться от той, что указана в товарном фиде.

Для весовых товаров не обязательно указывать количество грамм или миллилитров. Просто укажите `quantity=1`, а в `price` укажите конечную цену товара, по которой его купил клиент. 

На данное событие завязаны следующие механики платформы:

1. Триггер "После заказа"
2. Триггер "Регулярная покупка"
3. История покупок клиента
4. Отчеты и метрики по выручке и конверсии
5. Метрики во всех инструментах

В заказе могут передаваться помимо стандартных свойств еще и кастомные

```
POST https://api.rees46.ru/push
```

## Параметры

| Параметр         | Обязателен? | Описание                                                                                                                                |
|------------------|-------------|-----------------------------------------------------------------------------------------------------------------------------------------|
| shop_id          | Да          | API-ключ                                                                                                                                |
| did*             | Да          | [Идентификатор устройства](../entities/did.md)                                                                                          |
| sid              | Да          | [Идентификатор сессии](../entities/sid.md) . Обязателен при передаче `did`, желателен при других идентификаторах, если есть возможность |
| email*           | Да          | Email клиента                                                                                                                           |
| phone*           | Да          | Телефон клиента                                                                                                                         |
| external_id*     | Да          | Внешний идентификатор клиента                                                                                                           |
| loyalty_id*      | Да          | Идентификатор внешней программы лояльности клиента                                                                                      |
| telegram_id*     | Да          | Telegram ID клиента                                                                                                                     |
| event            | Да          | Код события. В данном случае `purchase`                                                                                                 |
| items            | Да          | Массив товаров для события. Должен содержать минимум 1 товар                                                                            |
| items[]          | Да          | Объект товара                                                                                                                           |
| items[].id       | Да          | Идентификатор (артикул) товара, который указан в импорте товара                                                                         |
| items[].quantity | Да          | Количество единиц этого товара в корзине клиента. По-умолчанию равно `1`                                                                |
| items[].price    | Да          | Стоимость одной единицы этого товара в заказе                                                                                           |
| order_id         | Да          | Уникальный идентификатор заказа                                                                                                         |
| order_price      | Да          | Полная стоимость заказа с учетом скидок и дополнительных услуг (доставка, сборка и пр)                                                  |
| segment          | Нет         | Идентификатор сегмента для встроенных A/B-тестов. Значения: `A` или `B` (латиница)                                                      |
| stream           | Нет         | [Стрим](../entities/stream.md)                                                                                                          |
| referer          | Нет         | Страница сайта, на которой произошло событие                                                                                            |

:::info Идентификаторы
Параметры, отмеченные [*] - обязателен хотя бы один из них. На стороне сайта или мобильных приложений SDK автоматически передает `did`.
:::

:::info Атрибуция
В данном трекинге атрибуция не передается. Сервер сам понимает, как атрибуцировать покупку по событиям просмотра и добавления в корзину.
:::

## Запрос

:::danger TODO
Ревью мобильных SDK
:::

Пример запроса:

::: code-group
```shell [S2S]
# Основной пример запроса
curl 'https://api.rees46.ru/push' \
    -X 'POST' \
    -H 'Content-Type: application/json' \
    --data-raw '{"event":"purchase", "shop_id":"SHOP_ID", "did":"DEVICE_ID", "email":"john.doe@examplemail.com", "phone": "4400114527199", "sid":"SEANCE_ID", "segment":"A or B", "items":[{"id":"PRODUCT_ID", "price": PRODUCT_PRICE, "amount": PRODUCT_QUANTITY}], "order_id":"ORDER_NUMBER", "order_price":TOTAL_ORDER_PRICE}'

# TODO: Пример запроса с расширенными свойствами заказа

```

```javascript [JS SDK]
// Стандартный трекинг
r46('track', 'purchase', {
  email: "john.doe@examplemail.com",
  phone: "4400114527199",
  products: [
    {id: 37, price: 318, amount: 3},
    {id: 187, price: 5000, amount: 1}
  ],
  order: 'N318',
  order_price: 29999
});

// Трекинг с расширенными свойствами заказа
r46('track', 'purchase', {
  'email': "john.doe@examplemail.com",
  'phone': "4400114527199",
  'products': [
    {'id': 37, 'price': 318, 'amount': 1},
  ],
  'custom': {
    'date_start': '2024-03-01',
    'date_finish': '2024-03-11',
    'duration': 11,
    'route': 'Moscow - Берлин',
    'route_start': 'Moscow',
    'route_finish': 'Berlin',
    'tour_class': 'Lux',
    'adults_count': 2,
    'children_count': 1,
    'infants_count': 1,
    'deck': 'lower',
    'rooms': '334,335'
  },
  'order': 'N318',
  'order_price': 29999
});

```

```swift [iOS] 

// Пример простейшего трекинга

let request = PurchaseTrackingRequest(
    orderId: "order-123",
    orderPrice: 99.90,
    items: [
        PurchaseItemRequest(
            id: "sku-456",
            amount: 1,
            price: 99.90
        )
    ]
)
sdk.trackPurchase(request) { result in
    switch result {
    case .success:
        break
    case .failure(let error):
        break
    }
}

// Пример с дополнительными параметрами

let request = PurchaseTrackingRequest(
    orderId: "ORD-789012",
    orderPrice: 299.99,
    items: [
        PurchaseItemRequest(
            id: "SKU-100",
            amount: 1,
            price: 199.99,
            quantity: 1,
            lineId: "line-1",
            fashionSize: "M"
        ),
        PurchaseItemRequest(
            id: "SKU-200",
            amount: 1,
            price: 100.00,
            quantity: 1,
            lineId: "line-2",
            fashionSize: "L"
        )
    ],
    deliveryType: "courier",
    deliveryAddress: "ул. Пушкина, д. 10",
    paymentType: "card",
    isTaxFree: false,
    promocode: "SUMMER15",
    orderCash: 0,
    orderBonuses: 50,
    orderDelivery: 5.99,
    orderDiscount: 45.00,
    channel: "mobile"
)

sdk.trackPurchase(request) { result in
    switch result {
    case .success:
       // обработка успеха
    case .failure(let error):
       // обработка ошибки
    }
}

// Пример с кастомными свойствами заказа

let request = PurchaseTrackingRequest(
    orderId: "ORD-555777",
    orderPrice: 4999.99,
    items: [
        PurchaseItemRequest(
            id: "TOUR-100",
            amount: 1,
            price: 4999.99,
            quantity: 1
        )
    ],
    custom: [
        "tour_class": "AAA",
        "guests_count": 5,
        "departure_date": "2025-07-15",
        "is_vip": true,
        "tour_operator": "SunRise Tours"
    ]
)

sdk.trackPurchase(request) { result in
    switch result {
    case .success:
       // обработка успеха
    case .failure(let error):
       // обработка ошибки
    }
}

// Устаревшие методы (поддерживаются)

sdk.track(event: .orderCreated(orderId: "123", totalValue: 33.3, products: [(id: "PRODUCT_ID_1", amount: 3, price: 300), (id: "PRODUCT_ID_2", amount: 1, price: 100)])) { trackResponse in
    // ... обработка коллбэков показана в описании события "Просмотр товара"
}    
```

```kotlin [Kotlin]

// Пример простейшего трекинга заказа

val request = PurchaseTrackingRequest(
    orderId = "ORD-100500",
    orderPrice = 2499.99,
    items = listOf(
        PurchaseItemRequest(id = "SKU-1", amount = 1, price = 99.0),
        PurchaseItemRequest(id = "SKU-2", amount = 2, price = 33.0)
    )
)

sdk.trackPurchase(
    request = request,
    listener = object : OnApiCallbackListener() {
        override fun onSuccess(response: JSONObject?) {
            // обработать успех
        }

        override fun onError(code: Int, msg: String?) {
            // обработать ошибку
        }
    }
)

// Пример с дополнительными параметрами

val request = PurchaseTrackingRequest(
    orderId = "ORD-100500",
    orderPrice = 2499.99,
    items = listOf(
        PurchaseItemRequest(id = "SKU-1", amount = 1, price = 99.0),
        PurchaseItemRequest(id = "SKU-2", amount = 2, price = 33.0)
    ),
     deliveryType = "courier",
    deliveryAddress = "Восстания, 1"
)

sdk.trackPurchase(
    request = request,
    listener = object : OnApiCallbackListener() {
        override fun onSuccess(response: JSONObject?) {
            // обработать успех
        }

        override fun onError(code: Int, msg: String?) {
            // обработать ошибку
        }
    }
)

// Трекинг с явной атрибуцией
// Может потребоваться в случае заказа в 1 клик. 
// Иначе атрибуция берется из событий просмотра и добавления в корзину.

val request = PurchaseTrackingRequest(
    orderId = "ORD-100500",
    orderPrice = 2499.99,
    items = listOf(
        PurchaseItemRequest(id = "SKU-1", amount = 1, price = 99.0),
        PurchaseItemRequest(id = "SKU-2", amount = 2, price = 33.0)
    ),
    recommendedBy = Params.RecommendedBy(
        type = Params.RecommendedBy.TYPE.RECOMMENDATION,
        code = "block_code"
    )
)

sdk.trackPurchase(
    request = request,
    listener = object : OnApiCallbackListener() {
        override fun onSuccess(response: JSONObject?) {
            // обработать успех
        }

        override fun onError(code: Int, msg: String?) {
            // обработать ошибку
        }
    }
)

//  Пример с кастомными свойствами заказа

val request = PurchaseTrackingRequest(
    orderId = "ORD-100500",
    orderPrice = 2499.99,
    items = listOf(
        PurchaseItemRequest(id = "SKU-1", amount = 1, price = 99.0),
        PurchaseItemRequest(id = "SKU-2", amount = 2, price = 33.0)
    ),
    custom = mapOf("tour_class" to "AAA", "guests" to 5)
)

sdk.trackPurchase(
    request = request,
    listener = object : OnApiCallbackListener() {
        override fun onSuccess(response: JSONObject?) {
            // обработать успех
        }

        override fun onError(code: Int, msg: String?) {
            // обработать ошибку
        }
    }
)

// Устаревшие методы (поддерживаются)

// Простейший трекинг заказа
val params = Params()
  .put(ProductItemParams("SKU-1").set(ProductItemParams.PARAMETER.PRICE, 99.0).set(ProductItemParams.PARAMETER.AMOUNT, 1))
  .put(ProductItemParams("SKU-2").set(ProductItemParams.PARAMETER.PRICE, 33.0).set(ProductItemParams.PARAMETER.AMOUNT, 2))
  .put(Params.Parameter.ORDER_ID, "ORD-100500")
  .put(Params.Parameter.ORDER_PRICE, "2499.99")
sdk.trackEventManager.track(TrackEvent.PURCHASE, params, null)


// Трекинг с дополнительными параметрами и коллбэком

val params = Params()
  .put(ProductItemParams("SKU-1").set(ProductItemParams.PARAMETER.PRICE, 99.0).set(ProductItemParams.PARAMETER.AMOUNT, 1))
  .put(ProductItemParams("SKU-2").set(ProductItemParams.PARAMETER.PRICE, 33.0).set(ProductItemParams.PARAMETER.AMOUNT, 2))
  .put(Params.Parameter.ORDER_ID, "ORD-100500")
  .put(Params.Parameter.ORDER_PRICE, "2499.99")
  .put(Params.Parameter.DELIVERY_ADDRESS, "Восстания, 1")
sdk.trackEventManager.track(
  TrackEvent.PURCHASE, 
  params, 
  object : OnApiCallbackListener() {
    override fun onSuccess(response: JSONObject?) {
      // ...
    }
    override fun onError(code: Int, msg: String?) {
      // ...
      
// Трекинг с явной атрибуцией
// Может потребоваться в случае заказа в 1 клик. 
// Иначе атрибуция берется из событий просмотра и добавления в корзину.
val params = Params()
  .put(ProductItemParams("SKU-1").set(ProductItemParams.PARAMETER.PRICE, 99.0).set(ProductItemParams.PARAMETER.AMOUNT, 1))
  .put(ProductItemParams("SKU-2").set(ProductItemParams.PARAMETER.PRICE, 33.0).set(ProductItemParams.PARAMETER.AMOUNT, 2))
  .put(Params.Parameter.ORDER_ID, "ORD-100500")
  .put(Params.Parameter.ORDER_PRICE, "2499.99")
  .put(Params.RecommendedBy(Params.RecommendedBy.TYPE.RECOMMENDATION, "block_code"))
sdk.trackEventManager.track(TrackEvent.PURCHASE, params, null)


// Трекинг с кастомными свойствами заказа
val сustomParameters = Params.CustomOrderParameters()
  .set("tour_class", "AAA")
  .set("guests", 5)
val params = Params()
  .put(ProductItemParams("SKU-1").set(ProductItemParams.PARAMETER.PRICE, 99.0).set(ProductItemParams.PARAMETER.AMOUNT, 1))
  .put(ProductItemParams("SKU-2").set(ProductItemParams.PARAMETER.PRICE, 33.0).set(ProductItemParams.PARAMETER.AMOUNT, 2))
  .put(Params.Parameter.ORDER_ID, "ORD-100500")
  .put(Params.Parameter.ORDER_PRICE, "2499.99")
  .put(сustomParameters)
sdk.trackEventManager.track(TrackEvent.PURCHASE, params, null)
```


```java [Java (deprecated)]
Params purchase = new Params();

purchase
  .put(new Params.Item(YOUR_ITEM_ID)
    .set(Params.Item.COLUMN.AMOUNT, YOUR_ITEM_AMOUNT)
    .set(Params.Item.COLUMN.PRICE, YOUR_ITEM_PRICE))
    .put(Params.Parameter.ORDER_ID, YOUR_ORDER_ID)
    .put(Params.Parameter.ORDER_PRICE, YOUR_ORDER_PRICE)
    .put(Params.Parameter.DELIVERY_ADDRESS, YOUR_DELIVERY_ADDRESS)
    .put(new Params.RecommendedBy(Params.RecommendedBy.TYPE.RECOMMENDATION, YOUR_RECOMMENDATION_CODE));

sdk.track(Params.TrackEvent.PURCHASE, purchase);
```


```javascript [ReactNative]

//Пример набора обязательных параметров

const request: PurchaseTrackingRequest = {
    orderId: 'order-123',
    orderPrice: 99.9,
    items: [
        {
            id: 'sku-456',
            amount: 1,
            price: 99.9,
        },
    ],
}
sdk.trackPurchase(request)

// Пример полного набора параметров

const request: PurchaseTrackingRequest = {
    orderId: 'order-full-001',
    orderPrice: 199.98,
    items: [
        {
            id: 'sku-456',
            amount: 2,
            price: 49.99,
            quantity: 2,
            lineId: 'line-1',
            fashionSize: 'L',
        },
    ],
    deliveryType: 'courier',
    deliveryAddress: 'ул. Пример, 1',
    paymentType: 'card',
    isTaxFree: true,
    promocode: 'DEMO10',
    orderCash: 100,
    orderBonuses: 10,
    orderDelivery: 5,
    orderDiscount: 15,
    channel: 'mobile',
    custom: {
        my_key_string: 'value',
        my_key_number: 123,
        my_key_bool: true,
        my_key_null: null,
    },
    recommendedSource: {
        source_key: 'source_value',
    },
    stream: 'my-stream',
}
sdk.trackPurchase(request)

// Пример обычного трекинга
const request = {
    orderId: 'ORD-100500',
    orderPrice: 2499.99,
    items: [
        { id: 'SKU-1', amount: 1, price: 99.0 },
        { id: 'SKU-2', amount: 2, price: 33.0 }
    ]
}

sdk.trackPurchase(request)

// Пример трекинга с расширенными свойствами заказа
const request = {
    orderId: 'ORD-789012',
    orderPrice: 299.99,
    items: [
        {
            id: 'SKU-100',
            amount: 1,
            price: 199.99,
            quantity: 1,
            lineId: 'line-1',
            fashionSize: 'M'
        },
        {
            id: 'SKU-200',
            amount: 1,
            price: 100.00,
            quantity: 1,
            lineId: 'line-2',
            fashionSize: 'L'
        }
    ],
    deliveryType: 'courier',
    deliveryAddress: 'ул. Пушкина, д. 10',
    paymentType: 'card',
    isTaxFree: false,
    promocode: 'SUMMER15',
    orderCash: 0,
    orderBonuses: 50,
    orderDelivery: 5.99,
    orderDiscount: 45.00,
    channel: 'mobile'
}

sdk.trackPurchase(request)

// Пример трекинга с кастомными свойствами заказа

const request = {
    orderId: 'ORD-555777',
    orderPrice: 4999.99,
    items: [
        {
            id: 'TOUR-100',
            amount: 1,
            price: 4999.99,
            quantity: 1
        }
    ],
    custom: {
        tour_class: 'AAA',
        guests_count: 5,
        departure_date: '2025-07-15',
        is_vip: true,
        tour_operator: 'SunRise Tours'
    }
}

sdk.trackPurchase(request)

// Устаревшие методы (поддерживаются)

// Обычный трекинг
sdk.track("purchase", {
    products: [
        {id: "37", price: 318, amount: 3},
        {id: "187", price: 5000, amount: 1}
    ],
    order: 'N318',
    order_price: 29999
});

// С расширенными свойствами заказа
sdk.track('purchase', {
    'email': "john.doe@examplemail.com",
    'phone': "4400114527199",
    'products': [
        {'id': 37, 'price': 318, 'quantity': 1},
    ],
    'custom': {
        'date_start': '2024-03-01',
    },
    'order': 'N318',
    'order_price': 29999
});
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

| Сценарий                                         | Пример запроса                                                                                                                                                                                                                                                                         | Код ошибки                                              |
|:-------------------------------------------------|:---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|:--------------------------------------------------------|
| **HTTP Method Validation**                       |                                                                                                                                                                                                                                                                                        |                                                         |
| Использование не-POST метода                     | `GET /push?event=purchase&items[][id]=123`                                                                                                                                                                                                                                             | `405 Method Not Allowed`                                |
| **Authentication & Shop Validation**             |                                                                                                                                                                                                                                                                                        |                                                         |
| Запрос без `shop_id`                             | `POST /push` (без параметров)                                                                                                                                                                                                                                                          | `401 Unauthorized`                                      |
| Пустой `shop_id`                                 | `POST /push?shop_id=&event=purchase&items[][id]=123`                                                                                                                                                                                                                                   | `422 Unprocessable`                                     |
| Некорректный формат `shop_id` (не 30 hex)        | `POST /push?shop_id=INVALID_ID&event=purchase&items[][id]=123`                                                                                                                                                                                                                         | `422 Unprocessable`                                     |
| Несуществующий `shop_id`                         | `POST /push?shop_id=000000000000000000000000000000&event=purchase&items[][id]=123`                                                                                                                                                                                                     | `404 Not Found`                                         |
| **Device Validation**                            |                                                                                                                                                                                                                                                                                        |                                                         |
| Корректный `shop_id`, но без `did`               | `POST /push?shop_id={valid}&event=purchase&items[][id]=123`                                                                                                                                                                                                                            | `401 Unauthorized`                                      |
| Пустой `did` (трактуется как отсутствие)         | `POST /push?shop_id={valid}&did=&event=purchase&items[][id]=123`                                                                                                                                                                                                                       | `401 Unauthorized`                                      |
| Некорректный формат `did`                        | `POST /push?shop_id={valid}&did=INVALID_ID&event=purchase&items[][id]=123`                                                                                                                                                                                                             | `422 Unprocessable`                                     |
| Несуществующий `did`                             | `POST /push?shop_id={valid}&did=0000000000&event=purchase&items[][id]=123`                                                                                                                                                                                                             | `404 Not Found`                                         |
| **Shop Status Validation**                       |                                                                                                                                                                                                                                                                                        |                                                         |
| Магазин неактивен (`non-active`)                 | `POST /push?shop_id={non_active}&did={valid}&event=purchase&items[][id]=123`                                                                                                                                                                                                           | `403 Access Denied`                                     |
| Магазин ограничен (`restricted`)                 | `POST /push?shop_id={restricted}&did={valid}&event=purchase&items[][id]=123`                                                                                                                                                                                                           | `403 Access Denied`                                     |
| У магазина истекла оплата                        | `POST /push?shop_id={unpaid}&did={valid}&event=purchase&items[][id]=123`                                                                                                                                                                                                               | `403 Access Denied`                                     |
| **Required Parameters Validation**               |                                                                                                                                                                                                                                                                                        |                                                         |
| Отсутствует параметр `event`                     | `POST /push?items[][id]=123&shop_id={valid}&did={valid}`                                                                                                                                                                                                                               | `422 Unprocessable`                                     |
| Пустой параметр `event`                          | `POST /push?event=&items[][id]=123&shop_id={valid}&did={valid}`                                                                                                                                                                                                                        | `422 Unprocessable`                                     |
| Некорректное значение `event` (не 'purchase')    | `POST /push?event=INVALID&items[][id]=123&shop_id={valid}&did={valid}`                                                                                                                                                                                                                 | `422 Unprocessable`                                     |
| **Items Validation**                             |                                                                                                                                                                                                                                                                                        |                                                         |
| Отсутствует параметр `items`                     | `POST /push?event=purchase&shop_id={valid}&did={valid}`                                                                                                                                                                                                                                | `422 Unprocessable`                                     |
| Пустой `items` (не массив)                       | `POST /push?event=purchase&items=&shop_id={valid}&did={valid}`                                                                                                                                                                                                                         | `422 Unprocessable`                                     |
| Пустой массив `items`                            | `POST /push` (JSON: `{"event": "purchase", "items": [], ...}`)                                                                                                                                                                                                                         | `422 Unprocessable`                                     |
| Все `items` отфильтрованы из-за некорректного ID | `POST /push` (JSON: `{"event": "purchase", "items": [{"id": "Hello\\World"}], ...}`)                                                                                                                                                                                                   | `422 Unprocessable`                                     |
| **Optional Parameters Validation**               |                                                                                                                                                                                                                                                                                        |                                                         |
| Пустой `stream`                                  | `POST /push?event=purchase&items[][id]=123&stream=&shop_id={valid}&did={valid}`                                                                                                                                                                                                        | `422 Unprocessable`                                     |
| `stream` не строка (массив)                      | `POST /push?event=purchase&items[][id]=123&stream[]=42&shop_id={valid}&did={valid}`                                                                                                                                                                                                    | `422 Unprocessable`                                     |
| Пустой `sid`                                     | `POST /push?event=purchase&items[][id]=123&sid=&shop_id={valid}&did={valid}`                                                                                                                                                                                                           | `422 Unprocessable`                                     |
| `sid` не строка                                  | `POST /push?event=purchase&items[][id]=123&sid[]=42&shop_id={valid}&did={valid}`                                                                                                                                                                                                       | `422 Unprocessable`                                     |
| Пустой `referer`                                 | `POST /push?event=purchase&items[][id]=123&referer=&shop_id={valid}&did={valid}`                                                                                                                                                                                                       | `422 Unprocessable`                                     |
| `referer` не строка                              | `POST /push?event=purchase&items[][id]=123&referer[]=42&shop_id={valid}&did={valid}`                                                                                                                                                                                                   | `422 Unprocessable`                                     |
| Пустой `segment`                                 | `POST /push?event=purchase&items[][id]=123&segment=&shop_id={valid}&did={valid}`                                                                                                                                                                                                       | `422 Unprocessable`                                     |
| Некорректный `segment` (не 'A' или 'B')          | `POST /push?event=purchase&items[][id]=123&segment=C&shop_id={valid}&did={valid}`                                                                                                                                                                                                      | `422 Unprocessable`                                     |
| Пустой `recommended_by`                          | `POST /push?event=purchase&items[][id]=123&recommended_by=&shop_id={valid}&did={valid}`                                                                                                                                                                                                | `422 Unprocessable`                                     |
| Некорректный `recommended_by`                    | `POST /push?event=purchase&items[][id]=123&recommended_by=INVALID&shop_id={valid}&did={valid}`                                                                                                                                                                                         | `422 Unprocessable`                                     |
| `recommended_by` не строка (массив)              | `POST /push?event=purchase&items[][id]=123&recommended_by[]=dynamic&shop_id={valid}&did={valid}`                                                                                                                                                                                       | `422 Unprocessable`                                     |
| Пустой `recommended_code`                        | `POST /push?event=purchase&items[][id]=123&recommended_code=&shop_id={valid}&did={valid}`                                                                                                                                                                                              | `422 Unprocessable`                                     |
| `recommended_code` не строка                     | `POST /push?event=purchase&items[][id]=123&recommended_code[]=42&shop_id={valid}&did={valid}`                                                                                                                                                                                          | `422 Unprocessable`                                     |
| Пустой `source` (строка)                         | `POST /push?event=purchase&items[][id]=123&source=&shop_id={valid}&did={valid}`                                                                                                                                                                                                        | `422 Unprocessable`                                     |
| Некорректный `source` (не JSON)                  | `POST /push?event=purchase&items[][id]=123&source=not-json&shop_id={valid}&did={valid}`                                                                                                                                                                                                | `422 Unprocessable`                                     |
| **Order Details Validation**                     |                                                                                                                                                                                                                                                                                        |                                                         |
| Пустой `order_id`                                | `POST /push` (JSON: `{"event": "purchase", "order_id": "", ...}`)                                                                                                                                                                                                                      | `200 OK`                                                |
| Пустой `delivery_type`                           | `POST /push` (JSON: `{"event": "purchase", "delivery_type": "", ...}`)                                                                                                                                                                                                                 | `200 OK`                                                |
| Пустой `payment_type`                            | `POST /push` (JSON: `{"event": "purchase", "payment_type": "", ...}`)                                                                                                                                                                                                                  | `200 OK`                                                |
| Некорректный `order_id` (256 символов)           | `POST /push` (JSON: `{"event": "purchase", "order_id": "256_chars_string...", ...}`)                                                                                                                                                                                                   | `422 Unprocessable`                                     |
| **Source Logic**                                 |                                                                                                                                                                                                                                                                                        |                                                         |
| Корректный JSON в `source` (строка)              | `POST /push` (JSON: `{"event": "purchase", "source": "{\"code\": \"abc\", \"from\": \"dynamic\"}", ...}`)                                                                                                                                                                              | `200 OK` (recommended_by=dynamic, recommended_code=abc) |
| Корректный объект в `source`                     | `POST /push` (JSON: `{"event": "purchase", "source": {"code": "abc", "from": "dynamic"}, ...}`)                                                                                                                                                                                        | `200 OK` (recommended_by=dynamic, recommended_code=abc) |
| Некорректный `source.from`                       | `POST /push` (JSON: `{"source": "{\"code\": \"abc\", \"from\": \"example\"}"}`)                                                                                                                                                                                                        | `200 OK` (source игнорируется, поля null)               |
| Отсутствует `source.from` в JSON                 | `POST /push` (JSON: `{"source": "{\"code\": \"abc\"}"}`)                                                                                                                                                                                                                               | `200 OK` (source игнорируется, поля null)               |
| Отсутствует `source.code` в JSON                 | `POST /push` (JSON: `{"source": "{\"from\": \"dynamic\"}"}`)                                                                                                                                                                                                                           | `200 OK` (source игнорируется, поля null)               |
| **Item Amount/Quantity Logic**                   |                                                                                                                                                                                                                                                                                        |                                                         |
| `items.amount: -1` (ниже минимума)               | `POST /push` (JSON: `{"items": [{"id": "x", "amount": -1}], ...}`)                                                                                                                                                                                                                     | `200 OK` (amount становится `1`)                        |
| `items.amount: 1001` (выше максимума)            | `POST /push` (JSON: `{"items": [{"id": "x", "amount": 1001}], ...}`)                                                                                                                                                                                                                   | `200 OK` (amount становится `1000`)                     |
| `items.quantity: -1` (синоним amount)            | `POST /push` (JSON: `{"items": [{"id": "x", "quantity": -1}], ...}`)                                                                                                                                                                                                                   | `200 OK` (amount становится `1`)                        |
| **Item Price Logic**                             |                                                                                                                                                                                                                                                                                        |                                                         |
| `items.price: -1` (отрицательное число)          | `POST /push` (JSON: `{"items": [{"id": "x", "price": -1}], ...}`)                                                                                                                                                                                                                      | `200 OK` (поле `price` отсутствует)                     |
| `items.price: -0.1` (отрицательный float)        | `POST /push` (JSON: `{"items": [{"id": "x", "price": -0.1}], ...}`)                                                                                                                                                                                                                    | `200 OK` (поле `price` отсутствует)                     |
| `items.price: '-666'` (отрицательная строка)     | `POST /push` (JSON: `{"items": [{"id": "x", "price": "-666"}], ...}`)                                                                                                                                                                                                                  | `200 OK` (поле `price` отсутствует)                     |
| `items.price: 'asdasd'` (не число)               | `POST /push` (JSON: `{"items": [{"id": "x", "price": "asdasd"}], ...}`)                                                                                                                                                                                                                | `200 OK` (поле `price` отсутствует)                     |
| **Item Other Fields Logic**                      |                                                                                                                                                                                                                                                                                        |                                                         |
| `items.line_id: ''` (пустая строка)              | `POST /push` (JSON: `{"items": [{"id": "x", "line_id": ""}], ...}`)                                                                                                                                                                                                                    | `200 OK` (поле `line_id` отсутствует)                   |
| `items.fashion_size: ''` (пустая строка)         | `POST /push` (JSON: `{"items": [{"id": "x", "fashion_size": ""}], ...}`)                                                                                                                                                                                                               | `200 OK` (поле `fashion_size` отсутствует)              |
| Пустой `items.id`                                | `POST /push` (JSON: `{"items": [{"id": ""}, {"id": "valid"}], ...}`)                                                                                                                                                                                                                   | `200 OK` (пустой ID фильтруется)                        |
| Слишком длинный `items.id`                       | `POST /push` (JSON: `{"items": [{"id": "aaaa...(>255 chars)"}, ...]}`)                                                                                                                                                                                                                 | `200 OK` (длинный ID фильтруется)                       |
| **Successful Tracking**                          |                                                                                                                                                                                                                                                                                        |                                                         |
| Трекинг покупки с одним товаром                  | `POST /push?event=purchase&stream=test&items[][id]=123&shop_id={valid}&did={valid}`                                                                                                                                                                                                    | `200 OK`                                                |
| Трекинг покупки с несколькими товарами           | `POST /push` (JSON: `{"event": "purchase", "items": [{"id": "first", "amount": 42}, {"id": "second", "quantity": 23, "price": 42}], ...}`)                                                                                                                                             | `200 OK`                                                |
| Трекинг покупки с деталями заказа                | `POST /push` (JSON: `{"event": "purchase", "order_id": "order-123", "delivery_type": "courier", "delivery_address": "123 Main St", "payment_type": "Card", "tax_free": true, ...}`)                                                                                                    | `200 OK`                                                |
| Трекинг со всеми опциональными параметрами       | `POST /push` (JSON: `{"event": "purchase", "stream": "test", "sid": "test-session-id", "segment": "A", "referer": "https://example.com", "recommended_by": "dynamic", "recommended_code": "abc123", "order_id": "order-456", "delivery_type": "pickup", "payment_type": "Cash", ...}`) | `200 OK`                                                |
