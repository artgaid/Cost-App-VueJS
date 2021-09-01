<template>
  <v-container>
    <v-row class="font-weight-black">
      <v-col cols="1">#</v-col>
      <v-col cols="4">Date</v-col>
      <v-col cols="4">Category</v-col>
      <v-col cols="2">Value</v-col>
      <v-col cols="1"></v-col>
    </v-row>
    <v-row v-for="item in list" :key="item.id" :class="[$style.border_btm]">
      <v-col cols="1">{{ item.id }}</v-col>
      <v-col cols="4">{{ item.date }}</v-col>
      <v-col cols="4">{{ item.category }}</v-col>
      <v-col cols="2">{{ item.value }}</v-col>
      <!-- <v-col cols="1">
        <v-icon @click="onContextMenuClick($event, item)"
          >mdi-dots-vertical</v-icon
        >
      </v-col> -->
      <v-col cols="1">
        <div class="text-center">
          <v-menu
            rounded="lg"
            left
            offset-x
            transition="scale-transition"
            origin="top right"
          >
            <template v-slot:activator="{ on, attrs }">
              <v-btn color="teal" v-bind="attrs" dark icon v-on="on">
                <v-icon>mdi-dots-vertical</v-icon>
              </v-btn>
            </template>

            <v-list>
              <v-list-item v-for="(contextItem, index) in items" :key="index">
                <v-list-item-title>
                  <v-btn @click="onClick(item, contextItem)">
                    {{ contextItem.text }}
                  </v-btn>
                </v-list-item-title>
              </v-list-item>
            </v-list>
          </v-menu>
        </div>

        <!-- <v-dialog v-model="contextDialog" width="500">
          <template v-slot:activator="{ on }">
            <v-btn color="teal" dark icon v-on="on">
              <v-icon>mdi-dots-vertical</v-icon>
            </v-btn>
          </template>
          <v-card>
            <context-menu @close="contextDialog = false" />
          </v-card>
        </v-dialog> -->

        <!-- <v-menu bottom left v-model="contextDialog">
          <template v-slot:activator="{ on, attrs }">
            <v-btn
              color="teal"
              dark
              icon
              v-bind="attrs"
              v-on="on"
              @click="onContextMenuClick($event, item)"
            >
              <v-icon>mdi-dots-vertical</v-icon>
            </v-btn>
          </template>
          <v-list>
            <context-menu @close="contextDialog = false" />
          </v-list>
        </v-menu> -->
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { mapMutations } from "vuex";

export default {
  name: "PaymentsDisplay",

  data() {
    return {
      items: [
        {
          text: "Редактировать",
          action: (item) => {
            console.log("edit", item);
            this.deletePayment(item);
            this.editPayment(item);
            this.$emit("show");
          },
        },
        {
          text: "Удалить",
          action: (item) => {
            console.log("delete", item);

            this.deletePayment(item);
          },
        },
      ],
    };
  },
  props: {
    list: {
      type: Array,
      default: () => [],
    },
  },
  methods: {
    ...mapMutations(["deletePayment", "editPayment"]),
    // onContextMenuClick(event, item) {
    //   const items = [
    //     {
    //       text: "Редактировать",
    //       action: () => {
    //         console.log("edit", item);
    //         this.deletePayment(item);
    //         this.$modal.show("AddPaymentForm", { header: "Payment Form" });
    //         this.editPayment(item);
    //       },
    //     },
    //     {
    //       text: "Удалить",
    //       action: () => {
    //         console.log("delete", item);

    //         this.deletePayment(item);
    //       },
    //     },
    //   ];
    // },
    onClick(item, contextItem) {
      contextItem.action(item);
    },
  },
};
</script>

<style lang="scss" module>
.border_btm {
  border-bottom: 1px solid rgb(0, 0, 0, 0.3);
}
</style>
