<template>
  <v-card class="text-left pa-8">
    <v-text-field v-model="date" label="date" />
    <v-text-field v-model.number="value" label="value" />
    <v-select v-model="category" label="category" :items="options" />

    <div class="d-flex">
      <v-text-field v-model="addCategoryToList" label=" + category" />
      <v-btn color="teal" dark class="ma-3" @click="addCategory"
        >ADD Category</v-btn
      >
    </div>

    <v-btn color="teal" dark @click="onSaveClick" :disabled="!value">
      SAVE
    </v-btn>

    <!-- <div>
        <a href="/add/payment/Food?value=200">
          <button>Food</button>
        </a>
        <a href="/add/payment/Transport?value=50">
          <button>Transport</button>
        </a>
        <a href="/add/payment/Entertainment?value=2000">
          <button>Entertainment</button>
        </a>
      </div> -->
  </v-card>
</template>

<script>
import { mapActions, mapMutations } from "vuex";
export default {
  name: "AddPaymentForm",
  data() {
    return {
      value: "",
      category: "",
      addCategoryToList: "",
      date: "",
      id: 0,
      edit: this.$store.getters.getEdit,
    };
  },
  computed: {
    getCurrentDate() {
      const today = new Date();
      const d = today.getDate();
      const m = today.getMonth() + 1;
      const y = today.getFullYear();
      return `${d}.${m}.${y}`;
    },
    options() {
      return this.$store.getters.getCategories;
    },
  },
  methods: {
    ...mapMutations(["addDataToPaymentList"]),
    ...mapActions(["fetchCategoryList", "editList"]),
    onSaveClick() {
      let data = {
        date: this.date || this.getCurrentDate,
        category: this.category,
        value: +this.value,
        id: "",
      };

      this.addDataToPaymentList(data);
      this.$emit("close");
    },
    addCategory() {
      this.$store.commit("addCategoryToList", this.addCategoryToList);
    },
    goToPage(Name, c, v) {
      this.category = c;
      this.value = v;
      this.$router.push({
        name: Name,
      });
    },
  },
  created() {
    this.fetchCategoryList();
    this.editList();
  },
  mounted() {
    if (this.$route.name === "addPaymentFormUrl") {
      this.value = Number(this.$route.query?.value) || 0;
      this.category = this.$route?.params?.Category || "";
    } else if (this.edit) {
      console.log(this.edit);
      this.value = this.edit.value;
      this.category = this.edit.category;
      this.date = this.edit.date;
    }
  },
};
</script>

<style lang="scss" module>
</style>