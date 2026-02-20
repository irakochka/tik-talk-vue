<script setup lang="ts">
type Props = {
  label?: string
  forId?: string
}
defineProps<Props>();
</script>

<template>
  <label class="field mb20" :for="forId">
    <span v-if="label" class="field__label">{{ label }}</span>
    <slot />
  </label>
</template>

<style scoped>
.field {
  display: grid;
  gap: 8px;
}

.field__label {
  font-size: 12px;
  line-height: 16px;
  color: var(--light-color-transparrent);
}
</style>