<template>
  <div >
    <nav class="navbar w-full bg-white">
      <div class="container-lg px-0 py-2">
        <div class="flex w-full items-center">
          <a class="font-mono font-bold text-lg mr-auto ml-0" href="/"
            >Remember to git</a
          >
          <button @click="signOut" class="font-bold">Sign Out</button>
        </div>
      </div>
    </nav>
  </div>
</template>

<script setup>
import { ref, computed } from "vue";
import PersonalRouter from "./PersonalRouter.vue";
import { supabase } from "../supabase";
import { useRouter } from "vue-router";
import { useUserStore } from "../stores/user";
import { storeToRefs } from "pinia";

const errorMsg = ref("");

const redirect = useRouter();

const signOut = async () => {
  try {
    await useUserStore().signOut();
    redirect.push({ path: "/auth/login" });
  } catch (error) {
    errorMsg.value = `Error: ${error.message}`;
    setTimeout(() => {
      errorMsg.value = null;
    }, 5000);
  }
};
</script>

<style></style>
