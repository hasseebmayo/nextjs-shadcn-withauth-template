'use client';
import { API_URL } from '@/lib/constants';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import useAuth from './use-auth';

export type FetchApiType = {
 queryKey: string;
 path: string;
};

// eslint-disable-next-line @typescript-eslint/no-unused-vars
interface IUseFetch<T> {
 path: string;
 queryKey: string[];
 // eslint-disable-next-line @typescript-eslint/no-explicit-any
 config?: any;
 extra?: T;
}

export function useFetch<T>({ path, queryKey, config }: IUseFetch<T>) {
 const { token } = useAuth();
 if (!queryKey) throw new Error('queryKey is required');
 if (!path) throw new Error('path is required');
 const REQUEST_URL = `${API_URL}/${path}`;

 const fetchData = async () => {
  try {
   const response = await axios.get(REQUEST_URL, {
    headers: {
     Authorization: `Bearer ${token}`,
    },
   });
   return response.data.data;
   // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
   // Handle errors if needed
  }
 };

 const { data, isLoading, refetch, status, error } = useQuery<T>({
  queryKey: queryKey,
  queryFn: fetchData,
  refetchOnWindowFocus: false,
  staleTime: config?.staleTime ?? 60 * 5,
  ...config,
 });

 const response: T | undefined = data;

 return { response, isLoading, refetch, status, error };
}
