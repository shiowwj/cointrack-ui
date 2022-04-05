<template>
  <div class="font-sans antialiased bg-white border-b-2 border-slate-300">
    <nav class="flex items-center justify-between flex-wrap bg-teal p-6">
      <div class="flex items-center flex-no-shrink text-black mr-6">
        <span class="font-semibold text-xl tracking-tight"
          ><router-link to="/" class="no-underline">HODLR</router-link></span
        >
      </div>
      <div class="block sm:hidden">
        <button
          @click="toggle"
          class="
            flex
            items-center
            px-3
            py-2
            border
            rounded
            text-teal-lighter
            border-teal-light
            hover:text-white hover:border-white hover:bg-sky-200
            bg-blue-600
          "
        >
          <svg
            class="fill-current h-3 w-3"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <title>Menu</title>
            <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z" />
          </svg>
        </button>
      </div>
      <div
        :class="openMenu ? '' : 'hidden'"
        class="w-full sm:flex sm:items-center sm:w-auto"
      >
        <div class="text-sm sm:flex-grow">
          <router-link
            to="/dashboard"
            class="
              no-underline
              block
              mt-4
              sm:inline-block sm:mt-0
              text-teal-lighter
              hover:text-blue-500
              mr-4
            "
            >Dashboard</router-link
          >
        </div>
        <div class="mx-2">
          <div v-if="loggedIn">
            <button
              @click="signOutButton"
              class="
                no-underline
                inline-block
                text-sm
                px-4
                py-2
                leading-none
                border
                rounded
                text-white
                bg-red-500
                hover:border-transparent
                hover:text-teal
                hover:bg-sky-200
                hover:text-red-500
                mt-4
                sm:mt-0
              "
            >
              Sign out
            </button>
          </div>
          <div v-else>
            <router-link
              to="/login"
              class="
                no-underline
                inline-block
                text-sm
                px-4
                py-2
                leading-none
                border
                rounded
                text-white
                bg-blue-500
                hover:border-transparent
                hover:text-teal
                hover:bg-sky-200
                hover:text-blue-500
                mt-4
                sm:mt-0
              "
              >Login</router-link
            >
            <router-link
              to="/register"
              class="
                no-underline
                inline-block
                text-sm
                px-4
                py-2
                leading-none
                border
                rounded
                text-white
                bg-orange-600
                hover:border-transparent
                hover:text-teal
                hover:bg-slate-200
                hover:text-orange-600
                mt-4
                sm:mt-0
              "
              >Register</router-link
            >
          </div>
        </div>
      </div>
    </nav>
  </div>
</template>

<script>
import { getAuth, signOut } from "@firebase/auth";
export default {
  created() {
    const auth = getAuth();
    auth.onAuthStateChanged((user) => {
      //   this.loggedIn = !!user;
      console.log("user", user);
      if (user) {
        this.loggedIn = true;
      } else {
        this.loggedIn = false;
      }
    });
  },
  data: function () {
    return {
      openMenu: false,
      loggedIn: false,
    };
  },
  methods: {
    toggle: function () {
      this.openMenu = !this.openMenu;
    },
    async signOutButton() {
      try {
        const auth = getAuth();
        const user = await signOut(auth);
        console.log("user signout", user);
        this.$router.replace({ name: "login" });
      } catch (err) {
        console.err(err);
      }
    },
  },
};
</script>