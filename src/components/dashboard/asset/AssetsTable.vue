<template>
  <div class="max-w-7xl">
    <table class="m-auto text-sm w-full">
      <colgroup>
        <!-- Name col  -->
        <col />
        <!-- Price col  -->
        <col class="w-100px min-w-auto max-w-100px" />
        <!-- holdings col  -->
        <col />
        <!-- average buy price col  -->
        <col class="w-100px min-w-auto max-w-100px hidden md:table-cell" />
        <!-- actions col  -->
        <col class="hidden md:table-cell" />
      </colgroup>
      <thead>
        <tr>
          <th class="text-left">
            <div class="flex flex-row items-center justify-start">
              <div class="cursor-pointer flex flex-row items-center">
                <p class="whitespace-nowrap">Name</p>
              </div>
            </div>
          </th>
          <th class="text-right">
            <div class="flex flex-row items-center justify-end">
              <div class="cursor-pointer flex flex-row items-center">
                <p class="whitespace-nowrap">Price</p>
              </div>
            </div>
          </th>
          <th class="text-right">
            <div class="flex flex-row items-center justify-end">
              <div class="cursor-pointer flex flex-row items-center">
                <p class="whitespace-nowrap">Holdings</p>
              </div>
            </div>
          </th>
          <th class="text-right hidden md:table-cell">
            <div class="flex flex-row items-center justify-end">
              <div class="cursor-pointer flex flex-row items-center">
                <p class="whitespace-nowrap">Avg. Buy Price</p>
              </div>
            </div>
          </th>
          <th class="text-right hidden md:table-cell">
            <p class="leading-6 m-0 text-right text-xs">Actions</p>
          </th>
        </tr>
      </thead>

      <tbody>
        <!-- Asset Table Item Start -->
        <AssetTableItem
          v-for="(item, index) in assetsItems"
          :index="index"
          :key="item.symbol"
          :name="item.name"
          :symbol="item.symbol"
          :averagePrice="item.averagePrice"
          :totalHolding="item.totalHolding"
          :totalValue="item.totalValue"
          :transactions="item.transactions"
        >
        </AssetTableItem>

        <!-- Asset Table Item Emd -->
      </tbody>
    </table>
  </div>
</template>
<script>
import AssetTableItem from "./AssetTableItem.vue";
export default {
  name: "AssetTable",
  components: { AssetTableItem },
  props: {
    assetsItems: {
      type: Object,
      default() {
        return {};
      },
    },
  },
};
</script>