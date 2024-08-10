'use client';

import {
 Command,
 CommandList,
 CommandInput,
 CommandItem,
 CommandGroup,
 CommandEmpty,
 CommandSeparator,
} from '@/components/ui/command';
import { cn } from '@/lib/utils';
import React, { KeyboardEvent, useCallback, useRef, useState } from 'react';

export type Option = {
 value: string;
 label: string;
} & Record<string, string>;

export type GroupOption = {
 heading: string;
 option: Option[];
};

type SearchCompleteProps =
 | { type: 'option'; options: Option[] }
 | { type: 'group'; options: GroupOption[] };

export default function SearchComplete({
 options,
 type,
 placeholder = 'Search here....',
 onSelect,
}: SearchCompleteProps & {
 onSelect?: (value: string) => void;
 placeholder?: string;
}) {
 const inputRef = useRef<HTMLInputElement>(null);
 const [isOpen, setOpen] = useState(true);
 const [inputValue, setInputValue] = useState('');

 const handleKeyDown = useCallback(
  (event: KeyboardEvent<HTMLDivElement>) => {
   const input = inputRef.current;
   if (!input) return;

   if (!isOpen) setOpen(true);

   if (event.key === 'Enter' && input.value !== '') {
    let optionToSelect: Option | null = null;

    if (type === 'option') {
     optionToSelect =
      options.find(option => option.label === input.value) || null;
    } else if (type === 'group') {
     // Search within grouped options
     for (const group of options as GroupOption[]) {
      optionToSelect =
       group.option.find(opt => opt.label === input.value) || null;
      if (optionToSelect) break;
     }
    }

    if (optionToSelect) {
     setInputValue(optionToSelect.label);
     setOpen(false);
    }
   }

   if (event.key === 'Escape') {
    input.blur();
   }
  },
  [isOpen, options, type]
 );
 const handleSelect = (val: string) => {
  setInputValue(val);
  setOpen(false);
  onSelect?.(val);
 };

 const handleBlur = useCallback(() => {
  setOpen(false);
 }, []);

 return (
  <Command
   onKeyDown={handleKeyDown}
   className={cn('shadcn_cmdk relative h-auto overflow-y-auto', {
    'h-[300px]': isOpen,
   })}
  >
   <div className="sticky left-0 top-0">
    <CommandInput
     placeholder={placeholder}
     ref={inputRef}
     onBlur={handleBlur}
     value={inputValue}
     onFocus={() => setOpen(true)}
     onValueChange={setInputValue}
    />
   </div>
   <div className="relative mt-0">
    <div
     className={cn(
      'absolute top-0 z-30 hidden h-full w-full outline-none animate-in fade-in-0 zoom-in-95',
      { block: isOpen }
     )}
    >
     <CommandList className="">
      <CommandEmpty>No results found.</CommandEmpty>
      {type === 'option' && options.length > 0 && (
       <CommandGroup>
        {options.map(option => (
         <CommandItem
          key={option.value}
          value={option.label}
          onSelect={val => handleSelect(val)}
          onMouseDown={event => {
           event.preventDefault();
          }}
          className="flex w-full items-center gap-2"
         >
          {option.label}
         </CommandItem>
        ))}
       </CommandGroup>
      )}
      {type === 'group' &&
       options.length > 0 &&
       (options as GroupOption[]).map((group, groupIndex) => (
        <React.Fragment key={group.heading + groupIndex}>
         <CommandGroup heading={group.heading}>
          {group.option.map(opt => (
           <CommandItem
            key={opt.value}
            value={opt.label}
            onSelect={val => handleSelect(val)}
            onMouseDown={event => {
             event.preventDefault();
            }}
            className="flex w-full items-center gap-2"
           >
            {opt.label}
           </CommandItem>
          ))}
         </CommandGroup>
         <CommandSeparator />
        </React.Fragment>
       ))}
     </CommandList>
    </div>
   </div>
  </Command>
 );
}
