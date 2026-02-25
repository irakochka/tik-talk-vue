<script setup lang="ts">
import {PostCard, type Profile, usePostStore} from "@/entities";
import {SendInput} from "@/shared";
import {onMounted, onUnmounted, ref, watch} from "vue";
import {useToast} from "vue-toastification";
import {storeToRefs} from "pinia";

const props = defineProps<{ profile: Profile, isMyProfile: boolean, profileId: number }>();

const toast = useToast();
const postStore = usePostStore();
const { posts } = storeToRefs(postStore);

const feedWrapperRef = ref<HTMLDivElement | null>(null);

let timeoutId: number | undefined;

function resizeFeed() {
  const el = feedWrapperRef.value;
  if (!el) return;

  const {top} = el.getBoundingClientRect();
  const height = window.innerHeight - top - 24;

  el.style.height = `${height}px`;
}

function onResize() {
  window.clearTimeout(timeoutId);
  timeoutId = window.setTimeout(() => {
    resizeFeed();
  }, 500);
}

watch(
    () => props.isMyProfile ? props.profile.id : props.profileId,
    async (id) => {
      posts.value = [];
      await postStore.loadPosts({ user_id: id });

      resizeFeed();
      window.addEventListener("resize", onResize);
    },
    { immediate: true }
);

onMounted(async () => {
  resizeFeed();
  window.addEventListener("resize", onResize);
});

onUnmounted(() => {
  window.removeEventListener("resize", onResize);
  window.clearTimeout(timeoutId);
});

async function onCreatePost(content: string) {
  try {
    await postStore.createPost({title: 'Новый пост', content, authorId: props.profile.id});

    toast.success('Новый пост создан!');
  } catch (err: unknown) {
    toast.error('Ошибка сервера. Попробуйте позже.');
  }
}

async function onDeletePost(postId: number) {
  try {
    await postStore.deletePost(postId);

    toast.success('Пост был удален!');
  } catch (err: unknown) {
    toast.error('Ошибка сервера. Попробуйте позже.');
  }
}
</script>

<template>
  <div class="post-feed">
    <div v-if="isMyProfile" class="post-feed__input mb16">
      <SendInput :profile="profile" @create="onCreatePost"/>
    </div>
    <div class="post-feed__posts" ref="feedWrapperRef">
      <div v-if="posts.length" class="post-feed__posts--wrapper">
        <PostCard v-if="posts.length" v-for="post in posts" :key="post.id" :post="post" :profile="profile"
                  :isMyProfile="isMyProfile" @delete="onDeletePost"/>
      </div>
      <p v-else class="post-feed__text medium-text" :class="isMyProfile ? '' : 'post-feed__text--dashed-border'">
        {{ isMyProfile ? ' Постов нет. Напишите свой первый пост!' : 'Пользователь еще ничего не написал!' }}
      </p>
    </div>
  </div>
</template>

<style scoped>
.post-feed__text {
  padding: 4px 20px 20px 20px;
  color: var(--light-color-transparrent);
}

.post-feed__text--dashed-border {
  padding: 20px;
  border-top: 1px dashed var(--light-color);
}

.post-feed__posts {
  overflow-y: auto;
}

.post-feed__posts--wrapper {
  display: flex;
  flex-direction: column;
  gap: 16px;
}
</style>