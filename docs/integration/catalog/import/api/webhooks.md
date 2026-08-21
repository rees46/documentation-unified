# Вебхуки

Для автоматизации процесса импорта данных о товарах можно использовать функционал webhook запросов.

### Импорт категорий с webhook параметром

```json
{
	"shop_id":      "...",
	"shop_secret":  "...",
	"categories":   ["category_id_1", "category_id_2", "..."],
	"webhook":      "https://site.com/webhook"
}
```

### Импорт локаций с webhook параметром

```json
{
	"shop_id":      "...",
	"shop_secret":  "...",
	"locations":    ["location_id_1", "location_id_2", "..."],
	"webhook":      "https://site.com/webhook"
}
```

### Импорт товаров с webhook параметром

```json 
{
    "shop_id":      "...",  
    "shop_secret":  "...",  
    "items":        ["item_id_1", "item_id_2", "..."],
    "webhook":      "https://site.com/webhook"
}
```

После того как запрос будет обработан, на указанный вебхук будет отправлен `POST` запрос с типом `Content-Type: application/json`

Примеры:
```json
{
	"status": "success"
}
```

```json
{
	"status": "error", 
	"message": "MESSAGE"
}
```


