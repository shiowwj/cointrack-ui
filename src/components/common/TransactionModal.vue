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
      <div v-if="typeOfTransaction == `BUY`" class="flex flex-col">
        <form @submit.prevent="submitTransaction" class="mt-6">
          <select
            v-model="name"
            class="w-full border rounded-lg h-bh mb-5 hover:border-blue-200"
          >
            <option value="bitcoin:BTC">Bitcoin</option>
            <option value="ethereum:ETH">Ethereum</option>
            <option value="luna:LUNA">Luna</option>
            <option value="fantom:FTM">Fantom</option>
          </select>
          <div class="flex flex-row justify-around mb-6">
            <div class="flex flex-col w-1/2 px-2">
              <label for="quantity">Quantity</label>
              <input
                v-model="quantity"
                class="
                  rounded-lg
                  border
                  h-bh
                  items-center
                  pl-2
                  pr-2
                  hover:border-blue-200
                "
                type="number"
                name="quantity"
                placeholder="0.00"
              />
            </div>
            <div class="flex flex-col w-1/2 px-2">
              <label for="quantity">Price Per Coin</label>
              <div
                class="
                  w-full
                  border
                  rounded-lg
                  h-bh
                  items-center
                  py-1
                  pl-2
                  hover:border-blue-200
                "
              >
                <span class=""
                  >$
                  <input
                    v-model="pricePerCoin"
                    class="border-0 border-opacity-100 outline-0 text-right"
                    type="number"
                    name="Price Per Coin"
                    placeholder="0.00"
                  />
                </span>
              </div>
            </div>
          </div>
          <div class="flex flex-row mb-4">
            <div
              class="
                cursor-pointer
                h-bh
                bg-background-grey
                rounded-lg
                pt-1
                px-3
              "
            >
              <DatePicker v-model="dateOfTransaction">
                <template #trigger>
                  <p class="text-alt-grey hover:text-black">
                    {{ formatDateTime(dateOfTransaction) }}
                  </p>
                </template>
              </DatePicker>
            </div>
          </div>
          <div class="mb-4">
            <label for="quantity">Fees</label>
            <div
              class="
                border
                rounded-lg
                h-bh
                py-1
                pl-2
                w-1/3
                px-4
                hover:border-blue-200
              "
            >
              <!-- items-center -->
              <!-- inset-0 items-center  -->
              <span class=""
                >$
                <input
                  class="border-0 border-opacity-100 outline-0 text-right w-90p"
                  type="number"
                  name="Add Fee"
                  placeholder=""
                  v-model="fees"
                />
              </span>
            </div>
          </div>
          <div class="h-bh">total spent</div>
          <button
            type="submit"
            class="
              w-full
              text-center
              py-3
              rounded-lg
              bg-blue-400
              text-white
              hover:bg-green-dark
              focus:outline-none
              mt-1
              mb-5
            "
          >
            Add Transaction
          </button>
        </form>
      </div>
      <div v-if="typeOfTransaction == `SELL`">sell</div>
      <div v-if="typeOfTransaction == `TRANSFER`">transfer</div>
    </div>
  </div>
</template>
<script>
import { ref } from "vue";
import TransactionSelector from "../dashboard/transaction/TransactionSelector.vue";
export default {
  name: "TransactionModal",
  components: { TransactionSelector },
  data() {
    return {
      pickingDate: false,
      addingFees: false,
      addingNotes: false,
      typeOfTransaction: "BUY",
      name: "",
      quantity: 0.0,
      pricePerCoin: 0.0,
      dateOfTransaction: this.currentDateTime(),
      fees: 0.0,
      notes: "",
      totalSpent: "",
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
    submitTransaction() {
      console.log("data", this.$data);
    },
    currentDateTime() {
      let currentDate =
        new Date().toDateString() +
        ", " +
        new Date().getHours() +
        ":" +
        new Date().getMinutes();
      return currentDate;
    },
    formatDateTime(dateTime) {
      let formattedDateTime;
      if (typeof dateTime == "object") {
        let dateTimeObj = new Date(dateTime);
        formattedDateTime =
          dateTimeObj.toDateString() +
          ", " +
          dateTimeObj.getHours() +
          ":" +
          dateTimeObj.getMinutes();
        return formattedDateTime;
      }
      return dateTime;
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