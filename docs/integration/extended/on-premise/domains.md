# Домены для кластера

Необходимо будет создать поддомены и привязать их к серверам кластера:

| Домен в REES46        | Назначение                                                                    | Домен в кластере            |
|-----------------------|-------------------------------------------------------------------------------|-----------------------------|
| app.rees46.ru         | Личный кабинет маркетолога                                                    | app.r46.yourdomain.com      |
| api.rees46.ru         | API платформы                                                                 | api.r46.yourdomain.com      |
| cdn.stories.rees46.ru | Хранилище SDK и других ресурсов                                               | cdn.r46.yourdomain.com      |
| pictures.rees46.ru    | Хранилище изображений товаров и загруженных изображений для рассылок          | pictures.r46.yourdomain.com |
| stories.rees46.ru     | Хранилище изображений для сервиса stories                                     | stories.r46.yourdomain.com  |
| cache.rees46.ru       | Хранилище кешированных версий email-рассылок                                  | cache.r46.yourdomain.com    |
| rlnq.ru               | Короткий домен для сокращения ссылок для отправки SMS                         | любой                       |
| mailer.rees46.ru      | Корневой домен для MTA-серверов (для email-рассылок)                          | mailer.r46.yourdomain.com   |
| mXX.mailer.rees46.ru  | Партия почтовых серверов (MTA) для отправки рассылок                          | mXX.r46.yourdomain.com      |
| bounce.rees46.ru      | Домен для приема баунсов и FBL-сообщений от почтовых серверов получателей     | mailer.r46.yourdomain.com   |
| demo.rees46.ru        | Домен для демонстрационного магазина для кластера white-label, если требуется | demo.yourdomain.com         |

