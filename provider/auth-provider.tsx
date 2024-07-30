'use client';
// import { IClinic, IUser } from '@/types';
import { type ReactNode, createContext } from 'react';

export interface IAuthContext {
 user: string[]| undefined;
 clinic: string[]| undefined;
 token: string | undefined;
}

export const AuthContext = createContext<IAuthContext | null>(null);

interface AuthProviderProps {
 session: IAuthContext | undefined;
 children: ReactNode;
}

const AuthProvider: React.FC<AuthProviderProps> = ({ session, children }) => {
 const contextValue = session ?? {
  user: undefined,
  clinic: undefined,
  token: undefined,
 };
 //  const { subscribe } = usePushNotification();
 //  useEffect(() => {
 //   if (session?.user) {
 //   }
 //  }, [session]);
 return (
  <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
 );
};

export default AuthProvider;
