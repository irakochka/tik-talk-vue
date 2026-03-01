import type {Profile} from "@/entities";
import type {PostComment} from "@/entities/comment";

export type Post = {
    id: number
    title: string
    communityId: number
    content: string
    author: Profile
    images: string[]
    createdAt: string
    updatedAt: string
    likes: number
    comments: PostComment[]
}

export type CreatePostDto = {
    title: string,
    content: string,
    authorId: number,
    communityId?: number
}

export type UpdatePostDto = {
    title: string,
    content: string,
}