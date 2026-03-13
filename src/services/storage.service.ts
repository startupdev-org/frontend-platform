// services/storage.service.ts
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
        console.log('getting the necessary info to upload the file')
        const response = await axios.post(`${HOSTNAME}/api/storage/upload-url`, null, {
            params: { fileName, folder },
            headers: {
                Authorization: `Bearer ${AUTH_TOKEN}`
            }
        });
        console.log('the response from the backend is: ', response);
        return response.data;
    },

    uploadFile: async (uploadUrl: string, file: File): Promise<void> => {
        console.log('UPLOADING THE FILE')
        await fetch(uploadUrl, {
            method: 'PUT',
            body: file,
            headers: { 'Content-Type': file.type },
        });
    },
};
