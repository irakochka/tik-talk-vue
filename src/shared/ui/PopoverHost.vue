<script setup lang="ts">
import { computed, nextTick, onMounted, onUnmounted, ref, watch } from "vue";
import { usePopover } from "@/shared/lib/popover/usePopover";

const popover = usePopover();
const root = ref<HTMLElement | null>(null);

const st = computed(() => popover.state.value);

function calcPos() {
  const anchor = st.value.anchorEl;
  const el = root.value;
  if (!anchor || !el) return { top: 0, left: 0 };

  const r = anchor.getBoundingClientRect();
  const offset = st.value.offset ?? 8;

  const top = r.bottom + offset;
  const left = Math.max(8, r.right - el.offsetWidth);
  return { top, left };
}

const pos = ref({ top: 0, left: 0 });

const style = computed(() => ({
  position: "fixed",
  top: `${pos.value.top}px`,
  left: `${pos.value.left}px`,
  zIndex: 1000,
}));

async function update() {
  await nextTick();
  pos.value = calcPos();
}

function onDocClick(e: MouseEvent) {
  const el = root.value;
  const anchor = st.value.anchorEl;
  const target = e.target as Node;

  if (!el || !anchor) return;

  if (el.contains(target) || anchor.contains(target)) return;

  popover.hide();
}

function onKeydown(e: KeyboardEvent) {
  if (e.key === "Escape") popover.hide();
}

watch(
    () => [st.value.component, st.value.anchorEl],
    async () => {
      if (st.value.component && st.value.anchorEl) {
        await update();
      }
    }
);

onMounted(() => {
  document.addEventListener("click", onDocClick);
  window.addEventListener("resize", update);
  window.addEventListener("scroll", update, true);
  window.addEventListener("keydown", onKeydown);
});

onUnmounted(() => {
  document.removeEventListener("click", onDocClick);
  window.removeEventListener("resize", update);
  window.removeEventListener("scroll", update, true);
  window.removeEventListener("keydown", onKeydown);
});
</script>

<template>
  <Teleport to="body">
    <div v-if="st.component && st.anchorEl"
        ref="root"
        class="popover"
        :style="style"
    >
      <component
          :is="st.component"
          v-bind="st.props"
          @close="popover.hide"
      />
    </div>
  </Teleport>
</template>

<style scoped>
.popover {
  min-width: 180px;
  background: var(--dark-color);
  border: 1px solid var(--light-color);
  padding: 8px;
}
</style>