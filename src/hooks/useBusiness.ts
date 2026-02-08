import { useState, useEffect } from 'react';
import { businessService } from '../services/business.service';
import { Business, BusinessFilters } from '../types/business';

export const useBusiness = (slug?: string) => {
  const [business, setBusiness] = useState<Business | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchBusiness = async () => {
      if (!slug) {
        setIsLoading(false);
        return;
      }

      try {
        const data = await businessService.getBySlug(slug);
        setBusiness(data);
      } catch (err) {
        setError('Failed to load business');
      } finally {
        setIsLoading(false);
      }
    };

    fetchBusiness();
  }, [slug]);

  return { business, isLoading, error };
};

export const useBusinesses = (filters?: BusinessFilters) => {
  const [businesses, setBusinesses] = useState<Business[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchBusinesses = async () => {
      try {
        const data = await businessService.getAll(filters);
        setBusinesses(data);
      } catch (err) {
        setError('Failed to load businesses');
      } finally {
        setIsLoading(false);
      }
    };

    fetchBusinesses();
  }, [filters?.search, filters?.category, filters?.minPrice, filters?.maxPrice, filters?.minRating]);

  return { businesses, isLoading, error };
};
