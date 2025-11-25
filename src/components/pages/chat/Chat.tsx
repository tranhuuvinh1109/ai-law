import { useState } from "react";
import {
  Send,
  Upload,
  Mic,
  Plus,
  FileText,
  Building2,
  Landmark,
  Home as HomeIcon,
  ChevronDown,
} from "lucide-react";

interface Message {
  from: "ai" | "user";
  text: string;
}

interface ChatProps {
  onNavigate: (page: string) => void;
}

export function Chat({ onNavigate }: ChatProps) {
  const [messages, setMessages] = useState<Message[]>([
    { from: "ai", text: "Xin chào! Tôi có thể giúp gì cho bạn?" },
    { from: "user", text: "Tôi muốn biết thủ tục đăng ký kinh doanh." },
    {
      from: "ai",
      text: "Để đăng ký kinh doanh, bạn cần chuẩn bị các giấy tờ sau:\n\n1. CMND/CCCD (bản gốc và bản sao)\n2. Giấy chứng nhận đăng ký hộ kinh doanh (nếu có)\n3. Quyết định thành lập doanh nghiệp\n\nThời gian xử lý: 3-5 ngày làm việc.\n\nBạn có cần tôi hướng dẫn chi tiết từng bước không?",
    },
  ]);
  const [inputValue, setInputValue] = useState("");
  const [selectedModel, setSelectedModel] = useState<"govai" | "gpt4.5">("govai");
  const [showModelDropdown, setShowModelDropdown] = useState(false);

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

  const categories = [
    { icon: HomeIcon, label: "Hộ tịch" },
    { icon: Landmark, label: "Đất đai" },
    { icon: Building2, label: "BHXH" },
    { icon: FileText, label: "Giấy phép kinh doanh" },
    { icon: FileText, label: "Thuế" },
  ];

  return (
    <div className="flex h-screen bg-[#F3F4F6]">
      {/* Sidebar */}
      <div className="flex w-[300px] flex-col border-r border-gray-200 bg-white p-6">
        <button onClick={() => onNavigate("home")} className="mb-8 text-[#0A4FD5]">
          ← GovAssist AI
        </button>

        <div className="mb-8 flex items-center gap-3">
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-[#0A4FD5] to-[#3DDC84] text-white">
            AI
          </div>
          <div>
            <div className="text-[#111827]">AI Assistant</div>
            <div className="text-sm text-[#111827] opacity-50">Luôn sẵn sàng hỗ trợ</div>
          </div>
        </div>

        <div className="mb-4 text-sm text-[#111827] opacity-70">Lĩnh vực phổ biến</div>
        <div className="flex-1 space-y-2">
          {categories.map((cat, i) => (
            <button
              key={i}
              className="flex w-full items-center gap-3 rounded-lg p-3 text-left transition-colors hover:bg-[#F3F4F6]"
            >
              <cat.icon className="h-5 w-5 text-[#0A4FD5]" />
              <span className="text-[#111827]">{cat.label}</span>
            </button>
          ))}
        </div>

        <button className="mt-4 text-sm text-[#111827] opacity-70 transition-opacity hover:opacity-100">
          Xem lịch sử trò chuyện
        </button>
      </div>

      {/* Chat Area */}
      <div className="flex flex-1 flex-col">
        <div className="flex items-center justify-between border-b border-gray-200 bg-white p-4">
          <div className="flex items-center gap-4">
            <h2 className="text-[#111827]">Trò chuyện với AI</h2>

            {/* AI Model Selector */}
            <div className="relative">
              <button
                onClick={() => setShowModelDropdown(!showModelDropdown)}
                className="flex items-center gap-2 rounded-lg bg-[#F3F4F6] px-4 py-2 transition-colors hover:bg-gray-200"
              >
                <div className="h-2 w-2 rounded-full bg-[#3DDC84]"></div>
                <span className="text-sm text-[#111827]">
                  {selectedModel === "govai" ? "GovAI" : "GPT-4.5"}
                </span>
                <ChevronDown className="h-4 w-4 text-[#111827] opacity-70" />
              </button>

              {showModelDropdown && (
                <div className="absolute top-full left-0 z-10 mt-2 w-48 rounded-lg border border-gray-200 bg-white py-2 shadow-lg">
                  <button
                    onClick={() => {
                      setSelectedModel("govai");
                      setShowModelDropdown(false);
                    }}
                    className={`w-full px-4 py-2 text-left transition-colors hover:bg-[#F3F4F6] ${
                      selectedModel === "govai"
                        ? "bg-[#0A4FD5]/10 text-[#0A4FD5]"
                        : "text-[#111827]"
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <div className="h-2 w-2 rounded-full bg-[#3DDC84]"></div>
                      <div>
                        <div className="text-sm">GovAI</div>
                        <div className="text-xs opacity-70">Chuyên về thủ tục hành chính</div>
                      </div>
                    </div>
                  </button>
                  <button
                    onClick={() => {
                      setSelectedModel("gpt4.5");
                      setShowModelDropdown(false);
                    }}
                    className={`w-full px-4 py-2 text-left transition-colors hover:bg-[#F3F4F6] ${
                      selectedModel === "gpt4.5"
                        ? "bg-[#0A4FD5]/10 text-[#0A4FD5]"
                        : "text-[#111827]"
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <div className="h-2 w-2 rounded-full bg-purple-500"></div>
                      <div>
                        <div className="text-sm">GPT-4.5</div>
                        <div className="text-xs opacity-70">Model AI đa năng</div>
                      </div>
                    </div>
                  </button>
                </div>
              )}
            </div>
          </div>
          <button
            onClick={() => onNavigate("procedures")}
            className="text-sm text-[#0A4FD5] hover:underline"
          >
            Xem danh sách thủ tục
          </button>
        </div>

        <div className="flex-1 space-y-4 overflow-y-auto p-6">
          {messages.map((msg, i) => (
            <div
              key={i}
              className={`flex ${msg.from === "user" ? "justify-end" : "justify-start"}`}
            >
              <div
                className={`max-w-[70%] rounded-2xl p-4 ${
                  msg.from === "user"
                    ? "rounded-br-sm bg-[#0A4FD5] text-white"
                    : "rounded-bl-sm bg-white text-[#111827] shadow-sm"
                }`}
              >
                <p className="whitespace-pre-wrap">{msg.text}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="border-t border-gray-200 bg-white p-4">
          <div className="mb-3 flex gap-2">
            <button
              className="rounded-lg p-2 transition-colors hover:bg-[#F3F4F6]"
              title="Upload file"
            >
              <Upload className="h-5 w-5 text-[#111827] opacity-70" />
            </button>
            <button
              className="rounded-lg p-2 transition-colors hover:bg-[#F3F4F6]"
              title="Voice input"
            >
              <Mic className="h-5 w-5 text-[#111827] opacity-70" />
            </button>
          </div>
          <div className="flex gap-2">
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyPress={(e) => e.key === "Enter" && handleSend()}
              placeholder="Nhập câu hỏi..."
              className="flex-1 rounded-lg border border-gray-300 px-4 py-3 focus:border-[#0A4FD5] focus:outline-none"
            />
            <button
              onClick={handleSend}
              className="rounded-lg bg-[#0A4FD5] px-6 py-3 text-white transition-colors hover:bg-[#083aa3]"
            >
              <Send className="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>

      {/* Info Panel */}
      <div className="w-[284px] overflow-y-auto border-l border-gray-200 bg-white p-6">
        <div className="mb-6">
          <h3 className="mb-3 text-[#111827]">Tóm tắt thủ tục</h3>
          <div className="text-sm text-[#111827] opacity-70">
            <p className="mb-2">
              Đăng ký kinh doanh là thủ tục bắt buộc để thành lập doanh nghiệp mới.
            </p>
            <p>Được thực hiện tại Phòng Đăng ký kinh doanh cấp Tỉnh/Thành phố.</p>
          </div>
        </div>

        <div className="mb-6">
          <h3 className="mb-3 text-[#111827]">Giấy tờ cần chuẩn bị</h3>
          <ul className="space-y-2 text-sm text-[#111827] opacity-70">
            <li className="flex gap-2">
              <span>•</span>
              <span>CMND/CCCD (bản gốc)</span>
            </li>
            <li className="flex gap-2">
              <span>•</span>
              <span>Giấy tờ thành lập</span>
            </li>
            <li className="flex gap-2">
              <span>•</span>
              <span>Hợp đồng thuê địa điểm</span>
            </li>
          </ul>
        </div>

        <div className="mb-6">
          <h3 className="mb-3 text-[#111827]">Thời gian xử lý</h3>
          <div className="rounded-lg bg-[#3DDC84]/10 p-3">
            <div className="text-[#111827]">3-5 ngày làm việc</div>
          </div>
        </div>

        <button
          onClick={() => onNavigate("procedure-detail")}
          className="w-full rounded-lg bg-[#0A4FD5] py-3 text-white transition-colors hover:bg-[#083aa3]"
        >
          Xem chi tiết thủ tục
        </button>
      </div>
    </div>
  );
}
