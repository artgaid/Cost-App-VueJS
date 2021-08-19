<template>
  <div>
    About
    <br />
    <button @click="showAuthFormFn">AUTH</button>
  </div>
</template>

<script>
export default {
  name: "about",
  methods: {
    showAuthFormFn() {
      this.$modal.show("auth", { header: "Auth Form" });
    },
  },
};
</script>

<style>
</style>