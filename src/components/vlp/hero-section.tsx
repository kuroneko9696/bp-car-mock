"use client";

import { ArrowDown, Play, Shield, Fuel, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Term } from "@/components/vlp/term-tooltip";

export function HeroSection() {
  return (
    <section className="relative gradient-hero text-white overflow-hidden texture-grain">
      {/* Gradient Overlay */}
      <div className="absolute inset-0 gradient-hero-overlay" />

      {/* Floating Gradient Orbs */}
      <div className="absolute top-20 left-[10%] w-72 h-72 rounded-full bg-[#C3002F]/8 blur-[100px] float-orb pointer-events-none" />
      <div className="absolute bottom-20 right-[15%] w-96 h-96 rounded-full bg-[#1A2D42]/40 blur-[120px] float-orb-delayed pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-[#C3002F]/3 blur-[150px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 py-20 md:py-28 relative z-10">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Text Content */}
          <div className="space-y-8 stagger-children">
            <div className="space-y-4">
              <span className="badge-premium inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-medium tracking-wide text-[#FF8DA6] bg-[#C3002F]/10 border border-[#C3002F]/20 shadow-[0_0_12px_-3px_rgba(195,0,47,0.2)]">
                <span className="w-1.5 h-1.5 rounded-full bg-[#FF6B8A] animate-pulse" />
                2024年モデル
              </span>
              <h1 className="text-5xl md:text-7xl font-bold leading-[0.95]">
                <span className="tracking-[0.2em] font-[family-name:var(--font-geist-sans)] text-white/95">
                  NISSAN
                </span>
                <br />
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#FF6B8A] to-[#FF8DA6] tracking-[0.05em]">
                  DAYZ
                </span>
              </h1>
              <p className="text-xl md:text-2xl text-white/50 font-light tracking-wide">
                軽さの中に、確かな満足を。
              </p>
            </div>

            <p className="text-white/40 leading-relaxed max-w-md text-sm md:text-base">
              先進の安全装備プロパイロットをはじめ、
              快適性と安全性を高次元で両立した軽ハイトワゴン。
              毎日の暮らしにちょうどいい、充実の一台。
            </p>

            <div className="flex flex-wrap gap-3">
              <div className="glass-dark flex items-center gap-2 text-sm text-white/70 px-3.5 py-2 rounded-full border border-white/8">
                <Shield className="h-3.5 w-3.5 text-[#FF6B8A]" />
                <Term term="プロパイロット"><span>プロパイロット搭載</span></Term>
              </div>
              <div className="glass-dark flex items-center gap-2 text-sm text-white/70 px-3.5 py-2 rounded-full border border-white/8">
                <Fuel className="h-3.5 w-3.5 text-[#FF6B8A]" />
                <span className="font-[family-name:var(--font-geist-sans)]">23.2<span className="text-xs ml-0.5">km/L</span></span>
              </div>
              <div className="glass-dark flex items-center gap-2 text-sm text-white/70 px-3.5 py-2 rounded-full border border-white/8">
                <Star className="h-3.5 w-3.5 text-[#FF6B8A]" />
                <span>安全性能5つ星</span>
              </div>
            </div>

            <div className="flex flex-wrap gap-3 pt-2">
              <Button
                size="lg"
                className="gradient-nissan-red hover-shine text-white shadow-[var(--shadow-glow-red)] hover:shadow-[0_0_30px_-5px_rgba(195,0,47,0.4)] transition-all duration-300 rounded-lg px-6 text-sm font-medium tracking-wide"
                onClick={() => document.getElementById("personalize")?.scrollIntoView({ behavior: "smooth" })}
              >
                あなたに合った1台を見つける
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="glass-dark border border-white/10 text-white/80 hover:text-white hover:bg-white/5 hover:border-white/20 transition-all duration-300 rounded-lg px-6 text-sm"
              >
                <Play className="h-4 w-4 mr-2" />
                動画を見る
              </Button>
            </div>

            <p className="text-xs text-white/30 font-[family-name:var(--font-geist-sans)] tracking-wide">
              <span className="text-white/50 text-base font-semibold">1,437,700</span>
              <span className="ml-0.5">円（税込）〜</span>
            </p>
          </div>

          {/* Vehicle Image */}
          <div className="relative animate-fade-up" style={{ animationDelay: "200ms" }}>
            <div className="relative aspect-[4/3] rounded-2xl overflow-hidden bg-gradient-to-br from-[#162B44] to-[#0C1B2A] flex items-center justify-center border border-white/5 shadow-[var(--shadow-dramatic)]">
              {/* Subtle inner glow */}
              <div className="absolute inset-0 bg-gradient-to-t from-transparent via-transparent to-white/3 pointer-events-none" />
              {/* Placeholder for vehicle image */}
              <div className="text-center space-y-4 p-8 relative z-10">
                <div className="w-full max-w-md mx-auto">
                  <img
                    src="https://www-asia.nissan-cdn.net/content/dam/Nissan/jp/vehicles/dayz/2409/top/pfa_dayz_2409_pc.jpg.ximg.full.hero.jpg"
                    alt="NISSAN DAYZ"
                    className="w-full h-auto rounded-lg drop-shadow-2xl"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.style.display = "none";
                      target.parentElement!.innerHTML = `
                        <div class="flex flex-col items-center justify-center h-48">
                          <svg class="h-24 w-24 text-white/20 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1" d="M9 17a2 2 0 11-4 0 2 2 0 014 0zM19 17a2 2 0 11-4 0 2 2 0 014 0z" />
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1" d="M13 16V6a1 1 0 00-1-1H4a1 1 0 00-1 1v10a1 1 0 001 1h1m8-1a1 1 0 01-1 1H9m4-1V8a1 1 0 011-1h2.586a1 1 0 01.707.293l3.414 3.414a1 1 0 01.293.707V16a1 1 0 01-1 1h-1m-6-1a1 1 0 001 1h1M5 17a2 2 0 104 0m-4 0a2 2 0 114 0m6 0a2 2 0 104 0m-4 0a2 2 0 114 0" />
                          </svg>
                          <p class="text-white/40 text-lg font-semibold">NISSAN DAYZ</p>
                          <p class="text-white/25 text-sm tracking-widest">HIGHWAY STAR</p>
                        </div>
                      `;
                    }}
                  />
                </div>
              </div>
            </div>
            {/* Price Tag - Glass Morphism */}
            <div className="absolute bottom-4 right-4 glass-dark rounded-xl px-4 py-3 border border-white/10 shadow-[var(--shadow-elevated)]">
              <p className="text-[10px] text-white/40 tracking-wide mb-0.5">ハイウェイスターGターボ プロパイロットエディション</p>
              <p className="text-lg font-bold font-[family-name:var(--font-geist-sans)] text-white/90 tracking-tight">
                1,929,400<span className="text-xs font-normal text-white/50 ml-0.5">円〜</span>
              </p>
            </div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="flex justify-center mt-16">
          <button
            onClick={() => document.getElementById("personalize")?.scrollIntoView({ behavior: "smooth" })}
            className="animate-scroll-pulse text-white/30 hover:text-white/60 transition-colors duration-300 p-2"
          >
            <ArrowDown className="h-5 w-5" />
          </button>
        </div>
      </div>
    </section>
  );
}
