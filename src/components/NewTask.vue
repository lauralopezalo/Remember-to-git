<template>
  <div>New Task Component</div>
  <!-- div que justifica en el centro todo el contenido -->
  <div class="flex justify-center items-baseline h-full pt-4 sm:p-16">
    <!-- 2 div que organiza en vertical todos los componentes -->
    <div
      class="w-[30rem] h-full m-4 relative py-16 px-14 bg-white shadow-md border-none rounded-3xl"
    >
      <div class="w-full mb-12">
        <!-- Título To Do List e icono -->
        <div>
          <h1 class="text-3xl text-gray-800 mb-5 font-bold text-center">
            Add a new task
          </h1>
        </div>

        <div class="w-full flex flex-row">
          <form @submit.prevent="addTask" class="space-y-6">
            <div >
              <div class="w-full flex flex-col">
                <input
                  class="input basis-3/4 mb-6 bg-transparent border-0 border-b-2 rounded-none p-3 focus:outline-none border-b-slate-900 text-gray-900 placeholder:ttext-gray-400 shadow-md"
                  type="text"
                  placeholder="Add a task"
                  v-model="title"
                />

                <input
                  type="text"
                  name="day"
                  placeholder="Add a description"
                  v-model="description"
                  class="input basis-3/4 mb-6 bg-transparent border-0 border-b-2 rounded-none p-3 focus:outline-none border-b-slate-900 text-gray-900 placeholder:ttext-gray-400 shadow-md"
                />
              </div>

              <div class="form-control">
                <label for="">Set Reminder</label>
                <input type="checkbox" name="reminder" v-model="reminder" />
              </div>
              <div v-if="showError">{{ errorMsg }}</div>
              <button
                @click="pushNewTask"
                class="w-full text-white bg-violet-700 hover:bg-violet-800 focus:outline-none focus:ring-2 focus:ring-violet-600 focus:shadow-lg font-medium rounded-lg text-sm px-5 py-3 text-center mb-2"
              >
                Save
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from "vue";
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
