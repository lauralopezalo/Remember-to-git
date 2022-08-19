<template>
   <div>
    <h1>Log In to TaskApp</h1>

    <h2>Start Organizing your tasks todays!</h2>
  </div>
  <form>
      <div class="box-container">
        <div class="form-fields">
          <label for="email">Email</label>
          <input
            id="email"
            name="email"
            type="text"
            placeholder="your@email.com"
          />
        </div>
        <div class="form-fields">
          <label for="password">Password</label>
          <input
            id="password"
            name="password"
            type="password"
            placeholder="*******"
           
          />
        </div>
        <div class="form-fields">
          <label for="repeat-password">Repeat password</label>
          <input
            id="repeat-password"
            name="repeat-password"
            type="password"
            placeholder="*******"
          />
        </div>
        <div class="form-fields">
          <button class="signIn" name="commit" type="submit">Sign In</button>
        </div>
        
      </div>
    </form>
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

// Input Fields
const email = ref("");
const password = ref("");

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
const SignUp = async () => {
  try {
    // calls the user store and send the users info to backend to logIn
    await useUserStore().signUp(email.value, password.value);
    // redirects user to the homeView
    redirect.push({ path: "/" });
  } catch (error) {
    // displays error message
    errorMsg.value = `Error: ${error.message}`;
    // hides error message
    setTimeout(() => {
      errorMsg.value = null;
    }, 5000);
  }
};
</script>

<style></style>
