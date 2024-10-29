import Link from 'next/link';
export default function NotFound() {
 return (
  <div className="flex min-h-[100dvh] flex-col items-center justify-center gap-6 px-4 py-12 text-center md:px-6">
   <div className="space-y-2">
    <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
     Page Not Found
    </h1>
    <p className="max-w-[420px] text-gray-500 dark:text-gray-400 md:text-xl">
     The page you&apos;re looking for doesn&apos;t exist or has been moved.
    </p>
   </div>
   <Link
    href="/"
    className="inline-flex h-10 items-center justify-center rounded-md bg-gray-900 px-6 text-sm font-medium text-gray-50 shadow transition-colors hover:bg-gray-900/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gray-950 disabled:pointer-events-none disabled:opacity-50 dark:bg-gray-50 dark:text-gray-900 dark:hover:bg-gray-50/90 dark:focus-visible:ring-gray-300"
    prefetch={false}
   >
    Back to Home
   </Link>
  </div>
 );
}
