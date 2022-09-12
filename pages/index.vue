<template>
  <div>
    <div class="row mt-4">
      <Search />
    </div>
    <div
      class="text-center mt-5 pt-5"
      v-if="loading"
      style="height: 100vh; overflow: auto"
    >
      <b-spinner
        variant="primary"
        style="width: 5rem; height: 5rem"
        label="Text Centered"
      ></b-spinner>
    </div>
    <div class="row" v-else>
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
</template>

<script>
import Product from "@/components/Product";
import Search from "@/components/Search";

export default {
  head: {
    titleTemplate: "Book Store - Packt",
  },
  name: "IndexPage",
  components: { Product, Search },
  data() {
    return {
      products: [],
      perPage: 10,
      totalRows: 100,
      currentPage: 1,
      loading: true,
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
      this.get_products(page);
    },
  },
};
</script>
