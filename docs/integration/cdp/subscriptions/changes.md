# Список изменений подписок и событий

Метод возвращает список событий изменения подписок и служебных событий с каналами и типами рассылок по всем клиентам или по конкретным указанным контактам.

Метод используется для обратной синхронизации подписок и журналов событий из CDP в ваши системы.

```
GET https://api.rees46.ru/subscriptions/changes
```

## Параметры

| Параметр    | Обязателен? | Описание                                                                             |
|-------------|-------------|--------------------------------------------------------------------------------------|
| shop_id     | Да          | API-ключ                                                                             |
| shop_secret | Да          | Секретный API-ключ                                                                   |
| event       | Нет         | Фильтр по событию                                                                    |
| channel     | Нет         | Фильтр по источнику события                                                          |
| from        | Нет         | Выборка, начиная с указанной даты в формате `YYYY-MM-DD`. По умолчанию 1 день назад. |
| to          | Нет         | Выборка, до указанной даты в формате `YYYY-MM-DD`. По умолчанию текущий день.        |
| email       | Нет         | Фильтровать по значению `email`                                                      |
| phone       | Нет         | Фильтровать по номеру телефона                                                       |
| offset      | Нет         | Смещение выборки для постраничного вывода. Минимум `0`.                              |
| limit       | Нет         | Количество событий в ответе. По-умолчанию и максимальное значение `20000`            |


## Запрос

Пример запроса:

```shell [S2S]
curl 'https://api.rees46.ru/subscriptions/changes?shop_id=...&shop_secret=...&email=...'
```

## Ответ

Пример ответа сервера:

```json 
[
  {
    "contact_type": "email",
    "contact": "email1@example.com",
    "campaign_type": "chain",
    "event": "subscribe",
    "channel": "popup",
    "datetime": "2020-09-24 14:42:36",
    "ip": "192.168.0.1"
  },
  {
    "contact_type": "email",
    "contact": "email2@example.com",
    "campaign_type": "bulk",
    "event": "unsubscribe",
    "channel": "unsubscribe_page",
    "datetime": "2020-09-23 14:43:36",
    "ip": "192.168.2.27"
  },
  {
    "contact_type": "email",
    "contact": "email3@example.com",
    "campaign_type": "bulk",
    "event": "hard_bounced",
    "channel": "email_processing",
    "datetime": "2020-09-23 14:43:36",
    "ip": "192.168.2.27"
  },
  {
    "contact_type": "sms",
    "contact": "+19990009999",
    "campaign_type": "transactional",
    "event": "subscribe",
    "channel": "crm",
    "datetime": "2020-09-25 14:43:36",
    "ip": "192.168.2.27"
  }
]
```

Расшифровка свойств ответа:

| Свойство      | Тип    | Описание                                                                                        |
|---------------|--------|-------------------------------------------------------------------------------------------------|
| `contact_type`  | String | Канал (тип контакта): `sms`, `email`, `mpush`, `wpush`, `whatsapp`, `telegram`, `max`, `wallet` |
| `contact`       | String | Значение контакта                                                                               |
| `campaign_type` | String | Тип рассылки: `bulk`, `chain`, `transactional`, `everything`                                    |
| `event`         | String | Событие: `subscribe`, `unsubscribe`, `hard_bounced`, `complained`, `blacklisted`                |
| `channel`       | String | Источник, откуда пришло событие: `api`, `js_sdk`, `unsubscribe_page`, `email_processing` и пр   |
| `datetime`      | String | Дата события в формате `YYYY-MM-DD H:i:s`                                                       |
| `ip`            | String | IP адрес, откуда пришло событие. Может быть пустым для некоторых каналов или источников         |

Расшифровка событий:


| Событие        | Описание                                                                             |
|----------------|--------------------------------------------------------------------------------------|
| `subscribe`    | Пользователь подписался на рассылку                                                  |
| `unsubscribe`  | Пользователь отписался от рассылки                                                   |
| `hard_bounced` | Попытка отправки сообщения на контакт завершилась ошибкой, что контакт не существует |
| `complained`   | Клиент пожаловался на спам                                                           |
| `blacklisted`  | Клиент добавлен в черный список                                                      |

Расшифровка источников событий:

| Источник                  | Описание                                                                  |
|---------------------------|---------------------------------------------------------------------------|
| email_feedback_processing | Обработка FBL. Только для `email`                                         |
| api                       | Запрос к [subscriptions/manage](./manage.md)                              |
| api_callback              | Запрос к [subscriptions/callback](./callback.md)                          |
| js_sdk                    | Из JS SDK                                                                 |
| mobile_sdk                | Из мобильных SDK                                                          |
| push_attributes           | Запрос к API методу `event/push_attributes`. Устарело                     |
| auto_collector            | Запрос к сервису `auto_collector`                                         |
| popup                     | Подписка через попап                                                      |
| import                    | Подписка через импорт аудитории                                           |
| crm                       | Подписка через карточку клиента в CRM                                     |
| bulk_sending              | Автоматический баунс во время отправки массовой рассылки                  |
| transactional_sending     | Автоматический баунс во время отправки транзакционной рассылки            |
| unsubscribe_page          | Клиент кликнул ссылку "отписаться" в письме                               |
| resubscribe_page          | Клиент кликнул ссылку "переподписаться" на странице подтверждения отписки |



В случае ошибки ответ будет в формате:

```json 
{
  "status": "error",
  "payload": {
    "message": "Invalid secret key"
  }
}
```

