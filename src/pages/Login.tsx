
import React, { useState } from "react";
import { useNavigate, Link } from "react-router";

const Login: React.FC = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (
    event: React.FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();

    setError("");

    if (!email.trim()) {
      setError("Please enter your email.");
      return;
    }

    if (!password) {
      setError("Please enter your password.");
      return;
    }

    if (password.length < 8) {
      setError("Password must be at least 8 characters.");
      return;
    }

    try {
      setIsLoading(true);

      const response = await fetch(
        "http://localhost:5000/api/auth/login",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email,
            password,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        setError(data.message || "Unable to log in.");
        return;
      }

      // Save the logged-in user
      localStorage.setItem(
        "importhub_user",
        JSON.stringify(data.user)
      );

      navigate("/dashboard", { replace: true });
    } catch (error) {
      console.error("Login error:", error);
      setError("Unable to connect to the server.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-[#E8DEFF]">
      <div className="mx-auto flex min-h-screen w-full max-w-md items-center px-5 py-10">
        <div className="w-full rounded-2xl bg-white p-7 shadow-[0_12px_40px_rgba(28,26,36,0.08)] sm:p-8">
          <div className="mb-7">
            <h1 className="text-[25px] font-semibold tracking-[-0.03em] text-[#1C1A24]">
              Welcome back
            </h1>

            <p className="mt-1.5 text-[13px] text-[#6B6478]">
              Log in to manage your ImportHub store.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label
                htmlFor="email"
                className="mb-1.5 block text-[12.5px] font-medium text-[#1C1A24]"
              >
                Email
              </label>

              <input
                id="email"
                type="email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                placeholder="you@example.com"
                className="w-full rounded-xl border border-[#E3DEEA] bg-white px-3.5 py-3 text-[13px] text-[#1C1A24] outline-none transition focus:border-[#5B3DF5] focus:ring-2 focus:ring-[#5B3DF5]/10"
              />
            </div>

            <div>
              <label
                htmlFor="password"
                className="mb-1.5 block text-[12.5px] font-medium text-[#1C1A24]"
              >
                Password
              </label>

              <input
                id="password"
                type="password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                placeholder="Enter your password"
                className="w-full rounded-xl border border-[#E3DEEA] bg-white px-3.5 py-3 text-[13px] text-[#1C1A24] outline-none transition focus:border-[#5B3DF5] focus:ring-2 focus:ring-[#5B3DF5]/10"
              />
            </div>

            {error && (
              <p className="rounded-lg bg-red-50 px-3 py-2.5 text-[12px] text-red-600">
                {error}
              </p>
            )}

            <button
              type="submit"
              disabled={isLoading}
              className="w-full rounded-xl bg-[#5B3DF5] px-4 py-3 text-[13.5px] font-medium text-white transition hover:bg-[#4c32d9] disabled:cursor-not-allowed disabled:opacity-60"
            >
              {isLoading ? "Logging in..." : "Log in"}
            </button>
          </form>

          <p className="mt-6 text-center text-[12.5px] text-[#6B6478]">
            Don't have an account?{" "}
            <Link
              to="/signup"
              className="font-medium text-[#5B3DF5] hover:underline"
            >
              Create one
            </Link>
          </p>
        </div>
      </div>
    </main>
  );
};

export default Login;

