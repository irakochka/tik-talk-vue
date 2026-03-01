import {defineStore} from "pinia";
import type {CreateCommentDto} from "@/entities/comment";
import {commentService} from "@/entities/comment/api/comment.service.ts";

export const useCommentStore = defineStore('comment', () => {

    async function createComment(dto: CreateCommentDto) {
        const { data } = await commentService.create(dto);

        return data;
    }

    return { createComment };
});