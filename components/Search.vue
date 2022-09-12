<template>
  <div class="col-md-12 searchbox">
    <div class="col-xs-12 col-sm-6 mx-auto">
      <b-input-group>
        <b-form-input
          v-model="searchText"
          placeholder="Search Book"
          @input="search"
        ></b-form-input>
        <b-input-group-append>
          <b-button @click="clearsearch">Clear</b-button>

          <b-dropdown
            :text="searchFilter ? searchFilter : 'Search By'"
            variant="primary"
          >
            <b-dropdown-item @click="getfiltervalue('author')"
              >Author</b-dropdown-item
            >
            <b-dropdown-item @click="getfiltervalue('genre')"
              >Genre</b-dropdown-item
            >
            <b-dropdown-item @click="getfiltervalue('publisher')"
              >Publisher</b-dropdown-item
            >
          </b-dropdown>
        </b-input-group-append>
      </b-input-group>
    </div>

    <ul class="list-group col-xs-12 col-sm-6 mx-auto">
      <li
        v-for="product in searchResults"
        :key="product.id"
        class="list-group-item ml-3"
      >
        <div class="d-flex w-100 justify-content-between">
          <NuxtLink :to="`/product/${product.id}`">
            <h5 class="mb-1">{{ product.title }}</h5></NuxtLink
          >
          <small>{{ product.published }}</small>
        </div>

        <p class="mb-1">
          {{
            "Author : " +
            product.author +
            ", Genre : " +
            product.genre +
            ", Publisher : " +
            product.publisher
          }}
        </p>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  data() {
    return {
      searchText: "",
      searchResults: [],
      searchFilter: "",
    };
  },
  methods: {
    async search(value) {
      if (this.searchText.length > 2) {
        let response = await this.$axios.$post("/api/search", {
          search: value,
          filter: this.searchFilter,
        });
        this.searchResults = response.data;
      } else {
        this.searchResults = [];
      }
    },

    clearsearch() {
      this.searchResults = [];
      this.searchText = "";
      this.searchFilter = "";
    },

    getfiltervalue(value) {
      this.searchFilter = value;
    },
  },
};
</script>

<style>
.searchbox {
  z-index: 9999;
  height: 50px;
}
h5 {
  font-size: 16px;
}
</style>
