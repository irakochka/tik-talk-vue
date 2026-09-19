<script setup lang="ts">
import {computed} from "vue";
import {toPublicUrl} from "@/shared";

const props = defineProps<{ name: string }>();
const href = computed(() => `${toPublicUrl('assets/svg/sprite.svg')}#${props.name}`);
</script>

<template>
  <svg class="common-icon" aria-hidden="true">
    <use :href="href"></use>
  </svg>
</template>

<style scoped>

</style>
