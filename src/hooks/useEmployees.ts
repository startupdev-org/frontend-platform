// hooks/useEmployee.ts
import { useState, useEffect } from 'react';
import { employeeService } from '../services/employee.service';
import { CreateEmployeeDto, Employee, UpdateEmployeeDto } from '../types/employee';

export const useBusinessEmployees = (businessId: string) => {
    const [employees, setEmployees] = useState<Employee[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (!businessId) return;

        const fetchEmployees = async () => {
            try {
                const response = await employeeService.getBusinessEmployees(businessId);
                setEmployees(response.data);
            } catch (err) {
                setError('Failed to load employees');
            } finally {
                setIsLoading(false);
            }
        };

        fetchEmployees();
    }, [businessId]);

    return { employees, isLoading, error };
};

export const useEmployee = (businessId: string, employeeId: string) => {
    const [employee, setEmployee] = useState<Employee | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (!employeeId) return;

        const fetchEmployee = async () => {
            try {
                const response = await employeeService.getEmployee(businessId, employeeId);
                setEmployee(response.data);
            } catch (err) {
                setError('Failed to load employee');
            } finally {
                setIsLoading(false);
            }
        };

        fetchEmployee();
    }, [employeeId]);

    return { employee, isLoading, error };
};

export const useCreateEmployee = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const createEmployee = async (businessId: string, data: CreateEmployeeDto): Promise<Employee | null> => {
        setIsLoading(true);
        setError(null);
        try {
            const response = await employeeService.createEmployee(businessId, data);
            return response.data;
        } catch (err) {
            setError('Failed to create employee');
            return null;
        } finally {
            setIsLoading(false);
        }
    };

    return { createEmployee, isLoading, error };
};

export const useUpdateEmployee = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const updateEmployee = async (
        businessId: string,
        employeeId: string,
        data: UpdateEmployeeDto
    ): Promise<Employee | null> => {
        setIsLoading(true);
        setError(null);
        try {
            const response = await employeeService.updateEmployee(businessId, employeeId, data);
            return response.data;
        } catch (err) {
            setError('Failed to update employee');
            return null;
        } finally {
            setIsLoading(false);
        }
    };

    return { updateEmployee, isLoading, error };
};

export const useDeleteEmployee = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const deleteEmployee = async (businessId: string, employeeId: string): Promise<boolean> => {
        setIsLoading(true);
        setError(null);
        try {
            await employeeService.deleteEmployee(businessId, employeeId);
            return true;
        } catch (err) {
            setError('Failed to delete employee');
            return false;
        } finally {
            setIsLoading(false);
        }
    };

    return { deleteEmployee, isLoading, error };
};