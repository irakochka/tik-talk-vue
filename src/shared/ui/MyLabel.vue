<script setup lang="ts">
type Props = {
  label?: string
}
defineProps<Props>();
</script>

<template>
  <label class="field mb20">
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
  font-weight: 700;
  font-size: 14px;
  line-height: 20px;
  color: var(--light-color);
}
</style>