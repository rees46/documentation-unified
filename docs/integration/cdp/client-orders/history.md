# Список заказов клиента

Метод возвращает список заказов клиента с даты, переданной в запросе.

```
GET https://api.rees46.ru/orders/by_user
```

## Параметры

| Параметр     | Тип     | Обязателен? | Описание                                       |
|--------------|---------|-------------|------------------------------------------------|
| shop_id      | String  | Да          | API-ключ                                       |
| shop_secret  | String  | Да          | Секретный API-ключ                             |
| did*         | String  | Да          | [Идентификатор устройства](../entities/did.md) |
| sid          | String  | Нет         | [Сессия устройства](../entities/sid.md)        |
| email*       | String  | Да          | Email клиента                                  |
| phone*       | String  | Да          | Номер телефона клиента                         |
| loyalty_id*  | String  | Да          | Идентификатор внешней программы лояльности     |
| external_id* | String  | Да          | Внешний идентификатор клиента                  |
| telegram_id* | String  | Да          | Telegram ID клиента                            |
| date_from    | String  | Нет         | Дата начала периода в формате `YYYY-MM-DD`     |

:::warning Обязательные свойства
Параметры, отмеченные [*] - обязателен хотя бы один из них.
:::

## Запрос

Пример запроса:

```shell
curl https://api.rees46.ru/orders/by_user?shop_id=...&shop_secret=...&did=...&email=...
```

## Ответ

Пример ответа сервера:

```json
{
  "status": "success",
  "data": {
    "orders": [
      {
        "_id": "...",
        "id": "...",
        "date": "...",
        "value": "...",
        "cash_value": "...",
        "bonuses_value": "...",
        "delivery_value": "...",
        "location_id": "...",
        "promocode": "...",
        "offline": "...",
        "delivery_date": "...",
        "internal_status": "...",
        "stream": "...",
        "channel": "...",
        "tax_free": "...",
        "delivery_type": "...",
        "delivery_address": "...",
        "order_status": "...",
        "payment_type": "...",
        "bank_issuer": "...",
        "bank_pos_processor": "...",
        "bank_loyalty_program": "...",
        "bank_total_installment": "...",
        "payment_card_provider": "...",
        "gift_package": "...",
        "payment_structure": "...",
        "value_raw": "...",
        "custom_properties": {
          "prop_1": "...",
          "prop_2": "..."
        },
        "items": [
          {
            "amount": "...",
            "price": "...",
            "status": "...",
            "original_price": "...",
            "discount_product": "...",
            "discount_coupon": "...",
            "discount_bonuses": "...",
            "delivery_company": "...",
            "barcode": "...",
            "line_id": "...",
            "cancel_reason": "...",
            "item": {
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
              "category_ids": [
                "1",
                "3"
              ],
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
                "120": "...",
                "140": "...",
                "160": "...",
                "180": "...",
                "200": "...",
                "220": "...",
                "310": "...",
                "520": "..."
              }
            }
          }
        ],
        "history": [
          {
            "status": "...",
            "common_value": "...",
            "cash_value": "...",
            "bonuses_value": "...",
            "delivery_value": "...",
            "discount_value": "...",
            "date": "..."
          }
        ]
      }
    ]
  }
}
```

Расшифровка свойств ответа:

| Свойство                                                 | Тип     | Описание                                                                           |
|----------------------------------------------------------|---------|------------------------------------------------------------------------------------|
| status                                                   | String  | Статус выполнения запроса                                                          |
| data                                                     | Object  | Объект ответа                                                                      |
| data.orders[]                                            | Array   | Список объектов заказов                                                            |
| data.orders[]._id                                        | String  | Внутренний ID заказа из CDP                                                        |
| data.orders[].id                                         | String  | Внешний ID заказа                                                                  |
| data.orders[].date                                       | String  | Дата и время заказа                                                                |
| data.orders[].value                                      | Float   | Сумма заказа                                                                       |
| data.orders[].cash_value                                 | Float   | Сумма заказа, оплаченная наличными                                                 |
| data.orders[].bonuses_value                              | Float   | Сумма заказа, оплаченная бонусами                                                  |
| data.orders[].delivery_value                             | Float   | Стоимость доставки                                                                 |
| data.orders[].location_id                                | String  | Код локации                                                                        |
| data.orders[].promocode                                  | String  | Промокод                                                                           |
| data.orders[].offline                                    | Boolean | Флаг, что заказ из оффлайн                                                         |
| data.orders[].delivery_date                              | String  | Дата доставки                                                                      |
| data.orders[].internal_status                            | String  | Внутренний статус заказа                                                           |
| data.orders[].stream                                     | String  | Стрим                                                                              |
| data.orders[].channel                                    | String  | Канал получения заказа                                                             |
| data.orders[].tax_free                                   | Boolean | Флаг "TAX free"                                                                    |
| data.orders[].delivery_type                              | String  | Способ доставки                                                                    |
| data.orders[].delivery_address                           | String  | Адрес доставки                                                                     |
| data.orders[].order_status                               | String  | Статус заказа                                                                      |
| data.orders[].payment_type                               | String  | Способ оплаты                                                                      |
| data.orders[].bank_issuer                                | String  | Банк, выпустивший банковскую карту                                                 |
| data.orders[].bank_pos_processor                         | String  | Эквайринг                                                                          |
| data.orders[].bank_loyalty_program                       | String  | Банковская программа лояльности                                                    |
| data.orders[].bank_total_installment                     | Integer | Полная стоимость с учетом рассрочки и процентов                                    |
| data.orders[].payment_card_provider                      | String  | Кто выпустил карту                                                                 |
| data.orders[].gift_package                               | Boolean | Подарочная упаковка                                                                |
| data.orders[].payment_structure                          | Object  | Структура платежа                                                                  |
| data.orders[].value_raw                                  | Object  | Структура платежа без обработки                                                    |
| data.orders[].custom_properties                          | Object  | Объект с кастомными свойствами заказа                                              |
| data.orders[].custom_properties.propname                 | String  | Значение кастомного свойства. Вместо `propname` будет код свойства из настроек CDP |
| data.orders[].items[]                                    | Array   | Список товаров из заказа                                                           |
| data.orders[].items[].amount                             | String  | Количество единиц товара                                                           |
| data.orders[].items[].price                              | String  | Цена покупки                                                                       |
| data.orders[].items[].status                             | String  | Статус товара в заказе                                                             |
| data.orders[].items[].original_price                     | String  | Исходная цена                                                                      |
| data.orders[].items[].discount_product                   | String  | Скидка на товар по акции                                                           |
| data.orders[].items[].discount_coupon                    | String  | Скидка по купону                                                                   |
| data.orders[].items[].discount_bonuses                   | String  | Скидка бонусами                                                                    |
| data.orders[].items[].delivery_company                   | String  | Компания-доставщик                                                                 |
| data.orders[].items[].barcode                            | String  | Штрих-код                                                                          |
| data.orders[].items[].line_id                            | String  | Номер товара в корзине                                                             |
| data.orders[].items[].cancel_reason                      | String  | Причина отмены товара в заказе                                                     |
| data.orders[].items[].item                               | Object  | Объект товара                                                                      |
| data.orders[].items[].item.name                          | String  | Название товара                                                                    |
| data.orders[].items[].item.url                           | String  | Ссылка на товар                                                                    |
| data.orders[].items[].item.url_handle                    | String  | Ссылка на товар без домена. Например: `/products/5575`                             |
| data.orders[].items[].item.deeplink_android              | String  | Диплинк на товар для Android                                                       |
| data.orders[].items[].item.deeplink_ios                  | String  | Диплинк на товар для iOS                                                           |
| data.orders[].items[].item.barcode                       | String  | Штрих-код товара                                                                   |
| data.orders[].items[].item.vendor_code                   | String  | Vendor code из YML-файла                                                           |
| data.orders[].items[].item.brand                         | String  | Бренд товара                                                                       |
| data.orders[].items[].item.model                         | String  | Модель товара                                                                      |
| data.orders[].items[].item.sales_rate                    | Integer | Sales rate товара                                                                  |
| data.orders[].items[].item.relative_sales_rate           | Integer | Относительный sales rate товара                                                    |
| data.orders[].items[].item.picture                       | String  | Ссылка на фотографию товара                                                        |
| data.orders[].items[].item.image_url                     | String  | Ссылка на фотографию товара                                                        |
| data.orders[].items[].item.image_url_handle              | String  | Ссылка на фотографию товара без домена                                             |
| data.orders[].items[].item.image_url_resized             | Object  | Объект ссылок на отресайзенную фотографию товара                                   |
| data.orders[].items[].item.image_url_resized['120']      | String  | Ссылка на фотографию размером 120x120                                              |
| data.orders[].items[].item.image_url_resized['140']      | String  | Ссылка на фотографию размером 140x140                                              |
| data.orders[].items[].item.image_url_resized['160']      | String  | Ссылка на фотографию размером 160x160                                              |
| data.orders[].items[].item.image_url_resized['180']      | String  | Ссылка на фотографию размером 180x180                                              |
| data.orders[].items[].item.image_url_resized['200']      | String  | Ссылка на фотографию размером 200x200                                              |
| data.orders[].items[].item.image_url_resized['220']      | String  | Ссылка на фотографию размером 220x220                                              |
| data.orders[].items[].item.image_url_resized['310']      | String  | Ссылка на фотографию размером 310x310                                              |
| data.orders[].items[].item.image_url_resized['520']      | String  | Ссылка на фотографию размером 520x520                                              |
| data.orders[].items[].item.image_url_resized['original'] | String  | Ссылка на оригинал фотографии                                                      |
| data.orders[].items[].item.category_ids[]                | Array   | Массив идентификаторов категорий товара                                            |
| data.orders[].items[].item.categories[]                  | Array   | Массив с детальной информацией о категориях товара                                 |
| data.orders[].items[].item.categories[].id               | String  | Идентификатор категории                                                            |
| data.orders[].items[].item.categories[].url              | String  | Ссылка на страницу категории                                                       |
| data.orders[].items[].item.categories[].name             | String  | Название категории                                                                 |
| data.orders[].items[].item.categories[].level            | String  | Уровень вложенности категории от корня дерева                                      |
| data.orders[].items[].item.categories[].name_with_parent | String  | Название категории с названием родительской категории                              |
| data.orders[].items[].item.categories[].url_handle       | String  | Ссылка на страницу категории без домена. Например: `/categories/smartphones`       |
| data.orders[].items[].item.discount                      | Integer | Размер скидки в процентах                                                          |
| data.orders[].items[].item.discount_formatted            | String  | Размер скидки со знаком %                                                          |
| data.orders[].items[].item.price_formatted               | String  | Отформатированная цена без копеек с символом валюты                                |
| data.orders[].items[].item.price_full_formatted          | String  | Отформатированная цена с копейками и символом валюты                               |
| data.orders[].items[].item.price                         | Integer | Цена без копеек                                                                    |
| data.orders[].items[].item.price_full                    | Float   | Цена с копейками                                                                   |
| data.orders[].items[].item.oldprice_formatted            | String  | Отформатированная старая цена (до скидки) без копеек с символом валюты             |
| data.orders[].items[].item.oldprice_full_formatted       | String  | Отформатированная старая цена (до скидки) с копейками и символом валюты            |
| data.orders[].items[].item.oldprice                      | Integer | Старая цена (до скидки) без копеек                                                 |
| data.orders[].items[].item.oldprice_full                 | Float   | Старая цена (до скидки) с копейками                                                |
| data.orders[].items[].item.currency                      | String  | Символ валюты                                                                      |
| data.orders[].items[].item.id                            | String  | Внешний идентификатор (артикул) товара из вашей БД                                 |
| data.orders[].items[].item.group_id                      | String  | Идентификатор группы товаров, если это один из вариантов товара                    |
| data.orders[].items[].item.is_new                        | Boolean | Флаг, что товар является новинкой                                                  | 
| data.orders[].items[].item.leftovers                     | String  | Остаток товара на складе в виде слова: `lots`, `few`, `one`                        | 
| data.orders[].items[].item.stock_quantity                | Integer | Остаток товара на складе в виде числа                                              | 
| data.orders[].items[].item.rating                        | Integer | Рейтинг товара                                                                     | 
| data.orders[].items[].item.fashion_sizes                 | Array   | Массив сконвертированных размеров одежды                                           | 
| data.orders[].items[].item.fashion_original_sizes        | Array   | Массив исходных размеров одежды                                                    | 
| data.orders[].items[].item.fashion_colors                | Array   | Массив цветов одежды                                                               | 
| data.orders[].items[].item.widgetable                    | Boolean | Флаг, что у товара заполнены все обязательные свойства                             |
| data.orders[].items[].item.ignored                       | Boolean | Флаг, что товар игнорируется в рекомендациях и поиске                              |
| data.orders[].items[].item.params[]                      | Array   | Массив параметров товара из товарного фида                                         |
| data.orders[].items[].item.params[].key                  | String  | Ключ параметра товара                                                              |
| data.orders[].items[].item.params[].values[]             | Array   | Массив строковых и числовых значений параметра товара                              |
| data.orders[].history[].status                           | String  | История изменения заказа                                                           |
| data.orders[].history[].common_value                     | Float   | Общая стоимость заказа                                                             |
| data.orders[].history[].cash_value                       | Float   | Оплачено деньгами                                                                  |
| data.orders[].history[].bonuses_value                    | Float   | Оплачено бонусами                                                                  |
| data.orders[].history[].delivery_value                   | Float   | Стоимость доставки                                                                 |
| data.orders[].history[].discount_value                   | Float   | Сумма скидки                                                                       |
| data.orders[].history[].date                             | String  | Дата изменения заказа                                                              |

:::warning Внимание
В будущем ключ `data` будет изменен на `payload`. Рекомендуем добавить проверку на наличие ключа `payload` и в случае его присутствия отдавать приоритет этому ключу.
:::

В случае ошибки ответ будет в формате:

```json 
{
  "status": "error",
  "payload": {
    "message": "Shop not found"
  }
}
```

