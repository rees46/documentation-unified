# Счетчики товара

Метод возвращает статистическую информацию о взаимодействии посетителей с товаром.

```
GET https://api.rees46.ru/products/counters
```

## Параметры

| Параметр | Тип     | Обязателен? | Описание                                                                  |
|----------|---------|-------------|---------------------------------------------------------------------------|
| shop_id  | String  | Да          | API-ключ                                                                  |
| item     | String  | Да          | Артикул (идентификатор) товара                                            |

## Запрос

Пример запроса:

::: code-group

```shell [S2S]
curl https://api.rees46.ru/products/counters?shop_id=...&item=...
```

```javascript [JS SDK]
r46('products', 'counters', ITEM, success, error)
```

```swift [iOS] 
// TODO Сделать
```


```kotlin [Kotlin]
// TODO Сделать
```

```java [Java (deprecated)] 
// Не планируется
```

```javascript [ReactNative]
// TODO Сделать
```
:::

## Ответ

Пример ответа сервера:

```json
{
  "daily": {
    "view": 0,
    "cart": 0,
    "purchase": 0
  },
  "now": {
    "view": 0,
    "cart": 0,
    "purchase": 0
  },
  "triggers": {
    "back_in_stock": 0,
    "price_drop": 0
  }
}
```

:::warning Внимание

В будущем структура будет приведена к стандарту ответа:

```json
{
  "status": "success",
  "payload": {
    "counters": {
      "daily": {
        "view": 0,
        "cart": 0,
        "purchase": 0
      },
      "now": {
        "view": 0,
        "cart": 0,
        "purchase": 0
      },
      "triggers": {
        "back_in_stock": 0,
        "price_drop": 0
      }
    }
  }
}
```

Рекомендуем подготовить обработчик ответа под новую структуру, чтобы ваша интеграция не сломалась.

:::


Расшифровка свойств ответа:

| Свойство               | Тип     | Описание                                                     |
|------------------------|---------|--------------------------------------------------------------|
| daily                  | Object  | Объект статистики за день                                    |
| daily.view             | Integer | Количество просмотров товара за день                         |
| daily.cart             | Integer | Количество добавлений товара в корзину за день               |
| daily.purchase         | Integer | Количество покупок товара за день                            |
| now                    | Object  | Объект статистики за последние 30 минут                      |
| now.view               | Integer | Количество просмотров товара за последние 30 минут           |
| now.cart               | Integer | Количество добавлений товара в корзину за последние 30 минут |
| now.purchase           | Integer | Количество покупок товара за последние 30 минут              |
| triggers               | Object  | Статистика по подпискам на товар                             |
| triggers.back_in_stock | Integer | Количество подписок на появление товара в наличии            |
| triggers.price_drop    | Integer | Количество подписок на снижение цены товара                  |

В случае ошибки ответ будет в формате:

```json 
{
  "status": "error",
  "payload": {
    "message": "Shop not found"
  }
}
```