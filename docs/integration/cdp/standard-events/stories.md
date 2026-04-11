# Просмотр слайда сторис

JS SDK и мобильные SDK автоматически передают трекинг просмотров слайдов сторис. Но, если вы делаете свой собственный плеер сторис, вам потребуется передавать действия посетителей вручную.

Данные события используются в аналитике сервиса сторис: от просмотра до выручки и среднего чека.

```
POST https://api.rees46.ru/track/stories
```

## Параметры

:::danger 
Выяснить все актуальные параметры
:::

| Параметр       | Обязателен? | Описание                                                                                                                                |
|----------------|-------------|-----------------------------------------------------------------------------------------------------------------------------------------|
| shop_id        | Да          | API-ключ                                                                                                                                |
| did            | Да          | [Идентификатор устройства](../entities/did.md)                                                                                          |
| sid            | Да          | [Идентификатор сессии](../entities/sid.md) . Обязателен при передаче `did`, желателен при других идентификаторах, если есть возможность |
| event          | Да          | Событие                                                                                                                                 |
| code           | Да          | Код блока сторис                                                                                                                        |
| story_id       | Да          | Идентификатор кампании сторис                                                                                                           |
| slide_id       | Да          | Идентификатор слайда сторис                                                                                                             |


## Запрос

:::danger TODO
Ревью всех SDK
:::

Пример запроса:

::: code-group
```shell [S2S]
# Добавление товара в избранное
curl 'https://api.rees46.ru/push' \
    -X 'POST' \
    -H 'Content-Type: application/json' \
    --data-raw '{"event":"...", "shop_id":"SHOP_ID", "did":"DEVICE_ID", "sid":"SEANCE_ID", "items":[{"id":"PRODUCT_ID"}], "code": "...", "story_id": "...", "slide_id": "..."}'

```

```javascript [JS SDK]
// TODO: актуализировать!
track(event, story_id, slide_id) {
  return this.core.ajax.sendPost(this.core.api.getAPIUrl('/track/stories'), {
    shop_id: this.core.shop.token,
    did: this.core.user.did,
    sid: this.core.user.seance,
    event: event,
    code: this.code,
    story_id: story_id,
    slide_id: slide_id,
  });
}
```

```swift [iOS] 
TBD
```


```kotlin [Kotlin]
TBD
```


```java [Java (deprecated)]
// Простое добавление товара в избранное
REES46.track(Params.TrackEvent.WISH, "37");
```


```javascript [ReactNative]
TBD
```
:::


## Ответ

Пример ответа сервера:

```json 
{
  "status": "success"
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