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

        console.log('data: ', data)
        setBusinesses(data.content);
        setTotalElements(data.numberOfElemets);
        setTotalPages(data.totalPages);
      } catch (err) {
        setError('Failed to load businesses');
      } finally {
        setIsLoading(false);
      }
    };

    fetchBusinesses();
  }, [filters.page, filters.size, filters.city, filters.minRating]);

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

        console.log('trying to make the request to get the business')

        const data = await businessService.getBySlug(slug);

        console.log('the data is: ', data)
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

