<script setup lang="ts">
import {AvatarCircle, formatPostTime} from "@/shared";
import type {Profile} from "@/entities";
import type {PostComment} from "@/entities/comment";

defineProps<{ comment: PostComment, profile: Profile, isMyProfile: boolean }>();
</script>

<template>
  <div class="comment">
    <div class="comment__avatar">
      <AvatarCircle class="size32" :avatar-url="comment.author.avatarUrl"/>
    </div>
    <div class="comment__main">
      <header class="comment__header mb12">
        <div class="comment__author">
          {{ comment.author.firstName }} {{ comment.author.lastName }}
        </div>

        <time class="comment__time" :datetime="comment.createdAt">
          {{ formatPostTime(comment.createdAt, { relativeDaysLimit: 7 }) }}
        </time>
      </header>

      <div class="comment__content medium-text mb8">
        {{ comment.text }}
      </div>
    </div>
  </div>
</template>

<style scoped>
.comment {
  display: grid;
  grid-template-columns: 32px 1fr;
  gap: 16px;
  height: max-content;
  color: var(--light-color);
}

.comment__header {
  padding-right: 52px;
  position: relative;
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 8px;
}

.comment__author {
  font-weight: 700;
  font-size: 12px;
  line-height: 16px;
  white-space: nowrap;
  color: var(--light-color-transparrent);
}

.comment__time {
  font-weight: 700;
  font-size: 12px;
  line-height: 16px;
  white-space: nowrap;
  color: var(--light-color-transparrent);
}

.comment__content {
  max-width: calc(100% - 52px);
}
</style>