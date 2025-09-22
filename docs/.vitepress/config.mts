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
      '/integration/': [],

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
            { text: 'Фасетный поиск', link: '/mechanics/search/facet-search' }
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
            { text: 'DIY', link: '/glossary/ecommerce/dyi' },
            { text: 'E-pharmacy', link: '/glossary/ecommerce/e-pharmacy' },
            { text: 'FMCG', link: '/glossary/ecommerce/fmcg' },
            { text: 'FoodTech', link: '/glossary/ecommerce/food-tech' },
            { text: 'Health & Beauty', link: '/glossary/ecommerce/health-and-beauty' },
            { text: 'eGrocery', link: '/glossary/ecommerce/egrocery' },
            { text: 'Конверсия', link: '/glossary/ecommerce/conversion' },
            { text: 'Товарный фид', link: '/glossary/ecommerce/products-feed' }
          ]
        },

        {
          text: 'Email-маркетинг',
          collapsed: true,
          items: [
            { text: 'Double opt-in', link: '/glossary/email-marketing/double-opt-in' },
            { text: 'Liquid Markup', link: '/glossary/email-marketing/liquid-markup' },
            { text: 'Mobile push', link: '/glossary/email-marketing/mobile-push' },
            { text: 'Opt-out', link: '/glossary/email-marketing/opt-out' },
            { text: 'Push-рассылки', link: '/glossary/email-marketing/push-campaigns' },
            { text: 'Push-токены', link: '/glossary/email-marketing/push-token' },
            { text: 'Welcome-цепочка', link: '/glossary/email-marketing/welcome-campaign' },
            { text: 'Автосборщик email', link: '/glossary/email-marketing/email-collector' },
            { text: 'Веб-пуш', link: '/glossary/email-marketing/web-push' },
            { text: 'Грейлистинг', link: '/glossary/email-marketing/gray-listing' },
            { text: 'Динамический сегмент', link: '/glossary/email-marketing/dynamic-segment' },
            { text: 'Канал доставки', link: '/glossary/email-marketing/delivery-channel' },
            { text: 'Комбинированная форма подписки', link: '/glossary/email-marketing/combined-subscription-form' },
            { text: 'Массовые рассылки', link: '/glossary/email-marketing/bulk-campaigns' },
            { text: 'Отложенная отправка', link: '/glossary/email-marketing/scheduled-campaign' },
            { text: 'Пользовательские сегменты', link: '/glossary/email-marketing/segment' },
            { text: 'Прехедер', link: '/glossary/email-marketing/pre-header' },
            { text: 'Реактивационное письмо', link: '/glossary/email-marketing/reactivation-message' },
            { text: 'Событие-триггер', link: '/glossary/email-marketing/event-trigger' },
            { text: 'Ссылка отписки (англ. unsubscribe link)', link: '/glossary/email-marketing/unsubsribe-link' },
            { text: 'Статичный сегмент', link: '/glossary/email-marketing/static-segment' },
            { text: 'Тестовое письмо', link: '/glossary/email-marketing/test-message' },
            { text: 'Транзакционные SMS', link: '/glossary/email-marketing/transactional-sms' },
            { text: 'Транзакционные email', link: '/glossary/email-marketing/transactional-email' },
            { text: 'Транзакционные мультисообщения', link: '/glossary/email-marketing/transactional-cascade-message' },
            { text: 'Транзакционные рассылки', link: '/glossary/email-marketing/transactional-messages' },
            { text: 'Триггерные цепочки', link: '/glossary/email-marketing/trigger-campaigns' },
            { text: 'Целевые клики', link: '/glossary/email-marketing/target-clicks' }
          ]
        },

        {
          text: 'Маркетинг',
          collapsed: true,
          items: [
            { text: 'A/B-тест', link: '/glossary/marketing/ab-test' },
            { text: 'API', link: '/glossary/marketing/api' },
            { text: 'Big Data', link: '/glossary/marketing/big-data' },
            { text: 'Customer journey', link: '/glossary/marketing/customer-journey' },
            { text: 'Data-driven', link: '/glossary/marketing/data-driven' },
            { text: 'Google Analytics', link: '/glossary/marketing/google-analytics' },
            { text: 'KPI', link: '/glossary/marketing/kpi' },
            { text: 'Mindmap', link: '/glossary/marketing/mindmap' },
            { text: 'No-code solutions', link: '/glossary/marketing/no-code-solutions' },
            { text: 'On-premise', link: '/glossary/marketing/on-premise' },
            { text: 'Performance-маркетинг', link: '/glossary/marketing/performance-marketing' },
            { text: 'SaaS', link: '/glossary/marketing/saas' },
            { text: 'UTM-метки', link: '/glossary/marketing/utm' },
            { text: 'Воронка продаж', link: '/glossary/marketing/sales-funnel' },
            { text: 'Дашборд', link: '/glossary/marketing/dashboard' },
            { text: 'Карта кликов (англ. click map)', link: '/glossary/marketing/click-map' },
            { text: 'Копакинг', link: '/glossary/marketing/co-packing' },
            { text: 'Лид (продажи)', link: '/glossary/marketing/lead' },
            { text: 'Лид-магнит', link: '/glossary/marketing/lead-magnet' },
            { text: 'Лидогенерация', link: '/glossary/marketing/lead-gen' },
            { text: 'Ликвидность', link: '/glossary/marketing/liquidity' },
            { text: 'Логика «ЕСЛИ/ТО»', link: '/glossary/marketing/if-else-logic' },
            { text: 'Логика «И/ИЛИ»', link: '/glossary/marketing/and-or-logic' },
            { text: 'Маржинальность', link: '/glossary/marketing/price-margin' },
            { text: 'Охват', link: '/glossary/marketing/reach' },
            { text: 'Попап', link: '/glossary/marketing/popup' },
            { text: 'Премодерация', link: '/glossary/marketing/pre-moderation' },
            { text: 'Программа лояльности', link: '/glossary/marketing/loyalty-program' },
            { text: 'Редирект', link: '/glossary/marketing/redirect' },
            { text: 'Ретаргетинг', link: '/glossary/marketing/retargeting' },
            { text: 'Сервис коротких ссылок (url shortener)', link: '/glossary/marketing/url-shortener' },
            { text: 'Сквозная аналитика', link: '/glossary/marketing/end-to-end-analytics' },
            { text: 'Соцдем', link: '/glossary/marketing/socio-demographics' },
            { text: 'Целевая аудитория', link: '/glossary/marketing/target-audience' }
          ]
        },

        {
          text: 'Метрики и аббревиатуры',
          collapsed: true,
          items: [
            { text: 'ABC-сегменты', link: '/glossary/metrics/abc-segments' },
            { text: 'AOV', link: '/glossary/metrics/aov' },
            { text: 'ARPPU', link: '/glossary/metrics/arppu' },
            { text: 'ARPU', link: '/glossary/metrics/arpu' },
            { text: 'Bounce rate', link: '/glossary/metrics/bounce-rate' },
            { text: 'CDP (customer data platform)', link: '/glossary/metrics/cdp' },
            { text: 'CMS (content management system)', link: '/glossary/metrics/cms' },
            { text: 'CPE', link: '/glossary/metrics/cpe' },
            { text: 'CPM', link: '/glossary/metrics/cpm' },
            { text: 'CPS', link: '/glossary/metrics/cps' },
            { text: 'CR (Conversion Rate)', link: '/glossary/metrics/conversion-rate' },
            { text: 'CRM', link: '/glossary/metrics/crm' },
            { text: 'CSV (формат файла)', link: '/glossary/metrics/csv' },
            { text: 'CTOR (рассылки)', link: '/glossary/metrics/ctor' },
            { text: 'CTR (рассылки)', link: '/glossary/metrics/ctr' },
            { text: 'D2C', link: '/glossary/metrics/d2c' },
            { text: 'DMP (data management platform)', link: '/glossary/metrics/dmp' },
            { text: 'Delivery Rate (рассылки)', link: '/glossary/metrics/delivery-rate' },
            { text: 'FM-анализ', link: '/glossary/metrics/fm-analysis' },
            { text: 'Hard bounce', link: '/glossary/metrics/hard-bounce' },
            { text: 'LTV', link: '/glossary/metrics/ltv' },
            { text: 'NPS (Net Promoter Score)', link: '/glossary/metrics/nps' },
            { text: 'O2O', link: '/glossary/metrics/o2o' },
            { text: 'OR (Open Rate)', link: '/glossary/metrics/open-rate' },
            { text: 'RF-анализ', link: '/glossary/metrics/rf-analysis' },
            { text: 'RFM-анализ', link: '/glossary/metrics/rfm-analysis' },
            { text: 'RM-анализ', link: '/glossary/metrics/rm-analysis' },
            { text: 'ROI', link: '/glossary/metrics/roi' },
            { text: 'ROMI', link: '/glossary/metrics/romi' },
            { text: 'RPE', link: '/glossary/metrics/rpe' },
            { text: 'Soft bounce', link: '/glossary/metrics/soft-bounce' },
            { text: 'Spam complaint rate', link: '/glossary/metrics/spam-rate' },
            { text: 'UnR (unsubscribe rate)', link: '/glossary/metrics/unsubscribe-rate' },
            { text: 'Валовая прибыль', link: '/glossary/metrics/gross-profit' },
            { text: 'Коэффициент оттока клиентов (англ. churn rate)', link: '/glossary/metrics/churn-rate' }
          ]
        },

        {
          text: 'Товарные рекомендации',
          collapsed: true,
          items: [
            { text: 'Upsell', link: '/glossary/product-recommendations/upsell' },
            { text: 'Блоки товарных рекомендаций', link: '/glossary/product-recommendations/product-recommendations-block' },
            { text: 'Коллаборативная фильтрация', link: '/glossary/product-recommendations/collaborative-filtering' },
            { text: 'Машинная персонализация', link: '/glossary/product-recommendations/machine-personalization' },
            { text: 'Отраслевая персонализация', link: '/glossary/product-recommendations/industry-personalization' },
            { text: 'Перекрёстные продажи (англ. cross-selling)', link: '/glossary/product-recommendations/cross-selling' },
            { text: 'Персонализация', link: '/glossary/product-recommendations/personalization' }
          ]
        },

        {
          text: 'Поиск',
          collapsed: true,
          items: [
            { text: 'Findability', link: '/glossary/search/findability' },
            { text: 'Natural Language Search', link: '/glossary/search/natural-language-search' },
            { text: 'Аппроксимация', link: '/glossary/search/approximation' },
            { text: 'Быстрый поиск', link: '/glossary/search/instant-search' },
            { text: 'Голосовой поиск', link: '/glossary/search/voice-search' },
            { text: 'Запросы с максимальной выручкой', link: '/glossary/search/most-profitable-requests' },
            { text: 'Нулевая выдача', link: '/glossary/search/empty-search-results' },
            { text: 'Персональное ранжирование', link: '/glossary/search/personalized-ranking' },
            { text: 'Полный поиск', link: '/glossary/search/full-search' },
            { text: 'Популярные запросы без выручки', link: '/glossary/search/popular-requests-without-purchases' },
            { text: 'Синонимы (запросы)', link: '/glossary/search/synonym' },
            { text: 'Стемминг', link: '/glossary/search/stemming' },
            { text: 'Стоп-лист', link: '/glossary/search/stop-list' }
          ]
        },

      ],

      '/legal/': [
        {
          text: 'Юридические документы',
          collapsed: false,
          items: [
            { text: 'Список документов', link: 'legal/index' },
            { text: 'Пользовательское соглашение', link: 'legal/agreement' },
            { text: 'Договор-оферта', link: 'legal/offer' },
            { text: 'Политика конфиденциальности', link: 'legal/policy' }
          ]
        },
        {
          text: 'Согласия',
          collapsed: false,
          items: [
            { text: 'Согласие на получение и обработку персональных данных при запросе на обратную связь', link: 'legal/feedback' },
            { text: 'Согласие на получение и обработку персональных данных', link: 'legal/personal-data' },
            { text: 'Согласие на получение и обработку персональных данных в целях рекламы', link: 'legal/ads' },
            { text: 'Согласие на получение и обработку персональных данных при регистрации', link: 'legal/registration' }
          ]
        }
      ],
    },

    socialLinks: [
      // { icon: 'github', link: 'https://github.com/vuejs/vitepress' }
    ]
  }
})
