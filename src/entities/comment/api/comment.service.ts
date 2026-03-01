import {API_ENDPOINTS, http} from "@/shared";
import type {CreateCommentDto, PostComment} from "@/entities/comment";

export const commentService = {
    async create(dto: CreateCommentDto) {
        return await http.post<PostComment>(API_ENDPOINTS.comment.create, dto);
    }
}