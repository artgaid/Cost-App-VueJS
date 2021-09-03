<template>
  <div class="text-center">
    <br />
    <div class="text-h5 text-sm-h4">
      {{ message }}
      <v-icon large color="black">mdi-emoticon-excited-outline</v-icon>
    </div>
    <br />
    <div>
      <div class="d-inline-flex">
        <v-text-field
          class="ma-1"
          v-model.number="oper1"
          placeholder="Operation1"
          name="operand1"
          solo
        />
        <v-text-field
          class="ma-1"
          v-model.number="oper2"
          placeholder="Operation2"
          name="operand2"
          solo
        />
        <v-alert rounded elevation="5" height="55">
          <v-icon small>mdi-equal</v-icon> {{ result }}</v-alert
        >
      </div>

      <div class="d-flex justify-center">
        <v-alert width="400" dense outlined text type="error" v-if="!!error">
          Ошибка: {{ error }} <v-icon>mdi-emoticon-poop</v-icon>
        </v-alert>
      </div>

      <div class="keyboard">
        <v-btn
          color="teal"
          dark
          class="ma-1"
          v-for="operation in operations"
          :key="operation"
          @click="calculate(operation)"
          :name="operation"
          :title="operation"
        >
          {{ operation }}
        </v-btn>
      </div>

      <br />

      <v-btn color="teal" dark class="ma-5" @click="checkedOn = !checkedOn">
        Отоброзить клавиатуру
      </v-btn>
      <div v-show="checkedOn" class="array">
        <div class="numbers">
          <v-btn
            class="ma-1"
            v-for="(item, index) in myNumbers"
            :key="`${index}_list`"
            :name="item"
            @click="keyboard(item)"
          >
            {{ item }}
          </v-btn>
        </div>
        <div class="d-flex justify-center">
          <v-radio-group v-model="radios" mandatory row>
            <v-radio
              color="teal"
              label="Значение 1"
              value="radio-1"
              name="checkOperation1"
            ></v-radio>
            <v-radio
              color="teal"
              label="Значение 2"
              value="radio-2"
              name="checkOperation2"
            ></v-radio>
          </v-radio-group>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Calculator",
  data: () => ({
    message: "This is your Calculator",
    oper1: 0,
    oper2: 0,
    result: 0,
    // fibResult: 0, // *** Рассчет числа фибоначчи ***
    error: "",
    operations: ["+", "-", "*", "/", "n", "//"],
    myNumbers: [1, 2, 3, 4, 5, 6, 7, 8, 9, 0, "DEL"],
    logs: {},
    checkedOn: false,
    radios: null,
  }),
  methods: {
    // *** Рассчет числа фибоначчи ***
    // fib(n) {
    //   return n <= 1 ? n : this.fib(n - 1) + this.fib(n - 2);
    // },

    keyboard(n) {
      if (this.radios === "radio-1") {
        if (n === "DEL") {
          this.oper1 = 0;
        } else this.oper1 += String(n);
      } else if (this.radios === "radio-2") {
        if (n === "DEL") {
          this.oper2 = 0;
        } else this.oper2 += String(n);
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
    },

    sum() {
      this.result = this.oper1 + this.oper2;
      this.fibResult = this.fib1 + this.fib2;
    },
    sub() {
      this.result = this.oper1 - this.oper2;

      this.fibResult = this.fib1 - this.fib2;
    },
    mult() {
      this.result = this.oper1 * this.oper2;
    },
    div() {
      const { oper1, oper2 } = this;
      if (oper2 === 0 || !oper2) {
        this.error = "На 0 делить нельзя!";
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
    // *** Рассчет числа фибоначчи ***
    // fib1() {
    //   return this.fib(this.oper1);
    // },
    // fib2() {
    //   return this.fib(this.oper2);
    // },
  },
};
</script>

<style>
</style>
