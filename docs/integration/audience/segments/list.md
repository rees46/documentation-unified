# Список сегментов пользователя

Метод возвращает список идентификаторов сегмента, в которых находится данный пользователь.

Метод может работать как S2S, так и на фронте.

```
POST https://api.rees46.ru/segments/get
```

## Параметры

| Параметр     | Тип     | Обязателен? | Описание                                              |
|--------------|---------|-------------|-------------------------------------------------------|
| shop_id      | String  | Да          | API-ключ                                              |
| shop_secret* | String  | Да          | Секретный API-ключ                                    |
| did*         | String  | Да          | [Идентификатор устройства](../../cdp/entities/did.md) |
| email*       | String  | Да          | Email клиента                                         |
| phone*       | String  | Да          | Телефон клиента                                       |

:::warning Обязательные свойства
- `shop_secret` обязателен, если в запросе не передается `did`, но передаются `email` или `phone`.
- `did` обязателен, если в запросе не передается `shop_secret`.
:::

## Запрос

:::info Переключение устройства
Если метод вызывается с фронта в связке `email + did` или `phone + did`, то устройство (did) будет переключено на пользователя, у которого находится переданный контакт.
:::

Пример запроса:

::: code-group

```shell [S2S]
# С обоими идентификаторами
curl -d "shop_id=...&shop_secret=...&email=...&phone=..." https://api.rees46.ru/segments/get

# Только с телефоном
curl -d "shop_id=...&shop_secret=...&phone=..." https://api.rees46.ru/segments/get

# Только с email
curl -d "shop_id=...&shop_secret=...&email=..." https://api.rees46.ru/segments/get
```

```javascript [JS SDK]
r46('segment', 'get', callback);
```

```swift [iOS] 
sdk.getCurrentSegment()
```


```kotlin [Kotlin]
sdk.getCurrentSegment(object: OnApiCallbackListener() {
            override fun onSuccess(response: JSONArray) {
                // Обрабатываем массив объектов
            }
        })
```

```java [Java (deprecated)] 
REES46.getCurrentSegment(new Api.OnApiCallbackListener() {
  @Override
  public void onSuccess(JSONArray segments) {
    // segments (type: array of objects)
  }
});
```

```javascript [ReactNative]
sdk.segments('get').then(res => {
  // Обрабатываем массив объектов
});
```
:::

## Ответ

Пример ответа сервера:

```json
[
  {
    "id": 313,
    "type": "static"
  },
  {
    "id": 314,
    "type": "dynamic"
  }
]
```

В случае ошибки ответ будет в формате:

```json 
{
  "status": "error",
  "payload": {
    "message": "Shop not found"
  }
}
```