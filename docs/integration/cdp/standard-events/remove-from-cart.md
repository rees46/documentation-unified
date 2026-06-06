# Удаление из корзины

Нужно передавать это событие, когда клиент удаляет товар из корзины.

На данное событие завязаны следующие механики платформы:

1. Триггер "Брошенная корзина"
2. Триггер "Цена на товар в корзине снижена"
3. Отображение корзины в карточке клиента
4. Некоторые товарные метрики


```
POST https://api.rees46.ru/push
```

## Параметры

| Параметр         | Обязателен? | Описание                                                                                                                                                     |
|------------------|-------------|--------------------------------------------------------------------------------------------------------------------------------------------------------------|
| shop_id          | Да          | API-ключ                                                                                                                                                     |
| did*             | Да          | [Идентификатор устройства](../entities/did.md)                                                                                                               |
| sid              | Да          | [Идентификатор сессии](../entities/sid.md) . Обязателен при передаче `did`, желателен при других идентификаторах, если есть возможность                      |
| email*           | Да          | Email клиента                                                                                                                                                |
| phone*           | Да          | Телефон клиента                                                                                                                                              |
| external_id*     | Да          | Внешний идентификатор клиента                                                                                                                                |
| loyalty_id*      | Да          | Идентификатор внешней программы лояльности клиента                                                                                                           |
| telegram_id*     | Да          | Telegram ID клиента                                                                                                                                          |
| event            | Да          | Код события. В данном случае `remove_from_cart`                                                                                                              |
| segment          | Нет         | Идентификатор сегмента для встроенных A/B-тестов. Значения: `A` или `B` (латиница)                                                                           |
| recommended_by   | Нет         | Признак атрибуцированного события – инструмент. Значения обычно берутся из ссылки на товар, возвращаемый нашим API                                           |
| recommended_code | Нет         | Признак атрибуцированного события – идентификатор. Значения обычно берутся из ссылки на товар, возвращаемый нашим API                                        |
| stream           | Нет         | [Стрим](../entities/stream.md)                                                                                                                               |
| referer          | Нет         | Страница сайта, на которой произошло событие                                                                                                                 |
| items            | Да          | Массив товаров для события. Может содержать как один товар, так и полное содержимое корзины.Массив не может быть пустым. Должен содержать хотя бы один товар |
| items[]          | Да          | Объект товара                                                                                                                                                |
| items[].id       | Да          | Идентификатор (артикул) товара, который указан в импорте товара. Пустой `ID` или `ID` длиннее 255 символов будут проигнорированы без появления ошибки        |
| items[].price    | Нет         | Цена товара (устарело)                                                                                                                                       |
| items[].name     | Нет         | Название товара (устарело)                                                                                                                                   |
| items[].brand    | Нет         | Бренд товара (устарело)                                                                                                                                      |
| items[].stock    | Нет         | Флаг, что товар все еще в наличии (устарело)                                                                                                                 |

:::info Идентификаторы
Параметры, отмеченные [*] - обязателен хотя бы один из них. На стороне сайта или мобильных приложений SDK автоматически передает `did`.
:::

:::info Совет про полную очистку корзины
Если клиент полностью очистил корзину, вместо передачи нескольких событий удаления товара из корзины, передайте событие `cart` с `full_cart=true` и `items` в виде пустого массива. Это надежнее.
:::

## Запрос

:::danger TODO
Ревью мобильных SDK
:::

Пример запроса:

::: code-group
```shell [S2S]
curl 'https://api.rees46.ru/push' \
    -X 'POST' \
    -H 'Content-Type: application/json' \
    --data-raw '{"event":"remove_from_cart", "shop_id":"SHOP_ID", "did":"DEVICE_ID", "sid":"SEANCE_ID", "items":[{"id":"PRODUCT_ID"}]}'
```

```javascript [JS SDK]
r46('track', 'remove_from_cart', 'id');
```

```swift [iOS] 
sdk.track(event: .productRemovedFromCart(id: "PRODUCT_ID")) { trackResponse in
    // ... обработка коллбэков показана в описании события "Просмотр товара"
}
```

```kotlin [Kotlin]
TBD
```

```java [Java (deprecated)]
TBD
```

```javascript [ReactNative]
sdk.track("remove_from_cart", id);
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

| Сценарий                                              | Пример запроса                                                                                                                                                                                                     | Код ошибки                                              |
|:------------------------------------------------------|:-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|:--------------------------------------------------------|
| **HTTP Method Validation**                            |                                                                                                                                                                                                                    |                                                         |
| Использование не-POST метода                          | `GET /push?event=remove_from_cart&items[][id]=123`                                                                                                                                                                 | `405 Method Not Allowed`                                |
| **Authentication & Shop Validation**                  |                                                                                                                                                                                                                    |                                                         |
| Запрос без `shop_id`                                  | `POST /push` (без параметров)                                                                                                                                                                                      | `401 Unauthorized`                                      |
| Пустой `shop_id`                                      | `POST /push?shop_id=&event=remove_from_cart&items[][id]=123`                                                                                                                                                       | `422 Unprocessable`                                     |
| Некорректный формат `shop_id` (не 30 hex)             | `POST /push?shop_id=INVALID_ID&event=remove_from_cart&items[][id]=123`                                                                                                                                             | `422 Unprocessable`                                     |
| Несуществующий `shop_id`                              | `POST /push?shop_id=000000000000000000000000000000&event=remove_from_cart&items[][id]=123`                                                                                                                         | `404 Not Found`                                         |
| **Device Validation**                                 |                                                                                                                                                                                                                    |                                                         |
| Корректный `shop_id`, но без `did`                    | `POST /push?shop_id={valid}&event=remove_from_cart&items[][id]=123`                                                                                                                                                | `401 Unauthorized`                                      |
| Пустой `did` (трактуется как отсутствие)              | `POST /push?shop_id={valid}&did=&event=remove_from_cart&items[][id]=123`                                                                                                                                           | `401 Unauthorized`                                      |
| Некорректный формат `did`                             | `POST /push?shop_id={valid}&did=INVALID_ID&event=remove_from_cart&items[][id]=123`                                                                                                                                 | `422 Unprocessable`                                     |
| Несуществующий `did`                                  | `POST /push?shop_id={valid}&did=0000000000&event=remove_from_cart&items[][id]=123`                                                                                                                                 | `404 Not Found`                                         |
| **Shop Status Validation**                            |                                                                                                                                                                                                                    |                                                         |
| Магазин неактивен (`non-active`)                      | `POST /push?shop_id={non_active}&did={valid}&event=remove_from_cart&items[][id]=123`                                                                                                                               | `403 Access Denied`                                     |
| Магазин ограничен (`restricted`)                      | `POST /push?shop_id={restricted}&did={valid}&event=remove_from_cart&items[][id]=123`                                                                                                                               | `403 Access Denied`                                     |
| У магазина истекла оплата                             | `POST /push?shop_id={unpaid}&did={valid}&event=remove_from_cart&items[][id]=123`                                                                                                                                   | `403 Access Denied`                                     |
| **Required Parameters Validation**                    |                                                                                                                                                                                                                    |                                                         |
| Отсутствует параметр `event`                          | `POST /push?items[][id]=123&shop_id={valid}&did={valid}`                                                                                                                                                           | `422 Unprocessable`                                     |
| Пустой параметр `event`                               | `POST /push?event=&items[][id]=123&shop_id={valid}&did={valid}`                                                                                                                                                    | `422 Unprocessable`                                     |
| Некорректное значение `event` (не 'remove_from_cart') | `POST /push?event=INVALID&items[][id]=123&shop_id={valid}&did={valid}`                                                                                                                                             | `422 Unprocessable`                                     |
| **Items Validation**                                  |                                                                                                                                                                                                                    |                                                         |
| Отсутствует параметр `items`                          | `POST /push?event=remove_from_cart&shop_id={valid}&did={valid}`                                                                                                                                                    | `422 Unprocessable`                                     |
| Пустой `items` (не массив)                            | `POST /push?event=remove_from_cart&items=&shop_id={valid}&did={valid}`                                                                                                                                             | `422 Unprocessable`                                     |
| Пустой массив `items`                                 | `POST /push` (JSON: `{"event": "remove_from_cart", "items": [], ...}`)                                                                                                                                             | `422 Unprocessable`                                     |
| Все `items` отфильтрованы из-за некорректного ID      | `POST /push` (JSON: `{"event": "remove_from_cart", "items": [{"id": "Hello\\World"}], ...}`)                                                                                                                       | `422 Unprocessable`                                     |
| **Optional Parameters Validation**                    |                                                                                                                                                                                                                    |                                                         |
| Пустой `stream`                                       | `POST /push?event=remove_from_cart&items[][id]=123&stream=&shop_id={valid}&did={valid}`                                                                                                                            | `422 Unprocessable`                                     |
| `stream` не строка (массив)                           | `POST /push?event=remove_from_cart&items[][id]=123&stream[]=42&shop_id={valid}&did={valid}`                                                                                                                        | `422 Unprocessable`                                     |
| Пустой `sid`                                          | `POST /push?event=remove_from_cart&items[][id]=123&sid=&shop_id={valid}&did={valid}`                                                                                                                               | `422 Unprocessable`                                     |
| `sid` не строка                                       | `POST /push?event=remove_from_cart&items[][id]=123&sid[]=42&shop_id={valid}&did={valid}`                                                                                                                           | `422 Unprocessable`                                     |
| Пустой `referer`                                      | `POST /push?event=remove_from_cart&items[][id]=123&referer=&shop_id={valid}&did={valid}`                                                                                                                           | `422 Unprocessable`                                     |
| `referer` не строка                                   | `POST /push?event=remove_from_cart&items[][id]=123&referer[]=42&shop_id={valid}&did={valid}`                                                                                                                       | `422 Unprocessable`                                     |
| Пустой `segment`                                      | `POST /push?event=remove_from_cart&items[][id]=123&segment=&shop_id={valid}&did={valid}`                                                                                                                           | `422 Unprocessable`                                     |
| Некорректный `segment` (не 'A' или 'B')               | `POST /push?event=remove_from_cart&items[][id]=123&segment=C&shop_id={valid}&did={valid}`                                                                                                                          | `422 Unprocessable`                                     |
| Пустой `recommended_by`                               | `POST /push?event=remove_from_cart&items[][id]=123&recommended_by=&shop_id={valid}&did={valid}`                                                                                                                    | `422 Unprocessable`                                     |
| Некорректный `recommended_by`                         | `POST /push?event=remove_from_cart&items[][id]=123&recommended_by=INVALID&shop_id={valid}&did={valid}`                                                                                                             | `422 Unprocessable`                                     |
| `recommended_by` не строка (массив)                   | `POST /push?event=remove_from_cart&items[][id]=123&recommended_by[]=dynamic&shop_id={valid}&did={valid}`                                                                                                           | `422 Unprocessable`                                     |
| Пустой `recommended_code`                             | `POST /push?event=remove_from_cart&items[][id]=123&recommended_code=&shop_id={valid}&did={valid}`                                                                                                                  | `422 Unprocessable`                                     |
| `recommended_code` не строка                          | `POST /push?event=remove_from_cart&items[][id]=123&recommended_code[]=42&shop_id={valid}&did={valid}`                                                                                                              | `422 Unprocessable`                                     |
| Пустой `source` (строка)                              | `POST /push?event=remove_from_cart&items[][id]=123&source=&shop_id={valid}&did={valid}`                                                                                                                            | `422 Unprocessable`                                     |
| Некорректный `source` (не JSON)                       | `POST /push?event=remove_from_cart&items[][id]=123&source=not-json&shop_id={valid}&did={valid}`                                                                                                                    | `422 Unprocessable`                                     |
| **Source Logic**                                      |                                                                                                                                                                                                                    |                                                         |
| Корректный JSON в `source` (строка)                   | `POST /push` (JSON: `{"event": "remove_from_cart", "source": "{\"code\": \"abc\", \"from\": \"dynamic\"}", ...}`)                                                                                                  | `200 OK` (recommended_by=dynamic, recommended_code=abc) |
| Корректный объект в `source`                          | `POST /push` (JSON: `{"event": "remove_from_cart", "source": {"code": "abc", "from": "dynamic"}, ...}`)                                                                                                            | `200 OK` (recommended_by=dynamic, recommended_code=abc) |
| Некорректный `source.from`                            | `POST /push` (JSON: `{"source": "{\"code\": \"abc\", \"from\": \"example\"}"}`)                                                                                                                                    | `200 OK` (source игнорируется, поля null)               |
| Отсутствует `source.from` в JSON                      | `POST /push` (JSON: `{"source": "{\"code\": \"abc\"}"}`)                                                                                                                                                           | `200 OK` (source игнорируется, поля null)               |
| Отсутствует `source.code` в JSON                      | `POST /push` (JSON: `{"source": "{\"from\": \"dynamic\"}"}`)                                                                                                                                                       | `200 OK` (source игнорируется, поля null)               |
| **Item Amount/Quantity Logic**                        |                                                                                                                                                                                                                    |                                                         |
| `items.amount: -1` (ниже минимума)                    | `POST /push` (JSON: `{"items": [{"id": "x", "amount": -1}], ...}`)                                                                                                                                                 | `200 OK` (amount становится `1`)                        |
| `items.amount: 1001` (выше максимума)                 | `POST /push` (JSON: `{"items": [{"id": "x", "amount": 1001}], ...}`)                                                                                                                                               | `200 OK` (amount становится `1000`)                     |
| `items.quantity: -1` (синоним amount)                 | `POST /push` (JSON: `{"items": [{"id": "x", "quantity": -1}], ...}`)                                                                                                                                               | `200 OK` (amount становится `1`)                        |
| **Item Price Logic**                                  |                                                                                                                                                                                                                    |                                                         |
| `items.price: -1` (отрицательное число)               | `POST /push` (JSON: `{"items": [{"id": "x", "price": -1}], ...}`)                                                                                                                                                  | `200 OK` (поле `price` отсутствует)                     |
| `items.price: -0.1` (отрицательный float)             | `POST /push` (JSON: `{"items": [{"id": "x", "price": -0.1}], ...}`)                                                                                                                                                | `200 OK` (поле `price` отсутствует)                     |
| `items.price: '-666'` (отрицательная строка)          | `POST /push` (JSON: `{"items": [{"id": "x", "price": "-666"}], ...}`)                                                                                                                                              | `200 OK` (поле `price` отсутствует)                     |
| `items.price: 'asdasd'` (не число)                    | `POST /push` (JSON: `{"items": [{"id": "x", "price": "asdasd"}], ...}`)                                                                                                                                            | `200 OK` (поле `price` отсутствует)                     |
| **Item Other Fields Logic**                           |                                                                                                                                                                                                                    |                                                         |
| `items.line_id: ''` (пустая строка)                   | `POST /push` (JSON: `{"items": [{"id": "x", "line_id": ""}], ...}`)                                                                                                                                                | `200 OK` (поле `line_id` отсутствует)                   |
| `items.fashion_size: ''` (пустая строка)              | `POST /push` (JSON: `{"items": [{"id": "x", "fashion_size": ""}], ...}`)                                                                                                                                           | `200 OK` (поле `fashion_size` отсутствует)              |
| Пустой `items.id`                                     | `POST /push` (JSON: `{"items": [{"id": ""}, {"id": "valid"}], ...}`)                                                                                                                                               | `200 OK` (пустой ID фильтруется)                        |
| Слишком длинный `items.id`                            | `POST /push` (JSON: `{"items": [{"id": "aaaa...(>255 chars)"}, ...]}`)                                                                                                                                             | `200 OK` (длинный ID фильтруется)                       |
| **Successful Tracking**                               |                                                                                                                                                                                                                    |                                                         |
| Трекинг удаления одного товара                        | `POST /push?event=remove_from_cart&stream=test&items[][id]=123&shop_id={valid}&did={valid}`                                                                                                                        | `200 OK`                                                |
| Трекинг удаления нескольких товаров                   | `POST /push` (JSON: `{"event": "remove_from_cart", "items": [{"id": "first", "amount": 42}, {"id": "second", "amount": 23}], ...}`)                                                                                | `200 OK`                                                |
| Трекинг со всеми опциональными параметрами            | `POST /push` (JSON: `{"event": "remove_from_cart", "stream": "test", "sid": "test-session-id", "segment": "A", "referer": "https://example.com", "recommended_by": "dynamic", "recommended_code": "abc123", ...}`) | `200 OK`                                                |
