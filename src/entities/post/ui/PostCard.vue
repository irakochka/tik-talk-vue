<script setup lang="ts">

import type {Post} from "../model/types.ts";
import {AvatarCircle, SendInput, SvgIcon, formatPostTime, usePopover, useModal, ConfirmModal} from "@/shared";
import {type Profile} from "@/entities";
import {computed, ref} from "vue";
import {PostActionsPopover} from "@/features";

const props = defineProps<{ post: Post, profile: Profile, isMyProfile: boolean }>();

const modal = useModal();
const popover = usePopover();

const menuBtnRef = ref<HTMLButtonElement | null>(null);
const isActive = computed(() => {
  return popover.state.value.anchorEl === menuBtnRef.value;
});

const emit = defineEmits<{
  (e: "delete", postId: number): void;
}>();

function togglePostMenu() {
  const anchor = menuBtnRef.value;
  if (!anchor) return;

  if (isActive.value) {
    popover.hide();
    return;
  }

  popover.show(PostActionsPopover, anchor, {
    onEdit: () => popover.hide(),
    onDelete: () => {
      popover.hide();

      modal.show(ConfirmModal, {
        title: "Удаление поста",
        message: "Вы уверены, что хотите удалить пост? Это действие нельзя отменить.",
        confirmText: "Удалить",
        cancelText: "Отмена",
        onConfirm: async () => {
          emit("delete", props.post.id);
          modal.hide();
        },
        onClose: () => modal.hide(),
      });
    },
    onClose: () => popover.hide(),
  });
}

function onCreateComment(content: string) {
}
</script>

<template>
  <div class="post">
    <div class="post__avatar">
      <AvatarCircle class="size32" :avatar-url="post.author.avatarUrl"/>
    </div>
    <div class="post__main">
      <header class="post__header mb12">
        <div class="post__author">
          {{ post.author.firstName }} {{ post.author.lastName }}
        </div>

        <time class="post__time" :datetime="post.createdAt">
          {{ formatPostTime(post.createdAt, { relativeDaysLimit: 7 }) }}
        </time>
        <button ref="menuBtnRef" class="post__menu" :class="{ 'post__menu--active': isActive }" type="button" aria-label="Меню поста" @click="togglePostMenu">
          <SvgIcon name="more" class="icon16"/>
        </button>
      </header>

      <div class="post__content medium-text mb8">
        {{ post.content }}
      </div>

      <footer class="post__footer mb8">
        <button class="post__meta-btn" type="button">
          <SvgIcon class="post__meta-icon icon16" name="comments"/>
          <span class="post__meta-count">{{ post.comments.length }}</span>
        </button>

        <button class="post__meta-btn" type="button">
          <SvgIcon class="post__meta-icon icon16" name="like"/>
          <span class="post__meta-count">{{ post.likes }}</span>
        </button>
      </footer>

      <!-- комментарии -->
      <section class="post__comments"></section>

      <div v-if="isMyProfile" class="post__reply">
        <SendInput :profile="profile" :is-comment-input="true" @create="onCreateComment"/>
      </div>
    </div>
  </div>
</template>

<style scoped>
.post {
  padding: 20px;
  display: grid;
  grid-template-columns: 32px 1fr;
  gap: 16px;
  height: max-content;
  color: var(--light-color);
  background-color: var(--dark-color);
  border: 1px solid var(--light-color);
}

.post__header {
  padding-right: 52px;
  position: relative;
  display: flex;
  align-items: center;
  gap: 8px;
}

.post__author {
  font-weight: 700;
  font-size: 14px;
  line-height: 21px;
  white-space: nowrap;
  color: var(--light-color);
}

.post__time {
  font-weight: 700;
  font-size: 14px;
  line-height: 21px;
  white-space: nowrap;
  color: var(--light-color-transparrent);
}

.post__menu {
  position: absolute;
  top: 0;
  right: 0;
  width: 44px;
  height: 44px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: transparent;
  color: var(--light-color);
  cursor: pointer;
}

.post__menu:hover {
  border: 1px solid var(--light-color);
}

.post__menu--active {
  border: 1px solid var(--light-color);
}

.post__footer {
  display: flex;
  gap: 20px;
}

.post__meta-btn {
  padding: 8px 0;
  display: flex;
  align-items: center;
  gap: 6px;
  background: transparent;
  color: var(--light-color);
}
</style>