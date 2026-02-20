<script setup lang="ts">
import {ref} from "vue";
import {MyIcon} from "@/shared";

const stack = defineModel<string[]>({ default: () => [] });
const innerInput = ref("");

function commit() {
  const value = innerInput.value.trim();
  if (!value) return;

  // запрещаем дубликаты
  if (stack.value.includes(value)) {
    innerInput.value = "";
    return;
  }

  stack.value = [...stack.value, value];
  innerInput.value = "";
}

function onKeydown(e: KeyboardEvent) {
  if (e.key === "Enter" || e.key === " ") {
    e.preventDefault();
    commit();
  }
}

function onDelete(i: number) {
  stack.value = stack.value.filter((_, idx) => idx !== i);
}
</script>

<template>
  <div class="stack-input">
    <div class="stack-input__wrapper">
      <div v-for="(item, i) of stack" :key="`${item}::${i}`" class="stack-input__item stack-item">
        <button class="stack-input__btn" type="button" @click.stop.prevent="onDelete(i)">
          <MyIcon name="cross" class="stack-input__icon icon10"/>
        </button>
        <span>{{ item }}</span>
      </div>
      <input
          class="stack-input__ghost-input"
          type="text"
          :placeholder="stack.length > 0 ? '' : 'Укажите ваши навыки'"
          v-model="innerInput"
          v-bind="$attrs"
          @keydown="onKeydown"
      />
    </div>

    <slot/>
  </div>
</template>

<style scoped>
.stack-input {
  position: relative;
  padding: 12px 0;
  width: 100%;
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 6px;
  border-bottom: 1px solid var(--light-color);
  background-color: var(--dark-color);
}

.stack-input:focus-within {
  border-bottom-color: var(--primary-color, var(--light-color));
}

.stack-input__wrapper {
  display: flex;
  flex-basis: 100%;
  flex-grow: 1;
  flex-wrap: wrap;
  gap: 8px 12px;
}

.stack-input__item {
  display: flex;
  align-items: center;
  gap: 4px;
}

.stack-input__btn {
  border: none;
  background: transparent;
  cursor: pointer;
}

.stack-input__icon {
  color: var(--light-color);
}

.stack-input__ghost-input {
  max-width: 100%;
  width: 0;
  flex-grow: 1;
  font-weight: 400;
  font-size: 14px;
  line-height: 14px;
  color: var(--light-color);
  border: none;
  background: none;
  outline: none;
}

.stack-input:disabled {
  cursor: not-allowed;
  color: var(--light-color-transparrent);
  border-color: var(--light-color-transparrent);
}

.stack-input::placeholder {
  color: rgba(255, 255, 255, 0.55);
}
</style>