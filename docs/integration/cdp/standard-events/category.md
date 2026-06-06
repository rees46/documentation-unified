# Просмотр категории

При открытии страницы категории необходимо передавать событие "Просмотр категории". 

На данное событие завязаны следующие механики платформы:

1. Триггер "Брошенная категория"
2. Сегментация по интересу к категориям

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
| event            | Да          | Код события. В данном случае `category`                                                                                                 |
| category_id      | Да          | Идентификатор категории                                                                                                                 |
| segment          | Нет         | Идентификатор сегмента для встроенных A/B-тестов. Значения: `A` или `B` (латиница)                                                      |
| recommended_by   | Нет         | Признак атрибуцированного события – инструмент. Значения обычно берутся из ссылки на товар, возвращаемый нашим API                      |
| recommended_code | Нет         | Признак атрибуцированного события – идентификатор. Значения обычно берутся из ссылки на товар, возвращаемый нашим API                   |
| stream           | Нет         | [Стрим](../entities/stream.md)                                                                                                          |
| referer          | Нет         | Страница сайта, на которой произошло событие                                                                                            |

:::info Идентификаторы
Параметры, отмеченные [*] - обязателен хотя бы один из них. На стороне сайта или мобильных приложений SDK автоматически передает `did`.
:::

## Запрос

:::danger TODO
Ревью мобильных SDK
:::

Пример запроса:

::: code-group
```shell [S2S]
# Минимальный трекинг 
curl 'https://api.rees46.ru/push' \
    -X 'POST' \
    -H 'Content-Type: application/json' \
    --data-raw '{"event":"category", "shop_id":"SHOP_ID", "did":"DEVICE_ID", "category_id": "..." }'

# Простейший трекинг события без дополнительных свойств
curl 'https://api.rees46.ru/push' \
    -X 'POST' \
    -H 'Content-Type: application/json' \
    --data-raw '{"event":"category", "shop_id":"SHOP_ID", "did":"DEVICE_ID", "sid":"SEANCE_ID", "segment":"A", "category_id": "..." }'

# Трекинг с атрибуцией блока товарных рекомендаций
curl 'https://api.rees46.ru/push' \
    -X 'POST' \
    -H 'Content-Type: application/json' \
    --data-raw '{"event":"category", "shop_id":"SHOP_ID", "did":"DEVICE_ID", "sid":"SEANCE_ID", "segment":"A", "recommended_by": "stories", "recommended_code": "...", "category_id": "..." }'
```


```javascript [JS SDK]
r46("track", "category", "37");
```


```swift [iOS] 
sdk.track(event: .categoryView(id: "CATEGORY_ID")) { trackResponse in
    // ... обработка коллбэков показана в описании события "Просмотр товара"
}
```


```kotlin [Kotlin]
sdk.trackEventManager.track(Params.TrackEvent.CATEGORY, Params().put(Params.Parameter.CATEGORY_ID, "100"))
```


```java [Java (deprecated)]
REES46.track(Params.TrackEvent.CATEGORY, (new Params()).put(Params.Parameter.CATEGORY_ID, "100"));
```


```javascript [ReactNative]
sdk.track("category", "100500");
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

| Сценарий                                      | Пример запроса                                                                                                                                                                                                                  | Код ошибки                                              |
|:----------------------------------------------|:--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|:--------------------------------------------------------|
| **HTTP Method Validation**                    |                                                                                                                                                                                                                                 |                                                         |
| Использование не-POST метода                  | `GET /push?event=category&category_id=1`                                                                                                                                                                                        | `405 Method Not Allowed`                                |
| **Authentication & Shop Validation**          |                                                                                                                                                                                                                                 |                                                         |
| Запрос без `shop_id`                          | `POST /push` (без параметров)                                                                                                                                                                                                   | `401 Unauthorized`                                      |
| Пустой `shop_id`                              | `POST /push?shop_id=&event=category&category_id=1`                                                                                                                                                                              | `422 Unprocessable`                                     |
| Некорректный формат `shop_id` (не 30 hex)     | `POST /push?shop_id=INVALID_ID&event=category&category_id=1`                                                                                                                                                                    | `422 Unprocessable`                                     |
| Несуществующий `shop_id`                      | `POST /push?shop_id=000000000000000000000000000000&event=category&category_id=1`                                                                                                                                                | `404 Not Found`                                         |
| **Device Validation**                         |                                                                                                                                                                                                                                 |                                                         |
| Корректный `shop_id`, но без `did`            | `POST /push?shop_id={valid}&event=category&category_id=1`                                                                                                                                                                       | `401 Unauthorized`                                      |
| Пустой `did` (трактуется как отсутствие)      | `POST /push?shop_id={valid}&did=&event=category&category_id=1`                                                                                                                                                                  | `401 Unauthorized`                                      |
| Некорректный формат `did`                     | `POST /push?shop_id={valid}&did=INVALID_ID&event=category&category_id=1`                                                                                                                                                        | `422 Unprocessable`                                     |
| Несуществующий `did`                          | `POST /push?shop_id={valid}&did=0000000000&event=category&category_id=1`                                                                                                                                                        | `404 Not Found`                                         |
| **Shop Status Validation**                    |                                                                                                                                                                                                                                 |                                                         |
| Магазин неактивен (`non-active`)              | `POST /push?shop_id={non_active}&did={valid}&event=category&category_id=1`                                                                                                                                                      | `403 Access Denied`                                     |
| Магазин ограничен (`restricted`)              | `POST /push?shop_id={restricted}&did={valid}&event=category&category_id=1`                                                                                                                                                      | `403 Access Denied`                                     |
| У магазина истекла оплата                     | `POST /push?shop_id={unpaid}&did={valid}&event=category&category_id=1`                                                                                                                                                          | `403 Access Denied`                                     |
| **Required Parameters Validation**            |                                                                                                                                                                                                                                 |                                                         |
| Отсутствует параметр `event`                  | `POST /push?category_id=1&shop_id={valid}&did={valid}`                                                                                                                                                                          | `422 Unprocessable`                                     |
| Пустой параметр `event`                       | `POST /push?event=&category_id=1&shop_id={valid}&did={valid}`                                                                                                                                                                   | `422 Unprocessable`                                     |
| Некорректное значение `event` (не 'category') | `POST /push?event=INVALID&category_id=1&shop_id={valid}&did={valid}`                                                                                                                                                            | `422 Unprocessable`                                     |
| Отсутствует параметр `category_id`            | `POST /push?event=category&shop_id={valid}&did={valid}`                                                                                                                                                                         | `422 Unprocessable`                                     |
| Пустой `category_id`                          | `POST /push?event=category&category_id=&shop_id={valid}&did={valid}`                                                                                                                                                            | `422 Unprocessable`                                     |
| Некорректный тип `category_id` (массив)       | `POST /push?event=category&category_id[]=1&shop_id={valid}&did={valid}`                                                                                                                                                         | `422 Unprocessable`                                     |
| **Optional Parameters Validation**            |                                                                                                                                                                                                                                 |                                                         |
| Пустой `stream`                               | `POST /push?event=category&category_id=1&stream=&shop_id={valid}&did={valid}`                                                                                                                                                   | `422 Unprocessable`                                     |
| `stream` не строка (массив)                   | `POST /push?event=category&category_id=1&stream[]=42&shop_id={valid}&did={valid}`                                                                                                                                               | `422 Unprocessable`                                     |
| Пустой `sid`                                  | `POST /push?event=category&category_id=1&sid=&shop_id={valid}&did={valid}`                                                                                                                                                      | `422 Unprocessable`                                     |
| `sid` не строка                               | `POST /push?event=category&category_id=1&sid[]=42&shop_id={valid}&did={valid}`                                                                                                                                                  | `422 Unprocessable`                                     |
| Пустой `referer`                              | `POST /push?event=category&category_id=1&referer=&shop_id={valid}&did={valid}`                                                                                                                                                  | `422 Unprocessable`                                     |
| `referer` не строка                           | `POST /push?event=category&category_id=1&referer[]=42&shop_id={valid}&did={valid}`                                                                                                                                              | `422 Unprocessable`                                     |
| Пустой `segment`                              | `POST /push?event=category&category_id=1&segment=&shop_id={valid}&did={valid}`                                                                                                                                                  | `422 Unprocessable`                                     |
| Некорректный `segment` (не 'A' или 'B')       | `POST /push?event=category&category_id=1&segment=C&shop_id={valid}&did={valid}`                                                                                                                                                 | `422 Unprocessable`                                     |
| Пустой `recommended_by`                       | `POST /push?event=category&category_id=1&recommended_by=&shop_id={valid}&did={valid}`                                                                                                                                           | `422 Unprocessable`                                     |
| Некорректный `recommended_by`                 | `POST /push?event=category&category_id=1&recommended_by=INVALID&shop_id={valid}&did={valid}`                                                                                                                                    | `422 Unprocessable`                                     |
| `recommended_by` не строка (массив)           | `POST /push?event=category&category_id=1&recommended_by[]=dynamic&shop_id={valid}&did={valid}`                                                                                                                                  | `422 Unprocessable`                                     |
| Пустой `recommended_code`                     | `POST /push?event=category&category_id=1&recommended_code=&shop_id={valid}&did={valid}`                                                                                                                                         | `422 Unprocessable`                                     |
| `recommended_code` не строка                  | `POST /push?event=category&category_id=1&recommended_code[]=42&shop_id={valid}&did={valid}`                                                                                                                                     | `422 Unprocessable`                                     |
| Пустой `source` (строка)                      | `POST /push?event=category&category_id=1&source=&shop_id={valid}&did={valid}`                                                                                                                                                   | `422 Unprocessable`                                     |
| Некорректный `source` (не JSON)               | `POST /push?event=category&category_id=1&source=not-json&shop_id={valid}&did={valid}`                                                                                                                                           | `422 Unprocessable`                                     |
| **Source Logic**                              |                                                                                                                                                                                                                                 |                                                         |
| Корректный JSON в `source` (строка)           | `POST /push` (JSON: `{"event": "category", "source": "{\"code\": \"abc\", \"from\": \"dynamic\"}", ...}`)                                                                                                                       | `200 OK` (recommended_by=dynamic, recommended_code=abc) |
| Корректный объект в `source`                  | `POST /push` (JSON: `{"event": "category", "source": {"code": "abc", "from": "dynamic"}, ...}`)                                                                                                                                 | `200 OK` (recommended_by=dynamic, recommended_code=abc) |
| Некорректный `source.from`                    | `POST /push` (JSON: `{"source": "{\"code\": \"abc\", \"from\": \"example\"}"}`)                                                                                                                                                 | `200 OK` (source игнорируется, поля null)               |
| Отсутствует `source.from` в JSON              | `POST /push` (JSON: `{"source": "{\"code\": \"abc\"}"}`)                                                                                                                                                                        | `200 OK` (source игнорируется, поля null)               |
| Отсутствует `source.code` в JSON              | `POST /push` (JSON: `{"source": "{\"from\": \"dynamic\"}"}`)                                                                                                                                                                    | `200 OK` (source игнорируется, поля null)               |
| **Successful Tracking**                       |                                                                                                                                                                                                                                 |                                                         |
| Трекинг категории с числовым ID               | `POST /push?event=category&stream=test&category_id=42&shop_id={valid}&did={valid}`                                                                                                                                              | `200 OK`                                                |
| Трекинг категории со строковым ID             | `POST /push?event=category&stream=test&category_id=electronics/phones&shop_id={valid}&did={valid}`                                                                                                                              | `200 OK`                                                |
| Трекинг со всеми опциональными параметрами    | `POST /push` (JSON: `{"event": "category", "stream": "test", "sid": "test-session-id", "segment": "A", "referer": "https://example.com", "recommended_by": "dynamic", "recommended_code": "abc123", "category_id": "42", ...}`) | `200 OK`                                                |
