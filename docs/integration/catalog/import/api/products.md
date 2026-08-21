# Импорт офферов

## Описание метода

``` 
PUT https://api.rees46.ru/import/products  
```

Необходимо указать заголовок:

```
Content-Type: application/json
```

Данные отправляются в виде JSON-строки, которая является телом запроса.

Есть следующие виды запросов:

| Название операции    | Тип HTTP запроса  | Описание                                                                     |
|----------------------|-------------------|------------------------------------------------------------------------------|
| Добавление/изменение | PUT               | Добавить новые товары, не отключая существующие, либо обновить существующие. |
| Синхронизация        | PATCH             | Синхронизировать наличие товаров.                                            |
| Удаление             | DELETE            | Удалить товары, перечисленные в запросе (отметить как "не в наличии").       |

## Жизненный цикл запроса

1. Сервер API REES46 принимает запрос.
1. Выполняет первичную проверку доступа (`shop_id`, `shop_secret`). Если `shop_id` и `shop_secret` не соответствуют существующим, сервер возвращает ошибку `400 Bad request`.
1. Отправляет задачу в фоновую обработку.
1. Возвращает код `204 No body`.
1. В случае успешной обработки фоновой задачи ничего не происходит. Задача обрабатывается быстро, поэтому спустя минуту уже можно загружать информацию о товарах.
1. В случае ошибочной обработки фоновой задачи приходит уведомление на адрес электронной почты сотрудников, подписанных на технические уведомления.

::: warning Обратите внимание
Все ключи регистрозависимы.
:::

## Описание данных в запросе

```json 
{
    "shop_id":      "...",
    "shop_secret":  "...",
    "items":        [{item1}, {item2}, ...]
} 
```

Пример структуры объекта товара `item`:

```json 
{
  "id": "string", // required
  "available": true,
  "categories": ["string", 1], // required, array of strings or integers
  "picture": "https://example.com/image.jpg", // URL, required, max. 500 characters
  "name": "string", // required
  "price": 99.99, // required, >0
  "url": "https://example.com/product", // required
  "oldprice": 120.00,
  "params": [
    {
      "name": "weight", //required
      "value": [70.5], //Array.Required
      "unit": "kg", // Optional
      "priority": 1, // Optional
      "searchable": true
    },
    {
      "name": "color",
      "value": ["red", "blue"],
      "unit": null,
      "priority": 2,
      "searchable": false
    }
  ],
  "group_id": "group123",
  "type_prefix": "prefix",
  "brand": "Brand Name",
  "brand_picture": "https://example.com/brand.jpg",
  "vendor_code": "ABC123",
  "barcode": "1234567890123",
  "model": "Model Name",
  "description": "Product description",
  "merchant": ["First merchant's name","second merchant's name", "third merchant's name"],
  "tags": ["tag1", "tag2"],
  "stock_quantity": 10,
  "discount_percent": 15,
  "gift": "Gift Name",
  "installment": 12,
  "promocode": "DISCOUNT10",
  "price_with_promocode": 89,
  "deeplink_android": "app://product/123",
  "deeplink_ios": "app://product/123",
  "bonuses_accrual_allowed": true,
  "bonuses_spending_allowed": false,
  "discounts_allowed": true,
  "accessories": ["Accessory1", "Accessory2"],
  "customer_recommendations": ["Product1", "Product2"],
  "seasonality": [1, 2, 12], // array of numbers 1-12
  "rating": 3, // number 1-5
  "leftovers": "few",
  "is_new": true,
  "fashion": {
    "gender": "m",
    "type": "clothing",
    "sizes": ["S", "M", 42],
    "colors": [
      {
        "color": "red",
        "picture": "https://example.com/red.jpg"
      }
    ],
    "feature": "adult" // e.g., 'adult'
  },
  "child": {
    "type": "toy",
    "gender": "f",
    "age": {
      "min": 3,
      "max": 7
    }
  },
  "jewelry": {
    "gender": "f",
    "color": "gold",
    "metal": "gold",
    "gem": "diamond",
    "ring_sizes": [6, "7.5"],
    "bracelet_sizes": ["S", "M"],
    "chain_sizes": [40, 50]
  },
  "cosmetic": {
    "gender": "f",
    "hypoallergenic": true,
    "periodic": false,
    "skin": {
      "part": ["face", "hands"],
      "type": ["dry", "oily"],
      "condition": ["acne", "wrinkles"]
    },
    "hair": {
      "type": ["curly", "straight"],
      "condition": ["damaged", "dry"]
    },
    "nail": {
      "type": "gel",
      "polish_color": "red"
    },
    "perfume": {
      "aroma": "floral",
      "family": "woody"
    },
    "professional": true
  },
  "pharmacy": {
    "volumes": [
      {
        "value": 100,
        "price": 19.99
      }
    ]
  },
  "book": {
    "author": "Author Name",
    "publisher": "Publisher Name",
    "series": "Book Series",
    "editor": "Editor Name",
    "illustrator": "Illustrator Name",
    "year": 2022, // 1700 < year < current year
    "isbn": ["978-3-16-148410-0"]
  },
  "realty": {
    "action": "rent",
    "type": "apartment",
    "space": {
      "min": 50,
      "max": 120,
      "final": 100
    }
  },
  "auto": {
    "vds": "engine oil",
    "periodic": true,
    "compatibility": [
      {
        "brand": "Toyota",
        "model": "Camry"
      }
    ]
  },
  "fmcg": {
    "hypoallergenic": false,
    "periodic": true
  },
  "pets": {
    "periodic": true,
    "breed": "Labrador",
    "type": "dog",
    "age": "puppy",
    "size": "large"
  },
  "date": "2025-03-03T12:00:00Z", // valid date
  "price_margin": 20, // 0-100
  "ignored": false
}
```

::: warning Примите во внимание
При обработке `url` к ссылке добавляются параметры вида `recommended_by`, `recommended_code` и т.д.
Они необходимы для работы трекинга событий и построения аналитики.

Если вам нужно передать в ссылке собственные параметры, их требуется закодировать.
В противном случае некоторые символы будут некорректно обработаны, например, согласно спецификации RFC3986 знак `+` распознается как пробел.
Если вам нужно, чтобы при переходе по ссылке в параметре передавался знак `+`, то его нужно экранировать в `%2B`.

Пример:

`https://test.com?test=+-!ABC` -> `https://test.com?test=%2B-%21ABC`
:::

::: tip Нужно учитывать

1. Если ключ параметра пришёл пустым, параметр игнорируется и не добавляется в список параметров товара
2. При отсутствии параметра `discount_percent` и наличии `oldprice`, первый будет автоматически рассчитан по формуле: **целая часть** от `((oldprice - price) / oldprice) * 100` (получается путём округления вниз до целого)

:::

## Особенности `location`

Объект "Цена и наличие в локации" показывает, что товар есть в наличии, в определенной локации и его цена отличается от базовой цены. Если
цена в объекте не указана, то для указанной локации будет использоваться базовая цена. Если объект "Цена и наличие в локации" указан, то во
всех других локациях, которые не перечислены для данного товара в свойстве `locations`, товар будет считаться не в наличии.

```json 
{
    "location":        "...", // String. Required
    "price":            ...,  // Float (positive). Optional.
    "oldprice":         ...,  // Float (positive). Optional.
    "merchant":        ["...", "..."], // Array of strings. Optional.
    "stock_quantity":   ...,  // Int (positive). Optional.
    "sizes":           ["...", "..."], // Array of string. Optional.
    "weight":           ...,  // Int (positive). Optional.
    "delivery_types":  {
      "store":      ..., // Int (positive). Available in store
      "delivery":   ..., // Int (positive). Available in delivery
      "warehouse":  ... // Int (positive). Available in warehouse
    }, // Object. Optional
}
```

## Особенности `delivery_types`

Объект "Типы доставки" показывает, что товар доступен для покупки в магазине или со склада.

```json 
{
    "delivery_type_1":  ..., // Int. Required
    "delivery_type_2":  ..., // Int. Required
    "...":              ...,
}
```

## Особенности `params`

Пример вложенной структуры информации о параметрах `params`:

```json 
{
    "name":        "...",  // String. Required
    "value":      ["...", "..."], // Array. Required
    "unit":        "...", // String. Optional
    "priority":     ..., // Int. Optional
    "searchable":   ..., // Boolean (true, false)
} 
```

## Нишевые параметры

Для обогащения пользовательских профилей и усиления эффекта персонализации рекомендуется добавлять нишевые параметры товаров в секцию `offer`.

* [Автотовары](../niche/auto.md)
* [Книги](../niche/books.md)
* [Товары для детей](../niche/kids.md)
* [Косметика и парфюмерия](../niche/cosmetics.md)
* [Недвижимость](../niche/realty.md)
* [Одежда, обувь, аксессуары](../niche/fashion.md)
* [Строительные материалы и инструмент](../niche/construction.md)
* [Товары для взрослых](../niche/adult.md)
* [Товары для животных](../niche/pets.md)
* [Товары повседневного спроса (FMCG)](../niche/fmcg.md)
* [Фармацевтика и медицина](../niche/pharmacy.md)
* [Ювелирные украшения](../niche/jewelry.md)

## Пример структуры

::: warning Лимит
Рекомендуется отправлять не более 5000 товаров в одном запросе.
:::

Ниже представлен пример с заполненными данными и пояснениями:

```json 
{
    "shop_id":      "eehj3eu84299kg5ghw5a6743r8",  
    "shop_secret":  "pmd5362597thrgq8k256ep01t0",  
    "items":            [
        // Товар 1
        {
  
            // Идентификатор товара в магазине
            "id":           "6335",
            
            // Идентификатор группы товаров в магазине. Если передаются варианты товаров, этот параметр позволяет объединить их в один товар
            "group_id":             "633",
  
            // Название
            "name":                 "Велосипед",
  
            // Цена
            "price":                13000, 
            
            // Цена с учётом применения промокода
            "price_with_promocode": 12000, 
            
            // Старая цена
            "oldprice":             16000, 
  
            // Валюта цены
            "currency":             "RUB",
  
            // URL товара, без UTM-меток и прочих параметров отслеживания источников перехода
            "url":                  "https://mysite.com/products/6335.html",
            
            // URL товара в приложении Android
            "deeplink_android":     "https://mysite.com/products/6335.html",
            
            // URL товара в приложении iOS
            "deeplink_ios":         "https://mysite.com/products/6335.html",
  
            // URL фотографии товара
            "picture":              "https://mysite.com/pictures/6335.jpg",
  
            // Товар в наличии
            "available":            true,
  
            // Массив идентификаторов категорий, в которых лежит товар (не хлебные крошки, только конечные категории)
            "categories":           ["17", "3"],
  
            // Штрих-код товара
            "barcode":              "17333838374318",
  
            // Маржинальность товара 10%
            "price_margin":         10,
  
            // Наличие товаров в определенных городах: доступен только в Москве и СПб
            "locations": [
                // Есть в наличии в Москве и его цена равна базовой
                {
                    "location": "msk",
                    "delivery_types": {
                        "shop": 10, // В магазине 10 шт.
                        "stock": 50 // На складе 50 шт.
                    }
                },
                // Есть в наличии в СПб и его цена отличается
                {
                    "location": "spb",
                    "price":    12500
                }
            ],
  
            // Производитель
            "brand":                "Marine",
  
            // Характеризующие теги
            "tags":                 ["aluminium", "sport"],
  
            // Детский велосипед
            "is_child":             true,
 
            // Параметры товара
            "params": [
                {
                    "name": "интерфейс",
                    "value": ["bluetooth", "wi-fi"]
                },
                {
                    "name": "энергопотребление",
                    "value": [23],
                    "unit": "вт"
                },
                {
                    "name": "Сим карта",
                    "value": ["E-sim"],
                    "priority": 20
                },
		        {
			        "name": "Цвет лейбла",
			        "value": ["Синий"],
			        "searchable": false // Технический параметр исключается из блока filters
		        }
            ],
            
            // Мерчант
            "merchant":             "abc123xyz789",
            
            // Дата добавления|обновления
            "creation_date":        "2022-01-01",
            
            // Наличие подарка
            "gift":                 true,
            
            // Информация о рассрочке
            "installment":          36,
            
            // Информация о скидке
            "discount_percent":     50,
            
            // Информация о промокоде
            "promocode":            "Sale50",
          
            // Начисление бонусов за товар разрешено
            "bonuses_accrual_allowed": true,
          
            // Списание бонусов за товар разрешено
            "bonuses_spending_allowed": true,
          
            // Применение скидки на товар разрешено
            "discounts_allowed": true
          
        },
  
        // Товар 2
        {
            "id":           "133",
            "name":         "Куртка красная",
            "price":        123000,
            "oldprice":     132000, 
            "currency":     "RUB",
            "url":          "https://myste.com/products/133.html",
            "picture":      "https://mysite.com/pictures/133.jpg",
            "available":    true,
            "categories":   ["33"],
  
            // Доступен только в Москве
            "locations": [
                { "location": "msk" }
            ],
            "brand":        "Racoon",
            "tags":         ["winter", "sport"],
  
            // Это одежда
            "is_fashion":   true,
  
            "fashion": {
                // Мужская
                "gender":   "m",
  
                // В размерах 48, 50, 52 российской размерной сетки
                "sizes":    ["48", "50", "52"],
  
                // Тип: куртка
                "type":     "jacket"
            },
          
            // Дата добавления|обновления
            "date": "2022-01-01"  
        }
    ]
}
```

## Особенности отправки DELETE запроса

При отправке запроса типа `DELETE` (удаление товаров из платформы) достаточно перечислить идентификаторы товаров, которые необходимо удалить. Пример:

```json
{
    "shop_id":      "eehj3eu84299kg5ghw5a6743r8",  
    "shop_secret":  "pmd5362597thrgq8k256ep01t0",  
    "items":        ["635", "3373", "75778"]
}
```

## Особенности отправки PATCH запроса

При отправке запроса типа `PATCH` (синхронизация наличия товаров в базе данных платформы) достаточно перечислить идентификаторы товаров, которые необходимо пометить как "в наличии". Товары из текущей базы данных платформы, идентификаторы которых не включены в `PATCH` запрос, будут помечены как "не в наличии".

Пример:

```json 
{
    "shop_id":      "eehj3eu84299kg5ghw5a6743r8",  
    "shop_secret":  "pmd5362597thrgq8k256ep01t0",  
    "items":        ["635", "3373", "75778"]
}
```
