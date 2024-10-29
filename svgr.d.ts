declare module '*.svg' {
 import type { FC, SVGProps } from 'react';
 const content: FC<SVGProps<SVGElement>>;
 export default content;
}

declare module '*.svg?url' {
 // eslint-disable-next-line @typescript-eslint/no-explicit-any
 const content: any;
 export default content;
}
