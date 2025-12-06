"use client";

import { useState } from "react";
import { Send, Upload, Mic, Menu, X } from "lucide-react";

interface MobileChatProps {
  onNavigate: (page: string) => void;
}

interface Message {
  from: "ai" | "user";
  text: string;
}

export const MobileChat = ({ onNavigate }: MobileChatProps) => {
  const [messages, setMessages] = useState<Message[]>([
    { from: "ai", text: "Xin chào! Tôi có thể giúp gì cho bạn?" },
  ]);
  const [inputValue, setInputValue] = useState("");
  const [showMenu, setShowMenu] = useState(false);

  const handleSend = () => {
    if (!inputValue.trim()) return;

    setMessages([...messages, { from: "user", text: inputValue }]);
    setInputValue("");

    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        {
          from: "ai",
          text: "Cảm ơn bạn đã hỏi. Tôi đang tìm hiểu thông tin và sẽ trả lời ngay...",
        },
      ]);
    }, 500);
  };

  return (
    <div className="mx-auto flex h-screen max-w-[390px] flex-col bg-[#F3F4F6]">
      {/* Top Bar */}
      <div className="flex shrink-0 items-center justify-between border-b border-gray-200 bg-white px-4 py-4">
        <div className="flex items-center gap-3">
          <button onClick={() => setShowMenu(!showMenu)}>
            {showMenu ? (
              <X className="h-6 w-6 text-[#111827]" />
            ) : (
              <Menu className="h-6 w-6 text-[#111827]" />
            )}
          </button>
          <div className="text-[#0A4FD5]">GovAssist AI</div>
        </div>
        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-[#0A4FD5] to-[#3DDC84] text-sm text-white">
          AI
        </div>
      </div>

      {/* Menu Overlay */}
      {showMenu && (
        <div className="absolute inset-0 z-50 bg-white p-6">
          <div className="mb-8 flex items-center justify-between">
            <div className="text-[#0A4FD5]">Menu</div>
            <button onClick={() => setShowMenu(false)}>
              <X className="h-6 w-6 text-[#111827]" />
            </button>
          </div>
          <nav className="space-y-4">
            <button
              onClick={() => {
                setShowMenu(false);
                onNavigate("home");
              }}
              className="block w-full border-b border-gray-200 py-3 text-left text-[#111827] transition-colors hover:text-[#0A4FD5]"
            >
              Trang chủ
            </button>
            <button
              onClick={() => {
                setShowMenu(false);
                onNavigate("procedures");
              }}
              className="block w-full border-b border-gray-200 py-3 text-left text-[#111827] transition-colors hover:text-[#0A4FD5]"
            >
              Danh sách thủ tục
            </button>
            <button
              onClick={() => {
                setShowMenu(false);
                onNavigate("portal");
              }}
              className="block w-full border-b border-gray-200 py-3 text-left text-[#111827] transition-colors hover:text-[#0A4FD5]"
            >
              Hồ sơ của tôi
            </button>
            <button
              onClick={() => {
                setShowMenu(false);
                onNavigate("admin");
              }}
              className="block w-full border-b border-gray-200 py-3 text-left text-[#111827] transition-colors hover:text-[#0A4FD5]"
            >
              Quản trị (Admin)
            </button>
          </nav>
        </div>
      )}

      {/* Chat Messages */}
      <div className="flex-1 space-y-4 overflow-y-auto p-4">
        {messages.map((msg, i) => (
          <div key={i} className={`flex ${msg.from === "user" ? "justify-end" : "justify-start"}`}>
            <div
              className={`max-w-[80%] rounded-2xl p-4 ${
                msg.from === "user"
                  ? "rounded-br-sm bg-[#0A4FD5] text-white"
                  : "rounded-bl-sm bg-white text-[#111827] shadow-sm"
              }`}
            >
              <p className="text-sm whitespace-pre-wrap">{msg.text}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Input Bar */}
      <div className="shrink-0 border-t border-gray-200 bg-white p-4">
        <div className="mb-3 flex gap-2">
          <button className="rounded-lg p-2 transition-colors hover:bg-[#F3F4F6]">
            <Upload className="h-5 w-5 text-[#111827] opacity-70" />
          </button>
          <button className="rounded-lg p-2 transition-colors hover:bg-[#F3F4F6]">
            <Mic className="h-5 w-5 text-[#111827] opacity-70" />
          </button>
        </div>
        <div className="flex gap-2">
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyPress={(e) => e.key === "Enter" && handleSend()}
            placeholder="Nhập tin nhắn..."
            className="flex-1 rounded-lg border border-gray-300 px-4 py-3 text-sm focus:border-[#0A4FD5] focus:outline-none"
          />
          <button
            onClick={handleSend}
            className="shrink-0 rounded-lg bg-[#0A4FD5] p-3 text-white transition-colors hover:bg-[#083aa3]"
          >
            <Send className="h-5 w-5" />
          </button>
        </div>
      </div>
    </div>
  );
}
