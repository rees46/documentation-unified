# Кастомные события

Кастомные (пользовательские) события — это тип служебных событий, которые вы можете создавать сами. Такие события решают несколько задач:

1. Особые события, после которых нужно отправить триггерную рассылку. Например, запуск цепочки-онбординга после события `registration` (вы можете использовать любой код события).
2. События, за которые нужно начислить дополнительные бонусы. Например, приветственный бонус за то же самое событие `registration`. Это работает при использовании нашей программы лояльности.
3. Цепочка событий, по которым необходимо составить аналитическую воронку для оценки CJM. Например, последовательность событий `registration` ⇒ `create_project` ⇒ `start_trial` ⇒ `trial_completed` ⇒ `first_payment` ⇒ `second_payment`.

Кастомные события можно вызывать как через SDK с использованием `did`, так и напрямую через API-запрос с использованием любого [идентификатора клиента](./identifier.md).

Прежде, чем передавать кастомное событие, нужно создать его код в личном кабинете.

```
POST https://api.rees46.ru/push/custom
```

## Параметры

| Параметр     | Обязателен? | Описание                                                                                                                                                                    |
|--------------|-------------|-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| shop_id      | Да          | API-ключ                                                                                                                                                                    |
| did*         | Да          | Идентификатор устройства                                                                                                                                                    |
| sid          | Да          | Идентификатор сессии. Обязателен при передаче `did`, желателен при других идентификаторах, если есть возможность                                                            |
| email*       | Да          | Email клиента                                                                                                                                                               |
| phone*       | Да          | Телефон клиента                                                                                                                                                             |
| external_id* | Да          | Внешний идентификатор клиента                                                                                                                                               |
| loyalty_id*  | Да          | Идентификатор внешней программы лояльности клиента                                                                                                                          |
| telegram_id* | Да          | Telegram ID клиента                                                                                                                                                         |
| event        | Да          | Код события. Этот код создается в личном кабинете                                                                                                                           |
| category     | Нет         | Категория события. Произвольная строка для сегментации данных                                                                                                               |
| label        | Нет         | Метка события. Произвольная строка для сегментации данных                                                                                                                   |
| value        | Нет         | Ценность события в виде целого числа                                                                                                                                        |
| time         | Нет         | Время события в формате Unix timestamp. Используется, если вы хотите сохранить событие в прошлом. Если не указать, используется текущее время                               |
| [a-z0-9_]+   | Нет         | Любые дополнительные переменные, которые вы хотите передать в триггерную цепочку для последующей проверки в условиях. Ключ переменной состоит из латинских букв, цифр и `_` |

:::info Идентификаторы
Параметры, отмеченные [*] - обязателен хотя бы один из них. На стороне сайта или мобильных приложений SDK автоматически передает `did`. 
:::


## Запрос

:::danger TODO
Исправить мобильные SDK
:::

Пример запроса:

::: code-group
```shell [S2S]
// Простейший трекинг события без дополнительных свойств
curl 'https://api.rees46.ru/push/custom' \
    -X 'POST' \
    -H 'Content-Type: application/json' \
    --data-raw '{"event":"my_event", "shop_id":"SHOP_ID", "did":"DEVICE_ID", "sid":"SEANCE_ID"}'
    
// Трекинг с несколькими идентификаторами
curl 'https://api.rees46.ru/push/custom' \
    -X 'POST' \
    -H 'Content-Type: application/json' \
    --data-raw '{"event":"my_event", "shop_id":"SHOP_ID", "email":"EMAIL", "phone":"PHONE", "loyalty_id":"LOYALTY_ID", "external_id":"EXTERNAL_ID"}'

// Событие с дополнительными свойствами: категория, метка и ценность
curl 'https://api.rees46.ru/push/custom' \
    -X 'POST' \
    -H 'Content-Type: application/json' \
    --data-raw '{"event":"my_event", "shop_id":"SHOP_ID", "email":"EMAIL", "phone":"PHONE", "loyalty_id":"LOYALTY_ID", "external_id":"EXTERNAL_ID", "category":"event category", "label":"event label", "value":100}'

// Событие с явным указанием времени
curl 'https://api.rees46.ru/push/custom' \
    -X 'POST' \
    -H 'Content-Type: application/json' \
    --data-raw '{"event":"my_event", "shop_id":"SHOP_ID", "did":"DEVICE_ID", "sid":"SEANCE_ID", "time": 1652648400}'
    
// Событие с произвольными переменными
curl 'https://api.rees46.ru/push/custom' \
    -X 'POST' \
    -H 'Content-Type: application/json' \
    --data-raw '{"event":"request_demo", "shop_id":"SHOP_ID", "did":"DEVICE_ID", "sid":"SEANCE_ID", "selected_plan": "pro", "plan_price": 50000, "accepted_offer": true}'
```

```javascript [JS SDK]
// Простейший трекинг события без дополнительных свойств
r46("track", "my_event");

// Событие с дополнительными свойствами: категория, метка и ценность
r46("track", "my_event", {
  "category": "event category",
  "label": "event label",
  "value": 100
});

// Событие с явным указанием времени
r46("track", "my_event", {
  "category": "event category",
  "label": "event label",
  "value": 100,
  "time": 1652648400
});

// Событие с произвольными переменными
r46("track", "my_event", {
  "category": "request_demo",
  "label": "home_page",
  "selected_plan": "pro",
  "plan_price": 50000,
  "accepted_offer": true
});
```

```swift [iOS] 
// Простейший трекинг события без дополнительных свойств
sdk.trackEvent(event: "something_happened")

// Событие с дополнительными свойствами: категория, метка и ценность
sdk.trackEvent(event: "something_happened", category: "important", label: "banner_click", value: 42)

// Событие с произвольными переменными
sdk.trackEvent(event: "something_happened", category: "important", label: "user_event", value: 5, completion: @escaping (Result<Void, SDKError>) -> Void) {
  sessionQueue.addOperation {
    let path = "push/custom"
    var params: [String: Any] = [
      "selected_plan": "pro",
      "plan_price": 50000,
      "accepted_offer": true
    ]
}
```


```kotlin [Kotlin]
// Простейший трекинг события без дополнительных свойств
sdk.trackEventManager.customTrack(YOUR_EVENT_NAME)

// Событие с дополнительными свойствами: категория, метка и ценность
sdk.trackEventManager.customTrack(
  event = YOUR_EVENT_NAME,
  category = YOUR_EVENT_CATEGORY,
  label = YOUR_EVENT_LABEL,
  value = YOUR_EVENT_VALUE
)

```


```java [Java (deprecated)]
// Простейший трекинг события без дополнительных свойств
REES46.track("my_event");

// Событие с дополнительными свойствами: категория, метка и ценность
REES46.track("my_event", "event category", "event label", 100);

```


```javascript [ReactNative]
// Простейший трекинг события без дополнительных свойств
sdk.trackEvent('my_event');

// Событие с дополнительными свойствами: категория, метка и ценность
sdk.trackEvent('my_event', {
  category: "event category",
  label: "event label",
  value: 100
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
    "message": "Identifier is not valid"
  }
}
```