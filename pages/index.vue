<template>
  <div>
    <div class="row mt-4">
      <Search />
    </div>

    <div class="text-center mt-5 pt-5 custom-spinner" v-if="loading">
      <b-spinner
        variant="primary"
        class="spinner-size"
        label="Text Centered"
      ></b-spinner>
    </div>

    <div class="row" v-else>
      <div class="col-md-3">
        <SearchFilter
          @filteredData="filterData"
          @resetFilter="resetFilter"
          @getFilteredGenre="filterGenre"
        />
      </div>
      <div class="col-md-9" :class="`{filtering ? 'blurred':''}`">
        <div class="row">
          <div class="col-md-4" v-for="product in products" :key="product.id">
            <Product :product="product" />
          </div>
          <div class="col-md-12">
            <b-pagination
              v-model="currentPage"
              @change="changepage"
              :total-rows="totalRows"
              :per-page="perPage"
              align="right"
            ></b-pagination>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Product from "@/components/Product";
import Search from "@/components/Search";
import SearchFilter from "@/components/SearchFilter";

export default {
  head: {
    titleTemplate: "Book Store - Packt",
  },
  name: "IndexPage",
  components: { Product, Search, SearchFilter },
  data() {
    return {
      products: [],
      perPage: 10,
      totalRows: 100,
      currentPage: 1,
      loading: true,
      filter: false,
      filtering: false,
      startDate: "",
      endDate: "",
      genreFilter: false,
      selectedGenreData: [],
    };
  },
  mounted() {
    this.get_products();
  },
  methods: {
    async get_products() {
      try {
        let response = await this.$axios.$get(
          "/api/products?page=" + this.currentPage
        );
        this.loading = false;
        this.products = response.data;
        this.totalRows = response.total;
      } catch (error) {
        this.loading = false;
      }
    },

    changepage(page) {
      this.currentPage = page;
      if (this.filter) {
        const data = {
          page: page,
        };
        this.filterData(data);
      } else if (this.genreFilter) {
        const data = {
          page: page,
        };
        this.filterGenre(data);
      } else {
        this.get_products();
      }
    },

    async filterData(data) {
      this.filtering = true;
      if (data.startDate || data.endDate) {
        this.startDate = data.startDate;
        this.endDate = data.endDate;
      }
      try {
        let response = await this.$axios.$post(
          "/api/elasticsearch?page=" + data.page,
          { startDate: this.startDate, endDate: this.endDate }
        );
        this.filter = true;
        this.products = response.data;
        this.totalRows = response.total;
        this.filtering = false;
      } catch (error) {
        this.filtering = false;
      }
    },

    resetFilter() {
      this.filter = false;
      this.get_products();
    },

    async filterGenre(data) {
      if (data.selected) {
        this.selectedGenreData = data.selected;
      }

      if (this.selectedGenreData.length > 0) {
        this.filtering = true;
        try {
          let response = await this.$axios.$post(
            "/api/get_genre_filtered_data?page=" + data.page,
            {
              selectedGenre: this.selectedGenreData,
            }
          );
          // .then((response) => {  console.log(response);  })

          this.genreFilter = true;
          this.products = response.data;
          this.totalRows = response.total;
          this.filtering = false;
        } catch (error) {
          console.log(error);
          this.filtering = false;
        }
      } else {
        this.genreFilter = false;
        this.get_products();
      }
    },
  },
};
</script>

<style>
.custom-spinner {
  height: 100vh;
  overflow: auto;
}
.spinner-size {
  width: 5rem;
  height: 5rem;
}
.blurred {
  opacity: 0.35;
}
</style>
