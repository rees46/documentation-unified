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
        recommendedBy = "recommendation",
        recommendedCode = "block_code"
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

