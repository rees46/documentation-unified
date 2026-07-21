# Сторис в ReactNative SDK

Stories подключаются через компонент `StoriesList` из точки входа `@rees46/react-native-sdk/stories`. Компонент сам показывает и ленту кружков, и полноэкранный просмотр по нажатию на иконку кампании.

## Установка зависимостей

Компоненты сторис используют нативные библиотеки &mdash; они объявлены как опциональные `peerDependencies` и ставятся только, если вы используете сторис:

```shell 
yarn add react-native-fs react-native-video react-native-vector-icons react-native-volume-manager
```

Для iOS выполните `pod install`. Импорт из корня пакета (`@rees46/react-native-sdk`) эти зависимости не тянет &mdash; они нужны только для `/stories`.

## Инициализация SDK

```javascript
import REES46 from '@rees46/react-native-sdk'
import { Platform } from 'react-native'

const sdk = new REES46('SHOP_ID', Platform.OS, false, true)
```

Параметры конструктора: 

- shop_id;
- stream (Platform.OS);
- debug;
- autoSendPushToken.

## Отображение блока сторис

Достаточно отрендерить `StoriesList`, передав экземпляр SDK и код блока. Всё остальное &mdash; загрузка, отрисовка ленты, открытие и закрытие полноэкранного просмотра &mdash; компонент делает сам:

```react
import { StoriesList } from '@rees46/react-native-sdk/stories'

<StoriesList
  sdk={sdk}
  code="STORY BLOCK CODE"
  height={120} />
```

Где вместо `STORY BLOCK CODE` укажите уникальный идентификатор блока сторис из личного кабинета.

## Пропсы `StoriesList`

| Название                | Тип                                | Обязательный | По умолчанию | Описание                                                                                                                   |
|-------------------------|------------------------------------|--------------|--------------|----------------------------------------------------------------------------------------------------------------------------|
| `sdk`                   | `SDK`                              | Да           |              | Инициализированный экземпляр SDK, через который загружается блок.                                                          |
| `code`                  | `string`                           | Да           |              | Код блока сторис из личного кабинета.                                                                                      |
| `height`                | `number`                           | Нет          | `120`        | Высота ленты.                                                                                                              |
| `iconSize`              | `number`                           | Нет          | `60`         | Диаметр кружка сторис.                                                                                                     |
| `iconMargin`            | `number`                           | Нет          | `8`          | Горизонтальный отступ между кружками.                                                                                      |
| `showViewer`            | `boolean`                          | Нет          | `true`       | Открывать встроенный полноэкранный просмотр по тапу. Укажите `false`, если показываете собственный `StoryViewer`.          |
| `onStoryPress`          | `(story, index, settings) => void` | Нет          |              | Тап по кружку сторис. Вызывается всегда, в том числе при showViewer={true} — непосредственно перед открытием просмотрщика. |
| `onElementPress`        | `(element) => void`                | Нет          |              | Тап по элементу слайда. Пробрасывается во встроенный `StoryViewer`.                                                        |
| `onLoadComplete`        | `(success: boolean) => void`       | Нет          |              | Завершение загрузки блока. Значение `false` означает ошибку сети или неожиданный формат ответа.                            |
| `style`                 | `ViewStyle`                        | Нет          |              | Дополнительные стили для `FlatList`.                                                                                       |
| `contentContainerStyle` | `ViewStyle`                        | Нет          |              | Дополнительные стили для контейнера содержимого `FlatList`.                                                                |


## Обработка нажатий по ссылкам и товарам

Ссылки и диплинки SDK открывает сам через `Linking.openURL`, выбирая URL по платформе (`deeplinkAndroid/linkAndroid` на Android, `deeplinkIos/linkIos` на iOS, иначе `link`).

Проп `onElementPress` вызывается дополнительно &mdash; как уведомление, для аналитики или своей логики. Учтите: SDK уже вызвал `Linking.openURL`, поэтому если вы ещё и сами инициируете переход, будет двойное открытие.

```react
<StoriesList
  sdk={sdk}
  code="STORY BLOCK CODE"
  onElementPress={(element) => {
    // element.deeplinkAndroid / element.deeplinkIos / element.link / товар
    console.log('Element pressed:', element)
  }}
/>
```

## Полный пример

```javascript
import React from 'react'
import { Platform, SafeAreaView } from 'react-native'
import REES46 from '@rees46/react-native-sdk'
import { StoriesList } from '@rees46/react-native-sdk/stories'

const sdk = new REES46('SHOP_ID', Platform.OS, false, true)

export default function StoriesScreen() {
  return (
    <SafeAreaView>
      <StoriesList sdk={sdk} code="STORY BLOCK CODE" height={120} />
    </SafeAreaView>
  )
}
```