<template>
  <v-container>
    <v-row>
      <v-col cols="8">
        <div class="text-h5 text-sm-h3">My personal costs</div>
        <br />
        <v-dialog v-model="dialog" width="500">
          <template v-slot:activator="{ on }">
            <v-btn color="teal" dark v-on="on">
              ADD NEW COST <v-icon>mdi-plus</v-icon>
            </v-btn>
          </template>
          <v-card>
            <add-payment-form @close="dialog = false" />
            <!-- <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="primary" text @click="addDataToPaymentList">
                ADD
              </v-btn>
            </v-card-actions> -->
          </v-card>
        </v-dialog>

        <br />
        <div class="content">
          <div class="content">
            <payments-display :list="pageElements" />
            <span class="font-weight-black"> Total Value: {{ getFPV }} </span>
            <v-pagination
              v-model="pages"
              :length="Math.ceil(paymentsList.length / n)"
            >
              <!-- <pagination
                :page="pages"
                :n="n"
                :length="paymentsList.length"
                @changePage="addChengePages"
              /> -->
            </v-pagination>
          </div>
          <!-- 
          <button @click="showPaymentFormFn" :class="[$style.content]">
            ADD NEW COST +
          </button> -->
        </div>
      </v-col>
      <v-col cols="4"> CHART </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { mapMutations, mapGetters, mapActions } from "vuex";
import AddPaymentForm from "../components/AddPaymentForm.vue";
// import Pagination from "../components/Pagination.vue";
import PaymentsDisplay from "../components/PaymentsDisplay.vue";

export default {
  name: "Dashboard",
  components: {
    PaymentsDisplay,
    // Pagination,
    AddPaymentForm,
  },
  data() {
    return {
      dialog: false,
      pages: 1,
      n: 10,
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
  created() {
    this.fetchListData();
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
</style>