"use client";

import { useState } from "react";
import { Search, Filter, Clock } from "lucide-react";
import Link from "next/link";

interface Procedure {
  id: string;
  title: string;
  desc: string;
  time: string;
  category: string;
  level: string;
}

export function ProcedureList() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedLevel, setSelectedLevel] = useState("all");

  const procedures: Procedure[] = [
    {
      id: "1",
      title: "Đăng ký kinh doanh",
      desc: "Thủ tục thành lập doanh nghiệp mới",
      time: "3-5 ngày",
      category: "Kinh doanh",
      level: "Tỉnh/TP",
    },
    {
      id: "2",
      title: "Chuyển nhượng đất",
      desc: "Thủ tục chuyển nhượng quyền sử dụng đất",
      time: "7-15 ngày",
      category: "Đất đai",
      level: "Quận/Huyện",
    },
    {
      id: "3",
      title: "Đăng ký khai sinh",
      desc: "Thủ tục đăng ký khai sinh cho trẻ em",
      time: "1-2 ngày",
      category: "Hộ tịch",
      level: "Phường/Xã",
    },
    {
      id: "4",
      title: "Cấp giấy phép xây dựng",
      desc: "Thủ tục xin phép xây dựng công trình",
      time: "15-30 ngày",
      category: "Xây dựng",
      level: "Quận/Huyện",
    },
    {
      id: "5",
      title: "Đăng ký BHXH",
      desc: "Thủ tục đăng ký bảo hiểm xã hội",
      time: "5-7 ngày",
      category: "BHXH",
      level: "Tỉnh/TP",
    },
    {
      id: "6",
      title: "Đăng ký thuế",
      desc: "Thủ tục đăng ký mã số thuế",
      time: "3-5 ngày",
      category: "Thuế",
      level: "Quận/Huyện",
    },
  ];

  const filteredProcedures = procedures.filter((proc) => {
    const matchesSearch =
      proc.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      proc.desc.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === "all" || proc.category === selectedCategory;
    const matchesLevel = selectedLevel === "all" || proc.level === selectedLevel;
    return matchesSearch && matchesCategory && matchesLevel;
  });

  return (
    <div className="min-h-screen bg-[#F3F4F6]">
      {/* Header */}
      <div className="border-b border-gray-200 bg-white">
        <div className="mx-auto max-w-[1200px] px-8 py-6">
          <div className="mb-6 flex items-center justify-between">
            <Link href={"/"} className="text-[#0A4FD5] hover:underline">
              ← Quay lại
            </Link>
            <Link
              href={"/chat"}
              className="rounded-lg bg-[#0A4FD5] px-6 py-2 text-white transition-colors hover:bg-[#083aa3]"
            >
              Chat với AI
            </Link>
          </div>
          <h1 className="mb-2 text-[#111827]">Danh mục Thủ tục</h1>
          <p className="text-[#111827] opacity-70">
            Tìm kiếm và tra cứu thông tin các thủ tục hành chính
          </p>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="mx-auto max-w-[1200px] px-8 py-6">
        <div className="mb-6 flex gap-4">
          <div className="relative flex-1">
            <Search className="absolute top-1/2 left-4 h-5 w-5 -translate-y-1/2 transform text-[#111827] opacity-40" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Nhập tên thủ tục..."
              className="w-full rounded-lg border border-gray-300 bg-white py-3 pr-4 pl-12 focus:border-[#0A4FD5] focus:outline-none"
            />
          </div>
          <div className="flex gap-2">
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="rounded-lg border border-gray-300 bg-white px-4 py-3 focus:border-[#0A4FD5] focus:outline-none"
            >
              <option value="all">Tất cả lĩnh vực</option>
              <option value="Kinh doanh">Kinh doanh</option>
              <option value="Đất đai">Đất đai</option>
              <option value="Hộ tịch">Hộ tịch</option>
              <option value="Xây dựng">Xây dựng</option>
              <option value="BHXH">BHXH</option>
              <option value="Thuế">Thuế</option>
            </select>
            <select
              value={selectedLevel}
              onChange={(e) => setSelectedLevel(e.target.value)}
              className="rounded-lg border border-gray-300 bg-white px-4 py-3 focus:border-[#0A4FD5] focus:outline-none"
            >
              <option value="all">Tất cả cấp</option>
              <option value="Tỉnh/TP">Tỉnh/TP</option>
              <option value="Quận/Huyện">Quận/Huyện</option>
              <option value="Phường/Xã">Phường/Xã</option>
            </select>
          </div>
        </div>

        {/* Results */}
        <div className="mb-4 text-[#111827] opacity-70">
          Tìm thấy {filteredProcedures.length} thủ tục
        </div>

        {/* Procedure Cards */}
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filteredProcedures.map((proc) => (
            <div
              key={proc.id}
              className="rounded-xl bg-white p-6 shadow-sm transition-shadow hover:shadow-md"
            >
              <div className="mb-3 flex items-start justify-between">
                <div className="inline-block rounded-full bg-[#0A4FD5]/10 px-3 py-1 text-sm text-[#0A4FD5]">
                  {proc.category}
                </div>
                <div className="flex items-center gap-1 text-sm text-[#111827] opacity-70">
                  <Clock className="h-4 w-4" />
                  {proc.time}
                </div>
              </div>
              <h3 className="mb-2 text-[#111827]">{proc.title}</h3>
              <p className="mb-4 text-[#111827] opacity-70">{proc.desc}</p>
              <div className="mb-4 text-sm text-[#111827] opacity-50">Cấp: {proc.level}</div>
              <Link
                href={`/thu-tuc/${1}`}
                className="w-full rounded-lg bg-[#F3F4F6] py-2 text-[#0A4FD5] transition-colors hover:bg-[#0A4FD5] hover:text-white"
              >
                Xem chi tiết
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
