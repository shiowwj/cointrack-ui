import { createStore } from 'vuex'

// Create a new store instance.
export const store = createStore({
    state() {
        return {
            isAddingState: false
        }
    },
    mutations: {
        setAddingState(state) {
            // console.log("store: setAddingState ", state.isAddingState)
            state.isAddingState = state.isAddingState ? false : true;
            // console.log("store: setAddingState ", state.isAddingState)
            // if (state.addingState) {
            //     state.addingState = false
            // } else {
            //     state.addingState = true
            // }
        }
    }
})