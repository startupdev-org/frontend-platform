import axios from 'axios';
import { Service, CreateServiceDto, UpdateServiceDto } from '../types/service';
import { Employee, CreateEmployeeDto, UpdateEmployeeDto } from '../types/employee';

const HOSTNAME = import.meta.env.VITE_BACKEND_HOSTNAME || 'http://localhost:8080';
const AUTH_BASE_URL = `${HOSTNAME}/api/auth`;
const BUSINESS_BASE_URL = `${HOSTNAME}/api/business`;

export const adminService = {
  async login(email: string, password: string) {
    const response = await axios.post(`${AUTH_BASE_URL}/login`, {
      email,
      password,
    });
    return response.data;
  },

  async logout() {
    return;
  },

  async register(email: string, password: string, name?: string) {
    const response = await axios.post(`${AUTH_BASE_URL}/register`, {
      email,
      password,
      name: name ?? email.split('@')[0],
    });
    return response.data;
  },

  async forgotPassword(email: string) {
    const response = await axios.post(`${AUTH_BASE_URL}/forgot-password`, {
      email,
    });
    return response.data;
  },

  async getCurrentUser() {
    const response = await axios.get(`${HOSTNAME}/api/users/whoami`);
    return response.data;
  },

  services: {
    async getAll(businessId: string): Promise<Service[]> {
      const response = await axios.get<Service[]>(
        `${BUSINESS_BASE_URL}/${businessId}/service`
      );
      return response.data ?? [];
    },

    async create(service: CreateServiceDto): Promise<Service> {
      const response = await axios.post<Service>(
        `${BUSINESS_BASE_URL}/${service.business_id}/service`,
        service
      );
      return response.data;
    },

    async update(id: string, updates: UpdateServiceDto): Promise<Service> {
      const { business_id, ...rest } = updates as UpdateServiceDto & {
        business_id: string;
      };

      const response = await axios.put<Service>(
        `${BUSINESS_BASE_URL}/${business_id}/service/${id}`,
        rest
      );
      return response.data;
    },

    async delete(id: string): Promise<void> {
      throw new Error('delete service requires business_id in REST implementation');
    },
  },

  employees: {
    async getAll(businessId: string): Promise<Employee[]> {
      const response = await axios.get<Employee[]>(
        `${BUSINESS_BASE_URL}/${businessId}/employee`
      );
      return response.data ?? [];
    },

    async create(employee: CreateEmployeeDto): Promise<Employee> {
      const response = await axios.post<Employee>(
        `${BUSINESS_BASE_URL}/${employee.business_id}/employee`,
        employee
      );
      return response.data;
    },

    async update(id: string, updates: UpdateEmployeeDto): Promise<Employee> {
      const { business_id, ...rest } = updates as UpdateEmployeeDto & {
        business_id: string;
      };

      const response = await axios.put<Employee>(
        `${BUSINESS_BASE_URL}/${business_id}/employee/${id}`,
        rest
      );
      return response.data;
    },

    async delete(id: string): Promise<void> {
      throw new Error('delete employee requires business_id in REST implementation');
    },
  },
};
