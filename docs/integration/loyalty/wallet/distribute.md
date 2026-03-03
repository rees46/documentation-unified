# Передача пассов клиентам

Каждый пасс содержит секретную информацию, поэтому конечный пасс должен получить сам клиент минуя посредников в лице менеджеров, маркетологов и т.д.

Самый логичный способ передать Google/Apple Pass клиенту: через рассылку.

В шаблоне письма доступны две переменные:

- `wallet_apple_pass_url` – ссылка на скачивание файла `.pkpass` для владельцев iPhone;
- `wallet_google_pass_url` – ссылка на установку Google Pass для владельцев телефонов на базе Android.

Если у клиента нет определенного пасса, значение соответствующей переменной будет пустым. Т.е. в шаблоне вы можете использовать синтаксис `liquid-шаблонизатора`, чтобы показать или скрыть кнопки получения пасса.

```html
{% if wallet_apple_pass_url %}
  <div>
      <a href="{{ wallet_apple_pass_url }}" target="_blank">Add to Apple Wallet</a>
  </div>
{% endif %}

{% if wallet_google_pass_url %}
  <div>
    <a href="{{ wallet_google_pass_url }}" target="_blank">Add to Google Wallet</a>
  </div>
{% endif %}
```