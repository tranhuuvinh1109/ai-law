import { MessageCircle, Search, FileText, Send, User } from "lucide-react";

interface HomeProps {
  onNavigate: (page: string) => void;
  user?: { email: string; name: string; role: "user" | "admin" } | null;
}

export function Home({ onNavigate, user }: HomeProps) {
  return (
    <div className="min-h-screen bg-[#F3F4F6]">
      {/* Hero Section */}
      <div className="bg-white shadow-sm">
        <div className="mx-auto max-w-[1440px] px-8 py-6">
          {/* Navigation */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-8">
              <div className="text-[#0A4FD5]">GovAssist AI</div>
              <nav className="flex gap-8">
                <button className="text-[#111827] transition-colors hover:text-[#0A4FD5]">
                  Trang chủ
                </button>
                <button
                  onClick={() => onNavigate("procedures")}
                  className="text-[#111827] transition-colors hover:text-[#0A4FD5]"
                >
                  Thủ tục
                </button>
                <button className="text-[#111827] transition-colors hover:text-[#0A4FD5]">
                  Hỗ trợ
                </button>
                {user?.role === "admin" && (
                  <button
                    onClick={() => onNavigate("admin")}
                    className="text-[#111827] transition-colors hover:text-[#0A4FD5]"
                  >
                    Admin
                  </button>
                )}
              </nav>
            </div>
            <div className="flex items-center gap-3">
              {user ? (
                <>
                  <button
                    onClick={() => onNavigate("account")}
                    className="flex items-center gap-2 text-[#111827] transition-colors hover:text-[#0A4FD5]"
                  >
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br from-[#0A4FD5] to-[#3DDC84] text-sm text-white">
                      {user.name.charAt(0)}
                    </div>
                    <span>{user.name}</span>
                  </button>
                  <button
                    onClick={() => onNavigate("chat")}
                    className="rounded-lg bg-[#0A4FD5] px-6 py-3 text-white transition-colors hover:bg-[#083aa3]"
                  >
                    Trò chuyện
                  </button>
                </>
              ) : (
                <>
                  <button
                    onClick={() => onNavigate("login")}
                    className="text-[#0A4FD5] hover:underline"
                  >
                    Đăng nhập
                  </button>
                  <button
                    onClick={() => onNavigate("chat")}
                    className="rounded-lg bg-[#0A4FD5] px-6 py-3 text-white transition-colors hover:bg-[#083aa3]"
                  >
                    Bắt đầu trò chuyện
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Hero Content */}
      <div className="mx-auto max-w-[1440px] px-8 py-16">
        <div className="flex items-center justify-between gap-12">
          <div className="max-w-[680px] flex-1">
            <h1 className="mb-6 text-[#111827]">AI hỗ trợ tư vấn thủ tục hành chính 24/7</h1>
            <p className="mb-12 text-[#111827] opacity-80">
              Giải đáp hồ sơ, giấy tờ, quy trình hành chính nhanh chóng và chính xác.
            </p>
            <div className="flex gap-4">
              <input
                type="text"
                placeholder="Ví dụ: Thủ tục đăng ký kinh doanh cần gì?"
                className="flex-1 rounded-lg border border-gray-300 bg-white px-6 py-4 focus:border-[#0A4FD5] focus:outline-none"
              />
              <button
                onClick={() => onNavigate("chat")}
                className="flex items-center gap-2 rounded-lg bg-[#3DDC84] px-8 py-4 text-[#111827] transition-colors hover:bg-[#2ac972]"
              >
                <Send className="h-5 w-5" />
                Trò chuyện ngay
              </button>
            </div>
          </div>
          <div className="flex h-[360px] max-w-[560px] flex-1 items-center justify-center rounded-2xl bg-gradient-to-br from-[#0A4FD5]/10 to-[#3DDC84]/10">
            <div className="text-center">
              <MessageCircle className="mx-auto mb-4 h-32 w-32 text-[#0A4FD5] opacity-50" />
              <div className="text-[#111827] opacity-60">Robot AI + Giao diện chat</div>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="mx-auto max-w-[1440px] px-8 py-12">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          <div
            onClick={() => onNavigate("procedures")}
            className="cursor-pointer rounded-xl bg-white p-8 shadow-sm transition-shadow hover:shadow-md"
          >
            <Search className="mb-4 h-12 w-12 text-[#0A4FD5]" />
            <h3 className="mb-2 text-[#111827]">Tra cứu thủ tục</h3>
            <p className="text-[#111827] opacity-70">Tìm nhanh thủ tục theo từ khóa</p>
          </div>
          <div
            onClick={() => onNavigate("chat")}
            className="cursor-pointer rounded-xl bg-white p-8 shadow-sm transition-shadow hover:shadow-md"
          >
            <MessageCircle className="mb-4 h-12 w-12 text-[#0A4FD5]" />
            <h3 className="mb-2 text-[#111827]">Chat với AI</h3>
            <p className="text-[#111827] opacity-70">
              Nhận hướng dẫn chi tiết cho trường hợp của bạn
            </p>
          </div>
          <div
            onClick={() => onNavigate("portal")}
            className="cursor-pointer rounded-xl bg-white p-8 shadow-sm transition-shadow hover:shadow-md"
          >
            <FileText className="mb-4 h-12 w-12 text-[#0A4FD5]" />
            <h3 className="mb-2 text-[#111827]">Nộp hồ sơ</h3>
            <p className="text-[#111827] opacity-70">Nộp trực tuyến & theo dõi tiến trình</p>
          </div>
          <div
            onClick={() => onNavigate("account")}
            className="cursor-pointer rounded-xl bg-white p-8 shadow-sm transition-shadow hover:shadow-md"
          >
            <User className="mb-4 h-12 w-12 text-[#0A4FD5]" />
            <h3 className="mb-2 text-[#111827]">Quản lý tài khoản</h3>
            <p className="text-[#111827] opacity-70">Lưu thủ tục yêu thích và theo dõi lịch sử</p>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="mt-20 bg-white">
        <div className="mx-auto max-w-[1440px] px-8 py-8">
          <div className="mb-4 text-[#111827] opacity-70">
            Liên hệ | Điều khoản | Chính sách bảo mật
          </div>
          <div className="flex items-center justify-between">
            <div className="text-[#111827] opacity-50">© 2025 GovAssist AI</div>
            <button
              onClick={() => onNavigate("mobile")}
              className="text-sm text-[#0A4FD5] hover:underline"
            >
              Xem giao diện mobile →
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
