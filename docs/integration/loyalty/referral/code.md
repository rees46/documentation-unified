# Коды реферального партнера

Метод выводит коды всех реферальных программ, в которых участвует партнер.

Если реферальная программа неактивна (черновик или архив), то код такой программы в ответе отсутствует.

```
GET https://api.rees46.ru/loyalty/members/status
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
curl https://api.rees46.ru/loyalty/referral/code?shop_id=...&shop_secret=...&identifier=...
```

## Ответ

Пример ответа сервера:

```json
{
  "success": true,
  "payload": {
    "message": "Success",
    "codes": [
      {
        "referral_program_id": 1,
        "code": "XXX-YYY-ZZZ",
        "description": "..."
      },
      {
        "referral_program_id": 2,
        "code": "#mastermain",
        "description": null
      }
    ]
  }
}
```

Расшифровка ответа:

| Параметр                            | Описание                                  |
|-------------------------------------|-------------------------------------------|
| success                             | Запрос выполнен успешно или нет           |
| payload.message                     | Текст ответа                              |
| payload.codes                       | Список кодов                              |
| payload.codes[]                     | Объект кода реферальной программы         |
| payload.codes[].referral_program_id | Идентификатор реферальной программы       |
| payload.codes[].code                | Уникальный код партнера                   |
| payload.codes[].description         | Описание реферальной программы, если есть |

В случае ошибки ответ будет в формате:

```json 
{
  "success": false,
  "payload": {
    "message": "Identifier is not valid"
  }
}
```