# Поисковый запрос

При открытии страницы полного поиска необходимо передавать событие "Поисковый запрос".

На данное событие завязаны следующие механики платформы:

1. Триггер "Брошенный поиск"
2. Некоторые поисковые метрики

:::info Важно
В случае использования поиска REES46 событие передается автоматически. Иначе необходимо отправлять событие в явном виде. Если используете наш поиск, не передавайте событие явно, чтобы не дублировать данные.
:::

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
| event            | Да          | Код события. В данном случае `search`                                                                                                   |
| search_query     | Да          | Поисковый запрос                                                                                                                        |
| segment          | Нет         | Идентификатор сегмента для встроенных A/B-тестов. Значения: `A` или `B` (латиница)                                                      |
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
    --data-raw '{"event":"search", "shop_id":"SHOP_ID", "did":"DEVICE_ID", "search_query": "..." }'

# Вариант с сегментом
curl 'https://api.rees46.ru/push' \
    -X 'POST' \
    -H 'Content-Type: application/json' \
    --data-raw '{"event":"search", "shop_id":"SHOP_ID", "did":"DEVICE_ID", "sid":"SEANCE_ID", "segment":"A", "search_query": "..." }'
```


```javascript [JS SDK]
r46('track', 'search', search_query);
```


```swift [iOS] 
// Начиная с версии iOS SDK 2.1.0
sdk.track(event: .search(query: "red shoes")) { trackResponse in
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
sdk.track("search", "This is a search example");
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

| Сценарий                                         | Пример запроса                                                                                                                                                                                                                         | Код ошибки                                              |
|:-------------------------------------------------|:---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|:--------------------------------------------------------|
| **HTTP Method Validation**                       |                                                                                                                                                                                                                                        |                                                         |
| Использование не-POST метода                     | `GET /push?event=search&search_query=test`                                                                                                                                                                                             | `405 Method Not Allowed`                                |
| **Authentication & Shop Validation**             |                                                                                                                                                                                                                                        |                                                         |
| Запрос без `shop_id`                             | `POST /push` (без параметров)                                                                                                                                                                                                          | `401 Unauthorized`                                      |
| Пустой `shop_id`                                 | `POST /push?shop_id=&event=search&search_query=test`                                                                                                                                                                                   | `422 Unprocessable`                                     |
| Некорректный формат `shop_id` (не 30 hex)        | `POST /push?shop_id=INVALID_ID&event=search&search_query=test`                                                                                                                                                                         | `422 Unprocessable`                                     |
| Несуществующий `shop_id`                         | `POST /push?shop_id=000000000000000000000000000000&event=search&search_query=test`                                                                                                                                                     | `404 Not Found`                                         |
| **Device Validation**                            |                                                                                                                                                                                                                                        |                                                         |
| Корректный `shop_id`, но без `did`               | `POST /push?shop_id={valid}&event=search&search_query=test`                                                                                                                                                                            | `401 Unauthorized`                                      |
| Пустой `did` (трактуется как отсутствие)         | `POST /push?shop_id={valid}&did=&event=search&search_query=test`                                                                                                                                                                       | `401 Unauthorized`                                      |
| Некорректный формат `did`                        | `POST /push?shop_id={valid}&did=INVALID_ID&event=search&search_query=test`                                                                                                                                                             | `422 Unprocessable`                                     |
| Несуществующий `did`                             | `POST /push?shop_id={valid}&did=0000000000&event=search&search_query=test`                                                                                                                                                             | `404 Not Found`                                         |
| **Shop Status Validation**                       |                                                                                                                                                                                                                                        |                                                         |
| Магазин неактивен (`non-active`)                 | `POST /push?shop_id={non_active}&did={valid}&event=search&search_query=test`                                                                                                                                                           | `403 Access Denied`                                     |
| Магазин ограничен (`restricted`)                 | `POST /push?shop_id={restricted}&did={valid}&event=search&search_query=test`                                                                                                                                                           | `403 Access Denied`                                     |
| У магазина истекла оплата                        | `POST /push?shop_id={unpaid}&did={valid}&event=search&search_query=test`                                                                                                                                                               | `403 Access Denied`                                     |
| **Required Parameters Validation**               |                                                                                                                                                                                                                                        |                                                         |
| Отсутствует параметр `event`                     | `POST /push?search_query=test&shop_id={valid}&did={valid}`                                                                                                                                                                             | `422 Unprocessable`                                     |
| Пустой параметр `event`                          | `POST /push?event=&search_query=test&shop_id={valid}&did={valid}`                                                                                                                                                                      | `422 Unprocessable`                                     |
| Некорректное значение `event` (не 'search')      | `POST /push?event=INVALID&search_query=test&shop_id={valid}&did={valid}`                                                                                                                                                               | `422 Unprocessable`                                     |
| Отсутствует параметр `search_query`              | `POST /push?event=search&shop_id={valid}&did={valid}`                                                                                                                                                                                  | `422 Unprocessable`                                     |
| Пустой `search_query`                            | `POST /push?event=search&search_query=&shop_id={valid}&did={valid}`                                                                                                                                                                    | `422 Unprocessable`                                     |
| Некорректный тип `search_query` (массив)         | `POST /push?event=search&search_query[]=test&shop_id={valid}&did={valid}`                                                                                                                                                              | `422 Unprocessable`                                     |
| **Optional Parameters Validation**               |                                                                                                                                                                                                                                        |                                                         |
| Пустой `stream`                                  | `POST /push?event=search&search_query=test&stream=&shop_id={valid}&did={valid}`                                                                                                                                                        | `422 Unprocessable`                                     |
| `stream` не строка (массив)                      | `POST /push?event=search&search_query=test&stream[]=42&shop_id={valid}&did={valid}`                                                                                                                                                    | `422 Unprocessable`                                     |
| Пустой `sid`                                     | `POST /push?event=search&search_query=test&sid=&shop_id={valid}&did={valid}`                                                                                                                                                           | `422 Unprocessable`                                     |
| `sid` не строка                                  | `POST /push?event=search&search_query=test&sid[]=42&shop_id={valid}&did={valid}`                                                                                                                                                       | `422 Unprocessable`                                     |
| Пустой `referer`                                 | `POST /push?event=search&search_query=test&referer=&shop_id={valid}&did={valid}`                                                                                                                                                       | `422 Unprocessable`                                     |
| `referer` не строка                              | `POST /push?event=search&search_query=test&referer[]=42&shop_id={valid}&did={valid}`                                                                                                                                                   | `422 Unprocessable`                                     |
| Пустой `segment`                                 | `POST /push?event=search&search_query=test&segment=&shop_id={valid}&did={valid}`                                                                                                                                                       | `422 Unprocessable`                                     |
| Некорректный `segment` (не 'A' или 'B')          | `POST /push?event=search&search_query=test&segment=C&shop_id={valid}&did={valid}`                                                                                                                                                      | `422 Unprocessable`                                     |
| Пустой `recommended_by`                          | `POST /push?event=search&search_query=test&recommended_by=&shop_id={valid}&did={valid}`                                                                                                                                                | `422 Unprocessable`                                     |
| Некорректный `recommended_by`                    | `POST /push?event=search&search_query=test&recommended_by=INVALID&shop_id={valid}&did={valid}`                                                                                                                                         | `422 Unprocessable`                                     |
| `recommended_by` не строка (массив)              | `POST /push?event=search&search_query=test&recommended_by[]=dynamic&shop_id={valid}&did={valid}`                                                                                                                                       | `422 Unprocessable`                                     |
| Пустой `recommended_code`                        | `POST /push?event=search&search_query=test&recommended_code=&shop_id={valid}&did={valid}`                                                                                                                                              | `422 Unprocessable`                                     |
| `recommended_code` не строка                     | `POST /push?event=search&search_query=test&recommended_code[]=42&shop_id={valid}&did={valid}`                                                                                                                                          | `422 Unprocessable`                                     |
| Пустой `source` (строка)                         | `POST /push?event=search&search_query=test&source=&shop_id={valid}&did={valid}`                                                                                                                                                        | `422 Unprocessable`                                     |
| Некорректный `source` (не JSON)                  | `POST /push?event=search&search_query=test&source=not-json&shop_id={valid}&did={valid}`                                                                                                                                                | `422 Unprocessable`                                     |
| **Source Logic**                                 |                                                                                                                                                                                                                                        |                                                         |
| Корректный JSON в `source` (строка)              | `POST /push` (JSON: `{"event": "search", "source": "{\"code\": \"abc\", \"from\": \"dynamic\"}", "search_query": "test", ...}`)                                                                                                        | `200 OK` (recommended_by=dynamic, recommended_code=abc) |
| Корректный объект в `source`                     | `POST /push` (JSON: `{"event": "search", "source": {"code": "abc", "from": "dynamic"}, "search_query": "test", ...}`)                                                                                                                  | `200 OK` (recommended_by=dynamic, recommended_code=abc) |
| Некорректный `source.from`                       | `POST /push` (JSON: `{"source": "{\"code\": \"abc\", \"from\": \"example\"}"}`)                                                                                                                                                        | `200 OK` (source игнорируется, поля null)               |
| Отсутствует `source.from` в JSON                 | `POST /push` (JSON: `{"source": "{\"code\": \"abc\"}"}`)                                                                                                                                                                               | `200 OK` (source игнорируется, поля null)               |
| Отсутствует `source.code` в JSON                 | `POST /push` (JSON: `{"source": "{\"from\": \"dynamic\"}"}`)                                                                                                                                                                           | `200 OK` (source игнорируется, поля null)               |
| **Successful Tracking**                          |                                                                                                                                                                                                                                        |                                                         |
| Трекинг поискового запроса (ASCII)               | `POST /push?event=search&stream=test&search_query=red+shoes&shop_id={valid}&did={valid}`                                                                                                                                               | `200 OK`                                                |
| Трекинг поискового запроса (Unicode/спецсимволы) | `POST /push` (JSON: `{"event": "search", "search_query": "кроссовки Nike Air Max 42", ...}`)                                                                                                                                           | `200 OK`                                                |
| Трекинг со всеми опциональными параметрами       | `POST /push` (JSON: `{"event": "search", "stream": "test", "sid": "test-session-id", "segment": "A", "referer": "https://example.com", "recommended_by": "dynamic", "recommended_code": "abc123", "search_query": "test query", ...}`) | `200 OK`                                                |
