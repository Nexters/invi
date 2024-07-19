import { GlobalAlert } from "~/components/global-alert";
import Providers from "~/components/providers";
import { Toaster } from "~/components/ui/sonner";

export default async function AppLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Providers>
      {children}
      <Toaster />
      <GlobalAlert />
    </Providers>
  );
}
