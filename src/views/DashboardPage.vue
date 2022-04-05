<template>
  <div class="flex min-h-screen flex-col justify-between">
    <div class="overflow-hidden px-4 pt-6">
      <TotalAssetsBalance :totalAssetBalance="assets.totalAssetsBalance" />
      <AssetsOverview :assets="assets.assets" />
    </div>
  </div>
</template>
<script>
import TotalAssetsBalance from "../components/dashboard/TotalAssetsBalance.vue";
import AssetsOverview from "../components/dashboard/asset/AssetsOverview.vue";
export default {
  name: "DashBoard",
  components: { TotalAssetsBalance, AssetsOverview },
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
      try {
        const response = await this.$axios.get(
          "http://localhost:9010/assets?uuid=TEST_WJ_USER"
        );
        if (response.status === 200) {
          this.assets = response.data;
        }
        console.info("get assets", this.assets);
      } catch (err) {
        console.error(err);
      }
    },
  },
};
</script>