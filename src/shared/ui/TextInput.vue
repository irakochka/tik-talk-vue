<script setup lang="ts">

import {computed, useSlots} from "vue";

const data = defineModel<string>();

const slots = useSlots();
const hasIcon = computed(() => !!slots.default);
</script>

<template>
  <div class="field__control" :class="{ 'field__control--with-action': hasIcon }">
    <input class="field__input" v-model="data" v-bind="$attrs"/>

    <slot></slot>
  </div>
</template>

<style scoped>
.field__input {
  width: 100%;
  padding: 12px 0;
  border: none;
  border-bottom: 1px solid var(--light-color);
  background-color: var(--dark-color);
  color: var(--light-color);
  outline: none;
}

.field__input:disabled {
  cursor: not-allowed;
  color: var(--light-color-transparrent);
  border-color: var(--light-color-transparrent);
}

.field__input::placeholder {
  color: rgba(255, 255, 255, 0.55);
}

.field__input:focus-visible {
  border-bottom: 1px solid var(--primary-color);
}

.field__control {
  position: relative;
}

.field__control--with-action .field__input {
  padding-right: 44px;
}
</style>