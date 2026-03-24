# Деактивация сертификата

Перманентно деактивирует сертификат. Деактивированный сертификат невозможно использовать для оплаты и невозможно восстановить.

```
PATCH https://api.rees46.ru/loyalty/certificates/activate
```

## Параметры

| Параметр         | Обязателен? | Описание                                          |
|------------------|-------------|---------------------------------------------------|
| shop_id          | Да          | API-ключ                                          |
| shop_secret      | Да          | Секретный ключ API                                |
| code             | Да          | Уникальный код сертификата                        |

## Запрос

Пример запроса:

```shell 
curl --header "Content-Type: application/json" \
  --request PATCH \
  --data-binary "@payload.json" \
  https://api.rees46.ru/loyalty/certificates/deactivate
```

Пример JSON-тела:

```json payload.json
{
    "shop_id": "...",
    "shop_secret": "...",
    "code": "birthday-ad123u13"
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
    "message": "Code is not valid"
  }
}
```