<template>

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
    </div>

</template>
<script>
    export default{
        props:{
            task:{
                type: Object,
                required: true
            }
        },
    }
</script>
<style>
.task-entry {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    background: #F5F3F0;
    border-radius: 3px;
    box-shadow: 0px 1px 1px rgba(0, 0, 0, 0.10), 2px 4px 4px rgba(0, 0, 0, 0.10);
    text-align: center;
    overflow: hidden;
    line-height: 300%;
}

.task-entry input {
    float:left;
    width: 100%;
    border: none;
    outline: 0;
    background: none;
}

.task-entry:hover .task-remove {
    opacity: 1;
}

.task-entry-done input{
    color: #999;
    text-decoration: line-through;
}

.task-entry-done .task-status{
    background: #01CCA5;
}

.task-status {
    min-width: 50px;
    color: #1A1818;
    background: #DFD9D5;
}

.task-status:hover {
    opacity: 0.8;
}

.task-text {
    flex-grow: 1;
}

.task-remove {
    min-width: 50px;
    text-align: center;
    opacity: 0;
    transition: all 0.15s ease-in-out;
}

.task-remove:hover {
    background: #F3450F;
    color: #EEF8FF;
}

</style>