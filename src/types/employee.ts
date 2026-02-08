export interface Employee {
  id: string;
  business_id: string;
  name: string;
  photo_url: string | null;
  position: string | null;
  bio: string | null;
  is_active: boolean;
  created_at: string;
}

export interface CreateEmployeeDto {
  business_id: string;
  name: string;
  photo_url?: string;
  position?: string;
  bio?: string;
  is_active?: boolean;
}

export interface UpdateEmployeeDto {
  name?: string;
  photo_url?: string;
  position?: string;
  bio?: string;
  is_active?: boolean;
}
