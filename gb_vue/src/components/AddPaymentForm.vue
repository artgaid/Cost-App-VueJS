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
    <div>
      {{ editComputed }}
    </div>
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
      edit: "",
    };
  },
  // props: {
  //   emptyForm: {
  //     type: Boolean,
  //     default: null,
  //   },
  // },
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
    getEdit() {
      return this.$store.getters.getEdit;
    },
    editComputed() {
      return this.addEditToForm();
    },
  },
  methods: {
    ...mapMutations(["addDataToPaymentList", "deletePayment"]),
    ...mapActions(["fetchCategoryList", "editList"]),
    addEditToForm() {
      console.log("222");
      this.value = this.$store.getters.getEdit.value;
      this.category = this.$store.getters.getEdit.category;
      this.date = this.$store.getters.getEdit.date;
    },
    onSaveClick() {
      let data = {
        date: this.date || this.getCurrentDate,
        category: this.category,
        value: +this.value,
        id: "",
      };

      this.addDataToPaymentList(data);
      this.deletePayment(this.$store.getters.getEdit);
      this.$emit("close");
      this.dataEmpty();
    },
    dataEmpty() {
      console.log("emptyForm2");
      (this.value = ""),
        (this.category = ""),
        (this.addCategoryToList = ""),
        (this.date = "");
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
    }
  },
};
</script>

<style lang="scss" module>
</style>