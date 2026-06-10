# Добавление пользователя в статичный сегмент

Метод добавляет пользователя в статичный сегмент. Если пользователь уже есть в сегменте, повторно он не добавляется.

Метод может работать как S2S, так и на фронте.

```
POST https://api.rees46.ru/segments/add
```

## Параметры

| Параметр     | Тип     | Обязателен? | Описание                                              |
|--------------|---------|-------------|-------------------------------------------------------|
| shop_id      | String  | Да          | API-ключ                                              |
| shop_secret* | String  | Да          | Секретный API-ключ                                    |
| segment_id   | Integer | Да          | Идентификатор сегмента                                |
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
curl -d "shop_id=...&shop_secret=...&email=...&phone=...&segment_id=..." https://api.rees46.ru/segments/add

# Только с телефоном
curl -d "shop_id=...&shop_secret=...&phone=...&segment_id=..." https://api.rees46.ru/segments/add

# Только с email
curl -d "shop_id=...&shop_secret=...&email=...&segment_id=..." https://api.rees46.ru/segments/add
```

```javascript [JS SDK]
// Используя все контакты
r46('segment', 'add', {
  "email": "jane@example.com",
  "phone": "+10000000000",
  "segment_id": "SEGMENT_ID"
});

// Только с телефоном
r46('segment', 'add', {
  "phone": "+10000000000",
  "segment_id": "SEGMENT_ID"
});

// Только с email
r46('segment', 'add', {
  "email": "jane@example.com",
  "segment_id": "SEGMENT_ID"
});

// Без контактов, используется `did`
r46('segment', 'add', {
  "segment_id": "SEGMENT_ID"
});
```

```swift [iOS] 
// Только с `did`
sdk.addToSegment(segmentId: "333")

// Только с email
sdk.addToSegment(segmentId: "333", email: "my@example.com")

// Только с телефоном
sdk.addToSegment(segmentId: "333", phone: "+10000000000")

// Используя все контакты
sdk.addToSegment(segmentId: "333", email: "my@example.com", phone: "+10000000000")
```


```kotlin [Kotlin]
// Только с `did`
sdk.addToSegment(YOUR_DID, null, null)

// Только с email
sdk.addToSegment(YOUR_DID, YOUR_EMAIL, null)

// Только с телефоном
sdk.addToSegment(YOUR_DID, null, YOUR_PHONE_NUMBER)

// Используя все контакты
sdk.addToSegment(YOUR_DID, YOUR_EMAIL, YOUR_PHONE_NUMBER)
```

```java [Java (deprecated)] 
// Только с `did`
REES46.addToSegment("333", null, null);

// Только с email
REES46.addToSegment("333", "my@example.com", null);

// Только с телефоном
REES46.addToSegment("333", null, "+10000000000");

// Используя все контакты
REES46.addToSegment("333", "my@example.com", "+10000000000");
```

```javascript [ReactNative]
// Только с `did`
sdk.segments('add', {
  "segment_id": "SEGMENT_ID"
});

// Только с email
sdk.segments('add', {
  "email": "jane@example.com",
  "segment_id": "SEGMENT_ID"
});


// Только с телефоном
sdk.segments('add', {
  "phone": "+10000000000",
  "segment_id": "SEGMENT_ID"
});

// Используя все контакты
sdk.segments('add', {
  "email": "jane@example.com",
  "phone": "+10000000000",
  "segment_id": "SEGMENT_ID"
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

В случае ошибки ответ будет в формате:

```json 
{
  "status": "error",
  "payload": {
    "message": "Shop not found"
  }
}
```