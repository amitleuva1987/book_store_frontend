<template>
  <div>
    <b-navbar toggleable="lg" type="dark" variant="primary">
      <b-navbar-brand href="/">Packt</b-navbar-brand>
      <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

      <b-collapse id="nav-collapse" is-nav>
        <!-- Right aligned nav items -->
        <b-navbar-nav class="ml-auto">
          <b-nav-item-dropdown right v-if="$auth.loggedIn">
            <!-- Using 'button-content' slot -->
            <template #button-content>
              <em>{{ $auth.user.name }}</em>
            </template>
            <b-dropdown-item
              ><NuxtLink to="/admin/product"
                >Dashboard</NuxtLink
              ></b-dropdown-item
            >
            <b-dropdown-item @click="logout">Sign Out</b-dropdown-item>
          </b-nav-item-dropdown>
          <b-nav-item v-else>
            <NuxtLink to="/login" class="text-white"
              >Login
            </NuxtLink></b-nav-item
          >
        </b-navbar-nav>
      </b-collapse>
    </b-navbar>
  </div>
</template>

<script>
export default {
  methods: {
    async logout() {
      await this.$auth.logout();
    },
  },
};
</script>

<style>
.cursor-pointer {
  cursor: pointer;
}
</style>
