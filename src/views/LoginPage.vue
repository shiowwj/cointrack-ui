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
          <div class="mb-3">
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
            <div v-if="errors.email.length > 0" class="error">
              <span
                v-for="error in errors.email"
                :key="error.message"
                class="text-xs text-red-400"
                >{{ error.message }}</span
              >
            </div>
          </div>
        </div>
        <div class="mb-6">
          <label
            class="block text-grey-darker text-sm font-bold mb-2"
            for="password"
          >
            Password
          </label>
          <div class="mb-3">
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
              "
              v-model="password"
              type="password"
              placeholder="******************"
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
    <div>Login with google</div>
  </div>
</template>

<script>
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
export default {
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
  methods: {
    async submitLogin() {
      if (!this.validateForm()) {
        return;
      }
      try {
        const auth = getAuth();
        const user = await signInWithEmailAndPassword(
          auth,
          this.email,
          this.password
        );

        if (user.operationType == "signIn") {
          this.$store.commit("setCurrentUserState", user.user.uid);
          this.$router.replace({ name: "dashboard" });
        }
      } catch (err) {
        console.error(err);
      }
    },
    validateForm() {
      // reset errors and reevaluate again
      this.errors.email = [];
      this.errors.password = [];
      if (this.email == "") {
        this.errors.email.push({ message: "Please enter Login email" });
      }

      if (this.password == "" && this.email != "") {
        this.errors.password.push({
          message: "Please enter password",
        });
      }

      if (this.errors.email.length == 0 && this.errors.password.length == 0) {
        return true;
      }
      return false;
    },
  },
};
</script>

<style>
</style>