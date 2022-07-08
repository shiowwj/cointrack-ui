<template>
  <div class="flex min-h-screen flex-col justify-between">
    <div class="bg-grey-lighter min-h-screen flex flex-col">
      {{ errors }}
      <div
        class="
          container
          max-w-sm
          mx-auto
          flex-1 flex flex-col
          items-center
          justify-center
          px-2
        "
      >
        <div class="bg-white px-6 py-8 rounded shadow-md text-black w-full">
          <h1 class="mb-8 text-3xl text-center">Sign up</h1>
          <form @submit.prevent="submitForm">
            <div class="mb-4">
              <input
                type="email"
                v-model="email"
                class="block border border-grey-light w-full p-3 rounded"
                name="email"
                placeholder="Email"
              />
              <div v-if="errors.email.length > 0" class="error">
                <span
                  v-for="error in errors.email"
                  :key="error.message"
                  class="text-xs text-red-400"
                  >{{ error.message }}</span
                >
              </div>
            </div>
            <div class="mb-4">
              <input
                type="password"
                v-model="password"
                class="block border border-grey-light w-full p-3 rounded"
                name="password"
                placeholder="Password"
              />
              <div v-if="errors.password.length > 0" class="error">
                <span
                  v-for="error in errors.password"
                  :key="error.message"
                  class="text-xs text-red-400"
                  >{{ error.message }}</span
                >
              </div>
            </div>
            <button
              type="submit"
              class="
                w-full
                text-center
                py-3
                rounded
                bg-green-400
                text-white
                hover:bg-green-dark
                focus:outline-none
                my-1
              "
            >
              Create Account
            </button>
          </form>
          <div class="text-center text-sm text-grey-dark mt-4">
            By signing up, you agree to the
            <a
              class="no-underline border-b border-grey-dark text-grey-dark"
              href="#"
            >
              Terms of Service
            </a>
            and
            <a
              class="no-underline border-b border-grey-dark text-grey-dark"
              href="#"
            >
              Privacy Policy
            </a>
          </div>
        </div>

        <div class="text-grey-dark mt-6">
          Already have an account?
          <router-link
            class="no-underline border-b border-blue text-blue"
            to="/login"
          >
            Log in </router-link
          >.
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// createUserWithEmailAndPassword
// import * as firebase from "firebase/app";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";

export default {
  methods: {
    async submitForm() {
      if (!this.validateForm()) {
        return;
      }
      try {
        const auth = getAuth();
        const user = await createUserWithEmailAndPassword(
          auth,
          this.email,
          this.password
        );
        console.log("user", user);
        this.$router.replace({ name: "dashboard" });
      } catch (err) {
        console.error(err);
      }
    },
    validateForm() {
      // reset errors and reevaluate again
      this.errors.email = [];
      this.errors.password = [];
      if (this.email == "") {
        this.errors.email.push({ message: "Please enter an email" });
      }

      if (this.password == "" && this.email != "") {
        this.errors.password.push({
          message: "Please enter a password",
        });
      }

      if (this.errors.email.length == 0 && this.errors.password.length == 0) {
        return true;
      }
      return false;
    },
  },
  data() {
    return {
      email: "",
      password: "",
      errors: {
        email: [],
        password: [],
      },
    };
  },
};
</script>