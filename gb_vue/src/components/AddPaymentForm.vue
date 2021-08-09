<template>
  <div>
    <input placeholder="Value" v-model="value" />
    <br />
    <input placeholder="Category" v-model="category" />
    <br />
    <input placeholder="Date" v-model="date" />
    <br />
    <button @click="onSaveClick">ADD+</button>
  </div>
</template>
<script>
export default {
  name: "AddPaymentForm",
  data() {
    return {
      value: "",
      category: "",
      date: "",
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
  },
  methods: {
    onSaveClick() {
      const data = {
        date: this.date || this.getCurrentDate,
        category: this.category,
        value: +this.value,
      };
      this.$emit("addNewPayment", data);
    },
  },
};
</script>

<style>
</style>