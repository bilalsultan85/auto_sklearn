import { useState, useEffect, useCallback } from 'react';
import { storageService } from '../services/storageService';

type CollectionName = 'services' | 'reviews' | 'payments' | 'jobs' | 'history' | 'visitors' | 'notifications';

interface UseStorageReturn<T> {
  data: T[];
  loading: boolean;
  error: string | null;
  refetch: () => Promise<void>;
  create: (item: Omit<T, 'id'>) => Promise<T>;
  update: (id: string, updates: Partial<T>) => Promise<T | null>;
  remove: (id: string) => Promise<boolean>;
}

export const useStorage = <T extends { id: string }>(
  collection: CollectionName
): UseStorageReturn<T> => {
  const [data, setData] = useState<T[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchData = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const items = await storageService.getAll(collection);
      setData(items as T[]);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch data');
    } finally {
      setLoading(false);
    }
  }, [collection]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const create = async (item: Omit<T, 'id'>): Promise<T> => {
    try {
      setError(null);
      const newItem = await storageService.create(collection, item);
      await fetchData();
      return newItem as T;
    } catch (err) {
      const errorMsg = err instanceof Error ? err.message : 'Failed to create item';
      setError(errorMsg);
      throw new Error(errorMsg);
    }
  };

  const update = async (id: string, updates: Partial<T>): Promise<T | null> => {
    try {
      setError(null);
      const updatedItem = await storageService.update(collection, id, updates);
      await fetchData();
      return updatedItem as T | null;
    } catch (err) {
      const errorMsg = err instanceof Error ? err.message : 'Failed to update item';
      setError(errorMsg);
      throw new Error(errorMsg);
    }
  };

  const remove = async (id: string): Promise<boolean> => {
    try {
      setError(null);
      const success = await storageService.delete(collection, id);
      if (success) {
        await fetchData();
      }
      return success;
    } catch (err) {
      const errorMsg = err instanceof Error ? err.message : 'Failed to delete item';
      setError(errorMsg);
      throw new Error(errorMsg);
    }
  };

  return {
    data,
    loading,
    error,
    refetch: fetchData,
    create,
    update,
    remove,
  };
};
