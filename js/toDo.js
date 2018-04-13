'use strict'
// Initialize Firebase
const config = {
    apiKey: "AIzaSyBSi2PdmPKx1rIqKtIDP1xUaQw0nWbo92I",
    authDomain: "todo-4de9a.firebaseapp.com",
    databaseURL: "https://todo-4de9a.firebaseio.com",
    storageBucket: "todo-4de9a.appspot.com",
};

firebase.initializeApp(config);

const database = firebase.database();

database.ref("tasks").on('value', function (snapshot) {
    todo.refreshTasks(snapshot);
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
const todo = new Vue({
    el: "#toDo-app",
    data: {
        filter: {
            buttons: {
                all: {
                    active: true,
                    name: "all",
                    type: "all",
                },
                completed: {
                    active: false,
                    name: "completed",
                    type: true,

                },
                pending: {
                    active: false,
                    name: "pending",
                    type: false,
                }
            },
            active: "all",
        },
        taskList: [],
        taskList: []
    },
    methods: {
        refreshTasks: function (snapshot) {
            todo.taskList = [];
            snapshot.forEach(function (item) {
                let task = {
                    id: item.getKey(),
                    name: item.val().name,
                    date: item.val().date,
                    status: item.val().status
                };
                todo.taskList.push(task);
            })
        },
        addTask: function () {
            let newTask = {
                name: "",
                date: "",
                status: false,
            }
            database.ref("/tasks/").push(newTask);
        },
        removeTask: function (id) {
            database.ref("/tasks/" + id).remove();
        },
        updateTask: function (task) {
            let updateTask = {
                name: task.name,
                date: task.date,
                status: task.status
            };
            database.ref("/tasks/"+task.id).update(updateTask);
        },
        toggleStatus: function (task) {
            task.status = !task.status;
            this.updateTask(task);
        },
        taskFilter: function (task) {
            if (this.filter.active === "all" || this.filter.active === task.status) {
                return true;
            }
            else {
                return false;
            }
        },
    },
    computed: {
        completedQty: function () {
            let total = 0;
            this.taskList.forEach(function (task) {
                if (task.status === true) {
                    total++;
                }
            })
            return total;
        },
        pendingdQty: function () {
            let total = 0;
            this.taskList.forEach(function (task) {
                if (task.status === false) {
                    total++;
                }
            })
            return total;
        },
    }
})

