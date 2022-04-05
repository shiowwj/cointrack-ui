<template>
  <div class="flex min-h-screen flex-col justify-between">
    <!-- <h3 class="text-3xl font-bold underline">Login</h3>
    <form @submit.prevent="submitLogin">
      <div>
        <input type="text" placeholder="login" v-model="email" />
      </div>
      <div>
        <input type="password" placeholder="password" v-model="password" />
      </div>
      <button type="submit">Login</button>
    </form>
    <div v-if="error" class="error">{{ error.message }}</div>
    <span
      ><router-link to="/register">Create an account</router-link> to start
      tracking!</span
    > -->
    <div class="bg-white rounded px-8 pt-6 pb-8 mb-4 flex flex-col md:w-2/4">
      <form @submit.prevent="submitLogin">
        <div class="mb-4">
          <label
            class="block text-grey-darker text-sm font-bold mb-2"
            for="login"
          >
            Login Email
          </label>
          <input
            class="
              shadow
              appearance-none
              border
              rounded
              w-full
              py-2
              px-3
              text-grey-darker
            "
            v-model="email"
            type="text"
            placeholder="login"
          />
        </div>
        <div class="mb-6">
          <label
            class="block text-grey-darker text-sm font-bold mb-2"
            for="password"
          >
            Password
          </label>
          <input
            class="
              shadow
              appearance-none
              border border-red
              rounded
              w-full
              py-2
              px-3
              text-grey-darker
              mb-3
            "
            v-model="password"
            type="password"
            placeholder="******************"
          />
          <!-- <p class="text-red text-xs italic">Please choose a password.</p> -->
        </div>
        <div class="flex items-center justify-between">
          <button
            class="
              bg-red-400
              hover:bg-blue-dark
              text-black
              font-bold
              py-2
              px-4
              rounded
            "
            type="submit"
          >
            Login
          </button>
        </div>
        <span
          >Create an
          <router-link
            class="
              inline-block
              align-baseline
              font-bold
              text-sm text-blue
              hover:text-blue-darker
              underline
            "
            to="/register"
          >
            Account here
          </router-link>
          to start</span
        >
      </form>
    </div>
  </div>
</template>

<script>
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
export default {
  data() {
    return {
      email: "",
      password: "",
      error: "",
    };
  },
  methods: {
    async submitLogin() {
      try {
        const auth = getAuth();
        const user = await signInWithEmailAndPassword(
          auth,
          this.email,
          this.password
        );
        console.log("user logged in", user);
        this.$router.replace({ name: "dashboard" });
      } catch (err) {
        console.error(err);
      }
    },
  },
};
</script>

<style>
</style>