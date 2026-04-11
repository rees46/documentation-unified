# Пользователь кликнул по сообщению

Событие нажатия/клика/перехода сообщения передается в момент, когда пользователь нажал на уведомление и перешел на целевой экран.

```
POST https://api.rees46.ru/track/clicked
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
curl 'https://api.rees46.ru/track/clicked' \
    -X 'POST' \
    -H 'Content-Type: application/json' \
    --data-raw '{"shop_id":"SHOP_ID", "code":"CODE", "type":"TYPE"}'
```

```swift [iOS] 
sdk.notificationClicked(code: "i7ykuagkjgfs", type: "bulk")
```

```kotlin [Kotlin]
// Add notification identification data to the intent
intent.putExtra( REES46.NOTIFICATION_TYPE, data["type"])
intent.putExtra( REES46.NOTIFICATION_ID, data["id"])

// Add click tracking in the method of activity creation
override fun onCreate(savedInstanceState: Bundle?) {
  super.onCreate(savedInstanceState)
    // Для отслеживания кликов по уведомлению
    if (intent.extras != null) {
      sdk.notificationClicked(intent.extras)
    }
}
```

```java [Java (deprecated)]
// Add notification identification data to the intent
intent.putExtra(REES46.NOTIFICATION_TYPE, data.get("type"));
intent.putExtra(REES46.NOTIFICATION_ID, data.get("id"));

// Add click tracking in the method of activity creation
@Override
protected void onCreate(Bundle savedInstanceState) {
    super.onCreate(savedInstanceState);
    //For tracking notification clicked
    if( getIntent().getExtras() != null ) {
        REES46.notificationClicked(getIntent().getExtras());
    }
}
```

```javascript [ReactNative]
// Код и тип можно взять из тела push-уведомления
const params = {
  code: 'CODE',
  type: 'TYPE'
};

// Track when user clicked the notification
sdk.notificationClicked(params);
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