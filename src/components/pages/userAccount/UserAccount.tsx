"use client";

import { E_LOCAL_STORAGE } from "@/enum";
import { useApp } from "@/providers";
import { User, Lock, Bell, History, Settings } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import dayjs from "dayjs";

export const UserAccountPage = () => {
  const { user, setUser, setConversations, conversations } = useApp();
  const router = useRouter();

  const handleLogout = () => {
    setUser(undefined);
    localStorage.removeItem(E_LOCAL_STORAGE.APP_NAME);
    setConversations([]);
    router.replace("/dang-nhap");
  };

  const savedProcedures = [
    { id: "1", title: "Đăng ký kinh doanh", category: "Kinh doanh", savedDate: "2025-11-18" },
    { id: "2", title: "Cấp giấy phép xây dựng", category: "Xây dựng", savedDate: "2025-11-12" },
    { id: "3", title: "Đăng ký khai sinh", category: "Hộ tịch", savedDate: "2025-11-08" },
  ];

  return (
    <div className="min-h-screen bg-[#F3F4F6]">
      <div className="mx-auto max-w-[1200px] px-8 py-8">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
          {/* Profile Card */}
          <div className="lg:col-span-1">
            <div className="rounded-xl bg-white p-6 shadow-sm">
              <div className="mb-6 flex items-center gap-4">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-[#0A4FD5] to-[#3DDC84] text-2xl text-white">
                  {user?.username?.charAt(0) || "U"}
                </div>
                <div>
                  <h3 className="text-[#111827]">{user?.username || "Người dùng"}</h3>
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

              <button
                onClick={handleLogout}
                className="mt-6 w-full text-sm text-red-600 transition-colors hover:text-red-700"
              >
                Đăng xuất
              </button>
            </div>

            {/* Stats */}
            <div className="mt-6 rounded-xl bg-white p-6 shadow-sm">
              <h3 className="mb-4 text-[#111827]">Thống kê</h3>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-[#111827] opacity-70">Cuộc trò chuyện</span>
                  <span className="text-[#0A4FD5]">{conversations?.length}</span>
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
                {conversations.slice(0, 4).map((chat) => (
                  <div
                    key={chat.id}
                    className="cursor-pointer p-6 transition-colors hover:bg-[#F3F4F6]"
                  >
                    <div className="flex items-center justify-between">
                      <h3 className="text-[#111827]">{chat.title}</h3>
                      <span className="text-xs text-[#111827] opacity-50">
                        {dayjs(chat.updated_at).format("DD/MM/YYYY HH:mm")}
                      </span>
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
};
