import { useEffect, useState } from "react";
import { onAuthStateChanged, User } from "firebase/auth";
import { auth } from "@/firebase";
import { useRouter } from "next/navigation";
import { usePathname } from "next/navigation"; // Import usePathname

export function useAdminAuth() {
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<User | null>(null);
  const router = useRouter();
  const pathname = usePathname(); // Use usePathname to get the current path

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
      setLoading(false);

      // Only redirect to /login if the user is not authenticated and the route is an admin route
      if (!user && pathname.startsWith("/admin")) {
        router.push("/login");
      }
    });

    return () => unsubscribe();
  }, [pathname]); // Add `pathname` as dependency to trigger the effect on path change

  return { user, loading };
}
