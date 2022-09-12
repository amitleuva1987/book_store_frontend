<template>
  <div class="col-md-4 mx-auto mt-5" style="height: 420px">
    <h4 class="text-center">Login with Packt</h4>
    <b-form @submit="onSubmit" @reset="onReset">
      <b-form-group
        id="input-group-1"
        label="Email address:"
        label-for="input-1"
      >
        <b-form-input
          id="input-1"
          v-model="email"
          type="email"
          placeholder="Enter email"
          required
        ></b-form-input>
      </b-form-group>

      <b-form-group id="input-group-2" label="Your Name:" label-for="input-2">
        <b-form-input
          id="input-2"
          v-model="password"
          type="password"
          placeholder="Enter password"
          required
        ></b-form-input>
      </b-form-group>

      <b-button type="submit" variant="primary" class="block">Login</b-button>
    </b-form>
  </div>
</template>

<script>
export default {
  middleware: "auth",
  auth: "guest",
  data() {
    return {
      email: "",
      password: "",
    };
  },
  methods: {
    onSubmit(event) {
      event.preventDefault();
      this.$auth
        .loginWith("cookie", {
          data: {
            email: this.email,
            password: this.password,
          },
        })
        .then(() => this.$router.push("/admin/product"))
        .catch((error) => {
          console.log(error);
        });
    },
    onReset(event) {
      event.preventDefault();
      // Reset our form values
      this.form.email = "";
      this.form.name = "";
    },
  },
};
</script>
