<template>
  <v-card class="text-left pa-8">
    <v-text-field v-model="date" label="date" />
    <v-text-field v-model.number="value" label="value" />
    <v-select v-model="category" label="category" :items="options" />
    <v-btn @click="onSaveClick" :disabled="!value"> ADD+ </v-btn>

    <!-- <div :class="[$style.border]">
      <div :class="[$style.border]">
        <input
          type="number"
          placeholder="Value"
          v-model.number="value"
          name="value"
          :class="[$style.margin]"
        />
        <br />
        <input
          placeholder="Category"
          v-model="category"
          :class="[$style.margin]"
        />
        <select v-model="category" v-if="options">
          <option v-for="option in options" :value="option" :key="option">
            {{ option }}
          </option>
        </select>

        <br />
        <input placeholder="Date" v-model="date" :class="[$style.margin]" />
        <br />
        <button
          @click="onSaveClick"
          :disabled="!value"
          :class="[$style.margin]"
        >
          ADD+
        </button>
      </div>

      <div>
        <a href="/add/payment/Food?value=200">
          <button :class="[$style.margin]">Food</button>
        </a>
        <a href="/add/payment/Transport?value=50">
          <button :class="[$style.margin]">Transport</button>
        </a>
        <a href="/add/payment/Entertainment?value=2000">
          <button :class="[$style.margin]">Entertainment</button>
        </a>
      </div>

      <div class="add-Category">
        <input
          type="text"
          v-model="addCategoryToList"
          placeholder="category"
          :class="[$style.margin]"
        />
        <button @click="addCategory">ADD Category</button>
      </div>
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
// .border {
//   border: 1px solid #000;
//   margin: 5px;
// }
// .margin {
//   width: 100px;
//   margin: 5px;
// }
</style>