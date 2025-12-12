"use client";

import { useCreateNewConversation } from "@/api";
import { SLIDES } from "@/constants";
import { useApp } from "@/providers";
import {
  ArrowRight,
  Calendar,
  CheckCircle,
  Clock,
  LogOut,
  Menu,
  MessageCircle,
  Search,
  Send,
  Sparkles,
  User,
  X,
} from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export const HomePage = () => {
  const router = useRouter();
  const { refetchConversationList, user } = useApp();
  const [message, setMessage] = useState("");
  const [currentSlide, setCurrentSlide] = useState(0);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const { mutate: createNewConversationMutation } = useCreateNewConversation();

  const handleChatNow = () => {
    if (!message.trim()) return;

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

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev === SLIDES.length - 1 ? 0 : prev + 1));
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-white via-[#F3F4F6] to-white">
      {/* Hero Section */}
      <div className="sticky top-0 z-50 bg-white bg-white/90 shadow-sm backdrop-blur-sm">
        <div className="mx-auto max-w-[1440px] px-4 py-4 md:px-8">
          {/* Navigation */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-8 md:gap-12">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br from-[#0A4FD5] to-[#3DDC84]">
                  <Sparkles className="h-6 w-6 text-white" />
                </div>
                <div>
                  <div className="font-semibold text-[#0A4FD5]">GovAssist AI</div>
                  <div className="hidden text-xs text-[#111827] opacity-60 md:block">
                    Hỗ trợ thủ tục hành chính
                  </div>
                </div>
              </div>
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
                    <span className="hidden lg:block">{user.username}</span>
                  </Link>
                  <Link
                    href={"/chat"}
                    className="flex items-center gap-2 rounded-lg bg-gradient-to-r from-[#0A4FD5] to-[#0858e0] px-4 py-2 text-sm text-white transition-all hover:shadow-lg md:px-6 md:py-2.5 md:text-base"
                  >
                    <MessageCircle className="h-4 w-4" />
                    <span className="hidden md:inline">Trò chuyện</span>
                  </Link>
                  <button
                    // onClick={handleLogout}
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
                  <button
                    onClick={() => handleChatNow()}
                    className="flex items-center gap-2 rounded-lg bg-gradient-to-r from-[#0A4FD5] to-[#0858e0] px-4 py-2 text-sm text-white transition-all hover:shadow-lg md:px-6 md:py-2.5 md:text-base"
                  >
                    <span className="hidden md:inline">Bắt đầu ngay</span>
                    <span className="md:hidden">Bắt đầu</span>
                    <ArrowRight className="h-4 w-4" />
                  </button>
                </>
              )}
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="rounded-lg p-2 transition-colors hover:bg-[#F3F4F6] lg:hidden"
              >
                {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </button>
            </div>
          </div>

          {/* Mobile Menu */}
          {mobileMenuOpen && (
            <div className="mt-4 space-y-2 border-t border-gray-200 pt-4 pb-4 lg:hidden">
              <Link
                href={"/"}
                onClick={() => {
                  setMobileMenuOpen(false);
                }}
                className="block w-full rounded-lg px-4 py-2 text-left transition-colors hover:bg-[#F3F4F6]"
              >
                Trang chủ
              </Link>
              <Link
                href={"/thu-tuc"}
                onClick={() => {
                  setMobileMenuOpen(false);
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
                    setMobileMenuOpen(false);
                  }}
                  className="block w-full rounded-lg px-4 py-2 text-left transition-colors hover:bg-[#F3F4F6]"
                >
                  Admin
                </Link>
              )}
              {user && (
                <Link
                  href={"/tai-khoan"}
                  onClick={() => {
                    setMobileMenuOpen(false);
                  }}
                  className="block w-full rounded-lg px-4 py-2 text-left transition-colors hover:bg-[#F3F4F6]"
                >
                  Tài khoản
                </Link>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Hero Slider */}
      <div className="relative overflow-hidden bg-gradient-to-br from-white to-[#F3F4F6]">
        <div className="mx-auto max-w-[1440px] px-4 py-12 md:px-8 md:py-20">
          <div className="relative">
            {SLIDES.map((slide, index) => (
              <div
                key={index}
                className={`transition-all duration-500 ${
                  index === currentSlide ? "opacity-100" : "absolute inset-0 opacity-0"
                }`}
              >
                <div className="flex flex-col items-center justify-between gap-8 lg:flex-row lg:gap-16">
                  <div className="max-w-[680px] flex-1">
                    <div
                      className={`inline-flex items-center gap-2 bg-gradient-to-r px-4 py-2 ${slide.bgGradient} mb-6 rounded-full border border-[#0A4FD5]/20`}
                    >
                      <Sparkles className="h-4 w-4 text-[#0A4FD5]" />
                      <span className="text-sm text-[#0A4FD5]">Hỗ trợ bởi AI tiên tiến</span>
                    </div>
                    <h1 className="mb-6 text-3xl leading-tight text-[#111827] md:text-4xl lg:text-5xl">
                      <span
                        className={`bg-gradient-to-r ${slide.gradient} bg-clip-text text-transparent`}
                      >
                        {slide.title}
                      </span>
                    </h1>
                    <p className="mb-8 text-base leading-relaxed text-[#111827] opacity-70 md:text-lg">
                      {slide.description}
                    </p>

                    {/* Stats */}
                    <div className="mb-10 grid grid-cols-3 gap-4 md:gap-6">
                      <div>
                        <div className="mb-1 text-2xl text-[#0A4FD5] md:text-3xl">10K+</div>
                        <div className="text-xs text-[#111827] opacity-60 md:text-sm">
                          Người dùng
                        </div>
                      </div>
                      <div>
                        <div className="mb-1 text-2xl text-[#0A4FD5] md:text-3xl">500+</div>
                        <div className="text-xs text-[#111827] opacity-60 md:text-sm">Thủ tục</div>
                      </div>
                      <div>
                        <div className="mb-1 text-2xl text-[#0A4FD5] md:text-3xl">98%</div>
                        <div className="text-xs text-[#111827] opacity-60 md:text-sm">Hài lòng</div>
                      </div>
                    </div>

                    <div className="flex flex-col gap-4 sm:flex-row">
                      <Link
                        href={"/chat"}
                        className="group flex items-center justify-center gap-2 rounded-lg bg-gradient-to-r from-[#0A4FD5] to-[#0858e0] px-6 py-3 text-white transition-all hover:shadow-xl md:px-8 md:py-4"
                      >
                        <Send className="h-5 w-5" />
                        Bắt đầu trò chuyện
                        <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                      </Link>
                    </div>
                  </div>
                  <div className="relative hidden max-w-[600px] flex-1 lg:block">
                    <div className="relative">
                      {/* Decorative circles */}
                      <div className="absolute -top-8 -left-8 h-32 w-32 rounded-full bg-[#3DDC84]/20 blur-3xl"></div>
                      <div className="absolute -right-8 -bottom-8 h-40 w-40 rounded-full bg-[#0A4FD5]/20 blur-3xl"></div>

                      <div className="relative rounded-3xl border border-gray-200 bg-gradient-to-br from-white to-[#F3F4F6] p-8 shadow-2xl">
                        <div className="mb-4 rounded-2xl bg-white p-6 shadow-lg">
                          <div className="mb-4 flex items-center gap-3">
                            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-[#0A4FD5] to-[#3DDC84]">
                              <MessageCircle className="h-5 w-5 text-white" />
                            </div>
                            <div>
                              <div className="text-sm text-[#111827]">GovAI Assistant</div>
                              <div className="flex items-center gap-1">
                                <div className="h-2 w-2 rounded-full bg-green-500"></div>
                                <div className="text-xs text-[#111827] opacity-60">
                                  Đang hoạt động
                                </div>
                              </div>
                            </div>
                          </div>
                          <div className="space-y-3">
                            <div className="rounded-lg bg-[#F3F4F6] p-3 text-sm text-[#111827]">
                              Xin chào! Tôi có thể giúp gì cho bạn?
                            </div>
                            <div className="ml-8 rounded-lg bg-[#0A4FD5] p-3 text-sm text-white">
                              Thủ tục đăng ký kinh doanh cần gì?
                            </div>
                          </div>
                        </div>
                        <div className="grid grid-cols-2 gap-3">
                          <div className="rounded-xl border border-gray-100 bg-white p-4 shadow-sm">
                            <CheckCircle className="mb-2 h-6 w-6 text-[#3DDC84]" />
                            <div className="text-sm text-[#111827]">Tư vấn chính xác</div>
                          </div>
                          <div className="rounded-xl border border-gray-100 bg-white p-4 shadow-sm">
                            <Clock className="mb-2 h-6 w-6 text-[#0A4FD5]" />
                            <div className="text-sm text-[#111827]">Phản hồi nhanh</div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}

            {/* Slider Controls - Only dots indicator */}
            <div className="mt-8 flex justify-center">
              <div className="flex gap-2 rounded-full bg-white/90 px-4 py-3 shadow-lg backdrop-blur-sm">
                {SLIDES.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentSlide(index)}
                    className={`h-2 rounded-full transition-all ${
                      index === currentSlide
                        ? "w-8 bg-[#0A4FD5]"
                        : "w-2 bg-gray-300 hover:bg-gray-400"
                    }`}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="mx-auto max-w-[1440px] px-4 py-16 md:px-8">
        <div className="mb-12 text-center">
          <h2 className="mb-4 text-[#111827]">Tính năng nổi bật</h2>
          <p className="mx-auto max-w-2xl text-[#111827] opacity-70">
            Trải nghiệm dịch vụ hỗ trợ thủ tục hành chính thông minh và hiện đại
          </p>
        </div>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
          <Link
            href={"/thu-tuc"}
            className="group cursor-pointer rounded-2xl border border-gray-100 bg-white p-8 shadow-sm transition-all hover:shadow-xl"
          >
            <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-xl bg-gradient-to-br from-[#0A4FD5]/10 to-[#3DDC84]/10 transition-transform group-hover:scale-110">
              <Search className="h-7 w-7 text-[#0A4FD5]" />
            </div>
            <h3 className="mb-2 text-[#111827]">Tra cứu nhanh</h3>
            <p className="text-sm text-[#111827] opacity-70">
              Tìm kiếm thủ tục theo từ khóa với kết quả chính xác
            </p>
          </Link>
          <Link
            href={"/chat"}
            className="group cursor-pointer rounded-2xl border border-gray-100 bg-white p-8 shadow-sm transition-all hover:shadow-xl"
          >
            <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-xl bg-gradient-to-br from-[#0A4FD5]/10 to-[#3DDC84]/10 transition-transform group-hover:scale-110">
              <MessageCircle className="h-7 w-7 text-[#0A4FD5]" />
            </div>
            <h3 className="mb-2 text-[#111827]">Chat với AI</h3>
            <p className="text-sm text-[#111827] opacity-70">
              Tư vấn chi tiết và hướng dẫn từng bước cụ thể
            </p>
          </Link>
          {user ? (
            <Link
              href={"/tai-khoan"}
              className="group cursor-pointer rounded-2xl border border-gray-100 bg-white p-8 shadow-sm transition-all hover:shadow-xl"
            >
              <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-xl bg-gradient-to-br from-[#0A4FD5]/10 to-[#3DDC84]/10 transition-transform group-hover:scale-110">
                <User className="h-7 w-7 text-[#0A4FD5]" />
              </div>
              <h3 className="mb-2 text-[#111827]">Quản lý tài khoản</h3>
              <p className="text-sm text-[#111827] opacity-70">
                Theo dõi lịch sử và quản lý thủ tục của bạn
              </p>
            </Link>
          ) : (
            <Link
              href={"/dang-nhap"}
              className="group cursor-pointer rounded-2xl border-2 border-dashed border-[#0A4FD5]/30 bg-gradient-to-br from-[#0A4FD5]/5 to-[#3DDC84]/5 p-8 shadow-sm transition-all hover:shadow-xl"
            >
              <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-xl bg-gradient-to-br from-[#0A4FD5]/10 to-[#3DDC84]/10 transition-transform group-hover:scale-110">
                <User className="h-7 w-7 text-[#0A4FD5]" />
              </div>
              <h3 className="mb-2 text-[#111827]">Đăng nhập ngay</h3>
              <p className="text-sm text-[#111827] opacity-70">
                Để sử dụng GovAI và quản lý tài khoản
              </p>
            </Link>
          )}
        </div>
      </div>

      {/* Blog Preview Section */}
      <div className="mx-auto max-w-[1440px] px-4 py-16 md:px-8">
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h2 className="mb-2 text-[#111827]">Bài viết mới nhất</h2>
            <p className="text-[#111827] opacity-70">Tin tức và hướng dẫn về thủ tục hành chính</p>
          </div>
          <Link
            href={"/thu-tuc"}
            className="flex items-center gap-2 text-[#0A4FD5] hover:underline"
          >
            Xem tất cả
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          <div
            // onClick={() => onNavigate("blog-detail", "1")}
            className="group cursor-pointer overflow-hidden rounded-xl bg-white shadow-sm transition-all hover:shadow-xl"
          >
            <div className="relative h-48 overflow-hidden">
              <img
                src="https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=800&h=400&fit=crop"
                alt="Blog post"
                className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-110"
              />
              <div className="absolute top-4 left-4">
                <span className="rounded-full bg-[#0A4FD5] px-3 py-1 text-xs text-white">
                  Hướng dẫn
                </span>
              </div>
            </div>
            <div className="p-6">
              <h3 className="mb-2 line-clamp-2 text-[#111827] transition-colors group-hover:text-[#0A4FD5]">
                Hướng dẫn đăng ký kinh doanh online 2025
              </h3>
              <p className="mb-4 line-clamp-2 text-sm text-[#111827] opacity-70">
                Quy trình đăng ký kinh doanh online đơn giản, nhanh chóng với GovAssist AI...
              </p>
              <div className="flex items-center gap-4 text-sm text-[#111827] opacity-60">
                <div className="flex items-center gap-1">
                  <Calendar className="h-4 w-4" />
                  <span>10/12/2025</span>
                </div>
                <div className="flex items-center gap-1">
                  <Clock className="h-4 w-4" />
                  <span>5 phút đọc</span>
                </div>
              </div>
            </div>
          </div>

          <div
            // onClick={() => onNavigate("blog-detail", "2")}
            className="group cursor-pointer overflow-hidden rounded-xl bg-white shadow-sm transition-all hover:shadow-xl"
          >
            <div className="relative h-48 overflow-hidden">
              <img
                src="https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=800&h=400&fit=crop"
                alt="Blog post"
                className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-110"
              />
              <div className="absolute top-4 left-4">
                <span className="rounded-full bg-[#3DDC84] px-3 py-1 text-xs text-white">
                  Mẹo hay
                </span>
              </div>
            </div>
            <div className="p-6">
              <h3 className="mb-2 line-clamp-2 text-[#111827] transition-colors group-hover:text-[#0A4FD5]">
                10 mẹo để hoàn tất thủ tục hành chính nhanh
              </h3>
              <p className="mb-4 line-clamp-2 text-sm text-[#111827] opacity-70">
                Những mẹo hay giúp bạn tiết kiệm thời gian khi làm thủ tục hành chính...
              </p>
              <div className="flex items-center gap-4 text-sm text-[#111827] opacity-60">
                <div className="flex items-center gap-1">
                  <Calendar className="h-4 w-4" />
                  <span>08/12/2025</span>
                </div>
                <div className="flex items-center gap-1">
                  <Clock className="h-4 w-4" />
                  <span>7 phút đọc</span>
                </div>
              </div>
            </div>
          </div>

          <div
            // onClick={() => onNavigate("blog-detail", "3")}
            className="group cursor-pointer overflow-hidden rounded-xl bg-white shadow-sm transition-all hover:shadow-xl"
          >
            <div className="relative h-48 overflow-hidden">
              <img
                src="https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800&h=400&fit=crop"
                alt="Blog post"
                className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-110"
              />
              <div className="absolute top-4 left-4">
                <span className="rounded-full bg-purple-500 px-3 py-1 text-xs text-white">
                  Tin tức
                </span>
              </div>
            </div>
            <div className="p-6">
              <h3 className="mb-2 line-clamp-2 text-[#111827] transition-colors group-hover:text-[#0A4FD5]">
                GovAI - Trợ lý AI thông minh cho thủ tục hành chính
              </h3>
              <p className="mb-4 line-clamp-2 text-sm text-[#111827] opacity-70">
                Khám phá tính năng mới của GovAI, model AI được huấn luyện chuyên biệt...
              </p>
              <div className="flex items-center gap-4 text-sm text-[#111827] opacity-60">
                <div className="flex items-center gap-1">
                  <Calendar className="h-4 w-4" />
                  <span>03/12/2025</span>
                </div>
                <div className="flex items-center gap-1">
                  <Clock className="h-4 w-4" />
                  <span>4 phút đọc</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="mx-auto max-w-[1440px] px-8 py-16">
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#0A4FD5] to-[#0858e0] p-12 text-center text-white shadow-2xl">
          {/* Decorative elements */}
          <div className="absolute top-0 right-0 h-64 w-64 translate-x-1/2 -translate-y-1/2 rounded-full bg-white/10"></div>
          <div className="absolute bottom-0 left-0 h-48 w-48 -translate-x-1/2 translate-y-1/2 rounded-full bg-white/10"></div>

          <div className="relative z-10">
            <h2 className="mb-4 text-white">Sẵn sàng bắt đầu?</h2>
            <p className="mx-auto mb-8 max-w-2xl text-lg text-white/90">
              Hãy để GovAssist AI đồng hành cùng bạn trong mọi thủ tục hành chính
            </p>
            <button
              onClick={() => handleChatNow()}
              className="group inline-flex items-center gap-2 rounded-lg bg-white px-8 py-4 text-[#0A4FD5] transition-all hover:shadow-xl"
            >
              Trò chuyện với AI ngay
              <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
            </button>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="mt-20 bg-[#111827] text-white">
        <div className="mx-auto max-w-[1440px] px-8 py-12">
          <div className="mb-8 grid grid-cols-1 gap-8 md:grid-cols-4">
            <div>
              <div className="mb-4 flex items-center gap-2">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-[#0A4FD5] to-[#3DDC84]">
                  <Sparkles className="h-5 w-5 text-white" />
                </div>
                <div className="text-white">GovAssist AI</div>
              </div>
              <p className="text-sm text-white/70">
                Giải pháp AI hỗ trợ thủ tục hành chính thông minh
              </p>
            </div>
            <div>
              <h4 className="mb-4 text-white">Sản phẩm</h4>
              <div className="space-y-2 text-sm">
                <div className="cursor-pointer text-white/70 transition-colors hover:text-white">
                  Tra cứu thủ tục
                </div>
                <div className="cursor-pointer text-white/70 transition-colors hover:text-white">
                  Chat AI
                </div>
                <div className="cursor-pointer text-white/70 transition-colors hover:text-white">
                  Nộp hồ sơ
                </div>
              </div>
            </div>
            <div>
              <h4 className="mb-4 text-white">Hỗ trợ</h4>
              <div className="space-y-2 text-sm">
                <div className="cursor-pointer text-white/70 transition-colors hover:text-white">
                  Hướng dẫn
                </div>
                <div className="cursor-pointer text-white/70 transition-colors hover:text-white">
                  Câu hỏi thường gặp
                </div>
                <div className="cursor-pointer text-white/70 transition-colors hover:text-white">
                  Liên hệ
                </div>
              </div>
            </div>
            <div>
              <h4 className="mb-4 text-white">Pháp lý</h4>
              <div className="space-y-2 text-sm">
                <div className="cursor-pointer text-white/70 transition-colors hover:text-white">
                  Điều khoản sử dụng
                </div>
                <div className="cursor-pointer text-white/70 transition-colors hover:text-white">
                  Chính sách bảo mật
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
