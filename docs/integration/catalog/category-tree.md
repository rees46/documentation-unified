# Дерево категорий

Метод возвращает дерево категорий каталога на указанную глубину.

Метод кеширует данные на 60 секунд по следующим параметрам:

- shop_id;
- shop_secret;
- depth;
- exclude;
- locations;
- only_discount.


```
GET https://api.rees46.ru/products/categories
```

## Параметры

| Параметр      | Тип     | Обязателен? | Описание                                                                                                                                                                  |
|---------------|---------|-------------|---------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| shop_id       | String  | Да          | API-ключ                                                                                                                                                                  |
| shop_secret   | String  | Да          | Секретный API-ключ                                                                                                                                                        |
| depth         | Integer | Нет         | Глубина, на которую рекурсиво выбираются подкатегории. Если не указано, то по умолчанию `10`. Если `0`, то выбираются только корневые директории                          |
| exclude       | String  | Нет         | Список идентификаторов категорий через запятую, которые нужно исключить из выборки                                                                                        |
| only_discount | Boolean | Нет         | Флаг, чтобы выводить только категории, в которых есть товары со скидкой. Товары со скидкой: это товары, у которых есть поле `oldprice` и его значение больше, чем `price` |
| locations     | String  | Нет         | Список кодов локаций через запятую. Если задано, то выбираются только те категории, в которых есть товары в указанных локациях                                            |


## Запрос

Пример запроса:

```shell [S2S]
curl https://api.rees46.ru/products/categories?shop_id=...&shop_secret=...&depth=3
```

## Ответ

Пример ответа сервера:

```json
[
  {
    "id": 19,
    "external_id": "482",
    "name": "Jewelry",
    "url": "https://demo.site.com/categories/jewelry",
    "parent_id": null,
    "parent_external_id": null,
    "children":  [
      {
        "id": 31,
        "external_id": "483",
        "name": "Rings",
        "url": "https://demo.site.com/categories/rings",
        "parent_id": 19,
        "parent_external_id": "482",
        "children": []
      }
    ]
  },
  {
    "id": 4,
    "external_id": "479",
    "name": "Baby & Kids",
    "url": "https://demo.site.com/categories/baby",
    "parent_id": null,
    "parent_external_id": null,
    "children": [
      {
        "id": 9,
        "external_id": "480",
        "name": "Clothing Sets",
        "url": "https://demo.site.com/categories/baby-kids-clothing-sets",
        "parent_id": 4,
        "parent_external_id": "479",
        "children": []
      }
    ]
  }
]
```


Расшифровка свойств ответа:

| Свойство           | Тип     | Описание                                        |
|--------------------|---------|-------------------------------------------------|
| id                 | Integer | Внутренний идентификатор категории в CDP        |
| external_id        | String  | Внешний идентификатор категории                 |
| name               | String  | Название категории                              |
| url                | String  | Ссылка на страницу категории                    |
| parent_id          | Integer | Внутренний идентификатор родительской категории |
| parent_external_id | String  | Внешний идентификатор родительской категории    |
| children           | Array   | Массив подкатегорий в том же формате            |


В случае ошибки ответ будет в формате:

```json 
{
  "status": "error",
  "payload": {
    "message": "Shop not found"
  }
}
```