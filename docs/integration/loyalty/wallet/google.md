# Настройка Google Wallet

Вам потребуется аккаунт разработчика Google. 

Краткий план действий:

1. Активируем Google Wallet
2. Создаем сервисный аккаунт в Google Console
3. Загружаем ключ сервисного аккаунта в настройки Wallet
4. Публикуем свой Google Wallet для всех клиентов

## Активируем Google Wallet

1. Зайдите в Google Wallet Console: https://pay.google.com/business/console/home
2. Перейдите в пункт меню `Google Wallet API` слева в меню
3. Скопируйте длинное числовое значение `Issuer ID` (19-значное число немного правее заголовка страницы `Google Wallet API`). Это значение понадобится на странице настройки Wallet в личном кабинете REES46
4. Перейдите в Google Console: https://console.cloud.google.com
5. Найдите в поиске Google Wallet API и перейдите на его страницу: https://console.cloud.google.com/marketplace/product/google/walletobjects.googleapis.com?q=search&referrer=search
6. Нажмите "Activate"

## Создаем сервисный аккаунт в Google Console

1. Перейдите в раздел `Credentials`: https://console.cloud.google.com/apis/credentials
2. Сверху нажмите кнопку `+ Create credentials`
3. Выберите в меню `Service Account`
4. В форме укажите имя ключа (любое) и `Service account ID` (любой)
5. Нажмите `Done`
6. На следующей странице найдите созданный вами сервисный аккаунт и перейдите в него
7. На странице сервисного аккаунта кликните в меню `Keys`
8. Далее `Add key` и в выпадающем меню `Create new key`
9. Выберите формат JSON и нажмите `Create`
10. Сохраните скачанный файл, он потребуется на следующем шаге

## Загружаем ключ сервисного аккаунта в настройки Wallet

1. Откройте в личном кабинете REES46 экран настройки Wallet
2. Скроллируйте вниз, пока не увидите форму загрузки файла ключа Google
3. Выберите файл из предыдущего пункта и в поле `Issuer ID` впишите значение, полученное ранее
4. Нажмите `Загрузить`
5. После успешной загрузки вы увидите сообщение о том, что файл ключа загружен

Можно приступать к [выдаче пассов вашим клиентам](./distribute.md).

## Больше информации

Подробная инструкция по Google Wallet: https://developers.google.com/wallet/generic 