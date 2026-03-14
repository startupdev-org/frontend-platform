import axios from "axios";
import { CreateEmployeeDto, UpdateEmployeeDto } from "../types/employee";

const HOSTNAME = import.meta.env.VITE_BACKEND_HOSTNAME || "http://localhost:8080";

const AUTH_TOKEN = import.meta.env.VITE_MOCK_AUTH_TOKEN;

const BASE_URL = (businessId: string) => `${HOSTNAME}/api/business/${businessId}/employee`;

export const employeeService = {
    createEmployee: async (businessId: string, data: CreateEmployeeDto) => {
        return axios.post(BASE_URL(businessId), data, {
            headers: {
                Authorization: `Bearer ${AUTH_TOKEN}`
            }
        });
    },

    getEmployee: async (businessId: string, employeeId: string) => {
        return axios.get(`${BASE_URL(businessId)}/${employeeId}`);
    },

    getBusinessEmployees: async (businessId: string) => {
        return axios.get(BASE_URL(businessId));
    },

    getActiveEmployees: async (businessId: string) => {
        return axios.get(`${BASE_URL(businessId)}/active`);
    },

    updateEmployee: async (businessId: string, employeeId: string, data: UpdateEmployeeDto) => {
        return axios.put(`${BASE_URL(businessId)}/${employeeId}`, data);
    },

    deleteEmployee: async (businessId: string, employeeId: string) => {
        return axios.delete(`${BASE_URL(businessId)}/${employeeId}`);
    },
};