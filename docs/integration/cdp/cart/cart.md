# Содержимое корзины клиента

Метод позволяет проверить, какие товары на данный момент находятся в корзине клиента. Данные аккумулируются из событий [добавления](../standard-events/cart.md) и [очистки корзины](../standard-events/remove-from-cart.md).

Метод сделан преимущественно для фронта, поэтому единственный параметр, который передается для идентификации клиента - `did`.

```
GET https://api.rees46.ru/products/cart
```

## Параметры

| Параметр | Тип     | Обязателен? | Описание                                       |
|---------|---------|-------------|------------------------------------------------|
| shop_id | String  | Да          | API-ключ                                       |
| did     | String  | Да          | [Идентификатор устройства](../entities/did.md) |

## Запрос

Пример запроса:

::: code-group

```shell [S2S]
curl https://api.rees46.ru/products/cart?shop_id=...&did=...
```

```javascript [JS SDK]
r46('cart', 'get', success, failure);
```

```swift [iOS] 
sdk.getProductsFromCart { result in
  switch result {
    case .success(let items):
      // Обработка ответа
    case .failure(let error):
      // Обработка ошибки
  }
}
```


```kotlin [Kotlin]
sdk.cartManager.getClientShoppingCartContent(
  onGetCartContent = { cartContent: CartContent ->
    // Обработка ответа
  },
  onError = { code: Int, msg: String? ->
    // Обработка ошибки
  }
)
```

```javascript [ReactNative]
// TODO Перепроверить
cart() {
  return new Promise((resolve, reject) => {
    this.push((() => {
      try {
        request('products/cart', {
          params: {
            shop_id: this.shop_id,
          },
        }).then( res => {
          resolve(res)
        });
      } catch (error) {
        reject(error)
      }
    }));
  })
}
```
:::

## Ответ

Пример ответа сервера:

```json
{
  "status": "success", 
  "data": { 
    "items": [ 
      { "uniqid": "SKU_1", "quantity": 1 }, 
      { "uniqid": "SKU_2", "quantity": 3 } 
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
    "cart_items": [
      { "uniqid": "SKU_1", "quantity": 1 },
      { "uniqid": "SKU_2", "quantity": 3 }
    ]
  }
}
```

Рекомендуем подготовить обработчик ответа под новую структуру, чтобы ваша интеграция не сломалась.

:::


Расшифровка свойств ответа:

| Свойство              | Тип     | Описание                                             |
|-----------------------|---------|------------------------------------------------------|
| status                | String  | Текстовый статус результата обработки запроса        |
| data                  | Object  | Объект с ответом                                     |
| data.items[]          | Array   | Список товаров                                       |
| data.items[].uniqid   | String  | Идентификатор (артикул) товара                       |
| data.items[].quantity | Integer | Количество этого товара в корзине                    |

В случае ошибки ответ будет в формате:

```json 
{
  "status": "error",
  "payload": {
    "message": "Shop not found"
  }
}
```