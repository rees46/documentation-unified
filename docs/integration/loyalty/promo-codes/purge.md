# Очистить список промокодов

Метод удаляет все не отправленные промокоды из указанного списка. Если промокод был отмечен как отправленный клиенту, он из списка не удаляется.

```
DELETE https://api.rees46.ru/promo_codes/purge
```

## Параметры

| Параметр    | Обязателен? | Описание                        |
|-------------|-------------|---------------------------------|
| shop_id     | Да          | API-ключ                        |
| shop_secret | Да          | Секретный API-ключ              |
| id          | Да          | Идентификатор списка промокодов |


## Запрос

Пример запроса:

::: code-group

```shell [S2S]
curl --header "Content-Type: application/json" \
  --request DELETE \
  --data-binary "@data.json" \
  https://api.rees46.ru/promo_codes/purge
```
:::

Пример JSON-тела:

```json payload.json
{
    "shop_id": "...",
    "shop_secret": "...",
    "id": 715
}
```

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
  "success": false,
  "payload": {
    "message": "Shop not found"
  }
}
```