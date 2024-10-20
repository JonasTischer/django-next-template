'use client';

import { AuthProvider } from '@/components/auth-provider';
import {
  SidebarProvider,
  SidebarTrigger,
} from '@/components/ui/sidebar';
import { AppSidebar } from '@/components/app-sidebar';
import {
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query';
import { SiteHeader } from '@/components/site-header';

const queryClient = new QueryClient();

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SidebarProvider>
      <AppSidebar />
      <QueryClientProvider client={queryClient}>
        <AuthProvider>
          <SidebarTrigger />
          <SiteHeader />
          {children}
        </AuthProvider>
      </QueryClientProvider>
    </SidebarProvider>
  );
}
