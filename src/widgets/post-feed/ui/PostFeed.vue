<script setup lang="ts">
import {type Post, PostCard, type Profile} from "@/entities";
import {SendInput} from "@/shared";

defineProps<{ profile: Profile, posts: Post[] }>();
</script>

<template>
  <div class="post-feed">
    <div class="post-feed__input mb16">
      <SendInput :profile="profile"/>
    </div>
    <div class="post-feed__posts">
      <PostCard v-if="posts.length > 0" v-for="post in posts" :key="post.id" :post="post"/>
      <p v-else class="post-feed__text medium-text">Постов нет. Напишите свой первый пост!</p>
    </div>
  </div>
</template>

<style scoped>
.post-feed__text {
  text-align: center;
}
</style>