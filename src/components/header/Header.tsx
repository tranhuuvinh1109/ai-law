"use client";

import { HEADERS } from "@/constants";
import { CircleUserRound, MessageCircle, TextAlignJustify, X } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { useApp } from "@/providers";
import { Button } from "../ui";
import { useRouter } from "next/navigation";
import { E_LOCAL_STORAGE } from "@/enum";

export const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { user, setUser } = useApp();
  const router = useRouter();

  const handleLogout = () => {
    setUser(undefined);
    localStorage.removeItem(E_LOCAL_STORAGE.APP_NAME);
    router.replace("/dang-nhap");
  };
  return (
    <header>
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
      <div className="flex justify-end md:hidden">
        <Popover onOpenChange={(open) => setIsOpen(open)}>
          <PopoverTrigger>
            {isOpen ? <X className="h-5 w-5" /> : <TextAlignJustify className="h-5 w-5" />}
          </PopoverTrigger>

          <PopoverContent className="flex w-56 flex-col gap-4">
            {HEADERS.map((item) => (
              <Link
                href={item.href}
                key={item.href}
                className="px-2.5 py-1 text-base font-medium hover:text-[#0A4FD5]"
              >
                {item.label}
              </Link>
            ))}
          </PopoverContent>
        </Popover>
      </div>
    </header>
  );
};
