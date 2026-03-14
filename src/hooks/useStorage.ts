import { useState } from 'react';
import { storageService } from '../services/storage.service';

export const useFileUpload = () => {
    const [isUploading, setIsUploading] = useState(false);
    const [uploadProgress, setUploadProgress] = useState<number>(0);
    const [error, setError] = useState<string | null>(null);

    const validateFile = (file: File): string | null => {
        const allowed = ['image/jpeg', 'image/png', 'image/webp'];
        if (!allowed.includes(file.type)) {
            return 'Only JPG, PNG, and WebP files are allowed';
        }
        if (file.size > 5 * 1024 * 1024) {
            return 'File size must be under 5MB';
        }
        return null;
    };

    const uploadFile = async (file: File, folder: string): Promise<string | null> => {
        const validationError = validateFile(file);
        if (validationError) {
            setError(validationError);
            return null;
        }

        setIsUploading(true);
        setError(null);
        setUploadProgress(0);

        try {
            // Step 1 - get presigned URL from backend
            const { uploadUrl, publicUrl } = await storageService.getUploadUrl(file.name, folder);
            setUploadProgress(30);

            // Step 2 - upload directly to Supabase
            await storageService.uploadFile(uploadUrl, file);
            setUploadProgress(100);

            // Step 3 - return public URL to store in DB
            return publicUrl;
        } catch (err) {
            setError('Failed to upload file');
            return null;
        } finally {
            setIsUploading(false);
        }
    };

    return { uploadFile, validateFile, isUploading, uploadProgress, error };
};