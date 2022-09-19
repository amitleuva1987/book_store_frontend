<template>
  <div>
    <h5 class="bg-primary text-white py-3 px-3 mt-3">
      Filter by Published Date
    </h5>
    <p class="text-danger">{{ error }}</p>
    <b-form @submit.prevent="filterData()">
      <label for="start-date">Choose a start date</label>
      <b-form-datepicker
        id="start-date"
        v-model="startDate"
        class="mb-2"
        :max="maxDate"
        required
      ></b-form-datepicker>
      <label for="end-date">Choose an end date</label>
      <b-form-datepicker
        id="end-date"
        v-model="endDate"
        class="mb-2"
        :max="maxDate"
        required
      ></b-form-datepicker>
      <b-button variant="primary" type="submit">Filter</b-button>
      <b-button @click="resetFilter()">Reset</b-button>
    </b-form>

    <h5 class="bg-primary text-white py-3 px-3 mt-3">Filter by Genre</h5>
    <b-form-group>
      <b-form-checkbox
        v-for="option in options"
        v-model="selected"
        :key="option.key"
        :value="option.key"
        name="flavour-3a"
      >
        {{ option.key }} ({{ option.doc_count }})
      </b-form-checkbox>
    </b-form-group>
  </div>
</template>

<script>
export default {
  data() {
    return {
      startDate: "",
      endDate: "",
      maxDate: new Date(),
      filterText: "",
      error: "",
      selected: [], // Must be an array reference!
      options: [],
    };
  },

  mounted() {
    this.getFilters();
  },

  watch: {
    selected: function (val) {
      this.$emit("getFilteredGenre", { selected: this.selected, page: 1 });
    },
  },

  methods: {
    async getFilters() {
      try {
        let response = await this.$axios.$get("/api/get_genre");
        this.options = response.data;
      } catch (error) {
        console.log(error);
      }
    },

    filterData() {
      if (this.startDate == "") {
        this.error = "Please enter a valid Start Date";
        return false;
      }
      if (this.endDate == "") {
        this.error = "Please enter a valid End Date";
        return false;
      }
      this.error = "";
      this.$emit("filteredData", {
        startDate: this.startDate,
        endDate: this.endDate,
        page: 1,
      });
    },

    resetFilter() {
      this.startDate = "";
      this.endDate = "";
      this.$emit("resetFilter");
    },
  },
};
</script>
