# Запись свойств профиля

Метод позволяет обогащать профиль текущего владельца устройства дополнительными данными. Кейсы использования:

1. Посетитель выбрал свой город. Нужно сохранить его в профиль.
2. Посетитель авторизовался. Нужно привязать устройство к профилю с его логином или другим [идентификатором](../entities/identifier.md).
3. Посетителю нужно записать в профиль кастомные свойства.

Этот метод является основным способом обработки переключения устройства между разными пользователями. Допустим, последний раз компьютером пользовался профиль с email `husband@family.example`. Далее, если пользователь продолжает пользоваться устройством, CDP считает, что все действия должны сохраняться в профиль `husband@family.example`. Но, если пользователь авторизуется с email `wife@family.example`, то устройство будет переключено на этот профиль и поведенческие данные текущей сессии будут перенесены к нему же. 

:::warning Важно
Лучший способ настроить интеграцию: вызывать этот метод на каждой странице сайта. Иногда разработчики вызывают его только один раз: например, при смене города или при авторизации. Но запрос не всегда может дойти до API и в профиле окажутся неактуальные данные. Поэтому важно вызывать метод на каждой странице. Минимальный набор данных для отправки: текущий выбранный город и [идентификатор](../entities/identifier.md) клиента.
:::

```
POST https://api.rees46.ru/profile/set
```

## Параметры

| Параметр                      | Обязателен? | Описание                                                                                                                |
|-------------------------------|-------------|-------------------------------------------------------------------------------------------------------------------------|
| shop_id                       | Да          | API-ключ                                                                                                                |
| did*                          | Да          | Идентификатор устройства                                                                                                |
| email*                        | Нет         | Email клиента                                                                                                           |
| phone*                        | Нет         | Телефон клиента                                                                                                         |
| external_id*                  | Нет         | Внешний идентификатор клиента                                                                                           |
| loyalty_id*                   | Нет         | Идентификатор внешней программы лояльности клиента                                                                      |
| telegram_id*                  | Нет         | Telegram ID клиента                                                                                                     |
| fb_id                         | Нет         | Идентификатор в FB                                                                                                      |
| vk_id                         | Нет         | Идентификатор в VK                                                                                                      |
| google_advertising_id         | Нет         | Идентификатор в Google Ads                                                                                              |
| apple_advertising_id          | Нет         | Идентификатор в Apple Ads                                                                                               |
| yandex_id                     | Нет         | Идентификатор в Яндекс Директ                                                                                           |
| loyalty_card_location         | Нет         | Место выдачи карты лояльности для внешней программы лояльности (deprecated)                                             |
| loyalty_status                | Нет         | Статус во внешней программы лояльности (deprecated)                                                                     |
| loyalty_bonuses               | Нет         | Бонусный баланс во внешней программы лояльности (deprecated)                                                            |
| loyalty_bonuses_to_next_level | Нет         | Количество бонусов до следующего уровня во внешней программы лояльности (deprecated)                                    |
| gender                        | Нет         | Пол. Значения: `m` и `f`                                                                                                |
| location                      | Нет         | Текущий город: идентификатор локации из товарного фида                                                                  |
| first_name                    | Нет         | Имя                                                                                                                     |
| last_name                     | Нет         | Фамилия                                                                                                                 |
| age                           | Нет         | Возраст в годах                                                                                                         |
| birthday                      | Нет         | Дата рождения в формате `YYYY-MM-DD`                                                                                    |
| bought_something              | Нет         | Булевый флаг, покупал ли пользователь что-нибудь когда-нибудь (deprecated)                                              |
| kids[]                        | Нет         | Массив информации о детях (KidObject)                                                                                   |
| auto[]                        | Нет         | Массив информации об автомобилях (AutoObject)                                                                           |
| [a-z0-9_]+                    | Нет         | Любые кастомные свойства переменные, созданные в личном кабинете. Ключ переменной состоит из латинских букв, цифр и `_` | 

:::info Идентификаторы
Параметры, отмеченные [*] - обязателен хотя бы один из них. На стороне сайта или мобильных приложений SDK автоматически передает `did`.
:::

### Структура `KidObject`

```json 
{
  "gender": "m",
  "birthday": "YYYY-MM-DD"
}
```

| Параметр                      | Обязателен? | Описание                                                                                                                |
|-------------------------------|-------------|-------------------------------------------------------------------------------------------------------------------------|
| gender                        | Нет         | Пол. Значения: `m` и `f`                                                                                                |
| birthday                      | Нет         | Дата рождения в формате `YYYY-MM-DD`                                                                                    |

### Структура `AutoObject`

```json 
{
  "brand": "mini",
  "model": "countryman",
  "vds": "..."
}
```

| Параметр | Обязателен? | Описание          |
|----------|-------------|-------------------|
| mini     | Нет         | Марка автомобиля  |
| model    | Нет         | Модель автомобиля |
| vds      | Нет         | VIN-номер         |


## Запрос

Пример запроса:

::: code-group

```shell [S2S]
// Базовый пример
curl 'https://api.rees46.ru/profile/set' \
    -X 'POST' \
    -H 'Content-Type: application/json' \
    --data-raw '{"shop_id":"SHOP_ID", "shop_secret":"SHOP_SECRET", "email":"EMAIL", "gender":"m"}'
```

```javascript [JS SDK]
// Стандартные свойства
r46('profile', 'set', {
  "email": "test@example.com",
  "id": "123456789",
  "loyalty_id": "987654321",
  "phone": "19991005000",
  "first_name": "Jane",
  "last_name": "Smith",
  "location": "sdsdfsdfsdf",
  "kids": [
    {"gender": "m", "birthday": "2017-06-04"},
    {"gender": "f", "birthday": "2014-02-10"},
    {"gender": "m", "birthday": "2014-03-17"}
  ]
});

// Кастомные свойства
r46('profile', 'set', {
  "string": "sdsdfsdfsdf",
  "int": 123,
  "float": 123.12,
  "list_element": ["first", "second"],
  "json": {"key": "val", "key2": "val2"},
  "date": "2022-08-26"
});
```

```swift [iOS] 
// Стандартные свойства
// В будущем ключи будут переделаны на полное соответствие параметрам в API: DEV-4068
sdk.setProfileData(
  userEmail: "YOUR_EMAIL",
  userPhone: "YOUR_PHONE",
  userLoyaltyId: "YOUR_LOYALTY_ID",
  birthday: Date(),
  age: 30,
  firstName: "YOUR_NAME",
  lastName: "YOUR_LAST_NAME",
  location: "YOUR_LOCATION",
  gender: .male,
  fbID: "YOUR_FB_ID",
  vkID: "YOUR_VK_ID",
  telegramId: "YOUR_TG_ID",
  loyaltyCardLocation: "LOYALTY_CARD_LOCATION",
  loyaltyStatus: "LOYALTY_SATUS",
  loyaltyBonuses: 100,
  loyaltyBonusesToNextLevel: 200,
  boughtSomething: true,
  userId: "YOUR_USER_ID",
)

// Кастомные свойства
let stringArray = ["item1", "item2", "item3"]
let intArray = [1, 2, 3, 4, 5]
let floatArray: [Float] = [1.1, 2.2, 3.3]
let boolArray = [true, false, true]
let dateArray = [Date(),Date(),Date()]
let object: [String: Any] = [
  "string_example": "stringValue",
  "integer_example": 123,
  "float_example": 45.67,
  "boolean_example": true,
  "date_example": Date(),
  "array_example": [1, 2, 3],
  "nested_object_example": [
  "nested_string_example": "nestedValue",
  "nested_integer_example": 456
]
let customProperties: [String: Any] = [
  "string_array_example": stringArray,
  "int_array_example": intArray,
  "float_array_example": floatArray,
  "bool_array_example": boolArray,
  "date_array_example": dateArray,
  "custom_object_example": object
]
sdk.setProfileData(
  customProperties: customProperties
)
```


```kotlin [Kotlin]
// Обычные свойства
val params = ProfileParams.Builder()
  .put("email", "YOUR_EMAIL")
  .put("phone", "YOUR_PHONE")
  .put("loyalty_id", "YOUR_LOYALTY_ID")
  .put("location", "Moscow")
  .put("birthday", Date())
sdk.profile(params, object : OnApiCallbackListener() {
  override fun onSuccess(response: JSONObject?) {
    Log.i(TAG, "Response: $response") // Logs the API response
  }
})

// Сложные свойства в виде массивов и объектов
val stringArray = arrayOf("item1", "item2", "item3")
val intArray = arrayOf(1, 2, 3, 4, 5)
val floatArray = arrayOf(1.1f, 2.2f, 3.3f)
val boolArray = arrayOf(true, false, true)
val dateArray = arrayOf(Date(), Date(), Date())
val nestedObject = JSONObject().apply {
  put("nested_string_example", "nestedValue")
  put("nested_integer_example", 456)
}
val customObject = JSONObject().apply {
  put("string_example", "stringValue")
  put("integer_example", 123)
  put("float_example", 45.67f)
  put("boolean_example", true)
  put("date_example", Date())
  put("array_example", JSONArray(arrayOf(1, 2, 3)))
  put("nested_object_example", nestedObject)
}
val customObjectArray = arrayOf(customObject, customObject)
val params = ProfileParams.Builder()
  .put("string_array_example", stringArray)
  .put("int_array_example", intArray)
  .put("float_array_example", floatArray)
  .put("bool_array_example", boolArray)
  .put("date_array_example", dateArray)
  .put("custom_object_example", customObject)
  .put("custom_objects_array_example", customObjectArray)
sdk.profile(params, object : OnApiCallbackListener() {
  override fun onSuccess(response: JSONObject?) {
    Log.i(TAG, "Response: $response") // Logs the API response
  }
})
```


```java [Java (deprecated)]
// Базовый пример
HashMap<String, String> params = new HashMap<>();
params.put("email", "email@example.com");
REES46.profile(params);

// С коллбэком
REES46.profile(params, new Api.OnApiCallbackListener() {
  @Override
  public void onSuccess(JSONObject response) {
      Log.i(TAG, "Response: " + response.toString());
  }
});
```


```javascript [ReactNative]
const params = {
  external_id: 100500,
  email: "john.doe@examplemail.com",
  phone: "4400114527199",
  first_name: "John",
  last_name: "Doe",
  birthday: "1990-03-11",
  age: 31,
  gender: "m",
  location: "NY",
  bought_something: true,
  loyalty_id: "000001234567",
  loyalty_card_location: "NY",
  loyalty_status: "5% discount",
  loyalty_bonuses: 1123,
  loyalty_bonuses_to_next_level: 1877,
  fb_id: "000000000354677",
  vk_id: "vk031845",
  telegram_id: "0125762968357835",
  kids: [
    {gender: "m", birthday: "2001-04-12"},
    {gender: "f", birthday: "2015-07-28"}
  ],
  auto: [
    {brand: "Nissan", model: "Qashqai", vds: "TM7N243E4G0BJG978"}
  ],
  custom_property_1: [1,2,3],
  custom_property_2: ["a", "b", "c"]
};

sdk.setProfile(params);
```
:::


## Ответ

Пример ответа сервера:

```json 
{
  "status": "success"
}
```

В случае ошибки ответ будет в формате:

```json 
{
  "status": "error",
  "payload": {
    "message": "Identifier is not valid"
  }
}
```