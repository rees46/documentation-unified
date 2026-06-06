# Сохранение отзыва NPS

Концептуально, оценка NPS представляет собой шкалу от 0 до 10, где 0 означает, что клиент не готов рекомендовать продукт или услугу, а 10 — полное доверие и готовность рекомендовать.

При сохранении отзыва указывается канал `channel`, из которого получена оценка, и категория `category`, к которой относится отзыв. Категория, это и есть то, что оценивается. Например, процесс оформления заказа (`checkout`) или доставка заказа (`delivery`). 

И категории и каналы создаются в личном кабинете в разделе настроек NPS.

Технически процесс оценки следующий:

1. Запрашиваете информацию о категории с помощью метода [nps/categories](./categories.md). Оттуда вас интересуют дополнительные вопросы к клиенту в зависимости от его оценки.
2. Опционально запрашиваете каналы с помощью метода [nps/channels](./channels.md). Но, скорее всего, это не потребуется, т.к. код канала вы знаете заранее и должны "зашить" в саму форму на сайте или в мобильном приложении.
3. Предлагаете клиенту выбрать оценку от 0 до 10. Визуал может быть либо в виде 10 звездочек либо числовой шкалой. 
4. После выбора оценки проверяете, какой вопрос нужно задать по этой категории. Вопросы вы получили в [nps/categories](./categories.md). Вопрос выбирается так: 
   - если оценка от 0 до 6, то вопрос из поля `detractor_question`;
   - если оценка от 7 до 8, то вопрос из поля `passive_question`;
   - если оценка от 9 до 10, то вопрос из поля `promoter_question`.
5. Под вопросом выводите поле ввода комментария.
6. Предлагаете клиенту либо оставить комментарий либо нажать кнопку "Пропустить".
7. В конце, отправляете собранные данные на текущий метод API и отображаете клиенту финальное сообщение из [nps/categories](./categories.md):
   - если оценка от 0 до 6, то сообщение из поля `detractor_success`;
   - если оценка от 7 до 8, то сообщение из поля `passive_success`;
   - если оценка от 9 до 10, то сообщение из поля `promoter_success`.

```
POST https://api.rees46.ru/nps/create
```

## Параметры

| Параметр     | Тип     | Обязателен? | Описание                                                                              |
|--------------|---------|-------------|---------------------------------------------------------------------------------------|
| shop_id      | String  | Да          | API-ключ                                                                              |
| shop_secret  | String  | Нет         | Секретный API-ключ. Обязателен, если в запросе отсутствует `did`                      |
| did*         | String  | Нет         | [Идентификатор устройства](../../cdp/entities/did.md). SDK передает его автоматически |
| sid*         | String  | Нет         | Идентификатор сессии                                                                  | 
| phone*       | String  | Да          | Телефон клиента                                                                       |
| email*       | String  | Да          | Email клиента                                                                         |
| loyalty_id*  | String  | Да          | Идентификатор участника программы лояльности                                          |
| external_id* | String  | Да          | Внешний идентификатор клиента                                                         |
| order_id     | String  | Нет         | Идентификатор заказа, если оценивается заказ                                          |
| channel      | String  | Да          | Код канала                                                                            |
| category     | String  | Да          | Код категории                                                                         |
| rate         | Integer | Да          | Оценка: 0..10                                                                         |
| comment      | String  | Нет         | Опциональный комментарий к оценке                                                     |

:::info Идентификаторы
Параметры, отмеченные [*] - обязателен хотя бы один из них. На стороне сайта или мобильных приложений SDK автоматически передает `did`.
:::

## Запрос

Пример запроса:

::: code-group

```shell [S2S]
curl 'https://api.rees46.ru/nps/create' \
    -X 'POST' \
    -H 'Content-Type: application/json' \
    --data-raw '{"shop_id":"SHOP_ID", "shop_secret":"SHOP_SECRET", "email":"EMAIL", "channel": "email", "category": "delivery", "rate": 7, "comment": "..."}'
```

```javascript [JS SDK]
// Полная структура
r46("nps", "review", {
   channel: "channel_code",
   category: "category_code",
   rate: 7,
   comment: "Some comment"
}, success, failure);

// Без комментария
r46("nps", "review", {
   channel: "channel_code",
   category: "category_code",
   rate: 10
}, success, failure);
```

```swift [iOS] 
// Простая оценка без комментария
sdk.review(rate: 3, channel: "ios_app", category: "checkout") { _ in
  print("Review is posted")
}

// Оценка заказа
sdk.review(rate: 6, channel: "ios_app", category: "checkout", order_id: "ORDER-3341") { _ in
  print("Review is posted")
}

// С комментарием
sdk.review(rate: 9, channel: "ios_app", category: "checkout", comment: "Nice application, thank you!") { _ in
  print("Review is posted")
}

// С комментарием и заказом
sdk.review(rate: 10, channel: "ios_app", category: "checkout", order_id: "ORDER-3341", comment: "Nice application, thank you!") { _ in
  print("Review is posted")
}
```


```kotlin [Kotlin]
// TODO описать
```


```java [Java (deprecated)]
// TODO описать
```


```javascript [ReactNative]
// TODO описать
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