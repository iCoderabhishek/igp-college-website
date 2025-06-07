"use client";
import { useState, useEffect } from "react";
import { auth } from "@/firebase"; // Import auth from your initialized firebase config
import {
  isSignInWithEmailLink,
  signInWithEmailLink,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { useRouter } from "next/navigation";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    // Now you don't need getAuth() here, you can use the imported auth
    if (isSignInWithEmailLink(auth, window.location.href)) {
      const storedEmail = window.localStorage.getItem("emailForSignIn");
      if (storedEmail) {
        // Complete the sign-in with the link
        signInWithEmailLink(auth, storedEmail, window.location.href)
          .then((result) => {
            window.localStorage.removeItem("emailForSignIn");
            console.log("Logged in as:", result.user.email);
            router.push("/admin");
            // Handle successful sign-in (redirect, show dashboard, etc.)
          })
          .catch((error) => {
            setError(error.message);
            console.error("Error completing sign-in:", error);
          });
      } else {
        // Ask the user to provide the email if it's not stored
        const emailFromUser = prompt(
          "Please provide your email for confirmation"
        );
        if (emailFromUser) {
          signInWithEmailLink(auth, emailFromUser, window.location.href)
            .then((result) => {
              window.localStorage.removeItem("emailForSignIn");
              console.log("Logged in as:", result.user.email);
              router.push("/admin");
              // Handle successful sign-in
            })
            .catch((error) => {
              setError(error.message);
            });
        }
      }
    }
  }, [router]);

  const handleLogin = async (e: any) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      // Use the imported auth here
      if (!isSignInWithEmailLink(auth, window.location.href)) {
        await signInWithEmailAndPassword(auth, email, password);
        console.log("Logged in as:", email);
        // Redirect to dashboard or another page after successful login
        router.push("/admin");
      }
    } catch (err: any) {
      setError("Invalid credentials");
      console.error("Login failed:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100 px-4">
      <div className="w-full max-w-md rounded-xl bg-white p-8 shadow-md">
        <h2 className="mb-6 text-2xl font-semibold text-center text-gray-800">
          Institutional Admin Login
        </h2>
        <form onSubmit={handleLogin}>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-1 w-full rounded border px-3 py-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="admin@college.edu"
            />
          </div>

          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700">
              Password
            </label>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-1 w-full rounded border px-3 py-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="••••••••"
            />
          </div>

          {error && <p className="mb-4 text-sm text-red-600">{error}</p>}

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded bg-blue-600 py-2 text-white hover:bg-blue-700 disabled:opacity-50"
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>
      </div>
    </div>
  );
}
