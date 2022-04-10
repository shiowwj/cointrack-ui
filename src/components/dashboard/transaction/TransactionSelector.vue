<template>
  <div
    class="flex flex-row p-1 bg-background-grey justify-evenly rounded-lg mt-4"
  >
    <button
      :class="typeOfTransaction == `BUY` ? `bg-primary-white` : ``"
      @click="selectTransaction('BUY')"
      class="w-1/3 h-bh rounded-lg"
    >
      Buy
    </button>
    <button
      :class="typeOfTransaction == `SELL` ? `bg-primary-white` : ``"
      class="w-1/3 h-bh rounded-lg"
      @click="selectTransaction('SELL')"
    >
      Sell
    </button>
    <button
      :class="typeOfTransaction == `TRANSFER` ? `bg-primary-white` : ``"
      class="w-1/3 h-bh rounded-lg"
      @click="selectTransaction('TRANSFER')"
    >
      Transfer
    </button>
  </div>
</template>
<script>
export default {
  data() {
    return {
      typeOfTransaction: "BUY",
    };
  },
  methods: {
    selectTransaction(type) {
      this.typeOfTransaction = type;
      this.$emit("selectTransaction", type);
    },
  },
};
</script>