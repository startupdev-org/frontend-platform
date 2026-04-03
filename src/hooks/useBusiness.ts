import { useState, useEffect } from 'react';
import { businessService } from '../services/business.service';
import { Business, BusinessFilters, PaginatedResponse, UseBusinessesReturn } from '../types/business';



export const useBusinesses = (filters: BusinessFilters): UseBusinessesReturn => {
  const [businesses, setBusinesses] = useState<Business[]>([]);
  const [totalElements, setTotalElements] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchBusinesses = async () => {
      try {
        setIsLoading(true);
        setError(null);

        // Fetch the paginated businesses data
        const data: PaginatedResponse<Business> = await businessService.getAll(filters);

        // Set the state from the paginated response
        setBusinesses(data.content); // List of businesses
        setTotalElements(data.numberOfElements); // Total number of businesses
        setTotalPages(data.totalPages); // Total pages
      } catch (err: any) {
        const status = err?.response?.status;
        const backendMessage =
          err?.response?.data?.message ??
          err?.response?.data?.error;

        setError(
          backendMessage
            ? `Failed to load businesses (${status}): ${backendMessage}`
            : 'Failed to load businesses'
        );
      } finally {
        setIsLoading(false);
      }
    };

    fetchBusinesses();
  }, [
    filters.page,   // Trigger re-fetch when page changes
    filters.size,   // Trigger re-fetch when page size changes
    filters.search, // Trigger re-fetch when search term changes
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

