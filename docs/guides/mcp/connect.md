# Подключение

MCP сервер доступен, если:

- у вас тариф выше `XL`;
- текущий период оплачен.

Для подключения используйте один и тот же адрес сервера во всех клиентах:

- `https://mcp.rees46.ru/analytics`

После добавления коннектора или приложения сервис обычно перенаправляет на страницу авторизации и подтверждения доступа.

> [!NOTE]
> Если вашего провайдера нет в списке - сообщите нам. Мы рассмотрим его добавление в поддерживаемые и включение в этот список.

## Perplexity

1. [Добавление коннекторов](https://www.perplexity.ai/account/connectors)
2. `Custom connector`
3. Создайте новый коннектор и заполните поля:
   1. `Name` - любое удобное название
   2. `MCP server URL` - <https://mcp.rees46.ru/analytics>
4. Откройте `Advanced` и укажите:
   1. `OAuth`
   2. `Client ID` - `mcp`
   3. `Client secret` - `mcp-secret`
   4. `Transport` - `Streamable HTTP`
5. Подтвердите пункт `I understand custom connectors can introduce risks.`
6. Нажмите `Add`
7. Найдите созданный коннектор в списке и откройте его: сервис перенаправит вас на страницу подтверждения доступа.

## ChatGPT

1. [Добавление приложений](https://chatgpt.com/#settings/Connectors)
2. В `Advanced Settings` включите `Developer mode`
3. Вернитесь назад и нажмите `Create app`
4. Заполните поля:
   1. `Name` - любое удобное
   2. `MCP server URL` - <https://mcp.rees46.ru/analytics>
   3. `Authentication` - `OAuth`
   4. `Advanced settings`
      1. `Registration method` - `Dynamic Client Registration (DCR)`
   5. Подтвердите пункт `I understand and want to continue`
   6. Нажмите `Create`

## Claude

1. [Добавление приложений](https://claude.ai/settings/connectors)
2. `Add custom connector`
3. Заполните поля:
   1. `Name` - любое удобное
   2. `Remote MCP server URL` - <https://mcp.rees46.ru/analytics>
   3. `Advanced settings`
   4. `OAuth Client ID` - `mcp`
   5. `OAuth Client Secret` - `mcp-secret`
4. Нажмите `Add`

## После подключения

Проверьте, что коннектор работает, простым запросом, например:

> Покажи доступные мне магазины

Если клиент успешно подключён, модель получит доступ к данным REES46 и сможет использовать MCP инструменты в диалоге.

## Если подключение не работает

Проверьте:

- что у вас активен подходящий тариф;
- что текущий период оплачен;
- что указан корректный URL: `https://mcp.rees46.ru/analytics`;
- что в настройках выбран `OAuth`, если клиент требует явного выбора способа авторизации;
- что после создания коннектора вы завершили шаг подтверждения доступа.
