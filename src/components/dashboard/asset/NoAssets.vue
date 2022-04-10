<template>
  <div class="mt-7 border-t-2">
    <div class="w-full flex flex-col items-center mt-4">
      <div class="font-semibold text-black p-1 text-base">
        This portfolio is empty
      </div>
      <div class="text-gray-500 pb-5 text-sm">Add any coins to get started</div>
      <div>
        <button
          @click="clickButton"
          class="
            bg-blue-500
            border-0
            items-center
            rounded-lg
            text-primary-white
            cursor-pointer
            justify-center
            font-semibold
            w-auto
            h-8
            text-xs
            leading-4
            px-4
          "
        >
          <span></span>
          Add New
        </button>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "NoAssetsView",
  methods: {
    clickButton() {
      this.$store.commit("setAddingState");
    },
  },
};
</script>