"use client";

import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useDispatch } from "react-redux";
import { useRouter } from "next/navigation";
import { login } from "@/app/store/slices/authSlice";
import { Button, Input, Card } from "@/app/components";
import { loginSchema, LoginFormData } from "./validation";
import { useState } from "react";

const LoginPage = () => {
  const [submitError, setSubmitError] = useState("");
  const dispatch = useDispatch();
  const router = useRouter();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: yupResolver(loginSchema),
  });

  const onSubmit = (data: LoginFormData) => {
    setSubmitError("");
    try {
      dispatch(login({ username: data.username, email: data.email }));
      router.push("/dashboard");
    } catch {
      setSubmitError("Login failed. Please try again.");
    }
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "var(--background, #ffffff)",
        color: "var(--foreground, #171717)",
        transition: "background-color 0.2s, color 0.2s",
      }}
    >
      <Card className="w-full max-w-md">
        <h1
          style={{
            fontSize: "1.875rem",
            fontWeight: "700",
            textAlign: "center",
            marginBottom: "1.5rem",
            color: "var(--foreground, #171717)",
          }}
        >
          HR Dashboard Login
        </h1>
        <form
          style={{ display: "flex", flexDirection: "column", gap: "1rem" }}
          onSubmit={handleSubmit(onSubmit)}
        >
          <Controller
            name="username"
            control={control}
            render={({ field }) => (
              <Input
                label="Username"
                placeholder="Enter your username"
                {...field}
                error={errors.username?.message}
              />
            )}
          />
          <Controller
            name="email"
            control={control}
            render={({ field }) => (
              <Input
                label="Email"
                type="email"
                placeholder="Enter your email"
                {...field}
                error={errors.email?.message}
              />
            )}
          />
          <Controller
            name="password"
            control={control}
            render={({ field }) => (
              <Input
                label="Password"
                type="password"
                placeholder="Enter your password"
                {...field}
                error={errors.password?.message}
              />
            )}
          />
          {submitError && (
            <p
              style={{
                color: "#ef4444",
                fontSize: "0.875rem",
                textAlign: "center",
              }}
            >
              {submitError}
            </p>
          )}
          <Button type="submit">Login</Button>
        </form>
      </Card>
    </div>
  );
};

export default LoginPage;
