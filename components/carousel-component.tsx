import * as React from 'react';
import {
 Carousel,
 CarouselContent,
 CarouselItem,
 CarouselNext,
 CarouselPrevious,
} from '@/components/ui/carousel';

// eslint-disable-next-line @typescript-eslint/ban-types
type ICarouselProps<T extends {}> = React.ComponentProps<typeof Carousel> & {
 items: T[];
 loaderComponent?: React.ElementType;
 component: React.ComponentType<T>;
 isLoading: boolean;
};
const DefaultLoader: React.FC = () => <div>Loading...</div>;

// eslint-disable-next-line @typescript-eslint/ban-types
export default function CarouselComponent<T extends {}>({
 component: Component,
 loaderComponent: Loader = DefaultLoader,
 isLoading,
 items,
 ...props
}: ICarouselProps<T>) {
 return (
  <Carousel
   className="w-full space-y-3"
   opts={{
    loop: true,
   }}
   {...props}
  >
   <CarouselContent className="-ml-1">
    {isLoading
     ? Array.from({
        length: 5,
       }).map((_, i) => (
        <CarouselItem
         key={i + '12345'}
         className="pl-1 md:basis-1/2 lg:basis-1/3"
        >
         <div className="p-1">
          <Loader key={'loader' + i} />
         </div>
        </CarouselItem>
       ))
     : items?.map((item, index) => (
        <CarouselItem
         key={index + '12345'}
         className="pl-1 md:basis-1/2 lg:basis-1/3"
        >
         <div className="p-1">
          <Component {...item} />
         </div>
        </CarouselItem>
       ))}
   </CarouselContent>
   {items?.length !== 0 && (
    <div className="flex w-full items-center justify-center gap-x-3">
     <CarouselPrevious
      className="relative left-0 top-0 size-12 -translate-y-0 bg-primary text-white"
      iconClassName="size-6"
     />
     <CarouselNext
      className="relative right-0 top-0 size-12 -translate-y-0 bg-primary text-white"
      iconClassName="size-6"
     />
    </div>
   )}
  </Carousel>
 );
}
