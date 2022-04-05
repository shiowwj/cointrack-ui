<template>
  <div id="app">
    <CommonNavbar />
    <router-view />
    <CommonFooter />
  </div>
</template>

<script>
import CommonNavbar from "./components/common/CommonNavbar.vue";
import CommonFooter from "./components/common/CommonFooter.vue";

export default {
  name: "App",
  components: { CommonNavbar, CommonFooter },
};
</script>
