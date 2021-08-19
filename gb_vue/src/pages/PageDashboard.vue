<template>
  <div class="content">
    <div :class="[$style.wrapper]">
      <header>
        <div :class="[$style.title]">My personal costs</div>
      </header>
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

    <button @click="showPaymentFormFn" :class="[$style.content]">
      ADD NEW COST +
    </button>
  </div>
</template>

<script>
import { mapMutations, mapGetters, mapActions } from "vuex";
import Pagination from "../components/Pagination.vue";
import PaymentsDisplay from "../components/PaymentsDisplay.vue";

export default {
  name: "Dashboard",
  components: {
    PaymentsDisplay,
    Pagination,
  },
  data() {
    return {
      pages: 1,
      n: 5,
      addPaymentCategory: "",
      addPaymentValue: 0,
      showPaymentForm: "",
      settings: {
        compName: "addPayment",
      },
    };
  },
  methods: {
    ...mapMutations({
      addDataToStore: "addDataToPaymentList",
    }),
    ...mapActions({
      fetchListData: "fetchData",
    }),
    addChengePages(p) {
      this.pages = p;
    },
    showPaymentFormFn() {
      this.$modal.show("AddPaymentForm", { header: "Payment Form" });
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
    if (this.addPaymentCategory) {
      this.showPaymentFormFn();
    }
  },
  mounted() {
    this.addPaymentValue = this.$route.query.value;
    this.addPaymentCategory = this.$route.params.Category;
  },
};
</script>

<style  lang="scss" module>
.title {
  font-size: 50px;
}

.content {
  margin-top: 30px;
}
</style>