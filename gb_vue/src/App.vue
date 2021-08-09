<template>
  <div id="app">
    <div :class="[$style.wrapper]">
      <header>
        <div :class="[$style.title]">My personal costs</div>
      </header>
    </div>
    <div :class="[$style.content]">
      <button @click="onForm">ADD NEW COST +</button>
      <add-payment-form v-show="addForm" @addNewPayment="addData" />
    </div>
    <div :class="[$style.content]">
      <payments-display :list="paymentsList" />
    </div>
  </div>
</template>

<script>
import AddPaymentForm from "./components/AddPaymentForm.vue";
import PaymentsDisplay from "./components/PaymentsDisplay.vue";
export default {
  name: "App",
  components: { PaymentsDisplay, AddPaymentForm },
  data() {
    return {
      paymentsList: [],
      addForm: "",
    };
  },
  methods: {
    onForm() {
      if (this.addForm == false) {
        this.addForm = true;
      } else {
        this.addForm = false;
      }
    },
    addData(newPayment) {
      this.paymentsList.push(newPayment);
    },
    fetchData() {
      return [
        {
          date: "28.03.2020",
          category: "Food",
          value: 169,
        },
        {
          date: "24.03.2020",
          category: "Transport",
          value: 360,
        },
        {
          date: "24.03.2020",
          category: "Food",
          value: 532,
        },
      ];
    },
  },
  created() {
    this.paymentsList = this.fetchData();
  },
};
</script>

<style lang="scss" module>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
.title {
  font-size: 50px;
}

.content {
  padding-top: 30px;
}
</style>
