'use client';

import MatchQueryStatus from '@/components/make-query-status';
import { useFetch } from '@/hooks/useFetch';
type ITodo = {
 userId: number;
 id: number;
 title: string;
 completed: boolean;
};
export default function Home() {
 const query = useFetch<ITodo[]>({
  queryKey: ['Todo'],
  path: 'todosss',
 });
 return (
  <div className="m-auto h-screen w-full">
   <div className="w-[30%]">
    <MatchQueryStatus
     query={query}
     Success={data => <div>{JSON.stringify(data[0].completed)}</div>}
     Loading={<>Loading</>}
    />
   </div>
  </div>
 );
}
