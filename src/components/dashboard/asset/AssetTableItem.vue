<template>
  <tr class="cursor-pointer">
    <!-- NAME/ SYMBOL START -->
    <td class="text-left pl-0 h-20 box-border">
      <div>
        <div class="m-0 flex items-center">
          <!-- // insert image here -->
          <div class="flexflex-row items-center">
            <p class="break-words text-sm leading-6 ml-1">{{ name }}</p>
            <div class="flex flex-row items-center">
              <p class="text-sm leading-6 ml-1">{{ symbol }}</p>
            </div>
          </div>
        </div>
      </div>
    </td>
    <!-- NAME/ SYMBOL END -->
    <!-- PRICE START -->
    <td class="text-right h-20">
      <p class="break-words leading-6 m-0 text-sm text-black">$100</p>
    </td>
    <!-- PRICE END -->
    <!-- HOLDINGS START -->
    <td class="text-right h-20">
      <div class="m-0 flex flex-col items-end">
        ${{ totalValue.toFixed(2) }}
        <p class="leading-6 m-0 text-gray-600 text-xs">
          {{ totalHolding }} {{ symbol }}
        </p>
      </div>
    </td>
    <!-- HOLDINGS END -->
    <!-- AVG BUY PRICE START -->
    <td class="text-right h-20 hidden md:table-cell">
      <p class="break-words leading-6 m-0 text-sm">
        ${{ averagePrice.toFixed(2) }}
      </p>
    </td>
    <!-- AVG BUY PRICE END -->
    <!-- ACTIONS START -->
    <td class="text-right h-20 hidden md:table-cell">
      <div class="pr-3">
        <button class="rounded-50p p-0 w-8" @click="addItemEvent()">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="currentColor"
            height="16px"
            width="16"
            viewBox="0 0 24 24"
            color="neutral4"
            class="m-0 h-4 w-4 text-zinc-700"
          >
            <path
              d="M20.4852 11.9999H11.9999M11.9999 11.9999H3.51465M11.9999 11.9999V20.4852M11.9999 11.9999V3.51465"
              stroke="currentColor"
              stroke-width="2"
              stroke-miterlimit="10"
              stroke-linecap="round"
              stroke-linejoin="round"
            ></path>
          </svg>
        </button>
        <div class="inline-flex m-0">
          <button class="rounded-50p p-0 w-8" @click="initItemActionsEvent()">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              height="16px"
              width="16px"
              viewBox="0 0 24 24"
              color="neutral4"
              class="m-0 h-4 w-4 text-zinc-700"
            >
              <path
                d="M10 12C10 13.1046 10.8954 14 12 14C13.1046 14 14 13.1046 14 12C14 10.8954 13.1046 10 12 10C10.8954 10 10 10.8954 10 12Z"
              ></path>
              <path
                d="M10 5C10 6.10457 10.8954 7 12 7C13.1046 7 14 6.10457 14 5C14 3.89543 13.1046 3 12 3C10.8954 3 10 3.89543 10 5Z"
              ></path>
              <path
                d="M10 19C10 20.1046 10.8954 21 12 21C13.1046 21 14 20.1046 14 19C14 17.8954 13.1046 17 12 17C10.8954 17 10 17.8954 10 19Z"
              ></path>
            </svg>
          </button>
        </div>
      </div>
    </td>
    <!-- ACTIONS END -->
  </tr>
</template>
<script>
export default {
  name: "AssetTableItem",
  props: {
    name: {
      type: String,
      default: "",
    },
    symbol: {
      type: String,
      default: "",
    },
    averagePrice: {
      type: Number,
      default: 0.0,
    },
    totalHolding: {
      type: Number,
      default: 0.0,
    },
    totalValue: {
      type: Number,
      default: 0.0,
    },
    transactions: {
      type: Array,
      default() {
        return [];
      },
    },
  },
  methods: {
    addItemEvent() {
      this.$store.commit("setAddingState");
      const currentItem = {
        name: this.name,
        symbol: this.symbol,
      };
      this.$store.commit("setCurrentItem", currentItem);
    },
    initItemActionsEvent() {
      console.log("open menu action event");
    },
  },
};
</script>