<template>
  <div>
    <div class="content">
      <a href="#">Редактировать</a>
      <br />
      <a @click="deletePayment" href="#">Удалить</a>
    </div>
  </div>
</template>

<script>
export default {
  name: "EditForm",
  data() {
    return {};
  },
  props: {
    buttonID: {
      type: Number,
    },
  },
  methods: {
    deletePayment() {
      console.log(this.buttonID);
      this.$store.commit("deletePayment", this.buttonID);
    },
  },
};
</script>

<style>
</style>