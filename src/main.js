import Vue from 'vue'
import App from './App.vue'
import firebase from 'firebase'
import 'firebase/database'
import 'bootstrap/dist/css/bootstrap.min.css'

// Initialize Firebase
const config = {
    apiKey: "AIzaSyBSi2PdmPKx1rIqKtIDP1xUaQw0nWbo92I",
    authDomain: "todo-4de9a.firebaseapp.com",
    databaseURL: "https://todo-4de9a.firebaseio.com",
    storageBucket: "todo-4de9a.appspot.com",
};

firebase.initializeApp(config);

//Vue stuff
new Vue({
    el: '#app',
    render: h =>h(App)
})
