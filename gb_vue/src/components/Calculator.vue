<template>
  <div class="calc">
    {{ message }}

    <div>
      <input type="number" placeholder="Operation1" v-model.number="oper1" />
      <input type="number" placeholder="Operation2" v-model.number="oper2" />

      ={{ result }}

      <div class="keyboard">
        <button @click="result = oper1 + oper2">+</button>
        <button @click="div">-</button>
        <button @click="multi(oper1, oper2)">*</button>
        <button @click="result = oper1 / oper2">/</button>
        <button @click="result = Math.pow(oper1, oper2)">Степень</button>
        <button @click="del">//</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Calculator",
  data: () => ({
    message: "Hello",
    oper1: 0,
    oper2: 0,
    result: 0,
  }),
  methods: {
    del() {
      this.result = Math.floor(this.oper1 / this.oper2);
    },
    div() {
      this.result = this.oper1 - this.oper2;
    },
    multi(op1, op2) {
      this.result = op1 * op2;
    },
  },
};
</script>
