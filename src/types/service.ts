export interface Service {
  id: string;
  business_id: string;
  name: string;
  description: string | null;
  price: number;
  duration_minutes: number;
  is_active: boolean;
  created_at: string;
}

export interface CreateServiceDto {
  business_id: string;
  name: string;
  description?: string;
  price: number;
  duration_minutes: number;
  is_active?: boolean;
}

export interface UpdateServiceDto {
  name?: string;
  description?: string;
  price?: number;
  duration_minutes?: number;
  is_active?: boolean;
}
