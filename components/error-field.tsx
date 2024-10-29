import { ShieldAlert } from 'lucide-react';
const ErrorField = ({ error }: { error: string | null }) => {
 return (
  <>
   {' '}
   {error && (
    <span className="inline-flex items-center pt-[-8px] text-[12px] text-destructive">
     <ShieldAlert className="mr-[5px] size-4" />
     {error}
    </span>
   )}
  </>
 );
};

export default ErrorField;
