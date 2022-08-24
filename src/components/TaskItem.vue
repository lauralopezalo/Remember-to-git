<template>
  <div v-if="editForm == false" class="">
    <div
      v-if="is_complete == false"
      class="bg-white shadow-md rounded-lg p-10 pb-0 grid grid-rows-3 gap-4 min-h-fit sm:h-96 md:h-80 lg:h-96"
    >
      <div
        class="text-xl text-gray-800 font-bold min-h-fit sm:h-24 md:h-24 lg:h-20 bg-blue-300 m-0" 
      >
        {{ task.title }}
      </div>
      <div
        class="text-base text-gray-800 font-normal min-h-fit sm:h-40 md:h-30 lg:h-40 bg-blue-300"
      >
        {{ task.description }}
      </div>
      <div class="flex flex-row justify-evenly items-center h-10 bg-blue-300">
        <i
          @click="toggleTask(task.id)"
          class="fa-regular fa-circle-check text-green-500 cursor-pointer sm:text-xl md:text-2xl lg:text-2xl "
        ></i>

        <i
          @click="editFormValue()"
          class="fa-regular fa-pen-to-square text-blue-500 cursor-pointer sm:text-xl md:text-2xl lg:text-2xl"
        ></i>

        <i
          @click="deleteTask(task.id)"
          class="fa-regular fa-trash-can text-red-500 cursor-pointer sm:text-xl md:text-2xl lg:text-2xl"
        ></i>
      </div>
    </div>
    <div v-else class="bg-gray-100 rounded-lg p-12 text-gray-500">
      <div class="text-xl text-gray-500 font-bold mb-2 line-through">
        {{ task.title }}
      </div>
      <div class="text-base text-gray-400 font-normal line-through">
        {{ task.description }}
      </div>
      <div class="flex flex-row justify-evenly items-center h-10">
        <i
          @click="toggleTask(task.id)"
          class="fa-regular fa-circle-check text-green-500 cursor-pointer sm:text-xl md:text-2xl lg:text-3xl"
        ></i>
        <i
          @click="editFormValue()"
          class="fa-regular fa-pen-to-square text-blue-500 cursor-pointer sm:text-xl md:text-2xl lg:text-3xl"
        ></i>
        <i
          @click="deleteTask(task.id)"
          class="fa-regular fa-trash-can text-red-500 mr-4 cursor-pointer sm:text-xl md:text-2xl lg:text-3xl"
        ></i>
      </div>
    </div>
  </div>
  <div v-if="editForm == true">
    <div class="w-full flex flex-col">
      <input
        type="text"
        placeholder="Add a task"
        v-model="newTitle"
        maxlength="50"
        class="input basis-3/4 mb-6 bg-transparent border-0 border-b-2 rounded-none p-3 focus:outline-none border-b-slate-900 text-gray-900 placeholder:ttext-gray-400 shadow-md"
      />

      <input
        type="text"
        name="day"
        placeholder="Add a description"
        v-model="newDescription"
        maxlength="150"
        class="input basis-3/4 mb-6 bg-transparent border-0 border-b-2 rounded-none p-3 focus:outline-none border-b-slate-900 text-gray-900 placeholder:ttext-gray-400 shadow-md"
      />
      <i
        @click="editTask(task.id)"
        class="fa-solid fa-pen-to-square text-blue-500 cursor-pointer"
      ></i>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useTaskStore } from "../stores/task";

const taskStore = useTaskStore();
const props = defineProps({ task: Object });

const editForm = ref(false);

const newTitle = ref("");
const newDescription = ref("");

const is_complete = ref("");

const toggleTask = async (id) => {
  is_complete.value = !is_complete.value;
  await taskStore.toggleTask(is_complete.value, id);
  useTaskStore().fetchTasks();
};

const deleteTask = async (id) => {
  await taskStore.deleteTask(id);
  taskStore.fetchTasks();
};

const editTask = async (id) => {
  await taskStore.editTask(newTitle.value, newDescription.value, id);
  useTaskStore().fetchTasks();
  editFormValue();
};

const editFormValue = () => {
  editForm.value = !editForm.value;
};
</script>

<style></style>

<!-- 
**Hints**
1. ref() or reactive() can be used here to store the following, think if you want to store them either individually or like an object, up to you.
2. Data properties need here are the following: a boolean to store a false**Important variable, a string to store an error, a string to store the value of the task that the user can edit, an initial false boolean to hide the inputFIeld used to edit the new task detail or details[this is in reference of the task title and the task description].
3. Store the custom emit events that will be used to call the functions of the homeView for editing, deleting and toggling the status[completed, not complted] of the taskItem.
4. Function to handle the error with the data properties used to control the error and the the boolean controlling the boolean empty variable.
5. Function to handle the edit dialogue where the inputField is displayed and the string used to store the value of the inputField will be used here to save the value as a prop on this function.
6. Function to emmit a custom event emit() that takes 2 parameters a name for the custom event and the value that will be send via the prop to the parent component. This function can control the toggle completion of the task on the homeview.
7. Function to edit the task information that you decided that the user can edit. This function's body takes in a conditional that first checks if the value of the task [either title and description or just title] is empty which if true it runs the function used to handle the error on hint4. Else, the conditional sets the first mentioned boolean data property on hint2 back to its inital boolean value to hide the error message and repeat the same for the data property mentioned 4th on hint2; a constant that stores an object that holds the oldValue from the prop item and the value of the task coming from the data property mentioned 3rd on hint2; a custom event emit() that takes 2 parameters a name for the custom event and the value from the object used on this part of the conditional and lastly this part of the conditional sets the value of input field to an empty string to clear it from the ui. 
8. Function to emmit a custom event emit() that takes 2 parameters a name for the custom event and the value that will be send via the prop to the parent component. This function can control the removal of  the task on the homeview.
-->
