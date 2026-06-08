# Список товаров, не отображаемых на витрине

Если у товара нет хотя бы одного из обязательных свойств, товар не появляется в результатах поиска, рекомендациях и рассылках. Список таких свойств:

- цена;
- категория;
- название;
- ссылка.

Метод возвращает список таких товаров.

```
GET https://api.rees46.ru/products/not_widgetable
```

## Параметры

| Параметр    | Тип     | Обязателен? | Описание                       |
|-------------|---------|-------------|--------------------------------|
| shop_id     | String  | Да          | API-ключ                       |
| shop_secret | String  | Да          | Секретный API-ключ             |

## Запрос

Пример запроса:

```shell [S2S]
curl https://api.rees46.ru/products/not_widgetable?shop_id=...&shop_secret=...
```

## Ответ

Пример ответа сервера:

```json
{
  "status": "success",
  "data": {
    "total": 1,
    "items": [
      {
        "uniqid": "sku-33",
        "price": null,
        "name": "Товар",
        "url": "https://rees46.ru/product/sku-33",
        "image_url": null,
        "image_downloading_error": "File not found"
      }
    ]
  }
}
```


Расшифровка свойств ответа:

| Свойство                             | Тип     | Описание                                             |
|--------------------------------------|---------|------------------------------------------------------|
| status                               | String  | Текстовый статус результата обработки запроса        |
| data                                 | Object  | Объект с ответом                                     |
| data.total                           | Integer | Количество товаров                                   |
| data.items[]                         | Array   | Список товаров                                       |
| data.items[].uniqid                  | String  | Идентификатор (артикул) товара                       |
| data.items[].price                   | Integer | Цена товара                                          |
| data.items[].name                    | String  | Название товара                                      |
| data.items[].url                     | String  | Ссылка на товар                                      |
| data.items[].image_url               | String  | Ссылка на фото товара                                |
| data.items[].image_downloading_error | String  | Сообщение об ошибке при скачивании фотографии товара |


В случае ошибки ответ будет в формате:

```json 
{
  "status": "error",
  "payload": {
    "message": "Shop not found"
  }
}
```