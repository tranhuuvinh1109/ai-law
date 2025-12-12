"use client";

import { HEADERS } from "@/constants";
import {
  ArrowRight,
  CircleUserRound,
  LogOut,
  Menu,
  MessageCircle,
  Sparkles,
  TextAlignJustify,
  X,
} from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { useApp } from "@/providers";
import { Button } from "../ui";
import { usePathname, useRouter } from "next/navigation";
import { E_LOCAL_STORAGE } from "@/enum";

import Drawer from "@mui/material/Drawer";
import { cn } from "@/lib/utils";

export const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { user, setUser, setConversations } = useApp();
  const router = useRouter();
  const pathname = usePathname();

  const handleLogout = () => {
    setUser(undefined);
    localStorage.removeItem(E_LOCAL_STORAGE.APP_NAME);
    setConversations([]);
    router.replace("/dang-nhap");
  };
  const hideHeaderPaths = ["/dang-nhap", "/dang-ky"];
  const shouldHideHeader = hideHeaderPaths.some((p) => pathname.startsWith(p));
  return (
    <>
      <div
        className={cn(
          "fixed top-0 right-0 left-0 z-50 bg-white/90 shadow-sm backdrop-blur-sm",
          shouldHideHeader && "hidden"
        )}
      >
        <div className="mx-auto max-w-[1440px] px-4 py-4 md:px-8">
          {/* Navigation */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-8 md:gap-12">
              <Link href={"/"} className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br from-[#0A4FD5] to-[#3DDC84]">
                  <Sparkles className="h-6 w-6 text-white" />
                </div>
                <div>
                  <div className="font-semibold text-[#0A4FD5]">GovAssist AI</div>
                  <div className="hidden text-xs text-[#111827] opacity-60 md:block">
                    Hỗ trợ thủ tục hành chính
                  </div>
                </div>
              </Link>
              <nav className="hidden gap-8 lg:flex">
                <button className="group relative text-[#111827] transition-colors hover:text-[#0A4FD5]">
                  Trang chủ
                  <div className="absolute bottom-0 left-0 h-0.5 w-full scale-x-100 transform bg-[#0A4FD5] transition-transform"></div>
                </button>
                <Link
                  href={"/thu-tuc"}
                  className="group relative text-[#111827] transition-colors hover:text-[#0A4FD5]"
                >
                  Thủ tục
                  <div className="absolute bottom-0 left-0 h-0.5 w-full scale-x-0 transform bg-[#0A4FD5] transition-transform group-hover:scale-x-100"></div>
                </Link>
                <button className="group relative text-[#111827] transition-colors hover:text-[#0A4FD5]">
                  Hướng dẫn
                  <div className="absolute bottom-0 left-0 h-0.5 w-full scale-x-0 transform bg-[#0A4FD5] transition-transform group-hover:scale-x-100"></div>
                </button>
                {user?.role === 1 && (
                  <Link
                    href={"/admin"}
                    className="group relative text-[#111827] transition-colors hover:text-[#0A4FD5]"
                  >
                    Admin
                    <div className="absolute bottom-0 left-0 h-0.5 w-full scale-x-0 transform bg-[#0A4FD5] transition-transform group-hover:scale-x-100"></div>
                  </Link>
                )}
              </nav>
            </div>
            <div className="flex items-center gap-2 md:gap-4">
              {user ? (
                <>
                  <Link
                    href={"/tai-khoan"}
                    className="hidden items-center gap-2 rounded-lg px-4 py-2 text-[#111827] transition-colors hover:bg-[#F3F4F6] hover:text-[#0A4FD5] md:flex"
                  >
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br from-[#0A4FD5] to-[#3DDC84] text-sm text-white">
                      {user.username.charAt(0)}
                    </div>
                    <span className="hidden lg:block">
                      {user.username.startsWith("guest") ? "Khách" : user.username}
                    </span>
                  </Link>
                  <Link
                    href={"/chat"}
                    className="flex items-center gap-2 rounded-lg bg-gradient-to-r from-[#0A4FD5] to-[#0858e0] px-4 py-2 text-sm text-white transition-all hover:shadow-lg md:px-6 md:py-2.5 md:text-base"
                  >
                    <MessageCircle className="h-4 w-4" />
                    <span className="hidden md:inline">Trò chuyện</span>
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="flex items-center gap-2 rounded-lg bg-gradient-to-r from-[#0A4FD5] to-[#0858e0] px-4 py-2 text-sm text-white transition-all hover:shadow-lg md:px-6 md:py-2.5 md:text-base"
                  >
                    <LogOut className="h-4 w-4" />
                    <span className="hidden md:inline">Đăng xuất</span>
                  </button>
                </>
              ) : (
                <>
                  <Link
                    href={"/dang-nhap"}
                    className="px-3 py-2 text-sm text-[#0A4FD5] transition-colors hover:text-[#083aa3] md:px-4 md:text-base"
                  >
                    Đăng nhập
                  </Link>
                  <Link
                    href={"/chat"}
                    className="flex items-center gap-2 rounded-lg bg-gradient-to-r from-[#0A4FD5] to-[#0858e0] px-4 py-2 text-sm text-white transition-all hover:shadow-lg md:px-6 md:py-2.5 md:text-base"
                  >
                    <span className="hidden md:inline">Bắt đầu ngay</span>
                    <span className="md:hidden">Bắt đầu</span>
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </>
              )}
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="rounded-lg p-2 transition-colors hover:bg-[#F3F4F6] lg:hidden"
              >
                {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </button>
            </div>
          </div>
        </div>
      </div>
      <Drawer anchor="right" open={isOpen} onClose={() => setIsOpen(false)}>
        <div className="min-w-[300px]">
          {/* <div className="flex flex-col gap-2">
            {HEADERS.map((item) => (
              <Link
                href={item.href}
                key={item.href}
                className="px-2.5 py-1 text-base font-medium hover:text-[#0A4FD5]"
                onClick={() => setIsOpen(false)}
              >
                {item.label}
              </Link>
            ))}
          </div>
           */}

          <div className="mt-4 space-y-2 border-t border-gray-200 pt-4 pb-4 lg:hidden">
            <Link
              href={"/"}
              onClick={() => {
                setIsOpen(false);
              }}
              className="block w-full rounded-lg px-4 py-2 text-left transition-colors hover:bg-[#F3F4F6]"
            >
              Trang chủ
            </Link>
            <Link
              href={"/thu-tuc"}
              onClick={() => {
                setIsOpen(false);
              }}
              className="block w-full rounded-lg px-4 py-2 text-left transition-colors hover:bg-[#F3F4F6]"
            >
              Thủ tục
            </Link>
            <button className="block w-full rounded-lg px-4 py-2 text-left transition-colors hover:bg-[#F3F4F6]">
              Hướng dẫn
            </button>
            {user?.role === 1 && (
              <Link
                href={"/admin"}
                onClick={() => {
                  setIsOpen(false);
                }}
                className="block w-full rounded-lg px-4 py-2 text-left transition-colors hover:bg-[#F3F4F6]"
              >
                Admin
              </Link>
            )}
            {user && (
              <div className="">
                <Popover>
                  <PopoverTrigger>
                    <div className="hover:cursor-pointer">
                      <CircleUserRound size={32} />
                    </div>
                  </PopoverTrigger>
                  <PopoverContent className="w-48">
                    <div className="">
                      <div className="flex flex-col gap-2">
                        <span className="font-medium">{user.username}</span>
                        <span className="text-sm text-gray-500">{user.email}</span>
                      </div>
                      <div className="my-2 h-0.5 w-full bg-gray-200" />
                      <div>
                        <Button className="w-full hover:cursor-pointer" onClick={handleLogout}>
                          Đăng xuất
                        </Button>
                      </div>
                    </div>
                  </PopoverContent>
                </Popover>
              </div>
            )}
          </div>
        </div>
      </Drawer>
    </>
  );
};
