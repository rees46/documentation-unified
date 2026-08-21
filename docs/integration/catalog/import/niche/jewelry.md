---
meta:
- name: description
  content: Нишевый алгоритм "Ювелирные украшения" предназначен для автоматического распознавания индивидуальных особенностей покупателя, характерных для ювелирной отрасли - материал изделия, размеры пальцев, запястий и т.д
---

# Расширение "Ювелирные украшения"

```
offer > jewelry
```

Нишевый алгоритм "Ювелирные украшения" предназначен для автоматического распознавания индивидуальных особенностей покупателя, характерных для ювелирной отрасли: материал изделия, размеры пальцев, запястий и т.д. 

Для работы алгоритма каждый товар должен содержать дополнительные параметры, указываемые в секции `<jewelry>` внутри `<offer>`:

- пол, к которому относится товар;
- размер кольца (для колец);
- размер браслета (для браслетов);
- размер цепочки (для цепочек);
- цвет;
- металл;
- драгоценные камни.

## Пол

```
offer > jewelry > gender
```

Рекомендуемый элемент. Если у вас нет данных о принадлежности товара к определённому полу `gender`, не указывайте этот элемент. В этом случае данный товару будет присвоено значение "унисекс" и он будет иметь более низкий приоритет в выдаче рекомендаций по сравнению с другими товарами определённого пола.

| Значение элемента | Расшифровка |
|-------------------|-------------|
| m                 | Мужской     |
| f                 | Женский     |

Пример:

::: code-group
```XML [YML]
<offer ...>
    ...
    <jewelry>
        <gender>f</gender>
    </jewelry>
</offer>
```

```json [JSON API]
{
  "jewelry": {
    "gender": "f"
  }
} 
```
:::

## Размер кольца

```
offer > jewelry > ring_sizes
```

Необязательный элемент. Содержит список размеров кольца определенного артикула. Если товар не является кольцом или не имеет размеров, параметр должен отсутствовать. Если кольцо имеет интервал размеров, то перечисляются все размеры интервала. Если размер дробный, то разделителем дробной части является точка.

Пример:

::: code-group
```XML [YML]
<offer ...>
    ...
    <jewelry>
        <gender>f</gender>
        <ring_sizes>
            <ring_size>16</ring_size>
            <ring_size>16.5</ring_size>
            <ring_size value="17">
                <location id="3" />
            </ring_size>
        </ring_sizes>
    </jewelry>
</offer>
```

```json [JSON API]
{
  "jewelry": {
    "gender": "f",
    "ring_sizes": ["16", "16.5", "17"]
  }
} 
```
:::

## Размер браслета

```
offer > jewelry > bracelet_sizes
```

Необязательный элемент. Содержит список длин браслета в сантиметрах определенного артикула. Если товар не является браслетом или не имеет размеров, параметр должен отсутствовать. Если товар имеет интервал размеров, то перечисляются все размеры интервала. Если размер дробный, то разделителем дробной части является точка.

Пример:

::: code-group
```XML [YML]
<offer ...>
    ...
    <jewelry>
        <gender>f</gender>
        <bracelet_sizes>
            <bracelet_size>16</bracelet_size>
            <bracelet_size>16.5</bracelet_size>
            <bracelet_size value="17">
                <location id="3" />
            </bracelet_size>
        </bracelet_sizes>
    </jewelry>
</offer>
```

```json [JSON API]
{
  "jewelry": {
    "gender": "f",
    "bracelet_sizes": ["16", "17"]
  }
} 
```
:::


## Размер цепочки

```
offer > jewelry > chain_sizes
```

Необязательный элемент. Содержит список длин цепочки в сантиметрах определенного артикула. Если товар не является цепочкой или не имеет размеров, параметр должен отсутствовать. Если товар имеет интервал размеров, то перечисляются все размеры интервала. Если размер дробный, то разделителем дробной части является точка.

Пример:

::: code-group
```XML [YML]
<offer ...>
    ...
    <jewelry>
        <gender>f</gender>
        <chain_sizes>
            <chain_size>16</chain_size>
            <chain_size>16.5</chain_size>
            <chain_size value="17">
                <location id="3" />
            </chain_size>
        </chain_sizes>
    </jewelry>
</offer>
```

```json [JSON API]
{
  "jewelry": {
    "gender": "f",
    "chain_sizes": ["17"]
  }
} 
```
:::

## Цвет

```
offer > jewelry > jewelry_color
```

Необязательный элемент. Передается строкой, одно значение из фиксированного списка в таблице ниже. Если цвет товара не присутствует в таблице, параметр не используется.

| Цвет                        | Значение  |
|-----------------------------|-----------|
| Белые (серебристые) изделия | white     |
| Красные изделия             | red       |
| Желтые изделия              | yellow    |
| Черные изделия              | black     |

Пример:

::: code-group
```XML [YML]
<offer ...>
    ...
    <jewelry>
        <gender>f</gender>
        <jewelry_color>white</jewelry_color>
    </jewelry>
</offer>
```

```json [JSON API]
{
  "jewelry": {
    "gender": "f",
    "jewelry_color": "white"
  }
} 
```
:::


## Металл

```
offer > jewelry > jewelry_metal
```

Необязательный элемент. Передается строкой, одно значение из фиксированного списка в таблице ниже. Если товар не имеет металла из перечисленного списка, параметр не используется.

| Металл  | Значение  |
|---------|-----------|
| Золото  | gold      |
| Серебро | silver    |
| Платина | platinum  |

Пример:

::: code-group
```XML [YML]
<offer ...>
    ...
    <jewelry>
        <gender>f</gender>
        <jewelry_color>white</jewelry_color>
        <jewelry_metal>silver</jewelry_metal>
    </jewelry>
</offer>
```

```json [JSON API]
{
  "jewelry": {
    "gender": "f",
    "jewelry_color": "white",
    "jewelry_metal": "silver"
  }
} 
```
:::

## Драгоценный камень

```
offer > jewelry > jewelry_gem
```

Необязательный элемент. Передается строкой, одно значение из фиксированного списка в таблице ниже. Если товар не имеет драгоценных камней из перечисленного списка, параметр не используется.

| Драгоценный камень      | Значение            |
|-------------------------|---------------------|
| Агат                    | agate               |
| Александрит             | alexandrite         |
| Алпанит                 | alpana              |
| Аметист                 | amethyst            |
| Бирюза                  | turquoise           |
| Бриллиант               | diamond             |
| Горный хрусталь         | rhinestone          |
| Гранат                  | garnet              |
| Гранат (синтетический)  | garnet_synthetic    |
| Жемчуг                  | pearl               |
| Жемчуг культивированный | pearl_cultured      |
| Изумруд                 | emerald             |
| Изумруд (геотермальный) | emerald_geothermal  |
| Кварц                   | quartz              |
| Кварц дымчатый          | quartz_smoky        |
| Коралл                  | coral               |
| Корунд                  | corundum            |
| Корунд (синтетический)  | corundum_synthetic  |
| Кристалл Сваровски      | swarovski           |
| Кристалл Прециоза       | preciosa            |
| Малахит                 | malachite           |
| Нанокристалл            | nanocrystal         |
| Оникс                   | onyx                |
| Перламутр               | nacre               |
| Раухтопаз               | smoky_quartz        |
| Родолит                 | rhodolite           |
| Рубин                   | ruby                |
| Рубин (синтетический)   | ruby_synthetic      |
| Сапфир                  | sapphire            |
| Сапфир (геотермальный)  | sapphire_geothermal |
| Ситалл                  | sitall              |
| Стекло                  | glass               |
| Султанит                | sultanite           |
| Танзанит                | tanzanite           |
| Топаз                   | topaz               |
| Топаз Лондон            | topaz_london_blue   |
| Турмалин                | tourmaline          |
| Фианит                  | fianit              |
| Халцедон                | chalcedony          |
| Хризолит                | chrysolite          |
| Хризопраз               | chrysoprase         |
| Цитрин                  | citrine             |
| Шпинель                 | spinel              |
| Шпинель (синтетическая) | spinel_synthetic    |
| Эмаль                   | enamel              |
| Эпоксидная смола        | epoxy               |
| Янтарь                  | amber               |
| Микс вставок            | mix                 |


Пример:

::: code-group
```XML [YML]
<offer ...>
    ...
    <jewelry>
        <gender>f</gender>
        <jewelry_color>white</jewelry_color>
        <jewelry_metal>silver</jewelry_metal>
        <jewelry_gem>ruby</jewelry_gem>
    </jewelry>
</offer>
```

```json [JSON API]
{
  "jewelry": {
    "gender": "f",
    "jewelry_color": "white",
    "jewelry_metal": "silver",
    "jewelry_gem": "ruby"
  }
} 
```
:::

