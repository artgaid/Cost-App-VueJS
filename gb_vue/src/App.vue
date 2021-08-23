<template>
  <div id="app">
    <div class="page-links">
      <router-link to="/dashboard">Dashboard</router-link> /
      <router-link to="/about">About</router-link> /
      <router-link to="/calculator">Calculator</router-link> /
      <button @click="goToPage(404)">404</button>
    </div>
    <div class="content">
      <router-view></router-view>
    </div>
    <transition name="fade">
      <modal-add-window-payment-form v-if="modalShown" :settings="settings" />
    </transition>
  </div>
</template>

<script>
export default {
  components: {
    ModalAddWindowPaymentForm: () =>
      import(
        /* webpackChunkName:"ModalAddWindowPaymentForm" */ "./components/ModalAddWindowPaymentForm.vue"
      ),
  },
  name: "App",
  data() {
    return {
      modalShown: false,
      settings: {},
    };
  },
  methods: {
    goToPage(Name) {
      this.$router.push({
        name: Name,
      });
    },
    onShow(settings) {
      this.settings = settings;
      this.modalShown = true;
    },
    onHide() {
      this.modalShown = false;
      this.settings = {};
    },
  },
  mounted() {
    this.$modal.EventBus.$on("show", this.onShow);
    this.$modal.EventBus.$on("hide", this.onHide);
  },
  beforeDestroy() {
    this.$modal.EventBus.$off("show", this.onShow);
    this.$modal.EventBus.$off("hide", this.onHide);
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

<style>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}

.fade-enter,
.fade-leave-to {
  opacity: 0;
}
</style>
