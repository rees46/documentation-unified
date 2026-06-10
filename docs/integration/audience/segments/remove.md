# Удаление пользователя из статичного сегмента

Метод удаляет пользователя из статичного сегмента, если он там есть. Если пользователя в сегменте нет, метод не выдает ошибку.

Метод может работать как S2S, так и на фронте.

```
POST https://api.rees46.ru/segments/remove
```

## Параметры

| Параметр     | Тип     | Обязателен? | Описание                                           |
|--------------|---------|-------------|----------------------------------------------------|
| shop_id      | String  | Да          | API-ключ                                           |
| shop_secret* | String  | Да          | Секретный API-ключ                                 |
| segment_id   | Integer | Да          | Идентификатор сегмента                             |
| did*         | String  | Да          | [Идентификатор устройства](../../cdp/entities/did.md) |
| email*       | String  | Да          | Email клиента                                      |
| phone*       | String  | Да          | Телефон клиента                                    |

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
curl -d "shop_id=...&shop_secret=...&email=...&phone=...&segment_id=..." https://api.rees46.ru/segments/remove

# Только с телефоном
curl -d "shop_id=...&shop_secret=...&phone=...&segment_id=..." https://api.rees46.ru/segments/remove

# Только с email
curl -d "shop_id=...&shop_secret=...&email=...&segment_id=..." https://api.rees46.ru/segments/remove
```

```javascript [JS SDK]
// Используя все контакты
r46('segment', 'remove', {
  "email": "jane@example.com",
  "phone": "+10000000000",
  "segment_id": "SEGMENT_ID"
});

// Только с телефоном
r46('segment', 'remove', {
  "phone": "+10000000000",
  "segment_id": "SEGMENT_ID"
});

// Только с email
r46('segment', 'remove', {
  "email": "jane@example.com",
  "segment_id": "SEGMENT_ID"
});

// Без контактов, используется `did`
r46('segment', 'remove', {
  "segment_id": "SEGMENT_ID"
});
```

```swift [iOS] 
// Только с `did`
sdk.removeFromSegment(segmentId: "333")

// Только с email
sdk.removeFromSegment(segmentId: "333", email: "my@example.com")

// Только с телефоном
sdk.removeFromSegment(segmentId: "333", phone: "+10000000000")

// Используя все контакты
sdk.removeFromSegment(segmentId: "333", email: "my@example.com", phone: "+10000000000")
```


```kotlin [Kotlin]
// Только с `did`
sdk.removeFromSegment(segment_id = "12345", email = null, phone = null)

// Только с email
sdk.removeFromSegment(segment_id = "12345", email = "...", phone = null)

// Только с телефоном
sdk.removeFromSegment(segment_id = "12345", email = null, phone = "...")

// Используя все контакты
sdk.removeFromSegment(segment_id = "12345", email = "...", phone = null)
```

```java [Java (deprecated)] 
// Только с `did`
REES46.removeFromSegment("333", null, null);

// Только с email
REES46.removeFromSegment("333", "my@example.com", null);

// Только с телефоном
REES46.removeFromSegment("333", null, "+10000000000");

// Используя все контакты
REES46.removeFromSegment("333", "my@example.com", "+10000000000");
```

```javascript [ReactNative]
// Только с `did`
sdk.segments('remove', {
  "segment_id": "SEGMENT_ID"
});

// Только с email
sdk.segments('remove', {
  "email": "jane@example.com",
  "segment_id": "SEGMENT_ID"
});


// Только с телефоном
sdk.segments('remove', {
  "phone": "+10000000000",
  "segment_id": "SEGMENT_ID"
});

// Используя все контакты
sdk.segments('remove', {
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