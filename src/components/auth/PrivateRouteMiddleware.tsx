"use client";
import { useEffect, useState } from "react";
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
  const { user, logout } = useAuthStore();
  const router = useRouter();
  const isHydrated = useHydratedStore();
  const [isChecking, setIsChecking] = useState(true);

  useEffect(() => {
    if (!isHydrated) return;

    const verifyToken = async () => {
      if (!user?.token) {
        logout();
        router.push("/auth/login");
        return;
      }

      try {
        const res = await fetch("/api/auth/verify", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ token: user.token }),
        });

        const data = await res.json();

        if (!data.valid) {
          logout();
          router.push("/auth/login");
        } else if (requiredRole && data.user.role !== requiredRole) {
          router.push("/");
        }
      } catch (err) {
        console.error("Token verification error:", err);
        logout();
        router.push("/auth/login");
      } finally {
        setIsChecking(false);
      }
    };

    verifyToken();
  }, [isHydrated, user, logout, router, requiredRole]);

  if (!isHydrated || isChecking) return <Loader />;
  if (!user) return null;

  return <>{children}</>;
}
