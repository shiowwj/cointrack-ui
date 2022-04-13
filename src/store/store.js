import { createStore } from 'vuex'

// Create a new store instance.
export const store = createStore({
    state() {
        return {
            isAddingState: false,
            currentItem: {
                name: "",
                symbol: "",
                // averagePrice: "",
                // totalHolding: "",
            }
        }
    },
    mutations: {
        setAddingState(state) {
            state.isAddingState = state.isAddingState ? false : true;
        },
        setCurrentItem(state, currentItem) {
            console.log('state current item', state.currentItem)
            console.log('state current test', currentItem)
            state.currentItem = currentItem
        }
    }
})