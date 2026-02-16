# Регистрация участника программы лояльности

Управление участниками ПЛ делается со стороны сервера. Это сделано в целях безопасности. Поэтому в SDK методов для работы с этим API нет.

```
POST https://api.rees46.ru/loyalty/members/join
```


## Параметры

| Параметр    | Обязателен? | Описание                                            |
|-------------|-------------|-----------------------------------------------------|
| shop_id     | Да          | API-ключ                                            |
| shop_secret | Да          | Секретный ключ API                                  |
| phone       | Да          | Номер телефона клиента, идентификатор участника ПЛ. |
| email       | Нет         | Email клиента                                       |
| first_name  | Нет         | Имя                                                 |
| last_name   | Нет         | Фамилия                                             |
| gender      | Нет         | Пол: `m` или `f`                                    |
| birthday    | Нет         | Дата рождения в формате `YYYY-MM-DD`                |

## Запрос

Пример запроса:

```shell 
curl --header "Content-Type: application/json" \
  --request POST \
  --data-binary "@payload.json" \
  https://api.rees46.ru/loyalty/members/join
```

Пример JSON-тела:

```json payload.json
{
    "shop_id": "...",
    "shop_secret": "...",
    "phone": "...",
    "email": "...",
    "first_name": "...",
    "last_name": "...",
    "gender": "...",
    "birthday": "..."
}
```

## Ответ

Пример ответа сервера:

```json 
{
  "success": true,
  "payload": {
    "message": "Member is registered successfully",
    "identifier": "..."
  }
}
```
