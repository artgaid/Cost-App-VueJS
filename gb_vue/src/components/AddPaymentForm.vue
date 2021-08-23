<template>
  <div :class="[$style.border]">
    <div :class="[$style.border]">
      <input
        type="number"
        placeholder="Value"
        v-model.number="value"
        name="value"
        :class="[$style.margin]"
      />
      <br />
      <input
        placeholder="Category"
        v-model="category"
        :class="[$style.margin]"
      />
      <select v-model="category" v-if="options">
        <option v-for="option in options" :value="option" :key="option">
          {{ option }}
        </option>
      </select>

      <br />
      <input placeholder="Date" v-model="date" :class="[$style.margin]" />
      <br />
      <button @click="onSaveClick" :disabled="!value" :class="[$style.margin]">
        ADD+
      </button>
    </div>

    <div>
      <a href="/add/payment/Food?value=200">
        <button :class="[$style.margin]">Food</button>
      </a>
      <a href="/add/payment/Transport?value=50">
        <button :class="[$style.margin]">Transport</button>
      </a>
      <a href="/add/payment/Entertainment?value=2000">
        <button :class="[$style.margin]">Entertainment</button>
      </a>
    </div>

    <div class="add-Category">
      <input
        type="text"
        v-model="addCategoryToList"
        placeholder="category"
        :class="[$style.margin]"
      />
      <button @click="addCategory">ADD Category</button>
    </div>
  </div>
</template>

<script>
import { mapActions, mapMutations } from "vuex";
export default {
  name: "AddPaymentForm",
  data() {
    return {
      value: "",
      category: "",
      addCategoryToList: "",
      date: "",
      id: 0,
      editID: {},
    };
  },
  computed: {
    getCurrentDate() {
      const today = new Date();
      const d = today.getDate();
      const m = today.getMonth() + 1;
      const y = today.getFullYear();
      return `${d}.${m}.${y}`;
    },
    options() {
      return this.$store.getters.getCategories;
    },
    edits() {
      return this.$store.getters.getEdit;
    },
  },
  methods: {
    ...mapMutations(["addDataToPaymentList"]),
    ...mapActions(["fetchCategoryList", "editList"]),
    onSaveClick() {
      this.id += 1;
      let data = {
        date: this.date || this.getCurrentDate,
        category: this.category,
        value: +this.value,
        id: this.id,
      };

      this.addDataToPaymentList(data);
    },
    addCategory() {
      this.$store.commit("addCategoryToList", this.addCategoryToList);
    },
    goToPage(Name, c, v) {
      this.category = c;
      this.value = v;
      this.$router.push({
        name: Name,
      });
    },
    addEdit() {
      this.editID = this.$store.getters.getEdit;
    },
  },
  created() {
    this.editList();
    this.fetchCategoryList();
    this.addEdit();
    if (this.editID) {
      this.date = this.editID.date;
      this.category = this.editID.category;
      this.value = this.editID.value;
    }
  },
  mounted() {
    if (this.$route.name === "addPaymentFormUrl") {
      this.value = Number(this.$route.query?.value) || 0;
      this.category = this.$route?.params?.Category || "";
    }
  },
};
</script>

<style lang="scss" module>
.border {
  border: 1px solid #000;
  margin: 5px;
}
.margin {
  width: 100px;
  margin: 5px;
}
</style>