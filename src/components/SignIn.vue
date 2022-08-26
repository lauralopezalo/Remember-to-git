<template>
  <div class="block sm:hidden w-full bg-black h-screen text-center">
    <div class="flex flex-col justify-end h-72 px-10">
      <h1 class="text-3xl font-mono font-extrabold text-white py-10">
        Remember to git
      </h1>
      <h3 class="mb-2 text-white sm:block font-mono">
        Organize your life and your work with a single and simple tool.
      </h3>
    </div>
  </div>

  <div
    class="h-screen bg-cover flex justify-center items-center bg-gradient-to-tr from-gray-300 to-gray-100"
    style="background-image: url(https://images.unsplash.com/photo-1551225183-94acb7d595b6?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1074&q=80)"

  >
    <div
      class="w-full sm:w-10/12 max-w-3xl mx-3 md:mx-5 lg:mx-0 shadow-lg flex flex-col sm:flex-row items-center rounded-2xl z-10 overflow-hidden bg-black"
    >
      <div class="hidden w-full md:w-1/2 sm:block">
        <div class="flex flex-col justify-end h-72 px-10">
          <h1
            class="text-3xl sm:text-3xl lg:text-4xl font-mono font-extrabold text-white py-10"
          >
            Remember to git
          </h1>
          <h3 class="mb-2 text-white sm:block font-mono">
            Organize your life and your work with a single and simple tool.
          </h3>
        </div>
      </div>

      <div
        class="w-full sm:h-96 md:w-1/2 flex flex-col items-center bg-white py-20 sm:py-5 md:py-8 px-5"
      >
        <h3
          class="mt-6 mb-16 sm:mb-5 font-bold text-3xl flex items-center text-black font-mono"
        >
          LOGIN
        </h3>
        <form
          @submit.prevent="signIn"
          class="px-3 flex flex-col justify-center items-center w-full gap-10 sm:gap-3"
        >
          <div class="w-full flex flex-col">
            <label
              for="email"
              class="text-sm font-medium text-gray-900 block mb-1"
              >Email</label
            >
            <input
              v-model="email"
              name="email"
              type="text"
              placeholder="your@email.com"
              required
              class="px-4 py-2 w-full rounded border border-gray-300 shadow-sm text-base placeholder-gray-500 placeholder-opacity-50 focus:outline-none focus:border-black"
            />
          </div>
          <div class="w-full flex flex-col">
            <label
              for="password"
              class="text-sm font-medium text-gray-900 block mb-1"
              >Password</label
            >
            <input
              v-model="password"
              name="password"
              type="password"
              placeholder="*******"
              required
              class="px-4 py-2 w-full rounded border border-gray-300 shadow-sm text-base placeholder-gray-500 placeholder-opacity-50 focus:outline-none focus:border-black"
            />
          </div>
          <div class="mt-8 sm:mt-0">
            <button
              class="flex justify-center items-center bg-black duration-200 hover:scale-105 text-white focus:outline-none focus:ring ring-purple-300 rounded w-32 py-2 mt-3 font-mono"
              name="commit"
              type="submit"
            >
              Log In
            </button>
          </div>
          <div>
            <p class="text-gray-700 text-sm mt-2">
              Not registered?
              <PersonalRouter
                :route="route"
                :buttonText="buttonText"
                class="text-black font-bold hover:underline"
              />
            </p>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from "vue";
import PersonalRouter from "./PersonalRouter.vue";
//import { supabase } from "../supabase";
import { useRouter } from "vue-router";
import { useUserStore } from "../stores/user";
//import { storeToRefs } from "pinia";

const route = "/auth/sign-up";
const buttonText = "Create an account";

const user = useUserStore();

const email = ref("");
const password = ref("");

const errorMsg = ref("");

const passwordFieldType = computed(() =>
  hidePassword.value ? "password" : "text"
);
const hidePassword = ref(true);

const redirect = useRouter();

const signIn = async () => {
  try {
    await user.signIn(email.value, password.value);
    redirect.push({ path: "/" });
  } catch (error) {
    errorMsg.value = `Error: ${error.message}`;
    setTimeout(() => {
      errorMsg.value = null;
    }, 5000);
  }
};
</script>

<style></style>
