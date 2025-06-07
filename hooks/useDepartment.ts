import { useState, useEffect } from 'react';
import { toast } from 'sonner';
import type { Department } from '@/types/department';

export function useDepartments() {
  const [departments, setDepartments] = useState<Department[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch departments
  const fetchDepartments = async () => {
    try {
      setIsLoading(true);
      const response = await fetch('/api/departments');
      if (!response.ok) throw new Error('Failed to fetch departments');
      const data = await response.json();
      setDepartments(data.departments);
      setError(null);
    } catch (err) {
      setError('Failed to load departments');
      toast.error('Failed to load departments');
    } finally {
      setIsLoading(false);
    }
  };

  // Add department
  const addDepartment = async (departmentData: Omit<Department, 'id'>) => {
    try {
      const response = await fetch('/api/departments', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(departmentData),
      });
      
      if (!response.ok) throw new Error('Failed to add department');
      
      const data = await response.json();
      setDepartments(prev => [...prev, { ...departmentData, id: data.id }]);
      toast.success('Department added successfully');
      return data;
    } catch (err) {
      toast.error('Failed to add department');
      throw err;
    }
  };

  // Update department
  const updateDepartment = async (id: string, departmentData: Partial<Department>) => {
    try {
      const response = await fetch(`/api/departments/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(departmentData),
      });
      
      if (!response.ok) throw new Error('Failed to update department');
      
      setDepartments(prev =>
        prev.map(dept =>
          dept.id === id ? { ...dept, ...departmentData } : dept
        )
      );
      toast.success('Department updated successfully');
    } catch (err) {
      toast.error('Failed to update department');
      throw err;
    }
  };

  // Delete department
  const deleteDepartment = async (id: string) => {
    try {
      const response = await fetch(`/api/departments/${id}`, {
        method: 'DELETE',
      });
      
      if (!response.ok) throw new Error('Failed to delete department');
      
      setDepartments(prev => prev.filter(dept => dept.id !== id));
      toast.success('Department deleted successfully');
    } catch (err) {
      toast.error('Failed to delete department');
      throw err;
    }
  };

  // Initial fetch
  useEffect(() => {
    fetchDepartments();
  }, []);

  return {
    departments,
    isLoading,
    error,
    addDepartment,
    updateDepartment,
    deleteDepartment,
    refreshDepartments: fetchDepartments,
  };
}