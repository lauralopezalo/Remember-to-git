<template>
  <button class="btn ml-4 border-none p-4 px-6 shadow-2xl" :class="AddClass">
    {{Value}}
    <slot></slot>
  </button>
</template>

<script>
export default {
    props:{
        Value: String,
        AddClass: String
    }
}
</script>

<style></style>