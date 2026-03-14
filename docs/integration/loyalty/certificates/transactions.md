# Транзакции сертификата

Возвращает список всех транзакций сертификата.

```
GET https://api.rees46.ru/loyalty/certificates/transactions
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
curl https://api.rees46.ru/loyalty/loyalty/certificates/transactions?shop_id=...&shop_secret=...&code=...
```

## Ответ

Пример ответа сервера:

```json 
{
  "success": true,
  "payload": {
    "transactions": [...],
    "certificate": { ... },
    "pool": { ... }
  }
}
```

Расшифровка ответа:

| Параметр               | Описание                                              |
|------------------------|-------------------------------------------------------|
| success                | Запрос выполнен успешно или нет                       |
| payload.transactions[] | Список объектов [транзакций](./object-transaction.md) |
| payload.certificate    | Объект [сертификата](./object-certificate.md)         |
| payload.pool           | Объект [пула сертификатов](./object-pool.md)          |

В случае ошибки ответ будет в формате:

```json 
{
  "success": false,
  "payload": {
    "message": "Code is not valid"
  }
}
```