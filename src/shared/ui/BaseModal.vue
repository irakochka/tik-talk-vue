<script setup lang="ts">
import {onMounted, onUnmounted, watch} from "vue";

const props = withDefaults(
    defineProps<{
      modelValue: boolean;
      closeOnOverlay?: boolean;
      closeOnEsc?: boolean;
      lockScroll?: boolean;
    }>(),
    {
      closeOnOverlay: true,
      closeOnEsc: true,
      lockScroll: true,
    }
);

const emit = defineEmits<{
  (e: "update:modelValue", value: boolean): void;
  (e: "close"): void;
}>();

function close() {
  emit("update:modelValue", false);
  emit("close");
}

function onOverlayClick() {
  if (!props.closeOnOverlay) return;
  close();
}

function onKeydown(e: KeyboardEvent) {
  if (!props.closeOnEsc) return;
  if (e.key === "Escape") close();
}

// блокировка скролла фона (опционально, но обычно нужно)
watch(
    () => props.modelValue,
    (open) => {
      if (!props.lockScroll) return;
      document.body.style.overflow = open ? "hidden" : "";
    },
    {immediate: true}
);

onMounted(() => window.addEventListener("keydown", onKeydown));
onUnmounted(() => {
  window.removeEventListener("keydown", onKeydown);
  if (props.lockScroll) document.body.style.overflow = "";
});
</script>

<template>
  <Teleport to="body">
    <Transition name="modal-fade">
      <div
          v-if="modelValue"
          class="modal"
          role="dialog"
          aria-modal="true"
          @click="onOverlayClick"
      >
        <div class="modal__content" @click.stop>
          <slot/>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<style scoped>
.modal {
  position: fixed;
  inset: 0;
  display: flex;
  padding: 16px;
  background: rgba(0, 0, 0, 0.5);
}

.modal__content {
  margin: auto;
  min-width: 300px;
  min-height: 50px;
  padding: 20px;
  background: var(--dark-color);
  border: 1px solid var(--light-color);
}

.modal-fade-enter-active,
.modal-fade-leave-active {
  transition: opacity 0.15s ease;
}
.modal-fade-enter-from,
.modal-fade-leave-to {
  opacity: 0;
}
</style>