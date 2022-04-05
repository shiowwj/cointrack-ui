<template>
  <footer
    class="
      max-w-2xl
      w-full
      p-4
      md:px-0
      mx-auto
      mt-16
      flex
      justify-between
      items-center
    "
  >
    <div>
      <router-link
        @click="scrollToTop"
        class="text-xl font-light mr-auto"
        to="/"
        >HODLR</router-link
      >
      <p class="font-light text-xs">© 2022 - All rights reserved.</p>
    </div>
  </footer>
</template>

<script>
export default {
  methods: {
    scrollToTop() {
      window.scrollTo(0, 0);
    },
  },
};
</script>