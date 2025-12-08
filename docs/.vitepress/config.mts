import { defineConfig } from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "REES46",
  description: "Документация платформы",
  base: '/docs',
  themeConfig: {

    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: 'Начало', link: '/' },
      { text: 'Руководство', link: '/guides' },
      { text: 'Интеграция и API', link: '/integration' },
      { text: 'Механики', link: '/mechanics' },
      { text: 'Обучение', link: '/education' },
      { text: 'Глоссарий', link: '/glossary' },
      { text: 'Юридические документы', link: '/legal' },
    ],

    sidebar: {
      '/guides/': [],

      '/integration/': [
        {
          text: 'Начальная интеграция',
          collapsed: true,
          items: [
            { text: 'Введение', link: '/integration/start/index.md' },
            { text: 'Установка SDK', link: '/integration/start/sdk.md' },
            { text: 'Инициализация сессии', link: '/integration/start/init.md' },
            { text: 'Стандартные события', link: '/integration/start/events.md' },
            { text: 'Кастомные события', link: '/integration/start/custom-events.md' },
            { text: 'Профиль', link: '/integration/start/profile.md' },
          ]
        },
        {
          text: 'Каталог',
          collapsed: true,
          items: [
            { text: 'Введение', link: '/integration/catalog/index.md' },
          ]
        },
        {
          text: 'Каналы коммуникации',
          collapsed: true,
          items: [
            { text: 'Введение', link: '/integration/channels/index.md' },
          ]
        },
        {
          text: 'Товарные рекомендации',
          collapsed: true,
          items: [
            { text: 'Введение', link: '/integration/recommendations/index.md' },
          ]
        },
        {
          text: 'Поиск',
          collapsed: true,
          items: [
            { text: 'Введение', link: '/integration/search/index.md' },
          ]
        },
        {
          text: 'Листинг товаров',
          collapsed: true,
          items: [
            { text: 'Введение', link: '/integration/listing/index.md' },
          ]
        },
        {
          text: 'Товарные коллекции',
          collapsed: true,
          items: [
            { text: 'Введение', link: '/integration/collections/index.md' },
          ]
        },
        {
          text: 'Сторис',
          collapsed: true,
          items: [
            { text: 'Введение', link: '/integration/stories/index.md' },
          ]
        },
        {
          text: 'Попапы и in-app push',
          collapsed: true,
          items: [
            { text: 'Введение', link: '/integration/popups/index.md' },
          ]
        },
        {
          text: 'Программа лояльности',
          collapsed: true,
          items: [
            { text: 'Введение', link: '/integration/loyalty/index.md' },
            {
              text: 'Wallet',
              collapsed: true,
              items: [
                { text: 'Введение', link: '/integration/loyalty/wallet/index.md' },
                { text: 'Настройка Apple Wallet', link: '/integration/loyalty/wallet/apple.md' },
                { text: 'Настройка Google Wallet', link: '/integration/loyalty/wallet/google.md' },
                { text: 'Распространение', link: '/integration/loyalty/wallet/distribute.md' },
              ]
            }
          ]
        },
        {
          text: 'Режим PRO',
          collapsed: true,
          items: [
            { text: 'Введение', link: '/integration/extended/index.md' },
            { text: 'On-premise', link: '/integration/extended/on-premise.md' },
            { text: 'White label', link: '/integration/extended/white-label.md' },
            { text: 'S2S – серверная интеграция', link: '/integration/extended/s2s.md' },
            { text: 'Dashboard API', link: '/integration/extended/dashboard-api.md' },
          ]
        },
      ],

      '/mechanics/': [
        {
          text: 'CDP и обогащение данных',
          collapsed: true,
          items: [
          ]
        },
        {
          text: 'Товарные рекомендации',
          collapsed: true,
          items: [
          ]
        },
        {
          text: 'Поиск',
          collapsed: true,
          items: [
          ]
        },
        {
          text: 'Листинг товаров',
          collapsed: true,
          items: [
          ]
        },
        {
          text: 'Товарные коллекции',
          collapsed: true,
          items: [
          ]
        },
        {
          text: 'Попапы',
          collapsed: true,
          items: [
          ]
        },
      ],

      '/education/': [],

      '/glossary/': [

        {
          text: 'E-commerce',
          collapsed: true,
          items: [
            { text: 'DIY', link: '/glossary/ecommerce/dyi.md' },
            { text: 'E-pharmacy', link: '/glossary/ecommerce/e-pharmacy.md' },
            { text: 'FMCG', link: '/glossary/ecommerce/fmcg.md' },
            { text: 'FoodTech', link: '/glossary/ecommerce/food-tech.md' },
            { text: 'Health & Beauty', link: '/glossary/ecommerce/health-and-beauty.md' },
            { text: 'eGrocery', link: '/glossary/ecommerce/egrocery.md' },
            { text: 'Конверсия', link: '/glossary/ecommerce/conversion.md' },
            { text: 'Товарный фид', link: '/glossary/ecommerce/products-feed.md' }
          ]
        },

        {
          text: 'Email-маркетинг',
          collapsed: true,
          items: [
            { text: 'Double opt-in', link: '/glossary/email-marketing/double-opt-in.md' },
            { text: 'Liquid Markup', link: '/glossary/email-marketing/liquid-markup.md' },
            { text: 'Mobile push', link: '/glossary/email-marketing/mobile-push.md' },
            { text: 'Opt-out', link: '/glossary/email-marketing/opt-out.md' },
            { text: 'Push-рассылки', link: '/glossary/email-marketing/push-campaigns.md' },
            { text: 'Push-токены', link: '/glossary/email-marketing/push-token.md' },
            { text: 'Welcome-цепочка', link: '/glossary/email-marketing/welcome-campaign.md' },
            { text: 'Автосборщик email', link: '/glossary/email-marketing/email-collector.md' },
            { text: 'Веб-пуш', link: '/glossary/email-marketing/web-push.md' },
            { text: 'Грейлистинг', link: '/glossary/email-marketing/gray-listing.md' },
            { text: 'Динамический сегмент', link: '/glossary/email-marketing/dynamic-segment.md' },
            { text: 'Канал доставки', link: '/glossary/email-marketing/delivery-channel.md' },
            { text: 'Комбинированная форма подписки', link: '/glossary/email-marketing/combined-subscription-form.md' },
            { text: 'Массовые рассылки', link: '/glossary/email-marketing/bulk-campaigns.md' },
            { text: 'Отложенная отправка', link: '/glossary/email-marketing/scheduled-campaign.md' },
            { text: 'Пользовательские сегменты', link: '/glossary/email-marketing/segment.md' },
            { text: 'Прехедер', link: '/glossary/email-marketing/pre-header.md' },
            { text: 'Реактивационное письмо', link: '/glossary/email-marketing/reactivation-message.md' },
            { text: 'Событие-триггер', link: '/glossary/email-marketing/event-trigger.md' },
            { text: 'Ссылка отписки (англ. unsubscribe link)', link: '/glossary/email-marketing/unsubsribe-link.md' },
            { text: 'Статичный сегмент', link: '/glossary/email-marketing/static-segment.md' },
            { text: 'Тестовое письмо', link: '/glossary/email-marketing/test-message.md' },
            { text: 'Транзакционные SMS', link: '/glossary/email-marketing/transactional-sms.md' },
            { text: 'Транзакционные email', link: '/glossary/email-marketing/transactional-email.md' },
            { text: 'Транзакционные мультисообщения', link: '/glossary/email-marketing/transactional-cascade-message.md' },
            { text: 'Транзакционные рассылки', link: '/glossary/email-marketing/transactional-messages.md' },
            { text: 'Триггерные цепочки', link: '/glossary/email-marketing/trigger-campaigns.md' },
            { text: 'Целевые клики', link: '/glossary/email-marketing/target-clicks.md' }
          ]
        },

        {
          text: 'Маркетинг',
          collapsed: true,
          items: [
            { text: 'A/B-тест', link: '/glossary/marketing/ab-test.md' },
            { text: 'API', link: '/glossary/marketing/api.md' },
            { text: 'Big Data', link: '/glossary/marketing/big-data.md' },
            { text: 'Customer journey', link: '/glossary/marketing/customer-journey.md' },
            { text: 'Data-driven', link: '/glossary/marketing/data-driven.md' },
            { text: 'Google Analytics', link: '/glossary/marketing/google-analytics.md' },
            { text: 'KPI', link: '/glossary/marketing/kpi.md' },
            { text: 'Mindmap', link: '/glossary/marketing/mindmap.md' },
            { text: 'No-code solutions', link: '/glossary/marketing/no-code-solutions.md' },
            { text: 'On-premise', link: '/glossary/marketing/on-premise.md' },
            { text: 'Performance-маркетинг', link: '/glossary/marketing/performance-marketing.md' },
            { text: 'SaaS', link: '/glossary/marketing/saas.md' },
            { text: 'UTM-метки', link: '/glossary/marketing/utm.md' },
            { text: 'Воронка продаж', link: '/glossary/marketing/sales-funnel.md' },
            { text: 'Дашборд', link: '/glossary/marketing/dashboard.md' },
            { text: 'Карта кликов (англ. click map)', link: '/glossary/marketing/click-map.md' },
            { text: 'Копакинг', link: '/glossary/marketing/co-packing.md' },
            { text: 'Лид (продажи)', link: '/glossary/marketing/lead.md' },
            { text: 'Лид-магнит', link: '/glossary/marketing/lead-magnet.md' },
            { text: 'Лидогенерация', link: '/glossary/marketing/lead-gen.md' },
            { text: 'Ликвидность', link: '/glossary/marketing/liquidity.md' },
            { text: 'Логика «ЕСЛИ/ТО»', link: '/glossary/marketing/if-else-logic.md' },
            { text: 'Логика «И/ИЛИ»', link: '/glossary/marketing/and-or-logic.md' },
            { text: 'Маржинальность', link: '/glossary/marketing/price-margin.md' },
            { text: 'Охват', link: '/glossary/marketing/reach.md' },
            { text: 'Попап', link: '/glossary/marketing/popup.md' },
            { text: 'Премодерация', link: '/glossary/marketing/pre-moderation.md' },
            { text: 'Программа лояльности', link: '/glossary/marketing/loyalty-program.md' },
            { text: 'Редирект', link: '/glossary/marketing/redirect.md' },
            { text: 'Ретаргетинг', link: '/glossary/marketing/retargeting.md' },
            { text: 'Сервис коротких ссылок (url shortener)', link: '/glossary/marketing/url-shortener.md' },
            { text: 'Сквозная аналитика', link: '/glossary/marketing/end-to-end-analytics.md' },
            { text: 'Соцдем', link: '/glossary/marketing/socio-demographics.md' },
            { text: 'Целевая аудитория', link: '/glossary/marketing/target-audience.md' }
          ]
        },

        {
          text: 'Метрики и аббревиатуры',
          collapsed: true,
          items: [
            { text: 'ABC-сегменты', link: '/glossary/metrics/abc-segments.md' },
            { text: 'AOV', link: '/glossary/metrics/aov.md' },
            { text: 'ARPPU', link: '/glossary/metrics/arppu.md' },
            { text: 'ARPU', link: '/glossary/metrics/arpu.md' },
            { text: 'Bounce rate', link: '/glossary/metrics/bounce-rate.md' },
            { text: 'CDP (customer data platform)', link: '/glossary/metrics/cdp.md' },
            { text: 'CMS (content management system)', link: '/glossary/metrics/cms.md' },
            { text: 'CPE', link: '/glossary/metrics/cpe.md' },
            { text: 'CPM', link: '/glossary/metrics/cpm.md' },
            { text: 'CPS', link: '/glossary/metrics/cps.md' },
            { text: 'CR (Conversion Rate)', link: '/glossary/metrics/conversion-rate.md' },
            { text: 'CRM', link: '/glossary/metrics/crm.md' },
            { text: 'CSV (формат файла)', link: '/glossary/metrics/csv.md' },
            { text: 'CTOR (рассылки)', link: '/glossary/metrics/ctor.md' },
            { text: 'CTR (рассылки)', link: '/glossary/metrics/ctr.md' },
            { text: 'D2C', link: '/glossary/metrics/d2c.md' },
            { text: 'DMP (data management platform)', link: '/glossary/metrics/dmp.md' },
            { text: 'Delivery Rate (рассылки)', link: '/glossary/metrics/delivery-rate.md' },
            { text: 'FM-анализ', link: '/glossary/metrics/fm-analysis.md' },
            { text: 'Hard bounce', link: '/glossary/metrics/hard-bounce.md' },
            { text: 'LTV', link: '/glossary/metrics/ltv.md' },
            { text: 'NPS (Net Promoter Score)', link: '/glossary/metrics/nps.md' },
            { text: 'O2O', link: '/glossary/metrics/o2o.md' },
            { text: 'OR (Open Rate)', link: '/glossary/metrics/open-rate.md' },
            { text: 'RF-анализ', link: '/glossary/metrics/rf-analysis.md' },
            { text: 'RFM-анализ', link: '/glossary/metrics/rfm-analysis.md' },
            { text: 'RM-анализ', link: '/glossary/metrics/rm-analysis.md' },
            { text: 'ROI', link: '/glossary/metrics/roi.md' },
            { text: 'ROMI', link: '/glossary/metrics/romi.md' },
            { text: 'RPE', link: '/glossary/metrics/rpe.md' },
            { text: 'Soft bounce', link: '/glossary/metrics/soft-bounce.md' },
            { text: 'Spam complaint rate', link: '/glossary/metrics/spam-rate.md' },
            { text: 'UnR (unsubscribe rate)', link: '/glossary/metrics/unsubscribe-rate.md' },
            { text: 'Валовая прибыль', link: '/glossary/metrics/gross-profit.md' },
            { text: 'Коэффициент оттока клиентов (англ. churn rate)', link: '/glossary/metrics/churn-rate.md' }
          ]
        },

        {
          text: 'Товарные рекомендации',
          collapsed: true,
          items: [
            { text: 'Upsell', link: '/glossary/product-recommendations/upsell.md' },
            { text: 'Блоки товарных рекомендаций', link: '/glossary/product-recommendations/product-recommendations-block.md' },
            { text: 'Коллаборативная фильтрация', link: '/glossary/product-recommendations/collaborative-filtering.md' },
            { text: 'Машинная персонализация', link: '/glossary/product-recommendations/machine-personalization.md' },
            { text: 'Отраслевая персонализация', link: '/glossary/product-recommendations/industry-personalization.md' },
            { text: 'Перекрёстные продажи (англ. cross-selling)', link: '/glossary/product-recommendations/cross-selling.md' },
            { text: 'Персонализация', link: '/glossary/product-recommendations/personalization.md' }
          ]
        },

        {
          text: 'Поиск',
          collapsed: true,
          items: [
            { text: 'Findability', link: '/glossary/search/findability.md' },
            { text: 'Natural Language Search', link: '/glossary/search/natural-language-search.md' },
            { text: 'Аппроксимация', link: '/glossary/search/approximation.md' },
            { text: 'Быстрый поиск', link: '/glossary/search/instant-search.md' },
            { text: 'Голосовой поиск', link: '/glossary/search/voice-search.md' },
            { text: 'Запросы с максимальной выручкой', link: '/glossary/search/most-profitable-requests.md' },
            { text: 'Нулевая выдача', link: '/glossary/search/empty-search-results.md' },
            { text: 'Персональное ранжирование', link: '/glossary/search/personalized-ranking.md' },
            { text: 'Полный поиск', link: '/glossary/search/full-search.md' },
            { text: 'Популярные запросы без выручки', link: '/glossary/search/popular-requests-without-purchases.md' },
            { text: 'Синонимы (запросы)', link: '/glossary/search/synonym.md' },
            { text: 'Стемминг', link: '/glossary/search/stemming.md' },
            { text: 'Стоп-лист', link: '/glossary/search/stop-list.md' }
          ]
        },

      ],

      '/legal/': [
        {
          text: 'Юридические документы',
          collapsed: false,
          items: [
            { text: 'Список документов', link: 'legal/index.md' },
            { text: 'Пользовательское соглашение', link: 'legal/agreement.md' },
            { text: 'Договор-оферта', link: 'legal/offer.md' },
            { text: 'Политика конфиденциальности', link: 'legal/policy.md' }
          ]
        },
        {
          text: 'Согласия',
          collapsed: false,
          items: [
            { text: 'Согласие на получение и обработку персональных данных при запросе на обратную связь', link: 'legal/feedback.md' },
            { text: 'Согласие на получение и обработку персональных данных', link: 'legal/personal-data.md' },
            { text: 'Согласие на получение и обработку персональных данных в целях рекламы', link: 'legal/ads.md' },
            { text: 'Согласие на получение и обработку персональных данных при регистрации', link: 'legal/registration.md' }
          ]
        }
      ],
    },

    socialLinks: [
      // { icon: 'github', link: 'https://github.com/vuejs/vitepress' }
    ]
  }
})