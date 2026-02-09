"use client";

import { Car } from "lucide-react";

export function Footer() {
  return (
    <footer className="gradient-hero relative overflow-hidden border-t border-white/5">
      <div className="gradient-hero-overlay" />
      <div className="max-w-7xl mx-auto px-4 py-12 relative z-10">
        <div className="grid md:grid-cols-4 gap-8 mb-8">
          <div>
            <div className="flex items-center gap-2.5 mb-4">
              <div className="bg-gradient-to-br from-[#C3002F] to-[#8B0020] text-white p-2 rounded-lg shadow-md">
                <Car className="h-4 w-4" />
              </div>
              <span className="font-bold text-white text-lg tracking-wider">NISSAN</span>
            </div>
            <p className="text-sm text-white/35 leading-relaxed">
              このサイトはモックアップです。
              実際の日産公式サイトではありません。
            </p>
          </div>
          <div>
            <h4 className="text-white/90 font-semibold text-sm tracking-wide mb-3">車種情報</h4>
            <ul className="space-y-2.5 text-sm">
              <li><a href="#" className="text-white/40 hover:text-white/80 transition-colors duration-300">グレード一覧</a></li>
              <li><a href="#" className="text-white/40 hover:text-white/80 transition-colors duration-300">スペック</a></li>
              <li><a href="#" className="text-white/40 hover:text-white/80 transition-colors duration-300">オプション</a></li>
              <li><a href="#" className="text-white/40 hover:text-white/80 transition-colors duration-300">カラー</a></li>
            </ul>
          </div>
          <div>
            <h4 className="text-white/90 font-semibold text-sm tracking-wide mb-3">お役立ち</h4>
            <ul className="space-y-2.5 text-sm">
              <li><a href="#" className="text-white/40 hover:text-white/80 transition-colors duration-300">見積りシミュレーション</a></li>
              <li><a href="#" className="text-white/40 hover:text-white/80 transition-colors duration-300">試乗予約</a></li>
              <li><a href="#" className="text-white/40 hover:text-white/80 transition-colors duration-300">販売店検索</a></li>
              <li><a href="#" className="text-white/40 hover:text-white/80 transition-colors duration-300">カタログ請求</a></li>
            </ul>
          </div>
          <div>
            <h4 className="text-white/90 font-semibold text-sm tracking-wide mb-3">サポート</h4>
            <ul className="space-y-2.5 text-sm">
              <li><a href="#" className="text-white/40 hover:text-white/80 transition-colors duration-300">よくあるご質問</a></li>
              <li><a href="#" className="text-white/40 hover:text-white/80 transition-colors duration-300">お問い合わせ</a></li>
              <li><a href="#" className="text-white/40 hover:text-white/80 transition-colors duration-300">My NISSAN</a></li>
            </ul>
          </div>
        </div>
        {/* Gradient divider */}
        <div className="h-px bg-gradient-to-r from-transparent via-white/10 to-transparent mb-6" />
        <div className="border-t border-white/5 pt-6 text-xs text-center">
          <p className="text-white/30">VLP Enhanced Mock - Research Prototype</p>
          <p className="mt-1 text-white/15">This is a prototype mockup for research purposes only.</p>
        </div>
      </div>
    </footer>
  );
}
