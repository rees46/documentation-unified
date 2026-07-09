# Принудительная смена `external_id` в профиле


Метод принудительно перезаписывает `external_id` профиля в обход основного алгоритма работы платформы с [идентификаторами](../entities/identifier.md).

- Если профиль с новым `new_external_id` уже существует, то у него `external_id` будет обнулен.
- Если профиль со старым `old_external_id` не существует, то метод вернет 404 ошибку.

:::warning Внимание
Это потенциально опасная операция, которая влияет на несколько профилей. Рекомендуем не использовать этот метод.
:::

```
POST https://api.rees46.ru/profile/force_change_id
```

## Параметры

| Параметр                     | Обязателен? | Описание                                                                                                                                                                         |
|------------------------------|-------------|----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| shop_id                      | Да          | API-ключ                                                                                                                                                                         |
| shop_secret                  | Да          | Секретный API-ключ                                                                                                                                                               |
| old_external_id              | Да          | Существующий `external_id` профиля, который нужно заменить                                                                                                                       |
| new_external_id              | Да          | Новый `external_id` профиля, на который нужно заменить                                                                                                                           |
| i_understand_what_i_am_doing | Да          | Флаг, который гарантирует, что вы понимаете, что делаете и осознаете последствия. Допустимо любое `true` значение: `true`, `1`, `yes`, `believe me I know what I am doing` и пр. |


## Запрос

Пример запроса:

```shell [S2S]
// Базовый пример
curl 'https://api.rees46.ru/profile/force_change_id' \
    -X 'POST' \
    -H 'Content-Type: application/json' \
    --data-raw '{"shop_id":"SHOP_ID", "shop_secret":"SHOP_SECRET", "old_external_id":"...", "new_external_id": "...", "i_understand_what_i_am_doing": true}'
```

## Ответ

Пример ответа сервера:

```json 
{
  "status": "success"
}
```

В случае ошибки ответ будет в формате:

```json 
{
  "status": "error",
  "payload": {
    "message": "Profile with `old_external_id` not found"
  }
}
```