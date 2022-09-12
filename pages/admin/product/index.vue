<template>
  <div class="row mb-5">
    <div class="col-md-12">
      <b-breadcrumb :items="items"></b-breadcrumb>
    </div>

    <div class="col-md-6">
      <NuxtLink to="/admin/product/addproduct"
        ><button class="btn btn-primary">Add Book</button></NuxtLink
      >
    </div>
    <div class="col-md-6">
      <b-input-group>
        <b-form-input v-model="filter" placeholder="Search Book...">
        </b-form-input>
        <b-input-group-append>
          <b-button @click="clearsearch">Clear</b-button>
        </b-input-group-append>
      </b-input-group>
    </div>

    <div class="col-md-12 mt-3">
      <b-table
        striped
        hover
        id="my-books"
        :items="products"
        :fields="fields"
        :sort-by.sync="sortBy"
        :sort-desc.sync="sortDesc"
        :filter="filter"
        :per-page="perPage"
        :current-page="currentPage"
        @filtered="changePagination"
      >
        <template #cell(action)="data">
          <NuxtLink :to="`/admin/product/edit/${data.item.id}`">Edit</NuxtLink>
          | <a href="#" @click="showConfirmDelete(data.item.id)">Delete</a>
        </template>
      </b-table>
      <b-pagination
        v-model="currentPage"
        :total-rows="totalRows"
        :per-page="perPage"
        align="right"
        aria-controls="my-books"
      ></b-pagination>
    </div>
  </div>
</template>

<script>
export default {
  middleware: "auth",
  data() {
    return {
      products: [],
      fields: [
        { key: "id", sortable: true },
        { key: "title", sortable: true },
        { key: "author", sortable: true },
        { key: "genre", sortable: true },
        { key: "publisher", sortable: true },
        { key: "action", sortable: false },
      ],
      sortBy: "id",
      sortDesc: false,
      perPage: 10,
      filter: null,
      searchText: "",
      totalRows: 100,
      currentPage: 1,
      items: [
        {
          text: "Admin",
        },
        {
          text: "Product",
          active: true,
        },
      ],
      loading: false,
    };
  },
  mounted() {
    this.loading = true;
    this.get_products();
  },
  methods: {
    async get_products() {
      try {
        let response = await this.$axios.$get("/api/get_all_books");
        this.loading = false;
        this.products = response.data;
        this.totalRows = this.products.length;
      } catch (error) {
        this.loading = false;
      }
    },
    clearsearch() {
      this.filter = "";
    },
    changePagination(records, totalRecords) {
      this.totalRows = totalRecords;
    },

    showConfirmDelete(id) {
      this.$bvModal
        .msgBoxConfirm("Are you sure, you want to delete this record?", {
          title: "Warning",
          size: "sm",
          buttonSize: "sm",
          okVariant: "danger",
          okTitle: "YES",
          cancelTitle: "NO",
          footerClass: "p-2",
          headerClass: "text-white bg-warning",
          hideHeaderClose: false,
          centered: true,
        })
        .then((value) => {
          if (value === true) {
            this.$axios.$delete("/api/products/" + id).then(() => {
              this.makeToast("success", "Book Deleted successfully!");
              this.get_products();
            });
          }
        })
        .catch((err) => {
          // An error occurred
        });
    },

    makeToast(variant = null, message = "Toast body content") {
      this.$bvToast.toast(message, {
        title: `${variant || "default"}`,
        variant: variant,
        solid: true,
      });
    },
  },
};
</script>
