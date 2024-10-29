'use client';
import * as React from 'react';
import {
 Tooltip,
 TooltipContent,
 TooltipProvider,
 TooltipTrigger,
} from '@/components/ui/tooltip';
import { cn } from '@/lib/utils';
import { ArrowBigUpDash, EyeIcon, EyeOffIcon } from 'lucide-react';

export interface InputProps
 extends React.InputHTMLAttributes<HTMLInputElement> {
 Icon?: React.ComponentType<React.SVGProps<SVGSVGElement>>;
 mainContainerClassName?: string;
 iconPosition?: 'start' | 'end' | 'none';
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
 (
  {
   Icon,
   className,
   type,
   mainContainerClassName,
   iconPosition = 'none',
   ...props
  },
  ref
 ) => {
  const [showPassword, setShowPassword] = React.useState(false);
  const [capsLockActive, setCapsLockActive] = React.useState(false);

  const handleKeyPress: React.KeyboardEventHandler<
   HTMLInputElement
  > = event => {
   const capsLockOn = event.getModifierState('CapsLock');
   setCapsLockActive(capsLockOn);
  };

  const togglePasswordVisibility = () => setShowPassword(!showPassword);

  const inputClasses = cn(
   'flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 peer',
   iconPosition === 'start' && 'pl-8',
   iconPosition === 'end' && 'pr-10',
   type === 'password' && (!capsLockActive ? 'pr-8' : 'pr-16'),
   className
  );

  return (
   <div className={cn('group relative', mainContainerClassName)}>
    <input
     type={type === 'password' && showPassword ? 'text' : type}
     className={inputClasses}
     onKeyDown={handleKeyPress}
     ref={ref}
     {...props}
    />
    {type === 'password' && (
     <div className="absolute right-0 top-1/2 flex -translate-y-1/2 items-center gap-x-1 pr-3">
      {showPassword ? (
       <EyeOffIcon
        className="cursor-pointer group-focus:text-primary"
        onClick={togglePasswordVisibility}
        size={20}
       />
      ) : (
       <EyeIcon
        className="cursor-pointer group-focus:text-primary"
        onClick={togglePasswordVisibility}
        size={20}
       />
      )}
      {capsLockActive && type === 'password' && (
       <TooltipProvider>
        <Tooltip>
         <TooltipTrigger asChild>
          <ArrowBigUpDash size={20} />
         </TooltipTrigger>
         <TooltipContent>
          <p>Caps Lock is on!</p>
         </TooltipContent>
        </Tooltip>
       </TooltipProvider>
      )}
     </div>
    )}
    {Icon && (
     <div
      className={cn(
       'pointer-events-none absolute inset-y-0 flex items-center group-focus:text-primary peer-focus:text-primary',
       {
        'left-0 pl-3': iconPosition === 'start',
        'right-0 pr-3': iconPosition === 'end',
       }
      )}
     >
      <Icon className="size-4" />
     </div>
    )}
   </div>
  );
 }
);
Input.displayName = 'Input';

export { Input };
