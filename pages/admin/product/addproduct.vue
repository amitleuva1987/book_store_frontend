<template>
  <div class="row mb-5">
    <div class="col-md-12">
      <b-breadcrumb :items="items"></b-breadcrumb>
    </div>
    <div class="col-md-12">
      <b-form @submit="onSubmit" @reset="onReset">
        <div class="row">
          <div class="col-md-4">
            <b-form-group id="input-group-1" label="Title:" label-for="input-1">
              <b-form-input
                id="input-1"
                v-model="form.title"
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
                v-model="form.author"
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
                v-model="form.genre"
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
                v-model="form.isbn"
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
                v-model="form.publisher"
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
                v-model="form.published"
                :max="maxDate"
                class="mb-2"
                required
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
                v-model="form.description"
                placeholder="Enter description..."
                rows="3"
                max-rows="6"
                required
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
      form: {
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
      maxDate: new Date(),
    };
  },

  methods: {
    async onSubmit(event) {
      this.loading = true;
      event.preventDefault();
      const formData = new FormData();
      formData.append("image", this.file1);
      formData.append("title", this.form.title);
      formData.append("author", this.form.author);
      formData.append("genre", this.form.genre);
      formData.append("isbn", this.form.isbn);
      formData.append("publisher", this.form.publisher);
      formData.append("published", this.form.published);
      formData.append("description", this.form.description);

      try {
        await this.$axios.$post("/api/products", formData);
        this.loading = false;
        this.makeToast("success", "Book created successfully!");
        setTimeout(() => {
          this.$router.push("/admin/product");
        }, 3000);
      } catch (error) {
        this.loading = false;
        this.makeToast("error", "Oops! something went wrong");
      }
    },
    onReset(event) {
      event.preventDefault();
      // Reset our form values
      this.form.title = "";
      this.form.author = "";
      this.form.genre = "";
      this.form.isbn = "";
      this.form.publisher = "";
      this.form.published = "";
      this.form.description = "";
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
