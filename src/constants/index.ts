import { USER_ROLES } from "@/types";

export const ROLES = [
    { id: '1', value: USER_ROLES[0], label: 'Admin' },
    { id: '2', value: USER_ROLES[1], label: 'Student' },
    { id: '3', value: USER_ROLES[2], label: 'PED Incharge' },
]

export const SPORTS_CATEGORIES_OPTIONS = [
    { id: '3', value: 'field', label: 'Field Sport' },
    { id: '4', value: 'water', label: 'Water Sport' },
    { id: '5', value: 'indoor', label: 'Indoor Sport' },
];

export const FACULTIES_OPTIONS = [
    { id: '1', value: 'ucsc', label: 'UCSC' },
    { id: '2', value: 'science', label: 'Science' },
    { id: '3', value: 'management', label: 'Management' },
    { id: '4', value: 'arts', label: 'Arts' },
];

export const MAX_FILE_SIZE = 3 * 1024 * 1024; // 3MB in bytes
export const ALLOWED_TYPES = [
    "image/png",
    "image/jpeg",
    "image/jpg",
    "image/webp",
];

const getEnvVar = (key: string): string => {
    const value = import.meta.env[key];
    if (!value) {
        throw new Error(`Missing environment variable: ${key}`);
    }
    return value;
};

// export const CLOUDINARY_UPLOAD_URL = getEnvVar("VITE_CLOUDINARY_UPLOAD_URL");
export const CLOUDINARY_CLOUD_NAME = getEnvVar("VITE_CLOUDINARY_CLOUD_NAME");
export const BACKEND_BASE_URL = getEnvVar("VITE_BACKEND_BASE_URL");

export const BASE_URL =  import.meta.env.VITE_API_URL;
export const ACCESS_TOKEN_KEY = import.meta.env.VITE_ACCESS_TOKEN_KEY
export const REFRESH_TOKEN_KEY = import.meta.env.VITE_REFRESH_TOKEN_KEY

export const REFRESH_TOKEN_URL = `${BASE_URL}/refresh-token`;

export const CLOUDINARY_UPLOAD_PRESET = getEnvVar("VITE_CLOUDINARY_UPLOAD_PRESET");