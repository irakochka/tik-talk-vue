<script setup lang="ts">
import {computed} from "vue";
import {toAssetUrl} from "@/shared";

const props = defineProps<{ avatarUrl?: string | null }>();

const avatarSrc = computed(() => toAssetUrl(props.avatarUrl));
</script>

<template>
  <div class="avatar-circle">
    <img v-if="avatarSrc" :src="avatarSrc" alt="User avatar">
    <img v-else src="/assets/images/avatar-placeholder.png" alt="User avatar">
  </div>
</template>

<style scoped>
.avatar-circle img {
  max-width: 100%;
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 50%;
}
</style>