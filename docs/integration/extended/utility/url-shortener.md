# Сервис сокращения ссылок

Сервис позволяет сокращать ссылки по одной или сразу по несколько штук. API работает только в случае, если для кластера on-premise или white-label задан домен для коротких ссылок.

В SaaS-версии REES46 домен коротких ссылок по-умолчанию: `rlnq.ru`.


```
POST https://api.rees46.ru/url/create
```

## Параметры

| Параметр         | Обязателен? | Описание                                                                              |
|------------------|-------------|---------------------------------------------------------------------------------------|
| shop_id          | Да          | API-ключ                                                                              |
| shop_secret      | Да          | Секретный ключ API                                                                    |
| links            | Да          | Список ссылок для сокращения                                                          |
| links[]          | Да          | Объект ссылки                                                                         |
| links[].url      | Да          | Исходный URL для сокращения                                                           |
| links[].lifetime | Нет         | Время жизни сокращенной ссылки в днях. По-умолчанию `30`, не более `90`, не менее `1` |

## Запрос

Пример запроса:

```shell 
curl --header "Content-Type: application/json" \
  --request POST \
  --data-binary "@payload.json" \
  https://api.rees46.ru/url/create
```

Пример JSON-тела:

```json payload.json
{
  "shop_id": "...",
  "shop_secret": "...",
  "links": [
    {
      "url": "https://example.com/page/1/?utm_source=source..."
    },
    {
      "url": "https://example.com/page/2/?utm_source=source...",
      "lifetime": 60
    },
    {
      "url": "https://example.com/page/3/?utm_source=source...",
      "code": "a",
      "lifetime": 10
    }
  ]
}
```

## Ответ

Пример ответа сервера:

```json 
[
  {
    "source": "https://example.com/page/1",
    "url": "https://r46.dev/x27FyAlR"
  },
  {
    "source": "https://example.com/page/2",
    "url": "https://r46.dev/a"
  }
]
```

:::warning Важно
Формат ответа устарел. В будущем он будет приведен к формату:

```json
{
  "success": true,
  "payload": {
    "urls": [
      {
        "source": "https://example.com/page/1",
        "url": "https://r46.dev/x27FyAlR"
      },
      {
        "source": "https://example.com/page/2",
        "url": "https://r46.dev/a"
      }
    ]
  }
}
```
:::

В случае ошибки ответ будет в формате:

```json 
{
  "success": false,
  "payload": {
    "message": "Identifier is not valid"
  }
}
```

