# Сторис в Android SDK

:::info Поддержка
Stories в Android поддерживаются с версии SDK 1.6.0
:::

Для отображения сторис есть два формата интеграции:
- XML
- Программно

## Интеграция через XML

Для вставки блока сторис на определенный шаблон (`layout`) приложения, добавьте следующий код в ваш XML-файл разметки:

```xml
<com.personalization.stories.views.StoriesView
    android:id="@+id/stories_view"
    android:layout_width="match_parent"
    android:layout_height="wrap_content"
    app:code="STORY BLOCK CODE" />
```

Где вместо `STORY BLOCK CODE` укажите уникальный идентификатор блока сторис из личного кабинета.

Далее, в вашем `Activity` достаточно найти этот элемент и инициализировать его через `SDK`:

::: code-group
```kotlin [Kotlin]
val storiesView = findViewById<StoriesView>(R.id.stories_view)
sdk.initializeStoriesView(storiesView)
```

```java [Java (deprecated)]
<com.personalizatio.stories.views.StoriesView
    android:layout_width="match_parent"
    android:layout_height="wrap_content"
    app:code="STORY BLOCK CODE" />

StoriesView storiesView = findViewById(R.id.story_view);
REES46.initializeStoriesView(storiesView);
```
:::

Вся дальнейшая работа по рендеру блока, обработке нажатий и отображению слайдов выполняется SDK автоматически.

### Опциональное открытие браузера

По умолчанию при нажатии на ссылку в сторис, она будет открыта в браузере. Это поведение можно изменить, задав значение `false` для параметра `needOpeningWebView`.

```xml
<com.personalization.stories.views.StoriesView 
  android:id="@+id/stories_view"
  android:layout_width="match_parent"
  android:layout_height="wrap_content"
  app:code="STORIES_CODE"
  app:need_opening_web_view="false" />
```


## Программная интеграция

Если вам нужно создать и добавить StoriesView программно (без использования XML), выполните следующие шаги:

### Шаг 1. Создание экземпляра StoriesView

Внутри вашего `Activity` создайте новый экземпляр `StoriesView`, передав в конструктор контекст и идентификатор блока сторис:

::: code-group
```kotlin [Kotlin]
val storiesView = StoriesView(this, "STORY BLOCK CODE")
```

```java [Java (deprecated)]
StoriesView storiesView = new StoriesView(this, "STORY BLOCK CODE");
```
:::

### Шаг 2. Добавьте контейнер (опционально)

Если StoriesView создается программно, его нужно добавить в нужный контейнер с помощью addView. Например:

::: code-group
```kotlin [Kotlin]
findViewById<ViewGroup>(R.id.stories_container).addView(storiesView)
```

```java [Java (deprecated)]
((ViewGroup) findViewById(R.id.stories)).addView(storiesView);
```
:::

### Шаг 3. Инициализируйте StoriesView с помощью SDK

::: code-group
```kotlin [Kotlin]
sdk.initializeStoriesView(storiesView)
```

```java [Java (deprecated)]
SDK.initializeStoriesView(storiesView);
```
:::


### Полный пример

::: code-group
```kotlin [Kotlin]
class MainActivity : AppCompatActivity() {
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_main)

        // Программная инициализация блока сторис
        val storiesView = StoriesView(this, "STORY BLOCK CODE")
        
        // Добавляем блок в контейнер, если создаем его программно
        findViewById<ViewGroup>(R.id.stories_container).addView(storiesView)
        
        // Инициализируем StoriesView через SDK
        sdk.initializeStoriesView(storiesView)
    }
}
```

```java [Java (deprecated)]
public class MainActivity extends AppCompatActivity {
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);

        // Программная инициализация блока сторис
        StoriesView storiesView = new StoriesView(this, "STORY BLOCK CODE");
        
        // Добавляем блок в контейнер, если создаем его программно
        ((ViewGroup) findViewById(R.id.stories_container)).addView(storiesView);
        
        // Инициализируем StoriesView через SDK
        SDK.initializeStoriesView(storiesView);
    }
}
```
:::
