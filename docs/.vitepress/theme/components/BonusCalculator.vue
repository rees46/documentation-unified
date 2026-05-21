<template>
  <div class="bonus-calculator">
    <h2>Калькулятор списания бонусов</h2>

    <div class="user-bonuses">
      <h3>Бонусный баланс клиента</h3>
      <div class="form-group">
        <label>Количество бонусов:</label>
        <input type="number" v-model.number="bonuses" class="input" />
      </div>
      <div class="calculation">
        <p>Доступно для списания: <strong>{{ (bonuses * rate).toFixed(2) }} ₽</strong> ({{ bonuses }} бонусов × курс {{ rate }} ₽/бонус)</p>
      </div>
    </div>

    <div class="loyalty-settings">
      <h3>Настройки программы лояльности</h3>
      <div class="form-group">
        <label>Курс бонуса (1 бонус = ? ₽):</label>
        <input type="number" step="0.01" v-model.number="rate" class="input" />
      </div>
      <div class="form-group">
        <label>Максимальный процент оплаты бонусами:</label>
        <input type="number" v-model.number="maxPercent" class="input" />
      </div>
      <div class="form-group">
        <label>Скидка (%):</label>
        <input type="number" v-model.number="discount" class="input small" />
      </div>
    </div>

    <div class="cart-items">
      <h3>Товары в корзине</h3>
      <div v-for="(item, index) in items" :key="index" class="cart-item">
        <div class="form-group inline-field">
          <label>Название товара:</label>
          <input type="text" v-model="item.name" class="input small" />
        </div>

        <div class="form-group inline-field">
          <label>Базовая цена (₽):</label>
          <input type="number" v-model.number="item.price" class="input small" />
        </div>

        <div class="form-group inline-field">
          <label>Цена после скидки:</label>
          <span class="value">
          {{
            item.noDiscount
                ? item.price.toFixed(2)
                : (item.price - (item.price / 100) * discount).toFixed(2)
            }} ₽
          </span>
        </div>

        <div class="form-group inline-field">
          <label>
            <input type="checkbox" v-model="item.noDiscount" />
            Товар без скидки
          </label>
        </div>

        <div>
          <button @click="removeItem(index)" class="button button-delete">
            Удалить товар
          </button>
        </div>
      </div>

      <button @click="addItem" class="button  button-secondary">+ Добавить товар</button>
    </div>

    <div class="action-buttons">
      <button @click="calculate" class="button button-primary">Рассчитать</button>
      <button @click="resetCalculator" class="button button-reset">Сбросить</button>
    </div>

    <div v-if="calculationSteps" class="calculation-steps">
      <h3>Подробный расчёт списания бонусов</h3>

      <div class="calculation-step">
        <h4>Этап 1. Лимит списания по каждому товару</h4>
        <p>Для каждого товара вычисляем максимальную сумму, которую можно оплатить бонусами:</p>
        <p class="formula">(Цена товара - Скидка) × (Макс. процент / 100)</p>
        <table>
          <thead>
          <tr>
            <th>Товар</th>
            <th>Расчёт</th>
            <th>Лимит ({{ maxPercent }}%)</th>
          </tr>
          </thead>
          <tbody>
          <tr v-for="(item, index) in items" :key="index">
            <td>{{ item.name || 'Без названия' }}</td>
            <td>({{ item.price }} - {{ item.discount }}) × {{ maxPercent/100 }} =</td>
            <td>{{ calculationSteps.itemLimits[index].toFixed(2) }} ₽</td>
          </tr>
          </tbody>
        </table>
      </div>

      <div class="calculation-step">
        <h4>Этап 2. Общий лимит по корзине</h4>
        <p>Суммируем лимиты списания по всем товарам:</p>
        <p class="formula">{{ items.map((_, i) => calculationSteps.itemLimits[i].toFixed(2)).join(' + ') }} = {{ calculationSteps.totalLimit.toFixed(2) }} ₽</p>
      </div>

      <div class="calculation-step">
        <h4>Этап 3. Доступное списание</h4>
        <p>Сравниваем сколько клиент может оплатить бонусами и общий лимит по корзине:</p>
        <p class="formula">min(Бонусы × Курс, Общий лимит) = min({{ bonuses }} × {{ rate }}, {{ calculationSteps.totalLimit.toFixed(2) }}) =
          <strong>{{ calculationSteps.availableToWriteOff.toFixed(2) }} ₽</strong></p>
      </div>

      <div class="calculation-step">
        <h4>Этап 4. Коэффициент списания</h4>
        <p>Вычисляем долю от лимитов, которую можно реально использовать:</p>
        <p class="formula">Доступное списание / Общий лимит = {{ calculationSteps.availableToWriteOff.toFixed(2) }} / {{ calculationSteps.totalLimit.toFixed(2) }} =
          <strong>{{ calculationSteps.writeOffCoefficient.toFixed(4) }}</strong></p>
      </div>

      <div class="calculation-step">
        <h4>Этап 5. Сумма списания по товарам</h4>
        <p>Применяем коэффициент к лимиту каждого товара:</p>
        <p class="formula">Лимит × Коэффициент = Сумма списания</p>
        <table>
          <thead>
          <tr>
            <th>Товар</th>
            <th>Расчёт</th>
            <th>Сумма списания</th>
          </tr>
          </thead>
          <tbody>
          <tr v-for="(item, index) in items" :key="index">
            <td>{{ item.name || 'Без названия' }}</td>
            <td>{{ calculationSteps.itemLimits[index].toFixed(2) }} × {{ calculationSteps.writeOffCoefficient.toFixed(4) }} =</td>
            <td>{{ calculationSteps.itemWriteOffs[index].toFixed(2) }} ₽</td>
          </tr>
          </tbody>
        </table>
      </div>

      <div class="calculation-step">
        <h4>Этап 6. Количество списанных бонусов</h4>
        <p>Переводим сумму списания в бонусы (с округлением вниз):</p>
        <p class="formula">Сумма списания / Курс бонусов = Бонусы</p>
        <table>
          <thead>
          <tr>
            <th>Товар</th>
            <th>Расчёт</th>
            <th>Бонусов</th>
          </tr>
          </thead>
          <tbody>
          <tr v-for="(item, index) in items" :key="index">
            <td>{{ item.name || 'Без названия' }}</td>
            <td>{{ calculationSteps.itemWriteOffs[index].toFixed(2) }} / {{ rate }} =</td>
            <td>{{ calculationSteps.itemBonuses[index] }} </td>
          </tr>
          </tbody>
        </table>
      </div>

      <div class="calculation-step">
        <h4>Этап 7. Фактическое списание</h4>
        <p>Переводим бонусы обратно в рубли для точного списания:</p>
        <p class="formula">Бонусы × Курс = Фактическая сумма</p>
        <table>
          <thead>
          <tr>
            <th>Товар</th>
            <th>Расчёт</th>
            <th>Фактическая сумма</th>
          </tr>
          </thead>
          <tbody>
          <tr v-for="(item, index) in items" :key="index">
            <td>{{ item.name || 'Без названия' }}</td>
            <td>{{ calculationSteps.itemBonuses[index] }} × {{ rate }} =</td>
            <td>{{ (calculationSteps.itemBonuses[index] * rate).toFixed(2) }} ₽</td>
          </tr>
          </tbody>
        </table>
      </div>

      <div class="calculation-results">
        <h3>Итоговые результаты</h3>
        <div class="result-item">
          <span>Всего списано бонусов:</span>
          <strong>{{ calculationSteps.totalBonuses }}</strong>
        </div>
        <div class="result-item">
          <span>Фактическое списание в рублях:</span>
          <strong>{{ calculationSteps.totalWriteOff.toFixed(2) }} ₽</strong>
        </div>
        <div class="result-item">
          <span>Осталось бонусов:</span>
          <strong>{{ (bonuses - calculationSteps.totalBonuses) }} </strong>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      bonuses: 200,
      rate: 0.5,
      maxPercent: 30,
      discount: 20,
      noDiscount: false,
      items: [
        { name: 'Джинсы', price: 3000, discount: 1000 },
        { name: 'Футболка', price: 1500, discount: 0 },
        { name: 'Кепка', price: 800, discount: 0 }
      ],
      calculationSteps: null
    }
  },
  methods: {
    addItem() {
      this.items.push({ name: '', price: 0, discount: 0 })
    },
    removeItem(index) {
      this.items.splice(index, 1)
    },
    calculate() {
      // Этап 1: Лимиты по товарам
      const itemLimits = this.items.map(item => {
        const priceAfterDiscount = item.price - item.discount
        return priceAfterDiscount * (this.maxPercent / 100)
      })

      // Этап 2: Общий лимит
      const totalLimit = itemLimits.reduce((sum, limit) => sum + limit, 0)

      // Этап 3: Доступное списание
      const availableRub = this.bonuses * this.rate
      const availableToWriteOff = Math.min(availableRub, totalLimit)

      // Этап 4: Коэффициент списания
      const writeOffCoefficient = totalLimit > 0 ? availableToWriteOff / totalLimit : 0

      // Этап 5: Суммы списания по товарам
      const itemWriteOffs = itemLimits.map(limit => limit * writeOffCoefficient)

      // Этап 6: Бонусы по товарам
      const itemBonuses = itemWriteOffs.map(amount => Math.floor(amount / this.rate))

      // Этап 7: Фактическое списание
      const totalBonuses = itemBonuses.reduce((sum, bonus) => sum + bonus, 0)
      const totalWriteOff = itemBonuses.reduce((sum, bonus) => sum + (bonus * this.rate), 0)

      this.calculationSteps = {
        itemLimits,
        totalLimit,
        availableToWriteOff,
        writeOffCoefficient,
        itemWriteOffs,
        itemBonuses,
        totalBonuses,
        totalWriteOff
      }
    },
    resetCalculator() {
      this.calculationSteps = null
    }
  }
}
</script>

<style scoped>
.bonus-calculator {
  padding: 20px;
  max-width: 1000px;
  margin: 0 auto;
  font-family: Arial, sans-serif;
}

h2, h3, h4 {
  color: #2c3e50;
  margin-top: 24px;
}

h2 {
  font-size: 24px;
  border-bottom: 1px solid #eee;
  padding-bottom: 10px;
}

h3 {
  font-size: 20px;
}

h4 {
  font-size: 16px;
  color: #34495e;
}

.form-group {
  margin-bottom: 15px;
}

label {
  display: block;
  margin-bottom: 5px;
  font-weight: bold;
}

.input {
  padding: 8px 12px;
  border: 1px solid #ddd;
  border-radius: 4px;
  width: 100%;
  max-width: 300px;
}

.input.small {
  width: 120px;
}

.inline-field {
  display: inline-block;
  margin-right: 60px;
  vertical-align: top;
}

.button {
  padding: 8px 16px;
  margin-right: 10px;
  margin-top: 10px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 14px;
  transition: background-color 0.3s;
}

.button-primary {
  background-color: #25c066;
  color: white;
}

.button-primary:hover {
  background-color: #25c066;
}

.button-secondary {
  background-color: #95a5a6;
  color: white;
}

.button-secondary:hover {
  background-color: #7f8c8d;
}

.button-delete {
  background-color: #e74c3c;
  color: white;
}

.button-delete:hover {
  background-color: #c0392b;
}

.button-reset {
  background-color: #f39c12;
  color: white;
}

.button-reset:hover {
  background-color: #d35400;
}

.action-buttons {
  margin: 20px 0;
}

.cart-item {
  border: 1px solid #eee;
  padding: 15px;
  margin-bottom: 15px;
  border-radius: 4px;
  background-color: #f9f9f9;
}

.value {
  display: inline-block;
  padding: 8px;
  background-color: #f5f5f5;
  border-radius: 4px;
}

.calculation-steps {
  margin-top: 30px;
  border-top: 1px solid #eee;
  padding-top: 20px;
}

.calculation-step {
  margin-bottom: 25px;
  padding: 15px;
  background-color: #f8fafc;
  border-radius: 4px;
  border-left: 4px solid #25c066;
}

.formula {
  background-color: #f0f7ff;
  padding: 10px;
  border-radius: 4px;
  font-family: monospace;
  margin: 10px 0;
}

table {
  width: 100%;
  border-collapse: collapse;
  margin: 10px 0;
}

th, td {
  padding: 10px;
  text-align: left;
  border-bottom: 1px solid #ddd;
}

th {
  background-color: #f2f2f2;
}

.calculation-results {
  margin-top: 30px;
  padding: 20px;
  background-color: #e8f4fd;
  border-radius: 4px;
}

.result-item {
  display: flex;
  justify-content: space-between;
  margin-bottom: 10px;
  font-size: 16px;
  padding: 8px 0;
  border-bottom: 1px solid #d6e9ff;
}

.result-item:last-child {
  border-bottom: none;
}

.result-item strong {
  color: #2c3e50;
}
</style>