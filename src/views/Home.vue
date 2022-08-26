<template>
  <div
    class="bg-gradient-to-tr from-gray-300 to-gray-100 flex flex-col justify-center"
  >
    <Nav />
    <NewTask @add-task="addNewTask" />

    <div
      :class="{
        all: filter === 'all',
        done: filter === 'done',
        undone: filter === 'undone',
      }"
      class="flex flex-row space-x-5 justify-center mb-16"
    >
      <button
        @click="filter = 'todo'"
        class="flex justify-center items-center bg-gray-700 hover:bg-black duration-200 hover:scale-105 text-white focus:outline-none focus:bg-black rounded w-24 py-2 mt-3 font-mono"
      >
        To do
      </button>
      <button
        @click="filter = 'done'"
        class="flex justify-center items-center bg-gray-700 hover:bg-black duration-200 hover:scale-105 text-white focus:outline-none focus:bg-black rounded w-24 py-2 mt-3 font-mono"
      >
        Done
      </button>
      <button
        @click="filter = 'all'"
        class="flex justify-center items-center bg-gray-700 hover:bg-black duration-200 hover:scale-105 text-white focus:outline-none focus:bg-black rounded w-24 py-2 mt-3 font-mono"
      >
        All
      </button>
    </div>
    <div
      class="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 px-20 "
    >
      <div 
        v-for="task in taskStore.tasks"
        :key="task.id"
        v-show="
          filter === 'all'
            ? true
            : filter === 'done'
            ? task.is_complete
            : !task.is_complete
        "
      >
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

const filter = ref("all");
</script>

<style></style>
