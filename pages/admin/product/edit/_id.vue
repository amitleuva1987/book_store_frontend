<template>
  <div class="row mb-5">
    <div class="col-md-12">
      <b-breadcrumb :items="items"></b-breadcrumb>
    </div>
    <div class="col-md-12">
      <b-form @submit="onSubmit">
        <div class="row">
          <div class="col-md-4">
            <b-form-group id="input-group-1" label="Title:" label-for="input-1">
              <b-form-input
                id="input-1"
                v-model="product.title"
                type="text"
                placeholder="Enter title"
                required
              ></b-form-input>
            </b-form-group>
          </div>
          <div class="col-md-4">
            <b-form-group
              id="input-group-2"
              label="Author:"
              label-for="input-2"
            >
              <b-form-input
                id="input-2"
                v-model="product.author"
                type="text"
                placeholder="Enter author"
                required
              ></b-form-input>
            </b-form-group>
          </div>
          <div class="col-md-4">
            <b-form-group id="input-group-3" label="Genre:" label-for="input-3">
              <b-form-input
                id="input-3"
                v-model="product.genre"
                type="text"
                placeholder="Enter genre"
                required
              ></b-form-input>
            </b-form-group>
          </div>
        </div>

        <div class="row">
          <div class="col-md-4">
            <b-form-group id="input-group-4" label="ISBN:" label-for="input-4">
              <b-form-input
                id="input-4"
                v-model="product.isbn"
                type="text"
                placeholder="Enter isbn"
                required
              ></b-form-input>
            </b-form-group>
          </div>
          <div class="col-md-4">
            <b-form-group
              id="input-group-5"
              label="Publisher:"
              label-for="input-5"
            >
              <b-form-input
                id="input-5"
                v-model="product.publisher"
                type="text"
                placeholder="Enter publisher"
                required
              ></b-form-input>
            </b-form-group>
          </div>
          <div class="col-md-4">
            <b-form-group
              id="input-group-6"
              label="Published Date:"
              label-for="input-6"
            >
              <b-form-datepicker
                id="input-6"
                v-model="product.published"
                class="mb-2"
              ></b-form-datepicker>
            </b-form-group>
          </div>
        </div>

        <div class="row">
          <div class="col-md-4">
            <b-form-group id="input-group-7" label="Image:" label-for="input-7">
              <b-form-file
                id="input-7"
                accept="image/jpeg, image/png, image/webp"
                v-model="file1"
                :state="Boolean(file1)"
                placeholder="Choose a file or drop it here..."
                drop-placeholder="Drop file here..."
              ></b-form-file>
            </b-form-group>
          </div>
        </div>

        <div class="row">
          <div class="col-md-6">
            <b-form-group
              id="input-group-8"
              label="Description:"
              label-for="input-8"
            >
              <b-form-textarea
                id="input-8"
                v-model="product.description"
                placeholder="Enter description..."
                rows="3"
                max-rows="6"
              ></b-form-textarea>
            </b-form-group>
          </div>
        </div>

        <b-button type="submit" variant="primary"
          ><b-spinner
            small
            variant="light"
            class="mr-2"
            v-if="loading"
          ></b-spinner
          >Submit</b-button
        >
        <b-button type="reset" variant="danger">Reset</b-button>
      </b-form>
    </div>
  </div>
</template>

<script>
export default {
  middleware: "auth",
  data() {
    return {
      items: [
        {
          text: "Admin",
        },
        {
          text: "Product",
          to: "/admin/product",
        },
        {
          text: "Add Book",
          active: true,
        },
      ],
      product: {
        title: "",
        author: "",
        genre: "",
        isbn: "",
        publisher: "",
        published: "",
        description: "",
      },
      file1: null,
      loading: false,
    };
  },

  mounted() {
    this.get_product();
  },

  methods: {
    async get_product() {
      try {
        let response = await this.$axios.$get(
          "/api/products/" + this.$route.params.id
        );
        this.product = response.data;
      } catch (error) {
        this.$router.push("/404");
      }
    },

    async onSubmit(event) {
      this.loading = true;
      event.preventDefault();
      const formData = new FormData();
      formData.append("image", this.file1);
      formData.append("title", this.product.title);
      formData.append("author", this.product.author);
      formData.append("genre", this.product.genre);
      formData.append("isbn", this.product.isbn);
      formData.append("publisher", this.product.publisher);
      formData.append("published", this.product.published);
      formData.append("description", this.product.description);

      try {
        await this.$axios.$post(
          "/api/update_product/" + this.$route.params.id,
          formData
        );
        this.loading = false;
        this.makeToast("success", "Book updated successfully!");
        setTimeout(() => {
          this.$router.push("/admin/product");
        }, 3000);
      } catch (error) {
        this.loading = false;
        this.makeToast("danger", "Oops! something went wrong");
      }
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
