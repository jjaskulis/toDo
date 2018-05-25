<template>
<div class="task-list">
    <transition-group name="task-fade">
        <task-item 
        v-cloak 
            v-for="task in tasklist"
            :task="task"
            :key="taskFilter(task)"  
            v-if="taskFilter(task)"    
            @toggle="$emit('toggle',task)"
            @update="$emit('update',task)"
            @remove="$emit('remove',task)" 
            />
    </transition-group>

</div>
</template>

<script>
import TaskItem from  './TaskItem.vue'

export default{
    props: ['tasklist','filter'],
    components:{
        TaskItem
    },
    methods:{
        taskFilter (task) {
            if (this.filter === "all" || this.filter === task.status) {
                return true;
            }
            else {
                return false;
            }
        },
    }
}
</script>
<style>
/* Animation
–––––––––––––––––––––––––––––––––––––––––––––––––– */
.task-fade-leave-active {
    transition: all .12s;
}

.task-fade-leave-to {
    opacity: 0.1;
}

</style>