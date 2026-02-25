<script setup lang="ts">


import {BaseModal} from "@/shared";

withDefaults(
    defineProps<{
      title: string;
      message?: string;
      confirmText?: string;
      cancelText?: string;
      loading?: boolean;
    }>(),
    {
      confirmText: "Удалить",
      cancelText: "Отмена",
      loading: false,
    }
);

const emit = defineEmits<{
  (e: "confirm"): void;
  (e: "close"): void;
}>();

function onConfirmClick() {
  emit("confirm");
}
</script>

<template>
  <BaseModal :model-value="true" @update:modelValue="emit('close')">
    <div class="confirm-modal">
      <h4 class="confirm-modal__title mb8">{{ title }}</h4>
      <p v-if="message" class="confirm-modal__message mb32">{{ message }}</p>

      <div class="confirm-modal__actions">
        <button class="btn btn--secondary" type="button" @click="emit('close')">
          {{ cancelText }}
        </button>

        <button class="btn btn--primary" type="button" @click="onConfirmClick">
          {{ confirmText }}
        </button>
      </div>
    </div>
  </BaseModal>
</template>

<style scoped>
.confirm-modal {
  max-width: 350px;
  min-width: 300px;
}
.confirm-modal__title {
  font-size: 20px;
}

.confirm-modal__message {
  font-size: 14px;
}

.confirm-modal__actions {
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: 10px;
}
</style>