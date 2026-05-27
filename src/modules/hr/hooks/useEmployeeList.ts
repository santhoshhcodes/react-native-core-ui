import { useState, useEffect } from 'react';
import { Employee } from '../types';

const MOCK_EMPLOYEES: Employee[] = [
  { id: '1', firstName: 'John', lastName: 'Doe', role: 'HR Manager', avatar: '👤', department: 'People' },
  { id: '2', firstName: 'Jane', lastName: 'Smith', role: 'Lead Developer', avatar: '💻', department: 'Engineering' },
  { id: '3', firstName: 'Santhosh', lastName: 'Kannan', role: 'Mobile Engineer', avatar: '📱', department: 'Engineering' },
  { id: '4', firstName: 'Lura', lastName: 'Dev', role: 'Backend Architect', avatar: '⚡', department: 'Engineering' },
];

export const useEmployeeList = () => {
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      try {
        setEmployees(MOCK_EMPLOYEES);
        setIsLoading(false);
      } catch (error) {
        setIsError(true);
        setIsLoading(false);
      }
    }, 800); // simulate network latency
    return () => clearTimeout(timer);
  }, []);

  return { employees, isLoading, isError };
};
