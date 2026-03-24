# Список всех акций

Возвращает список всех активных акций, работающих в указанном стриме, независимо от настроек активности акций по часам, дням недели и датам. Метод полезен, если вы хотите вывести все существующие незаархивированные акции на одной странице.

```
GET https://api.rees46.ru/loyalty/promos
```

## Параметры

| Параметр             | Обязателен? | Описание                                                                       |
|----------------------|-------------|--------------------------------------------------------------------------------|
| shop_id              | Да          | API-ключ                                                                       |
| shop_secret          | Да          | Секретный ключ API                                                             |
| stream               | Нет         | Стрим                                                                          |

## Запрос

Пример запроса:

```shell 
curl https://api.rees46.ru/loyalty/promos?shop_id=...&shop_secret=...&stream=mobile
```

## Ответ

Пример ответа сервера:

```json 
{
  "success": true,
  "payload": {
    "promotions": [
      {
        "id": 33,
        "name": "...",
        "start_date": "2026-01-01",
        "finish_date": "2026-01-14",
        "stream": "ios",
        "badge_label": "-50%",
        "badge_color": "#AABB00",
        "description": "..."
      },
      {
        "id": 12,
        "name": "...",
        "start_date": "2026-01-01",
        "finish_date": "2026-01-14",
        "stream": null,
        "badge_label": "1+1=3",
        "badge_color": "#AA0000",
        "description": "..."
      }
    ]
  }
}
```

Расшифровка ответа:

| Параметр                         | Описание                         |
|----------------------------------|----------------------------------|
| success                          | Запрос выполнен успешно или нет  |
| payload.promotions               | Массив акций                     |
| payload.promotions[]             | Объект акции                     |
| payload.promotions[].id          | Идентификатор акции              |
| payload.promotions[].name        | Название акции                   |
| payload.promotions[].description | Описание акции                   |
| payload.promotions[].start_date  | Дата начала действия акции       |
| payload.promotions[].finish_date | Дата окончания действия акции    |
| payload.promotions[].stream      | Стрим, в котором действует акция |
| payload.promotions[].badge_label | Текст бейджа                     |
| payload.promotions[].badge_color | Цвет бейджа                      |

В случае ошибки ответ будет в формате:

```json 
{
  "success": false,
  "payload": {
    "message": "Shop not found"
  }
}
```