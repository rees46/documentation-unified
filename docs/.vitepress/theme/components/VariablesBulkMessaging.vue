<template>
  <div class="template-list">
    <h2>Список шаблонов</h2>
    <ul class="template-names">
      <li
          v-for="(vars, template) in templates"
          :key="template"
          @click="selected = template"
          :class="{ active: selected === template }"
      >
        {{ template }}
      </li>
    </ul>

    <div v-if="selected" class="variables-block">
      <h3>Переменные для {{ selected }}</h3>
      <ul class="variables-list">
        <li v-for="variable in templates[selected]" :key="variable">
          <code>{{ variable }}</code>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  name: 'VariableList',
  data() {
    return {
      selected: null,
      templates: {
        Email: [
          'client_id',
          'first_name',
          'middle_name',
          'last_name',
          'gender',
          'location',
          'age',
          'birthday',
          'telegram_id',
          'external_id',
          'loyalty_id',
          'loyalty_status',
          'loyalty_bonuses',
          'loyalty_bonuses_to_next_level',
          'logo_url',
          'footer',
          'phone',
          'email',
          'tracking_url',
          'unsubscribe_url',
          'less_often_url',
          'promocode',
          'html_letter',
          'nps',
          'tracking_pixel',
          'properties',
          'loyalty_balance_active_bonuses',
          'loyalty_balance_pending_bonuses',
          'loyalty_balance_expiring_bonuses',
          'loyalty_actual_level',
          'campaign_id',
          `referral_code`,
          `referral_code_ID`,
          `loyalty_subscription_code`,
          `loyalty_subscription_name`,
          `loyalty_subscription_plan_code`,
          `loyalty_subscription_plan_name`
        ],
        HTTP: [
          'client_id',
          'email',
          'phone',
          'location',
          'external_id',
          'first_name',
          'last_name',
          'loyalty_status',
          'loyalty_bonuses',
          'loyalty_bonuses_to_next_level',
          'promocode',
          'properties',
          'loyalty_balance_active_bonuses',
          'loyalty_balance_pending_bonuses',
          'loyalty_balance_expiring_bonuses',
          'loyalty_actual_level',
          'campaign_id',
          `referral_code`,
          `referral_code_ID`
        ],
        SMS: [
          'first_name',
          'last_name',
          'external_id',
          'location',
          'loyalty_status',
          'loyalty_bonuses',
          'loyalty_bonuses_to_next_level',
          'promocode',
          'properties',
          'loyalty_balance_active_bonuses',
          'loyalty_balance_pending_bonuses',
          'loyalty_balance_expiring_bonuses',
          'loyalty_actual_level',
          'campaign_id',
          `referral_code`,
          `referral_code_ID`
        ],
        Telegram: [
          'client_id',
          'first_name',
          'last_name',
          'external_id',
          'location',
          'loyalty_status',
          'loyalty_bonuses',
          'loyalty_bonuses_to_next_level',
          'promocode',
          'properties',
          'loyalty_balance_active_bonuses',
          'loyalty_balance_pending_bonuses',
          'loyalty_balance_expiring_bonuses',
          'loyalty_actual_level',
          'campaign_id',
          `referral_code`,
          `referral_code_ID`
        ],
        'Web Push': [
          'first_name',
          'last_name',
          'external_id',
          'location',
          'loyalty_status',
          'loyalty_bonuses',
          'loyalty_bonuses_to_next_level',
          'promocode',
          'properties',
          'loyalty_balance_active_bonuses',
          'loyalty_balance_pending_bonuses',
          'loyalty_balance_expiring_bonuses',
          'loyalty_actual_level',
          'campaign_id',
          `referral_code`,
          `referral_code_ID`
        ],
        WhatsApp: [
          'first_name',
          'last_name',
          'external_id',
          'location',
          'loyalty_status',
          'loyalty_bonuses',
          'loyalty_bonuses_to_next_level',
          'promocode',
          'properties',
          'loyalty_balance_active_bonuses',
          'loyalty_balance_pending_bonuses',
          'loyalty_balance_expiring_bonuses',
          'loyalty_actual_level',
          'campaign_id',
          `referral_code`,
          `referral_code_ID`
        ],
        Recommendations: [
          'title',
          'recommended_items - каждый товар имеет свойства:',
          'barcode',
          'brand',
          'categories',
          'category_ids',
          'currency',
          'description',
          'discount',
          'discount_formatted',
          'fashion_original_sizes',
          'fashion_sizes',
          'group_id',
          'id',
          'image_url',
          'image_url_resized',
          'is_new',
          'leftovers',
          'location_ids',
          'model',
          'name',
          'oldprice',
          'oldprice_formatted',
          'oldprice_full',
          'oldprice_full_formatted',
          'price',
          'price_formatted',
          'price_full',
          'price_full_formatted',
          'rating',
          'relative_sales_rate',
          'sales_rate',
          'stock_quantity',
          'url'

        ],
      },
    };
  },
};
</script>

<style scoped>
.template-list {
  font-family: sans-serif;
  max-width: 600px;
}
.template-names {
  list-style: none;
  padding: 0;
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-bottom: 1rem;
}
.template-names li {
  padding: 0.5rem 1rem;
  margin-top: 8px;
  background-color: #25c066;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.2s;
}
.template-names li.active,
.template-names li:hover {
  background-color: #ccc;
}
.variables-block {
  border-top: 1px solid #ddd;
  padding-top: 1rem;
}
.variables-list {
  list-style: none;
  padding-left: 0;
}
.variables-list li {
  padding: 0.25rem 0;
}
</style>
