"use client";

import { useCreateNewConversation } from "@/api";
import { cn } from "@/lib/utils";
import { useApp } from "@/providers";
import Drawer from "@mui/material/Drawer";
import dayjs from "dayjs";
import { ChevronLeft, MessageSquareText, TextAlignJustify } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { TypeAnimation } from "react-type-animation";

export const ChatPage = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const isCreateNewParam = searchParams.get("isCreateNew");
  const messageParam = searchParams.get("message");
  const [isOpenDrawer, setIsOpenDrawer] = useState(false);
  const { conversations } = useApp();
  const { refetchConversationList } = useApp();
  const { mutate: createNewConversationMutation } = useCreateNewConversation();

  const handleCreateNewConversation = (message = "") => {
    createNewConversationMutation(undefined, {
      onSuccess: (data) => {
        const basePath = `/chat/${data?.id}`;

        const queryString = message.trim() ? `?${new URLSearchParams({ message }).toString()}` : "";

        router.push(`${basePath}${queryString}`);
        refetchConversationList();
      },
      onError: (error) => {
        console.error("Failed to create new conversation:", error);
      },
    });
  };

  const handleToggleDrawer = () => {
    setIsOpenDrawer((pre) => !pre);
  };

  useEffect(() => {
    if (!isCreateNewParam || !messageParam?.trim()) return;

    Promise.resolve().then(() => {
      handleCreateNewConversation(messageParam);
    });
  }, [isCreateNewParam, messageParam]);

  return (
    <>
      <div className="relative flex flex-1 flex-col items-center justify-center overflow-hidden bg-[#FBFBFB]">
        <div className="absolute top-0 right-0 left-0 flex h-14 items-center px-4">
          <button onClick={() => setIsOpenDrawer(true)} className="block p-2 md:hidden">
            <TextAlignJustify />
          </button>
        </div>
        <div className="relative h-68 w-68">
          <Image src={"/gif/chatbot.gif"} alt="gif" fill className="object-contain" />
        </div>
        <div className="h-[200px] px-10 text-sm font-medium md:mx-0">
          <TypeAnimation
            sequence={[
              "Tra cứu nhanh mọi thủ tục hành chính tại Việt Nam.",
              200,
              "Hỗ trợ giải đáp về giấy tờ, hồ sơ, thủ tục — 24/7.",
              200,
              "Chatbot thông minh giúp bạn xử lý thủ tục hành chính dễ dàng hơn.",
              200,
              "Tôi có thể giúp bạn chuẩn bị hồ sơ đúng, đủ và không bị thiếu sót.",
              200,
            ]}
            wrapper="span"
            speed={50}
            style={{ fontSize: "2em", display: "inline-block" }}
            repeat={Infinity}
          />
        </div>
        <button
          className="cursor-pointer rounded-md bg-amber-500 px-10 py-2 text-sm font-medium text-white hover:bg-amber-700"
          onClick={() => handleCreateNewConversation()}
        >
          Chat ngay
        </button>
      </div>
      <Drawer open={isOpenDrawer} onClose={handleToggleDrawer}>
        <div className="flex h-full max-w-[350px] min-w-[300px] flex-col p-2">
          <Link href={"/"} className="mb-8 text-[#0A4FD5]">
            <ChevronLeft />
          </Link>

          <div className="mb-8 flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-[#0A4FD5] to-[#3DDC84] text-white">
              AI
            </div>
            <div>
              <div className="text-[#111827]">AI Assistant</div>
              <div className="text-sm text-[#111827] opacity-50">Luôn sẵn sàng hỗ trợ</div>
            </div>
          </div>
          <div className="flex flex-col gap-1 overflow-y-auto">
            {conversations?.map((item) => {
              return (
                <Link
                  href={`/chat/${item.id}`}
                  key={item.id}
                  className={cn(
                    "flex w-full items-center justify-between gap-2",
                    "cursor-pointer rounded-lg p-2 text-[#111827] hover:bg-[#F3F4F6]"
                  )}
                  onClick={() => {
                    setIsOpenDrawer(false);
                  }}
                >
                  <div className="flex max-w-[70%] flex-1 items-center gap-1">
                    <MessageSquareText size={14} />
                    <span className="truncate">{item.title}</span>
                  </div>
                  <span className="text-xs">{dayjs(item.updated_at).format("HH:mm")}</span>
                </Link>
              );
            })}
          </div>
        </div>
      </Drawer>
    </>
  );
};
