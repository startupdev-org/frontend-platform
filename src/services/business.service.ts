import axios from 'axios';
import { Business, BusinessFilters, PaginatedResponse } from '../types/business';

const HOSTNAME = import.meta.env.VITE_BACKEND_HOSTNAME || 'http://localhost:8080';
const REST_API_BASE_URL = `${HOSTNAME}/api/business`;
const AUTH_TOKEN = import.meta.env.VITE_MOCK_AUTH_TOKEN;

function authHeaders() {
  if (!AUTH_TOKEN) return undefined;
  return { Authorization: `Bearer ${AUTH_TOKEN}` };
}

export const businessService = {
  async getAll(filters: BusinessFilters): Promise<PaginatedResponse<Business>> {
    const params: Record<string, unknown> = {
      page: filters.page,
      size: filters.size,
    };

    if (filters.search) params.search = filters.search;
    if (filters.category) params.category = filters.category;
    if (filters.minPrice != null) params.minPrice = filters.minPrice;
    if (filters.maxPrice != null) params.maxPrice = filters.maxPrice;
    if (filters.city) params.city = filters.city;
    if (filters.minRating != null) params.minRating = filters.minRating;

    const response = await axios.get<PaginatedResponse<Business>>(REST_API_BASE_URL, {
      params,
      headers: authHeaders(),
    });
    return response.data;

  },

  async getBySlug(slug: string): Promise<Business | null> {
    const response = await axios.get<Business>(`${REST_API_BASE_URL}/slug/${slug}`, {
      headers: authHeaders(),
    });
    return response.data ?? null;
  },

  async getBySubdomain(_subdomain: string): Promise<Business | null> {
    return null;
  },

  async update(id: string, updates: Partial<Business>): Promise<Business> {
    const response = await axios.put<Business>(`${REST_API_BASE_URL}/${id}`, updates, {
      headers: authHeaders(),
    });
    return response.data;
  },
};
