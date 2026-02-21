# Проверка QR-кода 

На кассе кассир сканирует штрих-код или QR-код, касса получает строку с кодом в формате `7XXXXXXXXXX-NNNN` и отправляет запрос на данный метод, чтобы проверить, валиден ли QR-код или нет.

```
POST https://api.rees46.ru/loyalty/qr/check
```

## Параметры

| Параметр          | Обязателен? | Описание                                     |
|-------------------|-------------|----------------------------------------------|
| shop_id           | Да          | API-ключ                                     |
| shop_secret       | Да          | Секретный ключ API                           |
| identifier        | Да          | Идентификатор участника программы лояльности |

## Запрос

Пример запроса:

```shell 
curl --header "Content-Type: application/json" \
  --request POST \
  --data-binary "@payload.json" \
  https://api.rees46.ru/loyalty/qr/get
```

Пример JSON-тела:

```json payload.json
{
    "shop_id": "...",
    "shop_secret": "...",
    "code": "7XXXXXXXXX-NNNN"
}
```


## Ответ

Пример ответа сервера:

```json 
{
  "success": true
}
```

В случае ошибки запроса или невалидного кода ответ будет в формате:

```json 
{
  "success": false
}
```
