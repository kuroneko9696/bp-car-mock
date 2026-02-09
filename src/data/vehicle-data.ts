// 日産デイズ 車両データ

export interface Grade {
  id: string;
  name: string;
  subName?: string;
  price: string;
  priceValue: number;
  driveType: string;
  fuelEconomy: string;
  highlights: string[];
  image: string;
  recommended?: boolean;
  recommendFor?: string[];
}

export interface Option {
  id: string;
  name: string;
  category: "MOP" | "DOP";
  type: "exterior" | "interior" | "safety" | "comfort" | "technology";
  price: string;
  priceValue: number;
  description: string;
  image?: string;
  recommendedFor: string[];
  reasons: Record<string, string>;
}

export interface Color {
  id: string;
  name: string;
  hex: string;
  type: "standard" | "premium" | "two-tone";
  extraCost?: string;
  image?: string;
}

export interface Spec {
  category: string;
  items: { label: string; value: string }[];
}

export interface UsageScene {
  id: string;
  label: string;
  icon: string;
  description: string;
}

export const usageScenes: UsageScene[] = [
  { id: "commute", label: "通勤・通学", icon: "Briefcase", description: "毎日の通勤や送り迎えが中心" },
  { id: "family", label: "ファミリー", icon: "Users", description: "お子様の送迎や家族でのお出かけ" },
  { id: "shopping", label: "買い物", icon: "ShoppingBag", description: "日常のお買い物やちょっとしたお出かけ" },
  { id: "weekend", label: "週末ドライブ", icon: "Mountain", description: "週末のレジャーやドライブ" },
  { id: "senior", label: "セカンドカー", icon: "Car", description: "2台目の車として使用" },
  { id: "beginner", label: "初めての車", icon: "Sparkles", description: "免許取りたて・初めてのマイカー" },
];

export const grades: Grade[] = [
  {
    id: "highway-star-gturbo-pped",
    name: "ハイウェイスターGターボ",
    subName: "プロパイロットエディション",
    price: "1,929,400円",
    priceValue: 1929400,
    driveType: "2WD / 4WD",
    fuelEconomy: "21.5km/L (WLTC)",
    highlights: [
      "ターボエンジン搭載で力強い走り",
      "プロパイロット標準装備",
      "本革巻ステアリング",
      "LEDヘッドランプ",
      "アラウンドビューモニター",
    ],
    image: "https://www-asia.nissan-cdn.net/content/dam/Nissan/jp/vehicles/dayz/2512/top/dayz_2512_top_th2_main_pc_01.jpg.ximg.l_12_m.smart.jpg",
    recommended: true,
    recommendFor: ["commute", "weekend"],
  },
  {
    id: "highway-star-x-pped",
    name: "ハイウェイスターX",
    subName: "プロパイロットエディション",
    price: "1,798,500円",
    priceValue: 1798500,
    driveType: "2WD / 4WD",
    fuelEconomy: "23.3km/L (WLTC)",
    highlights: [
      "プロパイロット標準装備",
      "先進安全装備充実",
      "快適装備が充実",
      "LEDヘッドランプ",
      "アラウンドビューモニター",
    ],
    image: "https://www-asia.nissan-cdn.net/content/dam/Nissan/jp/vehicles/dayz/2512/top/dayz_2512_top_th2_main_pc_02.jpg.ximg.l_12_m.smart.jpg",
    recommended: true,
    recommendFor: ["family", "commute"],
  },
  {
    id: "highway-star-x",
    name: "ハイウェイスターX",
    price: "1,698,400円",
    priceValue: 1698400,
    driveType: "2WD / 4WD",
    fuelEconomy: "23.3km/L (WLTC)",
    highlights: [
      "HIGHWAY STARの精悍なスタイリング",
      "充実の安全装備",
      "スマートシンプルハイブリッド",
      "オートエアコン",
    ],
    image: "https://www-asia.nissan-cdn.net/content/dam/Nissan/jp/vehicles/dayz/2512/top/dayz_2512_top_th2_main_pc_02.jpg.ximg.l_12_m.smart.jpg",
    recommendFor: ["shopping", "beginner"],
  },
  {
    id: "x",
    name: "X",
    price: "1,478,400円",
    priceValue: 1478400,
    driveType: "2WD / 4WD",
    fuelEconomy: "23.2km/L (WLTC)",
    highlights: [
      "使いやすいベーシックグレード",
      "インテリジェントエマージェンシーブレーキ",
      "VDC(横滑り防止装置)",
      "電動格納式ドアミラー",
    ],
    image: "https://www-asia.nissan-cdn.net/content/dam/Nissan/jp/vehicles/dayz/2512/top/dayz_2512_top_th2_main_pc_03.jpg.ximg.l_12_m.smart.jpg",
    recommendFor: ["shopping", "senior", "beginner"],
  },
  {
    id: "s",
    name: "S",
    price: "1,437,700円",
    priceValue: 1437700,
    driveType: "2WD / 4WD",
    fuelEconomy: "23.2km/L (WLTC)",
    highlights: [
      "お求めやすい価格",
      "基本性能が充実",
      "インテリジェントエマージェンシーブレーキ",
    ],
    image: "https://www-asia.nissan-cdn.net/content/dam/Nissan/jp/vehicles/dayz/2512/top/dayz_2512_top_th2_main_pc_04.jpg.ximg.l_12_m.smart.jpg",
    recommendFor: ["senior", "beginner"],
  },
  {
    id: "bolero",
    name: "ボレロ",
    price: "1,600,500円",
    priceValue: 1600500,
    driveType: "2WD / 4WD",
    fuelEconomy: "23.2km/L (WLTC)",
    highlights: [
      "わたしのステキ。デイズ「ボレロ」",
      "専用エクステリアデザイン",
      "専用インテリアカラー",
      "専用ボディカラー5色",
    ],
    image: "https://www-asia.nissan-cdn.net/content/dam/Nissan/jp/vehicles/dayz/2512/top/dayz_2512_top_th2_main_pc_06.jpg.ximg.l_12_m.smart.jpg",
    recommendFor: ["shopping", "family"],
  },
];

export const options: Option[] = [
  {
    id: "propilot",
    name: "プロパイロット",
    category: "MOP",
    type: "technology",
    price: "標準装備(G以上)",
    priceValue: 0,
    description: "高速道路でのアクセル・ブレーキ・ステアリングを自動制御。長距離ドライブの疲れを軽減します。",
    recommendedFor: ["commute", "weekend"],
    reasons: {
      commute: "毎日の通勤で高速を使う方は渋滞時のストレスが大幅軽減",
      weekend: "長距離ドライブでのドライバーの疲労を大幅に軽減",
    },
  },
  {
    id: "around-view",
    name: "アラウンドビューモニター",
    category: "MOP",
    type: "safety",
    price: "標準装備(G以上)",
    priceValue: 0,
    description: "車両を上空から見下ろしたような映像で、周囲の状況を確認できます。駐車時の強い味方。",
    recommendedFor: ["family", "shopping", "beginner"],
    reasons: {
      family: "お子様の乗り降り時の周囲確認に安心",
      shopping: "スーパーの駐車場での駐車が楽になります",
      beginner: "駐車が苦手な方でも安心して停められます",
    },
  },
  {
    id: "rear-auto-ac",
    name: "リヤオートエアコン",
    category: "MOP",
    type: "comfort",
    price: "オプション",
    priceValue: 44000,
    description: "後席の方も快適に過ごせるリヤオートエアコン。家族みんなが快適。",
    recommendedFor: ["family"],
    reasons: {
      family: "後部座席のお子様も快適な温度で過ごせます",
    },
  },
  {
    id: "led-headlamp",
    name: "LEDヘッドランプ",
    category: "MOP",
    type: "safety",
    price: "標準装備(HS系)",
    priceValue: 0,
    description: "明るく省電力なLEDヘッドランプ。夜間の視認性が向上します。",
    recommendedFor: ["commute", "weekend"],
    reasons: {
      commute: "早朝・夜間の通勤時に明るい視界を確保",
      weekend: "夜間のドライブも安心の明るさ",
    },
  },
  {
    id: "drive-recorder",
    name: "ドライブレコーダー（前後）",
    category: "DOP",
    type: "safety",
    price: "44,000円",
    priceValue: 44000,
    description: "前方・後方の映像を記録。万が一の事故やあおり運転対策に。",
    recommendedFor: ["commute", "family", "beginner"],
    reasons: {
      commute: "毎日の運転の記録で万が一の事故にも安心",
      family: "家族の安全を守る必須アイテム",
      beginner: "運転に慣れない時期の記録として安心",
    },
  },
  {
    id: "floor-mat",
    name: "フロアマット（消臭機能付）",
    category: "DOP",
    type: "interior",
    price: "27,500円",
    priceValue: 27500,
    description: "消臭機能付きのフロアマット。車内を清潔に保ちます。",
    recommendedFor: ["family", "shopping"],
    reasons: {
      family: "お子様の食べこぼしも気にならない消臭機能付き",
      shopping: "買い物の汚れも簡単に掃除できます",
    },
  },
  {
    id: "door-visor",
    name: "ドアバイザー",
    category: "DOP",
    type: "exterior",
    price: "16,500円",
    priceValue: 16500,
    description: "雨の日でも少し窓を開けて換気できます。",
    recommendedFor: ["commute", "family", "shopping"],
    reasons: {
      commute: "雨の日でも換気できて車内を快適に",
      family: "雨の日のチャイルドシートの乗り降りも安心",
      shopping: "駐車中の車内温度上昇を抑えます",
    },
  },
  {
    id: "navi-9inch",
    name: "9インチナビゲーション",
    category: "DOP",
    type: "technology",
    price: "198,000円",
    priceValue: 198000,
    description: "大画面9インチナビ。Apple CarPlay / Android Auto対応。",
    recommendedFor: ["weekend", "commute"],
    reasons: {
      weekend: "知らない道でも安心のナビゲーション",
      commute: "渋滞回避ルートで通勤時間を短縮",
    },
  },
  {
    id: "etc2",
    name: "ETC2.0車載器",
    category: "DOP",
    type: "technology",
    price: "33,000円",
    priceValue: 33000,
    description: "ETC2.0対応の車載器。高速道路の利用がスムーズに。",
    recommendedFor: ["commute", "weekend"],
    reasons: {
      commute: "高速通勤には必須のアイテム",
      weekend: "高速道路の渋滞回避情報を取得",
    },
  },
  {
    id: "uv-cut-glass",
    name: "IRカット&スーパーUVカットグリーンガラス",
    category: "MOP",
    type: "comfort",
    price: "標準装備(一部グレード)",
    priceValue: 0,
    description: "紫外線と赤外線をカット。夏場の車内温度上昇を抑え、肌への紫外線も防ぎます。",
    recommendedFor: ["family", "shopping", "commute"],
    reasons: {
      family: "お子様の肌を紫外線から守ります",
      shopping: "日中のお買い物でも車内が暑くなりにくい",
      commute: "通勤中の日焼け防止に効果的",
    },
  },
];

export const colors: Color[] = [
  { id: "white-pearl", name: "ホワイトパール(3P)", hex: "#F5F5F0", type: "premium", extraCost: "33,000円" },
  { id: "black", name: "ブラック(P)", hex: "#1A1A1A", type: "standard" },
  { id: "titanium-gray", name: "チタニウムグレー(M)", hex: "#7A7A7A", type: "standard" },
  { id: "sterling-silver", name: "スターリングシルバー(M)", hex: "#C0C0C0", type: "standard" },
  { id: "solbe-blue", name: "ソルベブルー(PM)", hex: "#87CEEB", type: "premium", extraCost: "33,000円" },
  { id: "ocean-blue", name: "オーシャンブルー(PM)", hex: "#1E6B9A", type: "standard" },
  { id: "sparkling-red", name: "スパークリングレッド(M)", hex: "#C41E3A", type: "standard" },
  { id: "frozen-vanilla", name: "フローズンバニラパール(M)", hex: "#FFFDD0", type: "standard" },
  { id: "ash-brown", name: "アッシュブラウン(M)", hex: "#8B7355", type: "premium", extraCost: "33,000円" },
  { id: "silky-lilac", name: "シルキーライラック(PM)", hex: "#C8A2C8", type: "premium", extraCost: "33,000円" },
  { id: "two-tone-1", name: "ホワイトパール/サンシャインオレンジ 2トーン", hex: "#F5F5F0", type: "two-tone", extraCost: "66,000円" },
  { id: "two-tone-2", name: "スパークリングレッド/ブラック 2トーン", hex: "#C41E3A", type: "two-tone", extraCost: "55,000円" },
  { id: "two-tone-3", name: "ソルベブルー/オーシャンブルー 2トーン", hex: "#87CEEB", type: "two-tone", extraCost: "55,000円" },
  { id: "two-tone-4", name: "ソルベブルー/ホワイトパール 2トーン", hex: "#87CEEB", type: "two-tone", extraCost: "66,000円" },
  { id: "two-tone-5", name: "カンジュクカシス/ホワイトパール 2トーン", hex: "#722F37", type: "two-tone", extraCost: "55,000円" },
];

export const specs: Spec[] = [
  {
    category: "寸法・重量",
    items: [
      { label: "全長", value: "3,395mm" },
      { label: "全幅", value: "1,475mm" },
      { label: "全高", value: "1,640-1,660mm" },
      { label: "ホイールベース", value: "2,495mm" },
      { label: "車両重量", value: "840-920kg" },
      { label: "乗車定員", value: "4名" },
      { label: "最小回転半径", value: "4.5m" },
    ],
  },
  {
    category: "エンジン",
    items: [
      { label: "種類", value: "DOHC水冷直列3気筒" },
      { label: "総排気量", value: "659cc" },
      { label: "最高出力", value: "38kW(52PS)/6,400rpm" },
      { label: "最大トルク", value: "60N・m(6.1kgf・m)/3,600rpm" },
      { label: "ターボ（Gターボ）", value: "47kW(64PS)/5,600rpm" },
      { label: "燃料タンク容量", value: "27L" },
    ],
  },
  {
    category: "燃費性能",
    items: [
      { label: "WLTCモード（NA・2WD）", value: "23.2km/L" },
      { label: "WLTCモード（ハイブリッド・2WD）", value: "23.3km/L" },
      { label: "WLTCモード（ターボ・2WD）", value: "21.5km/L" },
      { label: "JC08モード（NA）", value: "29.0km/L" },
      { label: "JC08モード（ハイブリッド）", value: "28.2〜29.4km/L" },
      { label: "JC08モード（ターボ）", value: "24.8km/L" },
    ],
  },
  {
    category: "安全装備",
    items: [
      { label: "インテリジェントエマージェンシーブレーキ", value: "全グレード標準" },
      { label: "踏み間違い衝突防止アシスト", value: "全グレード標準" },
      { label: "車線逸脱防止支援システム", value: "全グレード標準" },
      { label: "プロパイロット", value: "G以上標準" },
      { label: "SOSコール", value: "G以上標準" },
      { label: "アラウンドビューモニター", value: "G以上標準" },
      { label: "ハイビームアシスト", value: "HS系標準" },
    ],
  },
];

export const aiAgents = [
  {
    id: "cost-advisor",
    name: "コストアドバイザー",
    role: "家計の味方",
    avatar: "wallet",
    color: "#22C55E",
    description: "購入費用・維持費・ランニングコストを分析",
  },
  {
    id: "maintenance-advisor",
    name: "メンテナンスアドバイザー",
    role: "整備のプロ",
    avatar: "wrench",
    color: "#3B82F6",
    description: "メンテナンスコストや耐久性を解説",
  },
  {
    id: "lifestyle-advisor",
    name: "ライフスタイルアドバイザー",
    role: "暮らしの提案者",
    avatar: "heart",
    color: "#EC4899",
    description: "ライフスタイルに合った装備を提案",
  },
  {
    id: "trade-advisor",
    name: "リセールアドバイザー",
    role: "売却の専門家",
    avatar: "trending-up",
    color: "#F59E0B",
    description: "下取り・リセールバリューの観点でアドバイス",
  },
];
