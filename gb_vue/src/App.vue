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
      <payments-display :list="pageElements" />
      Total Value: {{ getFPV }}
      <pagination
        :page="pages"
        :n="n"
        :length="paymentsList.length"
        @changePage="addChengePages"
      />
    </div>
  </div>
</template>

<script>
import { mapMutations, mapGetters, mapActions } from "vuex";
import AddPaymentForm from "./components/AddPaymentForm.vue";
import Pagination from "./components/Pagination.vue";
import PaymentsDisplay from "./components/PaymentsDisplay.vue";
export default {
  name: "App",
  components: { PaymentsDisplay, AddPaymentForm, Pagination },
  data() {
    return {
      // paymentsList: [], // без store
      addForm: "",
      pages: 1,
      n: 5,
    };
  },
  methods: {
    ...mapMutations({
      loadData: "setPaymentListData",
      addDataToStore: "addDataToPaymentList",
      // *** loadData - кастомное название мутации
    }),
    ...mapActions({
      fetchListData: "fetchData",
    }),
    onForm() {
      if (this.addForm == false) {
        this.addForm = true;
      } else {
        this.addForm = false;
      }
    },
    addData(newPayment) {
      // this.paymentsList.push(newPayment);
      this.addDataToStore(newPayment);
    },
    addChengePages(p) {
      this.pages = p;
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
  computed: {
    ...mapGetters({
      paymentsList: "getPaymentsList",
    }),
    pageElements() {
      const { n, pages } = this;
      return this.paymentsList.slice(n * (pages - 1), n * (pages - 1) + n);
    },
    getFPV() {
      return this.$store.getters.getFullPaymentValue;
    },
  },
  created() {
    // *** без store
    // this.paymentsList = this.fetchData();
    // *** вызов мктации
    // this.$store.commit("setPaymentListData", this.fetchData());
    // *** вызов мутации через mapMutations
    // this.loadData(this.fetchData());
    // *** Вызываем actions
    // this.$store.dispatch("fetchData");
    // или
    this.fetchListData();
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
