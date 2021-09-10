<template>
  <v-container>
    <v-row>
      <v-col cols="8">
        <div class="text-h5 text-sm-h3">My personal costs</div>
        <br />
        <v-dialog v-model="dialog" width="500">
          <template v-slot:activator="{ on }">
            <v-btn color="teal" dark v-on="on" @click="clearPaymentForm">
              ADD NEW COST <v-icon>mdi-plus</v-icon>
            </v-btn>
          </template>
          <v-card>
            <add-payment-form @close="dialog = !dialog" />
          </v-card>
        </v-dialog>

        <br />
        <div>
          <payments-display :list="pageElements" @show="dialog = !dialog" />
          <v-alert class="font-weight-black">
            Total Value: {{ getFPV }}
          </v-alert>
          <v-pagination
            color="teal"
            v-model="pages"
            :length="Math.ceil(paymentsList.length / n)"
          >
          </v-pagination>
        </div>
      </v-col>
      <v-col cols="4">
        <chart-doughnut :chart-data="datacollection" />
        <!-- {{ this.$store.getters.getChart }}
        {{ this.$store.getters.getValueToChart }} -->
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { mapMutations, mapGetters, mapActions } from "vuex";
import AddPaymentForm from "../components/AddPaymentForm.vue";
import ChartDoughnut from "../components/ChartDoughnut.vue";
import PaymentsDisplay from "../components/PaymentsDisplay.vue";

export default {
  name: "Dashboard",
  components: {
    PaymentsDisplay,
    AddPaymentForm,
    ChartDoughnut,
  },
  data() {
    return {
      chartOn: false,
      datacollection: {},
      dialog: false,
      pages: 1,
      n: 10,
      addPaymentCategory: "",
      addPaymentValue: 0,
      settings: {
        compName: "addPayment",
      },
    };
  },
  methods: {
    ...mapMutations({
      clearPaymentForm: "editPayment",
    }),
    ...mapActions({
      fetchListData: "fetchData",
    }),
    fillData() {
      console.log(this.$store.getters.getValueToChart);
      console.log("chart");
      this.datacollection = {
        labels: this.$store.getters.getChart,
        datasets: [
          {
            label: "My First Dataset",
            data: this.$store.getters.getValueToChart,
            backgroundColor: [
              "rgb(0, 0, 139)",
              "rgb(54, 162, 235)",
              "rgb(255, 205, 86)",
              "rgb(0, 128, 0)",
              "rgb(255, 0, 0)",
              "rgb(255, 99, 132)",
            ],
            hoverOffset: 4,
          },
        ],
      };
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
    console.log("m");
    this.fillData();
    this.addPaymentValue = this.$route.query.value;
    this.addPaymentCategory = this.$route.params.Category;
  },
  beforeUpdate() {
    console.log("u");
    this.fillData();
  },
};
</script>

<style  lang="scss" module>
</style>