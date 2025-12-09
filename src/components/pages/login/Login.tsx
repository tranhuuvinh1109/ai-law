"use client";

import { useState } from "react";
import { Mail, Lock, User, Eye, EyeOff } from "lucide-react";
import { useApp } from "@/providers";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useLogin, useRegister } from "@/api";
import { E_LOCAL_STORAGE } from "@/enum";
import { set } from "react-hook-form";

export const Login = () => {
  const { setUser } = useApp();
  const router = useRouter();
  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const { mutate } = useRegister();
  const { mutate: mutateLogin } = useLogin();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Demo login - trong thực tế sẽ gọi API
    if (isLogin) {
      // Check for admin login

      mutateLogin(
        {
          email: formData.email,
          password: formData.password,
        },
        {
          onSuccess: (data) => {
            localStorage.setItem(
              E_LOCAL_STORAGE.APP_NAME,
              JSON.stringify({
                access_token: data?.access_token,
              })
            );
            setUser(data?.user);
            router.push("/");
          },
        }
      );
      //   if (formData.email === "admin@govassist.vn" && formData.password === "admin123") {

      //     setUser({ email: formData.email, name: "Admin", role: "admin" });
      //     router.push("/");
      //   } else {
      //     setUser({ email: formData.email, name: formData.name || "Người dùng", role: "user" });
      //     router.push("/");
      //   }
    } else {
      // Register
      if (formData.password === formData.confirmPassword) {
        // setUser({ email: formData.email, name: formData.name, role: "user" });
        // router.push("/");
        mutate(
          { password: formData.password, username: formData.name, email: formData.email, role: 2 },
          {
            onSuccess: (data) => {
              console.log("Registration successful:", data);
            },
            onError: (error) => {
              console.error("Registration failed:", error);
            },
          }
        );
      } else {
        alert("Mật khẩu không khớp!");
      }
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-[#F3F4F6] p-4">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="mb-8 text-center">
          <div className="mb-2 text-2xl text-[#0A4FD5]">GovAssist AI</div>
          <p className="text-[#111827] opacity-70">Hỗ trợ thông tin thủ tục hành chính</p>
        </div>

        {/* Form Card */}
        <div className="rounded-xl bg-white p-8 shadow-sm">
          <h2 className="mb-6 text-center text-[#111827]">
            {isLogin ? "Đăng nhập" : "Đăng ký tài khoản"}
          </h2>

          <form onSubmit={handleSubmit} className="space-y-4">
            {!isLogin && (
              <div>
                <label className="mb-2 block text-sm text-[#111827]">Họ và tên</label>
                <div className="relative">
                  <User className="absolute top-1/2 left-3 h-5 w-5 -translate-y-1/2 transform text-[#111827] opacity-40" />
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="Nguyễn Văn A"
                    className="w-full rounded-lg border border-gray-300 py-3 pr-4 pl-10 focus:border-[#0A4FD5] focus:outline-none"
                    required={!isLogin}
                  />
                </div>
              </div>
            )}

            <div>
              <label className="mb-2 block text-sm text-[#111827]">Email</label>
              <div className="relative">
                <Mail className="absolute top-1/2 left-3 h-5 w-5 -translate-y-1/2 transform text-[#111827] opacity-40" />
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="email@example.com"
                  className="w-full rounded-lg border border-gray-300 py-3 pr-4 pl-10 focus:border-[#0A4FD5] focus:outline-none"
                  required
                />
              </div>
            </div>

            <div>
              <label className="mb-2 block text-sm text-[#111827]">Mật khẩu</label>
              <div className="relative">
                <Lock className="absolute top-1/2 left-3 h-5 w-5 -translate-y-1/2 transform text-[#111827] opacity-40" />
                <input
                  type={showPassword ? "text" : "password"}
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  placeholder="••••••••"
                  className="w-full rounded-lg border border-gray-300 py-3 pr-10 pl-10 focus:border-[#0A4FD5] focus:outline-none"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute top-1/2 right-3 -translate-y-1/2 transform"
                >
                  {showPassword ? (
                    <EyeOff className="h-5 w-5 text-[#111827] opacity-40" />
                  ) : (
                    <Eye className="h-5 w-5 text-[#111827] opacity-40" />
                  )}
                </button>
              </div>
            </div>

            {!isLogin && (
              <div>
                <label className="mb-2 block text-sm text-[#111827]">Xác nhận mật khẩu</label>
                <div className="relative">
                  <Lock className="absolute top-1/2 left-3 h-5 w-5 -translate-y-1/2 transform text-[#111827] opacity-40" />
                  <input
                    type={showPassword ? "text" : "password"}
                    value={formData.confirmPassword}
                    onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                    placeholder="••••••••"
                    className="w-full rounded-lg border border-gray-300 py-3 pr-4 pl-10 focus:border-[#0A4FD5] focus:outline-none"
                    required={!isLogin}
                  />
                </div>
              </div>
            )}

            <button
              type="submit"
              className="w-full rounded-lg bg-[#0A4FD5] py-3 text-white transition-colors hover:cursor-pointer hover:bg-[#083aa3]"
            >
              {isLogin ? "Đăng nhập" : "Đăng ký"}
            </button>
          </form>

          <div className="mt-6 text-center">
            <button
              onClick={() => setIsLogin(!isLogin)}
              className="text-sm text-[#0A4FD5] hover:underline"
            >
              {isLogin ? "Chưa có tài khoản? Đăng ký ngay" : "Đã có tài khoản? Đăng nhập"}
            </button>
          </div>

          {isLogin && (
            <div className="mt-4 text-center">
              <button className="text-sm text-[#111827] opacity-70 hover:opacity-100">
                Quên mật khẩu?
              </button>
            </div>
          )}
        </div>

        {/* Demo Info */}
        <div className="mt-6 rounded-lg bg-white p-4 text-sm">
          <div className="mb-2 text-[#111827] opacity-70">Demo tài khoản:</div>
          <div className="space-y-1 text-xs text-[#111827] opacity-60">
            <div>Admin: admin@govassist.vn / admin123</div>
            <div>User: Bất kỳ email/mật khẩu nào</div>
          </div>
        </div>

        {/* Back to Home */}
        <div className="mt-6 text-center">
          <Link href={"/"} className="text-sm text-[#0A4FD5] hover:underline">
            ← Quay lại trang chủ
          </Link>
        </div>
      </div>
    </div>
  );
};
