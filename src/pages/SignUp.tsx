
import React, { useState } from "react";
import { Link, useNavigate } from "react-router";

interface FormState {
  fullName: string;
  businessName: string;
  email: string;
  password: string;
  confirmPassword: string;
}

const initialState: FormState = {
  fullName: "",
  businessName: "",
  email: "",
  password: "",
  confirmPassword: "",
};

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const EyeIcon: React.FC<{ open: boolean }> = ({ open }) =>
  open ? (
    <svg
      width="17"
      height="17"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
    >
      <path d="M17.94 17.94A10.94 10.94 0 0 1 12 20c-7 0-10-8-10-8a18.3 18.3 0 0 1 4.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 10 8 10 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24" />
      <line x1="1" y1="1" x2="23" y2="23" />
    </svg>
  ) : (
    <svg
      width="17"
      height="17"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
    >
      <path d="M1 12s3-8 11-8 11 8 11 8-3 8-11 8-11-8-11-8Z" />
      <circle cx="12" cy="12" r="3" />
    </svg>
  );

const SignUp: React.FC = () => {
  const navigate = useNavigate();

  const [form, setForm] = useState<FormState>(initialState);

  const [errors, setErrors] = useState<
    Partial<Record<keyof FormState, string>>
  >({});

  const [formError, setFormError] = useState<string | null>(null);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const updateField = (field: keyof FormState, value: string) => {
    setForm((prev) => ({
      ...prev,
      [field]: value,
    }));

    setErrors((prev) => ({
      ...prev,
      [field]: undefined,
    }));

    setFormError(null);
  };

  const validate = (): boolean => {
    const nextErrors: Partial<Record<keyof FormState, string>> = {};

    if (!form.fullName.trim()) {
      nextErrors.fullName = "Enter your full name.";
    }

    if (!form.businessName.trim()) {
      nextErrors.businessName = "Enter your business name.";
    }

    if (!form.email.trim()) {
      nextErrors.email = "Enter your email address.";
    } else if (!emailPattern.test(form.email.trim())) {
      nextErrors.email = "Enter a valid email address.";
    }

    if (!form.password) {
      nextErrors.password = "Create a password.";
    } else if (form.password.length < 8) {
      nextErrors.password = "Password must be at least 8 characters.";
    }

    if (!form.confirmPassword) {
      nextErrors.confirmPassword = "Confirm your password.";
    } else if (form.confirmPassword !== form.password) {
      nextErrors.confirmPassword = "Passwords do not match.";
    }

    setErrors(nextErrors);

    return Object.keys(nextErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setFormError(null);

    if (!validate()) return;

    setIsSubmitting(true);

    try {
      const response = await fetch(
        "http://localhost:5000/api/auth/register",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            fullName: form.fullName.trim(),
            businessName: form.businessName.trim(),
            email: form.email.trim(),
            password: form.password,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        setFormError(
          data.message || "Something went wrong. Please try again."
        );
        return;
      }

      navigate("/login");
    } catch (error) {
      console.error("Registration request failed:", error);

      setFormError(
        "Unable to connect to the server. Please make sure the backend is running."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#E8DEFF] lg:flex lg:items-stretch">
      {/* Left — Branding */}
      <div className="hidden lg:flex lg:w-1/2 lg:flex-col lg:justify-center lg:px-16 xl:px-24">
        <div>
          <p className="text-[13px] font-semibold tracking-[0.08em] text-[#5B3DF5]">
            IMPORTHUB
          </p>

          <h1 className="mt-5 max-w-md text-[2.6rem] font-semibold leading-[1.15] tracking-tight text-[#1C1A24]">
            Source from China, without the guesswork.
          </h1>

          <p className="mt-5 max-w-sm text-[15px] leading-relaxed text-[#6B6478]">
            One place to manage suppliers, orders, and shipments for your
            import business — built for people who move product, not
            paperwork.
          </p>

          <ul className="mt-9 space-y-3">
            {[
              "Track every order from factory to doorstep",
              "Keep supplier contacts and pricing in one place",
              "See shipment status without chasing updates",
            ].map((point) => (
              <li
                key={point}
                className="flex items-start gap-2.5 text-[14px] text-[#453F52]"
              >
                <span className="mt-2 h-1 w-1 flex-shrink-0 rounded-full bg-[#5B3DF5]" />
                {point}
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Right — Form */}
      <div className="flex flex-col justify-center px-5 py-10 sm:px-8 sm:py-14 lg:w-1/2 lg:px-16 lg:py-16 xl:px-24">
        <div className="mx-auto w-full max-w-md">
          {/* Mobile Header */}
          <div className="mb-7 lg:hidden">
            <p className="text-[12px] font-semibold tracking-[0.08em] text-[#5B3DF5]">
              IMPORTHUB
            </p>

            <h1 className="mt-2 text-[1.5rem] font-semibold leading-snug tracking-tight text-[#1C1A24]">
              Source from China, without the guesswork.
            </h1>
          </div>

          {/* Form Card */}
          <div className="rounded-2xl bg-white p-6 shadow-[0_1px_2px_rgba(28,26,36,0.04),0_12px_28px_rgba(91,61,245,0.08)] sm:p-8">
            <h2 className="text-[1.3rem] font-semibold tracking-tight text-[#1C1A24]">
              Create your account
            </h2>

            <p className="mt-1.5 text-[13.5px] text-[#6B6478]">
              Set up ImportHub for your business in a couple of minutes.
            </p>

            <form
              onSubmit={handleSubmit}
              noValidate
              className="mt-7 space-y-4"
            >
              {/* Full Name */}
              <div>
                <label
                  htmlFor="fullName"
                  className="text-[13px] font-medium text-[#453F52]"
                >
                  Full name
                </label>

                <input
                  id="fullName"
                  type="text"
                  autoComplete="name"
                  value={form.fullName}
                  onChange={(e) =>
                    updateField("fullName", e.target.value)
                  }
                  aria-invalid={Boolean(errors.fullName)}
                  className="mt-1.5 h-[50px] w-full rounded-lg border border-[#E3DEEA] bg-white px-3.5 text-[14.5px] text-[#1C1A24] outline-none transition-colors placeholder:text-[#A9A2B8] focus:border-[#5B3DF5] focus:ring-[3px] focus:ring-[#5B3DF5]/15"
                  placeholder="Chidi Okafor"
                />

                {errors.fullName && (
                  <p className="mt-1 text-[12px] text-red-600">
                    {errors.fullName}
                  </p>
                )}
              </div>

              {/* Business Name */}
              <div>
                <label
                  htmlFor="businessName"
                  className="text-[13px] font-medium text-[#453F52]"
                >
                  Business name
                </label>

                <input
                  id="businessName"
                  type="text"
                  value={form.businessName}
                  onChange={(e) =>
                    updateField("businessName", e.target.value)
                  }
                  aria-invalid={Boolean(errors.businessName)}
                  className="mt-1.5 h-[50px] w-full rounded-lg border border-[#E3DEEA] bg-white px-3.5 text-[14.5px] text-[#1C1A24] outline-none transition-colors placeholder:text-[#A9A2B8] focus:border-[#5B3DF5] focus:ring-[3px] focus:ring-[#5B3DF5]/15"
                  placeholder="Okafor Imports Ltd"
                />

                {errors.businessName && (
                  <p className="mt-1 text-[12px] text-red-600">
                    {errors.businessName}
                  </p>
                )}
              </div>

              {/* Email */}
              <div>
                <label
                  htmlFor="email"
                  className="text-[13px] font-medium text-[#453F52]"
                >
                  Email address
                </label>

                <input
                  id="email"
                  type="email"
                  autoComplete="email"
                  value={form.email}
                  onChange={(e) =>
                    updateField("email", e.target.value)
                  }
                  aria-invalid={Boolean(errors.email)}
                  className="mt-1.5 h-[50px] w-full rounded-lg border border-[#E3DEEA] bg-white px-3.5 text-[14.5px] text-[#1C1A24] outline-none transition-colors placeholder:text-[#A9A2B8] focus:border-[#5B3DF5] focus:ring-[3px] focus:ring-[#5B3DF5]/15"
                  placeholder="you@business.com"
                />

                {errors.email && (
                  <p className="mt-1 text-[12px] text-red-600">
                    {errors.email}
                  </p>
                )}
              </div>

              {/* Password */}
              <div>
                <label
                  htmlFor="password"
                  className="text-[13px] font-medium text-[#453F52]"
                >
                  Password
                </label>

                <div className="relative mt-1.5">
                  <input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    autoComplete="new-password"
                    value={form.password}
                    onChange={(e) =>
                      updateField("password", e.target.value)
                    }
                    aria-invalid={Boolean(errors.password)}
                    className="h-[50px] w-full rounded-lg border border-[#E3DEEA] bg-white px-3.5 pr-11 text-[14.5px] text-[#1C1A24] outline-none transition-colors placeholder:text-[#A9A2B8] focus:border-[#5B3DF5] focus:ring-[3px] focus:ring-[#5B3DF5]/15"
                    placeholder="Create a password"
                  />

                  <button
                    type="button"
                    onClick={() =>
                      setShowPassword((prev) => !prev)
                    }
                    aria-label={
                      showPassword ? "Hide password" : "Show password"
                    }
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-[#8C8498] transition-colors hover:text-[#5B3DF5]"
                  >
                    <EyeIcon open={showPassword} />
                  </button>
                </div>

                {errors.password && (
                  <p className="mt-1 text-[12px] text-red-600">
                    {errors.password}
                  </p>
                )}
              </div>

              {/* Confirm Password */}
              <div>
                <label
                  htmlFor="confirmPassword"
                  className="text-[13px] font-medium text-[#453F52]"
                >
                  Confirm password
                </label>

                <div className="relative mt-1.5">
                  <input
                    id="confirmPassword"
                    type={
                      showConfirmPassword ? "text" : "password"
                    }
                    autoComplete="new-password"
                    value={form.confirmPassword}
                    onChange={(e) =>
                      updateField(
                        "confirmPassword",
                        e.target.value
                      )
                    }
                    aria-invalid={Boolean(errors.confirmPassword)}
                    className="h-[50px] w-full rounded-lg border border-[#E3DEEA] bg-white px-3.5 pr-11 text-[14.5px] text-[#1C1A24] outline-none transition-colors placeholder:text-[#A9A2B8] focus:border-[#5B3DF5] focus:ring-[3px] focus:ring-[#5B3DF5]/15"
                    placeholder="Confirm your password"
                  />

                  <button
                    type="button"
                    onClick={() =>
                      setShowConfirmPassword((prev) => !prev)
                    }
                    aria-label={
                      showConfirmPassword
                        ? "Hide password"
                        : "Show password"
                    }
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-[#8C8498] transition-colors hover:text-[#5B3DF5]"
                  >
                    <EyeIcon open={showConfirmPassword} />
                  </button>
                </div>

                {errors.confirmPassword && (
                  <p className="mt-1 text-[12px] text-red-600">
                    {errors.confirmPassword}
                  </p>
                )}
              </div>

              {/* Form Error */}
              {formError && (
                <div className="rounded-lg bg-red-50 px-3.5 py-3 text-[13px] text-red-600">
                  {formError}
                </div>
              )}

              {/* Submit */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="mt-2 h-[50px] w-full rounded-lg bg-[#5B3DF5] text-[14px] font-semibold text-white transition-colors hover:bg-[#4D31DD] disabled:cursor-not-allowed disabled:opacity-60"
              >
                {isSubmitting
                  ? "Creating account..."
                  : "Create account"}
              </button>
            </form>

            {/* Login */}
            <p className="mt-6 text-center text-[13.5px] text-[#6B6478]">
              Already have an account?{" "}
              <Link
                to="/login"
                className="font-medium text-[#5B3DF5] hover:text-[#4c32d9]"
              >
                Log in
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
