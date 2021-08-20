<template>
  <div>
    <div class="edit_content">
      <a class="edit_links" @click="addEditId" href="#">
        <div>Edit</div>
      </a>
      <br />
      <a class="edit_links" @click="deletePayment" href="#">
        <div>Delete</div>
      </a>
    </div>
  </div>
</template>

<script>
import { mapActions } from "vuex";

export default {
  name: "EditForm",
  data() {
    return {
      Data: {},
    };
  },
  props: {
    buttonID: {
      type: Number,
    },
  },
  methods: {
    ...mapActions({
      ListData: "DataList",
    }),
    addEditId() {
      this.$store.commit("addEditPayment", this.buttonID);
      this.$modal.show("AddPaymentForm", { header: "Payment Form" });
      this.deletePayment();
    },
    deletePayment() {
      this.$store.commit("deletePayment", this.buttonID);
    },
  },
};
</script>

<style lang="scss" scoped>
.edit_content {
  padding: 0 10px;
}
.edit_links {
  display: block;
  text-decoration: none;
}
</style>