'use client';
import { API_URL } from '@/lib/constants';
import { useQuery, UseQueryOptions } from '@tanstack/react-query';
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
 config?: Omit<UseQueryOptions<T, Error>, 'queryKey' | 'queryFn'>;
}

export function useFetch<T>({ path, queryKey, config }: IUseFetch<T>) {
 const { token } = useAuth();
 if (!queryKey) throw new Error('queryKey is required');
 if (!path) throw new Error('path is required');
 const REQUEST_URL = `${API_URL}/${path}`;

 const fetchData = async (): Promise<T> => {
  try {
   const response = await axios.get(REQUEST_URL, {
    headers: {
     Authorization: `Bearer ${token}`,
    },
   });
   console.log(response);
   return response.data;
   // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
   if (!error.response) {
    throw new Error('Network error, please check your internet connection.');
   }
   if (error.response.status === 401) {
    console.log('Unauthorized access, logging out...');
    // Add your function here
   }
   throw error;
  }
 };

 const { data, isLoading, refetch, status, error } = useQuery<T, Error>({
  queryKey,
  queryFn: fetchData,
  refetchOnWindowFocus: false,
  staleTime: config?.staleTime ?? 60 * 5,
  ...config,
 });

 return { data, isLoading, refetch, status, error };
}
