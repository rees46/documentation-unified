# Регистрация участника программы лояльности

Управление участниками ПЛ делается со стороны сервера. Это сделано в целях безопасности. Поэтому в SDK методов для работы с этим API нет.

```
POST https://api.rees46.ru/loyalty/members/join
```


## Параметры

| Параметр    | Обязателен? | Описание                                           |
|-------------|-------------|----------------------------------------------------|
| shop_id     | Да          | API-ключ                                           |
| shop_secret | Да          | Секретный ключ API                                 |
| phone       | Да          | Номер телефона клиента, идентификатор участника ПЛ |
| email       | Нет         | Email клиента                                      |
| first_name  | Нет         | Имя                                                |
| last_name   | Нет         | Фамилия                                            |
| gender      | Нет         | Пол: `m` или `f`                                   |
| birthday    | Нет         | Дата рождения в формате `YYYY-MM-DD`               |

## Запрос

Пример запроса:

::: code-group

```shell [S2S]
curl --header "Content-Type: application/json" \
  --request POST \
  --data-binary "@payload.json" \
  https://api.rees46.ru/loyalty/members/join
```

```javascript [JS SDK]
r46('loyalty', 'join', {
  phone:     '79991234567',   // Обязательный параметр
  email:     'en@rees46.ru',
  firstName: 'Иван',
  lastName:  'Петров',
}, function (response) {
  console.log(response);
}, function (error) {
  // Ошибка запроса
  console.error(error);
});

```
:::

:::info Важно
Чтобы работал метод в JS SDK, необходимо активировать настройку, разрешающую выполнение этого метода с фронта. Для этого свяжитесь с поддержкой.
:::

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
  "status": "success",
  "payload": {
    "message": "Member is registered successfully",
    "identifier": "..."
  }
}
```

Расшифровка ответа:

| Параметр           | Описание                                                             |
|--------------------|----------------------------------------------------------------------|
| success            | Запрос выполнен успешно или нет                                      |
| payload.message    | Сообщение с результатом обработки запроса                            |
| payload.identifier | Идентификатор участника программы лояльности в формате `7XXXXXXXXXX` |