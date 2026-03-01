import {defineStore} from "pinia";
import {postService} from "@/entities/post/api/post.service.ts";
import {ref} from "vue";
import type {CreatePostDto, Post, UpdatePostDto} from "@/entities";
import type {PostComment} from "@/entities/comment";

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

    async function updatePost(id: number, dto: UpdatePostDto) {
        const { data } = await postService.update(id, dto);
        posts.value = (posts.value ?? []).map(p =>
            p.id === id ? { ...p, ...data } : p
        );

        return data;
    }

    async function deletePost(id: number) {
        await postService.delete(id);
        posts.value = posts.value.filter(p => p.id !== id);
    }

    function addCommentToPost(postId: number, comment: PostComment) {
        const post = posts.value?.find(p => p.id === postId);
        if (!post) return;

        post.comments = [comment, ...(post.comments ?? [])];
    }

    return { posts, loadPosts, createPost, updatePost, deletePost, addCommentToPost };
});