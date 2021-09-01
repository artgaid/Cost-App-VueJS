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

    <!-- *** кнопки автоматического добавления (через ссылку) *** -->
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
      edit: "",
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
    getEdit() {
      return this.$store.getters.getEdit;
    },
    editOptions() {
      console.log("options");
      return () => {
        if (this.edit !== this.$store.getters.getEdit) {
          this.edit = this.$store.getters.getEdit;
          this.addEditToForm();
        }
        return;
      };
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
    addEditToForm() {
      console.log("editform", this.edit);
      this.value = this.edit.value;
      this.category = this.edit.category;
      this.date = this.edit.date;
    },
  },
  created() {
    this.fetchCategoryList();
    this.editList();
  },
  mounted() {
    console.log("mounted");
    this.editOptions();
    if (this.$route.name === "addPaymentFormUrl") {
      this.value = Number(this.$route.query?.value) || 0;
      this.category = this.$route?.params?.Category || "";
    }
  },
};
</script>

<style lang="scss" module>
</style>