# Подключение быстрого поиска с помощью SDK и REST API

Если вас не устраивают возможности готового окна быстрого поиска на сайте или вы внедряете быстрый поиск в мобильное приложение, вы можете использовать SDK и API.

:::warning Интеграция по API
Настоятельно рекомендуем воздержаться от подключения быстрого поиска напрямую через API из бэкенда, т.к. запросы требуют `did` и `sid`, которые управляются на стороне браузера и мобильного приложения и могут меняться. Есть шанс, что вы будете делать запросы с устаревшими данными и ваши клиенты не получат результатов поискового запроса.
:::

Помимо быстрого поиска есть так же режим "пустого" поиска. Это тот же самый поисковый запрос, но когда пользователь еще не ввел ни одной буквы. В этом случае API отдает немного другую структуру, которая включает в себя недавно просмотренные товары, недавние запросы и пр.

```
GET https://api.rees46.ru/search
```

## Параметры

| Параметр           | Тип     | Обязателен? | Описание                                                                                                                                                                                                 |
|--------------------|---------|-------------|----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| shop_id            | String  | Да          | API-ключ                                                                                                                                                                                                 |
| did                | String  | Да          | [Идентификатор устройства](../../cdp/entities/did.md)                                                                                                                                                    |
| sid                | String  | Да          | [Идентификатор сессии](../../cdp/entities/sid.md)                                                                                                                                                        |
| type               | String  | Да          | Для быстрого поиска фиксированное значение `instant_search`                                                                                                                                              |
| search_query       | String  | Да          | Поисковый запрос, введенный клиентом в поле поиска                                                                                                                                                       |
| locations          | String  | Нет         | Список локаций через запятую, в которых ищем товары в наличии                                                                                                                                            |
| search_scope       | String  | Нет         | Область поиска по свойствам товаров. Если не указано, то товары ищутся по всем свойствам. Если указать через запятую, то поиск будет выполняться только по указанным свойствам. См. таблицу свойств ниже |
| merchants          | String  | Нет         | Список мерчантов через запятую, чьи товары нужно вернуть в поисковом запросе (для маркетплейсов). Если в товарном фиде для товаров не задан параметр `merchants`, этот параметр игнорируется             |
| excluded_merchants | String  | Нет         | Список мерчантов через запятую, кого нужно исключить в поисковом запросе (для маркетплейсов). Если в товарном фиде для товаров не задан параметр `merchants`, этот параметр игнорируется                 |
| excluded_brands    | String  | Нет         | Список брендов через запятую, чьи товары нужно исключить в поисковом запросе                                                                                                                             |
| discount           | Boolean | Нет         | Флаг "показывать только товары со скидкой". Если `true`, то возвращает только товары со скидкой, если `false`, то только товары без скидки. Если не указан, то фильтр по скидке не применяется           |
| collapse           | Boolean | Нет         | Если задан `false`, то склейка вариантов товаров в одну группу выполняться не будет. Иначе для каждого группового товара будет возвращаться только один вариант                                          |
| debug              | Boolean | Нет         | Режим отладки, позволяет вернуть расширенную информацию о том, почему именно эти товары попали в выдачу                                                                                                  |

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
r46("suggest", {
  type: "instant_search",
  search_query: "electronics",
  locations: ["msk", "spb"],
  excluded_merchants: ["merchant1", "merchant2"],
  excluded_brands: ["samsung", "hp"],
  collapse: false
}, function(response) {
  // Обработка успешного ответа
}, function(error) {
  // Обработка ошибки
});
```

```swift [iOS] 
// Простой запрос
sdk.suggest(query: "ipho") { searchResult in
  print("Suggest callback")
}

// С исключением мерчантов
sdk?.suggest(
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
sdk?.suggest(
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
// Быстрый поиск
sdk.searchManager.searchInstant("SEARCH_QUERY", "locations", { searchInstantResponse ->
    Log.i(TAG, "Search instant response: $searchInstantResponse")
})

// Быстрый поиск с исключением брендов
sdk.searchManager.searchInstant(
  query = "powder bronzer",
  excludedBrands = listOf("dior", "estee lauder"),
  onSearchInstant = {
    Log.d("INSTANT SEARCH EXCLUDE BRANDS", it.productsTotal.toString())
  }
)

// Пустой поиск – отображение окна еще до ввода первого символа поискового запроса
sdk.searchManager.searchBlank({ searchBlankResponse ->
    Log.i(TAG, "Search blank response: $searchBlankResponse")
})
```

```java [Java (deprecated)] 
// Быстрый поиск
SearchParams params = new SearchParams();
params.put(SearchParams.Parameter.LOCATIONS, "location");
REES46.search("SEARCH_QUERY", SearchParams.TYPE.INSTANT, params, new Api.OnApiCallbackListener() {
    @Override
    public void onSuccess(JSONObject response) {
        Log.i(TAG, "Search response: " + response.toString());
    }
});

// Пустой поиск - отображение окна еще до ввода первого символа поискового запроса
REES46.search_blank(new Api.OnApiCallbackListener() {
    @Override
    public void onSuccess(JSONObject response) {
        Log.i(T.TAG, "Search response: " + response.toString());
    }
});

```

```javascript [ReactNative]
// Быстрый поиск
sdk.search({
  type: "instant_search",
  search_query: "ipho",
  // other params
}).then((res) => {
  console.log(res);
}).catch((error) => {
  console.log(error);
});

// Пустой поиск - отображение окна еще до ввода первого символа поискового запроса
sdk.searchBlank().then((res) => {
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
  "search_query": "iphon",
  "search_query_original": "iphon",
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
  "queries": [
    {
      "name": "iphone",
      "url_handle": "/search?q=iphone&r46_input_query=iphone&r46_search_query=iphone&recommended_by=instant_search&recommended_code=iphon",
      "url": "/search?q=ippon&r46_input_query=iphon&r46_search_query=ippon&recommended_by=instant_search&recommended_code=iphon",
      "score": 80.45008
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
    "search": {
      "search_query": "iphon",
      "search_query_original": "iphon",
      "products_total": 348,
      "html": "...",
      "clarification": true,
      "requests_count": 1,
      "products": [],
      "queries": [],
      "categories": [],
      "collections": []
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
| title                                    | String   | Заголовок блока                                                                                          |
| html                                     | String   | Сгенерированный HTML окна быстрого поиска                                                                |
| clarification                            | Boolean  | Флаг того, что был применен "уточняющий" поиск (поиск по частичному совпадению каждого слова из запроса) |
| requests_count                           | Integer  | Количество внутренних поисковых запросов с учетом раскладки, языка и уточнений                           |
| products_total                           | Integer  | Сколько всего найдено товаров                                                                            |
| collections[]                            | Array    | DEPRECATED                                                                                               |
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
| queries[]                                | Array    | Массив поисковых подсказок, включающих данный запрос                                                     |
| queries[].name                           | String   | Текст подсказки                                                                                          |
| queries[].url                            | String   | Ссылка на страницу полного поиска по этой подсказке                                                      |
| queries[].url_handle                     | String   | Ссылка на страницу полного поиска по этой подсказке без домена. Например: `/search?query=...`            |
| queries[].score                          | Float    | Оценка совпадения подсказки к запросу по семантике                                                       |



В случае ошибки ответ будет в формате:

```json 
{
  "status": "error",
  "payload": {
    "message": "Shop not found"
  }
}
```