<template>
  <div class="calc">
    <br />
    <div class="header">{{ message }}</div>
    <br />
    <div>
      <input
        type="number"
        placeholder="Operation1"
        name="operand1"
        v-model.number="oper1"
      />
      <input
        type="number"
        placeholder="Operation2"
        name="operand2"
        v-model.number="oper2"
      />

      = {{ result }}
      <br />
      <!-- = fibResult - {{ fibResult }} -->

      <!-- <div class="strange-message">
        <template v-if="result < 0"> Отрицательное </template>
        <template v-else-if="result < 100"> 0 - 100</template>
        <template v-else>Все остальные </template>
      </div> -->

      <div v-if="!!error">Ошибка: {{ error }}</div>

      <!-- Показывает или скрывает что-то-->
      <!-- <div v-show="!!error" :class="{"error": !!error}>Ошибка: {{ error }}</div> -->

      <div class="keyboard">
        <button
          v-for="operation in operations"
          :key="operation"
          @click="calculate(operation)"
          :name="operation"
          :title="operation"
        >
          <!-- :disabled="oper2 === 0 && operation === '/'" -->
          {{ operation }}
        </button>
        <!-- Сократили запись -->
        <!-- <button @click="calculate('+')">+</button>
        <button @click="calculate('-')">-</button>
        <button @click="calculate('*')">*</button>
        <button @click="calculate('/')">/</button>
        <button @click="calculate('n')">n^</button>
        <button @click="calculate('//')">//</button> -->
      </div>

      <br />

      <input type="checkbox" v-model="checkedOn" /> Отоброзить клавиатуру
      <div v-show="checkedOn" class="array">
        <!-- {{ myNumbers }} -->
        <div class="numbers">
          <button
            v-for="(item, index) in myNumbers"
            :key="`${index}_list`"
            :name="item"
            @click="keyboard(item)"
          >
            {{ item }}
          </button>
        </div>
        <input
          type="radio"
          name="checkOperation1"
          v-model="check1"
          @click="checkOper1()"
        />
        Значение 1
        <input
          type="radio"
          name="checkOperation2"
          v-model="check2"
          @click="checkOper2()"
        />
        Значение 2
      </div>

      <!-- <div class="logs">
        logs
        <br />
        <div v-for="(log, id) in logs" :key="id">{{ id }} - {{ log }}</div>
      </div> -->
    </div>
  </div>
</template>

<script>
export default {
  name: "Calculator",
  data: () => ({
    message: "Hello my Calculator",
    oper1: 0,
    oper2: 0,
    result: 0,
    fibResult: 0,
    error: "",
    operations: ["+", "-", "*", "/", "n", "//"],
    myNumbers: [1, 2, 3, 4, 5, 6, 7, 8, 9, 0, "DEL"],
    logs: {},
    checkedOn: "true",
    check1: "",
    check2: "",
  }),
  methods: {
    fib(n) {
      return n <= 1 ? n : this.fib(n - 1) + this.fib(n - 2);
    },
    checkOper1() {
      this.check2 = "";
    },
    checkOper2() {
      this.check1 = "";
    },
    keyboard(n) {
      if (this.check1 === null) {
        if (n === "DEL") {
          this.oper1 = 0;
        } else this.oper1 += Number(n);
      } else if (this.check2 === null) {
        if (n === "DEL") {
          this.oper2 = 0;
        } else this.oper2 += Number(n);
      }
    },
    calculate(oper = "+") {
      const { oper1, oper2, result } = this;
      this.error = "";
      switch (oper) {
        case "+":
          this.sum();
          break;
        case "-":
          this.sub();
          break;
        case "*":
          this.mult();
          break;
        case "/":
          this.div();
          break;
        case "n":
          this.deg();
          break;
        case "//":
          this.doubleDiv();
          break;
      }
      const key = Date.now();
      const value = `${oper1}${oper}${oper2} = ${result}`;
      this.$set(this.logs, key, value);
      //this.logs[Date.now()] = `${oper1}${oper}${oper2} = ${result}`;
    },

    sum() {
      this.result = this.oper1 + this.oper2;
      this.fibResult = this.fib1 + this.fib2;
    },
    sub() {
      this.result = this.oper1 - this.oper2;
      //Без вычисляемых методов (computed)
      // this.fibResult = this.fib(this.oper1) - this.fib(this.oper2);
      this.fibResult = this.fib1 - this.fib2;
    },
    mult() {
      this.result = this.oper1 * this.oper2;
    },
    div() {
      const { oper1, oper2 } = this;
      if (oper2 === 0 || !oper2) {
        this.error = "На 0 делить нельзя";
      }
      this.result = oper1 / oper2;
    },
    deg() {
      this.result = Math.pow(this.oper1, this.oper2);
    },
    doubleDiv() {
      this.result = Math.floor(this.oper1 / this.oper2);
    },
  },
  computed: {
    fib1() {
      return this.fib(this.oper1);
    },
    fib2() {
      return this.fib(this.oper2);
    },
  },
};
</script>

<style>
.error {
  color: brown;
}
</style>
