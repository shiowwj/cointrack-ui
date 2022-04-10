import { createApp } from 'vue'
import App from './App.vue'
import './index.css'
import router from './router'
import axios from "axios"
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth"
import { store } from "./store/store"
import Datepicker from '@vuepic/vue-datepicker';
import '@vuepic/vue-datepicker/dist/main.css'


const VueApp = createApp(App)
VueApp.config.globalProperties.$axios = axios
VueApp.use(store)
VueApp.component('DatePicker', Datepicker)
// Import the functions you need from the SDKs you need
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: process.env.VUE_APP_FIREBASE_API_KEY,
    authDomain: process.env.VUE_APP_AUTH_DOMAIN,
    projectId: process.env.VUE_APP_PROJECT_ID,
    storageBucket: process.env.VUE_APP_STORAGE_BUCKET,
    messagingSenderId: process.env.VUE_APP_MESSAGING_SENDER_ID,
    appId: process.env.VUE_APP_APP_ID
};
// Initialize Firebase
initializeApp(firebaseConfig);

// Check user auth status with firebase before loading app
let app;
const auth = getAuth()
auth.onAuthStateChanged(user => {
    console.log(user)
    if (!app) {
        app = VueApp.use(router).mount('#app')
    }
})


