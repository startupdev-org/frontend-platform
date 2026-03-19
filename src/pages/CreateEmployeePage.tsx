import { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { employeeService } from '../services/employee.service';
import { storageService } from '../services/storage.service';
import Navbar from '../components/layout/Navbar';
import { Button } from '@headlessui/react';
import Spinner from '../components/ui/Spinner';
import Footer from '../components/layout/Footer';

interface EmployeeForm {
    name: string;
    photoUrl: string;
    active: boolean;
}

interface FormErrors {
    name?: string;
    photo?: string;
}

export default function CreateEmployeePage() {
    const businessId = 'd4287dcf-9fdb-4025-806f-5eece5571571';

    const [form, setForm] = useState<EmployeeForm>({
        name: '',
        photoUrl: '',
        active: true,
    });

    const [photoFile, setPhotoFile] = useState<File | null>(null);
    const [photoPreview, setPhotoPreview] = useState<string | null>(null);
    const [errors, setErrors] = useState<FormErrors>({});
    const [isUploading, setIsUploading] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [successMessage, setSuccessMessage] = useState<string | null>(null);
    const [errorMessage, setErrorMessage] = useState<string | null>(null);

    const validateForm = (): boolean => {
        const newErrors: FormErrors = {};
        if (!form.name.trim()) newErrors.name = 'Name is required';
        // if (!photoFile && !form.photoUrl) newErrors.photo = 'Photo is required';
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        const allowed = ['image/jpeg', 'image/png', 'image/webp'];
        if (!allowed.includes(file.type)) {
            setErrors(prev => ({ ...prev, photo: 'Only JPG, PNG, and WebP files are allowed' }));
            return;
        }

        if (file.size > 5 * 1024 * 1024) {
            setErrors(prev => ({ ...prev, photo: 'File size must be under 5MB' }));
            return;
        }

        setPhotoFile(file);
        setErrors(prev => ({ ...prev, photo: undefined }));
        setPhotoPreview(URL.createObjectURL(file));
    };

    const handleUploadPhoto = async (): Promise<string | null> => {
        if (!photoFile) return form.photoUrl;

        setIsUploading(true);
        try {
            // Step 1 - get presigned URL from backend
            const { uploadUrl, publicUrl } = await storageService.getUploadUrl(
                photoFile.name,
                `business-images/${businessId}/employees`
            );

            // Step 2 - upload directly to Supabase
            await storageService.uploadFile(uploadUrl, photoFile);

            // Step 3 - return the public URL to include in the request
            return publicUrl;
        } catch (err) {
            setErrorMessage('Failed to upload photo. Please try again.');
            return null;
        } finally {
            setIsUploading(false);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setSuccessMessage(null);
        setErrorMessage(null);

        if (!validateForm()) return;

        setIsSubmitting(true);
        try {
            // Step 1 - upload photo and get URL
            const photoUrl = await handleUploadPhoto();
            if (!photoUrl) return;

            // Step 2 - create employee with the photo URL
            await employeeService.createEmployee(businessId!, {
                name: form.name,
                photoUrl,
                is_active: form.active,
            });

            setSuccessMessage(`Employee "${form.name}" created successfully!`);
            setForm({ name: '', photoUrl: '', active: true });
            setPhotoFile(null);
            setPhotoPreview(null);
        } catch (err) {
            setErrorMessage('Failed to create employee. Please try again.');
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <>
            <Helmet>
                <title>Add Employee - BookBeauty</title>
            </Helmet>

            <div className="min-h-screen flex flex-col bg-gray-50">
                <Navbar />

                <div className="flex-1 max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full">
                    <div className="bg-white rounded-xl shadow-md p-8">
                        <h1 className="text-2xl font-bold text-gray-900 mb-6">Add New Employee</h1>

                        {successMessage && (
                            <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg">
                                <p className="text-green-700 font-medium">{successMessage}</p>
                            </div>
                        )}

                        {errorMessage && (
                            <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
                                <p className="text-red-700 font-medium">{errorMessage}</p>
                            </div>
                        )}

                        <form onSubmit={handleSubmit} className="space-y-6">

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Employee Photo
                                </label>

                                <div className="flex items-center gap-6">
                                    <div className="w-24 h-24 rounded-full overflow-hidden bg-gray-100 flex items-center justify-center flex-shrink-0">
                                        {photoPreview ? (
                                            <img
                                                src={photoPreview}
                                                alt="Preview"
                                                className="w-full h-full object-cover"
                                            />
                                        ) : (
                                            <svg className="w-10 h-10 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                            </svg>
                                        )}
                                    </div>

                                    <div className="flex-1">
                                        <label className="cursor-pointer inline-flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 transition-colors">
                                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
                                            </svg>
                                            {photoFile ? 'Change Photo' : 'Upload Photo'}
                                            <input
                                                type="file"
                                                accept="image/jpeg,image/png,image/webp"
                                                onChange={handlePhotoChange}
                                                className="hidden"
                                            />
                                        </label>
                                        <p className="mt-1 text-xs text-gray-500">JPG, PNG, WebP up to 5MB</p>
                                        {photoFile && (
                                            <p className="mt-1 text-xs text-blue-600 font-medium">{photoFile.name}</p>
                                        )}
                                    </div>
                                </div>

                                {errors.photo && (
                                    <p className="mt-1 text-sm text-red-600">{errors.photo}</p>
                                )}
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Full Name <span className="text-red-500">*</span>
                                </label>
                                <input
                                    type="text"
                                    value={form.name}
                                    onChange={e => setForm(prev => ({ ...prev, name: e.target.value }))}
                                    placeholder="e.g. John Doe"
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                />
                                {errors.name && (
                                    <p className="mt-1 text-sm text-red-600">{errors.name}</p>
                                )}
                            </div>

                            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                                <div>
                                    <p className="text-sm font-medium text-gray-700">Active Status</p>
                                    <p className="text-xs text-gray-500">Inactive employees won't appear in booking</p>
                                </div>
                                <button
                                    type="button"
                                    onClick={() => setForm(prev => ({ ...prev, active: !prev.active }))}
                                    className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${form.active ? 'bg-blue-600' : 'bg-gray-300'
                                        }`}
                                >
                                    <span
                                        className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${form.active ? 'translate-x-6' : 'translate-x-1'
                                            }`}
                                    />
                                </button>
                            </div>

                            <div className="flex gap-3 pt-2">
                                <Button
                                    type="submit"
                                    disabled={isSubmitting || isUploading}
                                    className="flex-1"
                                >
                                    {isUploading ? (
                                        <span className="flex items-center justify-center gap-2">
                                            <Spinner size="sm" />
                                            Uploading photo...
                                        </span>
                                    ) : isSubmitting ? (
                                        <span className="flex items-center justify-center gap-2">
                                            <Spinner size="sm" />
                                            Creating employee...
                                        </span>
                                    ) : (
                                        'Add Employee'
                                    )}
                                </Button>
                            </div>
                        </form>
                    </div>

                </div>

                <Footer />
            </div>
        </>
    );
}