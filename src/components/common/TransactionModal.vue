<template>
  <div
    class="
      bg-primary-white
      rounded-xl
      absolute
      z-50
      border-2
      top-0
      left-0
      h-screen
      w-full
      md:w-6/12 md:h-auto md:left-1/4 md:top-7p
    "
  >
    <div class="container px-4 pt-4">
      <div class="flex flex-row justify-between items-center mb-6">
        <div>
          <span class="font-bold text-xl">Add Transaction</span>
        </div>
        <button
          class="cursor-pointer text-gray-500 text-2xl font-medium"
          @click="closeTransactionModal"
        >
          X
        </button>
      </div>
      <TransactionSelector @selectTransaction="onSelectTransaction" />
      <div
        v-if="typeOfTransaction == `BUY` || typeOfTransaction == `SELL`"
        class="flex flex-col"
      >
        <TransactionForm :transactionType="typeOfTransaction" />
      </div>
      <!-- <div v-if="typeOfTransaction == `TRANSFER`">transfer</div> -->
    </div>
  </div>
</template>
<script>
import { ref } from "vue";
import TransactionSelector from "../dashboard/transaction/TransactionSelector.vue";
import TransactionForm from "../dashboard/transaction/TransactionForm.vue";
export default {
  name: "TransactionModal",
  components: { TransactionSelector, TransactionForm },
  data() {
    return {
      typeOfTransaction: "BUY",
    };
  },
  methods: {
    closeTransactionModal() {
      this.$store.commit("setAddingState");
    },
    onSelectTransaction(type) {
      console.log("type", type);
      this.typeOfTransaction = type;
    },
  },
  setup() {
    const date = ref(new Date());
    return {
      date,
    };
  },
};
</script>