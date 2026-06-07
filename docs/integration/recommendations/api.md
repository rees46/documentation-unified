# Запрос товарных рекомендаций с помощью SDK и REST API

Если вас не устраивает автоматическая отрисовка рекомендаций на сайте и вы хотите иметь больше контроля, вы можете использовать API и SDK.

```
GET https://api.rees46.ru/recommend/:code
```

## Параметры

| Параметр         | Тип     | Обязателен? | Описание                                                                                                                                                                                                           |
|------------------|---------|-------------|--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| shop_id          | String  | Да          | API-ключ                                                                                                                                                                                                           |
| recommender_code | String  | Да          | Идентификатор блока, подставляется прямо в endpoint вместо `:code`                                                                                                                                                 |
| did              | String  | Да          | [Идентификатор устройства](../cdp/entities/did.md)                                                                                                                                                                 |
| sid              | String  | Да          | [Идентификатор сессии](../cdp/entities/sid.md)                                                                                                                                                                     |
| resize_image     | Integer | Нет         | Размер, в который нужно отресайзить фото товара. Варианты: 120, 140, 160, 180, 200, 220, 310, 520                                                                                                                  |
| extended         | Boolean | Нет         | Возвращать расширенную информацию о товарах или нет. Если `false`, то возвращается только список артикулов. Если `true`, то возвращается подробная информация о каждом товаре                                      |
| with_locations   | Boolean | Нет         | Если `true` и `extended` тоже `true`, то в дополнение в каждом товаре еще вернет список локаций, в которых этот товар есть в наличии. Если `extended` не указан или `false`, то этот параметр будет проигнорирован |
| stream           | String  | Нет         | Стрим (канал) из которого выполняется запрос. Например `ios_app`. Для сайта не указывайте этот параметр                                                                                                            |


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
r46(
  "recommend", 
  "... block code ...", 
  {
    item: "my-phone", 
    exclude: ["3", "14", "159", "26535"], 
    category: "146",
    categories: [1, 146, 100500], // Вместо `category`, если нужен фильтр больше, чем по одной категории 
    search_query: "To be or not to be", 
    limit: 15,
    brands: ["Alas", "poor", "Yorick"], 
    extended: true, 
    with_locations: true 
  }, 
  function(response) {
    // Обработка успешного ответа
  }, function(error) {
    // Обработка ошибки
  }
);
```

```swift [iOS] 
// Простой запрос
sdk.recommend(blockId: "BLOCK_ID") { recommendResult in
  print("Callback")
}

// Запрос с дополнительными данными
sdk.recommend(blockId: "block_id", currentProductId: "PRODUCT_ID") { recommendResult in
  print("Callback")
}

// Запрос с локациями
sdk.recommend(blockId: "block_id", extended: true, with_locations: true) {
  // Список локаций будет добавлен к каждому товару. Ключ выглядит примерно так:
  // locations: [ { "id": "loc1", "name": "Location 1" }, { "id": "loc2", "name": "Location 2" } ]
}

// В iOS можно создать компонент для автоматической отрисовки блока по аналогии с DIV-блоком на сайте
public var recommendationsCollectionView = RecommendationsWidgetView()
DispatchQueue.main.async {
  self.recommendationsCollectionView.loadWidget(sdk: globalSDK, blockId: "bc1f41f40bb4f92a705ec9d5ec2ada42")
  self.view.addSubview(self.recommendationsCollectionView)
  self.recommendationsCollectionView.heightAnchor.constraint(equalToConstant: 460).isActive = true
  self.recommendationsCollectionView.topAnchor.constraint(equalTo: self.view.topAnchor, constant: 20).isActive = true
  self.recommendationsCollectionView.leadingAnchor.constraint(equalTo: self.view.leadingAnchor).isActive = true
  self.recommendationsCollectionView.trailingAnchor.constraint(equalTo: self.view.trailingAnchor).isActive = true
}
// В том числе вы можете задать цветовую схему и дизайн блока прямо в коде
sdk.configuration().recommendations.setWidgetBlock(widgetFontName: "Museo",
  widgetBackgroundColor: "#ffffff",
  widgetBackgroundColorDarkMode: "#000000",
  widgetCellBackgroundColor: "#ffffff",
  widgetCellBackgroundColorDarkMode: "#000000",
  widgetBorderWidth: 1,
  widgetBorderColor: "#c3c3c3",
  widgetBorderColorDarkMode: "#c3c3c3",
  widgetBorderTransparent: 0.4,
  widgetCornerRadius: 9,
  widgetStarsColor: "#ff9500",
  widgetAddToCartButtonText: "Add to cart",
  widgetRemoveFromCartButtonText: "Remove from cart",
  widgetAddToCartButtonFontSize: 17,
  widgetRemoveFromCartButtonFontSize: 14,
  widgetCartButtonTextColor: "#ffffff",
  widgetCartButtonTextColorDarkMode: "#ffffff",
  widgetCartButtonBackgroundColor: "#000000",
  widgetCartButtonBackgroundColorDarkMode: "#ffffff",
  widgetCartButtonNeedOpenWebUrl: false,
  widgetFavoritesIconColor: "#000000",
  widgetFavoritesIconColorDarkMode: "#ffffff",
  widgetPreloadIndicatorColor: "#ffffff"
)


```


```kotlin [Kotlin]
// Простой запрос
val params = Params().apply {
  put(Params.Parameter.ITEM, YOUR_ITEM_ID)
  put(Params.Parameter.CATEGORY, YOUR_CATEGORY_ID) // category filtration
  put(Params.Parameter.WITH_LOCATIONS, true) // Enable locations to receive data about locations where the product is available (default is false).
}

// Запрос с расширенной информацией о товарах
// TODO: актуализировать
sdk.recommendationManager.getExtendedRecommendation(RECOMMEDATION_CODE,
  params = params,
  onGetExtendedRecommendation = { response ->
    Log.i(YOUR_TAG, response)
  },
  onError = { code, msg ->
    Log.e(YOUR_TAG, "Error caught: $code, $msg")
  }
)
```

```java [Java (deprecated)] 
val params = Params().apply {
  put(Params.Parameter.EXTENDED, true)
  put(Params.Parameter.ITEM, YOUR_ITEM_ID)
  put(Params.Parameter.CATEGORY, YOUR_CATEGORY_ID)
}

REES46.recommend(
  YOUR_RECOMMENDER_CODE,
  params, object : Api.OnApiCallbackListener() {
    override fun onSuccess(response: JSONObject) {
      Log.i(TAG, "Recommender response: $response")
    }
  }
)
```

```javascript [ReactNative]
// Код блока рекомендаций
const recommender_code = '...';

sdk.recommend("... block code ...", {
  item: "100500",
  exclude: ["3", "14", "159", "26535"],
  search_query: "To be or not to be",
  extended: true,
  with_locations: true
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
  "id": 33,
  "link": "...",
  "title": "Скидки и распродажи",
  "html": "...",
  "recommends": [
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
      "picture": "https://pictures.nce.naumen.ru/resize-images/180/cfe99167fa99ee2d2c2098752b0ed3/16041.jpg",
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
            "Technodom"
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
  ]
}
```

:::warning Внимание

В будущем структура будет приведена к стандарту ответа:

```json
{
  "status": "success",
  "payload": {
    "recommender_block": {
      "id": 33,
      "link": "...",
      "title": "Скидки и распродажи",
      "html": "...",
      "products": []
    }
  }
}
```

Рекомендуем подготовить обработчик ответа под новую структуру, чтобы ваша интеграция не сломалась.

:::


Расшифровка свойств ответа:

| Свойство                                   | Тип      | Описание                                                                     |
|--------------------------------------------|----------|------------------------------------------------------------------------------|
| id                                         | Integer  | Внутренний идентификатор блока товарных рекомендаций                         |
| link                                       | String   | Ссылка с заголовка блока, если задана                                        |
| title                                      | String   | Заголовок блока                                                              |
| html                                       | String   | Сгенерированный HTML блока из шаблона, заданного в личном кабинете           |
| recommends[]                               | Array    | Массив рекомендованных товаров                                               |
| recommends[].name                          | String   | Название товара                                                              |
| recommends[].url                           | String   | Ссылка на товар                                                              |
| recommends[].url_handle                    | String   | Ссылка на товар без домена. Например: `/products/5575`                       |
| recommends[].deeplink_android              | String   | Диплинк на товар для Android                                                 |
| recommends[].deeplink_ios                  | String   | Диплинк на товар для iOS                                                     |
| recommends[].category_ids                  | String[] | Массив идентификаторов категорий товара                                      |
| recommends[].barcode                       | String   | Штрих-код товара                                                             |
| recommends[].vendor_code                   | String   | Vendor code из YML-файла                                                     |
| recommends[].brand                         | String   | Бренд товара                                                                 |
| recommends[].model                         | String   | Модель товара                                                                |
| recommends[].sales_rate                    | Integer  | Sales rate товара                                                            |
| recommends[].relative_sales_rate           | Integer  | Относительный sales rate товара                                              |
| recommends[].picture                       | String   | Ссылка на фотографию товара                                                  |
| recommends[].image_url                     | String   | Ссылка на фотографию товара                                                  |
| recommends[].image_url_handle              | String   | Ссылка на фотографию товара без домена                                       |
| recommends[].image_url_resized             | Object   | Объект ссылок на отресайзенную фотографию товара                             |
| recommends[].image_url_resized['120']      | String   | Ссылка на фотографию размером 120x120                                        |
| recommends[].image_url_resized['140']      | String   | Ссылка на фотографию размером 140x140                                        |
| recommends[].image_url_resized['160']      | String   | Ссылка на фотографию размером 160x160                                        |
| recommends[].image_url_resized['180']      | String   | Ссылка на фотографию размером 180x180                                        |
| recommends[].image_url_resized['200']      | String   | Ссылка на фотографию размером 200x200                                        |
| recommends[].image_url_resized['220']      | String   | Ссылка на фотографию размером 220x220                                        |
| recommends[].image_url_resized['310']      | String   | Ссылка на фотографию размером 310x310                                        |
| recommends[].image_url_resized['520']      | String   | Ссылка на фотографию размером 520x520                                        |
| recommends[].image_url_resized['original'] | String   | Ссылка на оригинал фотографии                                                |
| recommends[].categories[]                  | Array    | Массив с детальной информацией о категориях товара                           |
| recommends[].categories[].id               | String   | Идентификатор категории                                                      |
| recommends[].categories[].url              | String   | Ссылка на страницу категории                                                 |
| recommends[].categories[].name             | String   | Название категории                                                           |
| recommends[].categories[].level            | String   | Уровень вложенности категории от корня дерева                                |
| recommends[].categories[].name_with_parent | String   | Название категории с названием родительской категории                        |
| recommends[].categories[].url_handle       | String   | Ссылка на страницу категории без домена. Например: `/categories/smartphones` |
| recommends[].discount_percent              | Integer  | Размер скидки                                                                |
| recommends[].discount                      | Integer  | Размер скидки                                                                |
| recommends[].discount_formatted            | String   | Размер скидки со знаком %                                                    |
| recommends[].price_formatted               | String   | Отформатированная цена без копеек с символом валюты                          |
| recommends[].price_full_formatted          | String   | Отформатированная цена с копейками и символом валюты                         |
| recommends[].price                         | Integer  | Цена без копеек                                                              |
| recommends[].price_full                    | Float    | Цена с копейками                                                             |
| recommends[].oldprice_formatted            | String   | Отформатированная старая цена (до скидки) без копеек с символом валюты       |
| recommends[].oldprice_full_formatted       | String   | Отформатированная старая цена (до скидки) с копейками и символом валюты      |
| recommends[].oldprice                      | Integer  | Старая цена (до скидки) без копеек                                           |
| recommends[].oldprice_full                 | Float    | Старая цена (до скидки) с копейками                                          |
| recommends[].currency                      | String   | Символ валюты                                                                |
| recommends[]._id                           | String   | Внутренний идентификатор товара                                              |
| recommends[].id                            | String   | Внешний идентификатор (артикул) товара из вашей БД                           |
| recommends[].group_id                      | String   | Идентификатор группы товаров, если это один из вариантов товара              |
| recommends[].stock_quantity                | Integer  | Количество товара в наличии                                                  |
| recommends[].params[]                      | Array    | Массив параметров товара из товарного фида                                   |
| recommends[].params[].key                  | String   | Ключ параметра товара                                                        |
| recommends[].params[].values[]             | Array    | Массив строковых и числовых значений параметра товара                        |

В случае ошибки ответ будет в формате:

```json 
{
  "status": "error",
  "payload": {
    "message": "Shop not found"
  }
}
```