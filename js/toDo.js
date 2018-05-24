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
Vue.component('task-item', {
    props:['task'],
    template: `
    <div class="task-entry mb-3" v-bind:class="{'task-entry-done':task.status}" >

    <div class="task-status clickable" @click="$emit('toggle')">
        <i class="far" v-bind:class="{ 'fa-check-circle': task.status, 'fa-circle': !task.status }"></i>
    </div>

    <div class="task-text pl-3">
        <input class="" placeholder="Enter task name..." v-model.lazy="task.name" @change="$emit('update')"></input>
    </div>

    <div class="task-remove clickable" @click="$emit('remove')">
        <i class="far fa-trash-alt"></i>
    </div>
</div>`
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
            database.ref("/tasks/" + task.id).update(updateTask);
        },
        toggleTask: function (task) {
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

