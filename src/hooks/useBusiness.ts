import { useState, useEffect } from 'react';
import { businessService } from '../services/business.service';
import { Business, BusinessFilters } from '../types/business';

export const useBusinesses = (filters: BusinessFilters) => {
  const [businesses, setBusinesses] = useState<Business[]>([]);
  const [totalElements, setTotalElements] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchBusinesses = async () => {
      try {
        setIsLoading(true);
        const data = await businessService.getAll(filters);
        setBusinesses(data.content);
        setTotalElements(data.numberOfElemets);
        setTotalPages(data.totalPages);
      } catch (err) {
        const anyErr = err as any;
        const status = anyErr?.response?.status as number | undefined;
        const backendMessage =
          anyErr?.response?.data?.message ??
          anyErr?.response?.data?.error ??
          (typeof anyErr?.response?.data === 'string' ? anyErr.response.data : undefined);

        const prefix = status ? `Failed to load businesses (${status})` : 'Failed to load businesses';
        const hint =
          status === 403
            ? ' (If the endpoint is protected, ensure your auth token is configured.)'
            : '';

        setError(backendMessage ? `${prefix}: ${backendMessage}${hint}` : `${prefix}${hint}`);

      } finally {
        setIsLoading(false);
      }
    };

    fetchBusinesses();
  }, [
    filters.page,
    filters.size,
    filters.search,
    filters.category,
    filters.minPrice,
    filters.maxPrice,
    filters.city,
    filters.minRating,
  ]);

  return { businesses, totalElements, totalPages, isLoading, error };
};

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

