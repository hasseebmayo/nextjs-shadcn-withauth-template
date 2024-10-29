import { useEffect, useCallback } from 'react';

const useOutsideClick = (
 refs: React.RefObject<HTMLElement>[],
 callback: (event: MouseEvent) => void
) => {
 const handleClickOutside = useCallback(
  (event: MouseEvent) => {
   const isOutside = refs.every(ref => {
    return ref.current && !ref.current.contains(event.target as Node);
   });
   if (isOutside) {
    console.log('Outside click detected'); // Debugging line
    callback(event);
   }
  },
  [refs, callback]
 );

 useEffect(() => {
  const handler = (event: MouseEvent) => handleClickOutside(event);
  document.addEventListener('mousedown', handler);
  return () => {
   document.removeEventListener('mousedown', handler);
  };
 }, [handleClickOutside]);
};

export default useOutsideClick;
