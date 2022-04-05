<template>
  <div>
    <div class="flex justify-between items-center">
      <!-- Asset header START -->
      <p class="leading-6 pr-6 py-6 text-lg font-bold">Your Assets</p>
      <button
        class="
          items-center
          bg-blue-600
          border-0
          rounded-lg
          text-white
          justify-center
          outline-white outline-0
          font-semibold
          w-auto
          h-8
          text-xs
          px-4
          leading-4
        "
      >
        Add New
      </button>
    </div>
    <!-- Asset header END -->
    <div>
      <!-- Table START -->
      <AssetsTable :assetsItems="assets" />
      <!-- Table END -->
    </div>
  </div>
</template>
<script>
import AssetsTable from "./AssetsTable.vue";
export default {
  name: "AssetsOverview",
  components: { AssetsTable },
  props: {
    assets: {
      type: Object,
      default() {
        return {};
      },
    },
  },
};
</script>