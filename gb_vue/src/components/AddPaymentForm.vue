<template>
  <div :class="[$style.border]">
    <div :class="[$style.border]">
      <input
        type="number"
        placeholder="Value"
        v-model.number="value"
        :class="[$style.margin]"
      />
      <br />
      <select v-model="category" v-if="options" :class="[$style.margin]">
        <option v-for="option in options" :value="option" :key="option">
          {{ option }}
        </option>
      </select>
      <!-- <input placeholder="Category" v-model="category" /> -->
      <br />
      <input placeholder="Date" v-model="date" :class="[$style.margin]" />
      <br />
      <button @click="onSaveClick" :class="[$style.margin]">ADD+</button>
    </div>

    <input
      type="text"
      v-model="addCategoryToList"
      placeholder="category"
      :class="[$style.margin]"
    />
    <button @click="addCategory">ADD Category</button>
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
      addCategoryToList: "",
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
    addCategory() {
      this.$store.commit("addCategoryToList", this.addCategoryToList);
    },
  },
  created() {
    this.fetchCategoryList();
  },
};
</script>

<style lang="scss" module>
.border {
  border: 1px solid #000;
  margin: 5px;
}
.margin {
  width: 150px;
  margin: 5px;
}
</style>