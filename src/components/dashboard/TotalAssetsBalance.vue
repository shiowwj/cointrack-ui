<template>
  <div>
    <p class="text-gray-500 text-sm line leading-6">
      <span class="items-center opacity-100 mt-0">Current Balance</span>
    </p>
    <div class="box-border h-12 items-center">
      <div class="w-full">
        <div class="text-3xl font-bold leading-6 break-all">
          <div>${{ totalAssetBalance.toFixed(2) }}</div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    totalAssetBalance: {
      type: Number,
      default: 0.0,
    },
  },
};
</script>