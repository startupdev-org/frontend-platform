import axios from "axios";

const HOSTNAME = import.meta.env.VITE_BACKEND_HOSTNAME || "http://localhost:8080";

const AUTH_TOKEN = import.meta.env.VITE_MOCK_AUTH_TOKEN;

export interface PresignedUrlResponse {
    uploadUrl: string;
    publicUrl: string;
    filePath: string;
}

export const storageService = {
    getUploadUrl: async (fileName: string, folder: string): Promise<PresignedUrlResponse> => {
        const response = await axios.post(`${HOSTNAME}/api/storage/upload-url`, null, {
            params: { fileName, folder },
            headers: {
                Authorization: `Bearer ${AUTH_TOKEN}`
            }
        });
        return response.data;
    },

    uploadFile: async (uploadUrl: string, file: File): Promise<void> => {
        await fetch(uploadUrl, {
            method: 'PUT',
            body: file,
            headers: { 'Content-Type': file.type },
        });
    },
};
