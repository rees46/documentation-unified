# Последняя покупка клиента

Метод возвращает список купленных товаров в последнем заказе клиента.

```
GET https://api.rees46.ru/orders/last_for_user
```

## Параметры

| Параметр     | Тип     | Обязателен? | Описание                                       |
|--------------|---------|-------------|------------------------------------------------|
| shop_id      | String  | Да          | API-ключ                                       |
| did*         | String  | Да          | [Идентификатор устройства](../entities/did.md) |
| sid          | String  | Нет         | [Сессия устройства](../entities/sid.md)        |
| external_id* | String  | Да          | Внешний идентификатор клиента                  |
| telegram_id* | String  | Да          | Telegram ID клиента                            |

:::warning Обязательные свойства
Параметры, отмеченные [*] - обязателен хотя бы один из них.
:::

## Запрос

Пример запроса:

```shell
curl https://api.rees46.ru/orders/last_for_user?shop_id=...&did=...
```

## Ответ

Пример ответа сервера:

```json
[
  {
    "name": "...",
    "description": "...",
    "price_formatted": "1000 ₽",
    "price": 1000,
    "price_full": 1000.0,
    "price_full_formatted": "1000.00 ₽",
    "oldprice": 1200,
    "oldprice_full": 1200.0,
    "oldprice_formatted": "1200 ₽",
    "oldprice_full_formatted": "1200.00 ₽",
    "url": "https://.../product/123",
    "url_handle": "/product/123",
    "discount": 20,
    "discount_formatted": "20%",
    "category_ids": ["1", "3"],
    "categories": [
      {
        "id": "1", 
        "parent": null, 
        "name": "...", 
        "url": "..."
      },
      {
        "id": "3",
        "parent": "1",
        "name": "...",
        "url": "..."
      }
    ],
    "image_url": "https://.../pictures/123.png",
    "image_url_handle": "/pictures/123.png",
    "is_new": true,
    "currency": "₽",
    "id": "...",
    "barcode": "...",
    "brand": "...",
    "leftovers": "lots",
    "stock_quantity": 1000,
    "rating": 4,
    "fashion_sizes": [],
    "fashion_original_sizes": [],
    "fashion_colors": [],
    "model": "...",
    "params": [],
    "image_url_resized": {
      "120":  "...",
      "140": "...",
      "160":  "...",
      "180": "...",
      "200":  "...",
      "220": "...",
      "310":  "...",
      "520": "..."
    }
  }
]
```

Расшифровка свойств ответа:

| Свойство                      | Тип      | Описание                                                                     |
|-------------------------------|----------|------------------------------------------------------------------------------|
| name                          | String   | Название товара                                                              |
| url                           | String   | Ссылка на товар                                                              |
| url_handle                    | String   | Ссылка на товар без домена. Например: `/products/5575`                       |
| deeplink_android              | String   | Диплинк на товар для Android                                                 |
| deeplink_ios                  | String   | Диплинк на товар для iOS                                                     |
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
| category_ids[]                | Array    | Массив идентификаторов категорий товара                                      |
| categories[]                  | Array    | Массив с детальной информацией о категориях товара                           |
| categories[].id               | String   | Идентификатор категории                                                      |
| categories[].url              | String   | Ссылка на страницу категории                                                 |
| categories[].name             | String   | Название категории                                                           |
| categories[].level            | String   | Уровень вложенности категории от корня дерева                                |
| categories[].name_with_parent | String   | Название категории с названием родительской категории                        |
| categories[].url_handle       | String   | Ссылка на страницу категории без домена. Например: `/categories/smartphones` |
| discount                      | Integer  | Размер скидки в процентах                                                    |
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
| id                            | String   | Внешний идентификатор (артикул) товара из вашей БД                           |
| is_new                        | Boolean  | Флаг, что товар является новинкой                                            | 
| leftovers                     | String   | Остаток товара на складе в виде слова: `lots`, `few`, `one`                  | 
| stock_quantity                | Integer  | Остаток товара на складе в виде числа                                        | 
| rating                        | Integer  | Рейтинг товара                                                               | 
| fashion_sizes                 | Array    | Массив сконвертированных размеров одежды                                     | 
| fashion_original_sizes        | Array    | Массив исходных размеров одежды                                              | 
| fashion_colors                | Array    | Массив цветов одежды                                                         | 
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

