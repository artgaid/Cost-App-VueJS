<template>
  <div class="text-center">
    <div class="text-h5 text-sm-h4">ABOUT</div>
    <br />
    <v-dialog v-model="dialog" width="500">
      <template v-slot:activator="{ on }">
        <v-btn color="teal" dark v-on="on">AUTH.</v-btn>
      </template>
      <v-card>
        <auth @close="dialog = false" />
      </v-card>
    </v-dialog>
    <br />
    <div class="ma-5">
      <p class="text--primary">
        High-emphasis has an opacity of 87% in light theme and 100% in dark.
        <br />
        Lorem ipsum dolor sit, amet consectetur adipisicing elit. Placeat vel
        cum dolorem repellendus voluptates iure cupiditate deserunt error,
        blanditiis aliquam perspiciatis, ipsum aut iste. Tenetur aliquid
        laudantium numquam aperiam quos.
      </p>
      <p class="text--secondary">
        Medium-emphasis text and hint text have opacities of 60% in light theme
        and 70% in dark.
        <br />
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Illum pariatur
        numquam quos quisquam quis asperiores error, perferendis magni. Non quam
        sint qui accusantium est blanditiis recusandae corrupti voluptatibus
        quasi at!
      </p>
      <p class="text--disabled">
        Disabled text has an opacity of 38% in light theme and 50% in dark.
        <br />
        Lorem ipsum dolor sit amet consectetur, adipisicing elit. Aliquam
        corporis natus corrupti dolore accusantium tempore voluptatum, sint
        nobis repudiandae maiores perferendis cupiditate eum incidunt ab
        voluptatem neque eveniet quibusdam animi!
      </p>
    </div>
  </div>
</template>

<script>
import Auth from "../components/Auth.vue";
export default {
  data() {
    return {
      dialog: false,
    };
  },
  components: { Auth },
  name: "about",
  methods: {
    // showAuthFormFn() {
    //   this.$modal.show("auth", { header: "Auth Form" });
    // },
  },
};
</script>

<style>
</style>