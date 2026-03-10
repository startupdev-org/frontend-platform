import { useState, useEffect } from 'react';
import { getAllProvidedServices } from '../services/provided.services.service';

export interface Service {
    id: string;
    name: string;
    description?: string;
    price?: number;
    [key: string]: unknown;
}

export const useServices = () => {
    const [services, setServices] = useState<Service[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchServices = async () => {
            try {
                const response = await getAllProvidedServices();
                setServices(response.data);
            } catch (err) {
                setError('Failed to load services');
            } finally {
                setIsLoading(false);
            }
        };

        fetchServices();
    }, []);

    return { services, isLoading, error };
};