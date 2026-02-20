import type {Profile} from "@/entities";

export interface Post {
    id: number;
    title: string;
    communityId: number;
    content: string;
    author: Profile;
    images: string[];
    createdAt: string;
    updatedAt: string;
    likes: number;
    comments: PostComment[];
}

export interface PostComment {
    id: number;
    text: string;
    author: Omit<Profile, 'isActive' | 'stack' | 'city' | 'description'>
    postId: number;
    commentId: number;
    createdAt: string;
    updatedAt: string;
}