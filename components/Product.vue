<template>
  <div class="card my-3">
    <b-img-lazy
      v-if="product.image"
      blank-src="~/assets/placeholder.png"
      :src="
        product.image.includes('http')
          ? product.image
          : `http://localhost/api/get_image/${product.id}`
      "
      thumbnail
      fluid
      alt="Fluid image"
      style="height: 200px; object-fit: cover"
    ></b-img-lazy>
    <div class="card-body">
      <h5 class="card-title">
        <NuxtLink :to="`/product/${product.id}`">{{ product.title }}</NuxtLink>
      </h5>
      <p>
        <span class="font-weight-bold">Author :</span> {{ product.author }},
        <span class="font-weight-bold">Genre: </span>{{ product.genre }}
      </p>
      <p>
        <span class="font-weight-bold">Published Date :</span>
        {{ product.published }}
      </p>
    </div>
  </div>
</template>

<script>
export default {
  name: "Product",
  props: ["product"],
};
</script>
