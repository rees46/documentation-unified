# Баланс стикеров

Возвращает текущий баланс стикеров клиента.

```
GET https://api.rees46.ru/loyalty/stickers/balance
```

## Параметры

| Параметр    | Обязателен? | Описание                                     |
|-------------|-------------|----------------------------------------------|
| shop_id     | Да          | API-ключ                                     |
| shop_secret | Да          | Секретный ключ API                           |
| identifier  | Да          | Идентификатор участника программы лояльности |

## Запрос

Пример запроса:

```shell 
curl https://api.rees46.ru/loyalty/stickers/balance?shop_id=...&shop_secret=...&identifier=...
```

## Ответ

Пример ответа сервера:

```json 
{
  "success": true,
  "payload": {
    "stickers": [
      {
        "campaign_id": 113,
        "campaign_code": "...",
        "campaign_name": "...",
        "campaign_status": "...",
        "amount": 13
      },
      {
        "campaign_id": 2,
        "campaign_code": "...",
        "campaign_name": "...",
        "campaign_status": "...",
        "amount": 24
      }
    ]
  }
}
```

Расшифровка ответа:

| Параметр                           | Описание                         |
|------------------------------------|----------------------------------|
| success                            | Запрос выполнен успешно или нет  |
| payload.sticker                    | Массив стикеров                  |
| payload.stickers[]                 | Объект стикера                   |
| payload.stickers[].campaign_id     | Идентификатор стикерной кампании |
| payload.stickers[].campaign_code   | Уникальный код кампании          |
| payload.stickers[].campaign_name   | Название кампании                |
| payload.stickers[].campaign_status | Статус кампании                  |
| payload.stickers[].amount          | Количество свободных стикеров    |

В случае ошибки ответ будет в формате:

```json 
{
  "success": false,
  "payload": {
    "message": "Shop not found"
  }
}
```