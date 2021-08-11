<template>
  <div class="pagination">
    <button @click="onClick(page - 1)">-</button>
    <button
      class="pages"
      v-for="pages in amount"
      :key="pages"
      @click="onClick(pages)"
    >
      {{ pages }}
    </button>
    <button @click="onClick(page + 1)">+</button>
  </div>
</template>

<script>
export default {
  name: "Pagination",
  props: {
    length: Number,
    n: {
      type: Number,
      default: 5,
    },
    page: Number,
  },
  computed: {
    amount() {
      return Math.ceil(this.length / this.n);
    },
  },
  methods: {
    onClick(p) {
      if (p < 1 || p > this.amount) {
        return;
      }
      this.$emit("changePage", p);
    },
  },
};
</script>

<style lang="scss">
.pagination {
  display: flex;
  padding: 10px;
}
</style>