<template>
  <div>
    <input type="number" placeholder="Value" v-model.number="value" />
    <br />
    <select v-model="category" v-if="options">
      <option v-for="option in options" :value="option" :key="option">
        {{ option }}
      </option>
    </select>
    <!-- <input placeholder="Category" v-model="category" /> -->
    <br />
    <input placeholder="Date" v-model="date" />
    <br />
    <button @click="onSaveClick">ADD+</button>
  </div>
</template>

<script>
import { mapActions } from "vuex";
export default {
  name: "AddPaymentForm",
  data() {
    return {
      value: "",
      category: "",
      date: "",
      id: 0,
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
    ...mapActions(["fetchCategoryList"]),
    onSaveClick() {
      this.id += 1;
      const data = {
        date: this.date || this.getCurrentDate,
        category: this.category,
        value: +this.value,
        id: this.id,
      };
      this.$emit("addNewPayment", data);
    },
  },
  created() {
    this.fetchCategoryList();
  },
};
</script>

<style>
</style>