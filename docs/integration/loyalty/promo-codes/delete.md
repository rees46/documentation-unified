# Удалить промокоды из списка

Метод удаляет из указанного списка промокоды, перечисленные в переменной `codes`.

```
DELETE https://api.rees46.ru/promo_codes/delete
```

## Параметры

| Параметр            | Обязателен? | Описание                        |
|---------------------|-------------|---------------------------------|
| shop_id             | Да          | API-ключ                        |
| shop_secret         | Да          | Секретный API-ключ              |
| promo_code_list_id  | Да          | Идентификатор списка промокодов |
| codes               | Да          | Массив промокодов для удаления  |


## Запрос

Пример запроса:

::: code-group

```shell [S2S]
curl --header "Content-Type: application/json" \
  --request DELETE \
  --data-binary "@data.json" \
  https://api.rees46.ru/promo_codes/delete
```
:::

Пример JSON-тела:

```json payload.json
{
    "shop_id": "...",
    "shop_secret": "...",
    "promo_code_list_id": 715,
    "codes": ["abc", "aaa", "xyz"]
}
```

## Ответ

Пример ответа сервера:

```json 
{ 
  "status": "success",
  "payload": {
    "deleted_count": 300,
    "not_found_count": 15
  }
}
```

Расшифровка ответа:

| Параметр                | Описание                                                                        |
|-------------------------|---------------------------------------------------------------------------------|
| status                  | Статус запроса                                                                  |
| payload                 | Объект с ответом                                                                |
| payload.deleted_count   | Количество промокодов, которые удалось найти и удалить                          |
| payload.not_found_count | Количество промокодов, которых не оказалось в списке или они были удалены ранее |

В случае ошибки ответ будет в формате:

```json 
{
  "success": false,
  "payload": {
    "message": "Shop not found"
  }
}
```