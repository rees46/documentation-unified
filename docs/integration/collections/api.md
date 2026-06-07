# Запрос товарных коллекций с помощью SDK и REST API

Если вас не устраивает автоматическая отрисовка коллекций на сайте и вы хотите иметь больше контроля, вы можете использовать API и SDK.

```
GET https://api.rees46.ru/collection/:id
```

## Параметры

| Параметр    | Тип      | Обязателен? | Описание                                                                                                     |
|-------------|----------|-------------|--------------------------------------------------------------------------------------------------------------|
| shop_id     | String   | Да          | API-ключ                                                                                                     |
| id          | Integer  | Да          | Идентификатор товарной коллекции, подставляется прямо в endpoint вместо `:id`                                |
| did         | String   | Нет         | [Идентификатор устройства](../cdp/entities/did.md)                                                           |
| email       | String   | Нет         | Email клиента                                                                                                |
| phone       | String   | Нет         | Телефон клиента                                                                                              |
| external_id | String   | Нет         | Внешний идентификатор клиента                                                                                |
| loyalty_id  | String   | Нет         | Идентификатор внешней программы лояльности клиента                                                           |
| telegram_id | String   | Нет         | Telegram ID клиента                                                                                          |
| location    | String   | Нет         | Код текущей локации клиента (выбранный город). Если у вас на сайте есть локации, то этот параметр обязателен |


## Запрос

Пример запроса:

::: code-group

```shell [S2S]
curl https://api.rees46.ru/collection/:id?shop_id=...&location=...&email=...
```

```javascript [JS SDK]
r46("collection", "COLLECTION_ID", {
  location: "LOCATION",
  email: "EMAIL",
  phone: "PHONE",
  external_id: "EXTERNAL_ID",
  loyalty_id: "LOYALTY_ID"
}, function(response) {
  // Коллбэк на успешный ответ API
}, function(error) {
  // Коллбэк на ошибку запроса к API
});
```

```swift [iOS] 
// Пока не реализовано
```


```kotlin [Kotlin]
// Пока не реализовано
```

```javascript [ReactNative]
// Пока не реализовано
```
:::



## Ответ

Пример ответа сервера:

```json
{
  "products": [
    {
      "name": "PRODUCT_NAME",
      "url": "PRODUCT_URL",
      "description": "PRODUCT_DESCRIPTION",
      "category_ids": "CATEGORY_IDS",
      "brand": "PRODUCT_BRAND",
      "sales_rate": "SALES_RATE",
      "relative_sales_rate": "RELATIVE_SALES_RATE",
      "picture": "PRODUCT_PICTURE_URL",
      "categories": "CATEGORIES",
      "price_formatted": "FORMATTED_PRICE",
      "price_full_formatted": "FORMATTED_FULL_PRICE",
      "price": "PRICE",
      "price_full": "FULL_PRICE",
      "image_url": "IMAGE_URL",
      "image_url_handle": "IMAGE_URL_HANDLE",
      "image_url_resized": "RESIZED_IMAGE_URL",
      "url_handle": "PRODUCT_URL_HANDLE",
      "currency": "CURRENCY",
      "_id": "PRODUCT_ID",
      "id": "NUMERIC_PRODUCT_ID",
      "group_id": "GROUP_ID"
    },
    {
      "name": "PRODUCT_NAME",
      "url": "PRODUCT_URL",
      "description": "PRODUCT_DESCRIPTION",
      "category_ids": "CATEGORY_IDS",
      "brand": "PRODUCT_BRAND",
      "sales_rate": "SALES_RATE",
      "relative_sales_rate": "RELATIVE_SALES_RATE",
      "picture": "PRODUCT_PICTURE_URL",
      "categories": "CATEGORIES",
      "price_formatted": "FORMATTED_PRICE",
      "price_full_formatted": "FORMATTED_FULL_PRICE",
      "price": "PRICE",
      "price_full": "FULL_PRICE",
      "image_url": "IMAGE_URL",
      "image_url_handle": "IMAGE_URL_HANDLE",
      "image_url_resized": "RESIZED_IMAGE_URL",
      "url_handle": "PRODUCT_URL_HANDLE",
      "currency": "CURRENCY",
      "_id": "PRODUCT_ID",
      "id": "NUMERIC_PRODUCT_ID",
      "group_id": "GROUP_ID"
    }
  ]
}
```

:::warning Внимание

В будущем структура будет приведена к стандарту ответа:

```json
{
  "status": "success",
  "payload": {
    "product_collection": {
      "id": 6,
      "name": "...",
      "html": "...",
      "products": []
    },
  }
}
```

Рекомендуем подготовить обработчик ответа под новую структуру, чтобы ваша интеграция не сломалась.

:::


Расшифровка свойств ответа:

| Свойство             | Тип     | Описание                                                                                      |
|----------------------|---------|-----------------------------------------------------------------------------------------------|
| name                 | String  | Название товара                                                                               |
| url                  | String  | Ссылка на товар                                                                               |
| description          | String  | Описание товара                                                                               |
| category_ids         | String  | Список идентификаторов категорий товароа                                                      |
| brand                | String  | Бренд                                                                                         |
| sales_rate           | String  | Sales rate товара                                                                             |
| relative_sales_rate  | String  | Относительный sales rate товара                                                               |
| picture              | String  | Ссылка на фото товара                                                                         |
| categories           | String  | Список идентификаторов категорий товароа (для обратной совместимости идентичен `category_ids` |
| price_formatted      | String  | Отформатированная цена с валютой, округленная до целого числа                                 |
| price_full_formatted | String  | Отформатированная цена с валютой и копейками                                                  |
| price                | Integer | Цена, округленная до целого числа                                                             |
| price_full           | Float   | Цена с копейками                                                                              |
| image_url            | String  | Ссылка на оригинал фото товара                                                                |
| image_url_handle     | String  | Ссылка на оригинал фото товара без домена (от корня сайта `/...`)                             |
| image_url_resized    | String  | Ссылка на ресайз картинки                                                                     |
| url_handle           | String  | Ссылка на товар без домена (от корня сайта `/...`)                                            |
| currency             | String  | Символ валюты                                                                                 |
| _id                  | String  | Внутренний идентификатор товара из платформы                                                  |
| id                   | String  | Внешний идентификатор (артикул) товара из вашей БД                                            |
| group_id             | String  | Внутренний идентификатор группы правил товарной коллекции (для отладки)                       |

В случае ошибки ответ будет в формате:

```json 
{
  "status": "error",
  "payload": {
    "message": "Shop not found"
  }
}
```