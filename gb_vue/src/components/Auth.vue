<template>
  <v-card class="text-left pa-8">
    Login: <v-text-field placeholder="Artem" solo></v-text-field>
    Password:
    <v-text-field placeholder="123qWe321" solo></v-text-field>
    <v-btn color="teal" dark>GO</v-btn>
  </v-card>
</template>

<script>
export default {
  name: "Auth",
};
</script>

<style lang="scss" scoped>
</style>