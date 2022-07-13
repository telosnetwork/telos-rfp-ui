import { createContext, useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/router';
import {
  createSession,
  removeSession,
  restoreSession,
} from '@services/anchorLinkService';
import { getPermissionService } from '@services/configs/getPermissionService';

export const AuthContext = createContext({});

export function AuthProvider({ children }) {
  const router = useRouter();

  const [user, setUser] = useState();
  const [isAdministrator, setIsAdministrator] = useState();
  const [isProgramManager, setIsProgramManager] = useState();
  const [isAuthenticated, setIsAuthenticated] = useState();

  const handlePermissions = useCallback(async (loggedUser) => {
    try {
      const { isAdministrator, isProgramManager } = await getPermissionService({
        user: loggedUser,
      });

      setUser(loggedUser);
      setIsAuthenticated(true);
      setIsAdministrator(isAdministrator);
      setIsProgramManager(isProgramManager);
    } catch (error) {
      console.log(error);
    }
  }, []);

  const signIn = useCallback(async () => {
    try {
      await createSession();
      router.reload();
    } catch (error) {
      console.error(error);
    }
  }, [router]);

  const signOut = useCallback(async () => {
    try {
      await removeSession();

      setUser('');
      setIsAuthenticated(false);
      setIsAdministrator(false);
      setIsProgramManager(false);
      router.reload();
    } catch (error) {
      console.error(error);
    }
  }, [router]);

  useEffect(() => {
    (async () => {
      const { user } = await restoreSession();
      if (user) {
        await handlePermissions(user);
      } else {
        setUser('');
        setIsAuthenticated(false);
        setIsAdministrator(false);
        setIsProgramManager(false);
      }
    })();
  }, [handlePermissions]);

  return (
    <AuthContext.Provider
      value={{
        user,
        isAdministrator,
        isProgramManager,
        isAuthenticated,
        signIn,
        signOut,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
