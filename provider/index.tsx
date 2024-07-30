import { useState, type ReactNode } from "react"
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ThemeProvider } from "@/components/theme-provider";
import AuthProvider, { type IAuthContext } from "./auth-provider";
const Provider = ({children,session}:{children:ReactNode, session: IAuthContext | undefined;}) => {
 const [queryClient] = useState(() => new QueryClient());

  return (
      <ThemeProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange>
    <QueryClientProvider client={queryClient}>
    <AuthProvider session={session}>{children}</AuthProvider>
   </QueryClientProvider>
   </ThemeProvider>
  )
}

export default Provider