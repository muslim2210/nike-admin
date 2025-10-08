"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/store/useAuthStore";
import Loader from "@/components/ui/Loader";
import { useHydratedStore } from "@/hooks/useHydratedStore";

interface PrivateRouteProps {
  children: React.ReactNode;
  requiredRole?: "ADMIN" | "CUSTOMER";
}

export default function PrivateRouteMiddleware({
  children,
  requiredRole,
}: PrivateRouteProps) {
  const user = useAuthStore((s) => s.user);
  const router = useRouter();
  const isHydrated = useHydratedStore(); // pakai hook di atas

  // redirect kalau sudah hydrated
  useEffect(() => {
    if (!isHydrated) return; // tunggu dulu

    if (!user) {
      router.push("/auth/login");
    } else if (requiredRole && user.role !== requiredRole) {
      router.push("/");
    }
  }, [isHydrated, user, router, requiredRole]);

  // tampilkan loader sementara hydration
  if (!isHydrated) return <Loader />;

  if (!user) return null;
  if (requiredRole && user.role !== requiredRole) return null;

  return <>{children}</>;
}
