import { supabase } from './api';
import { Service, CreateServiceDto, UpdateServiceDto } from '../types/service';
import { Employee, CreateEmployeeDto, UpdateEmployeeDto } from '../types/employee';

export const adminService = {
  async login(email: string, password: string) {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) throw error;
    return data;
  },

  async logout() {
    const { error } = await supabase.auth.signOut();
    if (error) throw error;
  },

  async getCurrentUser() {
    const { data: { user }, error } = await supabase.auth.getUser();
    if (error) throw error;
    return user;
  },

  services: {
    async getAll(businessId: string): Promise<Service[]> {
      const { data, error } = await supabase
        .from('services')
        .select('*')
        .eq('business_id', businessId)
        .order('name');

      if (error) throw error;
      return data || [];
    },

    async create(service: CreateServiceDto): Promise<Service> {
      const { data, error } = await supabase
        .from('services')
        .insert(service)
        .select()
        .single();

      if (error) throw error;
      return data;
    },

    async update(id: string, updates: UpdateServiceDto): Promise<Service> {
      const { data, error } = await supabase
        .from('services')
        .update(updates)
        .eq('id', id)
        .select()
        .single();

      if (error) throw error;
      return data;
    },

    async delete(id: string): Promise<void> {
      const { error } = await supabase
        .from('services')
        .delete()
        .eq('id', id);

      if (error) throw error;
    },
  },

  employees: {
    async getAll(businessId: string): Promise<Employee[]> {
      const { data, error } = await supabase
        .from('employees')
        .select('*')
        .eq('business_id', businessId)
        .order('name');

      if (error) throw error;
      return data || [];
    },

    async create(employee: CreateEmployeeDto): Promise<Employee> {
      const { data, error } = await supabase
        .from('employees')
        .insert(employee)
        .select()
        .single();

      if (error) throw error;
      return data;
    },

    async update(id: string, updates: UpdateEmployeeDto): Promise<Employee> {
      const { data, error } = await supabase
        .from('employees')
        .update(updates)
        .eq('id', id)
        .select()
        .single();

      if (error) throw error;
      return data;
    },

    async delete(id: string): Promise<void> {
      const { error } = await supabase
        .from('employees')
        .delete()
        .eq('id', id);

      if (error) throw error;
    },
  },
};
