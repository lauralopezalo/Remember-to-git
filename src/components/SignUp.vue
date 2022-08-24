<template>
  <!-- <div
    class="bg-gradient-to-r from-violet-500 to-fuchsia-500  absolute top-0 right-0 bottom-0 left-0"
  > -->
  <div>
    <div class="flex justify-center items-baseline h-full pt-4 sm:p-16">
      <div
        class="w-[28rem] relative py-16 px-14 bg-white shadow-md border-none rounded-3xl"
      >
        <div class="w-full mb-6 flex justify-center items-center">
          <div>
            <h1 class="text-6xl text-gray-800 mb-5 font-bold text-center">
              git-remember
            </h1>
            <h3
              class="text-lg font-medium text-gray-900 py-3 tracking-wide text-center"
            >
              Sign up for free and say hello<br />to your new organized life.
            </h3>
          </div>
        </div>
        <div v-if="errorMsg" class="mb-6">
          <p class="text-lg font-medium text-red-500">{{errorMsg}}</p>
        </div>
        <div>
          <form @submit.prevent="signUp" class="space-y-6">
            <div class="w-full flex flex-col">
              <label
                for="email"
                class="text-sm font-medium text-gray-900 block mb-1"
                >Email</label
              >
              <input
                v-model="email"
                type="text"
                placeholder="your@email.com"
                required
                class="input basis-3/4 mb-3 bg-transparent border-0 border-b-2 rounded-none p-3 focus:outline-none border-b-slate-900 text-gray-900 placeholder:ttext-gray-400 shadow-md"
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
                type="password"
                placeholder="*******"
                required
                class="input basis-3/4 mb-6 bg-transparent border-0 border-b-2 rounded-none p-3 focus:outline-none border-b-slate-900 text-gray-900 placeholder:ttext-gray-400 shadow-md"
              />
            </div>
            <div class="w-full flex flex-col">
              <label
                for="confirmPassword"
                class="text-sm font-medium text-gray-900 block mb-1"
                >Confirm password</label
              >
              <input
                v-model="confirmPassword"
                type="password"
                placeholder="*******"
                required
                class="input basis-3/4 mb-6 bg-transparent border-0 border-b-2 rounded-none p-3 focus:outline-none border-b-slate-900 text-gray-900 placeholder:ttext-gray-400 shadow-md"
              />
            </div>
            <div>
              <button
                class="w-full text-white bg-violet-700 hover:bg-violet-800 focus:outline-none focus:ring-2 focus:ring-violet-600 focus:shadow-lg font-medium rounded-lg text-sm px-5 py-3 text-center mb-2"
                name="commit"
                type="submit"
              >
                Let's begin!
              </button>
            </div>
            <div>
              <p class="text-sm font-medium text-gray-900 block mb-1">
                Have an account?
                <PersonalRouter
                  :route="route"
                  :buttonText="buttonText"
                  class="text-violet-700 hover:underline"
                />
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import PersonalRouter from "./PersonalRouter.vue";
import { ref, computed } from "vue";
import { supabase } from "../supabase";
import { useRouter } from "vue-router";
import { useUserStore } from "../stores/user";
import { storeToRefs } from "pinia";

// Route Variables
const route = "/auth/login";
const buttonText = "Log In";

const user = useUserStore();

// Input Fields
const email = ref("");
const password = ref("");
const confirmPassword = ref("");

// Error Message
const errorMsg = ref("");

//Show hide password variables
const passwordFieldType = computed(() =>
  hidePassword.value ? "password" : "text"
);
const hidePassword = ref(true);

// Router to push user once SignedIn to the HomeView
const redirect = useRouter();

// Arrow function to Signin user to supaBase
const signUp = async () => {
  if (password.value === confirmPassword.value) {
    try {
      await user.signUp(email.value, password.value);
     // if (error) throw error;
      redirect.push({ path: "/" });
    } catch (error) {
      errorMsg.value = `Error: ${error.message}`;
      setTimeout(() => {
        errorMsg.value = null;
      }, 5000);
    }
    return;
  }
  else {
  errorMsg.value = "Passwords do not match";
  setTimeout(() => {
    errorMsg.value = null;
  }, 5000);
  }
};
</script>

<style></style>
