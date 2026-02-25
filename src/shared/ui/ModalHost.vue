<script setup lang="ts">

import {useModal} from "@/shared";

const modal = useModal();
</script>

<template>
  <component
      v-if="modal.state.value.component"
      :is="modal.state.value.component"
      v-bind="modal.state.value.props"
      @close="modal.hide"
  />
</template>

<style scoped></style>