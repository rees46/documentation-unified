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