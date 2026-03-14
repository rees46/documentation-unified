# Активация сертификата

Метод активирует созданный ранее неактивный сертификат. После активации сертификат либо будет работать сразу либо активируется через указанное в пуле количество дней задержки активации.

```
PATCH https://api.rees46.ru/loyalty/certificates/activate
```

## Параметры

| Параметр         | Обязателен? | Описание                                          |
|------------------|-------------|---------------------------------------------------|
| shop_id          | Да          | API-ключ                                          |
| shop_secret      | Да          | Секретный ключ API                                |
| code             | Да          | Уникальный код сертификата                        |
| nominal          | Нет         | Номинал сертификата для пула с гибким номиналом   |
| owner_identifier | Нет         | Идентификатор участника ПЛ, владельца сертификата |
| owner_name       | Нет         | Имя участника ПЛ, владельца сертификата           |

## Запрос

Пример запроса:

```shell 
curl --header "Content-Type: application/json" \
  --request PATCH \
  --data-binary "@payload.json" \
  https://api.rees46.ru/loyalty/loyalty/certificates/activate
```

Пример JSON-тела:

```json payload.json
{
    "shop_id": "...",
    "shop_secret": "...",
    "owner_identifier": "7XXXXXXXXX",
    "owner_name": "Геннадий",
    "code": "birthday-ad123u13",
    "nominal": 5000
}
```

## Ответ

Пример ответа сервера:

```json 
{
  "success": true,
  "payload": {
    "certificate": { ... },
    "pool": { ... }
  }
}
```

Расшифровка ответа:

| Параметр                                    | Описание                                      |
|---------------------------------------------|-----------------------------------------------|
| success                                     | Запрос выполнен успешно или нет               |
| payload.certificate                         | Объект [сертификата](./object-certificate.md) |
| payload.pool                                | Объект [пула сертификатов](./object-pool.md)  |

В случае ошибки ответ будет в формате:

```json 
{
  "success": false,
  "payload": {
    "message": "Identifier is not valid"
  }
}
```