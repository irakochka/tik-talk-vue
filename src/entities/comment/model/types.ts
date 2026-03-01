import type {Profile} from "@/entities";

export type PostComment = {
    id: number
    text: string
    author: Omit<Profile, 'isActive' | 'stack' | 'city' | 'description'>
    postId: number
    commentId: number
    createdAt: string
    updatedAt: string
}

export type CreateCommentDto = {
    text: string,
    authorId: number,
    postId: number,
}