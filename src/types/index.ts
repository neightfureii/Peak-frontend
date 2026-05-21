export type Sport = {
    id: number;
    code: string;
    name: string;
    description: string;
    category: string;
    created_at: string;
}

export type SportsCategory = {
    id: number;
    name: string;
    description: string;
    created_at: string;
}

export type SportDetails = {
    id: number;
    code: string;
    name: string;
    description: string;
    bannerUrl: string;
    bannerCldPubId: string;
    category: SportsCategory;
    created_at: string;
}

export type Student = {
    id: number;
    name: string;
    faculty: string;
    batch: string;
    created_at: string;
}

export type ListResponse<T = unknown> = {
    data?: T[];
    pagination?: {
        page: number;
        limit: number;
        total: number;
        totalPages: number;
    };
};

export type CreateResponse<T = unknown> = {
    data?: T;
};

export type GetOneResponse<T = unknown> = {
    data?: T;
};

declare global {
    interface CloudinaryUploadWidgetResults {
        event: string;
        info: {
            secure_url: string;
            public_id: string;
            delete_token?: string;
            resource_type: string;
            original_filename: string;
        };
    }

    interface CloudinaryWidget {
        open: () => void;
    }

    interface Window {
        cloudinary?: {
            createUploadWidget: (
                options: Record<string, unknown>,
                callback: (
                    error: unknown,
                    result: CloudinaryUploadWidgetResults
                ) => void
            ) => CloudinaryWidget;
        };
    }
}

export interface UploadWidgetValue {
    url: string;
    publicId: string;
}

export interface UploadWidgetProps {
    value?: UploadWidgetValue | null;
    onChange?: (value: UploadWidgetValue | null) => void;
    disabled?: boolean;
}

export const USER_ROLES = [
  "admin",
  "student",
  "pedIncharge",
] as const;

export type UserRole = typeof USER_ROLES[number];

export type User = {
    id: string;
    createdAt: string;
    updatedAt: string;
    email: string;
    name: string;
    role: UserRole;
    image?: string;
    imageCldPubId?: string;
};

export type UserDetails = {
    id: string;
    createdAt: string;
    updatedAt: string;
    email: string;
    name: string;
    role: UserRole;
    image?: string;
    imageCldPubId?: string;
};

export type SignUpPayload = {
    email: string;
    name: string;
    password: string;
    image?: string;
    imageCldPubId?: string;
    role: UserRole;
};