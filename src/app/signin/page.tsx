"use client";

import React, { useEffect, useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/outline";
import Button from "@/components/Button";
import { motion } from "framer-motion";
import SelectField from "@/components/SelectField";

const SignInPage: React.FC = () => {
  const { login, user } = useAuth();
  const router = useRouter();

  const [email, setEmail] = useState<string>("admin2@example.com");
  const [password, setPassword] = useState<string>("password123");
  const [error, setError] = useState<string>("");
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);

  const demoUsers = [
    { role: "Admin", email: "admin@example.com", password: "password123" },
    { role: "Manager", email: "manager@example.com", password: "password123" },
    { role: "Staff", email: "staff@example.com", password: "password123" },
  ];

  const handleUserSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedUser = demoUsers.find(
      (user) => user.email === e.target.value
    );
    if (selectedUser) {
      setEmail(selectedUser.email);
      setPassword(selectedUser.password);
    }
  };

  useEffect(() => {
    if (user) {
      router.push("/dashboard");
    }
  }, [user, router]);

  const handleSubmit = async (e: React.FormEvent): Promise<void> => {
    e.preventDefault();
    setLoading(true);

    try {
      await login(email, password);
    } catch (err) {
      setError(
        "Invalid email or password. Please check your credentials and try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen overflow-hidden dark:bg-gray-900">
      <motion.svg
        aria-hidden="true"
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, ease: "easeInOut" }}
        className="absolute inset-x-0 top-0 -z-10 min-h-screen w-full stroke-gray-200 
                   [mask-image:radial-gradient(64rem_64rem_at_center,white,transparent)]"
      >
        <defs>
          <pattern
            x="50%"
            y={-1}
            id="1f932ae7-37de-4c0a-a8b0-a6e3b4d44b84"
            width={200}
            height={200}
            patternUnits="userSpaceOnUse"
          >
            <path d="M.5 200V.5H200" fill="none" />
          </pattern>
        </defs>
        <svg x="50%" y={-1} className="overflow-visible fill-gray-50">
          <path
            d="M-200 0h201v201h-201Z M600 0h201v201h-201Z M-400 600h201v201h-201Z M200 800h201v201h-201Z"
            strokeWidth={0}
          />
        </svg>
        <rect
          fill="url(#1f932ae7-37de-4c0a-a8b0-a6e3b4d44b84)"
          width="100%"
          height="100%"
          strokeWidth={0}
        />
      </motion.svg>
      <div className="w-full max-w-md space-y-4">
        <div className="bg-indigo-50 p-4 rounded-lg border border-indigo-100">
          <h2 className="text-indigo-800 font-semibold mb-1">
            Explore with a Demo Account
          </h2>
          <p className="text-indigo-600 text-sm">
            Try a demo account – Select a role to pre-fill login details.
          </p>
          <SelectField
            id="demoUser"
            name="demoUser"
            label=""
            value={email}
            onChange={handleUserSelect}
            options={[
              { value: "", label: "Select a role to log in as…" },
              ...demoUsers.map((user) => ({
                value: user.email,
                label: `${user.role} (${user.email})`,
              })),
            ]}
          />
        </div>

        <div className="w-full p-8 bg-white rounded shadow">
          <div className="mb-6">
            <h1 className="text-2xl font-bold">Unit Manager</h1>
            <p className="text-gray-600 mt-2">Sign in to access your account</p>
          </div>
          {error && <p className="text-red-500 mb-2">{error}</p>}

          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label htmlFor="email" className="block text-sm font-bold mb-2">
                Email
              </label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-3 py-2 border rounded"
                placeholder="Enter your email"
                required
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="password"
                className="block text-sm font-bold mb-2"
              >
                Password
              </label>
              <div className="relative">
                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-3 py-2 border rounded"
                  placeholder="Enter your password"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-3 flex items-center text-gray-500"
                  title={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? (
                    <EyeSlashIcon className="h-5 w-5" />
                  ) : (
                    <EyeIcon className="h-5 w-5" />
                  )}
                </button>
              </div>
            </div>
            <Button type="submit" loading={loading} className="w-full">
              Sign In
            </Button>
          </form>
        </div>
        <div>
          <Link href="/" className="text-sm/6 font-semibold text-indigo-600">
            <span aria-hidden="true">&larr;</span> Return to Home
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SignInPage;
