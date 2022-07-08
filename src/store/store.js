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
            },
            currentUser: ""
        }
    },
    mutations: {
        setAddingState(state) {
            state.isAddingState = state.isAddingState ? false : true;
        },
        setCurrentItem(state, currentItem) {
            state.currentItem = currentItem
        },
        setCurrentUserState(state, currentUserUid) {
            state.currentUser = currentUserUid
        },
        removeCurrentUserState(state) {
            state.currentUser = ""
        }
    }
})
