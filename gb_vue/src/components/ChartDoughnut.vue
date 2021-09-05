<template>
  <div class="container">
    <v-container class="ma-10">
      <canvas width="500" height="500" ref="canvas"></canvas>
    </v-container>
  </div>
</template>

<script>
import { Doughnut, mixins } from "vue-chartjs";
const { reactiveProp } = mixins;

export default {
  name: "ChartDoughnut",
  extends: Doughnut,
  mixins: [reactiveProp],
  methods: {},
  mounted() {
    this.renderChart(this.chartData, this.options);
  },
};
</script>