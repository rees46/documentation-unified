# Получение информации о товаре

Метод возвращает информацию о товаре из БД платформы.

```
GET https://api.rees46.ru/products/get
```

## Параметры

| Параметр     | Тип     | Обязателен? | Описание                                                                  |
|--------------|---------|-------------|---------------------------------------------------------------------------|
| shop_id      | String  | Да          | API-ключ                                                                  |
| item_id      | String  | Да          | Артикул (идентификатор) товара                                            |

## Запрос

Пример запроса:

::: code-group

```shell [S2S]
curl https://api.rees46.ru/products/get?shop_id=...&item_id=...
```

```javascript [JS SDK]
// TODO Сделать
```

```swift [iOS] 
// TODO Сделать
```


```kotlin [Kotlin]
sdk.productsManager.getProductInfo(
  itemId = YOUR_ITEM_ID,
  listener = object : OnApiCallbackListener() {
    override fun onSuccess(response: JSONObject?) {
      super.onSuccess(response)
      // Обработка единичного объекта
    }

    override fun onError(code: Int, msg: String?) {
      super.onError(code, msg)
      // Обработка ошибки
    }
  }
)
```

```java [Java (deprecated)] 
// Не планируется
```

```javascript [ReactNative]
// TODO Сделать
```
:::

## Ответ

Пример ответа сервера:

```json
{
  "name": "Скамья Жасмин графит/дуб артизан LAK",
  "is_available": true,
  "description": "",
  "price": 10760.0,
  "price_full": 10760,
  "price_formatted": "10 760 ₽",
  "price_full_formatted": "10 760.00 ₽",
  "currency": "₽",
  "url": "https://rees46.ru/catalog/skamya_jasmin_grafit_dub_artizan_lak/",
  "url_handle": "/catalog/skamya_jasmin_grafit_dub_artizan_lak/",
  "picture": "https://rees46.ru/upload/iblock/338/ypsil10hldspxuvz3hr0l9i8lwz67ovq.webp",
  "image_url": "https://rees46.ru/upload/iblock/338/ypsil10hldspxuvz3hr0l9i8lwz67ovq.webp",
  "image_url_handle": "/upload/iblock/338/ypsil10hldspxuvz3hr0l9i8lwz67ovq.webp",
  "image_url_resized": {},
  "category_ids": [],
  "brand": "БРВ Мебель",
  "sales_rate": null,
  "relative_sales_rate": null,
  "categories": [
    {
      "id": "23",
      "name": "Прихожие",
      "url": "https://rees46.ru/catalog/prikhozhie/",
      "branch": 1,
      "level": 1,
      "name_with_parent": "Прихожие",
      "url_handle": "/catalog/prikhozhie/"
    },
    {
      "parent_id": "23",
      "id": "12023",
      "name": "Скамьи и сундуки в прихожую",
      "url": "https://rees46.ru/catalog/prikhozhie/skami_i_sunduki/",
      "branch": 1,
      "level": 2,
      "name_with_parent": "Прихожие - Скамьи и сундуки в прихожую",
      "url_handle": "/catalog/prikhozhie/skami_i_sunduki/"
    }
  ],
  "params": [],
  "group_id": "9921",
  "id": "9922",
  "uniqid": "9922",
  "widgetable": true,
  "ignored": false,
  "locations": {},
  "model": "LAK",
  "barcode": "УТ-70041501",
  "oldprice": 13450,
  "discount": true,
  "discount_percent": 20
}
```

:::warning Внимание

В будущем структура будет приведена к стандарту ответа:

```json
{
  "status": "success",
  "payload": {
    "product": {}
  }
}
```

Рекомендуем подготовить обработчик ответа под новую структуру, чтобы ваша интеграция не сломалась.

:::


Расшифровка свойств ответа:

| Свойство                      | Тип      | Описание                                                                     |
|-------------------------------|----------|------------------------------------------------------------------------------|
| name                          | String   | Название товара                                                              |
| url                           | String   | Ссылка на товар                                                              |
| url_handle                    | String   | Ссылка на товар без домена. Например: `/products/5575`                       |
| deeplink_android              | String   | Диплинк на товар для Android                                                 |
| deeplink_ios                  | String   | Диплинк на товар для iOS                                                     |
| category_ids                  | String[] | Массив идентификаторов категорий товара                                      |
| barcode                       | String   | Штрих-код товара                                                             |
| vendor_code                   | String   | Vendor code из YML-файла                                                     |
| brand                         | String   | Бренд товара                                                                 |
| model                         | String   | Модель товара                                                                |
| sales_rate                    | Integer  | Sales rate товара                                                            |
| relative_sales_rate           | Integer  | Относительный sales rate товара                                              |
| picture                       | String   | Ссылка на фотографию товара                                                  |
| image_url                     | String   | Ссылка на фотографию товара                                                  |
| image_url_handle              | String   | Ссылка на фотографию товара без домена                                       |
| image_url_resized             | Object   | Объект ссылок на отресайзенную фотографию товара                             |
| image_url_resized['120']      | String   | Ссылка на фотографию размером 120x120                                        |
| image_url_resized['140']      | String   | Ссылка на фотографию размером 140x140                                        |
| image_url_resized['160']      | String   | Ссылка на фотографию размером 160x160                                        |
| image_url_resized['180']      | String   | Ссылка на фотографию размером 180x180                                        |
| image_url_resized['200']      | String   | Ссылка на фотографию размером 200x200                                        |
| image_url_resized['220']      | String   | Ссылка на фотографию размером 220x220                                        |
| image_url_resized['310']      | String   | Ссылка на фотографию размером 310x310                                        |
| image_url_resized['520']      | String   | Ссылка на фотографию размером 520x520                                        |
| image_url_resized['original'] | String   | Ссылка на оригинал фотографии                                                |
| categories[]                  | Array    | Массив с детальной информацией о категориях товара                           |
| categories[].id               | String   | Идентификатор категории                                                      |
| categories[].url              | String   | Ссылка на страницу категории                                                 |
| categories[].name             | String   | Название категории                                                           |
| categories[].level            | String   | Уровень вложенности категории от корня дерева                                |
| categories[].name_with_parent | String   | Название категории с названием родительской категории                        |
| categories[].url_handle       | String   | Ссылка на страницу категории без домена. Например: `/categories/smartphones` |
| discount_percent              | Integer  | Размер скидки                                                                |
| discount                      | Boolean  | Флаг, что товар со скидкой                                                   |
| discount_formatted            | String   | Размер скидки со знаком %                                                    |
| price_formatted               | String   | Отформатированная цена без копеек с символом валюты                          |
| price_full_formatted          | String   | Отформатированная цена с копейками и символом валюты                         |
| price                         | Integer  | Цена без копеек                                                              |
| price_full                    | Float    | Цена с копейками                                                             |
| oldprice_formatted            | String   | Отформатированная старая цена (до скидки) без копеек с символом валюты       |
| oldprice_full_formatted       | String   | Отформатированная старая цена (до скидки) с копейками и символом валюты      |
| oldprice                      | Integer  | Старая цена (до скидки) без копеек                                           |
| oldprice_full                 | Float    | Старая цена (до скидки) с копейками                                          |
| currency                      | String   | Символ валюты                                                                |
| uniqid                        | String   | Внешний идентификатор (артикул) товара из вашей БД                           |
| group_id                      | String   | Идентификатор группы товаров, если это один из вариантов товара              |
| widgetable                    | Boolean  | Флаг, что у товара заполнены все обязательные свойства                       |
| ignored                       | Boolean  | Флаг, что товар игнорируется в рекомендациях и поиске                        |
| params[]                      | Array    | Массив параметров товара из товарного фида                                   |
| params[].key                  | String   | Ключ параметра товара                                                        |
| params[].values[]             | Array    | Массив строковых и числовых значений параметра товара                        |


В случае ошибки ответ будет в формате:

```json 
{
  "status": "error",
  "payload": {
    "message": "Shop not found"
  }
}
```