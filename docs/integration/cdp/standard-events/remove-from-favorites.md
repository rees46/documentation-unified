# Удаление из избранного

Если клиент убрал один из товаров из избранного, лучше пользоваться методом полной синхронизации избранного. Но, если это невозможно, тогда данный метод позволит убрать один из товаров.

На данное событие завязаны следующие механики платформы:

1. Триггер "Цена на товар в избранном снижена"
2. Триггер "Товар в избранном снова в наличии"
3. Избранное в карточке клиента

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
| event            | Да          | Код события. В данном случае `remove_wish`                                                                                              |
| segment          | Нет         | Идентификатор сегмента для встроенных A/B-тестов. Значения: `A` или `B` (латиница)                                                      |
| stream           | Нет         | [Стрим](../entities/stream.md)                                                                                                          |
| items            | Да          | Массив товаров для события. Может содержать как один товар, так и полное содержимое корзины                                             |
| items[]          | Да          | Массив идентификаторов товаров                                                                                                          |

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
curl 'https://api.rees46.ru/push' \
    -X 'POST' \
    -H 'Content-Type: application/json' \
    --data-raw '{"event":"remove_wish", "shop_id":"SHOP_ID", "did":"DEVICE_ID", "sid":"SEANCE_ID", "items":[{"id":"PRODUCT_ID"}]}'
```

```javascript [JS SDK]
r46('track', 'remove_wish', product_id);
```

```swift [iOS] 
sdk.track(event: .productRemovedToFavorities(id: "PRODUCT_ID")) { trackResponse in
    // ... обработка коллбэков показана в описании события "Просмотр товара"
}
```


```kotlin [Kotlin]
sdk.trackEventManager.track(Params.TrackEvent.REMOVE_FROM_WISH, YOUR_ITEM_ID)
```


```java [Java (deprecated)]
REES46.track(Params.TrackEvent.REMOVE_FROM_WISH, "37");
```


```javascript [ReactNative]
sdk.track("remove_wish", id);
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