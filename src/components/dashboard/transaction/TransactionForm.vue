<template>
  <div>
    <form @submit.prevent="submitTransaction" class="mt-6">
      <div class="mb-5">
        <select
          v-model="name"
          class="w-full border rounded-lg h-bh hover:border-blue-200"
        >
          <option value="bitcoin:BTC">Bitcoin</option>
          <option value="ethereum:ETH">Ethereum</option>
          <option value="luna:LUNA">Luna</option>
          <option value="fantom:FTM">Fantom</option>
        </select>
        <div v-if="errors.name.length > 0" class="error">
          <span
            v-for="error in errors.name"
            :key="error.message"
            class="text-xs text-red-400"
            >{{ error.message }}</span
          >
        </div>
      </div>
      <div class="flex flex-row justify-around mb-6">
        <div class="flex flex-col w-1/2 pr-2">
          <label for="quantity" class="font-semibold">Quantity</label>
          <div>
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
              step=".0001"
            />
            <div v-if="errors.quantity.length > 0" class="error">
              <span
                v-for="error in errors.quantity"
                :key="error.message"
                class="text-xs text-red-400"
                >{{ error.message }}</span
              >
            </div>
          </div>
        </div>
        <div class="flex flex-col w-1/2 pl-2">
          <label for="quantity" class="font-semibold">Price Per Coin</label>
          <div>
            <div
              class="
                w-full
                border
                rounded-lg
                h-bh
                items-center
                pl-2
                py-1
                hover:border-blue-200
              "
            >
              <span class=""
                >$
                <input
                  v-model="pricePerCoin"
                  class="border-0 border-opacity-100 outline-0 text-right w-80p"
                  type="number"
                  name="Price Per Coin"
                  placeholder="0.00"
                  step=".0001"
                />
              </span>
            </div>
            <div v-if="errors.pricePerCoin.length > 0" class="error">
              <span
                v-for="error in errors.pricePerCoin"
                :key="error.message"
                class="text-xs text-red-400"
                >{{ error.message }}</span
              >
            </div>
          </div>
        </div>
      </div>
      <div class="flex flex-row mb-4">
        <div
          class="cursor-pointer h-bh bg-background-grey rounded-lg pt-1 px-3"
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
        <label for="quantity" class="font-semibold">Fees</label>
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
          <span class=""
            >$
            <input
              class="border-0 border-opacity-100 outline-0 text-right w-80p"
              type="number"
              name="Add Fee"
              placeholder=""
              v-model="fees"
              step=".0001"
            />
          </span>
        </div>
      </div>
      <div
        class="
          h-display-box
          border
          rounded-2xl
          bg-background-grey
          w-full
          flex flex-col
          p-4
          mb-6
          table
        "
      >
        <div>
          <span>Total {{ transactType() }}</span>
        </div>
        <div class="font-extrabold text-2xl tracking-widest">
          <p><span class="mr-2">$</span>{{ calculateAmount() }}</p>
        </div>
      </div>
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
          disabled:opacity-50
        "
      >
        Add Transaction
      </button>
    </form>
  </div>
</template>
<script>
import { ref } from "vue";
import {
  FormatSymbolName,
  FormatDateToISO,
  ValidateSymbolName,
} from "../../../utils/util";
export default {
  name: "TransactionForm",
  props: {
    transactionType: {
      type: String,
      default: "buy",
    },
  },
  mounted() {
    this.getStoreCurrentItem();
  },
  data() {
    return {
      name: "",
      quantity: 0.0,
      pricePerCoin: 0.0,
      dateOfTransaction: this.currentDateTime(),
      fees: 0.0,
      notes: "",
      totalValue: "",
      currentUser: "",
      errors: {
        name: [],
        quantity: [],
        pricePerCoin: [],
      },
    };
  },
  methods: {
    async submitTransaction() {
      if (!this.validateForm()) {
        return;
      }
      let values = FormatSymbolName(this.name);

      this.currentUser = this.$store.state.currentUser;
      // TODO: add form validations
      const body = {
        symbol: values.s,
        name: values.n,
        quantity: this.quantity,
        total: this.totalValue,
        pricePerCoin: this.pricePerCoin,
        fees: this.fees,
        type: this.transactionType == "BUY" ? "B" : "S",
        dateTimeTxn: FormatDateToISO(this.dateOfTransaction),
      };

      const headers = {
        "Content-Type": "application/json",
        Uuid: this.currentUser,
      };
      const url = `${process.env.VUE_APP_BACKEND_LOCAL_BASEURL}/transactions`;
      console.log("data to submit", body);
      try {
        let response = await this.$axios.post(url, body, { headers: headers });
        console.log("response", response);

        if (response.status === 200) {
          //   console.log("response data", response.data);
          this.reloadPage();
        }
      } catch (err) {
        console.error(err);
      }
    },
    currentDateTime() {
      let hours = new Date().getHours();
      let minutes = new Date().getMinutes();

      if (hours < 10 && hours >= 0) {
        hours = "0" + hours.toString();
      }

      if (minutes < 10 && minutes >= 0) {
        minutes = "0" + minutes.toString();
      }

      let currentDate =
        new Date().toDateString() + ", " + hours + ":" + minutes;
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
    transactType() {
      let word = this.transactionType == "BUY" ? "Spent" : "Received";
      return word;
    },
    calculateAmount() {
      let totalAmount = 0;

      if (this.quantity > 0 && this.pricePerCoin > 0) {
        totalAmount = this.quantity * this.pricePerCoin;
        if (this.fees > 0) {
          totalAmount = totalAmount - this.fees;
        }
        this.totalValue = totalAmount;

        return totalAmount.toFixed(2);
      }

      this.totalValue = totalAmount;
      return totalAmount;
    },
    getStoreCurrentItem() {
      const currentItem = this.$store.state.currentItem;
      console.log("get current item", currentItem);
      if (currentItem) {
        this.name = currentItem.name.toLowerCase() + ":" + currentItem.symbol;
      }
    },
    reloadPage() {
      this.$store.commit("setCurrentItem", null);
      this.$store.commit("setAddingState");
      window.location.reload();
    },
    validateForm() {
      // reset errors and reevaluate again
      this.errors.name = [];
      this.errors.quantity = [];
      this.errors.pricePerCoin = [];
      console.log("name", ValidateSymbolName(this.name));
      if (!ValidateSymbolName(this.name)) {
        this.errors.name.push({ message: "Please select" });
      }
      if (this.quantity == 0) {
        this.errors.quantity.push({
          message: "Please enter a quantity amount",
        });
      }
      if (this.pricePerCoin == 0) {
        this.errors.pricePerCoin.push({ message: "Please enter a price" });
      }

      if (
        this.errors.name.length == 0 &&
        this.errors.quantity.length == 0 &&
        this.errors.pricePerCoin.length == 0
      ) {
        return true;
      }
      return false;
    },
  },
  setup() {
    const date = ref(new Date());
    return {
      date,
    };
  },
};

// function capitalizeFirstLetter(string) {
//   return string.charAt(0).toUpperCase() + string.slice(1);
// }
</script>