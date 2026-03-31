# Отправка файлов

Если вы отправляете `email`, то к нему можно приложить файлы. Но сделать это можно отправляя запрос в формате `multipart/form-data`, а не JSON:

```shell [FormData]
curl --location --request POST 'https://api.rees46.ru/transact' \
--form 'file_name=@"local_file_path/local_file_name"' \
--form 'file_name_2=@"local_file_path/local_file_name_2"' \
--form 'shop_id="SHOP_ID"' \
--form 'shop_secret="SHOP_SECRET"' \
--form 'code="TRANSACTIONAL_MESSAGE_CODE"' \
--form 'email="EMAIL"' \
--form 'variables[KEY]="VALUE"' \
--form 'variables[KEY_2]="VALUE_2"'
```

:::info Ограничения
Суммарный вес всех отправляемых файлов не может превышать 10 мегабайт.
:::