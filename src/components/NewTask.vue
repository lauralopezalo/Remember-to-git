<template>
  <div>New Task Component</div>
  <form @submit.prevent="addTask" class="">
    <div class="">
      <label for="">Task</label> 
      <input type="text" placeholder="Add a task" v-model="title" />
    </div>
    <div class="">
      <label for="">Description</label>
      <input
        type="text"
        name="day"
        placeholder="Add a description"
        v-model="description"
      />
    </div>
    <!-- <div class="form-control">
      <label for="">Set Reminder</label>
      <input type="checkbox" name="reminder" v-model="reminder" />
    </div> -->
    <input type="submit" value="Save Task" class="btn btn-block" />
  </form>
</template>

<script setup>
// constant to save a variable that define the custom event that will be emitted to the homeView

// constant to save a variable that holds the value of the title input field of the new task

// constant to save a variable that holds the value of the description input field of the new task

// constant to save a variable that holds an initial false boolean value for the errorMessage container that is conditionally displayed depending if the input field is empty

// const constant to save a variable that holds the value of the error message

// arrow function to call the form holding the task title and task description that uses a conditional to first checks if the task title is empty, if true the error message is displayed through the errorMessage container and sets a timeOut method that hides the error after some time. Else, its emmits a custom event to the home view with the task title and task description; clears the task title and task description input fields.

import { ref, computed } from "vue";
import PersonalRouter from "./PersonalRouter.vue";
import { supabase } from "../supabase";
import { useRouter } from "vue-router";
import { useTaskStore } from "../stores/task";
import { storeToRefs } from "pinia";

components: {
  useRouter, useTaskStore;
}

const title = ref("");
const description = ref("");
// const reminder = ref(Boolean);
const errorMsg = ref("");
const redirect = useRouter();

const addTask = async () => {
  try {
    await useTaskStore().addTask(title.value, description.value);
    redirect.push({ path: "/newtask" });
  } catch (error) {
    errorMsg.value = `Error: ${error.message}`;
    setTimeout(() => {
      errorMsg.value = null;
    }, 5000);
  }
};
</script>

<style></style>
