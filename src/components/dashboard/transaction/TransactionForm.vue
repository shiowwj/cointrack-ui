<template>
  <div>
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
        <div class="flex flex-col w-1/2 pr-2">
          <label for="quantity" class="font-semibold">Quantity</label>
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
        </div>
        <div class="flex flex-col w-1/2 pl-2">
          <label for="quantity" class="font-semibold">Price Per Coin</label>
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
    };
  },
  methods: {
    async submitTransaction() {
      let values = this.formatSymbolName(this.name);
      // TODO: add form validations
      const body = {
        symbol: values.s,
        name: values.n,
        quantity: this.quantity,
        total: this.totalValue,
        pricePerCoin: this.pricePerCoin,
        fees: this.fees,
        type: this.transactionType == "BUY" ? "B" : "S",
        dateTimeTxn: this.formatDateToISO(this.dateOfTransaction),
      };

      const headers = {
        "Content-Type": "application/json",
        Uuid: "TEST_WJ_USER",
      };
      const url = "http://localhost:9010/transactions";
      console.log("data to submit", body);
      try {
        let response = await this.$axios.post(url, body, { headers: headers });
        console.log("response", response);

        if (response.status === 200) {
          console.log("response data", response.data);
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
    formatSymbolName(inputName) {
      let name, symbol;
      let inputArr = inputName.split(":");
      if (inputArr.length > 0) {
        name = capitalizeFirstLetter(inputArr[0]);
        symbol = inputArr[1];
        return {
          n: name,
          s: symbol,
        };
      }

      return {
        n: "",
        s: "",
      };
    },
    formatDateToISO(dateTime) {
      return new Date(dateTime).toISOString();
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
  },
  setup() {
    const date = ref(new Date());
    return {
      date,
    };
  },
};

function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}
</script>