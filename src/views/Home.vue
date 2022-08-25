<template>
  <div class="bg-gradient-to-tr from-gray-300 to-gray-100">
    <Nav />
    <NewTask @add-task="addNewTask" />
    <div
      class="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 px-0 sm:px-20 lg:px-15"
    >
      <div class="" v-for="task in taskStore.tasks" :key="task.id">
        <TaskItem :task="task" />
      </div>
    </div>
    <Footer />
    <router-view></router-view>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { supabase } from "../supabase";
import { useTaskStore } from "../stores/task";
import Nav from "../components/Nav.vue";
import NewTask from "../components/NewTask.vue";
import TaskItem from "../components/TaskItem.vue";
import Footer from "../components/Footer.vue";

const taskStore = useTaskStore();

taskStore.fetchTasks();

async function addNewTask(task) {
  await taskStore.addTask(task.title, task.description);
  taskStore.fetchTasks();
}
</script>

<style>

</style>
