import {defineStore} from "pinia";
import {postService} from "@/entities/post/api/post.service.ts";
import {ref} from "vue";
import type {CreatePostDto, Post} from "@/entities";

export const usePostStore = defineStore('post', () => {
    const posts = ref<Post[]>([]);

    async function loadPosts(params: Record<string, any>) {
        const { data } = await postService.getPosts(params);
        posts.value = data;
        return data;
    }

    async function createPost(dto: CreatePostDto) {
        const { data } = await postService.create(dto);
        posts.value = posts.value ?? [];
        posts.value.unshift(data);

        return data;
    }

    async function deletePost(id: number) {
        await postService.delete(id);
        posts.value = posts.value.filter(p => p.id !== id);
    }

    return { posts, loadPosts, createPost, deletePost };
});