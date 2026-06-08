# API и SDK для полного поиска

Эта статья описывает взаимодействие с SDK и REST API полного поиска, запросы, структуру ответа и как отображать результаты поиска для клиента. Эта статья не описывает, как выводить сайдбар с фильтрами для уточнения поиска. По этому вопросу ознакомьтесь со статьей про [фасетный поиск](./facet.md), которая является вторым обязательным шагом интеграции полного поиска.

В случае с сайтом, нужна отдельная страница для отображения результатов полного поиска, фильтров для уточнения поиска, пагинации и блока рекомендаций, если полный поиск не дал результатов.

В случае с мобильным приложением для этого нужен отдельный экран.

```
GET https://api.rees46.ru/search
```

## Параметры

| Параметр           | Тип     | Обязателен? | Описание                                                                                                                                                                                                 |
|--------------------|---------|-------------|----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| shop_id            | String  | Да          | API-ключ                                                                                                                                                                                                 |
| did                | String  | Да          | [Идентификатор устройства](../../cdp/entities/did.md)                                                                                                                                                    |
| sid                | String  | Да          | [Идентификатор сессии](../../cdp/entities/sid.md)                                                                                                                                                        |
| email              | String  | Нет         | Может использоваться вместо did/sid для S2S интеграции                                                                                                                                                   |
| type               | String  | Да          | Для полного поиска фиксированное значение `full_search`                                                                                                                                                  |
| search_query       | String  | Да          | Поисковый запрос, введенный клиентом в поле поиска                                                                                                                                                       |
| categories         | String  | Нет         | Список идентификаторов категорий через запятую, в которых выполнять поиск                                                                                                                                |
| locations          | String  | Нет         | Список локаций через запятую, в которых ищем товары в наличии                                                                                                                                            |
| brands             | String  | Нет         | Список брендов через запятую для фильтрации результатов поиска                                                                                                                                           |
| excluded_brands    | String  | Нет         | Список брендов через запятую, чьи товары нужно исключить в поисковом запросе                                                                                                                             |
| merchants          | String  | Нет         | Список мерчантов через запятую, чьи товары нужно вернуть в поисковом запросе (для маркетплейсов). Если в товарном фиде для товаров не задан параметр `merchants`, этот параметр игнорируется             |
| excluded_merchants | String  | Нет         | Список мерчантов через запятую, кого нужно исключить в поисковом запросе (для маркетплейсов). Если в товарном фиде для товаров не задан параметр `merchants`, этот параметр игнорируется                 |
| sort_by            | String  | Нет         | Значение ключа, по которому сортировать результаты поиска: `popular`, `price`, `discount`, `sales_rate`, `date`, `price_margin`, `rating`, `relevance`                                                   |
| order              | String  | Нет         | Направление сортировки: `asc`, `desc`. По умолчанию: `desc`                                                                                                                                              |
| price_min          | Integer | Нет         | Минимальная цена товара                                                                                                                                                                                  |
| price_max          | Integer | Нет         | Максимальная цена товара                                                                                                                                                                                 |
| colors             | String  | Нет         | Список цветов для фильтрации результатов поиска товаров по цвету                                                                                                                                         |
| fashion_sizes      | String  | Нет         | Список размеров одежды для фильтрации результатов поиска товаров                                                                                                                                         |
| exclude            | String  | Нет         | Список артикулов товаров, которые нужно исключить из результатов поиска (например то, что у клиента сейчас в корзине)                                                                                    |
| search_scope       | String  | Нет         | Область поиска по свойствам товаров. Если не указано, то товары ищутся по всем свойствам. Если указать через запятую, то поиск будет выполняться только по указанным свойствам. См. таблицу свойств ниже |
| discount           | Boolean | Нет         | Флаг "показывать только товары со скидкой". Если `true`, то возвращает только товары со скидкой, если `false`, то только товары без скидки. Если не указан, то фильтр по скидке не применяется           |
| debug              | Boolean | Нет         | Режим отладки, позволяет вернуть расширенную информацию о том, почему именно эти товары попали в выдачу                                                                                                  |
| collapse           | Boolean | Нет         | Если задан `false`, то склейка вариантов товаров в одну группу выполняться не будет. Иначе для каждого группового товара будет возвращаться только один вариант                                          |
| extended           | Boolean | Нет         | Если параметр равен `true`, возвращает полную информацию о товарах. Если не указан или `false`, то возвращает только артикулы найденных товаров                                                          |
| filters_search_by  | String  | Нет         | По какому свойству сортировать фильтры в сайдбаре: `name`, `quantity`, `popularity`. Переопределяет настройки из личного кабинета                                                                        |
| brand_limit        | Integer | Нет         | Лимит значений брендов в фильтре по бренду. По умолчанию `1000`. Чем выше число, тем дольше ответ поиска                                                                                                 |
| no_clarification   | Boolean | Нет         | Отключить уточняющий поиск                                                                                                                                                                               |
| limit              | Integer | Нет         | Количество товаров в ответе                                                                                                                                                                              |
| page               | Integer | Нет         | Страница выборки товаров для постраничной навигации. По умолчанию: 1                                                                                                                                     |

Свойства для области поиска:

| Параметр    | Тип   | Описание                   |
|-------------|-------|----------------------------|
| name        | Общий | Поиск по названию товара   |
| brand       | Общий | Поиск по бренду товара     |
| model       | Общий | Поиск по модели товара     |
| categories  | Общий | Поиск по категориям товара |
| params      | Общий | Поиск по параметрам товара |
| author      | Книги | Поиск по автору            |
| publisher   | Книги | Поиск по издателю          |
| illustrator | Книги | Поиск по иллюстратору      |
| editor      | Книги | Поиск по редактору         |
| series      | Книги | Поиск по серии книг        |

Значения `sort_by`:

| Значение       | Описание                                                                                                                          |
|----------------|-----------------------------------------------------------------------------------------------------------------------------------|
| `popular`      | Сортировать по популярности товара (устарело, игнорируется)                                                                       |
| `price`        | Сортировать по цене товара в локации                                                                                              |
| `discount`     | Сортировать по размеру скидки                                                                                                     |
| `sales_rate`   | Сортировать по параметру sales rate (общая популярность товара, учитывающая продажи, добавления в корзину, маржинальность и цену) |
| `date`         | Сортировать по дате добавления в каталог                                                                                          |
| `price_margin` | Сортировать по размеру маржи                                                                                                      |
| `rating`       | Сортировать по рейтингу товара                                                                                                    |
| `relevance`    | Сортировать только по семантической оценке товара в результатах поиска, игнорируя популярность, цену, продажи и другие метрики    |


## Запрос

Пример запроса:

::: code-group

```shell [S2S]
# Несмотря на то, что вы можете делать запросы к API, мы рекомендуем этого не делать.
# Это связано с тем, что в алгоритмах участвуют параметры `did` и `sid`, 
# которые есть только на фронте и могут меняться время от времени.
# Хотя в последней версии платформы вы можете использовать вместо `did/sid` параметр `email`, 
# если он вам известен.
```

```javascript [JS SDK]
r46("search", {
  type: "full_search",
  search_query: "shoes",
  categories: [313, 14, 40],
  category_limit: 10,
  extended: true,
  sort_by: "price",
  order: "asc",
  locations: ["msk", "spb"],
  brands: ["brand", "anotherbrand"],
  price_min: 100,
  price_max: 1000,
  colors: ["black", "white"],
  fashion_sizes: ["42", "44"],
  exclude: ["PRODUCT_ID", "ANOTHER_PRODUCT_ID"],
  merchants: ["merchant1", "merchant2"],
  excluded_merchants: ["merchant3", "merchant4"],
  excluded_brands: ["theotherbrand"],
  filters_search_by: "popularity",
  brand_limit: 50,
  collapse: false
}, function(response) {
  // handle the response: for example, render full search results
}, function(error) {
  // handle the error: logging or showing a message to the user
});
```

```swift [iOS] 
// Простой запрос
sdk.search(query: "iphone") { searchResult in
  print("Full search callback")
}

// Запрос с дополнительными параметрами
sdk.search(query: "laptop", limit: nil, offset: nil, categoryLimit: nil, categories: nil, extended: nil, sortBy: nil, sortDir: nil, locations: nil, brands: nil, filters: nil, priceMin: nil, priceMax: nil, colors: nil, exclude: nil, fashion_sizes: nil) { searchResult in
  print("Full search callback")
}

// Запрос в конкретной локации и с исключением мерчантов
sdk?.search(
  query: "search-query",
  locations: "location",
  excludedMerchants: ["excluded-merchant"]
) { result in
    switch result {
    case .success(let response):
      print(response.productsTotal)
    case .failure(let error):
      print(error.description)
  }
}

// С исключением брендов
sdk?.search(
    query: "powder bronzer",
    excludedBrands: ["dior", "estee lauder"]
) { result in
    switch result {
    case .success(let response):
        print(response.productsTotal)
    case .failure(let error):
        print(error.description)
    }
}
```


```kotlin [Kotlin]
// Простой запрос
val params = SearchParams()
sdk.searchManager.searchFull("SEARCH_QUERY", params, { searchFullResponse ->
    Log.i(TAG, "Search full response: $searchFullResponse")
})

// С различными фильтрами и исключениями
val params = SearchParams()
params.put(SearchParams.Parameter.LOCATIONS, "location")
val filters = SearchParams.SearchFilters()
filters.put("voltage", arrayOf("11.1", "14.8"))
params.put(SearchParams.Parameter.FILTERS, filters)
params.put(SearchParams.Parameter.NO_CLARIFICATION, true)
filters.put("fashion_sizes", arrayOf("S", "M", "L"))
params.put(SearchParams.Parameter.FASHION_SIZES, filters)
sdk.searchManager.searchFull("SEARCH_QUERY", params, { searchFullResponse ->
    Log.i(TAG, "Search full response: $searchFullResponse")
})

// Добавление параметров прямо в вызов
sdk.searchManager.searchFull(
  "powder bronzer",
  searchParams = SearchParams()
    .put(SearchParams.Parameter.EXCLUDED_BRANDS, listOf("dior", "estee lauder").joinToString(",")),
  onSearchFull = {
    Log.d("FULL SEARCH EXCLUDE BRANDS", it.productsTotal.toString())
  }
)

```

```java [Java (deprecated)] 
SearchParams params = new SearchParams();
params.put(SearchParams.Parameter.LOCATIONS, "location");
SearchParams.SearchFilters filters = new SearchParams.SearchFilters();
filters.put("voltage", new String[] {"11.1", "14.8"});
params.put(SearchParams.Parameter.FILTERS, filters);
params.put(SearchParams.Parameter.NO_CLARIFICATION, true);
REES46.search("SEARCH_QUERY", SearchParams.TYPE.FULL, params, new Api.OnApiCallbackListener() {
    @Override
    public void onSuccess(JSONObject response) {
        Log.i(TAG, "Search response: " + response.toString());
    }
});
```

```javascript [ReactNative]
sdk.search({
  type,
  search_query,
  // other params
}).then((res) => {
  console.log(res);
}).catch((error) => {
  console.log(error);
});
```
:::

## Ответ

Пример ответа сервера:

```json
{
  "search_query": "туфли",
  "search_query_original": "туфли",
  "collections": [],
  "products_total": 348,
  "html": "...",
  "clarification": true,
  "requests_count": 1,
  "products": [
    {
      "name": "Чайник Tefal Thermo Protect KO-140AE0",
      "url": "https://demo.r46.dev/product/chaynik-tefal-thermo-protect-ko-140ae0-286429?recommended_by=dynamic&recommended_code=9cfeb354ce39e5d1baec9762bc2b01ab",
      "deeplink_android": "https://demo.r46.dev/product/chaynik-tefal-thermo-protect-ko-140ae0-286429",
      "deeplink_ios": "https://demo.r46.dev/product/chaynik-tefal-thermo-protect-ko-140ae0-286429",
      "category_ids": [ "tehnika-dlja-kuhni", "prigotovlenie-napitkov", "jelektricheskie-chajniki" ],
      "barcode": "286429",
      "vendor_code": "KO-140AE0",
      "brand": "Tefal",
      "model": "KO-140AE0",
      "sales_rate": 4692,
      "relative_sales_rate": 100,
      "picture": "https://pictures.rees46.ru/resize-images/180/cfe99167fa99ee2d2c2098752b0ed3/16041.jpg",
      "categories": [
        {
          "id": "tehnika-dlja-kuhni",
          "url": "https://demo.r46.dev/category/tehnika-dlja-kuhni?recommended_by=dynamic&recommended_code=9cfeb354ce39e5d1baec9762bc2b01ab",
          "name": "Техника для кухни",
          "level": "1",
          "name_with_parent": "Техника для кухни",
          "url_handle": "/category/tehnika-dlja-kuhni?recommended_by=dynamic&recommended_code=9cfeb354ce39e5d1baec9762bc2b01ab"
        },
        {
          "id": "prigotovlenie-napitkov",
          "parent_id": "tehnika-dlja-kuhni",
          "url": "https://demo.r46.dev/category/tehnika-dlja-kuhni/prigotovlenie-napitkov?recommended_by=dynamic&recommended_code=9cfeb354ce39e5d1baec9762bc2b01ab",
          "name": "Приготовление напитков",
          "level": "2",
          "name_with_parent": "Техника для кухни - Приготовление напитков",
          "url_handle": "/category/tehnika-dlja-kuhni/prigotovlenie-napitkov?recommended_by=dynamic&recommended_code=9cfeb354ce39e5d1baec9762bc2b01ab"
        },
        {
          "id": "jelektricheskie-chajniki",
          "parent_id": "prigotovlenie-napitkov",
          "url": "https://demo.r46.dev/category/tehnika-dlja-kuhni/prigotovlenie-napitkov/jelektricheskie-chajniki?recommended_by=dynamic&recommended_code=9cfeb354ce39e5d1baec9762bc2b01ab",
          "name": "Электрические чайники",
          "level": "3",
          "name_with_parent": "Приготовление напитков - Электрические чайники",
          "url_handle": "/category/tehnika-dlja-kuhni/prigotovlenie-napitkov/jelektricheskie-chajniki?recommended_by=dynamic&recommended_code=9cfeb354ce39e5d1baec9762bc2b01ab"
        }
      ],
      "discount_percent": 33,
      "price_formatted": "19 990 ₽",
      "price_full_formatted": "19 990.00 ₽",
      "price": 19990,
      "price_full": 19990,
      "oldprice_formatted": "29 990 ₽",
      "oldprice_full_formatted": "29 990.00 ₽",
      "oldprice": 29990,
      "oldprice_full": 29990,
      "image_url": "https://pictures.rees46.ru/f3/api/v1/images/286429_1.jpg",
      "image_url_handle": "/f3/api/v1/images/286429_1.jpg",
      "image_url_resized": {
        "120": "https://pictures.rees46.ru/resize-images/120/cfe99167fa99ee2d2c2098752b0ed3/16041.jpg",
        "140": "https://pictures.rees46.ru/resize-images/140/cfe99167fa99ee2d2c2098752b0ed3/16041.jpg",
        "160": "https://pictures.rees46.ru/resize-images/160/cfe99167fa99ee2d2c2098752b0ed3/16041.jpg",
        "180": "https://pictures.rees46.ru/resize-images/180/cfe99167fa99ee2d2c2098752b0ed3/16041.jpg",
        "200": "https://pictures.rees46.ru/resize-images/200/cfe99167fa99ee2d2c2098752b0ed3/16041.jpg",
        "220": "https://pictures.rees46.ru/resize-images/220/cfe99167fa99ee2d2c2098752b0ed3/16041.jpg",
        "310": "https://pictures.rees46.ru/resize-images/310/cfe99167fa99ee2d2c2098752b0ed3/16041.jpg",
        "520": "https://pictures.rees46.ru/resize-images/520/cfe99167fa99ee2d2c2098752b0ed3/16041.jpg",
        "original": "https://pictures.rees46.ru/f3/api/v1/images/286429_1.jpg"
      },
      "url_handle": "/product/chaynik-tefal-thermo-protect-ko-140ae0-286429?recommended_by=dynamic&recommended_code=9cfeb354ce39e5d1baec9762bc2b01ab",
      "discount": 33,
      "discount_formatted": "33%",
      "currency": "₽",
      "_id": "16041",
      "id": "286429",
      "stock_quantity": 999999,
      "params": [
        {
          "key": "merchant",
          "values": [
            "sellername"
          ]
        },
        {
          "key": "stickers",
          "values": [
            "{\"slug\": \"0_0_24\", \"title\": \"0-0-24\", \"text_color\": \"#ffffff\", \"background_color\": \"#b72eb7\", \"priority\": 1}"
          ]
        },
        {
          "key": "Цвет",
          "values": [
            "Бежевый"
          ]
        }
      ],
      "group_id": "_16041_"
    }
  ],
  "categories": [
    {
      "id": "aksessuary-dlja-telefonov",
      "name": "Смартфоны и гаджеты - Аксессуары для телефонов",
      "parent": "smartfony-i-gadzhety",
      "url": "/category/smartfony-i-gadzhety/aksessuary-dlja-telefonov?recommended_by=instant_search&recommended_code=iphon",
      "url_handle": "/category/smartfony-i-gadzhety/aksessuary-dlja-telefonov?recommended_by=instant_search&recommended_code=iphon",
      "count": 220
    }
  ],
  "locations": [
    {
      "id": "10164",
      "name": "129226, Москва г, г Москва, пр-кт Мира, д 211/2, «Европолис»",
      "type": "store"
    },
    {
      "id": "10631",
      "name": "125212, Москва г, г Москва, Головинское шоссе, д 5/1, «Водный»",
      "type": "store"
    }
  ],
  "filters": {
    "Стиль": {
      "count": 1952,
      "values": {
        "Повседневный": 971,
        "Классический": 408,
        "Вечерний": 249,
        "Женственный": 221,
        "Спортивный": 170,
        "Деловой": 123,
        "Школьный": 3,
        "Минимализм": 2,
        "Минималистичный": 2,
        "Повседевный": 2,
        "Праздничный": 2
      },
      "priority": 24
    },
    "Цвет": {
      "count": 3341,
      "values": {
        "черный": 1580,
        "белый": 480,
        "бежевый": 400,
        "коричневый": 201,
        "синий": 183,
        "серый": 118,
        "зеленый": 94,
        "розовый": 90,
        "красный": 83,
        "разноцветный": 71,
        "серебристый": 55,
        "голубой": 33,
        "желтый": 24,
        "фиолетовый": 19,
        "мятный": 16,
        "золотистый": 14,
        "оранжевый": 6,
        "прозрачный": 2
      },
      "priority": 23
    },
    "Высота голенища/задника обуви": {
      "count": 182,
      "values": {},
      "priority": 17,
      "ranges": {
        "min": 4.5,
        "max": 45
      }
    }
  },
  "industrial_filters": {
    "fashion_sizes": [
      {
        "size": "40",
        "count": 1758
      },
      {
        "size": "36",
        "count": 1447
      },
      {
        "size": "37",
        "count": 1435
      }
    ],
    "colors": [
      {
        "color": "black",
        "count": 1446
      },
      {
        "color": "white",
        "count": 419
      }
    ]
  }
}
```

:::warning Внимание

В будущем структура будет приведена к стандарту ответа:

```json
{
  "status": "success",
  "payload": {
    "search": {
      "search_query": "туфли",
      "search_query_original": "туфли",
      "collections": [],
      "products_total": 348,
      "html": "...",
      "clarification": true,
      "requests_count": 1,
      "products": [],
      "categories": [],
      "locations": [],
      "filters": {},
      "industrial_filters": {}
    }
  }
}
```

Рекомендуем подготовить обработчик ответа под новую структуру, чтобы ваша интеграция не сломалась.

:::


Расшифровка свойств ответа:

| Свойство                                 | Тип      | Описание                                                                                                 |
|------------------------------------------|----------|----------------------------------------------------------------------------------------------------------|
| search_query                             | String   | Исправленный поисковый запрос за счет синонимов, битой раскладки и пр.                                   |
| search_query_original                    | String   | Оригинальный поисковый запрос                                                                            |
| html                                     | String   | Сгенерированный HTML для результатов полного поиска из шаблона в личном кабинете                         |
| clarification                            | Boolean  | Флаг того, что был применен "уточняющий" поиск (поиск по частичному совпадению каждого слова из запроса) |
| requests_count                           | Integer  | Количество внутренних поисковых запросов с учетом раскладки, языка и уточнений                           |
| products_total                           | Integer  | Сколько всего найдено товаров                                                                            |
| collections[]                            | Array    | DEPRECATED                                                                                               |
| price_range                              | Object   | Разброс цен по товарам в ответе                                                                          |
| price_range.min                          | Integer  | Минимальная цена товара                                                                                  |
| price_range.max                          | Integer  | Максимальная цена товара                                                                                 |
| price_ranges[]                           | Array    | Список интервалов цен товаров                                                                            |
| price_ranges[].from                      | Integer  | Значение цены в начале интервала, может отсутствовать (значит 0)                                         |
| price_ranges[].to                        | Integer  | Значение цены в конце интервала, может отсутствовать (значит бесконечность)                              |
| price_ranges[].count                     | Integer  | Количество товаров в этом ценовом интервале                                                              |
| price_median                             | Integer  | Медиана цены в результирующей выборке                                                                    |
| products[]                               | Array    | Массив найденных товаров                                                                                 |
| products[].name                          | String   | Название товара                                                                                          |
| products[].url                           | String   | Ссылка на товар                                                                                          |
| products[].url_handle                    | String   | Ссылка на товар без домена. Например: `/products/5575`                                                   |
| products[].deeplink_android              | String   | Диплинк на товар для Android                                                                             |
| products[].deeplink_ios                  | String   | Диплинк на товар для iOS                                                                                 |
| products[].category_ids                  | String[] | Массив идентификаторов категорий товара                                                                  |
| products[].barcode                       | String   | Штрих-код товара                                                                                         |
| products[].vendor_code                   | String   | Vendor code из YML-файла                                                                                 |
| products[].brand                         | String   | Бренд товара                                                                                             |
| products[].model                         | String   | Модель товара                                                                                            |
| products[].sales_rate                    | Integer  | Sales rate товара                                                                                        |
| products[].relative_sales_rate           | Integer  | Относительный sales rate товара                                                                          |
| products[].picture                       | String   | Ссылка на фотографию товара                                                                              |
| products[].image_url                     | String   | Ссылка на фотографию товара                                                                              |
| products[].image_url_handle              | String   | Ссылка на фотографию товара без домена                                                                   |
| products[].image_url_resized             | Object   | Объект ссылок на отресайзенную фотографию товара                                                         |
| products[].image_url_resized['120']      | String   | Ссылка на фотографию размером 120x120                                                                    |
| products[].image_url_resized['140']      | String   | Ссылка на фотографию размером 140x140                                                                    |
| products[].image_url_resized['160']      | String   | Ссылка на фотографию размером 160x160                                                                    |
| products[].image_url_resized['180']      | String   | Ссылка на фотографию размером 180x180                                                                    |
| products[].image_url_resized['200']      | String   | Ссылка на фотографию размером 200x200                                                                    |
| products[].image_url_resized['220']      | String   | Ссылка на фотографию размером 220x220                                                                    |
| products[].image_url_resized['310']      | String   | Ссылка на фотографию размером 310x310                                                                    |
| products[].image_url_resized['520']      | String   | Ссылка на фотографию размером 520x520                                                                    |
| products[].image_url_resized['original'] | String   | Ссылка на оригинал фотографии                                                                            |
| products[].categories[]                  | Array    | Массив с детальной информацией о категориях товара                                                       |
| products[].categories[].id               | String   | Идентификатор категории                                                                                  |
| products[].categories[].url              | String   | Ссылка на страницу категории                                                                             |
| products[].categories[].name             | String   | Название категории                                                                                       |
| products[].categories[].level            | String   | Уровень вложенности категории от корня дерева                                                            |
| products[].categories[].name_with_parent | String   | Название категории с названием родительской категории                                                    |
| products[].categories[].url_handle       | String   | Ссылка на страницу категории без домена. Например: `/categories/smartphones`                             |
| products[].discount_percent              | Integer  | Размер скидки                                                                                            |
| products[].discount                      | Integer  | Размер скидки                                                                                            |
| products[].discount_formatted            | String   | Размер скидки со знаком %                                                                                |
| products[].price_formatted               | String   | Отформатированная цена без копеек с символом валюты                                                      |
| products[].price_full_formatted          | String   | Отформатированная цена с копейками и символом валюты                                                     |
| products[].price                         | Integer  | Цена без копеек                                                                                          |
| products[].price_full                    | Float    | Цена с копейками                                                                                         |
| products[].oldprice_formatted            | String   | Отформатированная старая цена (до скидки) без копеек с символом валюты                                   |
| products[].oldprice_full_formatted       | String   | Отформатированная старая цена (до скидки) с копейками и символом валюты                                  |
| products[].oldprice                      | Integer  | Старая цена (до скидки) без копеек                                                                       |
| products[].oldprice_full                 | Float    | Старая цена (до скидки) с копейками                                                                      |
| products[].currency                      | String   | Символ валюты                                                                                            |
| products[]._id                           | String   | Внутренний идентификатор товара                                                                          |
| products[].id                            | String   | Внешний идентификатор (артикул) товара из вашей БД                                                       |
| products[].group_id                      | String   | Идентификатор группы товаров, если это один из вариантов товара                                          |
| products[].stock_quantity                | Integer  | Количество товара в наличии                                                                              |
| products[].params[]                      | Array    | Массив параметров товара из товарного фида                                                               |
| products[].params[].key                  | String   | Ключ параметра товара                                                                                    |
| products[].params[].values[]             | Array    | Массив строковых и числовых значений параметра товара                                                    |
| categories[]                             | Array    | Массив категорий, в которых найдены товары                                                               |
| categories[].id                          | String   | Идентификатор категории                                                                                  |
| categories[].name                        | String   | Название категории                                                                                       |
| categories[].url                         | String   | Ссылка на категорию                                                                                      |
| categories[].url_handle                  | String   | Ссылка на категорию без домена. Например: `/products/5575`                                               |
| categories[].parent                      | String   | Идентификатор родительской категории                                                                     |
| categories[].count                       | Integer  | Количество товаров, найденных в этой категории                                                           |
| categories[].alias                       | String   | Алиас категории из товарного фида                                                                        |
| locations[]                              | Array    | Массив локаций, в которых найдены товары                                                                 |
| locations[].id                           | String   | Идентификатор локации                                                                                    |
| locations[].name                         | String   | Название локации                                                                                         |
| locations[].type                         | String   | Тип локации                                                                                              |
| filters[]                                | Object   | Список фильтров для фасетного поиска в виде объекта, где ключом выступает название параметра             |
| filters[].%filtername%                   | String   | Название параметра                                                                                       |
| filters[].%filtername%.count             | Integer  | Количество товаров в результате поиска с этим параметром                                                 |
| filters[].%filtername%.priority          | Integer  | Приоритет фильтра для сортировки популярности параметров                                                 |
| filters[].%filtername%.values            | Object   | Объект со значениями фильтра и количеством товаров с этим значением фильтра (для списковых фильтров)     |
| filters[].%filtername%.ranges            | Object   | Объект с минимальным и максимальным значениями фильтра (для числовых фильтров)                           |
| filters[].%filtername%.ranges.min        | Float    | Минимальное значение параметра этого параметра (для числовых фильтров)                                   |
| filters[].%filtername%.ranges.max        | Float    | Максимальное значение параметра этого параметра (для числовых фильтров)                                  |
| industrial_filters                       | Object   | Объект с фильтрами по служебным нишевым параметрам. Например: `fashion_sizes` или `colors`               |
| industrial_filters.fashion_sizes[]       | Array    | Список служебных размеров одежды или обуви                                                               |
| industrial_filters.fashion_sizes[].size  | String   | Размер одежды или обуви                                                                                  |
| industrial_filters.fashion_sizes[].count | Integer  | Количество товаров такого размера                                                                        |
| industrial_filters.colors[]              | Array    | Список цветов одежды или обуви                                                                           |
| industrial_filters.colors[].color        | String   | Цвет одежды или обуви                                                                                    |
| industrial_filters.colors[].count        | Integer  | Количество товаров такого цвета                                                                          |


В случае ошибки ответ будет в формате:

```json 
{
  "status": "error",
  "payload": {
    "message": "Shop not found"
  }
}
```