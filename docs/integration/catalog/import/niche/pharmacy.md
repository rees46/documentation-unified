---
meta:
- name: description
  content: Нишевый алгоритм "Фармацевтика и медицина" предназначен для автоматического распознавания индивидуальных особенностей покупателя, характерных для фармацевтической и медицинской отрасли.
---

# Расширение "Фармацевтика и медицина"

```
offer > pharmacy
```

Нишевый алгоритм "Фармацевтика и медицина" предназначен для автоматического распознавания индивидуальных особенностей покупателя, характерных для фармацевтической и медицинской отрасли. 

Для работы алгоритма каждый товар должен содержать дополнительные параметры, указываемые в секции `pharmacy` внутри `offer`:

- действующее вещество;
- товар для детей;
- дозировка.

## Действующее вещество

```
offer > pharmacy > ingredient
```

Обязательный параметр для фармацевтики. Не требуется для медицинского оборудования или не лекарственных товаров.

Значение параметра – медицинское название параметра латиницей в нижнем регистре без крайних пробелов.

Пример:

::: code-group
```XML [YML]
<offer ...>
    ...
    <pharmacy>
        <ingredient>fluoxetine</ingredient>
    </pharmacy>
</offer>
```

```json [JSON API]
{
  "pharmacy": {
    "ingredient": "fluoxetine"
  }
} 
```
:::


## Дозировка

```
offer > pharmacy > dosage
```

Дозировка действующего вещества. Рекомендуется указывать при указании действующего вещества. Значение указывается в миллиграммах.

Пример:

::: code-group
```XML [YML]
<offer ...>
    ...
    <pharmacy>
        <ingredient>fluoxetine</ingredient>
        <dosage>125</dosage>
    </pharmacy>
</offer>
```

```json [JSON API]
{
  "pharmacy": {
    "ingredient": "fluoxetine",
    "dosage": 125
  }
} 
```
:::

## Болезни

```
offer > pharmacy > deceases
```

Опциональный строковый параметр. Указывается латиницей в нижнем регистре без крайних и двойных пробелов и знаков пунктуации. Можно указывать несколько значений одновременно – каждое в отдельном теге.

Варианты значений (список пополняется, не ограничен перечисленными вариантами):

Пример:

::: code-group
```XML [YML]
<offer ...>
    ...
    <pharmacy>
        <ingredient>fluoxetine</ingredient>
        <dosage>125</dosage>
        <deceases>
            <decease>abdominal aortic aneurysm</decease>
            <decease>acanthamoeba infection</decease>
        </deceases>
    </pharmacy>
</offer>
```

```json [JSON API]
{
  "pharmacy": {
    "ingredient": "fluoxetine",
    "dosage": 125,
    "deceases": ["abdominal aortic aneurysm", "acanthamoeba infection"]
  }
} 
```
:::


## Детский товар

Если товар детский, добавьте пустой тег `<child />` внутрь тега `<offer>`.

Пример:

::: code-group
```XML [YML]
<offer ...>
    ...
    <pharmacy>
        <ingredient>fluoxetine</ingredient>
        <dosage>125</dosage>
        <deceases>
            <decease>abdominal aortic aneurysm</decease>
            <decease>acanthamoeba infection</decease>
        </deceases>
    </pharmacy>
    <child></child>
</offer>
```

```json [JSON API]
{
  "pharmacy": {
    "ingredient": "fluoxetine",
    "dosage": 125,
    "deceases": ["abdominal aortic aneurysm", "acanthamoeba infection"]
  },
  "child": {}
} 
```
:::


## Регулярно покупаемый товар

```
offer > pharmacy > periodic
```

Необязательный параметр. Рекомендуется указывать для всех регулярно потребляемых фармацевтических товаров.

| Значение элемента | Расшифровка                          |
|-------------------|--------------------------------------|
| 1                 | Товар, который покупают регулярно    |
| 0                 | Товар, который не покупают регулярно |

::: info Лайфхак
Если товар не регулярного потребления, можете просто не указывать этот тег.
:::

Пример:

::: code-group
```XML [YML]
<offer ...>
    ...
    <pharmacy>
        <ingredient>fluoxetine</ingredient>
        <dosage>125</dosage>
        <deceases>
            <decease>abdominal aortic aneurysm</decease>
            <decease>acanthamoeba infection</decease>
        </deceases>
        <periodic>1</periodic>
    </pharmacy>
</offer>
```

```json [JSON API]
{
  "pharmacy": {
    "ingredient": "fluoxetine",
    "dosage": 125,
    "deceases": ["abdominal aortic aneurysm", "acanthamoeba infection"],
    "periodic": true
  }
} 
```
:::


## Объём/дозировка

Необязательный массив параметров. Позволяет указывать варианты объема товара и стоимость каждого варианта.

Значение параметра `<value>` обозначает либо количество таблеток в упаковке, либо объём в миллилитрах.

::: warning
Для разных вариантов товаров лучше используйте возможность указания вариантов товаров в отдельных офферах с группировкой по `group_id`.
:::

Пример:

::: code-group
```XML [YML]
<offer ...>
    ...
    <pharmacy>
        <ingredient>fluoxetine</ingredient>
        <dosage>125</dosage>
        <deceases>
            <decease>abdominal aortic aneurysm</decease>
            <decease>acanthamoeba infection</decease>
        </deceases>
        <periodic>1</periodic>
        <volumes>
            <volume>
                <value>200</value>
                <price>1000</price>
            </volume>
            <volume>
                <value>400</value>
                <price>1900</price>
            </volume>
        </volumes>
    </pharmacy>
</offer>
```

```json [JSON API]
{
  "pharmacy": {
    "ingredient": "fluoxetine",
    "dosage": 125,
    "deceases": ["abdominal aortic aneurysm", "acanthamoeba infection"],
    "periodic": true,
    "volumes": [
      { "price": 1000, "value": 200 },
      { "price": 1900, "value": 400 }
    ]
  }
} 
```
:::

