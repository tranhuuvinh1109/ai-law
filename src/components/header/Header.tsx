"use client";

import { HEADERS } from "@/constants";
import { CircleUserRound, MessageCircle, TextAlignJustify } from "lucide-react";
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
  const { user, setUser } = useApp();
  const router = useRouter();
  const pathname = usePathname();

  const handleLogout = () => {
    setUser(undefined);
    localStorage.removeItem(E_LOCAL_STORAGE.APP_NAME);
    router.replace("/dang-nhap");
  };

  const hideHeaderPaths = ["/dang-nhap", "/dang-ky", "/chat"];
  const shouldHideHeader = hideHeaderPaths.some((p) => pathname.startsWith(p));
  return (
    <>
      <header
        className={cn(
          "fixed top-0 right-0 left-0 z-50 mx-auto flex w-full justify-end bg-white px-4 py-4 shadow-sm md:block md:px-8",
          shouldHideHeader ? "relative hidden md:hidden" : ""
        )}
      >
        <div className="hidden items-center gap-4 md:flex">
          <MessageCircle className="h-10 w-10 text-[#0A4FD5]" />
          <div className="flex flex-1 items-center gap-2">
            {HEADERS.map((item) => (
              <Link
                href={item.href}
                key={item.href}
                className="px-4 py-2 text-base font-medium hover:text-[#0A4FD5]"
              >
                {item.label}
              </Link>
            ))}
          </div>
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
        <button onClick={() => setIsOpen(true)} className="block md:hidden">
          <TextAlignJustify className="h-5 w-5" />
        </button>
      </header>
      <Drawer anchor="right" open={isOpen} onClose={() => setIsOpen(false)}>
        <div className="min-w-[300px]">
          <div className="flex flex-col gap-2">
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
        </div>
      </Drawer>
    </>
  );
};
