<template>
  <div class="flex justify-center m-20 mb-12">
    <div
      class="w-full md:w-3/4 xl:w-1/2 shadow-md rounded-xl flex flex-col items-center bg-white py-8 px-4"
    >
      <button
        @click="show = !show"
        class="w-full rounded-xl py-4 text-3xl text-gray-800 font-bold font-mono text-center duration-200 hover:scale-105"
      >
        Add a new task
      </button>

      <div class="w-full" v-show="show === true">
        <form
          @submit.prevent="addTask"
          class="px-3 flex flex-col justify-center items-center w-full gap-1"
        >
          <div
            class="px-3 flex flex-col justify-center items-center w-full gap-3"
          >
            <input
              type="text"
              placeholder="Title"
              v-model="title"
              maxlength="50"
              class="px-4 py-2 w-full rounded border mt-4 border-gray-300 shadow-sm text-base placeholder-gray-500 placeholder-opacity-50 focus:outline-none focus:border-black"
            />

            <input
              type="text"
              name="description"
              placeholder="Description"
              v-model="description"
              maxlength="150"
              class="px-4 py-2 w-full rounded border my-2 border-gray-300 shadow-sm text-base placeholder-gray-500 placeholder-opacity-50 focus:outline-none focus:border-black"
            />
          </div>

          <div v-if="showError">{{ errorMsg }}</div>
          <div class="flex flex-row space-x-16 justify-center my-6">
            <button
              @click="pushNewTask"
              class="flex justify-center items-center bg-gray-700 duration-200 hover:scale-105 hover:bg-black text-white focus:outline-none focus:ring ring-purple-300 rounded w-24 py-2 mt-3 font-mono"
            >
              Save
            </button>
            <button
              @click="show = !show"
              class="flex justify-center items-center bg-gray-700 duration-200 hover:scale-105 hover:bg-black text-white focus:outline-none focus:ring ring-purple-300 rounded w-24 py-2 mt-3 font-mono"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";

//import { supabase } from "../supabase";

//import { storeToRefs } from "pinia";

const emit = defineEmits(["add-task"]);
const title = ref("");
const description = ref("");
const showError = ref(false);
const errorMsg = ref("");
const show = ref(false);

const pushNewTask = async () => {
  if (!title.value) {
    errorMsg.value = "You must add a task";
    showError.value = true;
    setTimeout(() => {
      errorMsg.value = null;
    }, 5000);
  }
  show.value = false;
  const newTask = {
    title: title.value,
    description: description.value,
  };
  emit("add-task", newTask);
  title.value = "";
  description.value = "";
};
</script>

<style></style>
