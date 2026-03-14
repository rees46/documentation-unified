# Создание (генерация) сертификата

Метод позволяет создать по API новый сертификат для покупки его в режиме онлайн. Созданный сертификат еще не активен и требует активации [отдельным методом](./activate.md).

```
POST https://api.rees46.ru/loyalty/certificates
```

## Параметры

| Параметр    | Обязателен? | Описание                                           |
|-------------|-------------|----------------------------------------------------|
| shop_id     | Да          | API-ключ                                           |
| shop_secret | Да          | Секретный ключ API                                 |
| identifier  | Да          | Номер телефона клиента, идентификатор участника ПЛ |
| code        | Да          | Уникальный код пула сертификатов                   |
| nominal     | Нет         | Номинал сертификата для пула с гибким номиналом    |

## Запрос

Пример запроса:

```shell 
curl --header "Content-Type: application/json" \
  --request POST \
  --data-binary "@payload.json" \
  https://api.rees46.ru/loyalty/loyalty/certificates
```

Пример JSON-тела:

```json payload.json
{
    "shop_id": "...",
    "shop_secret": "...",
    "identifier": "7XXXXXXXXX",
    "code": "birthday",
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