import { useState, useEffect, useMemo } from 'react';
import { businessService } from '../services/business.service';
import { Business, BusinessFilters, PaginatedResponse, UseBusinessesReturn } from '../types/business';

type BusinessesCacheEntry = {
  data: PaginatedResponse<Business>;
  cachedAt: number;
};

type BusinessesInFlightEntry = {
  controller: AbortController;
  promise: Promise<PaginatedResponse<Business>>;
  waiterCount: number;
  settled: boolean;
};

// Simple in-memory cache to avoid repeating identical requests (navigation/filter toggles).
const BUSINESSES_CACHE_TTL_MS = 60_000;
const businessesCache = new Map<string, BusinessesCacheEntry>();
const businessesInFlight = new Map<string, BusinessesInFlightEntry>();

export const useBusinesses = (filters: BusinessFilters): UseBusinessesReturn => {
  const [businesses, setBusinesses] = useState<Business[]>([]);
  const [totalElements, setTotalElements] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const filtersKey = useMemo(
    () =>
      JSON.stringify({
        page: filters.page,
        size: filters.size,
        search: filters.search ?? null,
        category: filters.category ?? null,
        minPrice: filters.minPrice ?? null,
        maxPrice: filters.maxPrice ?? null,
        city: filters.city ?? null,
        minRating: filters.minRating ?? null,
      }),
    [
      filters.page,
      filters.size,
      filters.search,
      filters.category,
      filters.minPrice,
      filters.maxPrice,
      filters.city,
      filters.minRating,
    ],
  );

  useEffect(() => {
    let didCancel = false;

    const cached = businessesCache.get(filtersKey);
    if (cached && Date.now() - cached.cachedAt <= BUSINESSES_CACHE_TTL_MS) {
      setBusinesses(cached.data.content);
      setTotalElements(cached.data.totalElements ?? cached.data.numberOfElements);
      setTotalPages(cached.data.totalPages);
      setError(null);
      setIsLoading(false);
      return () => {
        didCancel = true;
      };
    }

    const entry = businessesInFlight.get(filtersKey);
    if (entry) {
      entry.waiterCount += 1;
      setIsLoading(true);
      setError(null);

      entry.promise
        .then((data) => {
          if (didCancel) return;
          setBusinesses(data.content);
          setTotalElements(data.totalElements ?? data.numberOfElements);
          setTotalPages(data.totalPages);
          setError(null);
        })
        .catch((err: unknown) => {
          if (didCancel) return;
          const anyErr = err as {
            response?: { status?: number; data?: { message?: string; error?: string } };
          };
          const status = anyErr?.response?.status;
          const backendMessage = anyErr?.response?.data?.message ?? anyErr?.response?.data?.error;

          setError(
            backendMessage
              ? `Failed to load businesses (${status}): ${backendMessage}`
              : 'Failed to load businesses',
          );
        })
        .finally(() => {
          if (didCancel) return;
          setIsLoading(false);
        });

      return () => {
        didCancel = true;
        entry.waiterCount -= 1;
        if (entry.waiterCount <= 0 && !entry.settled) {
          entry.controller.abort();
          businessesInFlight.delete(filtersKey);
        }
      };
    }

    const controller = new AbortController();
    const promise = businessService.getAll(filters, controller.signal);
    const newEntry: BusinessesInFlightEntry = {
      controller,
      promise,
      waiterCount: 1,
      settled: false,
    };

    businessesInFlight.set(filtersKey, newEntry);
    setIsLoading(true);
    setError(null);

    promise
      .then((data) => {
        businessesCache.set(filtersKey, { data, cachedAt: Date.now() });
        if (didCancel) return;
        setBusinesses(data.content);
        setTotalElements(data.totalElements ?? data.numberOfElements);
        setTotalPages(data.totalPages);
        setError(null);
      })
      .catch((err: unknown) => {
        if (didCancel) return;
        const anyErr = err as {
          response?: { status?: number; data?: { message?: string; error?: string } };
        };
        const status = anyErr?.response?.status;
        const backendMessage = anyErr?.response?.data?.message ?? anyErr?.response?.data?.error;

        setError(
          backendMessage
            ? `Failed to load businesses (${status}): ${backendMessage}`
            : 'Failed to load businesses',
        );
      })
      .finally(() => {
        newEntry.settled = true;
        businessesInFlight.delete(filtersKey);
        if (didCancel) return;
        setIsLoading(false);
      });

    return () => {
      didCancel = true;
      newEntry.waiterCount -= 1;
      if (newEntry.waiterCount <= 0 && !newEntry.settled) {
        newEntry.controller.abort();
        businessesInFlight.delete(filtersKey);
      }
    };
  }, [filtersKey]);

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
      } catch (err: unknown) {
        const anyErr = err as { response?: { status?: number; data?: { message?: string; error?: string } } };
        const status = anyErr?.response?.status;
        const backendMessage = anyErr?.response?.data?.message ?? anyErr?.response?.data?.error;
        setError(
          backendMessage ? `Failed to load business (${status}): ${backendMessage}` : 'Failed to load business',
        );
      } finally {
        setIsLoading(false);
      }
    };

    fetchBusiness();
  }, [slug]);

  return { business, isLoading, error };
};

