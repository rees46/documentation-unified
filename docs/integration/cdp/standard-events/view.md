# Просмотр товара

Событие просмотра товара должно срабатывать при открытии карточки товара. Либо, если у вас на сайте есть модальное окно с полной информацией о товаре, которое появляется при клике на него в списке товаров.

На данное событие завязаны следующие механики платформы:

1. Триггер "Брошенный просмотр"
2. Сегментация по интересу к товарам и их свойствам
3. Некоторые товарные метрики

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
| event            | Да          | Код события. В данном случае `view`                                                                                                     |
| segment          | Нет         | Идентификатор сегмента для встроенных A/B-тестов. Значения: `A` или `B` (латиница)                                                      |
| recommended_by   | Нет         | Признак атрибуцированного события – инструмент. Значения обычно берутся из ссылки на товар, возвращаемый нашим API                      |
| recommended_code | Нет         | Признак атрибуцированного события – идентификатор. Значения обычно берутся из ссылки на товар, возвращаемый нашим API                   |
| stream           | Нет         | [Стрим](../entities/stream.md)                                                                                                          |
| referer          | Нет         | Страница сайта, на которой произошло событие                                                                                            |
| items            | Да          | Массив товаров для события. Обычно содержит только один товар, т.к. посетитель за один клик просматривает только один товар             |
| items[]          | Да          | Объект товара                                                                                                                           |
| items[].id       | Да          | Идентификатор (артикул) товара, который указан в импорте товара                                                                         |
| items[].price    | Нет         | Цена товара (устарело)                                                                                                                  |
| items[].name     | Нет         | Название товара (устарело)                                                                                                              |
| items[].brand    | Нет         | Бренд товара (устарело)                                                                                                                 |
| items[].stock    | Нет         | Флаг, что товар все еще в наличии (устарело)                                                                                            |

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
    --data-raw '{"event":"view", "shop_id":"SHOP_ID", "did":"DEVICE_ID", "items":[ {"id":"PRODUCT_ID"} ] }'

# Простейший трекинг события без дополнительных свойств
curl 'https://api.rees46.ru/push' \
    -X 'POST' \
    -H 'Content-Type: application/json' \
    --data-raw '{"event":"view", "shop_id":"SHOP_ID", "did":"DEVICE_ID", "sid":"SEANCE_ID", "segment":"A", "items":[ {"id":"PRODUCT_ID"} ] }'

# Трекинг с атрибуцией блока товарных рекомендаций
curl 'https://api.rees46.ru/push' \
    -X 'POST' \
    -H 'Content-Type: application/json' \
    --data-raw '{"event":"view", "shop_id":"SHOP_ID", "did":"DEVICE_ID", "sid":"SEANCE_ID", "segment":"A", "recommended_by": "dynamic", "recommended_code": "...", "items":[ {"id":"PRODUCT_ID"} ] }'
```

```javascript [JS SDK]
// Простейший трекинг события без дополнительных свойств
r46("track", "view", "37");

// Трекинг с атрибуцией блока товарных рекомендаций, добавленной вручную (обычно JS SDK берет параметры из URL и добавляет их самостоятельно)
r46("track", "view", {
  id: "37",
  recommended_by: "dynamic",
  recommended_code: "jkIWdXSRfwVyK"
});

// Трекинг с атрибуцией быстрого поиска
r46("track", "view", {
  id: "37",
  recommended_by: "instant_search",
  recommended_code: "iphone"
});

// Трекинг с атрибуцией полного поиска
r46("track", "view", {
  id: "37",
  recommended_by: "full_search",
  recommended_code: "iphone"
});
```

```swift [iOS] 
// Простейший трекинг без атрибуции
sdk.track(event: .productView(id: "PRODUCT_ID")) { trackResponse in
    print("Product viewed callback")
    switch trackResponse {
    case let .success(response):
        print("Successful")
    case let .failure(error):
        switch error {
        case .custom(let customError):
            print("Error: ", customError)
        default:
            print("Error: ", error.localizedDescription)
        }
        fatalError("Task failed successfully")
    }
}

// Трекинг с атрибуцией блока товарных рекомендаций
let recData = RecomendedBy(type: .dynamic, code: "beb620922934b6ba2d6a3fb82b8b3271")
sdk.track(event: .productView(id: "PRODUCT_ID"), recommendedBy: recData) { trackResponse in
    // ... все то же самое, что и выше
}
```


```kotlin [Kotlin]
TBD
```


```java [Java (deprecated)]
TBD
```


```javascript [ReactNative]
// Простейший трекинг события без дополнительных свойств
sdk.track("view", "37");

// Трекинг с атрибуцией блока товарных рекомендаций, добавленной вручную (обычно JS SDK берет параметры из URL и добавляет их самостоятельно)
sdk.track("view", {
  id: "37",
  recommended_by: "dynamic",
  recommended_code: "jkIWdXSRfwVyK"
});

// Трекинг с атрибуцией быстрого поиска
sdk.track("view", {
  id: "37",
  recommended_by: "instant_search",
  recommended_code: "iphone"
});

// Трекинг с атрибуцией полного поиска
sdk.track("view", {
  id: "37",
  recommended_by: "full_search",
  recommended_code: "iphone"
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