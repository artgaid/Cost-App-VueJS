<template>
  <v-container>
    <v-row>
      <v-col cols="1">#</v-col>
      <v-col cols="4">Date</v-col>
      <v-col cols="5">Category</v-col>
      <v-col cols="2">Value</v-col>
    </v-row>
    <v-row v-for="item in list" :key="item.id">
      <v-col cols="1">{{ item.id }}</v-col>
      <v-col cols="4">{{ item.date }}</v-col>
      <v-col cols="5">{{ item.category }}</v-col>
      <v-col cols="2">{{ item.value }}</v-col>
    </v-row>

    <!-- <div class="items" v-for="(item, idx) in list" :key="idx">
        <span>{{ item.id }}</span>
        <span>{{ item.date }}</span>
        <span>{{ item.category }}</span>
        <span></span>
        <span @click="onContextMenuClick($event, item)">...</span>
      </div> -->
  </v-container>
</template>

<script>
import { mapMutations } from "vuex";

export default {
  name: "PaymentsDisplay",

  data() {
    return {};
  },
  props: {
    list: {
      type: Array,
      default: () => [],
    },
  },
  methods: {
    ...mapMutations(["deletePayment", "editPayment"]),
    onContextMenuClick(event, item) {
      const items = [
        {
          text: "Редактировать",
          action: () => {
            console.log("edit", item);
            this.deletePayment(item);
            this.$modal.show("AddPaymentForm", { header: "Payment Form" });
            this.editPayment(item);
          },
        },
        {
          text: "Удалить",
          action: () => {
            console.log("delete", item);

            this.deletePayment(item);
          },
        },
      ];
      this.$context.show({ event, items });
    },
  },
};
</script>

<style lang="scss">
// .items {
//   display: flex;
//   padding: 5px;
// }

// .list_title {
//   font-family: "Gill Sans", "Gill Sans MT", Calibri, "Trebuchet MS", sans-serif;
// }

// span {
//   width: 100px;
// }
</style>
