// スペック数値のパーソナライズ解説データ（Value Insights）
// AIアドバイザによるスペック数値の読み方・ライバル比較

import type { UserAttribute } from "@/hooks/use-session-storage";

export interface CompetitorComparison {
  name: string; // "N-BOX", "ワゴンR"
  value: string; // "3,395mm"
  verdict?: "advantage" | "equal" | "disadvantage";
}

export interface SpecValueInsight {
  specKey: string; // "寸法・重量::全長"（category::labelの複合キー）
  icon: string; // Lucide icon name
  emoji: string;
  headline: string; // 短い要約
  defaultInsight: string;
  personalizedInsights?: Partial<Record<UserAttribute, string>>;
  competitors: CompetitorComparison[];
  practicalNote?: string; // 実生活での意味
}

/** ユーザー属性に合った解説文を返す */
export function getInsightForUser(
  insight: SpecValueInsight,
  userAttributes: UserAttribute[]
): string {
  if (!insight.personalizedInsights || userAttributes.length === 0) {
    return insight.defaultInsight;
  }
  for (const attr of userAttributes) {
    if (insight.personalizedInsights[attr]) {
      return insight.personalizedInsights[attr];
    }
  }
  return insight.defaultInsight;
}

/** category と label の複合キーでインサイトを検索 */
export function getSpecInsight(
  category: string,
  label: string
): SpecValueInsight | undefined {
  const key = `${category}::${label}`;
  return specInsights.find((i) => i.specKey === key);
}

export const specInsights: SpecValueInsight[] = [
  // =====================
  // 寸法・重量（7項目）
  // =====================
  {
    specKey: "寸法・重量::全長",
    icon: "Ruler",
    emoji: "📏",
    headline: "軽自動車の規格上限値",
    defaultInsight:
      "軽自動車は全長3,400mm以下と法律で決まっており、3,395mmはほぼ上限ギリギリ。各社とも限界まで使い切る設計で、室内空間を最大化しています。",
    personalizedInsights: {
      "first-car":
        "軽自動車の全長は法律で3,400mm以下と決まっています。3,395mmはほぼ限界値で、どのメーカーも同じサイズ。小さくて運転しやすいのに、中は意外と広いんです。",
      "car-expert":
        "軽自動車規格の全長上限3,400mmに対し5mmのマージン。プラットフォーム設計上、フロントオーバーハングとリアオーバーハングの配分で室内長に差が出ます。",
      "cost-focused":
        "軽自動車の規格上限に近いサイズ。軽自動車枠内なので税金・保険・高速料金すべて軽自動車の安い料金が適用されます。普通車と比べて年間数万円お得。",
      family:
        "3,395mmは軽自動車の上限ギリギリのサイズ。この中にチャイルドシートを置いても大人が快適に座れるよう、各社が工夫を凝らしています。",
    },
    competitors: [
      { name: "N-BOX", value: "3,395mm", verdict: "equal" },
      { name: "ワゴンR", value: "3,395mm", verdict: "equal" },
      { name: "タント", value: "3,395mm", verdict: "equal" },
    ],
    practicalNote:
      "全長は軽自動車規格で全社同一。差がつくのは室内の使い方（レイアウト）です。",
  },
  {
    specKey: "寸法・重量::全幅",
    icon: "Ruler",
    emoji: "↔️",
    headline: "軽自動車の規格上限値",
    defaultInsight:
      "全幅1,480mm以下が軽自動車の条件。1,475mmはこちらも上限ギリギリで、狭い道や駐車場でも扱いやすいサイズです。",
    personalizedInsights: {
      "first-car":
        "幅1,475mmは普通車より約20cm以上狭いので、狭い道でのすれ違いや駐車が断然ラク。初心者にとってこの「狭さ」は大きなメリットです。",
      "car-expert":
        "軽自動車規格の全幅上限1,480mmに対し5mmマージン。室内幅への影響は左右ドアトリムの厚さとショルダールーム設計次第。",
      "cost-focused":
        "1,475mmの車幅は狭い月極駐車場にも停められるサイズ。都市部の狭い駐車場を選べるので、駐車場代の選択肢が広がります。",
    },
    competitors: [
      { name: "N-BOX", value: "1,475mm", verdict: "equal" },
      { name: "ワゴンR", value: "1,475mm", verdict: "equal" },
      { name: "タント", value: "1,475mm", verdict: "equal" },
    ],
    practicalNote: "全幅も軽自動車規格で全社同一。駐車場の幅に余裕があります。",
  },
  {
    specKey: "寸法・重量::全高",
    icon: "ArrowUpDown",
    emoji: "📐",
    headline: "ハイトワゴンクラスの高さ",
    defaultInsight:
      "1,640〜1,660mmはハイトワゴンと呼ばれるクラス。スーパーハイトワゴン（N-BOXやタント）より低い分、走行安定性と燃費に優れます。立体駐車場にも入りやすいサイズです。",
    personalizedInsights: {
      "first-car":
        "N-BOXやタントより約10〜15cm低いですが、十分な頭上空間があります。低い分、横風に強くてフラフラしにくいので、初心者でも安心して運転できます。",
      "car-expert":
        "ハイトワゴンカテゴリ（全高1,600〜1,700mm）に属し、スーパーハイトワゴン比で重心が低い。空気抵抗係数（Cd値）も有利で、高速走行時の安定性と燃費に貢献。",
      "cost-focused":
        "高すぎないので立体駐車場（高さ制限1,550mm以上）に入れる場合が多く、駐車場の選択肢が広がります。燃費もスーパーハイトより良好です。",
      family:
        "子どもが立ったまま着替えられる高さは十分にあります。N-BOXほど高くないので、横風でフラフラしにくく、チャイルドシートへの乗せ降ろしも楽です。",
    },
    competitors: [
      { name: "N-BOX", value: "1,790mm", verdict: "advantage" },
      { name: "ワゴンR", value: "1,650mm", verdict: "equal" },
      { name: "タント", value: "1,755mm", verdict: "advantage" },
    ],
    practicalNote:
      "スーパーハイトワゴンより低い＝風に強い・燃費に有利。室内高は十分確保されています。",
  },
  {
    specKey: "寸法・重量::ホイールベース",
    icon: "Ruler",
    emoji: "🔧",
    headline: "軽トップクラスの長さ",
    defaultInsight:
      "2,495mmは軽自動車でトップクラスの長さ。前後タイヤの間隔が長いほど直進安定性が高く、後席の足元が広くなります。",
    personalizedInsights: {
      "first-car":
        "前後のタイヤの間の距離が長いと、車がまっすぐ安定して走ります。デイズの2,495mmは軽自動車でもトップクラスで、高速道路でもフラフラしにくいです。",
      "car-expert":
        "2,495mmはN-BOX（2,520mm）に次ぐ軽自動車トップクラス。ピッチング抑制と後席レッグルーム確保に貢献。対してワゴンR・タントは2,460mmと35mm短い。",
      "cost-focused":
        "ホイールベースが長いと乗り心地が良く、後席も広い。長距離運転でも疲れにくいので、遠出のガソリン代だけでなく「疲労コスト」も節約できます。",
      family:
        "後席の足元が広くなるので、チャイルドシートを置いても助手席の方が窮屈になりにくいです。家族4人でも快適に乗れます。",
    },
    competitors: [
      { name: "N-BOX", value: "2,520mm", verdict: "disadvantage" },
      { name: "ワゴンR", value: "2,460mm", verdict: "advantage" },
      { name: "タント", value: "2,460mm", verdict: "advantage" },
    ],
    practicalNote:
      "N-BOXより25mm短いが、ワゴンR・タントより35mm長い。後席の広さに直結します。",
  },
  {
    specKey: "寸法・重量::車両重量",
    icon: "Weight",
    emoji: "⚖️",
    headline: "軽量設計で燃費に貢献",
    defaultInsight:
      "840〜920kgはグレードや駆動方式による幅。軽いほど燃費が良く、加速もスムーズ。N-BOXより軽量で、燃費性能の良さにつながっています。",
    personalizedInsights: {
      "first-car":
        "車が軽いと燃費が良くなるし、加速もスムーズ。デイズは840〜920kgで、大きなN-BOX（890〜1,000kg）より軽いので、運転がしやすいです。",
      "car-expert":
        "プラットフォーム軽量化により840kg（S・2WD）〜920kg（ターボ・4WD）を実現。パワーウェイトレシオはNA車で約16.2kg/PS、ターボ車で約13.1kg/PS。",
      "cost-focused":
        "車が軽い＝ガソリン代が安い。100kg軽くなると燃費が約5%改善すると言われます。N-BOXより50〜80kg軽いことが、燃費の良さにつながっています。",
      family:
        "軽いので取り回しが良く、ブレーキもよく効きます。子どもを乗せての街乗りでも、キビキビ走れて燃費も良好です。",
    },
    competitors: [
      { name: "N-BOX", value: "890-1,000kg", verdict: "advantage" },
      { name: "ワゴンR", value: "750-840kg", verdict: "disadvantage" },
      { name: "タント", value: "880-1,000kg", verdict: "advantage" },
    ],
    practicalNote:
      "ワゴンRより重いが、N-BOX・タントより軽い。燃費と走行性能のバランスが良好。",
  },
  {
    specKey: "寸法・重量::乗車定員",
    icon: "Users",
    emoji: "👥",
    headline: "軽自動車の法定上限",
    defaultInsight:
      "軽自動車は法律で最大4名まで。これは全メーカー共通です。大人4人乗車は可能ですが、長距離では3人までが快適です。",
    personalizedInsights: {
      "first-car":
        "軽自動車は4人まで乗れます。ただし大人4人でずっと乗るとちょっと狭いかも。普段は1〜2人、たまに3〜4人くらいの使い方がベストです。",
      "cost-focused":
        "軽自動車は4名定員。5人以上乗る場面が多いなら普通車が必要ですが、4人以内なら軽自動車の維持費の安さが活きます。",
      family:
        "お子様2人＋大人2人の4人家族にぴったりのサイズ。ただし、お子様が大きくなったら普通車への乗り換えも視野に入れましょう。",
    },
    competitors: [
      { name: "N-BOX", value: "4名", verdict: "equal" },
      { name: "ワゴンR", value: "4名", verdict: "equal" },
      { name: "タント", value: "4名", verdict: "equal" },
    ],
    practicalNote: "軽自動車は全車4名定員。普通車との最大の違いのひとつです。",
  },
  {
    specKey: "寸法・重量::最小回転半径",
    icon: "RotateCcw",
    emoji: "🔄",
    headline: "小回り抜群の4.5m",
    defaultInsight:
      "4.5mは非常に小回りが利くサイズ。狭い路地でのUターンや、スーパーの駐車場でもストレスフリー。ハンドルを目一杯切った時の回転円の半径です。",
    personalizedInsights: {
      "first-car":
        "ハンドルを目一杯切って回る円の半径が4.5m。スーパーの駐車場でも1回で曲がれて、「切り返し何回…？」のストレスが激減します。初心者の強い味方！",
      "car-expert":
        "NA車4.5m、ターボ車4.8m（タイヤサイズ差による）。N-BOXの4.5〜4.7mと同等で、ワゴンRの4.4mにはわずかに及ばないが、実用上は十分な旋回性能。",
      "cost-focused":
        "小回りが利く＝狭い駐車場でもスムーズ＝こすり傷リスクが低い。修理1回で数万円なので、小回り性能は隠れた節約ポイントです。",
    },
    competitors: [
      { name: "N-BOX", value: "4.5-4.7m", verdict: "equal" },
      { name: "ワゴンR", value: "4.4m", verdict: "disadvantage" },
      { name: "タント", value: "4.4m", verdict: "disadvantage" },
    ],
    practicalNote:
      "4.5mは軽自動車として標準的。ワゴンRの4.4mにはわずかに及ばないが、日常使いで差を感じる場面はほぼありません。",
  },
  // =====================
  // エンジン（6項目）
  // =====================
  {
    specKey: "エンジン::種類",
    icon: "Cog",
    emoji: "⚙️",
    headline: "軽自動車の標準的なエンジン形式",
    defaultInsight:
      "DOHC水冷直列3気筒は軽自動車のスタンダード。3つのシリンダーでコンパクトながら、スムーズな回転と十分なパワーを生み出します。",
    personalizedInsights: {
      "first-car":
        "「3気筒」はエンジン内の部屋が3つという意味。軽自動車は全部このタイプで、小さくても力強く走れます。特に気にしなくてOKです！",
      "car-expert":
        "BR06型DOHC直列3気筒。ロングストローク設計で低中速トルク重視。可変バルブタイミング機構付きで、燃費と出力を両立。三菱との共同開発エンジン。",
      "cost-focused":
        "軽自動車はすべて3気筒660ccなので、エンジン形式でメーカー間の維持費差はほぼありません。メンテナンスコストも横並びです。",
    },
    competitors: [
      { name: "N-BOX", value: "DOHC直列3気筒", verdict: "equal" },
      { name: "ワゴンR", value: "DOHC直列3気筒", verdict: "equal" },
      { name: "タント", value: "DOHC直列3気筒", verdict: "equal" },
    ],
  },
  {
    specKey: "エンジン::総排気量",
    icon: "Cylinder",
    emoji: "🔩",
    headline: "軽自動車の排気量上限＝税金メリット",
    defaultInsight:
      "660cc以下が軽自動車の条件。659ccは上限ギリギリで最大パワーを引き出す設計。排気量が小さいので自動車税が年間10,800円と普通車の3分の1以下です。",
    personalizedInsights: {
      "first-car":
        "660cc以下だから「軽自動車」。これが税金や保険料が安い理由です。659ccは限界ギリギリまで使い切って、小さくても力強い走りを実現しています。",
      "car-expert":
        "軽自動車規格の排気量上限660ccに対し659cc。ボア×ストローク比でロングストローク設計を採用し、低中速域のトルク特性を重視したチューニング。",
      "cost-focused":
        "659cc＝軽自動車＝税金が安い。自動車税は年間10,800円で、1,000ccの普通車（25,000円）の半分以下。10年で14万円以上の差になります。",
    },
    competitors: [
      { name: "N-BOX", value: "658cc", verdict: "equal" },
      { name: "ワゴンR", value: "658cc", verdict: "equal" },
      { name: "タント", value: "658cc", verdict: "equal" },
    ],
    practicalNote:
      "軽自動車はすべて660cc以下。税金・保険・高速料金の優遇が最大のメリットです。",
  },
  {
    specKey: "エンジン::最高出力",
    icon: "Gauge",
    emoji: "💪",
    headline: "日常使いに十分な出力",
    defaultInsight:
      "38kW（52PS）は軽自動車のNA（自然吸気）エンジンとして標準的。街乗りや郊外のドライブには十分なパワーです。高速道路の合流にはやや余裕が欲しい場面も。",
    personalizedInsights: {
      "first-car":
        "52馬力あれば街中の運転には十分。坂道もエアコンつけても普通に走れます。ただし高速道路の合流は少しアクセルを踏み込む必要があるかも。",
      "car-expert":
        "38kW(52PS)/6,400rpm。リッターあたり78.9PSで、NA軽自動車としては標準的な出力特性。高回転型ではなく実用域重視のセッティング。",
      "cost-focused":
        "NAエンジンはターボより燃費が良く、メンテナンスコストも低い。街乗り中心ならNAで十分。ターボとの価格差約13万円を他に回せます。",
    },
    competitors: [
      { name: "N-BOX", value: "43kW(58PS)", verdict: "disadvantage" },
      { name: "ワゴンR", value: "36kW(49PS)", verdict: "advantage" },
      { name: "タント", value: "38kW(52PS)", verdict: "equal" },
    ],
    practicalNote:
      "N-BOXの58PSには及ばないが、街乗り中心なら52PSで必要十分。ワゴンRの49PSよりは力強い。",
  },
  {
    specKey: "エンジン::最大トルク",
    icon: "RotateCw",
    emoji: "🌀",
    headline: "発進・低速域のパワー感",
    defaultInsight:
      "60N・m（6.1kgf・m）は発進時や坂道での「押し出す力」。トルクが大きいほど出足が軽やか。日常の街乗りではこのトルクが体感的なパワーに直結します。",
    personalizedInsights: {
      "first-car":
        "トルクは「車を押す力」のこと。信号からの発進や坂道で感じるパワーです。60N・mあれば日常使いで「力不足」と感じることはほとんどありません。",
      "car-expert":
        "60N・m(6.1kgf・m)/3,600rpm。低回転域でのピークトルク発生により、街乗りでのレスポンスを重視。CVTとの組み合わせで加速フィールは滑らか。",
      "cost-focused":
        "トルクが十分あると、無駄にアクセルを踏まなくて済む＝燃費に好影響。坂道の多い地域でもストレスなく走れる実用的な数値です。",
    },
    competitors: [
      { name: "N-BOX", value: "65N・m", verdict: "disadvantage" },
      { name: "ワゴンR", value: "58N・m", verdict: "advantage" },
      { name: "タント", value: "60N・m", verdict: "equal" },
    ],
    practicalNote:
      "N-BOXの65N・mには及ばないが、実用上十分。低速域での扱いやすさはCVTとの制御で補っています。",
  },
  {
    specKey: "エンジン::ターボ（Gターボ）",
    icon: "Zap",
    emoji: "⚡",
    headline: "軽自動車の自主規制上限",
    defaultInsight:
      "47kW（64PS）は軽自動車の自主規制上限値。すべてのメーカーのターボ車がこの値で横並びです。高速道路の合流や山道で余裕のある走りを実現します。",
    personalizedInsights: {
      "first-car":
        "64馬力は軽自動車のMAXパワー。高速道路の合流や坂道がグンと楽になります。「軽って遅いんでしょ？」というイメージが覆るパワフルさです。",
      "car-expert":
        "47kW(64PS)/5,600rpmは軽自動車の自主規制上限。100N・m/2,400-4,000rpmのワイドトルクバンドで、中間加速性能に優れる。",
      "cost-focused":
        "ターボ車は約13万円高く、燃費も約1.7km/L悪化。年間1万km走ると約1万円のガソリン代増。高速道路をよく使うなら価値あり、街乗り中心ならNAがお得。",
      outdoor:
        "キャンプ道具満載で山道を登る時、ターボの余裕は歴然。高速道路での追い越しもスムーズで、アウトドアの行き帰りが快適になります。",
    },
    competitors: [
      { name: "N-BOX", value: "47kW(64PS)", verdict: "equal" },
      { name: "ワゴンR", value: "47kW(64PS)", verdict: "equal" },
      { name: "タント", value: "47kW(64PS)", verdict: "equal" },
    ],
    practicalNote:
      "軽自動車のターボは全メーカー64PS。差がつくのはトルク特性とCVT制御の味付けです。",
  },
  {
    specKey: "エンジン::燃料タンク容量",
    icon: "Fuel",
    emoji: "⛽",
    headline: "1回の給油で約626km走行可能",
    defaultInsight:
      "27Lタンクに満タン給油すると、WLTCモード燃費23.2km/Lで計算して約626km走れます。東京〜大阪（約500km）も1回の給油でカバー。",
    personalizedInsights: {
      "first-car":
        "27Lの満タンで約626km（燃費23.2km/L計算）走れます。月1,000km走る方なら約2回の給油でOK。ガソリンスタンドに行く手間も少なくて済みます。",
      "car-expert":
        "27Lタンク × WLTCモード23.2km/L = 航続距離約626km。実燃費を20km/Lと仮定しても540km。N-BOXは27Lタンクで574km（21.2km/L計算）。",
      "cost-focused":
        "27Lの満タン費用はレギュラー170円/Lで約4,590円。WLTCモード23.2km/Lなら1円あたり0.14km走れる計算。月のガソリン代目安は5,000〜7,000円程度です。",
    },
    competitors: [
      { name: "N-BOX", value: "27L", verdict: "equal" },
      { name: "ワゴンR", value: "27L", verdict: "equal" },
      { name: "タント", value: "30L", verdict: "disadvantage" },
    ],
    practicalNote:
      "タントの30Lより3L少ないが、燃費の良さで航続距離はほぼ同等。給油頻度に大きな差はありません。",
  },
  // =====================
  // 燃費性能（6項目）
  // =====================
  {
    specKey: "燃費性能::WLTCモード（NA・2WD）",
    icon: "TrendingUp",
    emoji: "🍃",
    headline: "軽ハイトワゴントップクラス",
    defaultInsight:
      "23.2km/Lは軽ハイトワゴンの中でトップクラスの燃費。1リットルのガソリンで23.2km走れるということ。月1,000km走ると月約7,300円（レギュラー170円/L想定）です。",
    personalizedInsights: {
      "first-car":
        "1リットルで23.2km走れます。月1,000km走る場合、ガソリン代は月約7,300円。通勤で毎日往復30kmなら月約6,600円の計算です。",
      "car-expert":
        "WLTC総合23.2km/L。市街地モード20.1km/L、郊外モード24.9km/L、高速道路モード23.7km/L（参考値）。実燃費は18〜20km/L程度が目安。",
      "cost-focused":
        "年間1万km走行でガソリン代約73,000円（170円/L）。N-BOXの21.2km/Lだと約80,000円で、年間約7,000円の差。5年で35,000円の節約になります。",
      family:
        "お子様の送り迎えや買い物など、街乗り中心でも燃費が良いのがデイズの強み。家計に優しい燃費性能です。",
    },
    competitors: [
      { name: "N-BOX", value: "21.2km/L", verdict: "advantage" },
      { name: "ワゴンR", value: "24.4km/L", verdict: "disadvantage" },
      { name: "タント", value: "21.0km/L", verdict: "advantage" },
    ],
    practicalNote:
      "ワゴンRの24.4km/Lには及ばないが、N-BOX・タントには大差で勝利。実燃費との乖離も少ないWLTCモードで比較。",
  },
  {
    specKey: "燃費性能::WLTCモード（ハイブリッド・2WD）",
    icon: "Leaf",
    emoji: "🌿",
    headline: "ハイブリッドでわずかに向上",
    defaultInsight:
      "23.3km/LはNA（23.2km/L）との差がわずか0.1km/L。スマートシンプルハイブリッドは大幅な燃費改善よりも、発進時のモーターアシストによるスムーズさが主な恩恵です。",
    personalizedInsights: {
      "first-car":
        "ハイブリッドといっても、プリウスのような大がかりな仕組みではありません。発進時にちょっとモーターが手伝ってくれる「かんたんハイブリッド」です。燃費改善はわずか0.1km/L。",
      "car-expert":
        "マイルドハイブリッド搭載でWLTC 23.3km/L。NA比+0.1km/Lと改善幅は小さいが、発進加速時のモーターアシストによる「エンジン回転数の低減」で体感的な静粛性向上に寄与。",
      "cost-focused":
        "NAとの燃費差は0.1km/Lとほぼ誤差の範囲。ハイブリッドによる車両価格アップ分を燃費だけで回収するのは難しいですが、加速のスムーズさは体感できます。",
    },
    competitors: [],
    practicalNote:
      "燃費差よりも発進時の静かさ・スムーズさがメリット。価格差とのバランスで判断を。",
  },
  {
    specKey: "燃費性能::WLTCモード（ターボ・2WD）",
    icon: "Zap",
    emoji: "🏎️",
    headline: "ターボでもクラストップの燃費",
    defaultInsight:
      "21.5km/Lはターボ車としては非常に優秀。NA車との差は1.7km/Lに抑えられており、パワーと燃費のバランスが良好です。",
    personalizedInsights: {
      "first-car":
        "ターボ車は力強い分、燃費が落ちるのが普通ですが、21.5km/Lは十分に良い数字。NA車との差は月のガソリン代で約500〜800円程度の差です。",
      "car-expert":
        "ターボWLTC 21.5km/LはNA比-1.7km/L。過給時のリッチ補正と高回転使用頻度の増加が主因。実燃費は17〜19km/L程度。N-BOXターボの20.2km/Lを1.3km/L上回る。",
      "cost-focused":
        "NA車との燃費差1.7km/Lは、年間1万km走行で約12,500円のガソリン代増。ターボの車両価格差約13万円と合わせて、高速道路利用頻度で判断しましょう。",
      outdoor:
        "キャンプ道具満載で山道を走ってもこの燃費。荷物を積むと実燃費は落ちますが、NA車で無理に回転数を上げるよりむしろ燃費が良い場合もあります。",
    },
    competitors: [
      { name: "N-BOX ターボ", value: "20.2km/L", verdict: "advantage" },
      { name: "ワゴンR ターボ", value: "22.5km/L", verdict: "disadvantage" },
      { name: "タント ターボ", value: "20.0km/L", verdict: "advantage" },
    ],
    practicalNote:
      "ターボ車の燃費比較でN-BOX・タントに勝利。ワゴンRターボには1km/L差。パワーと燃費の両立。",
  },
  {
    specKey: "燃費性能::JC08モード（NA）",
    icon: "ClipboardList",
    emoji: "📋",
    headline: "旧基準での参考値",
    defaultInsight:
      "29.0km/LはJC08モード（旧測定基準）での値。WLTCモード23.2km/Lとの差は約25%。JC08は実燃費との乖離が大きいため、WLTCの数字で比較するのがおすすめです。",
    personalizedInsights: {
      "first-car":
        "29.0km/Lという数字は古い測定方法（JC08）での値。実際にはWLTCの23.2km/Lの方が現実に近いです。「思ったより走らない…」とならないよう、WLTCで判断しましょう。",
      "car-expert":
        "JC08モード29.0km/L、WLTC総合23.2km/L。乖離率約20%はクラス平均的。JC08/WLTC比で実燃費推定の精度はWLTCが優位（乖離率10〜15%）。",
      "cost-focused":
        "ガソリン代の計算にはWLTCの23.2km/Lを使いましょう。JC08の29.0km/Lで計算すると「思ったよりガソリン代がかかる…」とギャップを感じます。",
    },
    competitors: [],
    practicalNote:
      "JC08は2018年以前のカタログとの比較用。実際の燃費計算にはWLTCを使いましょう。",
  },
  {
    specKey: "燃費性能::JC08モード（ハイブリッド）",
    icon: "ClipboardList",
    emoji: "📋",
    headline: "旧基準でのハイブリッド参考値",
    defaultInsight:
      "28.2〜29.4km/LはJC08モードでのハイブリッド燃費。グレードにより幅があります。WLTCの23.3km/Lと比較すると約20〜26%の乖離があるため、WLTCで判断するのが正確です。",
    personalizedInsights: {
      "first-car":
        "この数字は古い測定方法での値です。実際に近い燃費はWLTCの23.3km/L。数字が高く見えますが、期待しすぎないように注意。",
      "cost-focused":
        "グレードによる幅がありますが、いずれもJC08基準。月のガソリン代を計算する際はWLTCの23.3km/Lで計算しましょう。",
    },
    competitors: [],
    practicalNote:
      "WLTCモード23.3km/Lと合わせて見ると、実燃費のイメージがつかみやすくなります。",
  },
  {
    specKey: "燃費性能::JC08モード（ターボ）",
    icon: "ClipboardList",
    emoji: "📋",
    headline: "旧基準でのターボ参考値",
    defaultInsight:
      "24.8km/LはJC08モードでのターボ燃費。WLTCの21.5km/Lとの乖離は約15%。ターボ車はWLTCとの差が小さい傾向があり、実燃費に比較的近い数値です。",
    personalizedInsights: {
      "first-car":
        "ターボ車の古い基準での燃費です。実際に近いのはWLTCの21.5km/L。ターボ車はJC08との差が小さめで、意外と実燃費に近い数字になっています。",
      "cost-focused":
        "WLTCの21.5km/Lとの差は約15%。ターボ車は実燃費との乖離が小さい傾向。月のガソリン代はWLTCの数字で約7,900円（月1,000km、170円/L想定）が目安です。",
    },
    competitors: [],
    practicalNote:
      "ターボ車はJC08とWLTCの差が比較的小さい。実燃費はWLTC値に近い傾向があります。",
  },
  // =====================
  // 安全装備（7項目）
  // =====================
  {
    specKey: "安全装備::インテリジェントエマージェンシーブレーキ",
    icon: "ShieldCheck",
    emoji: "🛡️",
    headline: "追加費用なし・全車標準装備",
    defaultInsight:
      "自動ブレーキが全グレードに標準装備。エントリーグレードのSでも追加費用なしで搭載されています。一部競合車はグレードによりオプションの場合も。",
    personalizedInsights: {
      "first-car":
        "前方の車や歩行者にぶつかりそうになると自動でブレーキがかかる機能。デイズは一番安いSグレードにも標準装備。追加費用なしで安心です。",
      "car-expert":
        "全グレード標準はサポカーS ワイド該当の要件。ミリ波レーダー＋カメラのフュージョン方式で車両・歩行者・自転車を検知。作動速度域は約10〜80km/h。",
      "cost-focused":
        "全グレード標準＝一番安いSグレードでも追加費用なし。自動ブレーキ搭載車は任意保険の「ASV割引」（約9%引き）対象で、年間数千円の保険料節約にもなります。",
      "safety-focused":
        "車両・歩行者・自転車を検知する三重の安全網。全グレード標準装備で「装備し忘れ」がないのは大きな安心。サポカーS ワイドに該当します。",
    },
    competitors: [
      { name: "N-BOX", value: "全グレード標準", verdict: "equal" },
      { name: "ワゴンR", value: "全グレード標準", verdict: "equal" },
      { name: "タント", value: "全グレード標準", verdict: "equal" },
    ],
    practicalNote:
      "現在は各社とも全グレード標準。しかし検知性能やブレーキの制御精度にはメーカー間で差があります。",
  },
  {
    specKey: "安全装備::踏み間違い衝突防止アシスト",
    icon: "Footprints",
    emoji: "🦶",
    headline: "全車標準で踏み間違い事故を防止",
    defaultInsight:
      "アクセルとブレーキの踏み間違いによる急発進を抑制する機能。デイズは全グレードに標準装備。コンビニへの突っ込み事故などを未然に防ぎます。",
    personalizedInsights: {
      "first-car":
        "駐車場で慌ててペダルを間違えても、車が急発進を抑えてくれます。慣れない運転で焦る場面でも安心の機能。全グレード標準なので追加費用もゼロです。",
      "cost-focused":
        "全グレード標準で追加費用なし。踏み間違い事故は修理費数十万〜百万円以上になるケースも。この機能で1回でも防げれば、車両価格以上の価値があります。",
      "safety-focused":
        "前方・後方の障害物を検知した状態でのアクセル急踏みを抑制。ソナーと連携して壁・人を検知し、エンジン出力制限＋ブレーキ制御を行います。",
    },
    competitors: [
      { name: "N-BOX", value: "全グレード標準", verdict: "equal" },
      { name: "ワゴンR", value: "全グレード標準", verdict: "equal" },
      { name: "タント", value: "全グレード標準", verdict: "equal" },
    ],
    practicalNote:
      "各社とも全グレード標準だが、検知方式（ソナー/カメラ）と制御ロジックに差あり。",
  },
  {
    specKey: "安全装備::車線逸脱防止支援システム",
    icon: "ArrowRightLeft",
    emoji: "↔️",
    headline: "全車標準のはみ出し防止",
    defaultInsight:
      "車線をはみ出しそうになるとハンドルを自動で修正する機能。居眠りやよそ見による事故を防ぎます。全グレード標準装備なので、最廉価のSグレードでも安心。",
    personalizedInsights: {
      "first-car":
        "ちょっとよそ見して車線をはみ出しそうになっても、車がハンドルをちょっと戻してくれます。初心者ドライバーの「うっかり」をカバーしてくれる心強い味方。",
      "car-expert":
        "カメラによる車線認識＋EPS介入でステアリングトルクを付与。LDW（逸脱警報）とLDP（逸脱防止制御）を統合したシステム。全グレード標準は競合と横並び。",
      "safety-focused":
        "車線を常時監視し、逸脱傾向を検知するとステアリング制御で車線内に補正。居眠り運転による対向車線への飛び出し事故を防ぐ重要な予防安全機能です。",
    },
    competitors: [
      { name: "N-BOX", value: "全グレード標準", verdict: "equal" },
      { name: "ワゴンR", value: "一部標準", verdict: "advantage" },
      { name: "タント", value: "全グレード標準", verdict: "equal" },
    ],
    practicalNote:
      "ワゴンRは一部グレードでオプションの場合あり。デイズは全グレード標準で安心。",
  },
  {
    specKey: "安全装備::プロパイロット",
    icon: "Navigation",
    emoji: "🛣️",
    headline: "Gグレード以上に標準装備",
    defaultInsight:
      "高速道路でアクセル・ブレーキ・ハンドルを自動制御する先進機能。G以上のグレードなら追加費用なしで装備。軽自動車でこのレベルの運転支援は日産の強みです。",
    personalizedInsights: {
      "first-car":
        "高速道路で前の車との距離を保ちながら、車線の中央を走ってくれる機能。初めての高速道路でも緊張が軽減されます。Gグレード以上なら無料で付いてきます。",
      "car-expert":
        "ACC＋LKAを統合した先進運転支援（レベル2相当）。全車速追従＋停止保持対応。軽自動車でのプロパイロット搭載はデイズの大きな差別化ポイント。",
      "cost-focused":
        "G以上なら追加費用ゼロ。高速通勤の方は疲労軽減＋燃費向上のダブルメリット。競合で同等機能はオプション扱いや非搭載の場合があり、コスパ面で優位。",
    },
    competitors: [
      { name: "N-BOX", value: "Honda SENSING標準", verdict: "equal" },
      { name: "ワゴンR", value: "ACC非搭載", verdict: "advantage" },
      { name: "タント", value: "ACC非搭載", verdict: "advantage" },
    ],
    practicalNote:
      "ワゴンR・タントにはACC（追従クルーズ）がなく、プロパイロット相当の機能は非搭載。デイズの大きな優位点。",
  },
  {
    specKey: "安全装備::SOSコール",
    icon: "Phone",
    emoji: "🆘",
    headline: "Gグレード以上に緊急通報機能",
    defaultInsight:
      "ボタンひとつでオペレーターに繋がり、警察や救急車を手配。エアバッグ展開時は自動通報も可能。Gグレード以上に標準装備されています。",
    personalizedInsights: {
      "first-car":
        "事故や急病の時、パニックで電話できなくてもボタンひとつで助けを呼べます。場所も自動で伝わるので、初めての運転でも安心。G以上なら追加費用なし。",
      "cost-focused":
        "万一の事故時に迅速な救助を呼べることで、後遺症リスク軽減＝医療費削減にも。G以上なら追加費用なしで搭載される、費用対効果の高い安心装備です。",
      family:
        "家族を乗せている時の事故が一番怖いもの。SOSコールなら意識がなくても自動通報。ボタンひとつで助けを呼べるのは、家族を守る大きな安心です。",
      "safety-focused":
        "エアバッグ展開連動の自動通報で、ドライバーが意識を失っても緊急通報が可能。GPSで正確な位置を伝達し、ゴールデンアワー内の救命処置につなげます。",
    },
    competitors: [
      { name: "N-BOX", value: "非搭載", verdict: "advantage" },
      { name: "ワゴンR", value: "非搭載", verdict: "advantage" },
      { name: "タント", value: "非搭載", verdict: "advantage" },
    ],
    practicalNote:
      "SOSコール搭載は軽自動車ではデイズがほぼ唯一。競合にはない大きな安心感。",
  },
  {
    specKey: "安全装備::アラウンドビューモニター",
    icon: "Camera",
    emoji: "📷",
    headline: "G以上に360°カメラ標準装備",
    defaultInsight:
      "車両を上空から見下ろす映像で駐車をサポート。4つのカメラで360°の視界を確保。Gグレード以上に標準装備で、追加費用なしです。",
    personalizedInsights: {
      "first-car":
        "駐車場で車の周り全部が画面に映るので、「あとどれくらい寄せていいの？」が一目瞭然。駐車が苦手でも安心！G以上なら追加費用なしです。",
      "car-expert":
        "4カメラ合成による俯瞰映像＋移動物検知機能付き。インテリジェントパーキングアシストとの連携も可能。G以上標準は競合に対する優位点。",
      "cost-focused":
        "駐車場でのこすり傷は1回の修理で数万円。アラウンドビューモニターで1回でも防げれば元が取れます。G以上なら追加費用なしなのも嬉しいポイント。",
      family:
        "スーパーの駐車場で子どもが飛び出しても画面で確認できます。お子様の乗り降り時も周囲を確認でき、チャイルドシートへの乗せ降ろし時も安心。",
    },
    competitors: [
      { name: "N-BOX", value: "オプション", verdict: "advantage" },
      { name: "ワゴンR", value: "非搭載", verdict: "advantage" },
      { name: "タント", value: "オプション", verdict: "advantage" },
    ],
    practicalNote:
      "N-BOX・タントはオプション扱い、ワゴンRは非搭載。デイズはG以上で標準＝コスパ面で優位。",
  },
  {
    specKey: "安全装備::ハイビームアシスト",
    icon: "SunDim",
    emoji: "🔦",
    headline: "HIGHWAY STARに標準のライト自動切替",
    defaultInsight:
      "対向車を検知してハイ/ロービームを自動切替。夜間の視認性を最大化しつつ、対向車の眩惑を防ぎます。HIGHWAY STAR系に標準装備。",
    personalizedInsights: {
      "first-car":
        "夜道でハイビーム・ロービームの切り替えを忘れても大丈夫。対向車が来たら自動で切り替えてくれます。「まぶしい！」と怒られる心配なし。",
      "car-expert":
        "カメラによる前方光源検知でハイ/ロービームを自動切替。検知閾値の精度が高く、街灯との誤検知も少ない設計。HS系標準でS・Xグレードには非搭載。",
      "safety-focused":
        "夜間走行時の視認距離を最大化するハイビームを基本とし、対向車や先行車を検知時のみロービームに自動切替。手動操作の遅れや忘れによるリスクを排除します。",
    },
    competitors: [
      { name: "N-BOX", value: "全グレード標準", verdict: "disadvantage" },
      { name: "ワゴンR", value: "一部標準", verdict: "equal" },
      { name: "タント", value: "全グレード標準", verdict: "disadvantage" },
    ],
    practicalNote:
      "N-BOX・タントは全グレード標準なのに対し、デイズはHS系のみ。S・Xグレード選択時は注意。",
  },
];
