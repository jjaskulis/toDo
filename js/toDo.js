'use strict'
// Initialize Firebase
let config = {
    apiKey: "AIzaSyBSi2PdmPKx1rIqKtIDP1xUaQw0nWbo92I",
    authDomain: "todo-4de9a.firebaseapp.com",
    databaseURL: "https://todo-4de9a.firebaseio.com",
    storageBucket: "todo-4de9a.appspot.com",
};

firebase.initializeApp(config);

let database = firebase.database();

database.ref().on('value', function (snapshot) {
    app.updateTasks(snapshot);
});

// Vue components

Vue.component('date-picker', {
    template: `
    <div class="container">
        <div id="calendar">
            <div id="year"></div>
            <span class="prev clickable color-blue"><</span>
            <span class="next clickable color-blue">></span>
            <div id="month"></div>
            <!-- <div id="daynames">Mon Tue Wed Thu Fri Sat Sun </div>-->
            <div id="days"> </div>
        </div>
    </div>
    `
})


// Vue instance
let app = new Vue({
    el: "#toDo-app",
    data: {
        taskList: [],
        statusFilter:"",
        modalVisible: false,
    },
    methods: {
        updateTasks: function (snapshot) {
            app.taskList = [];
            snapshot.forEach(function (item) {
                let task = {
                    id: item.getKey(),
                    name: item.val().name,
                    date: item.val().date,
                    status: item.val().status
                };
                app.taskList.push(task);
            })
        },
        addTask: function () {
            let newTask = {
                name: "",
                date: "",
                status: false,
            }
            database.ref().push(newTask);
        },
        removeTask: function (id) {
            database.ref(id).remove();
        },
        updateTask: function (task){
            let updateTask = {
                name : task.name,
                date: task.date,
                status: task.status
            };
            database.ref(task.id).update(updateTask);
        },
        toggleStatus: function(task){
            console.log("something");

            console.log(task);
            task.status = !task.status;
        }
    }
})

