# Сообщение доставлено

Событие доставки сообщения передается в момент, когда приложение получает мобильный пуш.

```
POST https://api.rees46.ru/track/delivered
```

## Параметры

:::danger TODO
Актуализировать список параметров
:::

| Параметр | Обязателен? | Описание                                                                                                                                |
|----------|-------------|-----------------------------------------------------------------------------------------------------------------------------------------|
| shop_id  | Да          | API-ключ                                                                                                                                |
| type     | Да          | Тип сообщения: `bulk`, `chain`, `transactional`                                                                                         |
| code     | Да          | Уникальный код сообщения                                                                                                                |

## Запрос

:::danger TODO
Ревью параметров мобильных SDK. Доделать Android.
:::

Пример запроса:

::: code-group

```shell [S2S]
curl 'https://api.rees46.ru/track/delivered' \
    -X 'POST' \
    -H 'Content-Type: application/json' \
    --data-raw '{"shop_id":"SHOP_ID", "code":"CODE", "type":"TYPE"}'
```

```swift [iOS] 
sdk.notificationDelivered(code: "i7ykuagkjgfs", type: "bulk")
```

```kotlin [Kotlin]
TBD
```

```java [Java (deprecated)]
TBD
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
    "message": "Code is not valid"
  }
}
```