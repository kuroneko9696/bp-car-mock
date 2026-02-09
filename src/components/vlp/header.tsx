"use client";

import { Car, Menu, StickyNote } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { useState } from "react";

interface HeaderProps {
  stickyNotesCount: number;
  onToggleStickyPanel: () => void;
}

export function Header({ stickyNotesCount, onToggleStickyPanel }: HeaderProps) {
  const [mobileOpen, setMobileOpen] = useState(false);

  const navItems = [
    { label: "グレード", href: "#grades" },
    { label: "パーソナライズ", href: "#personalize" },
    { label: "スペック", href: "#specs" },
    { label: "オプション", href: "#options" },
    { label: "AIアドバイザー", href: "#ai-advisor" },
  ];

  return (
    <header className="sticky top-0 z-50 glass border-b border-white/10 shadow-[var(--shadow-soft)]">
      <div className="max-w-7xl mx-auto px-4 h-14 flex items-center justify-between">
        {/* Logo */}
        <a href="#" className="flex items-center gap-3 group">
          <div className="bg-gradient-to-br from-[#C3002F] to-[#9B0025] text-white p-1.5 rounded-md shadow-sm transition-shadow duration-300 group-hover:shadow-[var(--shadow-glow-red)]">
            <Car className="h-4 w-4" />
          </div>
          <div className="flex items-center">
            <span className="font-bold text-base tracking-[0.15em] text-[#0C1B2A] font-[family-name:var(--font-geist-sans)]">
              NISSAN
            </span>
            <span className="text-[#C3002F]/30 mx-2 font-light">|</span>
            <span className="font-light text-sm tracking-widest text-[#0C1B2A]/70">
              DAYZ
            </span>
          </div>
        </a>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-0.5">
          {navItems.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="relative px-3 py-2 text-sm text-[#0C1B2A]/60 hover:text-[#0C1B2A] transition-colors duration-300 after:absolute after:bottom-0 after:left-1/2 after:-translate-x-1/2 after:h-[2px] after:w-0 hover:after:w-[60%] after:transition-all after:duration-300 after:ease-out after:bg-[#C3002F] after:rounded-full"
            >
              {item.label}
            </a>
          ))}
        </nav>

        {/* Right Actions */}
        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="sm"
            onClick={onToggleStickyPanel}
            className="relative text-[#0C1B2A]/60 hover:text-[#0C1B2A] hover:bg-[#0C1B2A]/5 transition-all duration-300"
          >
            <StickyNote className="h-4 w-4 mr-1" />
            <span className="hidden sm:inline text-xs">メモ</span>
            {stickyNotesCount > 0 && (
              <span className="absolute -top-1 -right-1 h-4 w-4 flex items-center justify-center text-[9px] font-bold text-white bg-gradient-to-br from-[#C3002F] to-[#E8103D] rounded-full shadow-sm">
                {stickyNotesCount}
              </span>
            )}
          </Button>

          <Button
            size="sm"
            className="gradient-nissan-red hover-shine text-white text-xs shadow-[var(--shadow-soft)] hover:shadow-[var(--shadow-glow-red)] transition-shadow duration-300 rounded-md px-4"
          >
            見積りへ進む
          </Button>

          {/* Mobile Menu */}
          <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="sm" className="md:hidden text-[#0C1B2A]/60 hover:text-[#0C1B2A]">
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-72 bg-white/95 backdrop-blur-xl border-l border-[#0C1B2A]/5">
              <div className="flex flex-col gap-1 mt-8">
                {navItems.map((item) => (
                  <a
                    key={item.href}
                    href={item.href}
                    onClick={() => setMobileOpen(false)}
                    className="px-4 py-3 text-sm text-[#0C1B2A]/70 hover:text-[#0C1B2A] hover:bg-[#0C1B2A]/3 rounded-lg transition-all duration-200 border-l-2 border-transparent hover:border-[#C3002F]"
                  >
                    {item.label}
                  </a>
                ))}
                <div className="mt-4 px-4">
                  <Button
                    size="sm"
                    className="w-full gradient-nissan-red hover-shine text-white shadow-[var(--shadow-soft)]"
                  >
                    見積りへ進む
                  </Button>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
