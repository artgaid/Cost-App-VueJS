<template>
  <div class="wrapper">
    <div class="margin_center" v-if="settings.name !== 'EditForm'">
      {{ settings.header }}
    </div>
    <div class="content">
      <!-- <edit-form :buttonID="settings.header" /> -->
      <component :buttonID="settings.header" :is="settings.name"></component>
    </div>
    <div class="footer">
      <button @click="onClose" class="margin_center">Close</button>
    </div>
  </div>
</template>

<script>
export default {
  name: "ModalWindow",
  components: {
    AddPaymentForm: () =>
      import(/* webpackChunkName:"AddPaymentForm" */ "./AddPaymentForm.vue"),
    Auth: () => import(/* webpackChunkName:"Auth" */ "./Auth.vue"),
    EditForm: () =>
      import(/* webpackChunkName:"AddPaymentForm" */ "./EditForm.vue"),
  },
  props: {
    settings: {
      type: Object,
    },
  },
  methods: {
    onClose() {
      this.$modal.hide();
    },
  },
};
</script>

<style lang="scss" scoped>
.wrapper {
  position: absolute;
  background-color: bisque;
  border: 1px solid #000;
  border-radius: 5px;
}
.margin_center {
  text-align: center;
  margin: 5px;
}
</style>