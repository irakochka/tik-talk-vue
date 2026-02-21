<script setup lang="ts">
import {AuthForm} from "@/features";
</script>

<template>
  <div class="auth">
    <AuthForm/>

    <img class="auth-illustration" src="/assets/svg/logo-big.svg" alt=""/>
  </div>
</template>

<style scoped>
.auth {
  max-width: 1112px;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin: 0 auto;
}

.auth-illustration {
  display: block;
}
</style>