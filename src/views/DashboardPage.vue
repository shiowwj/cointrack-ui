<template>
  <div class="flex min-h-screen flex-col justify-between">
    <div
      v-if="addingState"
      class="w-screen h-screen fixed top-0 left-0 z-10 bg-gray"
      v-on:click="clickAway()"
    ></div>
    <TransactionModal v-if="addingState"></TransactionModal>
    <!-- :modalData="modalCurrentItem" -->
    <div class="overflow-hidden px-4 pt-6">
      <TotalAssetsBalance :totalAssetBalance="assets.totalAssetsBalance" />
      <AssetsOverview :assets="assets.assets" />
    </div>
  </div>
</template>
<script>
import TotalAssetsBalance from "../components/dashboard/TotalAssetsBalance.vue";
import AssetsOverview from "../components/dashboard/asset/AssetsOverview.vue";
import TransactionModal from "../components/common/TransactionModal.vue";
export default {
  name: "DashBoard",
  components: { TotalAssetsBalance, AssetsOverview, TransactionModal },
  computed: {
    addingState() {
      return this.$store.state.isAddingState;
    },
  },
  created() {
    this.getAssets();
  },
  data() {
    return {
      assets: {},
    };
  },
  methods: {
    async getAssets() {
      const user = this.$store.state.currentUser;
      console.log("user", user);
      try {
        const response = await this.$axios.get(
          `${process.env.VUE_APP_BACKEND_LOCAL_BASEURL}/assets?uuid=${user}`
        );
        if (response.status === 200) {
          this.assets = response.data;
        }
      } catch (err) {
        console.error(err);
      }
    },
    clickAway() {
      this.$store.commit("setCurrentItem", null);
      this.$store.commit("setAddingState");
    },
  },
};
</script>