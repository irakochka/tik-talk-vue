export interface Profile {
    id: number;
    username: string;
    avatarUrl: string;
    subscribersAmount: number;
    firstName: string;
    lastName: string;
    isActive: boolean;
    stack: string[];
    city: string;
    description: string;
}

export interface ProfileForm {
    firstName: string;
    lastName: string;
    username: string;
    description: string;
    city: string;
    avatarUrl: string;
    avatarFile: File | null;
    stack?: string[];
}

export interface UpdateProfileDto {
    firstName: string;
    lastName: string;
    stack?: string[];
    city?: string;
    description?: string;
}