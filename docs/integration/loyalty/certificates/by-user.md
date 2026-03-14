# Транзакции сертификата

Возвращает список всех именных сертификатов участника ПЛ. По ним, например, можно получить актуальный депозитный баланс, если просуммировать все значения полей `balance` для сертификатов в статусе `active`.

```
GET https://api.rees46.ru/loyalty/certificates/by-user
```

## Параметры

| Параметр    | Обязателен? | Описание                   |
|-------------|-------------|----------------------------|
| shop_id     | Да          | API-ключ                   |
| shop_secret | Да          | Секретный ключ API         |
| identifier  | Да          | Идентификатор участника ПЛ |

## Запрос

Пример запроса:

```shell 
curl https://api.rees46.ru/loyalty/loyalty/certificates/by-user?shop_id=...&shop_secret=...&identifier=...
```

## Ответ

Пример ответа сервера:

```json 
{
  "success": true,
  "payload": {
    "certificates": [
      {
        "certificate": { ... },
        "pool": { ... },
      },
      {
        "certificate": { ... },
        "pool": { ... },
      },
      ...
    ]
  }
}
```

Расшифровка ответа:

| Параметр                           | Описание                                      |
|------------------------------------|-----------------------------------------------|
| success                            | Запрос выполнен успешно или нет               |
| payload.certificates[]             | Список объектов (связка сертификата и пула)   |
| payload.certificates[].certificate | Объект [сертификата](./object-certificate.md) |
| payload.certificates[].pool        | Объект [пула сертификатов](./object-pool.md)  |

В случае ошибки ответ будет в формате:

```json 
{
  "success": false,
  "payload": {
    "message": "Code is not valid"
  }
}
```