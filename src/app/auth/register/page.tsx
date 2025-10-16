"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
// import { set } from "zod";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import Image from "next/image";

export default function RegisterPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [error, setError] = useState("");
  const router = useRouter();

  const [loading, setLoading] = useState(false);

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    try {
      setLoading(true);
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password, role: 'ADMIN' }),
      });

      const data = await res.json();
      if (res.ok) {
        alert("Registrasi berhasil! Silakan login.");
        router.push("/auth/login");
      } else {
        alert(data.error || "Gagal registrasi");
      }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      console.error(err);
      setError("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100 p-5">
      <form
        onSubmit={handleRegister}
        className="bg-white shadow-md rounded-md p-6 w-full md:w-[400px]"
      >
        <div className="mb-4 w-full flex justify-center">
          <Image src='/logo.svg' alt="Logo" width={100} height={100} />
        </div>
        <h1 className="text-xl font-bold text-left mb-4">Register</h1>
        {error && <p className="text-red-500 text-sm">{error}</p>}

        <input
          type="text"
          placeholder="Name"
          className="w-full border p-2 mb-3 rounded-md"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <input
          type="email"
          placeholder="Email"
          className="w-full border p-2 mb-3 rounded-md"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Password"
          className="w-full border p-2 mb-3 rounded-md"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <Button
          type="submit"
          className="w-full bg-primary text-white py-2 rounded hover:bg-primary/80 my-5"
          disabled={loading}
        >
          {loading ? "Loading..." : "Register"}
        </Button>
        <span className="text-xs text-gray-700">Sudah punya akun? <Link href="/auth/login" className="text-blue-500 underline">Login</Link></span>
      </form>
    </div>
  );
}
