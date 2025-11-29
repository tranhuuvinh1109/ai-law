"use client";

import { useApp } from "@/providers";
import { User, Mail, Lock, Bell, History, Settings, ChevronLeft } from "lucide-react";
import Link from "next/link";

export function UserAccountPage() {
  const { user } = useApp();
  const chatHistory = [
    { id: "1", title: "Đăng ký kinh doanh", date: "2025-11-20", messages: 12 },
    { id: "2", title: "Chuyển nhượng đất", date: "2025-11-15", messages: 8 },
    { id: "3", title: "Đăng ký BHXH", date: "2025-11-10", messages: 15 },
    { id: "4", title: "Giấy phép xây dựng", date: "2025-11-05", messages: 20 },
  ];

  const savedProcedures = [
    { id: "1", title: "Đăng ký kinh doanh", category: "Kinh doanh", savedDate: "2025-11-18" },
    { id: "2", title: "Cấp giấy phép xây dựng", category: "Xây dựng", savedDate: "2025-11-12" },
    { id: "3", title: "Đăng ký khai sinh", category: "Hộ tịch", savedDate: "2025-11-08" },
  ];

  return (
    <div className="min-h-screen bg-[#F3F4F6]">
      {/* Header */}
      <div className="border-b border-gray-200 bg-white">
        <div className="mx-auto max-w-[1200px] px-8 py-6">
          <div className="mb-4 flex items-center justify-between">
            <Link href={"/"} className="text-[#0A4FD5] hover:underline">
              <ChevronLeft />
            </Link>
            <div className="flex gap-3">
              <Link
                href={"chat"}
                className="rounded-lg bg-[#0A4FD5] px-6 py-2 text-white transition-colors hover:bg-[#083aa3]"
              >
                Trò chuyện với AI
              </Link>
            </div>
          </div>
          <h1 className="mb-2 text-[#111827]">Tài khoản của tôi</h1>
          <p className="text-[#111827] opacity-70">Quản lý thông tin cá nhân và lịch sử sử dụng</p>
        </div>
      </div>

      <div className="mx-auto max-w-[1200px] px-8 py-8">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
          {/* Profile Card */}
          <div className="lg:col-span-1">
            <div className="rounded-xl bg-white p-6 shadow-sm">
              <div className="mb-6 flex items-center gap-4">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-[#0A4FD5] to-[#3DDC84] text-2xl text-white">
                  {user?.name?.charAt(0) || "U"}
                </div>
                <div>
                  <h3 className="text-[#111827]">{user?.name || "Người dùng"}</h3>
                  <div className="text-sm text-[#111827] opacity-70">
                    {user?.email || "user@example.com"}
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <button className="flex w-full items-center gap-3 rounded-lg p-3 text-left transition-colors hover:bg-[#F3F4F6]">
                  <User className="h-5 w-5 text-[#0A4FD5]" />
                  <span className="text-[#111827]">Thông tin cá nhân</span>
                </button>
                <button className="flex w-full items-center gap-3 rounded-lg p-3 text-left transition-colors hover:bg-[#F3F4F6]">
                  <Lock className="h-5 w-5 text-[#0A4FD5]" />
                  <span className="text-[#111827]">Đổi mật khẩu</span>
                </button>
                <button className="flex w-full items-center gap-3 rounded-lg p-3 text-left transition-colors hover:bg-[#F3F4F6]">
                  <Bell className="h-5 w-5 text-[#0A4FD5]" />
                  <span className="text-[#111827]">Thông báo</span>
                </button>
                <button className="flex w-full items-center gap-3 rounded-lg p-3 text-left transition-colors hover:bg-[#F3F4F6]">
                  <Settings className="h-5 w-5 text-[#0A4FD5]" />
                  <span className="text-[#111827]">Cài đặt</span>
                </button>
              </div>

              <Link
                href={"dang-nhap"}
                className="mt-6 w-full text-sm text-red-600 transition-colors hover:text-red-700"
              >
                Đăng xuất
              </Link>
            </div>

            {/* Stats */}
            <div className="mt-6 rounded-xl bg-white p-6 shadow-sm">
              <h3 className="mb-4 text-[#111827]">Thống kê</h3>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-[#111827] opacity-70">Cuộc trò chuyện</span>
                  <span className="text-[#0A4FD5]">{chatHistory.length}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-[#111827] opacity-70">Thủ tục đã lưu</span>
                  <span className="text-[#0A4FD5]">{savedProcedures.length}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-[#111827] opacity-70">Ngày tham gia</span>
                  <span className="text-[#111827]">2025-10-01</span>
                </div>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="space-y-6 lg:col-span-2">
            {/* Chat History */}
            <div className="rounded-xl bg-white shadow-sm">
              <div className="flex items-center justify-between border-b border-gray-200 p-6">
                <div className="flex items-center gap-2">
                  <History className="h-5 w-5 text-[#0A4FD5]" />
                  <h2 className="text-[#111827]">Lịch sử trò chuyện</h2>
                </div>
                <Link href={"chat"} className="text-sm text-[#0A4FD5] hover:underline">
                  Xem tất cả
                </Link>
              </div>
              <div className="divide-y divide-gray-200">
                {chatHistory.map((chat) => (
                  <div
                    key={chat.id}
                    className="cursor-pointer p-6 transition-colors hover:bg-[#F3F4F6]"
                  >
                    <div className="mb-2 flex items-start justify-between">
                      <h3 className="text-[#111827]">{chat.title}</h3>
                      <div className="text-sm text-[#111827] opacity-50">{chat.date}</div>
                    </div>
                    <div className="text-sm text-[#111827] opacity-70">
                      {chat.messages} tin nhắn
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Saved Procedures */}
            <div className="rounded-xl bg-white shadow-sm">
              <div className="flex items-center justify-between border-b border-gray-200 p-6">
                <h2 className="text-[#111827]">Thủ tục đã lưu</h2>
                <Link href={"/"} className="text-sm text-[#0A4FD5] hover:underline">
                  Tìm thủ tục mới
                </Link>
              </div>
              <div className="divide-y divide-gray-200">
                {savedProcedures.map((proc) => (
                  <div
                    key={proc.id}
                    className="cursor-pointer p-6 transition-colors hover:bg-[#F3F4F6]"
                  >
                    <div className="mb-2 flex items-start justify-between">
                      <div>
                        <h3 className="mb-1 text-[#111827]">{proc.title}</h3>
                        <div className="inline-block rounded-full bg-[#0A4FD5]/10 px-3 py-1 text-sm text-[#0A4FD5]">
                          {proc.category}
                        </div>
                      </div>
                      <div className="text-sm text-[#111827] opacity-50">
                        Đã lưu: {proc.savedDate}
                      </div>
                    </div>
                    <Link href={"/"} className="mt-3 text-sm text-[#0A4FD5] hover:underline">
                      Xem chi tiết →
                    </Link>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
