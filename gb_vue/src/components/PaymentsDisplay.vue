<template>
  <div class="list">
    <div class="items">
      <span class="list_title"><b>#</b></span>
      <span class="list_title"><b>Date</b></span>
      <span class="list_title"><b>Category</b></span>
      <span class="list_title"><b>Value</b></span>
    </div>
    <div class="items" v-for="(item, idx) in list" :key="idx">
      <span>{{ item.id }}</span>
      <span>{{ item.date }}</span>
      <span>{{ item.category }}</span>
      <span>{{ item.value }}</span>
      <button @click="showEditFormFn(idx)">...</button>
    </div>
  </div>
</template>

<script>
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
    showEditFormFn(id) {
      this.$modal.show("EditForm", { header: id });
      console.log(id);
    },
  },
};
</script>

<style lang="scss">
.items {
  display: flex;
  padding: 5px;
}

.list_title {
  font-family: "Gill Sans", "Gill Sans MT", Calibri, "Trebuchet MS", sans-serif;
}

span {
  width: 100px;
}
</style>
