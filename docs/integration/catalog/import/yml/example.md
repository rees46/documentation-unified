# Пример YML-файла

```xml
<?xml version="1.0" encoding="UTF-8"?>
<yml_catalog date="2019-05-16 17:19">
    <shop>
        <name>Мой магазин</name>
        <company>Компания моего магазина</company>
        <url>https://my-store.com</url>
        <!-- перечисление валют магазин и курсов валют -->
        <currencies>
            <currency id="RUR" rate="1"/>
            <currency id="USD" rate="64.45"/>
            <currency id="EUR" rate="72.03"/>
        </currencies>
        <!-- перечисление всех категорий магазина, их иерархии и ссылок -->
        <categories>
            <category id="2" url="http://my-store.com/categories/apple/">Apple</category>
            <category id="13" parentId="2" alias="apple/phones" url="http://my-store.com/categories/apple/phones/">Телефоны</category>
        </categories>
        <!-- перечисление всех локаций магазина -->
        <locations>
            <location id="1" type="city" name="Москва" />
            <location id="2" type="city" name="Санкт-Петербург" />
            <location id="3" type="city" name="Новосибирск" />
        </locations>
        <offers>
            <offer id="395532" available="true" leftovers="few">
                <url>http://my-store.com/items/395532</url>
                <deeplink_android>http://my-store.com/items/395532</deeplink_android>
                <deeplink_ios>http://my-store.com/items/395532</deeplink_ios>
                <price>50000</price>
                <price_with_promocode>40000</price_with_promocode>
                <oldprice>55000</oldprice>
                <price_margin>67</price_margin>
                <!-- перечисление иерархий категорий, в которых присутствует данный товар -->
                <categoryId>2</categoryId>
                <categoryId>13</categoryId>
                <!-- Указана сезонность. Приоритетные месяцы для данного товара: январь, март, апрель, июнь. -->
                <seasonality>1</seasonality>
                <seasonality>3</seasonality>
                <seasonality>4</seasonality>
                <seasonality>6</seasonality>
                <!-- перечисление локаций, в которых данный товар доступен к приобретению, а также уточнение цены товара в локации -->
                <locations>
                    <location id="1" weight="80">
                        <price>70000</price>
                        <oldprice>75000</oldprice>
                        <stock_quantity>10</stock_quantity>
                    </location>
                    <!-- локация id="2" не указана, значит товар в этой локации отсутствует -->
                    <!-- в локации id="3" не указан price, значит цена товара соответствует базовой -->
                    <location id="3"></location>
                </locations>
                <!-- Перечислены ID товаров, являющиеся аксессуарами для текущего товара -->
                <accessories>
                    <accessory id="5574" />
                    <accessory id="131" />
                    <accessory id="99444" />
                    <accessory id="334411" />
                </accessories>
                <tags>
                    <tag>телефон</tag>
                    <tag>смартфон</tag>
                </tags>
                <barcode>123456</barcode>
                <picture>https://my-store.com/items/395532.jpg</picture>
                <name>Apple Iphone 6 128 gb</name>
                <typePrefix>Смартфон</typePrefix>
                <vendor picture="http://example.com/apple.jpg">Apple</vendor>
                <vendorCode>APPL</vendorCode>
                <model>iPhone 6 128Gb</model>
                <is_new>1</is_new>
                <rating>5</rating>
                <date>2022-01-01</date>
                <description><![CDATA[iPhone 6 не просто больше. Он лучше во всех отношениях. 4,7-дюймовый HD-дисплей Retina. Процессор A8 с 64-разрядной архитектурой уровня настольного компьютера. Новая 8-мегапиксельная камера iSight с технологией Focus Pixels. Сенсор идентификации по отпечатку пальца Touch ID. Скорость Wi-Fi выше. Время работы от аккумулятора дольше. А также iOS 8 и iCloud. Все это - в цельном корпусе толщиной всего 6,9 мм.]]></description>
                <merchant>abc123xyz789</merchant>
                <param name="Color">Black</param>
                <!-- Параметр unit указывает на то, что значение параметра числовое и для него можно использовать range фильтрацию -->
                <param name="Height" unit="mm">140</param>
                <!-- Параметр priority позволяет передавать значение для произвольной сортировки параметров в ответе полного поиска -->
                <param name="Sim" priority="20">E-sim</param>
                <installment>36</installment> 
                <discount_percent>50</discount_percent> 
                <promocode>Discount20</promocode> 
                <gift>true</gift> 
                <bonuses_accrual_allowed>true</bonuses_accrual_allowed>
                <bonuses_spending_allowed>true</bonuses_spending_allowed>
                <discounts_allowed>true</discounts_allowed>
            </offer>
            <offer id="395533" available="false">
                ...
            </offer>
            ...
        </offers>
    </shop>
</yml_catalog>
```