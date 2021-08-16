<template>
  <div id="app">
    <div class="page-links">
      <router-link to="/dashboard">Dashboard</router-link> /
      <button @click="goToPage(404)">404</button>
    </div>

    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: "App",
  data() {
    return {};
  },
  methods: {
    goToPage(Name) {
      this.$router.push({
        name: Name,
      });
    },
  },
};
</script>

<style lang="scss" module>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
