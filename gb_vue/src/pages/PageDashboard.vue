<template>
  <div class="content">
    <div :class="[$style.wrapper]">
      <header>
        <div :class="[$style.title]">My personal costs</div>
      </header>
    </div>

    <div :class="[$style.content]">
      <div>Category: {{ addPaymentCategory }}</div>
      <div>Value: {{ addPaymentValue }}</div>
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
import AddPaymentForm from "../components/AddPaymentForm.vue";
import Pagination from "../components/Pagination.vue";
import PaymentsDisplay from "../components/PaymentsDisplay.vue";

export default {
  name: "Dashboard",
  components: {
    PaymentsDisplay,
    AddPaymentForm,
    Pagination,
  },
  data() {
    return {
      addForm: "",
      pages: 1,
      n: 5,
      addPaymentCategory: "",
      addPaymentValue: 0,
    };
  },
  methods: {
    ...mapMutations({
      loadData: "setPaymentListData",
      addDataToStore: "addDataToPaymentList",
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
  async created() {
    await this.fetchListData();
    if (this.$route?.params?.pages) {
      this.addChengePages(this.$route.params.pages);
    }
  },
  mounted() {
    this.addPaymentValue = this.$route.query.value;
    this.addPaymentCategory = this.$route.params.Category;
    if (this.addPaymentCategory) {
      this.addForm = true;
    }
  },
};
</script>

<style  lang="scss" module>
.title {
  font-size: 50px;
}

.content {
  padding-top: 30px;
}
</style>