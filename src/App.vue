<template>
    <div id="app" v-cloak>
        <div class="container box-shadow">
            <h1 class="title-main mt-4">toDO</h1>

            <div class="add-task-block clickable" @click="addTask">
                <button type="button" class="btn btn-add-task">
                    <i class="fa fa-plus"></i> add task
                </button>
            </div>
            <h5 class="title-tasklist my-4 ">tasks</h5>

            <div class="task-filters my-4" role="toolbar">
                <button class="btn" type="button" v-for="button in filter.buttons" v-bind:class="{'active': filter.active === button.type}"
                    @click="filter.active = button.type">{{button.name}}
                    <span class="counter" v-show="button.type === true">({{completedQty}})</span>
                    <span class="counter" v-show="button.type === false">({{pendingdQty}})</span>
                </button>
            </div>

            <div v-if="tasklist === null" class="loader">
                <i class="fas fa-spin fa-circle-notch fa-4x"></i>
            </div>

            <task-list 
            :tasklist="tasklist"
            :filter ="filter.active" 
            @toggle="toggleTask($event)"
            @update="updateTask($event)"
            @remove="removeTask($event)"
            />

        </div>
    </div>

</template>

<script>
import TaskList from './components/TaskList.vue';
import firebase from 'firebase'

export default {
    components: {
      TaskList
    },
  data () {
    return {
        database: firebase.database(),
        tasklist:[],
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
    }
  },
      created: function () {
        firebase.database().ref("tasks").on('value',(snap)=>{
          this.refreshTasks(snap);
        });

    },
      methods: {
        refreshTasks: function(snapshot) {
              this.tasklist = [];
              snapshot.forEach((item)=> {
                 let task = {
                    id: item.key,
                    name: item.val().name,
                    date: item.val().date,
                    status: item.val().status
                };
                this.tasklist.push(task);
            })
        },
        addTask: function () {
            let newTask = {
                name: "",
                date: "",
                status: false,
            }
            this.database.ref("/tasks/").push(newTask);
        },
        removeTask: function (task) {
            const id = task.id;
            this.database.ref("/tasks/" + id).remove();
        },
        updateTask: function (task) {
            let updateTask = {
                name: task.name,
                date: task.date,
                status: task.status
            };
            this.database.ref("/tasks/" + task.id).update(updateTask);
        },
        toggleTask: function (task) {
            task.status = !task.status;
            this.updateTask(task);
        },
        taskFilter:function(){}

    },
    computed: {
        completedQty: function () {
            let total = 0;
            this.tasklist.forEach(function (task) {
                if (task.status === true) {
                    total++;
                }
            })
            return total;
        },
        pendingdQty: function () {
            let total = 0;
            this.tasklist.forEach(function (task) {
                if (task.status === false) {
                    total++;
                }
            })
            return total;
        },
    }
}
</script>

<style>
body{
    color: #1A1818;
    font-weight: 400;
    font-family: "Work Sans", "HelveticaNeue", "Helvetica Neue", Helvetica, Arial, sans-serif;
    background-color: #FCFAFA;
}

.add-task-block {
    border-radius: 3px;
    line-height: 300%;
    background: #b2adfa;
    text-align: center;
    transition: all 0.1s ease-in-out;
}

.add-task-block:hover {
    opacity: 0.75;
}

.clickable {
    cursor: pointer;
}

.btn-add-task {
    font-weight: 600;    
    background: none;
}

/* headings
–––––––––––––––––––––––––––––––––––––––––––––––––– */
.title-main {
        font-weight: 700;
}

.title-tasklist {
    border-bottom: 2px solid #1A1818;
}


/* task filter
–––––––––––––––––––––––––––––––––––––––––––––––––– */
.task-filters {
    border-radius: 3px;
    background: #DFD9D5;
}

.task-filters button {
    background: none;
    border-radius: 0;
    font-weight: 400;
    transition: all 0.1s ease-in-out;

}

.task-filters button:hover {
    opacity: 0.75;
}

.task-filters .active {
    font-weight: 600;
}

.counter {
    font-size: 0.9rem;
}

.loader {
    text-align: center;
    color:#b2adfa;
}

[v-cloak] {
    display: none;
}

</style>
