'use client';
import { usePathname } from 'next/navigation';
import { useRouter, useSearchParams } from 'next/navigation';
const useSearchParamsHook = () => {
 const searchParams = useSearchParams();
 const params = new URLSearchParams(searchParams);
 const pathname = usePathname();
 const { replace, push } = useRouter();
 function updateURL(name: string, value: string) {
  params.set(name, value);
  replace(`${pathname}?${params.toString()}`, { scroll: false });
 }
 function deleteQuery(name: string) {
  params.delete(name);
  replace(`${pathname}?${params.toString()}`, { scroll: false });
 }
 function pushDynamicURL(path: string) {
  const url = `${path}?${searchParams}`;
  push(url);
 }
 return {
  updateURL,
  params,
  deleteQuery,
  pushDynamicURL,
 };
};

export default useSearchParamsHook;
