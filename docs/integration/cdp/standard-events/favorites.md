# Добавление в избранное

Событие отправляется тогда, когда клиент добавляет товар в избранное.

На данное событие завязаны следующие механики платформы:

1. Триггер "Цена на товар в избранном снижена"
2. Триггер "Товар в избранном снова в наличии"
3. Избранное в карточке клиента

```
POST https://api.rees46.ru/push
```

## Параметры

| Параметр         | Обязателен? | Описание                                                                                                                                                                                                            |
|------------------|-------------|---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| shop_id          | Да          | API-ключ                                                                                                                                                                                                            |
| did*             | Да          | [Идентификатор устройства](../entities/did.md)                                                                                                                                                                      |
| sid              | Да          | [Идентификатор сессии](../entities/sid.md) . Обязателен при передаче `did`, желателен при других идентификаторах, если есть возможность                                                                             |
| email*           | Да          | Email клиента                                                                                                                                                                                                       |
| phone*           | Да          | Телефон клиента                                                                                                                                                                                                     |
| external_id*     | Да          | Внешний идентификатор клиента                                                                                                                                                                                       |
| loyalty_id*      | Да          | Идентификатор внешней программы лояльности клиента                                                                                                                                                                  |
| telegram_id*     | Да          | Telegram ID клиента                                                                                                                                                                                                 |
| event            | Да          | Код события. В данном случае `wish`                                                                                                                                                                                 |
| segment          | Нет         | Идентификатор сегмента для встроенных A/B-тестов. Значения: `A` или `B` (латиница)                                                                                                                                  |
| stream           | Нет         | [Стрим](../entities/stream.md)                                                                                                                                                                                      |
| items            | Да          | Массив товаров для события. Может содержать как один товар, так и полное содержимое корзины                                                                                                                         |
| items[]          | Да          | Массив идентификаторов товаров                                                                                                                                                                                      |
| full_wish        | Нет         | Булевый флаг. Если `true`, то избранное клиента полностью перезаписывается тем, что отправлено в запросе. Если `false` или отсутствует, то переданные в запросе товары добавляются к уже существующему содержимому  | 

:::info Идентификаторы
Параметры, отмеченные [*] - обязателен хотя бы один из них. На стороне сайта или мобильных приложений SDK автоматически передает `did`.
:::

:::info Совет про `full_wish`
Если у вас есть доступ к избранному на вашей стороне, лучше всегда передавайте `full_wish=true` и список всех товаров в избранном. Так надежнее.
:::

## Запрос

:::danger TODO
Ревью мобильных SDK
:::

Пример запроса:

::: code-group
```shell [S2S]
# Добавление товара в избранное
curl 'https://api.rees46.ru/push' \
    -X 'POST' \
    -H 'Content-Type: application/json' \
    --data-raw '{"event":"wish", "shop_id":"SHOP_ID", "did":"DEVICE_ID", "sid":"SEANCE_ID", "items":[{"id":"PRODUCT_ID"}]}'

# Перезаписать избранное новым содержимым
curl 'https://api.rees46.ru/push' \
    -X 'POST' \
    -H 'Content-Type: application/json' \
    --data-raw '{"event":"wish", "shop_id":"SHOP_ID", "did":"DEVICE_ID", "sid":"SEANCE_ID", "segment":"A or B", "items":["FIRST_PRODUCT_ID", "LAST_PRODUCT_ID"], "full_wish":true}'

# Очистить избранное
curl 'https://api.rees46.ru/push' \
    -X 'POST' \
    -H 'Content-Type: application/json' \
    --data-raw '{"event":"wish", "shop_id":"SHOP_ID", "did":"DEVICE_ID", "sid":"SEANCE_ID", "segment":"A or B", "full_wish":true, "items": []}'
```

```javascript [JS SDK]
// Добавление одного товара в избранное
r46('track', 'wish', product_id);

// Полностью перезаписать избранное
r46('track', 'wish', [FIRST_PRODUCT_ID, LAST_PRODUCT_ID]);

// Очистить избранное
r46('track', 'wish', []);
```

```swift [iOS] 
// Добавление товара в избранное
sdk.track(event: .productAddToFavorities(id: "PRODUCT_ID")) { trackResponse in
    // ... обработка коллбэков показана в описании события "Просмотр товара"
}

// Полностью синхронизировать избранное
sdk.track(event: .synchronizeFavorites( ids: ["PRODUCT_ID_1", "PRODUCT_ID_2"])){
  // items and full_wish flag added to request parameters
  // event type set to wish
}
```


```kotlin [Kotlin]
// Простое добавление товара в избранное
sdk.trackEventManager.track(Params.TrackEvent.WISH, YOUR_ITEM_ID)

// Полностью синхронизировать избранное
val fullWish = Params().apply {
  put(Params.Item(YOUR_FIRST_ITEM_ID))
  put(Params.Parameter.FULL_WISH, true)
  put(Params.Item(YOUR_SECOND_ITEM_ID))
}
sdk.trackEventManager.track(Params.TrackEvent.WISH, fullWish)
```


```java [Java (deprecated)]
// Простое добавление товара в избранное
REES46.track(Params.TrackEvent.WISH, "37");
```


```javascript [ReactNative]
// Простое добавление товара в избранное
sdk.track("wish", 17515);

// Полностью синхронизировать избранное
sdk.track('wish', [17515, 17520]);

// Очистить избранное
sdk.track('wish', []);
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

| Сценарий                                                | Пример запроса                                                                                                                                                                                         | Код ошибки                                              |
|:--------------------------------------------------------|:-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|:--------------------------------------------------------|
| **HTTP Method Validation**                              |                                                                                                                                                                                                        |                                                         |
| Использование не-POST метода                            | `GET /push?event=wish&items[][id]=123`                                                                                                                                                                 | `405 Method Not Allowed`                                |
| **Authentication & Shop Validation**                    |                                                                                                                                                                                                        |                                                         |
| Запрос без `shop_id`                                    | `POST /push` (без параметров)                                                                                                                                                                          | `401 Unauthorized`                                      |
| Пустой `shop_id`                                        | `POST /push?shop_id=&event=wish&items[][id]=123`                                                                                                                                                       | `422 Unprocessable`                                     |
| Некорректный формат `shop_id` (не 30 hex)               | `POST /push?shop_id=INVALID_ID&event=wish&items[][id]=123`                                                                                                                                             | `422 Unprocessable`                                     |
| Несуществующий `shop_id`                                | `POST /push?shop_id=000000000000000000000000000000&event=wish&items[][id]=123`                                                                                                                         | `404 Not Found`                                         |
| **Device Validation**                                   |                                                                                                                                                                                                        |                                                         |
| Корректный `shop_id`, но без `did`                      | `POST /push?shop_id={valid}&event=wish&items[][id]=123`                                                                                                                                                | `401 Unauthorized`                                      |
| Пустой `did` (трактуется как отсутствие)                | `POST /push?shop_id={valid}&did=&event=wish&items[][id]=123`                                                                                                                                           | `401 Unauthorized`                                      |
| Некорректный формат `did`                               | `POST /push?shop_id={valid}&did=INVALID_ID&event=wish&items[][id]=123`                                                                                                                                 | `422 Unprocessable`                                     |
| Несуществующий `did`                                    | `POST /push?shop_id={valid}&did=0000000000&event=wish&items[][id]=123`                                                                                                                                 | `404 Not Found`                                         |
| **Shop Status Validation**                              |                                                                                                                                                                                                        |                                                         |
| Магазин неактивен (`non-active`)                        | `POST /push?shop_id={non_active}&did={valid}&event=wish&items[][id]=123`                                                                                                                               | `403 Access Denied`                                     |
| Магазин ограничен (`restricted`)                        | `POST /push?shop_id={restricted}&did={valid}&event=wish&items[][id]=123`                                                                                                                               | `403 Access Denied`                                     |
| У магазина истекла оплата                               | `POST /push?shop_id={unpaid}&did={valid}&event=wish&items[][id]=123`                                                                                                                                   | `403 Access Denied`                                     |
| **Required Parameters Validation**                      |                                                                                                                                                                                                        |                                                         |
| Отсутствует параметр `event`                            | `POST /push?items[][id]=123&shop_id={valid}&did={valid}`                                                                                                                                               | `422 Unprocessable`                                     |
| Пустой параметр `event`                                 | `POST /push?event=&items[][id]=123&shop_id={valid}&did={valid}`                                                                                                                                        | `422 Unprocessable`                                     |
| Некорректное значение `event` (не 'wish')               | `POST /push?event=INVALID&items[][id]=123&shop_id={valid}&did={valid}`                                                                                                                                 | `422 Unprocessable`                                     |
| **Items Validation**                                    |                                                                                                                                                                                                        |                                                         |
| Отсутствует параметр `items`                            | `POST /push?event=wish&shop_id={valid}&did={valid}`                                                                                                                                                    | `422 Unprocessable`                                     |
| Пустой `items` (не массив)                              | `POST /push?event=wish&items=&shop_id={valid}&did={valid}`                                                                                                                                             | `422 Unprocessable`                                     |
| Пустой массив `items` (добавление)                      | `POST /push` (JSON: `{"event": "wish", "items": [], ...}`)                                                                                                                                             | `422 Unprocessable`                                     |
| Пустой массив `items` c `full_wish: true`               | `POST /push` (JSON: `{"event": "wish", "full_wish": true, "items": [], ...}`)                                                                                                                          | `200 OK`                                                |
| Все `items` отфильтрованы из-за некорректного ID        | `POST /push` (JSON: `{"event": "wish", "items": [{"id": "Hello\\World"}], ...}`)                                                                                                                       | `422 Unprocessable`                                     |
| **Optional Parameters Validation**                      |                                                                                                                                                                                                        |                                                         |
| Пустой `stream`                                         | `POST /push?event=wish&items[][id]=123&stream=&shop_id={valid}&did={valid}`                                                                                                                            | `422 Unprocessable`                                     |
| `stream` не строка (массив)                             | `POST /push?event=wish&items[][id]=123&stream[]=42&shop_id={valid}&did={valid}`                                                                                                                        | `422 Unprocessable`                                     |
| Пустой `sid`                                            | `POST /push?event=wish&items[][id]=123&sid=&shop_id={valid}&did={valid}`                                                                                                                               | `422 Unprocessable`                                     |
| `sid` не строка                                         | `POST /push?event=wish&items[][id]=123&sid[]=42&shop_id={valid}&did={valid}`                                                                                                                           | `422 Unprocessable`                                     |
| Пустой `referer`                                        | `POST /push?event=wish&items[][id]=123&referer=&shop_id={valid}&did={valid}`                                                                                                                           | `422 Unprocessable`                                     |
| `referer` не строка                                     | `POST /push?event=wish&items[][id]=123&referer[]=42&shop_id={valid}&did={valid}`                                                                                                                       | `422 Unprocessable`                                     |
| Пустой `segment`                                        | `POST /push?event=wish&items[][id]=123&segment=&shop_id={valid}&did={valid}`                                                                                                                           | `422 Unprocessable`                                     |
| Некорректный `segment` (не 'A' или 'B')                 | `POST /push?event=wish&items[][id]=123&segment=C&shop_id={valid}&did={valid}`                                                                                                                          | `422 Unprocessable`                                     |
| Пустой `recommended_by`                                 | `POST /push?event=wish&items[][id]=123&recommended_by=&shop_id={valid}&did={valid}`                                                                                                                    | `422 Unprocessable`                                     |
| Некорректный `recommended_by`                           | `POST /push?event=wish&items[][id]=123&recommended_by=INVALID&shop_id={valid}&did={valid}`                                                                                                             | `422 Unprocessable`                                     |
| `recommended_by` не строка (массив)                     | `POST /push?event=wish&items[][id]=123&recommended_by[]=dynamic&shop_id={valid}&did={valid}`                                                                                                           | `422 Unprocessable`                                     |
| Пустой `recommended_code`                               | `POST /push?event=wish&items[][id]=123&recommended_code=&shop_id={valid}&did={valid}`                                                                                                                  | `422 Unprocessable`                                     |
| `recommended_code` не строка                            | `POST /push?event=wish&items[][id]=123&recommended_code[]=42&shop_id={valid}&did={valid}`                                                                                                              | `422 Unprocessable`                                     |
| Пустой `source` (строка)                                | `POST /push?event=wish&items[][id]=123&source=&shop_id={valid}&did={valid}`                                                                                                                            | `422 Unprocessable`                                     |
| Некорректный `source` (не JSON)                         | `POST /push?event=wish&items[][id]=123&source=not-json&shop_id={valid}&did={valid}`                                                                                                                    | `422 Unprocessable`                                     |
| **Source Logic**                                        |                                                                                                                                                                                                        |                                                         |
| Корректный JSON в `source` (строка)                     | `POST /push` (JSON: `{"event": "wish", "source": "{\"code\": \"abc\", \"from\": \"dynamic\"}", ...}`)                                                                                                  | `200 OK` (recommended_by=dynamic, recommended_code=abc) |
| Корректный объект в `source`                            | `POST /push` (JSON: `{"event": "wish", "source": {"code": "abc", "from": "dynamic"}, ...}`)                                                                                                            | `200 OK` (recommended_by=dynamic, recommended_code=abc) |
| Некорректный `source.from`                              | `POST /push` (JSON: `{"source": "{\"code\": \"abc\", \"from\": \"example\"}"}`)                                                                                                                        | `200 OK` (source игнорируется, поля null)               |
| Отсутствует `source.from` в JSON                        | `POST /push` (JSON: `{"source": "{\"code\": \"abc\"}"}`)                                                                                                                                               | `200 OK` (source игнорируется, поля null)               |
| Отсутствует `source.code` в JSON                        | `POST /push` (JSON: `{"source": "{\"from\": \"dynamic\"}"}`)                                                                                                                                           | `200 OK` (source игнорируется, поля null)               |
| **Item Amount/Quantity Logic**                          |                                                                                                                                                                                                        |                                                         |
| `items.amount: -1` (ниже минимума)                      | `POST /push` (JSON: `{"items": [{"id": "x", "amount": -1}], ...}`)                                                                                                                                     | `200 OK` (amount становится `1`)                        |
| `items.amount: 1001` (выше максимума)                   | `POST /push` (JSON: `{"items": [{"id": "x", "amount": 1001}], ...}`)                                                                                                                                   | `200 OK` (amount становится `1000`)                     |
| `items.quantity: -1` (синоним amount)                   | `POST /push` (JSON: `{"items": [{"id": "x", "quantity": -1}], ...}`)                                                                                                                                   | `200 OK` (amount становится `1`)                        |
| **Item Price Logic**                                    |                                                                                                                                                                                                        |                                                         |
| `items.price: -1` (отрицательное число)                 | `POST /push` (JSON: `{"items": [{"id": "x", "price": -1}], ...}`)                                                                                                                                      | `200 OK` (поле `price` отсутствует)                     |
| `items.price: -0.1` (отрицательный float)               | `POST /push` (JSON: `{"items": [{"id": "x", "price": -0.1}], ...}`)                                                                                                                                    | `200 OK` (поле `price` отсутствует)                     |
| `items.price: '-666'` (отрицательная строка)            | `POST /push` (JSON: `{"items": [{"id": "x", "price": "-666"}], ...}`)                                                                                                                                  | `200 OK` (поле `price` отсутствует)                     |
| `items.price: 'asdasd'` (не число)                      | `POST /push` (JSON: `{"items": [{"id": "x", "price": "asdasd"}], ...}`)                                                                                                                                | `200 OK` (поле `price` отсутствует)                     |
| **Item Other Fields Logic**                             |                                                                                                                                                                                                        |                                                         |
| `items.line_id: ''` (пустая строка)                     | `POST /push` (JSON: `{"items": [{"id": "x", "line_id": ""}], ...}`)                                                                                                                                    | `200 OK` (поле `line_id` отсутствует)                   |
| `items.fashion_size: ''` (пустая строка)                | `POST /push` (JSON: `{"items": [{"id": "x", "fashion_size": ""}], ...}`)                                                                                                                               | `200 OK` (поле `fashion_size` отсутствует)              |
| Пустой `items.id`                                       | `POST /push` (JSON: `{"items": [{"id": ""}, {"id": "valid"}], ...}`)                                                                                                                                   | `200 OK` (пустой ID фильтруется)                        |
| Слишком длинный `items.id`                              | `POST /push` (JSON: `{"items": [{"id": "aaaa...(>255 chars)"}, ...]}`)                                                                                                                                 | `200 OK` (длинный ID фильтруется)                       |
| **Successful Tracking**                                 |                                                                                                                                                                                                        |                                                         |
| Трекинг добавления одного товара в избранное            | `POST /push?event=wish&stream=test&items[][id]=123&shop_id={valid}&did={valid}`                                                                                                                        | `200 OK`                                                |
| Трекинг добавления нескольких товаров в избранное       | `POST /push` (JSON: `{"event": "wish", "items": [{"id": "first"}, {"id": "second"}], ...}`)                                                                                                            | `200 OK`                                                |
| Трекинг с `full_wish=true` (замена всего списка)        | `POST /push` (JSON: `{"event": "wish", "full_wish": true, "items": [{"id": "item_1"}, {"id": "item_2"}], ...}`)                                                                                        | `200 OK`                                                |
| Трекинг с некорректным типом `full_wish` (строка "yes") | `POST /push` (JSON: `{"event": "wish", "full_wish": "yes", ...}`)                                                                                                                                      | `200 OK` (кастуется в `true`)                           |
| Трекинг со всеми опциональными параметрами              | `POST /push` (JSON: `{"event": "wish", "stream": "test", "sid": "test-session-id", "segment": "A", "referer": "https://example.com", "recommended_by": "dynamic", "recommended_code": "abc123", ...}`) | `200 OK`                                                |
