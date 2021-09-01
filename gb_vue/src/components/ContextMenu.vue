<template>
  <div class="context" v-if="show" :style="styles">
    <div
      v-for="(item, idx) in items"
      :key="idx"
      class="context_item"
      @click="onClick(item)"
    >
      {{ item.text }}
    </div>
  </div>
</template>

<script>
export default {
  name: "ContextMenu",
  data() {
    return {
      show: false,
      items: [],
      xPos: 0,
      yPos: 0,
    };
  },
  methods: {
    onClick(item) {
      item.action();
      this.$context.close();
    },
    onShow({ items, caller }) {
      this.items = items;
      this.show = true;
      this.setPosition(caller);
    },
    onClose() {
      this.items = [];
      this.show = false;
    },
    setPosition(caller) {
      const computedPositin = caller.getBoundingClientRect();
      this.xPos = computedPositin.left;
      this.yPos = computedPositin.top;
    },
  },
  computed: {
    styles() {
      return {
        top: `${this.yPos + 30}px`,
        left: `${this.xPos + 20}px`,
      };
    },
  },
  mounted() {
    this.$context.EventBus.$on("show", this.onShow);
    this.$context.EventBus.$on("close", this.onClose);
  },
  beforeDestroy() {
    this.$context.EventBus.$off("show", this.onShow);
    this.$context.EventBus.$off("close", this.onClose);
  },
};
</script>

<style lang="scss" scoped  >
</style>