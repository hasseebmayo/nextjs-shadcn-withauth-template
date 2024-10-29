import { useMutation } from '@tanstack/react-query';
import axios from 'axios';
import useToast from './use-toast';
import useAuth from './use-auth';
import { API_URL } from '@/lib/constants';

type DataRequestType<T> = {
 path: string;
 data: T;
};

type MutationFunction<T> = {
 data: T;
 path: string;

 // eslint-disable-next-line @typescript-eslint/no-explicit-any
 callback?: (res: any) => void;
 // eslint-disable-next-line @typescript-eslint/no-explicit-any
 errorCallBack?: (res: any) => void;
};

// eslint-disable-next-line @typescript-eslint/no-unused-vars
interface IUsePostApi<T> {
 key?: string | T;
 isSuccessToast?: boolean;
 method?: 'post' | 'put' | 'delete' | 'patch';
}

const useApi = <T,>({
 isSuccessToast = true,
 key,
 method = 'post',
}: IUsePostApi<T> = {}) => {
 const { token: userToken } = useAuth();
 const { toastError, toastSuccess } = useToast();
 const headers = userToken ? { Authorization: `Bearer ${userToken}` } : {};

 const postRequest = ({ data, path }: DataRequestType<T>) => {
  const REQUEST_PATH = `${API_URL}/${path}`;
  switch (method) {
   case 'post':
    return axios.post(REQUEST_PATH, data, {
     headers: {
      ...headers,
     },
    });
   case 'put':
    return axios.put(REQUEST_PATH, data, {
     headers: {
      ...headers,
     },
    });
   case 'delete':
    return axios.delete(REQUEST_PATH, {
     headers: {
      ...headers,
     },
    });
   case 'patch':
    return axios.patch(REQUEST_PATH, data, {
     headers: {
      ...headers,
     },
    });
   default:
    throw new Error('Invalid method provided');
  }
 };

 const { mutate, isPending } = useMutation({
  mutationFn: postRequest,
  mutationKey: [key],
 });

 function mutationFunction({
  data,
  path,
  callback = () => {},
  errorCallBack = () => {},
 }: MutationFunction<T>) {
  mutate(
   {
    path,
    data,
   },
   {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    onSuccess: (res: any) => {
     isSuccessToast && toastSuccess(res?.data?.message);
     callback(res?.data?.data);
    },
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    onError: (res: any) => {
     console.log(res);
     toastError(res?.response?.data?.message);
     errorCallBack(res);
    },
   }
  );
 }

 return {
  mutationFunction,
  isPending,
 };
};

export default useApi;
