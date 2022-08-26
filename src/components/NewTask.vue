<template>
  <div
    class="flex justify-center m-20"
  >

      <div class="w-full md:w-2/3 lg:w-5/12 mx-3 md:mx-5 lg:mx-0 shadow-md rounded-xl flex flex-col items-center bg-white py-16 md:py-8 px-4 duration-200 hover:scale-105">
        <h1 class="text-3xl text-gray-800 mb-5 font-bold font-mono text-center">
          Add a new task
        </h1>

        <div class="w-full">
          <form @submit.prevent="addTask" class="px-3 flex flex-col justify-center items-center w-full gap-3">
           
              <div
                class="px-3 flex flex-col justify-center items-center w-full gap-3"
              >
                <input
                  type="text"
                  placeholder="Title"
                  v-model="title"
                  maxlength="50"
                  class="px-4 py-2 w-full rounded border border-gray-300 shadow-sm text-base placeholder-gray-500 placeholder-opacity-50 focus:outline-none focus:border-black "
                />

                <input
                  type="text"
                  name="description"
                  placeholder="Description"
                  v-model="description"
                  maxlength="150"
                  class="px-4 py-2 w-full rounded border border-gray-300 shadow-sm text-base placeholder-gray-500 placeholder-opacity-50 focus:outline-none focus:border-black"
                />
              </div>

              <div v-if="showError">{{ errorMsg }}</div>
              <button
                @click="pushNewTask"
                class="flex justify-center items-center bg-black duration-200 hover:scale-105 text-white focus:outline-none focus:ring ring-purple-300 rounded w-32 py-2 mt-3 font-mono"
              >
                Save
              </button>
          
          </form>
        </div>
      </div>
    </div>
 
</template>

<script setup>
import { ref } from "vue";
// import PersonalRouter from "./PersonalRouter.vue";
import { supabase } from "../supabase";
// import { useRouter } from "vue-router";
// import { useTaskStore } from "../stores/task";
import { storeToRefs } from "pinia";

// constant to save a variable that define the custom event that will be emitted to the homeView
const emit = defineEmits(["add-task"]);

// constant to save a variable that holds the value of the title input field of the new task
const title = ref("");
// constant to save a variable that holds the value of the description input field of the new task
const description = ref("");
// constant to save a variable that holds an initial false boolean value for the errorMessage container that is conditionally displayed depending if the input field is empty
const showError = ref(false);

//const reminder = ref(Boolean);

// const constant to save a variable that holds the value of the error message
const errorMsg = ref("");

// arrow function to call the form holding the task title and task description that uses a conditional to first checks if the task title is empty, if true the error message is displayed through the errorMessage container and sets a timeOut method that hides the error after some time. Else, its emmits a custom event to the home view with the task title and task description; clears the task title and task description input fields.

// const store = useTaskStore();
// const redirect = useRouter();

const pushNewTask = async () => {
  if (!title.value) {
    errorMsg.value = "You must add a task";
    showError.value = true;
    setTimeout(() => {
      errorMsg.value = null;
    }, 5000);
  }
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
