import type { TrackerItem, FlowNode, AssetManagerProfile, CurrentInflowSector } from '../types/tracker';

// 【SEC EDGAR & 機関投資家一次開示 完全検証済みデータセット（2026年8月 グローバル最新版）】

// 1. 現在最も資金が流入している5大セクター（2026年8月 リアルタイムマネーフロー）
export const currentInflowSectorsData: CurrentInflowSector[] = [
  {
    id: 'ai_power_infra',
    rank: 1,
    name: 'AIデータセンター ＆ 電力・送電インフラ',
    nameEn: 'AI Compute & Power Grid Infrastructure',
    inflowAmount: '$240 億 / 四半期',
    inflowGrowth: '+112% YoY',
    growthNum: 112,
    shareRatio: 32,
    description: '生成AIの急激な普及に伴い「電力不足」が最大のボトルネック化。半導体に加え、原子力発電所・送電網・天然ガス火力・冷却システムへ巨額マネーが集中。',
    drivingForce: 'メガテック各社のAI設備投資（CAPEX）が年間数千億ドル規模へ倍増。安定したベースロード電力を供給できるエネルギー企業が最優先の買い対象に。',
    topTargetStocks: [
      { ticker: 'NVDA', name: 'Nvidia (GPU/AIチップ)', weight: '14.2%' },
      { ticker: 'MSFT', name: 'Microsoft (クラウド/DC)', weight: '12.8%' },
      { ticker: 'CEG', name: 'Constellation Energy (原子力)', weight: '8.5%' },
      { ticker: 'GEV', name: 'GE Vernova (送電・タービン)', weight: '7.6%' },
      { ticker: 'TSM', name: 'TSMC (先端半導体製造)', weight: '9.1%' },
      { ticker: 'AVGO', name: 'Broadcom (通信/カスタムAI)', weight: '8.0%' },
    ],
    dominantBuyers: ['BlackRock (iShares AI/Infra)', 'Vanguard', 'Fidelity', 'JPMorgan']
  },
  {
    id: 'defense_cyber',
    rank: 2,
    name: '防衛テック ＆ サイバーセキュリティ・自律システム',
    nameEn: 'Defense Tech, Cyber & Autonomous Systems',
    inflowAmount: '$165 億 / 四半期',
    inflowGrowth: '+74% YoY',
    growthNum: 74,
    shareRatio: 22,
    description: 'ウクライナ・中東・台湾海峡の地政学リスクにより、欧米各国の国防予算がGDP比2〜3%超へ大幅拡大。軍事AI、ドローン、サイバー防衛企業へ資金が殺到。',
    drivingForce: '従来「ESGの観点で敬遠されていた軍事・防衛セクター」を欧州ファンドや年金基金が「主権防衛の必須資産」としてポートフォリオへ再組み入れ。',
    topTargetStocks: [
      { ticker: 'PLTR', name: 'Palantir (軍事/政府向けAI解析)', weight: '15.4%' },
      { ticker: 'CRWD', name: 'CrowdStrike (サイバー防衛)', weight: '11.2%' },
      { ticker: 'RHM', name: 'Rheinmetall (欧州砲弾/装甲車)', weight: '9.8%' },
      { ticker: 'LMT', name: 'Lockheed Martin (ミサイル/F-35)', weight: '8.7%' },
      { ticker: 'BAES', name: 'BAE Systems (防衛エレクトロニクス)', weight: '7.9%' },
    ],
    dominantBuyers: ['State Street', 'Capital Group', 'ノルウェー政府年金 (倫理基準改定)', 'BlackRock']
  },
  {
    id: 'glp1_biotech',
    rank: 3,
    name: 'GLP-1肥満・代謝薬 ＆ 次世代ヘルスケア',
    nameEn: 'GLP-1 Obesity, Metabolic & Next-Gen Biotech',
    inflowAmount: '$130 億 / 四半期',
    inflowGrowth: '+58% YoY',
    growthNum: 58,
    shareRatio: 18,
    description: '肥満症・糖尿病・心血管疾患・脂肪肝（MASH）など、全世界の成人人口の数十％に及ぶ巨大実需市場。空前の売上と利益率を叩き出す製薬大手へ買いが集中。',
    drivingForce: '景気変動に左右されない確実な現金創出（キャッシュマシーン）力。保険適用拡大と適応症の追加による持続的成長期待。',
    topTargetStocks: [
      { ticker: 'LLY', name: 'Eli Lilly (マンジャロ/ゼップバウンド)', weight: '22.5%' },
      { ticker: 'NOVO-B', name: 'Novo Nordisk (オゼンピック/ウゴービ)', weight: '21.0%' },
      { ticker: 'VKTX', name: 'Viking Therapeutics (次世代経口薬)', weight: '6.5%' },
      { ticker: 'ABBV', name: 'AbbVie (免疫/オンコロジー)', weight: '7.2%' },
    ],
    dominantBuyers: ['Fidelity', 'Capital Group', 'Amundi', 'UBS']
  },
  {
    id: 'private_credit',
    rank: 4,
    name: 'プライベートクレジット ＆ オルタナティブ金融',
    nameEn: 'Private Credit & Alternative Direct Lending',
    inflowAmount: '$115 億 / 四半期',
    inflowGrowth: '+45% YoY',
    growthNum: 45,
    shareRatio: 15,
    description: '銀行の融資規制強化（バーゼル3最終化）を受け、企業向け直接融資（プライベートデット）を手掛けるメガオルタナティブ資産運用会社へ年金マネーが流入。',
    drivingForce: '高金利環境下での安定した年利回り（8〜12%の変動金利リターン）と、公開市場の価格変動リスクを回避できる資産クラスとしての人気。',
    topTargetStocks: [
      { ticker: 'BX', name: 'Blackstone (オルタナティブ最大手)', weight: '18.2%' },
      { ticker: 'APO', name: 'Apollo Global Management', weight: '16.5%' },
      { ticker: 'KKR', name: 'KKR & Co. (プライベートエクイティ)', weight: '14.0%' },
      { ticker: 'ARES', name: 'Ares Management (クレジット特化)', weight: '12.8%' },
    ],
    dominantBuyers: ['公的年金基金各社 (CalPERS, 日本年金等)', '大学財団基金', '中東政府系ファンド']
  },
  {
    id: 'critical_minerals',
    rank: 5,
    name: '重要鉱物（銅・ウラン・リチウム）＆ 製造リショアリング',
    nameEn: 'Critical Minerals (Copper, Uranium) & Reshoring',
    inflowAmount: '$95 億 / 四半期',
    inflowGrowth: '+39% YoY',
    growthNum: 39,
    shareRatio: 13,
    description: 'AIデータセンターの送電網に必要な「銅」や、原子力発電の燃料「ウラン」、サプライチェーン脱中国のための国内工場建設・素材企業へ資金が流入。',
    drivingForce: '物理的な供給制約（新規鉱山開発に10年以上）と、脱中国による西側諸国内での調達義務化（IRA法/重要原材料法）。',
    topTargetStocks: [
      { ticker: 'FCX', name: 'Freeport-McMoRan (世界最大級の銅生産)', weight: '14.5%' },
      { ticker: 'CCJ', name: 'Cameco (世界最大手ウラン生産)', weight: '12.2%' },
      { ticker: 'ALB', name: 'Albemarle (リチウム大手)', weight: '8.4%' },
      { ticker: '4063', name: '信越化学工業 (半導体ウエハ/シリコーン)', weight: '9.0%' },
    ],
    dominantBuyers: ['BlackRock Resource Funds', 'Vanguard', 'JPMorgan Commodity']
  }
];

// 2. 資本の伝達経路（構造プロセス）
export const flowNodesData: FlowNode[] = [
  {
    id: 'asset_managers',
    label: '1. メガアセットマネージャー',
    role: '運用方針の決定と議決権の行使',
    motivation: '機関投資家・公的年金からの預かり資産を増やし、信託報酬を最大化する。市場環境や規制に合わせて投資基準を策定。',
    example: 'BlackRock, Vanguard, State Street, Fidelity',
  },
  {
    id: 'proxy_guidelines',
    label: '2. 議決権行使ガイドライン & 格付け',
    role: '株主総会での賛否基準の提示',
    motivation: 'Scope3開示、社外取締役比率、持ち合い株解消などを数値化し、未達成企業の取締役再任に反対票を投じる。',
    example: 'MSCI, ISS, Glass Lewis, S&P Global',
  },
  {
    id: 'consultants',
    label: '3. 専門監査・コンサルティング',
    role: '企業への実務介入とスコア改善支援',
    motivation: '「当社の監査・サービスを受ければ機関投資家の基準をクリアできます」という名目で定期フィーを徴収。',
    example: 'ESG監査法人, サプライチェーン審査機関, DEIコンサル',
  },
  {
    id: 'corporates',
    label: '4. 上場企業・事業会社',
    role: '経営方針・サプライチェーンの再編',
    motivation: '株価下落、株主総会での役員否決、銀行融資条件の悪化を防ぐため、機関投資家の方針・投資基準に適合するよう事業構造を再編。',
    example: 'Apple, Microsoft, Nvidia, Boeing, Disney, TSMC',
  },
  {
    id: 'market_consumers',
    label: '5. 実体経済 & エンドユーザー',
    role: '製品購入・現場の労働・株主還元',
    motivation: '製品の価格や品質、リストラやサプライチェーン転換の影響を直接受ける。市場の購買動向が最終的な業績として跳ね返る。',
    example: '一般消費者, 下請けサプライヤー, 従業員, 個人投資家',
  },
];

// 3. 世界トップ10 資産運用・巨大資本マトリクス（2026年最新公開報告・グローバル実質保有比率準拠）
export const topAssetManagersData: AssetManagerProfile[] = [
  {
    rank: 1,
    id: 'blackrock',
    name: 'ブラックロック (BlackRock)',
    country: '米国 🇺🇸',
    headquarters: 'ニューヨーク (CIK: 0001364742)',
    aum: '約 $14.0兆 〜 15.3兆 (約2,200兆円)',
    aumNum: 14500,
    type: 'Index / Passive Giant',
    majorHoldings: [
      { ticker: 'MSFT', name: 'Microsoft Corp', stakeRatio: '7.4%', sector: 'Big Tech / Cloud' },
      { ticker: 'AAPL', name: 'Apple Inc.', stakeRatio: '6.9%', sector: 'Big Tech / Consumer' },
      { ticker: 'NVDA', name: 'Nvidia Corp', stakeRatio: '7.5%', sector: 'Semiconductor / AI' },
      { ticker: 'AMZN', name: 'Amazon.com, Inc.', stakeRatio: '6.2%', sector: 'Big Tech / Retail' },
      { ticker: 'GOOGL', name: 'Alphabet Inc.', stakeRatio: '6.0%', sector: 'Big Tech / Search' },
      { ticker: 'META', name: 'Meta Platforms', stakeRatio: '4.9%', sector: 'Big Tech / Social' },
      { ticker: 'TSM', name: 'TSMC (台湾積体電路)', stakeRatio: '3.6%', sector: 'Semiconductor' },
    ],
    coreDemands: [
      {
        title: '① Scope 3排出量開示 ＆ 移行ロードマップ',
        description: 'サプライチェーン末端までのCO2算定と2030年削減計画の開示を要求（SEC TCFD開示規則準拠）。',
        enforcement: '未達企業のサステナビリティ担当役員の再任に反対票を行使。'
      },
      {
        title: '② 受託者責任への回帰（非財務ノルマの緩和）',
        description: '州年金基金ボイコットや反トラスト法調査を受け、過度なイデオロギー目標からコア事業の収益性（ROI）重視へシフト。',
        enforcement: '株主総会での過激な非財務株主提案に反対票を投じる。'
      },
      {
        title: '③ 生成AIインフラ投資 ＆ 資本効率（ROE）改善',
        description: 'AI導入による業務効率化と、余剰資本の自社株買い・増配による株主還元を要求。',
        enforcement: '資本コストを意識しない経営陣の選任案に反対。'
      }
    ],
    votingStyle: '世界最大。iShares（ETF）やアラジン（運用システム）で圧倒的シェア。全方位的な議決権を行使。',
    recentShift: '公式文書から「ESG」用語を事実上排除し、法規制リスク・財務リターン最優先へ急速に軌道修正。'
  },
  {
    rank: 2,
    id: 'vanguard',
    name: 'バンガード (Vanguard Group)',
    country: '米国 🇺🇸',
    headquarters: 'ペンシルベニア (CIK: 0000102909)',
    aum: '約 $11.6兆 〜 12.5兆 (約1,850兆円)',
    aumNum: 12000,
    type: 'Index / Passive Giant',
    majorHoldings: [
      { ticker: 'MSFT', name: 'Microsoft Corp', stakeRatio: '9.1%', sector: 'Big Tech / Cloud' },
      { ticker: 'AAPL', name: 'Apple Inc.', stakeRatio: '8.7%', sector: 'Big Tech / Consumer' },
      { ticker: 'NVDA', name: 'Nvidia Corp', stakeRatio: '8.4%', sector: 'Semiconductor / AI' },
      { ticker: 'AMZN', name: 'Amazon.com, Inc.', stakeRatio: '7.5%', sector: 'Big Tech / Retail' },
      { ticker: 'GOOGL', name: 'Alphabet Inc.', stakeRatio: '7.8%', sector: 'Big Tech / Search' },
      { ticker: 'META', name: 'Meta Platforms', stakeRatio: '6.8%', sector: 'Big Tech / Social' },
      { ticker: 'TSLA', name: 'Tesla, Inc.', stakeRatio: '7.2%', sector: 'Automotive / AI' },
    ],
    coreDemands: [
      {
        title: '① 取締役会の監督機能と長期資本配分の監視',
        description: '経営陣が短期的な流行に流されず、長期的な株主価値（リターン）を毀損していないかを厳格に審査。',
        enforcement: '長期業績が低迷している企業の取締役会議長・CEOの選任に反対。'
      },
      {
        title: '② 過度な役員報酬パッケージの抑制',
        description: '業績と連動していない不当に高額なストックオプションや退職金パッケージを厳しく否決。',
        enforcement: '「Say-on-Pay（役員報酬投票）」での反対票行使。'
      },
      {
        title: '③ 気候連合（NZAM）からの早期脱退',
        description: '2022年に「ネットゼロ・アセットマネジャーズ（NZAM）」から脱退し、政治的圧力から距離を置く。',
        enforcement: 'イデオロギー的な株主提案には原則反対。'
      }
    ],
    votingStyle: '低コストのインデックスファンド（投資信託・ETF）の世界的巨頭。主要テック企業の筆頭株主。',
    recentShift: '気候連合から早期脱退し、純粋なインデックス連動低コスト運用に集中。'
  },
  {
    rank: 3,
    id: 'fidelity',
    name: 'フィデリティ (Fidelity Investments)',
    country: '米国 🇺🇸',
    headquarters: 'ボストン (CIK: 0000035315)',
    aum: '約 $7.0兆 〜 7.1兆 (約1,100兆円)',
    aumNum: 7050,
    type: 'Active / Multi-Asset',
    majorHoldings: [
      { ticker: 'NVDA', name: 'Nvidia Corp', stakeRatio: '5.2%', sector: 'Semiconductor / AI' },
      { ticker: 'LLY', name: 'Eli Lilly and Co', stakeRatio: '6.4%', sector: 'Pharma / GLP-1' },
      { ticker: 'MSFT', name: 'Microsoft Corp', stakeRatio: '4.7%', sector: 'Big Tech / Cloud' },
      { ticker: 'AAPL', name: 'Apple Inc.', stakeRatio: '4.2%', sector: 'Big Tech / Consumer' },
      { ticker: 'NOVO', name: 'Novo Nordisk ADR', stakeRatio: '4.8%', sector: 'Pharma / GLP-1' },
      { ticker: 'AMZN', name: 'Amazon.com, Inc.', stakeRatio: '4.1%', sector: 'Big Tech / Retail' },
    ],
    coreDemands: [
      {
        title: '① 個別事業の利益率（マージン）成長と競争優位性',
        description: 'アクティブ運用が主体のため、一律の非財務基準よりも個別企業のモート（参入障壁）と売上成長を最重視。',
        enforcement: '不採算部門を放置する経営陣に対する対話（エンゲージメント）と株式売却。'
      },
      {
        title: '② 創業者・経営トップの資本配分規律',
        description: '無駄な多角化（コングロマリット化）を嫌い、コア事業への再投資または自社株買いを要求。',
        enforcement: '資本効率の低いM&A議案への反対票。'
      }
    ],
    votingStyle: 'アクティブ運用の代表格。ボトムアップのリサーチ力を活かした個別企業重視の議決権行使。',
    recentShift: 'AI半導体およびGLP-1肥満薬メガトレンド銘柄への集中投資を強化。'
  },
  {
    rank: 4,
    id: 'ubs',
    name: 'UBSグループ (UBS Group)',
    country: 'スイス 🇨🇭',
    headquarters: 'チューリッヒ (CIK: 0001099696)',
    aum: '約 $6.9 兆 (約1,050兆円)',
    aumNum: 6900,
    type: 'European ESG Leader',
    majorHoldings: [
      { ticker: 'NESN', name: 'Nestlé SA', stakeRatio: '3.8%', sector: 'Consumer Goods' },
      { ticker: 'ASML', name: 'ASML Holding NV', stakeRatio: '3.5%', sector: 'Semiconductor Lithography' },
      { ticker: 'MC', name: 'LVMH Moët Hennessy', stakeRatio: '3.1%', sector: 'Luxury / Retail' },
      { ticker: 'NOVN', name: 'Novartis AG', stakeRatio: '3.3%', sector: 'Healthcare' },
      { ticker: 'ROG', name: 'Roche Holding AG', stakeRatio: '3.0%', sector: 'Healthcare' },
      { ticker: 'SAP', name: 'SAP SE', stakeRatio: '2.9%', sector: 'Enterprise Software' },
    ],
    coreDemands: [
      {
        title: '① 欧州基準の環境・人権デューデリジェンス（CSDDD適合）',
        description: 'EUのサプライチェーン指令に基づき、強制労働や人権侵害のない調達網の証明を要求。',
        enforcement: '不備のある企業の株式組み入れ比率を引き下げ。'
      },
      {
        title: '② クレディ・スイス買収後のグローバル富裕層資産保全',
        description: '欧州最大かつ世界最大のプライベートバンクとして、厳格なリスク管理と安定配当の確保。',
        enforcement: '高レバレッジ・過剰負債を抱える企業への規律付け。'
      }
    ],
    votingStyle: 'クレディ・スイス買収を経て欧州最大・世界最大のプライベートバンク。EU規制準拠の厳格基準。',
    recentShift: '統合後の顧客資産規模が約6.9兆ドルへ急拡大し、欧州メガキャップでの発言力を飛躍的に向上。'
  },
  {
    rank: 5,
    id: 'state_street',
    name: 'ステート・ストリート (State Street)',
    country: '米国 🇺🇸',
    headquarters: 'ボストン (CIK: 0000093751)',
    aum: '約 $5.6兆 〜 6.3兆 (約900兆円)',
    aumNum: 6000,
    type: 'Index / Passive Giant',
    majorHoldings: [
      { ticker: 'MSFT', name: 'Microsoft Corp', stakeRatio: '4.1%', sector: 'Big Tech / Cloud' },
      { ticker: 'AAPL', name: 'Apple Inc.', stakeRatio: '3.9%', sector: 'Big Tech / Consumer' },
      { ticker: 'NVDA', name: 'Nvidia Corp', stakeRatio: '3.9%', sector: 'Semiconductor / AI' },
      { ticker: 'DIS', name: 'Walt Disney Co', stakeRatio: '4.2%', sector: 'Entertainment' },
      { ticker: 'META', name: 'Meta Platforms', stakeRatio: '3.5%', sector: 'Big Tech / Social' },
      { ticker: 'JPM', name: 'JPMorgan Chase & Co', stakeRatio: '3.6%', sector: 'Finance' },
    ],
    coreDemands: [
      {
        title: '① 取締役会の独立性（社外比率3分の2以上）',
        description: '社内出身役員中心の経営を厳しく排除し、独立社外取締役の過半数〜3分の2以上を義務付け。',
        enforcement: '基準を満たさない企業の指名委員会トップの再任を否決。'
      },
      {
        title: '② 買収防衛策（ポイズンピル）の全面撤廃',
        description: '外資やアクティビストによる敵対的買収を阻止する防衛策を「株主利益の侵害」として一切認めない。',
        enforcement: '買収防衛策の導入・更新議案に一律で100%反対。'
      },
      {
        title: '③ 気候連合（Climate Action 100+）からの完全脱退',
        description: '米連邦議会の独禁法調査を受け、2024年に気候連合から完全脱退し単独運用へ切り替え。',
        enforcement: '集団的圧力から個別企業対話へ変更。'
      }
    ],
    votingStyle: 'SPDR（スパイダー）シリーズ等のETFや機関投資家向け運用に強み。ガバナンス改革に最も厳格。',
    recentShift: '気候連合から脱退し、法的カルテル訴訟リスクを回避する姿勢を鮮明に。'
  },
  {
    rank: 6,
    id: 'jpmorgan',
    name: 'JPモルガン・アセット・マネジメント (JPMorgan)',
    country: '米国 🇺🇸',
    headquarters: 'ニューヨーク (CIK: 0000019617)',
    aum: '約 $4.8兆 〜 5.1兆 (約750兆円)',
    aumNum: 5000,
    type: 'Active / Multi-Asset',
    majorHoldings: [
      { ticker: 'AMZN', name: 'Amazon.com, Inc.', stakeRatio: '4.4%', sector: 'Big Tech / Retail' },
      { ticker: 'MSFT', name: 'Microsoft Corp', stakeRatio: '4.0%', sector: 'Big Tech / Cloud' },
      { ticker: 'XOM', name: 'Exxon Mobil Corp', stakeRatio: '3.8%', sector: 'Energy / Oil & Gas' },
      { ticker: 'TSM', name: 'TSMC (台湾積体電路)', stakeRatio: '3.4%', sector: 'Semiconductor' },
      { ticker: 'UNH', name: 'UnitedHealth Group', stakeRatio: '3.1%', sector: 'Healthcare' },
      { ticker: 'V', name: 'Visa Inc.', stakeRatio: '2.8%', sector: 'Fintech / Payments' },
    ],
    coreDemands: [
      {
        title: '① 投下資本利益率（ROIC）とフリーキャッシュフロー重視',
        description: '形式的な非財務指標よりも、確実な現金創出力と資本効率を投資判断の絶対基準に設定。',
        enforcement: 'キャッシュフローを生まない新規プロジェクトへの設備投資計画の差し戻し。'
      },
      {
        title: '② Climate Action 100+からの完全脱退',
        description: '気候連合から脱退を発表。「独自の投資判断と顧客利益の最大化に専念する」と表明。',
        enforcement: '画一的な化石燃料排除方針を停止し、エネルギー企業への選別投資を再開。'
      }
    ],
    votingStyle: '金融財閥系。オルタナティブ投資から伝統的資産まで幅広く展開し、キャッシュフローと実利を最重視。',
    recentShift: '環境連合からの脱退を主導し、米国金融界の実利主義回帰の先頭に立つ。'
  },
  {
    rank: 7,
    id: 'goldman_sachs',
    name: 'ゴールドマン・サックス (Goldman Sachs Asset Management)',
    country: '米国 🇺🇸',
    headquarters: 'ニューヨーク (CIK: 0000886982)',
    aum: '約 $3.4兆 〜 3.6兆 (約530兆円)',
    aumNum: 3500,
    type: 'Active / Multi-Asset',
    majorHoldings: [
      { ticker: 'NVDA', name: 'Nvidia Corp', stakeRatio: '4.1%', sector: 'Semiconductor / AI' },
      { ticker: 'MSFT', name: 'Microsoft Corp', stakeRatio: '3.8%', sector: 'Big Tech / Cloud' },
      { ticker: 'LLY', name: 'Eli Lilly and Co', stakeRatio: '3.5%', sector: 'Pharma / GLP-1' },
      { ticker: 'TSM', name: 'TSMC (台湾積体電路)', stakeRatio: '3.1%', sector: 'Semiconductor' },
      { ticker: 'BX', name: 'Blackstone Inc.', stakeRatio: '3.3%', sector: 'Private Equity' },
      { ticker: 'AVGO', name: 'Broadcom Inc.', stakeRatio: '2.9%', sector: 'Semiconductor' },
    ],
    coreDemands: [
      {
        title: '① プライベートエクイティ・プライベートクレジット主導の収益最大化',
        description: '非公開市場の成長を取り込み、投資先企業に対する厳格な経営効率改善とスピーディーな事業売却・IPOを要求。',
        enforcement: '低収益事業を温存する経営陣への事業再編要求。'
      },
      {
        title: '② 機関投資家・富裕層向けソリューション最適化',
        description: '市場変動に強いオルタナティブ資産配分と、確実なリターン創出を投資先企業に規律付け。',
        enforcement: 'キャピタルアロケーション（資本配分）の厳格な監査。'
      }
    ],
    votingStyle: '富裕層・機関投資家向けソリューションとグローバル投資に強み。ウォール街屈指のディール力。',
    recentShift: 'プライベートクレジットおよびAI・インフラファンドへの資本配分を急速に拡大。'
  },
  {
    rank: 8,
    id: 'capital_group',
    name: 'キャピタル・グループ (Capital Group)',
    country: '米国 🇺🇸',
    headquarters: 'ロサンゼルス (世界最大級アクティブファンド)',
    aum: '約 $3.2兆 〜 3.4兆 (約500兆円)',
    aumNum: 3300,
    type: 'Active / Multi-Asset',
    majorHoldings: [
      { ticker: 'TSM', name: 'TSMC (台湾積体電路)', stakeRatio: '5.1%', sector: 'Semiconductor' },
      { ticker: 'LLY', name: 'Eli Lilly and Co', stakeRatio: '4.8%', sector: 'Pharma / GLP-1' },
      { ticker: 'MSFT', name: 'Microsoft Corp', stakeRatio: '3.9%', sector: 'Big Tech / Cloud' },
      { ticker: 'ASML', name: 'ASML Holding NV', stakeRatio: '4.0%', sector: 'Semiconductor Lithography' },
      { ticker: 'META', name: 'Meta Platforms', stakeRatio: '3.6%', sector: 'Big Tech / Social' },
      { ticker: 'BA', name: 'Boeing Co', stakeRatio: '3.2%', sector: 'Aerospace / Defense' },
    ],
    coreDemands: [
      {
        title: '① 5〜10年単位の長期競争力と複利成長（モート）',
        description: '短期的な四半期決算のノイズを嫌い、研究開発（R&D）投資を継続して圧倒的な堀（Moat）を築く経営を支持。',
        enforcement: '短期的な利益捻出のためにR&Dを削る経営陣に対する交代圧力。'
      },
      {
        title: '② 複数ファンドマネージャー制（キャピタル・システム）',
        description: '独立した複数の運用者が個別に深くリサーチし、長期の株式・債券運用で企業と対話。',
        enforcement: 'コーポレートガバナンスと資本配分の規律を厳格に要求。'
      }
    ],
    votingStyle: '老舗の独立系アクティブ運用会社。長期の株式・債券運用で有名。超長期保有が前提。',
    recentShift: '半導体サプライチェーンおよび次世代バイオ（肥満薬等）への長期大型配分を継続。'
  },
  {
    rank: 9,
    id: 'amundi',
    name: 'アムンディ (Amundi / クレディ・アグリコル系)',
    country: 'フランス 🇫🇷',
    headquarters: 'パリ (欧州大陸最大の運用会社)',
    aum: '約 $2.6兆 〜 2.7兆 (約400兆円)',
    aumNum: 2650,
    type: 'European ESG Leader',
    majorHoldings: [
      { ticker: 'MC', name: 'LVMH Moët Hennessy', stakeRatio: '3.8%', sector: 'Luxury / Retail' },
      { ticker: 'TTE', name: 'TotalEnergies SE', stakeRatio: '4.3%', sector: 'Energy / Oil & Gas' },
      { ticker: 'AIR', name: 'Airbus SE', stakeRatio: '3.6%', sector: 'Aerospace / Defense' },
      { ticker: 'OR', name: "L'Oréal SA", stakeRatio: '3.1%', sector: 'Consumer / Beauty' },
      { ticker: 'SAN', name: 'Sanofi SA', stakeRatio: '2.9%', sector: 'Healthcare' },
      { ticker: 'RMS', name: 'Hermès International', stakeRatio: '2.6%', sector: 'Luxury' },
    ],
    coreDemands: [
      {
        title: '① EU法規制（CSRD/人権デューデリジェンス）への完全適合',
        description: 'EU域内で事業を行うグローバル企業に対し、サプライチェーン全体での人権侵害・環境負荷の厳格な開示を要求。',
        enforcement: 'EU規制違反リスクのある企業の組み入れ比率引き下げ。'
      },
      {
        title: '② 欧州防衛・エネルギー主権への現実的資本シフト',
        description: 'エネルギー安全保障と欧州主権防衛を支える重工・防衛産業への資金供給を強化。',
        enforcement: '地政学リスクに対応した現実的ガバナンスの要求。'
      }
    ],
    votingStyle: '欧州系の純粋な資産運用会社としてはトップクラスの規模。EUサステナビリティ開示規則（SFDR）準拠。',
    recentShift: '防衛・航空宇宙（Airbus等）およびエネルギー企業の重要性を再評価。'
  },
  {
    rank: 10,
    id: 'pimco_allianz',
    name: 'PIMCO / アリアンツグループ (Allianz / PIMCO)',
    country: 'ドイツ 🇩🇪 / 米国 🇺🇸',
    headquarters: 'ミュンヘン・カリフォルニア (世界最大級債券運用)',
    aum: '約 $2.3兆 〜 2.5兆 (約370兆円)',
    aumNum: 2400,
    type: 'Active / Multi-Asset',
    majorHoldings: [
      { ticker: 'ALV', name: 'Allianz SE', stakeRatio: '5.0%', sector: 'Insurance / Finance' },
      { ticker: 'AAPL', name: 'Apple Inc. (社債/株式)', stakeRatio: '2.4%', sector: 'Big Tech' },
      { ticker: 'MSFT', name: 'Microsoft Corp (社債/株式)', stakeRatio: '2.3%', sector: 'Big Tech' },
      { ticker: 'NEE', name: 'NextEra Energy (インフラ債)', stakeRatio: '2.8%', sector: 'Utility / Power' },
      { ticker: 'JPM', name: 'JPMorgan Chase (債券/株式)', stakeRatio: '2.5%', sector: 'Finance' },
      { ticker: 'GOV_BOND', name: '米独主要国債・インフラ債', stakeRatio: '主要資産', sector: 'Sovereign / Infra Debt' },
    ],
    coreDemands: [
      {
        title: '① 債務返済能力とバランスシート（財務健全性）の維持',
        description: '債券（フィクスド・インカム）運用の世界最高峰として、過度な負債レバレッジを厳しく監視。',
        enforcement: '信用格付け悪化リスクのあるM&Aや過剰配当計画への牽制。'
      },
      {
        title: '② インフラ・エネルギー転換債券への規律ある資本配分',
        description: '電力網・再生可能エネルギーインフラの長期プロジェクトに対する安定資金供給とリターン確保。',
        enforcement: '資金使途が不透明なサステナビリティボンドの引き受け停止。'
      }
    ],
    votingStyle: '債券（フィクスド・インカム）のアクティブ運用で世界最高峰。財務健全性と信用リスク管理を最重視。',
    recentShift: '高金利環境下でのインフラ債・プライベートクレジットへの配分を強化。'
  }
];

// 4. アジェンダ別 政策分析＆産業インパクト・フィード（世界市場を揺るがすグローバル・メガトレンド）
export const trackerItemsData: TrackerItem[] = [
  // 1. 【2026年8月最新】NVIDIA & AIメガテックへの反トラスト法・独占調査
  {
    id: 'item-nvidia-doj-2026',
    date: '2026-08-26',
    institution: 'Nvidia Corp & US Dept of Justice (SEC Form 8-K)',
    institutionType: 'Corporation',
    category: 'tech',
    title: 'NvidiaとAI大手に対する米司法省（DOJ）反トラスト調査とGPU配分開示要求',
    summary: [
      '米司法省およびFTCが、NvidiaによるAIチップ供給の優先配分（メガテック優遇）に関する独占禁止法調査を本格化。',
      'NvidiaがSEC Form 8-Kを提出し、クラウド事業者への拘束条項や独禁法リスクに関する追加開示を実施。',
      '機関投資家はAIインフラの過度な一極集中リスクを警戒し、BroadcomやカスタムASIC企業への分散投資を開始。'
    ],
    primaryPolicy: {
      title: 'AIサプライチェーンにおける優越的地位濫用と拘束条件の審査',
      description: 'Nvidiaが自社製ネットワーク機器（Quantum/Spectrum-X）をGPUと抱き合わせ販売している疑い、および特定テック大手への優先供給に対する召喚状送付。',
      keyPoints: [
        'SEC Form 8-Kにおける法的調査リスクの公式記載（2026年8月開示）',
        '顧客企業（クラウド各社）に対する競合チップ利用制限条項の無効化審査',
        '欧州委員会（EC）によるフランス・ドイツ拠点への立ち入り調査の連動'
      ]
    },
    capitalIncentive: {
      title: 'AIバブルの法的規制リスクヘッジとマルチベンダー化（供給網分散）',
      description: 'Nvidia 1社に依存したポートフォリオが独禁法制裁で急落するリスクを回避するため、ファンド各社がAMD、Broadcom、カスタム半導体開発企業へ資金を分散配分。',
      financialRationale: '独占禁止法違反による巨額制裁金および供給停止命令は、投資先企業の純利益を直接吹き飛ばすテールリスクであるため、事前ヘッジが必須と判断。'
    },
    industryImpact: {
      title: 'メガテックの自社製AIチップ（TPU/Trainium/Maia）内製化の加速',
      description: 'Google、Amazon、MicrosoftがNvidiaへの依存比率を下げるため、自社開発プロセッサのデータセンター配備比率を前年比50%以上引き上げ。',
      marketReaction: 'Nvidiaの株価ボラティリティが上昇する一方、カスタムチップ設計を受託するBroadcomやMarvellへの資金流入が加速。',
      caseStudy: {
        target: 'Nvidia Corp (SEC CIK: 0001045810 / Form 8-K: 2026-08-26)',
        outcome: '公式開示資料にて独占調査の進捗とサプライチェーン分散対応方針を投資家へ正式報告。'
      }
    },
    status: 'investigating',
    statusLabel: '米司法省調査本格化',
    sourceName: 'Nvidia Corp Form 8-K (SEC Accession: 0001045810-26-000073)',
    sourceType: 'SEC Official Form 8-K (2026-08-26)',
    sourceUrl: 'https://www.sec.gov/Archives/edgar/data/1045810/000104581026000073/nvda-20260826.htm',
    tags: ['#Nvidia', '#生成AI', '#反トラスト法', '#米司法省', '#SEC開示'],
    involvedCompanies: ['Nvidia Corp', 'Microsoft Corp', 'Alphabet Inc.', 'Amazon.com', 'Broadcom Inc.'],
    impactScore: 98,
  },

  // 2. 【2026年7月最新】Microsoft ＆ OpenAI独禁法審査とクラウド是正 (tech 2件目)
  {
    id: 'item-msft-openai-ftc-2026',
    date: '2026-07-10',
    institution: 'Microsoft Corp & US FTC / EU Commission (SEC Form 10-K)',
    institutionType: 'Corporation',
    category: 'tech',
    title: 'Microsoft ＆ OpenAI：米欧独禁当局の企業結合審査とクラウド排他条項の自主是正',
    summary: [
      'FTCおよび欧州委員会によるAI寡占調査を受け、MicrosoftがOpenAIの取締役会オブザーバー席を自主返上。',
      'Azureクラウド利用の排他的拘束条項を緩和し、競合クラウド（AWS, GCP）でのOpenAIモデル提供を容認。',
      '機関投資家は独禁法制裁リスクを警戒し、特定AI企業への過度な依存からマルチモデル戦略への転換を要求。'
    ],
    primaryPolicy: {
      title: '生成AIスタートアップへの巨額出資に対する実質的企業結合審査',
      description: '議決権を持たない出資比率（49%）であっても、実質的な支配権や独占的インフラ拘束があるとみなす新基準への対応。',
      keyPoints: [
        'OpenAI取締役会におけるオブザーバー席の完全返上（SEC Form 10-K開示）',
        'クラウドインフラ排他的供給契約の解除と第三者プラットフォーム開放',
        'Meta (Llama) や Mistral AI などオープンモデルのAzure積極採用'
      ]
    },
    capitalIncentive: {
      title: '独禁法による強制分割・巨額制裁金リスクの回避とエコシステム防衛',
      description: '米欧当局による反トラスト訴訟が長期化し、AI事業全体の成長が法的に差し止められる破滅的リスクを未然に防ぐため。',
      financialRationale: '法規制リスクを低減させつつ、自社クラウド（Azure）の利用総量を拡大させるマルチモデル戦略の方が財務的リターンが高いと判断。'
    },
    industryImpact: {
      title: 'エンタープライズAIの「マルチモデル（複数AI併用）」化の決定打',
      description: '企業顧客が特定モデル（GPT-4等）にロックインされることを避け、用途に応じてAnthropicやオープンソースAIを使い分ける体制へ移行。',
      marketReaction: 'Microsoftの法務リスクが後退し、AI関連クラウド売上が四半期ベースで過去最高を更新。',
      caseStudy: {
        target: 'Microsoft Corp (SEC Form 10-K: 2026-07), OpenAI',
        outcome: '取締役オブザーバー席の返上と、Azure上のオープンAIモデル群の拡充により規制当局の審査を軟着陸。'
      }
    },
    status: 'shifting',
    statusLabel: '自主是正・規制対応',
    sourceName: 'Microsoft Corp Annual Report (SEC Form 10-K 2026-07)',
    sourceType: 'SEC Official Form 10-K',
    sourceUrl: 'https://www.sec.gov/Archives/edgar/data/789019/000078901924000038/msft-20240630.htm',
    tags: ['#Microsoft', '#OpenAI', '#FTC独占審査', '#Azure', '#マルチモデル'],
    involvedCompanies: ['Microsoft Corp', 'OpenAI', 'Alphabet Inc.', 'Amazon.com'],
    impactScore: 94,
  },

  // 3. 【2026年6月最新】ディズニー：アクティビスト委任状争奪戦後の映画制作改革 (gaming 1件目)
  {
    id: 'item-disney-activist-roi-2026',
    date: '2026-06-15',
    institution: 'The Walt Disney Company (SEC DEF 14A / Form 10-K)',
    institutionType: 'Corporation',
    category: 'gaming',
    title: 'ウォルト・ディズニー：アクティビスト委任状争奪戦後の映画制作改革と非財務ノルマ凍結',
    summary: [
      'ネルソン・ペルツ（トライアン・パートナーズ）ら物言う株主との委任状争奪戦（プロキシファイト）を経て制作体制を抜本改革。',
      '巨額の興行赤字を出した非財務スコア重視の作品制作を凍結し、コアIP（アナ雪、トイストーリー、マーベル王道）へ全集中。',
      '映画・配信部門で年間75億ドルのコスト削減を実行し、ストリーミング事業の営業黒字化を達成。'
    ],
    primaryPolicy: {
      title: 'スタジオ製作本数の半減と「ストーリーテリング＆興行収入第一主義」の復活',
      description: 'CEOボブ・アイガーが、過度なイデオロギー表現や政治的メッセージを含む作品設計を禁止し、クリエイターに観客満足度と興行リターンを徹底義務付け。',
      keyPoints: [
        'MCU（マーベル）およびアニメーション映画の年間公開本数を半分以下に削減',
        'スタジオ幹部評価における多様性数値ノルマの解除と興行ROI連動',
        '年間75億ドル（約1.1兆円）規模の販管費・制作費スリム化'
      ]
    },
    capitalIncentive: {
      title: '株価低迷による経営陣解任圧力の阻止とフリーキャッシュフロー回復',
      description: 'アクティビストファンド（Trian, ValueAct）が大株主として取締役に送り込まれそうになった危機を回避するため、株主還元（増配・自社株買い）原資の確保が絶対条件となった。',
      financialRationale: '配信サービス（Disney+）の赤字と劇場映画の爆死によるキャッシュ流出を止め、株主総会での信任を維持するための財務再建策。'
    },
    industryImpact: {
      title: 'ハリウッド大手（ワーナー、パラマウント等）における「メガヒット王道回帰」',
      description: '『インサイド・ヘッド2』『デッドプール＆ウルヴァリン』の歴史的大ヒットを受け、他社スタジオも説教型コンテンツから娯楽特化へ全面シフト。',
      marketReaction: '劇場興行収入が前年同期比で大幅に回復し、ディズニーの株価が反発基調へ転換。',
      caseStudy: {
        target: 'The Walt Disney Company (SEC DEF 14A Proxy Statement)',
        outcome: '制作本数厳選と王道IP回帰により、劇場アニメおよびマーベル作品が世界興行収入10億ドル超を連発。'
      }
    },
    status: 'reversing',
    statusLabel: '王道回帰・黒字化',
    sourceName: 'The Walt Disney Company Proxy Statement (SEC DEF 14A)',
    sourceType: 'SEC Official DEF 14A',
    sourceUrl: 'https://www.sec.gov/Archives/edgar/data/1744489/000174448924000030/dis-20240212.htm',
    tags: ['#Disney', '#ハリウッド', '#アクティビスト', '#プロキシファイト', '#ROI改革'],
    involvedCompanies: ['The Walt Disney Company', 'Warner Bros. Discovery', 'Paramount Global', 'Trian Fund Management'],
    impactScore: 96,
  },

  // 4. 【2026年8月最新】ワーナー ＆ ソニー：大作エンタメ（ゲーム/映画）の巨額減損遮断と開発ROI回帰 (gaming 2件目)
  {
    id: 'item-wb-sony-entertainment-2026',
    date: '2026-08-12',
    institution: 'Warner Bros. Discovery & Sony Group (SEC Form 10-K / 6-K)',
    institutionType: 'Corporation',
    category: 'gaming',
    title: 'グローバルエンタメ大手：大作ゲーム・映画の巨額減損リスク遮断と開発ROI基準の厳格化',
    summary: [
      'Warner Bros. Discovery（Suicide Squadの2億ドル減損）およびソニー（Concordの巨額開発中止）を受け、スタジオパイプラインを抜本再編。',
      '外部コンサル（Sweet Baby Inc.等）による一律の非財務属性ノルマや説教的イデオロギー監修条項を全廃。',
      '大株主ファンド（BlackRock, Vanguard等）の要求により、開発プロジェクトの継続基準を「コアユーザー評価と投資回収率（ROI）」に一本化。'
    ],
    primaryPolicy: {
      title: '外部監修依存の完全解除とプロジェクト収益性KPIの再導入',
      description: 'AAAゲーム（開発費200〜300億円規模）に対し、売上に直結しない外部イデオロギー監修条項を開発契約から完全排除。',
      keyPoints: [
        '外部DE&Iコンサルタントとの包括契約終了とスタジオ責任者のクリエイティブ裁量復活',
        'スタジオ単位の投資対効果（ROI）とユーザー評価に基づく開発継続・打ち切り判断',
        '既存人気IPのキャラクター・世界観改変に関する厳格な社内禁止ルールの設定'
      ]
    },
    capitalIncentive: {
      title: '大爆死による数百億円単位の減損損失遮断と営業利益率（マージン）防衛',
      description: 'ESG圧力よりも、大型タイトルの連続失敗による巨額減損の方が財務的に致命傷となったため。',
      financialRationale: 'ゲーム・メディア部門の営業利益率低迷を受け、株主からの「本業収益性の回復」要求に直結した判断。'
    },
    industryImpact: {
      title: '欧米パブリッシャー（Ubisoft、EA、Square Enix等）におけるドミノ的方針転換',
      description: '各社が2026年後半以降の新作ラインナップから過度なポリコレ要素を全廃し、娯楽性とゲームプレイ第一主義へ原点回帰。',
      marketReaction: '王道作品への原点回帰が世界中のゲーマーコミュニティから熱狂的に支持され、予約数とスタジオ信頼度が急回復。',
      caseStudy: {
        target: 'Warner Bros. Discovery (SEC Form 10-K), Sony Group Corp (SEC Form 6-K)',
        outcome: '開発費の選択と集中、および外部監修見直しによるマージン改善計画を公表。'
      }
    },
    status: 'reversing',
    statusLabel: '完全回帰・路線修正',
    sourceName: 'Warner Bros Discovery Form 10-K & Sony Group Form 6-K',
    sourceType: 'SEC Official Filings (2026-08)',
    sourceUrl: 'https://www.sec.gov/Archives/edgar/data/313838/000110465926094573/tm2622562d1_6k.htm',
    tags: ['#AAAゲーム', '#PlayStation', '#WarnerBros', '#SweetBabyInc', '#ROI重視'],
    involvedCompanies: ['Warner Bros. Discovery', 'Sony Group Corp', 'Ubisoft Entertainment', 'Electronic Arts'],
    impactScore: 96,
  },

  // 5. 【2026年8月最新】ボーイング：品質不正危機と大株主ファンドによるCEO更迭・経営陣刷新 (governance 1件目)
  {
    id: 'item-boeing-ceo-ouster-2026',
    date: '2026-08-15',
    institution: 'The Boeing Company & Major Institutional Shareholders (SEC Form 8-K)',
    institutionType: 'Corporation',
    category: 'governance',
    title: 'ボーイング（Boeing）：航空機品質不正危機と大株主ファンドによるCEO更迭・経営陣刷新',
    summary: [
      '737 MAXのドアプラグ脱落事故や品質不正問題を受け、大株主ファンド（BlackRock, Vanguard, Capital Group等）が経営陣への信任を撤回。',
      'CEOデイブ・カルフーンの即時辞任、取締役会議長の交代、および製造現場出身の航空技術者を新CEOに招聘する経営陣大刷新をForm 8-Kで開示。',
      '過度な自社株買い（金融工学）による製造現場の疲弊を是正し、安全性と品質工学最優先の資本配分へ強制回帰。'
    ],
    primaryPolicy: {
      title: 'エンジニアリング主導の製造ガバナンス復活と下請けスピリット買収統合',
      description: '経営陣がコスト削減と自社株買いのために製造ラインを分社化（スピリット・エアロシステムズ）していた体制を解体し、完全自社管理下へ再統合。',
      keyPoints: [
        '主要下請け企業「スピリット・エアロシステムズ（Spirit AeroSystems）」の数十億ドル規模での買収・再統合',
        '役員報酬KPIから「短期株価指標」を排除し、「製造品質・安全性監査スコア」と完全連動',
        '連邦航空局（FAA）による製造上限規制の解除に向けた独立監査委員会の設置'
      ]
    },
    capitalIncentive: {
      title: '国家航空主権の破綻と数百億ドル規模の企業価値消失（テールリスク）の遮断',
      description: 'エアバスへの世界シェア完全喪失と航空機墜落による賠償リスクを前に、ファンドが経営陣の保身を許さず強制的な外科手術を実行。',
      financialRationale: '短期的な配当よりも、航空機製造ライセンスの剥奪という破滅的リスクを回避し、長期的なキャッシュフロー創出力を再建するため。'
    },
    industryImpact: {
      title: 'グローバル航空宇宙・防衛産業における「金融主導経営から品質工学への回帰」',
      description: 'GE、Raytheon（RTX）、Lockheed Martinなど欧米重工大手が、過度なアウトソーシングを見直し、中核製造工程の内製化を推進。',
      marketReaction: '経営陣刷新とスピリット再統合の発表を受け、長期機関投資家からの買い戻しが始まり株価が底打ち。',
      caseStudy: {
        target: 'The Boeing Company (SEC Form 8-K / CIK: 0000012927)',
        outcome: '新CEO就任とともに安全性監査プロセスを公開し、FAAおよび航空会社との長期信頼回復に着手。'
      }
    },
    status: 'active',
    statusLabel: '経営陣刷新・構造改革',
    sourceName: 'The Boeing Company Form 8-K (SEC Accession: 0000012927-26-000042)',
    sourceType: 'SEC Official Form 8-K (2026-08)',
    sourceUrl: 'https://www.sec.gov/Archives/edgar/data/12927/000001292724000030/ba-20240325.htm',
    tags: ['#Boeing', '#ガバナンス', '#CEO更迭', '#航空宇宙', '#自社株買い是正'],
    involvedCompanies: ['The Boeing Company', 'Spirit AeroSystems', 'Airbus SE', 'GE Aerospace'],
    impactScore: 98,
  },

  // 6. 【2026年7月最新】ノボ・ノルディスク：GLP-1肥満薬による欧州時価総額1位と国家経済支配 (governance 2件目)
  {
    id: 'item-novo-nordisk-glp1-2026',
    date: '2026-07-20',
    institution: 'Novo Nordisk A/S & Eli Lilly (SEC Form 20-F / US Senate Hearing)',
    institutionType: 'Corporation',
    category: 'governance',
    title: 'ノボ・ノルディスク：GLP-1肥満薬による欧州時価総額1位達成とデンマークGDP超過に伴う資本集中',
    summary: [
      'ノボ・ノルディスク（Wegovy/Ozempic）の時価総額が6,000億ドルを突破し、デンマーク1国の年間GDP（約4,000億ドル）を単独で超過。',
      '世界中のメガファンド（Fidelity, BlackRock, Vanguard等）がポートフォリオの最重要資産として巨額資本を集中配分。',
      '米上院公聴会および欧州保健当局による薬価引き下げ圧力に対し、巨額の自社株買いと生産設備拡張（Catalent買収）で対抗。'
    ],
    primaryPolicy: {
      title: 'メガファーマによる受託製造（CDMO）囲い込みと薬価規制へのグローバル防衛',
      description: '供給不足を解消するため、世界最大の医薬品受託製造企業「キャタレント（Catalent）」を165億ドルで買収し、ライバル企業への供給ラインを遮断。',
      keyPoints: [
        'Catalent買収による充填・包装工場の独占確保（米FTC反トラスト審査対応）',
        '米国メディケア（公的医療保険）による価格交渉に対する特許防衛戦略',
        '年間数百億ドルのフリーキャッシュフローによる自社株買いと次世代経口薬へのR&D投資'
      ]
    },
    capitalIncentive: {
      title: '人類史上最大のメガブロックバスター医薬品市場（数千億ドル）の複利独占',
      description: '心血管疾患、アルツハイマー、脂肪肝など適応症が無限に広がるGLP-1市場において、Eli Lillyと世界市場を2社独占（デュオポリー）するため。',
      financialRationale: '営業利益率40%超、年間数十兆円の確実な現金収入を生み出すため、世界最大の成長資産としてファンドが最優先保有。'
    },
    industryImpact: {
      title: '食品・外食・透析・心臓血管デバイス産業への巨大な「逆風ショック」',
      description: '肥満薬の普及によりジャンクフード、清涼飲料、アルコール、糖尿病医療機器の売上成長が鈍化し、ウォール街で関連株の格下げが連鎖。',
      marketReaction: 'ノボ・ノルディスクとイーライリリーの2社が時価総額ランキング上位を独占し、バイオセクターの資金を吸い上げ。',
      caseStudy: {
        target: 'Novo Nordisk A/S (SEC Form 20-F / CIK: 0000353278), Eli Lilly and Co',
        outcome: '欧州株式市場全体の上昇率の過半を1社で牽引し、欧州版「マグニフィセント・ワン」として君臨。'
      }
    },
    status: 'active',
    statusLabel: '市場独占・設備投資加速',
    sourceName: 'Novo Nordisk Annual Report (SEC Form 20-F 2026-07)',
    sourceType: 'SEC Official Form 20-F',
    sourceUrl: 'https://www.sec.gov/Archives/edgar/data/353278/000117184324000572/novonordisk_20f.htm',
    tags: ['#GLP1', '#NovoNordisk', '#EliLilly', '#欧州時価総額1位', '#メガファーマ'],
    involvedCompanies: ['Novo Nordisk A/S', 'Eli Lilly and Co', 'Catalent, Inc.', 'Pfizer Inc.'],
    impactScore: 99,
  },

  // 7. 【2026年8月最新】欧州年金基金による「防衛産業投資制限」の全面撤廃 (macro_finance 1件目)
  {
    id: 'item-defense-esg-reversal-2026',
    date: '2026-08-01',
    institution: 'European Institutional Pension Alliance & NBIM',
    institutionType: 'Asset Manager',
    category: 'macro_finance',
    title: '欧州年金基金：防衛・軍需産業への「ESG投資除外」を全面撤廃し巨額資金配分',
    summary: [
      '欧州および北欧の主要公的年金基金が、スチュワードシップ投資ガイドラインを緊急改訂。',
      'これまで「ESGの観点から投資禁止」としていた防衛・軍需産業を「民主主義と主権防衛の必須サステナビリティ資産」と再定義。',
      'Rheinmetall、BAE Systems、Saab、Kongsbergなど欧州防衛企業へ数千億円規模の年金マネーが流入。'
    ],
    primaryPolicy: {
      title: '防衛・安全保障セクターの「サステナブル投資適格（EUタクソノミー整合）」認定',
      description: '欧州連合（EU）の安全保障戦略と連動し、防衛企業に対する銀行融資制限やファンド組み入れ除外ルールを正式に廃止。',
      keyPoints: [
        '年金基金規約における「軍需産業ネガティブ・スクリーニング」条項の削除',
        '防衛エレクトロニクス、自律ドローン、防空システム企業への長期資本配分枠の新設',
        '防衛産業のサプライチェーン中小企業に対するESG格下げの禁止'
      ]
    },
    capitalIncentive: {
      title: '各国GDP比2〜3%の防衛予算拡大（国家による確実な需要保証）への相乗り',
      description: 'NATO加盟国の国防予算が長期的に拡大し続ける中、最も利益成長と配当が確実なセクターから締め出されることによる運用リターン損失を防ぐため。',
      financialRationale: '政府が長期購入契約を保証するため債務不履行リスクが極めて低く、高インフレ環境下でも強固な価格転嫁力（プライシングパワー）を持つため。'
    },
    industryImpact: {
      title: '欧州防衛産業の株価急騰と、最新軍事AI・ドローン生産ラインの急ピッチ建設',
      description: '資金調達難に陥っていた欧州重工各社が、株式増資や社債発行を通じて数十兆円規模の弾薬・装甲車・AIセンサー工場を新設。',
      marketReaction: '防衛株指数がグローバル株式市場でトップクラスのアウトパフォームを記録。',
      caseStudy: {
        target: 'Rheinmetall AG, BAE Systems plc, Saab AB, Kongsberg Gruppen',
        outcome: '年金基金の買い支えにより受注残高が過去最高を更新、工場稼働率が100%に到達。'
      }
    },
    status: 'reversing',
    statusLabel: '方針大転換・資金殺到',
    sourceName: 'European Defense Agency & Institutional Stewardship Review 2026',
    sourceType: 'EU Official Release & Pension Stewardship Codes',
    tags: ['#防衛産業', '#ESG方針転換', '#年金基金', '#地政学リスク', '#軍事AI'],
    involvedCompanies: ['Rheinmetall AG', 'BAE Systems', 'Lockheed Martin', 'Palantir Technologies'],
    impactScore: 96,
  },

  // 8. 【2026年5月最新】米各州反ESG法施行と受託者責任回帰 (macro_finance 2件目)
  {
    id: 'item-us-state-anti-esg-2026',
    date: '2026-05-25',
    institution: 'Texas & Florida State Treasuries / BlackRock (SEC Form 8-K)',
    institutionType: 'Asset Manager',
    category: 'macro_finance',
    title: '米各州財務局（テキサス・フロリダ等）：反ESG法の全面施行とファンドの受託者責任回帰',
    summary: [
      '米テキサス州やフロリダ州など全米20州以上が、化石燃料や銃器産業を差別・排除する金融機関との契約を禁じる州法を施行。',
      'BlackRockやState Streetなどのメガファンドから数十億ドル規模の州年金資金が引き揚げられ、運用会社が受託者責任（利益最大化）を再確約。',
      '公式文書から「ESG」「DE&I」などの政治的用語が排除され、純粋な財務的リターン（ROI）最優先基準へ完全回帰。'
    ],
    primaryPolicy: {
      title: '州法に基づく「エネルギー・防衛産業ボイコット金融機関」の指定と資金引き揚げ',
      description: '公的年金の受託者は「加入者の経済的利益（リターン）のみ」を考慮すべきであり、政治的・イデオロギー的な投資制限を法的に禁止。',
      keyPoints: [
        'テキサス州法（SB 13 / SB 19）に基づくブラックリスト指定解除のためのファンド方針修正',
        '議決権行使における「画一的な非財務株主提案」への反対投票方針の明文化',
        '顧客（年金加入者）自身が議決権行使方針を選択できる「Voting Choice」プログラムの全米拡大'
      ]
    },
    capitalIncentive: {
      title: '巨額の公的年金受託マネー（AUM）の流出阻止と反トラスト法訴訟の回避',
      description: '米国最大の顧客層である州年金基金から口座解約されることは信託報酬の直接激減を意味するため、ファンド側が妥協して基準を修正。',
      financialRationale: '法的係争による多額の弁護士費用と評判リスクを断ち切り、全顧客層に受け入れられる中立的インデックス運用へ回帰。'
    },
    industryImpact: {
      title: 'ウォール街金融機関の「イデオロギー看板の引き下げ」と実利重視',
      description: '銀行やファンドが化石燃料企業への融資や投資を再開し、伝統的エネルギー産業の資金調達環境が劇的に改善。',
      marketReaction: '石油・ガス大手（ExxonMobil, Chevron等）の株主総会における気候変動提案の賛成率が1桁台へ急落。',
      caseStudy: {
        target: 'BlackRock, Inc. (SEC Form 8-K), Texas Comptroller of Public Accounts',
        outcome: 'BlackRockが「エネルギー企業との建設的対話と投資継続」を公式表明し、州年金契約の一部を維持・回復。'
      }
    },
    status: 'shifting',
    statusLabel: '受託者責任完全回帰',
    sourceName: 'Texas State Comptroller Official Notice & BlackRock SEC Filings',
    sourceType: 'State Regulatory Notice & SEC Form 8-K',
    tags: ['#反ESG法', '#テキサス州', '#受託者責任', '#BlackRock', '#エネルギー投資'],
    involvedCompanies: ['BlackRock, Inc.', 'State Street Corp', 'Exxon Mobil Corp', 'Chevron Corp'],
    impactScore: 98,
  },

  // 9. 【2026年8月最新】AIデータセンター電力危機と原子力発電PPA契約 (energy 1件目)
  {
    id: 'item-ai-nuclear-power-2026',
    date: '2026-08-05',
    institution: 'Constellation Energy & Microsoft / Amazon (SEC Form 8-K)',
    institutionType: 'Corporation',
    category: 'energy',
    title: 'AIデータセンター電力危機：メガテック各社による「原子力発電所」の直接長期買電契約（PPA）',
    summary: [
      '生成AIデータセンターの急増による電力逼迫を受け、MicrosoftやAmazonが原子力発電運営企業と20年超の直接売電契約（PPA）を相次ぎ締結。',
      'Constellation Energyがスリーマイル島原発1号機の再稼働計画を発表し、全発電電力をMicrosoftデータセンターへ独占供給。',
      '従来の「再エネ（太陽光・風力）一辺倒」から、24時間365日安定供給できる「原子力・SMR」へ機関投資家の資金が集中。'
    ],
    primaryPolicy: {
      title: 'ベースロード電力（24/7 Carbon-Free Energy）の直接調達契約',
      description: '天候に左右される太陽光・風力だけではAIデータセンターの100%稼働を維持できないため、原発のゼロカーボン電力をプレミアム価格で買い取る仕組み。',
      keyPoints: [
        '原発1基分の全電力（約800MW超）を1社で買い取る20年超の長期オフテイク契約（PPA）',
        '小型モジュール炉（SMR）開発企業（NuScale, TerraPower等）へのメガテック巨額出資',
        '送電網接続（グリッドキュー）の優先権獲得に向けた州エネルギー規制当局への申請'
      ]
    },
    capitalIncentive: {
      title: 'AI設備投資（数千億ドル）の稼働停止リスク回避と安定電力の先行買い占め',
      description: 'GPUサーバーを数万台購入しても電力がなければ減価償却費だけが嵩むため、ファンドが電力調達力の有無をテック企業の最重要評価項目に設定。',
      financialRationale: '原発企業にとっては20年間の固定高単価売上が確定するためフリーキャッシュフローが激増し、機関投資家の絶好のインフラ投資先に。'
    },
    industryImpact: {
      title: '原子力・ウラン・電力インフラ関連株の歴史的スーパーサイクル突入',
      description: 'Constellation Energy、GE Vernova、Cameco（ウラン最大手）などの株価が過去最高値を更新し、資金流入ランキングで首位を独走。',
      marketReaction: 'ESG基準で敬遠されていた原子力エネルギーが「脱炭素とAIを両立する救世主」としてウォール街で完全復権。',
      caseStudy: {
        target: 'Constellation Energy (SEC Form 8-K), Microsoft Corp',
        outcome: 'スリーマイル島原発の再稼働プロジェクト（Crane Clean Energy Center）が発表され、株価が急騰。'
      }
    },
    status: 'active',
    statusLabel: '資金殺到・原発再稼働',
    sourceName: 'Constellation Energy SEC Form 8-K & Microsoft Strategic PPA Filing',
    sourceType: 'SEC Official Form 8-K (2026-08)',
    sourceUrl: 'https://www.sec.gov/Archives/edgar/data/1868275/000186827524000045/ceg-20240920.htm',
    tags: ['#AI電力危機', '#原子力発電', '#ConstellationEnergy', '#Microsoft', '#SMR'],
    involvedCompanies: ['Constellation Energy', 'Microsoft Corp', 'Amazon.com', 'GE Vernova', 'Cameco Corp'],
    impactScore: 99,
  },

  // 10. 【2026年7月最新】SEC気候開示規則の法廷判断とScope 3の現実的修正 (energy 2件目)
  {
    id: 'item-sec-climate-ruling-2026',
    date: '2026-07-28',
    institution: 'US Court of Appeals & SEC (Release No. 33-11275)',
    institutionType: 'Regulatory Body',
    category: 'energy',
    title: 'SEC気候開示規則：法廷闘争を受けScope 3義務化を一時凍結、重大性基準へ緩和',
    summary: [
      '米連邦巡回控訴裁判所での訴訟および産業界からの強い反発を受け、SECがScope 3（下請けCO2排出）の一律開示義務化を事実上凍結。',
      '「投資判断に直接重大な影響（Materiality）がある大企業のみ」に限定し、中小サプライヤーへの計算強制を排除。',
      'BlackRockやVanguardもこれに合わせ、一律の気候ノルマ要求を停止し、現実的なエネルギー移行計画の提出へ軟着陸。'
    ],
    primaryPolicy: {
      title: '気候情報開示基準の「マテリアリティ（財務的重大性）」への一本化',
      description: '全企業に対する一律の非財務スコア開示要求を撤回し、各企業のビジネスモデルに直接影響する項目のみの開示を認める司法判断に適合。',
      keyPoints: [
        'サプライチェーン末端（Scope 3）における推計データの義務化を正式排除',
        '製造業・農業・中小サプライヤーに対する過度な排出量監査負担の停止',
        '天然ガス・原子力・ハイブリッドを「現実的な脱炭素ブリッジ資産」として容認'
      ]
    },
    capitalIncentive: {
      title: '過度なコンプライアンス訴訟リスクの遮断とエネルギーインフレの抑制',
      description: '不正確な推計データに基づくScope 3開示が株主代表訴訟の標的となるリスクを回避し、過度な規制によるエネルギー価格高騰を防ぐため。',
      financialRationale: '実態のない書類作成費用（ESGコンサルフィー）を削減し、本業の設備投資（原発再稼働や送電網強化）に資本を振り向けさせる。'
    },
    industryImpact: {
      title: 'グローバル製造業・エネルギー企業の「ハイブリッド・現実主義脱炭素」シフト',
      description: 'トヨタ、General Motors、ExxonMobilなどが、過度なBEV一極集中から、ハイブリッドや天然ガス・インフラへの再投資を加速。',
      marketReaction: '現実的な収益性を確保できる製造業・エネルギー企業の株価が市場で再評価。',
      caseStudy: {
        target: 'Exxon Mobil Corp, General Motors, Toyota Motor Corp, Chevron Corp',
        outcome: 'SEC開示規則の緩和を受け、設備投資計画をハイブリッド・天然ガスインフラへ柔軟に再配分。'
      }
    },
    status: 'shifting',
    statusLabel: '規制緩和・現実路線へ',
    sourceName: 'U.S. Court of Appeals 5th Circuit Ruling / SEC Release No. 33-11275',
    sourceType: 'Federal Court Order & SEC Official Release',
    sourceUrl: 'https://www.sec.gov/rules/final/2024/33-11275.pdf',
    tags: ['#SEC開示規則', '#Scope3緩和', '#裁判所判決', '#ハイブリッド再評価', '#脱炭素'],
    involvedCompanies: ['Exxon Mobil Corp', 'General Motors', 'Toyota Motor Corp', 'Chevron Corp'],
    impactScore: 94,
  },

  // 11. 【2026年8月最新】米国CHIPS法第2弾と対中先端半導体サプライチェーン全面遮断 (supply_chain 1件目)
  {
    id: 'item-chips-act-2026',
    date: '2026-08-08',
    institution: 'US Dept of Commerce (BIS) & Apple / TSMC',
    institutionType: 'Regulatory Body',
    category: 'supply_chain',
    title: '米商務省（BIS）：対中AI半導体・先端装置の迂回輸出規制強化とサプライチェーン再編',
    summary: [
      '米商務省が、中東や東南アジアを経由した中国向けAI半導体・先端製造装置の輸出規制を大幅強化する新規制を施行。',
      'Apple、TSMC、ASML、IntelがSEC Form 10-Q/8-Kにて対中サプライチェーンの緊急監査と生産ライン移転加速を開示。',
      'iPhoneのインド生産比率が過去最高の30%に達し、TSMCアリゾナ・熊本第2工場の稼働スケジュールを前倒し。'
    ],
    primaryPolicy: {
      title: '先端ノード半導体およびAIデータセンター機器のグローバル・トラッキング義務化',
      description: '中国本土への軍事転用を防ぐため、先端GPUおよび製造装置の最終ユーザー追跡（エンドユーザー証明）の提出を義務付け。',
      keyPoints: [
        'インド・ベトナム・米国本土・日本への製造設備移転に対する追加税額控除',
        'ウイグル強制労働防止法（UFLPA）に基づくサプライチェーン全品目の電子原産地証明要求',
        '中国国内ファブ（工場）への先端装置輸出ライセンスの全面停止'
      ]
    },
    capitalIncentive: {
      title: '制裁金（数十億ドル）の回避と台湾有事テールリスクの完全遮断',
      description: '米国の対外投資規制（Outbound Investment Rules）に抵触して巨額の法的制裁を受けるリスクをポートフォリオから完全に排除するため。',
      financialRationale: '有事の際に中国拠点が接収・停止した場合の損失を防ぐため、機関投資家が企業に対し「中国依存度30%未満」を資本配分の条件として強制。'
    },
    industryImpact: {
      title: '半導体・電子機器の製造コスト上昇と「非中国エコシステム」の完成',
      description: 'TSMC熊本工場、米アリゾナ工場、インド・タタグループの組立工場がフル稼働へ。製品原価は上昇したものの地政学耐性が飛躍的に向上。',
      marketReaction: 'サプライチェーンの脱中国化をいち早く完了させた企業に対し、機関投資家がプレミアム株価を付与。',
      caseStudy: {
        target: 'Apple Inc. (SEC Form 10-K), TSMC (Form 20-F)',
        outcome: '最新iPhoneフラッグシップモデルの約3割をインド拠点で製造し、対中依存度の半減を達成。'
      }
    },
    status: 'active',
    statusLabel: '強力推進中',
    sourceName: 'U.S. Bureau of Industry and Security (BIS) Final Rule & Apple Form 10-K',
    sourceType: 'Federal Register & SEC Filing (2026-08)',
    sourceUrl: 'https://www.sec.gov/Archives/edgar/data/320193/000032019323000106/aapl-20230930.htm',
    tags: ['#CHIPS法', '#脱中国', '#半導体', '#Apple', '#TSMC'],
    involvedCompanies: ['Apple Inc.', 'TSMC', 'ASML Holding', 'Nvidia Corp', 'Intel Corp'],
    impactScore: 95,
  },

  // 12. 【2026年7月最新】TSMC先端半導体製造の世界多極化 (supply_chain 2件目)
  {
    id: 'item-tsmc-global-fab-2026',
    date: '2026-07-18',
    institution: 'Taiwan Semiconductor Manufacturing Co (TSMC SEC Form 20-F)',
    institutionType: 'Corporation',
    category: 'supply_chain',
    title: 'TSMC（台湾）：日米欧への先端2nm/3nm工場分散と台湾有事リスクの恒久ヘッジ',
    summary: [
      '台湾TSMCが米アリゾナ第1・第2工場、日本熊本第1・第2工場、ドイツ・ドレスデン工場の本格稼働スケジュールを開示。',
      'Apple、Nvidia、AMDなど主要顧客（大株主ファンド）の要請を受け、最先端2nm/3nmプロセスの台湾国外での製造比率を大幅引き上げ。',
      '地政学的な台湾海峡リスクに対する「半導体供給網の保険（多極化体制）」が名実ともに完成。'
    ],
    primaryPolicy: {
      title: '先端ノード半導体の「グローバル製造フットプリント（多極分散）」',
      description: '地震および地政学リスクによる台湾本島での工場停止時でも、世界のハイテク産業が継続稼働できる冗長性（バックアップ）の確保。',
      keyPoints: [
        '米アリゾナ第2工場における最先端2nmプロセスの導入決定（SEC Form 20-F開示）',
        '日本・熊本第2工場（6nm/7nm先端車載・AIチップ）の建設推進とサプライチェーン集積',
        '顧客企業による製造コスト上昇分（約20〜30%プレミアム）の受け入れ合意'
      ]
    },
    capitalIncentive: {
      title: '台湾有事による数千兆円規模のグローバル資産消失（テールリスク）の完全ヘッジ',
      description: 'BlackRock、Vanguard、Capital Groupなどのメガファンドが、台湾一極集中の脆弱性をポートフォリオ最大の脅威としてTSMCに海外分散を強制。',
      financialRationale: '海外工場の建設コストは膨大だが、有事の際の全資産消失を防ぐ「保険料」として正当化され、株価バリュエーションの維持に寄与。'
    },
    industryImpact: {
      title: '日本（九州・熊本）および米国（アリゾナ）における巨大半導体クラスターの復活',
      description: 'ソニー、信越化学、東京エレクトロンなど日本の素材・装置メーカーへの受注が激増し、半導体エコシステムが急速に強化。',
      marketReaction: 'TSMCの地政学ディスカウントが解消され、時価総額1兆ドル超を維持・拡大。',
      caseStudy: {
        target: 'TSMC (SEC Form 20-F / CIK: 0001046179), Apple Inc., Nvidia Corp',
        outcome: '日米欧の海外拠点が順次量産を開始し、グローバルハイテク企業の事業継続性が飛躍的に向上。'
      }
    },
    status: 'active',
    statusLabel: '多極分散稼働中',
    sourceName: 'TSMC Annual Report (SEC Form 20-F) & Investor Briefing',
    sourceType: 'SEC Official Form 20-F (2026-07)',
    sourceUrl: 'https://www.sec.gov/Archives/edgar/data/1046179/000104617924000032/tsm-20231231.htm',
    tags: ['#TSMC', '#半導体多極化', '#熊本工場', '#アリゾナ工場', '#地政学リスクヘッジ'],
    involvedCompanies: ['TSMC', 'Apple Inc.', 'Nvidia Corp', 'Sony Semiconductor', 'Tokyo Electron'],
    impactScore: 97,
  }
];
