<script setup lang="ts">
import {SidebarWidget} from "@/widgets";
</script>

<template>
  <div class="layout">
    <SidebarWidget/>
    <section class="main">
      <RouterView/>
    </section>
  </div>
</template>

<style scoped>
  .layout {
    display: grid;
    grid-template-columns: 300px 1fr;
  }

  .main {
    padding: 24px;
  }
</style>