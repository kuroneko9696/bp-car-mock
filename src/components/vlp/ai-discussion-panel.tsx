"use client";

import { useState, useRef, useEffect } from "react";
import { Wallet, Wrench, Heart, TrendingUp, Send, Bot, User, MessageCircle, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { ScrollArea } from "@/components/ui/scroll-area";
import { aiAgents, grades, options } from "@/data/vehicle-data";

const agentIcons: Record<string, React.ReactNode> = {
  wallet: <Wallet className="h-4 w-4" />,
  wrench: <Wrench className="h-4 w-4" />,
  heart: <Heart className="h-4 w-4" />,
  "trending-up": <TrendingUp className="h-4 w-4" />,
};

interface Message {
  id: string;
  agentId: string;
  agentName: string;
  message: string;
  isUser: boolean;
  timestamp: number;
}

// Simulated AI discussion responses
const discussionTopics: Record<string, Message[]> = {
  "highway-star-gturbo-prospec": [
    {
      id: "1",
      agentId: "cost-advisor",
      agentName: "コストアドバイザー",
      message: "HIGHWAY STAR Gターボ ProSPECは最上位グレードで1,944,800円です。初期費用は高めですが、プロパイロットやアラウンドビューモニターが標準装備なので、後付けオプション費用が抑えられます。総合的なコストパフォーマンスは良好です。",
      isUser: false,
      timestamp: Date.now(),
    },
    {
      id: "2",
      agentId: "maintenance-advisor",
      agentName: "メンテナンスアドバイザー",
      message: "ターボエンジンは通常のNA（自然吸気）エンジンと比べてオイル交換の頻度がやや高くなります。3,000〜5,000km毎の交換をお勧めします。ただし、日産の軽自動車のターボエンジンは信頼性が高く、通常のメンテナンスで長く使えます。",
      isUser: false,
      timestamp: Date.now() + 1000,
    },
    {
      id: "3",
      agentId: "lifestyle-advisor",
      agentName: "ライフスタイルアドバイザー",
      message: "通勤やお出かけでの高速道路利用が多い方には最適です。プロパイロットは渋滞時の疲労を大幅に軽減しますし、ターボのパワーで合流もスムーズ。「運転を楽しみたい」「ストレスなく走りたい」という方にぴったりです。",
      isUser: false,
      timestamp: Date.now() + 2000,
    },
    {
      id: "4",
      agentId: "trade-advisor",
      agentName: "リセールアドバイザー",
      message: "HIGHWAY STAR系は中古市場で人気が高く、リセールバリューに優れています。特にターボモデルは需要が安定しており、3年後の下取り価格も比較的高い水準を維持する傾向があります。ホワイトパールやブラックなどの定番色を選ぶと、さらに有利です。",
      isUser: false,
      timestamp: Date.now() + 3000,
    },
  ],
  default: [
    {
      id: "d1",
      agentId: "cost-advisor",
      agentName: "コストアドバイザー",
      message: "デイズは軽自動車の中でもコストバランスに優れた車種です。Sグレードの1,437,700円から始まり、予算に応じて装備を選べます。税金・保険も軽自動車価格で維持費を抑えられます。",
      isUser: false,
      timestamp: Date.now(),
    },
    {
      id: "d2",
      agentId: "lifestyle-advisor",
      agentName: "ライフスタイルアドバイザー",
      message: "まずは「利用シーンの選択」をしてみてください。通勤、ファミリー、買い物など、お使いの目的に合わせて最適なグレードとオプションをご提案できます。",
      isUser: false,
      timestamp: Date.now() + 1000,
    },
  ],
};

const questionResponses: Record<string, Message[]> = {
  "維持費": [
    {
      id: "q1",
      agentId: "cost-advisor",
      agentName: "コストアドバイザー",
      message: "デイズの年間維持費の目安をお伝えしますね。軽自動車税10,800円、自賠責保険約12,500円/年、任意保険約40,000〜80,000円/年、車検費用約50,000円/2年。ガソリン代は年間10,000km走行で約60,000円（レギュラー160円/L、燃費23.2km/Lの場合）です。",
      isUser: false,
      timestamp: Date.now(),
    },
    {
      id: "q2",
      agentId: "maintenance-advisor",
      agentName: "メンテナンスアドバイザー",
      message: "補足しますと、オイル交換が半年毎に約5,000円、タイヤ交換が3〜4年毎に約30,000円です。NAエンジンであれば一般的な軽自動車と同程度の維持費で済みますよ。",
      isUser: false,
      timestamp: Date.now() + 1000,
    },
  ],
  "下取り": [
    {
      id: "q3",
      agentId: "trade-advisor",
      agentName: "リセールアドバイザー",
      message: "デイズのリセールバリューについてお話ししますね。軽ハイトワゴンは需要が高く、3年後の残価率は約50〜55%程度が目安です。HIGHWAY STAR系は特に人気があり、残価率が高い傾向にあります。",
      isUser: false,
      timestamp: Date.now(),
    },
    {
      id: "q4",
      agentId: "cost-advisor",
      agentName: "コストアドバイザー",
      message: "下取りを考えると、購入時にHIGHWAY STARを選ぶのは賢い選択です。価格差を下取り時に取り戻せる可能性があります。また、ボディカラーは定番のホワイトパール・ブラックが下取り有利ですよ。",
      isUser: false,
      timestamp: Date.now() + 1000,
    },
  ],
  "安全": [
    {
      id: "q5",
      agentId: "lifestyle-advisor",
      agentName: "ライフスタイルアドバイザー",
      message: "デイズの安全装備は軽自動車トップクラスです。全グレードにインテリジェントエマージェンシーブレーキと踏み間違い衝突防止アシストが標準装備。お子様のいるご家庭でも安心ですね。",
      isUser: false,
      timestamp: Date.now(),
    },
    {
      id: "q6",
      agentId: "maintenance-advisor",
      agentName: "メンテナンスアドバイザー",
      message: "G以上のグレードにはプロパイロットとSOSコールも標準装備されます。安全装備のセンサー類は定期的なキャリブレーションが推奨されますが、通常の車検時にディーラーで対応可能です。追加メンテナンスコストはほぼかかりません。",
      isUser: false,
      timestamp: Date.now() + 1000,
    },
  ],
  "default": [
    {
      id: "qd1",
      agentId: "lifestyle-advisor",
      agentName: "ライフスタイルアドバイザー",
      message: "ご質問ありがとうございます。デイズについて、コスト、メンテナンス、装備、下取りなど、何でもお聞きください。4人のアドバイザーがそれぞれの専門分野からお答えします。",
      isUser: false,
      timestamp: Date.now(),
    },
    {
      id: "qd2",
      agentId: "cost-advisor",
      agentName: "コストアドバイザー",
      message: "例えば「維持費はどれくらい？」「下取り価格は？」「おすすめのグレードは？」などお気軽にどうぞ。具体的なご質問ほど、的確にお答えできますよ。",
      isUser: false,
      timestamp: Date.now() + 1000,
    },
  ],
};

interface AiDiscussionPanelProps {
  selectedGrade: string | null;
  selectedScene: string | null;
}

export function AiDiscussionPanel({ selectedGrade, selectedScene }: AiDiscussionPanelProps) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [activeAgentIndex, setActiveAgentIndex] = useState(-1);
  const scrollRef = useRef<HTMLDivElement>(null);
  const initializedRef = useRef(false);

  useEffect(() => {
    if (!initializedRef.current) {
      initializedRef.current = true;
      const topic = selectedGrade || "default";
      const initialMessages = discussionTopics[topic] || discussionTopics["default"];
      simulateDiscussion(initialMessages);
    }
  }, []);

  useEffect(() => {
    if (initializedRef.current && selectedGrade) {
      const topic = selectedGrade;
      const gradeMessages = discussionTopics[topic];
      if (gradeMessages) {
        const grade = grades.find((g) => g.id === selectedGrade);
        const userMsg: Message = {
          id: crypto.randomUUID(),
          agentId: "user",
          agentName: "あなた",
          message: `${grade?.name} ${grade?.subName || ""} について教えてください`,
          isUser: true,
          timestamp: Date.now(),
        };
        setMessages((prev) => [...prev, userMsg]);
        setTimeout(() => simulateDiscussion(gradeMessages), 500);
      }
    }
  }, [selectedGrade]);

  const simulateDiscussion = (newMessages: Message[]) => {
    setIsTyping(true);
    newMessages.forEach((msg, index) => {
      setTimeout(() => {
        setActiveAgentIndex(aiAgents.findIndex((a) => a.id === msg.agentId));
        setMessages((prev) => [
          ...prev,
          { ...msg, id: crypto.randomUUID(), timestamp: Date.now() },
        ]);
        if (index === newMessages.length - 1) {
          setIsTyping(false);
          setActiveAgentIndex(-1);
        }
      }, (index + 1) * 1200);
    });
  };

  const handleSend = () => {
    if (!inputValue.trim()) return;

    const userMsg: Message = {
      id: crypto.randomUUID(),
      agentId: "user",
      agentName: "あなた",
      message: inputValue,
      isUser: true,
      timestamp: Date.now(),
    };

    setMessages((prev) => [...prev, userMsg]);
    const query = inputValue;
    setInputValue("");

    setTimeout(() => {
      let responses: Message[];
      if (query.includes("維持費") || query.includes("コスト") || query.includes("費用")) {
        responses = questionResponses["維持費"];
      } else if (query.includes("下取り") || query.includes("リセール") || query.includes("売却")) {
        responses = questionResponses["下取り"];
      } else if (query.includes("安全") || query.includes("ブレーキ") || query.includes("事故")) {
        responses = questionResponses["安全"];
      } else {
        responses = questionResponses["default"];
      }
      simulateDiscussion(responses);
    }, 500);
  };

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const suggestedQuestions = [
    "維持費はどれくらい？",
    "下取り価格の目安は？",
    "安全性能について教えて",
  ];

  return (
    <section id="ai-advisor" className="py-16 gradient-hero relative overflow-hidden">
      <div className="gradient-hero-overlay" />
      <div className="texture-grain" />
      <div className="max-w-5xl mx-auto px-4 relative z-10">
        <div className="text-center mb-10">
          <Badge variant="outline" className="mb-3 border-[#C3002F]/30 text-[#FF8DA6] bg-[#C3002F]/10 rounded-full px-4">
            <Sparkles className="h-3 w-3 mr-1" />
            AI Advisory
          </Badge>
          <h2 className="text-3xl font-bold text-white tracking-tight">AIアドバイザーに相談する</h2>
          <p className="text-white/50 mt-2 max-w-2xl mx-auto">
            コスト・メンテナンス・ライフスタイル・リセールバリューの4つの視点から、
            専門アドバイザーが対話形式であなたの疑問にお答えします。
          </p>
        </div>

        {/* Agent Avatars */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {aiAgents.map((agent, index) => (
            <div
              key={agent.id}
              className={`flex items-center gap-3 p-3 glass-dark rounded-xl border border-white/10 transition-all duration-300 ${
                activeAgentIndex === index
                  ? "ring-1 ring-[#C3002F]/50 bg-[#C3002F]/10 scale-105 shadow-[var(--shadow-glow-red)]"
                  : "hover:bg-white/[0.06]"
              }`}
            >
              <Avatar className="h-10 w-10" style={{ backgroundColor: agent.color + "30" }}>
                <AvatarFallback
                  className="text-white"
                  style={{ backgroundColor: agent.color }}
                >
                  {agentIcons[agent.avatar]}
                </AvatarFallback>
              </Avatar>
              <div className="min-w-0">
                <p className="text-sm font-medium text-white truncate">{agent.name}</p>
                <p className="text-xs text-white/40 truncate">{agent.role}</p>
              </div>
              {activeAgentIndex === index && (
                <div className="ml-auto flex gap-0.5">
                  <div className="w-1.5 h-1.5 bg-[#C3002F] rounded-full animate-bounce" style={{ animationDelay: "0ms" }} />
                  <div className="w-1.5 h-1.5 bg-[#C3002F] rounded-full animate-bounce" style={{ animationDelay: "150ms" }} />
                  <div className="w-1.5 h-1.5 bg-[#C3002F] rounded-full animate-bounce" style={{ animationDelay: "300ms" }} />
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Chat Area */}
        <Card className="glass-dark border-white/10 rounded-2xl overflow-hidden">
          <CardContent className="p-0">
            <ScrollArea className="h-[400px] p-4" ref={scrollRef}>
              <div className="space-y-4">
                {messages.map((msg) => {
                  const agent = aiAgents.find((a) => a.id === msg.agentId);

                  if (msg.isUser) {
                    return (
                      <div key={msg.id} className="flex justify-end">
                        <div className="gradient-nissan-red text-white px-4 py-2.5 rounded-2xl rounded-br-sm max-w-[80%] shadow-md">
                          <p className="text-sm">{msg.message}</p>
                        </div>
                      </div>
                    );
                  }

                  return (
                    <div key={msg.id} className="flex gap-3 items-start">
                      <Avatar className="h-8 w-8 shrink-0">
                        <AvatarFallback
                          className="text-white text-xs"
                          style={{ backgroundColor: agent?.color || "#666" }}
                        >
                          {agent ? agentIcons[agent.avatar] : <Bot className="h-3 w-3" />}
                        </AvatarFallback>
                      </Avatar>
                      <div className="space-y-1 max-w-[80%]">
                        <p className="text-xs font-medium" style={{ color: agent?.color || "#999" }}>
                          {msg.agentName}
                        </p>
                        <div className="bg-white/[0.08] backdrop-blur-sm border border-white/[0.05] text-white/90 px-4 py-2.5 rounded-2xl rounded-tl-sm">
                          <p className="text-sm leading-relaxed">{msg.message}</p>
                        </div>
                      </div>
                    </div>
                  );
                })}

                {isTyping && (
                  <div className="flex gap-3 items-start">
                    <Avatar className="h-8 w-8 shrink-0">
                      <AvatarFallback className="bg-white/10 text-white/60">
                        <Bot className="h-3 w-3" />
                      </AvatarFallback>
                    </Avatar>
                    <div className="bg-white/[0.08] backdrop-blur-sm border border-white/[0.05] px-4 py-3 rounded-2xl rounded-tl-sm relative overflow-hidden">
                      <div className="shimmer absolute inset-0 opacity-30" />
                      <div className="flex gap-1 relative z-10">
                        <div className="w-2 h-2 bg-white/50 rounded-full animate-bounce" style={{ animationDelay: "0ms" }} />
                        <div className="w-2 h-2 bg-white/50 rounded-full animate-bounce" style={{ animationDelay: "150ms" }} />
                        <div className="w-2 h-2 bg-white/50 rounded-full animate-bounce" style={{ animationDelay: "300ms" }} />
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </ScrollArea>

            {/* Suggested Questions */}
            <div className="px-4 pb-3">
              <div className="flex flex-wrap gap-2">
                {suggestedQuestions.map((q) => (
                  <Button
                    key={q}
                    variant="outline"
                    size="sm"
                    className="text-xs border-white/15 text-white/70 hover:bg-white/10 hover:text-white hover:border-white/25 rounded-full bg-transparent transition-all duration-200"
                    onClick={() => {
                      setInputValue(q);
                      setTimeout(() => {
                        setInputValue("");
                        const userMsg: Message = {
                          id: crypto.randomUUID(),
                          agentId: "user",
                          agentName: "あなた",
                          message: q,
                          isUser: true,
                          timestamp: Date.now(),
                        };
                        setMessages((prev) => [...prev, userMsg]);
                        setTimeout(() => {
                          let responses: Message[];
                          if (q.includes("維持費")) responses = questionResponses["維持費"];
                          else if (q.includes("下取り")) responses = questionResponses["下取り"];
                          else if (q.includes("安全")) responses = questionResponses["安全"];
                          else responses = questionResponses["default"];
                          simulateDiscussion(responses);
                        }, 500);
                      }, 100);
                    }}
                  >
                    <MessageCircle className="h-3 w-3 mr-1" />
                    {q}
                  </Button>
                ))}
              </div>
            </div>

            {/* Input Area */}
            <div className="border-t border-white/[0.08] p-4">
              <div className="flex gap-2">
                <Input
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handleSend()}
                  placeholder="質問を入力してください..."
                  className="bg-white/[0.08] border-white/10 text-white placeholder:text-white/30 focus:ring-[#C3002F]/30 rounded-xl"
                />
                <Button
                  onClick={handleSend}
                  disabled={!inputValue.trim() || isTyping}
                  className="gradient-nissan-red hover-shine text-white shrink-0 rounded-xl shadow-md"
                >
                  <Send className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}
