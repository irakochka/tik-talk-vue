import type {CreatePostDto, Post, UpdatePostDto} from "@/entities";
import {API_ENDPOINTS, http} from "@/shared";

export const postService = {
    async getPosts(params: Record<string, any>) {
        return await http.get<Post[]>(API_ENDPOINTS.post.list, { params });
    },
    async create(dto: CreatePostDto) {
        return await http.post<Post>(API_ENDPOINTS.post.create, dto);
    },
    async update(id: number, dto: UpdatePostDto) {
        return await http.patch<Post>(API_ENDPOINTS.post.byId(id), dto);
    },
    async delete(id: number) {
        return await http.delete<Post>(API_ENDPOINTS.post.byId(id));
    }
}