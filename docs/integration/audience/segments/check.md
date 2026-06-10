# Проверка, что пользователь находится в сегменте

Метод возвращает результат проверки, находился ли пользователь в конкретном сегменте или нет.

Метод может работать только как S2S.

```
POST https://api.rees46.ru/segments/includes
```

## Параметры

| Параметр     | Тип     | Обязателен? | Описание                                                |
|--------------|---------|-------------|---------------------------------------------------------|
| shop_id      | String  | Да          | API-ключ                                                |
| shop_secret  | String  | Да          | Секретный API-ключ                                      |
| segment_id   | Integer | Да          | Идентификатор сегмента                                  |
| email*       | String  | Да          | Email клиента                                           |
| phone*       | String  | Да          | Телефон клиента                                         |
| external_id* | String  | Да          | Внешний идентификатор клиента                           |
| loyalty_id*  | String  | Да          | Идентификатор участника во внешней программе лояльности |
| telegram_id* | String  | Да          | Telegram ID клиента                                     |

:::warning Обязательные свойства
Параметры, отмеченные [*] - обязателен хотя бы один из них.
:::

## Запрос

Пример запроса:
```shell [S2S]
# С обоими идентификаторами
curl -d "shop_id=...&shop_secret=...&email=...&phone=...&segment_id=..." https://api.rees46.ru/segments/includes

# Только с телефоном
curl -d "shop_id=...&shop_secret=...&phone=...&segment_id=..." https://api.rees46.ru/segments/includes

# Только с email
curl -d "shop_id=...&shop_secret=...&email=...&segment_id=..." https://api.rees46.ru/segments/includes
```

## Ответ

Пример ответа сервера:

```json
true
```

:::warning Внимание

В будущем структура будет приведена к стандарту ответа:

```json
{
  "status": "success",
  "payload": {
    "segment_id": 33,
    "result": true
  }
}
```

Рекомендуем подготовить обработчик ответа под новую структуру, чтобы ваша интеграция не сломалась.

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