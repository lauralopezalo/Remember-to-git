<template>
  <div>Temporary navbar to work</div>
   <nav>
    <router-link to="/">Home</router-link> |
    <router-link to="/auth/login">Sign In</router-link> |
    <router-link to="/auth/sign-up">Sign Up</router-link> |
    <router-link to="/newtask">New task</router-link> |
    <router-link to="/taskitem">Task Item</router-link>
  </nav>
</template>

<script setup>
//constant to save a variable that will hold the use router method

// constant to save a variable that will get the user from store with a computed function imported from vue

// constant that calls user email from the useUSerStore

// constant that saves the user email and cleans out the @client from the user

// async function that calls the signOut method from the useUserStore and pushes the user back to the Auth view.
</script>

<style></style>
