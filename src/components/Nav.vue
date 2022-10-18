<template>
  <div >
    <nav class="rounded-b-lg w-full bg-white">
      <div class="container-lg px-5 pt-3 pb-4">
        <div class="flex w-full items-center">
          <a class="font-mono font-bold text-lg mr-auto ml-0" href="/"
            >Remember to git</a
          >
          <button @click="signOut" class="font-bold"><i class="fa-solid fa-arrow-right-from-bracket text-xl duration-200 hover:scale-125"></i></button>
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
