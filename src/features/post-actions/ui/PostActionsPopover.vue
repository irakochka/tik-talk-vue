<script setup lang="ts">
import {SvgIcon} from "@/shared";

defineEmits<{
  (e: "edit"): void;
  (e: "delete"): void;
  (e: "close"): void;
}>();
</script>

<template>
  <ul class="post-actions">
    <li class="post-actions__item">
      <button class="post-actions__btn" type="button" @click="$emit('edit')">
        <SvgIcon class="icon14" name="edit-pen" />
        <span>Редактировать</span>
      </button>
    </li>

    <li class="post-actions__item">
      <button class="post-actions__btn post-actions__btn--danger" type="button" @click="$emit('delete')">
        <SvgIcon class="icon14" name="trash" />
        <span>Удалить</span>
      </button>
    </li>
  </ul>
</template>

<style scoped>
.post-actions {
  display: flex;
  flex-direction: column;
}
.post-actions__btn {
  padding: 8px 4px;
  width: 100%;
  display: flex;
  gap: 6px;
  font-size: 12px;
  color: var(--light-color);
  background-color: transparent;
  cursor: pointer;
}
.post-actions__btn:hover {
  color: var(--dark-color);
  background-color: var(--primary-color);
}
</style>