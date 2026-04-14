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
sdk.track(event: .orderCreated(orderId: "123", totalValue: 33.3, products: [(id: "PRODUCT_ID_1", amount: 3, price: 300), (id: "PRODUCT_ID_2", amount: 1, price: 100)])) { trackResponse in
    // ... обработка коллбэков показана в описании события "Просмотр товара"
}
```

```kotlin [Kotlin]
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
    }
  }
)


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

