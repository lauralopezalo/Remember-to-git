<template>
  <div>
    <h1>Log In to TaskApp</h1>

    <h2>Start Organizing your tasks todays!</h2>
  </div>

  <div class="main-container">
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
            type="text"
            placeholder="*******"
          />
        </div>
        <div class="form-fields">
          <button class="signIn" name="commit" type="submit">Sign In</button>
        </div>
        <p>
          Don't have an account?
          <PersonalRouter :route="route" :buttonText="buttonText" />
        </p>
      </div>
    </form>
  </div>
</template>

<script setup>
import { ref, computed } from "vue";
import PersonalRouter from "./PersonalRouter.vue";
import { supabase } from "../supabase";
import { useRouter } from "vue-router";
import { useUserStore } from "../stores/user";
import { storeToRefs } from "pinia";

// Route Variables
const route = "/auth/sign-up";
const buttonText = "Sign Up";

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
const signIn = async () => {
  try {
    // calls the user store and send the users info to backend to logIn
    await useUserStore().signIn(email.value, password.value);
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

<style>
.wu-text {
  color: black;
}

.form {
  display: flex;
  flex-direction: column;
  margin: 1rem 0;
}
.input {
  color: black;
  margin-bottom: 1rem;
}
.button {
  background-color: #4caf50; /* Green */
  border: none;
  color: white;
  padding: 10px 10px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 16px;
}
</style>
