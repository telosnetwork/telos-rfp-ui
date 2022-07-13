import { AuthProvider } from '@contexts/AuthContext';
import { HeaderMain } from '@components/HeaderMain';
import { Footer } from '@components/Footer';

export function MainLayout({ children }) {
  return (
    <AuthProvider>
      <HeaderMain />
      <main className="min-h-[calc(100vh-4.5rem-4.25rem)]">{children}</main>
      <Footer />
    </AuthProvider>
  );
}
