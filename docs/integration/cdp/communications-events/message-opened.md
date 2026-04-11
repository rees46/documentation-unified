# Сообщение открыто или отображено

Событие доставки сообщения передается в момент, когда приложение отображает мобильный пуш пользователю.

```
POST https://api.rees46.ru/track/opened
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
curl 'https://api.rees46.ru/track/opened' \
    -X 'POST' \
    -H 'Content-Type: application/json' \
    --data-raw '{"shop_id":"SHOP_ID", "code":"CODE", "type":"TYPE"}'
```

```swift [iOS] 
// TODO переименовать в `opened`
sdk.notificationReceived(code: "i7ykuagkjgfs", type: "bulk")
```

```kotlin [Kotlin]
TBD
```

```java [Java (deprecated)]
TBD
```

```javascript [ReactNative]
// Код и тип можно взять из тела push-уведомления
const params = {
  code: 'CODE',
  type: 'TYPE'
};

// Track when the notification is received and displayed
sdk.notificationOpened(params);
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