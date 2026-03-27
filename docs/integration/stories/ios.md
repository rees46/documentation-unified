# Сторис в iOS SDK

:::info Поддержка
Stories в iOS поддерживаются с версии iOS SDK 3.0.0
:::

Для отображения сторис есть два формата интеграции:
- XIB
- В коде

## Интеграция через XIB (StoryBoard)

### Шаг 1. Создайте новый UIView в редакторе StoryBoard

Откройте `StoryBoard` и добавьте новый элемент `UIView`.

Измените класс этого `UIView` со стандартного на `StoriesView`. Для этого выберите созданный `UIView`, перейдите в `Inspector` и укажите класс `StoriesView` в поле `Custom Class`.

### Шаг 2. Свяжите созданный StoriesView с кодом вашего ViewController

Откройте ваш контроллер (например, `MainViewController.swift`).

Добавьте переменную с аннотацией `@IBOutlet` для созданного в `StoryBoard` объекта:

```swift 
@IBOutlet private weak var storiesCollectionView: StoriesView!
```

### Шаг 3. Инициализация блока сторис

В методе `viewDidLoad` (или в другом подходящем месте вашего кода) инициализируйте блок сторис с помощью метода `configure`. Пример кода для инициализации:

```swift 
override func viewDidLoad() {
    super.viewDidLoad()

    // Проверяем, что globalSDK инициализирован
    if let globalSDK = globalSDK {
        // Инициализация блока сторис
        storiesCollectionView.configure(sdk: globalSDK, mainVC: self, code: "STORIES_CODE")
    }
}
```

Параметры метода `configure`:
- `sdk` — объект типа `SDK` (в вашем случае — это `globalSDK`), который содержит данные персонализации и методы для работы с блоком сторис. 
- `mainVC`: текущий контроллер, который должен реализовать `UIViewController`. В большинстве случаев это будет `self`. 
- `code`: строковый идентификатор, используемый для выбора конкретного блока сторис.

### Шаг 4. Тестирование

Запустите ваше приложение и убедитесь, что блок сторис корректно отображается и взаимодействует с `SDK`.

Пример:

```swift 
class MainViewController: UIViewController {
    // Связываем StoriesView через XIB
    @IBOutlet private weak var storiesCollectionView: StoriesView!

    override func viewDidLoad() {
        super.viewDidLoad()

        // Инициализация блока сторис с помощью globalSDK
        loadStoriesViewBlock()
    }

    // Метод инициализации StoriesView
    private func loadStoriesViewBlock() {
        if let globalSDK = globalSDK {
            // Передаем SDK и настраиваем блок сторис
            storiesCollectionView.configure(sdk: globalSDK, mainVC: self, code: "STORIES_CODE")
        }
    }
}
```

## Интеграция в коде

### Шаг 1. Настройка IBOutlet для коллекции сторис

В вашем классе контроллера необходимо создать `IBOutlet` для элемента, который будет отображать сторис. Обычно это `UICollectionView` или кастомный компонент.

```swift 
@IBOutlet private weak var storiesCollectionView: StoriesView!
```

Убедитесь, что этот `IBOutlet` привязан к элементу на вашем интерфейсе.

### Шаг 2. Подготовка globalSDK

Перед инициализацией сторис, необходимо убедиться, что у вас есть объект `globalSDK`, который содержит данные для персонализации и методы для работы со сторис.

Инициализируйте `globalSDK` перед вызовом метода инициализации.

```swift
// Пример 
globalSDK = GlobalSDK(userId: "123", personalizationData: ["key": "value"])
```

### Шаг 3. Реализация метода для инициализации блока сторис

```swift
private func loadStoriesViewBlock() {
    if let globalSDK = globalSDK {
        // Конфигурация storiesCollectionView с SDK и данными контроллера
        storiesCollectionView.configure(sdk: globalSDK, mainVC: self, code: "STORIES_CODE")
    }
}
```

Этот метод проверяет наличие `globalSDK`, и если он существует, настраивает блок сторис с помощью метода `configure`.

Параметры метода configure:

- `sdk`: Экземпляр globalSDK с данными и методами персонализации.
- `mainVC`: Текущий контроллер (UIViewController), который нужен для работы с интерфейсом.
- `code`: Строковый идентификатор для выбора конкретного блока сторис.
