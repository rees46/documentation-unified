import {defineConfig} from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
    title: "REES46",
    description: "Документация платформы",
    base: "/help/",
    themeConfig: {

        search: {
          provider: 'local'
        },

        // https://vitepress.dev/reference/default-theme-config
        nav: [
            {text: 'Начало', link: '/'},
            {text: 'Руководство', link: '/guides'},
            {text: 'Интеграция и API', link: '/integration'},
            {text: 'Механики', link: '/mechanics'},
            {text: 'Обучение', link: '/education'},
            {text: 'Глоссарий', link: '/glossary'},
            {text: 'Юридические документы', link: '/legal'},
        ],

        sidebar: {
            '/guides/': [
                {
                    text: `Общий контент`,
                    collapsed: true,
                    items: [
                        {text: 'Баннеры и слайдеры', link: '/guides/common-content/sliders/index.md'},
                        {text: 'Вставляемые скрипты', link: '/guides/common-content/js-snippets/index.md'},
                        {text: 'Промокоды', link: '/guides/common-content/promocodes/index.md'},
                        {text: 'Список поддерживаемых liquid-переменных', link: '/guides/common-content/liquid-vars/liquid-vars.md'},
                    ]
                },
                {
                    text: `CDP`,
                    collapsed: true,
                    items: [
                        { text: 'О сервисе', link: '/guides/cdp/index.md' },
                        { text: 'Расширенная CDP', link: '/guides/cdp/features.md' },
                    ]
                },
            ],

            '/integration/': [
                {text: 'План интеграции', link: '/integration/index.md'},
                {
                    text: 'CDP',
                    collapsed: true,
                    items: [
                        {text: 'Введение', link: '/integration/cdp/index.md'},
                        {text: 'Идентификатор клиента', link: '/integration/cdp/identifier.md'},
                        {text: 'Установка SDK', link: '/integration/cdp/sdk.md'},
                        {
                          text: 'Стандартные события',
                          collapsed: true,
                          items: [
                            {text: 'Введение', link: '/integration/cdp/standard-events/index.md'},
                            {text: 'Атрибуция инструментов', link: '/integration/cdp/standard-events/attribution.md'},
                            {text: 'Просмотр товара', link: '/integration/cdp/standard-events/view.md'},
                            {text: 'Просмотр категории', link: '/integration/cdp/standard-events/category.md'},
                            {text: 'Поисковый запрос', link: '/integration/cdp/standard-events/search.md'},
                            {text: 'Покупка', link: '/integration/cdp/standard-events/purchase.md'},
                            {text: 'Добавление в избранное', link: '/integration/cdp/standard-events/favorites.md'},
                            {text: 'Убрать из избранного', link: '/integration/cdp/standard-events/remove-from-favorites.md'},
                            {text: 'Просмотр сторис', link: '/integration/cdp/standard-events/stories.md'},
                          ]
                        },
                        {text: 'Кастомные события', link: '/integration/cdp/custom-events.md'},
                        {
                          text: 'События рассылок',
                          collapsed: true,
                          items: [
                            {text: 'Введение', link: '/integration/cdp/communications-events/index.md'},
                            {text: 'Трекинг источника', link: '/integration/cdp/communications-events/source.md'},
                            {text: 'Сообщение доставлено', link: '/integration/cdp/communications-events/message-delivered.md'},
                            {text: 'Сообщение открыто', link: '/integration/cdp/communications-events/message-opened.md'},
                            {text: 'Клик по сообщению', link: '/integration/cdp/communications-events/message-clicked.md'},
                            {text: 'Сообщение закрыто', link: '/integration/cdp/communications-events/message-closed.md'},
                          ]
                        },
                        {
                          text: 'Профиль',
                          collapsed: true,
                          items: [
                            {text: 'Введение', link: '/integration/cdp/profile/index.md'},
                            {text: 'Запись', link: '/integration/cdp/profile/set.md'},
                            {text: 'Чтение', link: '/integration/cdp/profile/get.md'},
                            {text: 'Перезаписать email', link: '/integration/cdp/profile/force-change-email.md'},
                            {text: 'Перезаписать телефон', link: '/integration/cdp/profile/force-change-phone.md'},
                            {text: 'Очистить профиль', link: '/integration/cdp/profile/purge.md'},
                          ]
                        },
                        {
                          text: 'Заказы и их статусы',
                          collapsed: true,
                          items: [
                            {text: 'Введение', link: '/integration/cdp/orders/index.md'},
                            {text: 'Статусы заказов', link: '/integration/cdp/orders/status.md'},
                            {text: 'Оффлайн-заказы', link: '/integration/cdp/orders/offline.md'},
                          ]
                        },
                    ]
                },
                {
                    text: 'Каталог',
                    collapsed: true,
                    items: [
                        {text: 'Введение', link: '/integration/catalog/index.md'},
                    ]
                },
                {
                    text: 'Рассылки',
                    collapsed: true,
                    items: [
                        { text: 'Введение', link: '/integration/messaging/index.md' },
                        {
                            text: 'Настройка каналов',
                            collapsed: true,
                            items: [
                                {text: 'Email', link: '/integration/messaging/channels/email.md'},
                                {text: 'Mobile push', link: '/integration/messaging/channels/mobile-push.md'},
                                {text: 'Web push', link: '/integration/messaging/channels/web-push.md'},
                                {text: 'SMS', link: '/integration/messaging/channels/sms.md'},
                                {text: 'WhatsApp', link: '/integration/messaging/channels/whatsapp.md'},
                                {text: 'Telegram', link: '/integration/messaging/channels/telegram.md'},
                                {text: 'Wallet', link: '/integration/messaging/channels/wallet.md'},
                                {text: 'MAX', link: '/integration/messaging/channels/max.md'},
                            ]
                        },
                        {
                          text: 'Триггерные цепочки',
                          collapsed: true,
                          items: [
                            {text: 'Введение', link: '/integration/messaging/triggers/index.md'},
                            {text: 'Стандартные триггеры', link: '/integration/messaging/triggers/common.md'},
                            {text: 'Кастомные триггеры', link: '/integration/messaging/triggers/custom.md'},
                            {text: 'Системные триггеры', link: '/integration/messaging/triggers/system.md'},
                          ]
                        },
                        {
                          text: 'Транзакционные рассылки',
                          collapsed: true,
                          items: [
                            {text: 'Введение', link: '/integration/messaging/transactional/index.md'},
                            {text: 'Отправка', link: '/integration/messaging/transactional/sending.md'},
                            {text: 'Отправка файлов', link: '/integration/messaging/transactional/files.md'},
                            {text: 'Каскады', link: '/integration/messaging/transactional/cascade.md'},
                          ]
                        },
                    ]
                },
                {
                    text: 'Товарные рекомендации',
                    collapsed: true,
                    items: [
                        {text: 'Введение', link: '/integration/recommendations/index.md'},

                    ]
                },
                {
                    text: 'Поиск',
                    collapsed: true,
                    items: [
                        {text: 'Введение', link: '/integration/search/index.md'},
                    ]
                },
                {
                    text: 'Листинг товаров',
                    collapsed: true,
                    items: [
                        {text: 'Введение', link: '/integration/listing/index.md'},
                    ]
                },
                {
                    text: 'Товарные коллекции',
                    collapsed: true,
                    items: [
                        {text: 'Введение', link: '/integration/collections/index.md'},
                    ]
                },
                {
                    text: 'Сторис',
                    collapsed: true,
                    items: [
                        {text: 'Введение', link: '/integration/stories/index.md'},
                        {text: 'Сайт', link: '/integration/stories/web.md'},
                        {text: 'iOS', link: '/integration/stories/ios.md'},
                        {text: 'Android', link: '/integration/stories/android.md'},
                        {text: 'React Native', link: '/integration/stories/react-native.md'},
                    ]
                },
                {
                    text: 'Попапы и in-app push',
                    collapsed: true,
                    items: [
                        {text: 'Введение', link: '/integration/popups/index.md'},
                    ]
                },
                {
                    text: 'Программа лояльности',
                    collapsed: true,
                    items: [
                        {text: 'Введение', link: '/integration/loyalty/index.md'},
                        {
                            text: 'Участники ПЛ',
                            collapsed: true,
                            items: [
                                {text: 'Введение', link: '/integration/loyalty/membership/index.md'},
                                {text: 'Вступление в ПЛ', link: '/integration/loyalty/membership/join.md'},
                                {text: 'Выход из ПЛ', link: '/integration/loyalty/membership/leave.md'},
                                {text: 'Статус участника', link: '/integration/loyalty/membership/status.md'},
                            ]
                        },
                        {
                            text: 'Процессинг',
                            collapsed: true,
                            items: [
                                {text: 'Введение', link: '/integration/loyalty/checkout/index.md'},
                                {text: 'Управление запретами', link: '/integration/loyalty/checkout/exclude.md'},
                                {text: 'Предварительная оценка', link: '/integration/loyalty/checkout/estimate.md'},
                                {text: 'Создание заказа', link: '/integration/loyalty/checkout/apply.md'},
                                {text: 'Подтверждение заказа', link: '/integration/loyalty/checkout/confirm.md'},
                                {text: 'Отмена заказа', link: '/integration/loyalty/checkout/cancel.md'},
                                {text: 'Частичный возврат', link: '/integration/loyalty/checkout/change.md'},
                                {text: 'Информация о заказе', link: '/integration/loyalty/checkout/details.md'},
                                {text: 'История заказов', link: '/integration/loyalty/checkout/history.md'},
                            ]
                        },
                        {
                            text: 'Акции',
                            collapsed: true,
                            items: [
                                {text: 'Введение', link: '/integration/loyalty/promotions/index.md'},
                                {text: 'Список акций', link: '/integration/loyalty/promotions/list.md'},
                                {text: 'Акции для клиента', link: '/integration/loyalty/promotions/client.md'},
                                {text: 'Акции для корзины', link: '/integration/loyalty/promotions/cart.md'},
                            ]
                        },
                        {
                            text: 'Интеграция с кассами',
                            collapsed: true,
                            items: [
                                {text: 'Введение', link: '/integration/loyalty/pos/index.md'},
                                {text: 'Эвотор', link: '/integration/loyalty/pos/evotor.md'},
                                {text: 'IIKO', link: '/integration/loyalty/pos/iiko.md'},
                                {text: '1С', link: '/integration/loyalty/pos/1c.md'},
                            ]
                        },
                        {
                            text: 'Бонусы',
                            collapsed: true,
                            items: [
                                {text: 'Введение', link: '/integration/loyalty/bonuses/index.md'},
                                {text: 'Бонусный баланс', link: '/integration/loyalty/bonuses/balance.md'},
                                {text: 'История транзакций', link: '/integration/loyalty/bonuses/history.md'},
                                {text: 'История вознаграждений', link: '/integration/loyalty/bonuses/history_events.md'},
                                {text: 'Вознаграждение бонусами', link: '/integration/loyalty/bonuses/reward.md'},
                                {text: 'Отмена вознаграждения', link: '/integration/loyalty/bonuses/cancel.md'},
                            ]
                        },
                        {
                            text: 'Сертификаты',
                            collapsed: true,
                            items: [
                                {text: 'Введение', link: '/integration/loyalty/certificates/index.md'},
                                {text: 'Список сертификатов', link: '/integration/loyalty/certificates/list.md'},
                                {text: 'Создание сертификата', link: '/integration/loyalty/certificates/create.md'},
                                {text: 'Активация сертификата', link: '/integration/loyalty/certificates/activate.md'},
                                {text: 'Деактивация сертификата', link: '/integration/loyalty/certificates/deactivate.md'},
                                {text: 'Блокировка сертификата', link: '/integration/loyalty/certificates/block.md'},
                                {text: 'Восстановить сертификат', link: '/integration/loyalty/certificates/unblock.md'},
                                {text: 'Баланс сертификата', link: '/integration/loyalty/certificates/balance.md'},
                                {text: 'Транзакции сертификата', link: '/integration/loyalty/certificates/transactions.md'},
                                {text: 'Сертификаты клиента', link: '/integration/loyalty/certificates/by-user.md'},
                                {text: '<hr>'},
                                {text: 'Объект сертификата', link: '/integration/loyalty/certificates/object-certificate.md'},
                                {text: 'Объект пула', link: '/integration/loyalty/certificates/object-pool.md'},
                                {text: 'Объект транзакции', link: '/integration/loyalty/certificates/object-transaction.md'},
                            ]
                        },
                        {
                            text: 'Реферальные программы',
                            collapsed: true,
                            items: [
                                {text: 'Введение', link: '/integration/loyalty/referral/index.md'},
                                {text: 'Регистрация участника', link: '/integration/loyalty/referral/join.md'},
                                {text: 'Коды участника', link: '/integration/loyalty/referral/code.md'},
                            ]
                        },
                        {
                            text: 'Wallet',
                            collapsed: true,
                            items: [
                                {text: 'Введение', link: '/integration/loyalty/wallet/index.md'},
                                {text: 'Настройка Apple Wallet', link: '/integration/loyalty/wallet/apple.md'},
                                {text: 'Настройка Google Wallet', link: '/integration/loyalty/wallet/google.md'},
                                {text: 'Распространение', link: '/integration/loyalty/wallet/distribute.md'},
                            ]
                        },
                        {
                            text: 'Подписки',
                            collapsed: true,
                            items: [
                                {text: 'Введение', link: '/integration/loyalty/subscriptions/index.md'},
                                {text: 'Сущности', link: '/integration/loyalty/subscriptions/glossary.md'},
                                {text: 'Создание подписки', link: '/integration/loyalty/subscriptions/join.md'},
                                {text: 'Продление подписки', link: '/integration/loyalty/subscriptions/prolong.md'},
                                {text: 'Удаление подписки', link: '/integration/loyalty/subscriptions/leave.md'},
                                {text: 'Список клиентов', link: '/integration/loyalty/subscriptions/members.md'},
                                {text: 'Статус клиента', link: '/integration/loyalty/subscriptions/status.md'},
                                {text: 'Отчет клиента', link: '/integration/loyalty/subscriptions/report.md'},
                            ]
                        },
                        {
                            text: 'Промокоды',
                            collapsed: true,
                            items: [
                                {text: 'Введение', link: '/integration/loyalty/promo-codes/index.md'},
                                {text: 'Списки', link: '/integration/loyalty/promo-codes/list.md'},
                                {text: 'Получение промокода', link: '/integration/loyalty/promo-codes/fetch.md'},
                                {text: 'Добавить промокоды', link: '/integration/loyalty/promo-codes/upload.md'},
                                {text: 'Очистить список', link: '/integration/loyalty/promo-codes/purge.md'},
                                {text: 'Удалить промокоды', link: '/integration/loyalty/promo-codes/delete.md'},
                            ]
                        },
                        {
                            text: 'Стикеры и фишки',
                            collapsed: true,
                            items: [
                                {text: 'Введение', link: '/integration/loyalty/stickers/index.md'},
                                {text: 'Баланс стикеров', link: '/integration/loyalty/stickers/balance.md'},
                                {text: 'История стикеров', link: '/integration/loyalty/stickers/history.md'},
                            ]
                        },
                        {
                            text: 'OTP верификация',
                            collapsed: true,
                            items: [
                                {text: 'Введение', link: '/integration/loyalty/otp/index.md'},
                                {text: 'Отправка кода', link: '/integration/loyalty/otp/code-send.md'},
                                {text: 'Проверка кода', link: '/integration/loyalty/otp/code-check.md'},
                                {text: 'Получение QR-кода', link: '/integration/loyalty/otp/qr-get.md'},
                                {text: 'Проверка QR-кода', link: '/integration/loyalty/otp/qr-check.md'},
                            ]
                        },
                    ]
                },
                {
                    text: 'Режим PRO',
                    collapsed: true,
                    items: [
                        {text: 'Введение', link: '/integration/extended/index.md'},
                        {text: 'Виды поставки', link: '/integration/extended/clusters.md'},
                        {
                          text: 'On-premise',
                          collapsed: true,
                          items: [
                            {text: 'Введение', link: '/integration/extended/on-premise/index.md'},
                            {text: 'План действий', link: '/integration/extended/on-premise/plan.md'},
                            {text: 'Серверы', link: '/integration/extended/on-premise/servers.md'},
                            {text: 'Домены', link: '/integration/extended/on-premise/domains.md'},
                          ]
                        },
                        {
                          text: 'Почтовый кластер',
                          collapsed: true,
                          items: [
                            {text: 'Введение', link: '/integration/extended/mta/index.md'},
                            {text: 'Сервисные адреса', link: '/integration/extended/mta/mailboxes.md'},
                            {text: 'Домены для отправки', link: '/integration/extended/mta/senders.md'},
                            {text: 'Мониторинг репутации', link: '/integration/extended/mta/postmasters.md'},
                          ]
                        },

                        {text: 'S2S – серверная интеграция', link: '/integration/extended/s2s.md'},
                        {text: 'Dashboard API', link: '/integration/extended/dashboard-api.md'},
                        {
                          text: 'Служебные методы SDK',
                          collapsed: true,
                          items: [
                            {text: 'Введение', link: '/integration/extended/utility/index.md'},
                            {text: 'Сегмент A/B-теста', link: '/integration/extended/utility/segment.md'},
                            {text: 'Device ID', link: '/integration/extended/utility/did.md'},
                            {text: 'Seance ID', link: '/integration/extended/utility/sid.md'},
                            {text: 'Сокращение ссылок', link: '/integration/extended/utility/url-shortener.md'},
                          ]
                        },
                    ]
                },
            ],

            '/mechanics/': [
                {
                    text: 'CDP и обогащение данных',
                    collapsed: true,
                    items: []
                },
                {
                    text: 'Товарные рекомендации',
                    collapsed: true,
                    items: []
                },
                {
                    text: 'Поиск',
                    collapsed: true,
                    items: []
                },
                {
                    text: 'Листинг товаров',
                    collapsed: true,
                    items: []
                },
                {
                    text: 'Товарные коллекции',
                    collapsed: true,
                    items: []
                },
                {
                    text: 'Попапы',
                    collapsed: true,
                    items: []
                },
            ],

            '/education/': [
                {
                    text: 'Полезная информация',
                    collapsed: true,
                    items: [
                        {text: 'Как зарегистрироваться в качестве отправителя AMP-контента в Gmail', link: '/education/useful-information/amp-registration.md'},
                        {text: 'Требования и рекомендации по аутентификации электронной почты', link: '/education/useful-information/email-providers-validation.md'},
                   ]
                },
                {
                    text: 'Готовые примеры',
                    collapsed: true,
                    items: [
                        {text: 'Как настроить массовую рассылку WhatsApp (edna)', link: '/education/examples/mass-WA-campaign-edna.md'},
                   ]
                },

            ],

            '/glossary/': [

                {
                    text: 'E-commerce',
                    collapsed: true,
                    items: [
                        {text: 'DIY', link: '/glossary/ecommerce/dyi.md'},
                        {text: 'E-pharmacy', link: '/glossary/ecommerce/e-pharmacy.md'},
                        {text: 'FMCG', link: '/glossary/ecommerce/fmcg.md'},
                        {text: 'FoodTech', link: '/glossary/ecommerce/food-tech.md'},
                        {text: 'Health & Beauty', link: '/glossary/ecommerce/health-and-beauty.md'},
                        {text: 'eGrocery', link: '/glossary/ecommerce/egrocery.md'},
                        {text: 'Конверсия', link: '/glossary/ecommerce/conversion.md'},
                        {text: 'Товарный фид', link: '/glossary/ecommerce/products-feed.md'}
                    ]
                },

                {
                    text: 'Email-маркетинг',
                    collapsed: true,
                    items: [
                        {text: 'Double opt-in', link: '/glossary/email-marketing/double-opt-in.md'},
                        {text: 'Liquid Markup', link: '/glossary/email-marketing/liquid-markup.md'},
                        {text: 'Mobile push', link: '/glossary/email-marketing/mobile-push.md'},
                        {text: 'Opt-out', link: '/glossary/email-marketing/opt-out.md'},
                        {text: 'Push-рассылки', link: '/glossary/email-marketing/push-campaigns.md'},
                        {text: 'Push-токены', link: '/glossary/email-marketing/push-token.md'},
                        {text: 'Welcome-цепочка', link: '/glossary/email-marketing/welcome-campaign.md'},
                        {text: 'Автосборщик email', link: '/glossary/email-marketing/email-collector.md'},
                        {text: 'Веб-пуш', link: '/glossary/email-marketing/web-push.md'},
                        {text: 'Грейлистинг', link: '/glossary/email-marketing/gray-listing.md'},
                        {text: 'Динамический сегмент', link: '/glossary/email-marketing/dynamic-segment.md'},
                        {text: 'Канал доставки', link: '/glossary/email-marketing/delivery-channel.md'},
                        {
                            text: 'Комбинированная форма подписки',
                            link: '/glossary/email-marketing/combined-subscription-form.md'
                        },
                        {text: 'Массовые рассылки', link: '/glossary/email-marketing/bulk-campaigns.md'},
                        {text: 'Отложенная отправка', link: '/glossary/email-marketing/scheduled-campaign.md'},
                        {text: 'Пользовательские сегменты', link: '/glossary/email-marketing/segment.md'},
                        {text: 'Прехедер', link: '/glossary/email-marketing/pre-header.md'},
                        {text: 'Реактивационное письмо', link: '/glossary/email-marketing/reactivation-message.md'},
                        {text: 'Событие-триггер', link: '/glossary/email-marketing/event-trigger.md'},
                        {
                            text: 'Ссылка отписки (англ. unsubscribe link)',
                            link: '/glossary/email-marketing/unsubsribe-link.md'
                        },
                        {text: 'Статичный сегмент', link: '/glossary/email-marketing/static-segment.md'},
                        {text: 'Тестовое письмо', link: '/glossary/email-marketing/test-message.md'},
                        {text: 'Транзакционные SMS', link: '/glossary/email-marketing/transactional-sms.md'},
                        {text: 'Транзакционные email', link: '/glossary/email-marketing/transactional-email.md'},
                        {
                            text: 'Транзакционные мультисообщения',
                            link: '/glossary/email-marketing/transactional-cascade-message.md'
                        },
                        {text: 'Транзакционные рассылки', link: '/glossary/email-marketing/transactional-messages.md'},
                        {text: 'Триггерные цепочки', link: '/glossary/email-marketing/trigger-campaigns.md'},
                        {text: 'Целевые клики', link: '/glossary/email-marketing/target-clicks.md'}
                    ]
                },

                {
                    text: 'Маркетинг',
                    collapsed: true,
                    items: [
                        {text: 'A/B-тест', link: '/glossary/marketing/ab-test.md'},
                        {text: 'API', link: '/glossary/marketing/api.md'},
                        {text: 'Big Data', link: '/glossary/marketing/big-data.md'},
                        {text: 'Customer journey', link: '/glossary/marketing/customer-journey.md'},
                        {text: 'Data-driven', link: '/glossary/marketing/data-driven.md'},
                        {text: 'Google Analytics', link: '/glossary/marketing/google-analytics.md'},
                        {text: 'KPI', link: '/glossary/marketing/kpi.md'},
                        {text: 'Mindmap', link: '/glossary/marketing/mindmap.md'},
                        {text: 'No-code solutions', link: '/glossary/marketing/no-code-solutions.md'},
                        {text: 'On-premise', link: '/glossary/marketing/on-premise.md'},
                        {text: 'Performance-маркетинг', link: '/glossary/marketing/performance-marketing.md'},
                        {text: 'SaaS', link: '/glossary/marketing/saas.md'},
                        {text: 'UTM-метки', link: '/glossary/marketing/utm.md'},
                        {text: 'Воронка продаж', link: '/glossary/marketing/sales-funnel.md'},
                        {text: 'Дашборд', link: '/glossary/marketing/dashboard.md'},
                        {text: 'Карта кликов (англ. click map)', link: '/glossary/marketing/click-map.md'},
                        {text: 'Копакинг', link: '/glossary/marketing/co-packing.md'},
                        {text: 'Лид (продажи)', link: '/glossary/marketing/lead.md'},
                        {text: 'Лид-магнит', link: '/glossary/marketing/lead-magnet.md'},
                        {text: 'Лидогенерация', link: '/glossary/marketing/lead-gen.md'},
                        {text: 'Ликвидность', link: '/glossary/marketing/liquidity.md'},
                        {text: 'Логика «ЕСЛИ/ТО»', link: '/glossary/marketing/if-else-logic.md'},
                        {text: 'Логика «И/ИЛИ»', link: '/glossary/marketing/and-or-logic.md'},
                        {text: 'Маржинальность', link: '/glossary/marketing/price-margin.md'},
                        {text: 'Охват', link: '/glossary/marketing/reach.md'},
                        {text: 'Попап', link: '/glossary/marketing/popup.md'},
                        {text: 'Премодерация', link: '/glossary/marketing/pre-moderation.md'},
                        {text: 'Программа лояльности', link: '/glossary/marketing/loyalty-program.md'},
                        {text: 'Редирект', link: '/glossary/marketing/redirect.md'},
                        {text: 'Ретаргетинг', link: '/glossary/marketing/retargeting.md'},
                        {text: 'Сервис коротких ссылок (url shortener)', link: '/glossary/marketing/url-shortener.md'},
                        {text: 'Сквозная аналитика', link: '/glossary/marketing/end-to-end-analytics.md'},
                        {text: 'Соцдем', link: '/glossary/marketing/socio-demographics.md'},
                        {text: 'Целевая аудитория', link: '/glossary/marketing/target-audience.md'}
                    ]
                },

                {
                    text: 'Метрики и аббревиатуры',
                    collapsed: true,
                    items: [
                        {text: 'ABC-сегменты', link: '/glossary/metrics/abc-segments.md'},
                        {text: 'AOV', link: '/glossary/metrics/aov.md'},
                        {text: 'ARPPU', link: '/glossary/metrics/arppu.md'},
                        {text: 'ARPU', link: '/glossary/metrics/arpu.md'},
                        {text: 'Bounce rate', link: '/glossary/metrics/bounce-rate.md'},
                        {text: 'CDP (customer data platform)', link: '/glossary/metrics/cdp.md'},
                        {text: 'CMS (content management system)', link: '/glossary/metrics/cms.md'},
                        {text: 'CPE', link: '/glossary/metrics/cpe.md'},
                        {text: 'CPM', link: '/glossary/metrics/cpm.md'},
                        {text: 'CPS', link: '/glossary/metrics/cps.md'},
                        {text: 'CR (Conversion Rate)', link: '/glossary/metrics/conversion-rate.md'},
                        {text: 'CRM', link: '/glossary/metrics/crm.md'},
                        {text: 'CSV (формат файла)', link: '/glossary/metrics/csv.md'},
                        {text: 'CTOR (рассылки)', link: '/glossary/metrics/ctor.md'},
                        {text: 'CTR (рассылки)', link: '/glossary/metrics/ctr.md'},
                        {text: 'D2C', link: '/glossary/metrics/d2c.md'},
                        {text: 'DMP (data management platform)', link: '/glossary/metrics/dmp.md'},
                        {text: 'Delivery Rate (рассылки)', link: '/glossary/metrics/delivery-rate.md'},
                        {text: 'FM-анализ', link: '/glossary/metrics/fm-analysis.md'},
                        {text: 'Hard bounce', link: '/glossary/metrics/hard-bounce.md'},
                        {text: 'LTV', link: '/glossary/metrics/ltv.md'},
                        {text: 'NPS (Net Promoter Score)', link: '/glossary/metrics/nps.md'},
                        {text: 'O2O', link: '/glossary/metrics/o2o.md'},
                        {text: 'OR (Open Rate)', link: '/glossary/metrics/open-rate.md'},
                        {text: 'RF-анализ', link: '/glossary/metrics/rf-analysis.md'},
                        {text: 'RFM-анализ', link: '/glossary/metrics/rfm-analysis.md'},
                        {text: 'RM-анализ', link: '/glossary/metrics/rm-analysis.md'},
                        {text: 'ROI', link: '/glossary/metrics/roi.md'},
                        {text: 'ROMI', link: '/glossary/metrics/romi.md'},
                        {text: 'RPE', link: '/glossary/metrics/rpe.md'},
                        {text: 'Soft bounce', link: '/glossary/metrics/soft-bounce.md'},
                        {text: 'Spam complaint rate', link: '/glossary/metrics/spam-rate.md'},
                        {text: 'UnR (unsubscribe rate)', link: '/glossary/metrics/unsubscribe-rate.md'},
                        {text: 'Валовая прибыль', link: '/glossary/metrics/gross-profit.md'},
                        {
                            text: 'Коэффициент оттока клиентов (англ. churn rate)',
                            link: '/glossary/metrics/churn-rate.md'
                        }
                    ]
                },

                {
                    text: 'Товарные рекомендации',
                    collapsed: true,
                    items: [
                        {text: 'Upsell', link: '/glossary/product-recommendations/upsell.md'},
                        {
                            text: 'Блоки товарных рекомендаций',
                            link: '/glossary/product-recommendations/product-recommendations-block.md'
                        },
                        {
                            text: 'Коллаборативная фильтрация',
                            link: '/glossary/product-recommendations/collaborative-filtering.md'
                        },
                        {
                            text: 'Машинная персонализация',
                            link: '/glossary/product-recommendations/machine-personalization.md'
                        },
                        {
                            text: 'Отраслевая персонализация',
                            link: '/glossary/product-recommendations/industry-personalization.md'
                        },
                        {
                            text: 'Перекрёстные продажи (англ. cross-selling)',
                            link: '/glossary/product-recommendations/cross-selling.md'
                        },
                        {text: 'Персонализация', link: '/glossary/product-recommendations/personalization.md'}
                    ]
                },

                {
                    text: 'Поиск',
                    collapsed: true,
                    items: [
                        {text: 'Findability', link: '/glossary/search/findability.md'},
                        {text: 'Natural Language Search', link: '/glossary/search/natural-language-search.md'},
                        {text: 'Аппроксимация', link: '/glossary/search/approximation.md'},
                        {text: 'Быстрый поиск', link: '/glossary/search/instant-search.md'},
                        {text: 'Голосовой поиск', link: '/glossary/search/voice-search.md'},
                        {text: 'Запросы с максимальной выручкой', link: '/glossary/search/most-profitable-requests.md'},
                        {text: 'Нулевая выдача', link: '/glossary/search/empty-search-results.md'},
                        {text: 'Персональное ранжирование', link: '/glossary/search/personalized-ranking.md'},
                        {text: 'Полный поиск', link: '/glossary/search/full-search.md'},
                        {
                            text: 'Популярные запросы без выручки',
                            link: '/glossary/search/popular-requests-without-purchases.md'
                        },
                        {text: 'Синонимы (запросы)', link: '/glossary/search/synonym.md'},
                        {text: 'Стемминг', link: '/glossary/search/stemming.md'},
                        {text: 'Стоп-лист', link: '/glossary/search/stop-list.md'}
                    ]
                },

            ],

            '/legal/': [
                {text: 'Список документов', link: 'legal/index.md'},
                {
                    text: 'Юридические документы',
                    collapsed: false,
                    items: [
                        {text: 'Соглашение', link: 'legal/documents/agreement.md'},
                        {text: 'Договор-оферта', link: 'legal/documents/offer.md'},
                        {text: 'Конфиденциальность', link: 'legal/documents/policy.md'}
                    ]
                },
                {
                    text: 'Согласия',
                    collapsed: false,
                    items: [
                        {text: 'Обратная связь', link: 'legal/consents/feedback.md'},
                        {text: 'Персональные данные', link: 'legal/consents/personal-data.md'},
                        {text: 'Реклама', link: 'legal/consents/ads.md'},
                        {text: 'Обратная связь', link: 'legal/consents/registration.md'}
                    ]
                },
                {
                  text: 'Регламенты',
                  collapsed: false,
                  items: [
                    {text: 'Удаленный доступ', link: 'legal/protocols/remote-access.md'},
                    {text: 'Мониторинг', link: 'legal/protocols/monitoring.md'},
                    {text: 'Управление доступом', link: 'legal/protocols/access.md'},
                    {text: 'Реагирование на инциденты', link: 'legal/protocols/incidents.md'},
                    {text: 'Положения оператора ПД', link: 'legal/protocols/pi-operator.md'},
                    {text: 'NDA', link: 'legal/protocols/nda.md'},
                    {text: 'Процедура ознакомления', link: 'legal/protocols/sign.md'},
                  ]
                },

                {
                  text: 'Лицензии и сертификаты',
                  collapsed: false,
                  items: [
                    {text: 'Роспатент', link: 'legal/certificates/rospatent.md'},
                  ]
                },

                {
                    text: 'Технология',
                    collapsed: false,
                    items: [
                        {text: 'Технический стек', link: 'legal/technical/stack.md'},
                        {text: 'Сертификация ЦОДа', link: 'legal/technical/data-center.md'},
                    ]
                }

            ],
        },

        socialLinks: [
            // { icon: 'github', link: 'https://github.com/vuejs/vitepress' }
        ]
    }
})
