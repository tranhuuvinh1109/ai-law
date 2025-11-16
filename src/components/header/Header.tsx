"use client";

import { Menu, X } from "lucide-react";
import { useState } from "react";

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navItems = [
    "GIỚI THIỆU",
    "DỊCH VỤ LUẬT SƯ",
    "TƯ VẤN PHÁP LUẬT",
    "TỬ ĐIỀN PHÁP LUẬT",
    "VĂN BẢN PHÁP LUẬT",
    "BIỂU MẪU",
    "GIÁO DỤC",
    "LIÊN HỆ",
  ];

  return (
    <header>
      {/* Top Navigation Bar */}
      <nav className="bg-[#8B6F47] text-white">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-0 lg:px-6">
          {/* Home Icon */}
          <div className="flex items-center gap-0">
            <div className="bg-yellow-400 px-4 py-3 text-lg font-bold text-[#8B6F47]">🏠</div>
          </div>

          {/* Desktop Navigation */}
          <div className="ml-6 hidden flex-1 items-center gap-6 lg:flex">
            {navItems.map((item) => (
              <a
                key={item}
                href="#"
                className="py-4 text-sm font-semibold transition hover:opacity-80"
              >
                {item}
              </a>
            ))}
          </div>

          {/* Language Selector */}
          <div className="ml-auto flex items-center gap-2 lg:ml-0">
            <span className="text-xs">🇬🇧</span>
            <a href="#" className="text-sm transition hover:opacity-80">
              English
            </a>
          </div>

          {/* Mobile Menu Button */}
          <button className="ml-4 p-2 lg:hidden" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Navigation Menu */}
        {isMenuOpen && (
          <div className="border-t border-[#6B5630] bg-[#7A5E3C] py-4 lg:hidden">
            <div className="space-y-3 px-4">
              {navItems.map((item) => (
                <a
                  key={item}
                  href="#"
                  className="block py-2 text-sm font-semibold transition hover:opacity-80"
                >
                  {item}
                </a>
              ))}
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}
