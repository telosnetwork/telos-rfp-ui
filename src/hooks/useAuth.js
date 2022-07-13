import { useContext } from 'react';
import { AuthContext } from '@contexts/AuthContext';

export function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error('useAuth must be used with an AuthProvider');
  }

  return context;
}
