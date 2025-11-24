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
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <Card className="w-full max-w-md">
        <h1 className="text-2xl font-bold text-center mb-6 text-gray-800">
          HR Dashboard Login
        </h1>
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
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
            <p className="text-red-500 text-sm text-center">{submitError}</p>
          )}
          <Button type="submit">Login</Button>
        </form>
      </Card>
    </div>
  );
};

export default LoginPage;
