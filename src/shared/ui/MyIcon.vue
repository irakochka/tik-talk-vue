<script setup lang="ts">
defineProps<{ name: string }>();
</script>

<template>
  <svg class="icon" aria-hidden="true">
    <use :href="`/assets/svg/sprite.svg#${name}`"></use>
  </svg>
</template>

<style scoped>

</style>