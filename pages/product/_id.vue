<template>
  <div class="row mb-5">
    <div class="col-md-12">
      <b-breadcrumb :items="items"></b-breadcrumb>
    </div>

    <div class="col-md-6">
      <b-img-lazy
        v-if="product.image"
        blank-src="-/assets/placeholder.png"
        :src="
          product.image.includes('http')
            ? product.image
            : `http://localhost/api/get_image/${product.id}`
        "
        fluid-grow
        class="product-image"
        alt="Fluid image"
      ></b-img-lazy>
    </div>

    <div class="col-md-6">
      <h2>{{ product.title }}</h2>
      <p class="font-weight-bold">Author : {{ product.author }}</p>
      <p>{{ product.description }}</p>
      <b-card bg-variant="light">
        <b-card-text>
          <p class="text-uppercase">
            <span>genre : </span
            ><span class="text-primary">{{ product.genre }}</span>
          </p>
          <p class="text-uppercase">
            <span>pubslished date : </span
            ><span class="text-primary">{{ product.published }}</span>
          </p>
          <p class="text-uppercase">
            <span>publisher : </span>
            <span class="text-primary"> {{ product.publisher }}</span>
          </p>
          <p class="text-uppercase">
            <span>ISBN : </span
            ><span class="text-primary">{{ product.isbn }}</span>
          </p>
        </b-card-text>
      </b-card>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      product: [],
      items: [
        {
          text: "Home",
          to: "/",
        },

        {
          text: "Product",
          active: true,
        },
      ],
    };
  },

  mounted() {
    this.get_product();
  },

  head() {
    return {
      title: this.product.title + " | Packt",
    };
  },

  methods: {
    async get_product() {
      try {
        let response = await this.$axios.$get(
          "/api/products/" + this.$route.params.id
        );
        this.product = response.data;
        this.items[1].text = this.product.title;
      } catch (error) {
        this.$router.push("/404");
      }
    },
  },
};
</script>

<style>
.product-image {
  max-height: 350px;
  object-fit: cover;
}
</style>
