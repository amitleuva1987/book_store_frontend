<template>
  <div>
    <a href="#" @click="$bvModal.show('bv-modal-example' + id)">Delete</a>
    <b-modal :id="`bv-modal-example${id}`" hide-footer>
      <template #modal-title> Warning </template>
      <div class="d-block text-center">
        <h3>Hello From This Modal!</h3>
      </div>
      <b-button
        class="mt-3"
        block
        @click="$bvModal.hide('bv-modal-example' + id)"
        >Close Me</b-button
      >
    </b-modal>
  </div>
</template>

<script>
export default {
  name: "Delete",
  props: ["id"],
  mounted() {
    console.log(this.id);
  },
};
</script>
