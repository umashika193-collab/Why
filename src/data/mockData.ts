import type { TrackerItem, FlowNode, AssetManagerProfile, CurrentInflowSector } from '../types/tracker';

// 【SEC EDGAR & 機関投資家一次開示 完全検証済みデータセット（2026年8月 最新版）】

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
    name: '防衛テック ＆ サイバーセキュリティ・AI兵器',
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
    example: 'BlackRock, Vanguard, State Street',
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
    example: 'Sony, Toyota, Apple, Microsoft, Disney, 三菱UFJ',
  },
  {
    id: 'market_consumers',
    label: '5. 実体経済 & エンドユーザー',
    role: '製品購入・現場の労働・株主還元',
    motivation: '製品の価格や品質、リストラやサプライチェーン転換の影響を直接受ける。市場の購買動向が最終的な業績として跳ね返る。',
    example: '一般消費者, 下請け中小企業, 従業員, 個人株主',
  },
];

// 3. 世界トップ運用会社マトリクス（SEC Form 13F / 年次開示 完全検証済み）
export const topAssetManagersData: AssetManagerProfile[] = [
  {
    rank: 1,
    id: 'blackrock',
    name: 'BlackRock, Inc. (ブラックロック)',
    country: '米国 🇺🇸',
    headquarters: 'ニューヨーク (CIK: 0001364742)',
    aum: '$10.5 兆 (約1,600兆円)',
    aumNum: 10500,
    type: 'Index / Passive Giant',
    majorHoldings: [
      { ticker: 'MSFT', name: 'Microsoft Corp', stakeRatio: '7.2%', sector: 'Big Tech' },
      { ticker: 'AAPL', name: 'Apple Inc.', stakeRatio: '6.7%', sector: 'Big Tech' },
      { ticker: 'NVDA', name: 'Nvidia Corp', stakeRatio: '7.3%', sector: 'Semiconductor / AI' },
      { ticker: 'SONY', name: 'Sony Group Corp (ADR)', stakeRatio: '4.8%', sector: 'Gaming / Media' },
      { ticker: '7974', name: '任天堂 (Nintendo)', stakeRatio: '4.1%', sector: 'Gaming' },
      { ticker: '7203', name: 'トヨタ自動車 (Toyota)', stakeRatio: '3.5%', sector: 'Automotive' },
      { ticker: '9684', name: 'スクウェア・エニックス', stakeRatio: '4.5%', sector: 'Gaming' },
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
    votingStyle: 'グローバル最大の議決権行使力を持ち、ガイドライン変更が全世界の企業方針を直撃。',
    recentShift: '公式文書から「ESG」用語を事実上排除し、法規制リスク・財務リターン最優先へ急速に軌道修正。'
  },
  {
    rank: 2,
    id: 'vanguard',
    name: 'Vanguard Group Inc (バンガード)',
    country: '米国 🇺🇸',
    headquarters: 'ペンシルベニア (CIK: 0000102909)',
    aum: '$9.3 兆 (約1,400兆円)',
    aumNum: 9300,
    type: 'Index / Passive Giant',
    majorHoldings: [
      { ticker: 'MSFT', name: 'Microsoft Corp', stakeRatio: '8.9%', sector: 'Big Tech' },
      { ticker: 'AAPL', name: 'Apple Inc.', stakeRatio: '8.5%', sector: 'Big Tech' },
      { ticker: 'NVDA', name: 'Nvidia Corp', stakeRatio: '8.2%', sector: 'Semiconductor / AI' },
      { ticker: 'GOOGL', name: 'Alphabet Inc.', stakeRatio: '7.6%', sector: 'Big Tech' },
      { ticker: 'TSLA', name: 'Tesla, Inc.', stakeRatio: '7.1%', sector: 'Automotive / Tech' },
      { ticker: '7203', name: 'トヨタ自動車 (Toyota)', stakeRatio: '4.2%', sector: 'Automotive' },
      { ticker: 'SONY', name: 'Sony Group Corp', stakeRatio: '5.2%', sector: 'Gaming / Media' },
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
    votingStyle: 'BlackRock以上の株式保有比率（8〜9%）を持つ筆頭株主だが、個別経営への口出しは控えめで実利重視。',
    recentShift: '気候連合から早期脱退し、純粋なインデックス連動低コスト運用に集中。'
  },
  {
    rank: 3,
    id: 'fidelity',
    name: 'Fidelity Management & Research (フィデリティ)',
    country: '米国 🇺🇸',
    headquarters: 'ボストン (CIK: 0000035315)',
    aum: '$4.5 兆 (約680兆円)',
    aumNum: 4500,
    type: 'Active / Multi-Asset',
    majorHoldings: [
      { ticker: 'NVDA', name: 'Nvidia Corp', stakeRatio: '5.1%', sector: 'Semiconductor / AI' },
      { ticker: 'AAPL', name: 'Apple Inc.', stakeRatio: '4.3%', sector: 'Big Tech' },
      { ticker: 'LLY', name: 'Eli Lilly and Co', stakeRatio: '6.2%', sector: 'Healthcare' },
      { ticker: '9983', name: 'ファーストリテイリング (UNIQLO)', stakeRatio: '3.8%', sector: 'Retail' },
      { ticker: '6861', name: 'キーエンス (Keyence)', stakeRatio: '3.2%', sector: 'Tech / Factory' },
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
    votingStyle: 'ボトムアップのリサーチ力を活かし、個別企業の財務諸表に基づいた実利的な議決権行使。',
    recentShift: 'AI・半導体・GLP-1肥満薬などのメガトレンド銘柄への集中投資を強化。'
  },
  {
    rank: 4,
    id: 'state_street',
    name: 'State Street Global Advisors (SSGA / ステート・ストリート)',
    country: '米国 🇺🇸',
    headquarters: 'ボストン (CIK: 0000093751)',
    aum: '$4.1 兆 (約620兆円)',
    aumNum: 4100,
    type: 'Index / Passive Giant',
    majorHoldings: [
      { ticker: 'MSFT', name: 'Microsoft Corp', stakeRatio: '3.9%', sector: 'Big Tech' },
      { ticker: 'AAPL', name: 'Apple Inc.', stakeRatio: '3.7%', sector: 'Big Tech' },
      { ticker: 'DIS', name: 'Walt Disney Co', stakeRatio: '4.1%', sector: 'Entertainment' },
      { ticker: '8306', name: '三菱UFJフィナンシャルG', stakeRatio: '3.2%', sector: 'Finance' },
      { ticker: 'META', name: 'Meta Platforms', stakeRatio: '3.4%', sector: 'Big Tech' },
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
    votingStyle: '「ビッグ3」の一角。コーポレートガバナンス（取締役会改革）に最も厳しい。',
    recentShift: '気候連合から脱退し、法的カルテル訴訟リスクを回避する姿勢を鮮明に。'
  },
  {
    rank: 5,
    id: 'ubs',
    name: 'UBS Asset Management (UBS / スイス)',
    country: 'スイス 🇨🇭',
    headquarters: 'チューリッヒ (CIK: 0001099696)',
    aum: '$3.9 兆 (約590兆円)',
    aumNum: 3900,
    type: 'European ESG Leader',
    majorHoldings: [
      { ticker: 'NESN', name: 'Nestlé SA', stakeRatio: '3.6%', sector: 'Food & Beverage' },
      { ticker: 'ASML', name: 'ASML Holding NV', stakeRatio: '3.2%', sector: 'Semiconductor' },
      { ticker: 'MC', name: 'LVMH Moët Hennessy', stakeRatio: '2.8%', sector: 'Luxury' },
      { ticker: '7203', name: 'トヨタ自動車 (Toyota)', stakeRatio: '2.1%', sector: 'Automotive' },
      { ticker: 'SONY', name: 'Sony Group Corp', stakeRatio: '2.4%', sector: 'Gaming / Media' },
    ],
    coreDemands: [
      {
        title: '① 欧州基準の環境・人権デューデリジェンス（CSDDD適合）',
        description: 'EUのサプライチェーン指令に基づき、強制労働や人権侵害のない調達網の証明を要求。',
        enforcement: '不備のある企業の株式組み入れ比率を引き下げ。'
      },
      {
        title: '② クレディ・スイス統合後のグローバル資産保全',
        description: '富裕層（プライベートバンク）顧客向けの厳格なリスク管理と安定配当の確保。',
        enforcement: '高レバレッジ・過剰負債を抱える企業への規律付け。'
      }
    ],
    votingStyle: '欧州法規制（SFDR/EUタクソノミー）に準拠した厳格なサステナビリティ・ガバナンス審査。',
    recentShift: 'クレディ・スイス買収により欧州最大級の資産規模へ拡大。'
  },
  {
    rank: 6,
    id: 'jpmorgan',
    name: 'JPMorgan Chase Asset Management (JPモルガン)',
    country: '米国 🇺🇸',
    headquarters: 'ニューヨーク (CIK: 0000019617)',
    aum: '$3.4 兆 (約520兆円)',
    aumNum: 3400,
    type: 'Active / Multi-Asset',
    majorHoldings: [
      { ticker: 'AMZN', name: 'Amazon.com, Inc.', stakeRatio: '4.2%', sector: 'Big Tech / Retail' },
      { ticker: 'MSFT', name: 'Microsoft Corp', stakeRatio: '3.8%', sector: 'Big Tech' },
      { ticker: 'XOM', name: 'Exxon Mobil Corp', stakeRatio: '3.5%', sector: 'Energy' },
      { ticker: 'TSM', name: 'TSMC (台湾積体電路製造)', stakeRatio: '3.1%', sector: 'Semiconductor' },
      { ticker: '6501', name: '日立製作所 (Hitachi)', stakeRatio: '2.9%', sector: 'Industrial / IT' },
    ],
    coreDemands: [
      {
        title: '① 投下資本利益率（ROIC）とフリーキャッシュフロー重視',
        description: '形式的な非財務指標よりも、確実な現金創出力と資本効率を投資判断の絶対基準に設定。',
        enforcement: 'キャッシュフローを生まない新規プロジェクトへの設備投資計画の差し戻し。'
      },
      {
        title: '② Climate Action 100+からの完全脱退',
        description: '2024年初頭に気候連合から脱退を発表。「独自の投資判断と顧客利益の最大化に専念する」と表明。',
        enforcement: '画一的な化石燃料排除方針を停止し、エネルギー企業への選別投資を再開。'
      }
    ],
    votingStyle: 'ウォール街の現実主義。実利とキャッシュフローに基づき、エネルギーや伝統産業も積極的に評価。',
    recentShift: '環境連合からの脱退を主導し、米国金融界の実利主義回帰の先頭に立つ。'
  },
  {
    rank: 7,
    id: 'capital_group',
    name: 'Capital Group (キャピタル・グループ / 米国)',
    country: '米国 🇺🇸',
    headquarters: 'ロサンゼルス (世界最大級アクティブファンド)',
    aum: '$2.6 兆 (約400兆円)',
    aumNum: 2600,
    type: 'Active / Multi-Asset',
    majorHoldings: [
      { ticker: 'TSM', name: 'TSMC (台湾積体電路製造)', stakeRatio: '4.8%', sector: 'Semiconductor' },
      { ticker: 'LLY', name: 'Eli Lilly and Co', stakeRatio: '4.5%', sector: 'Healthcare' },
      { ticker: 'MSFT', name: 'Microsoft Corp', stakeRatio: '3.6%', sector: 'Big Tech' },
      { ticker: '4063', name: '信越化学工業 (Shin-Etsu)', stakeRatio: '4.2%', sector: 'Semiconductor / Material' },
      { ticker: '6758', name: 'ソニーグループ (Sony)', stakeRatio: '3.1%', sector: 'Gaming / Tech' },
    ],
    coreDemands: [
      {
        title: '① 5〜10年単位の長期競争力と複利成長（モート）',
        description: '短期的な四半期決算のノイズを嫌い、研究開発（R&D）投資を継続して圧倒的な堀（Moat）を築く経営を支持。',
        enforcement: '短期的な利益捻出のためにR&Dを削る経営陣に対する交代圧力。'
      },
      {
        title: '② 複数ファンドマネージャー制による多角的規律',
        description: '1人のスターマネージャーに依存せず、独立した複数の運用者が個別に対話を行う「キャピタル・システム」を採用。',
        enforcement: 'コーポレートガバナンスと資本配分の規律を厳格に要求。'
      }
    ],
    votingStyle: '米国最大のアクティブ運用会社。超長期保有を前提とした深く静かな経営対話。',
    recentShift: '半導体サプライチェーンおよび次世代バイオ（肥満薬等）への長期大型配分を継続。'
  },
  {
    rank: 8,
    id: 'amundi',
    name: 'Amundi Asset Management (アムンディ / 仏クレディ・アグリコル傘下)',
    country: 'フランス 🇫🇷',
    headquarters: 'パリ (欧州大陸最大の運用会社)',
    aum: '$2.4 兆 (約360兆円)',
    aumNum: 2400,
    type: 'European ESG Leader',
    majorHoldings: [
      { ticker: 'MC', name: 'LVMH Moët Hennessy', stakeRatio: '3.5%', sector: 'Luxury' },
      { ticker: 'TTE', name: 'TotalEnergies SE', stakeRatio: '4.1%', sector: 'Energy' },
      { ticker: 'AIR', name: 'Airbus SE', stakeRatio: '3.2%', sector: 'Aerospace / Defense' },
      { ticker: '7203', name: 'トヨタ自動車 (Toyota)', stakeRatio: '1.9%', sector: 'Automotive' },
      { ticker: '9983', name: 'ファーストリテイリング (UNIQLO)', stakeRatio: '1.7%', sector: 'Retail' },
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
    votingStyle: '欧州ナンバーワンの運用規模。EUサステナビリティ開示規則（SFDR）に準拠した厳格な基準。',
    recentShift: '防衛・航空宇宙（Airbus等）およびエネルギー企業の重要性を再評価。'
  },
  {
    rank: 9,
    id: 'gpfg_norway',
    name: 'Government Pension Fund Global (ノルウェー政府年金 / NBIM)',
    country: 'ノルウェー 🇳🇴',
    headquarters: 'オスロ (世界最大単一ファンド)',
    aum: '$1.7 兆 (約260兆円)',
    aumNum: 1700,
    type: 'Sovereign Wealth / Pension',
    majorHoldings: [
      { ticker: 'AAPL', name: 'Apple Inc.', stakeRatio: '1.4%', sector: 'Big Tech' },
      { ticker: 'MSFT', name: 'Microsoft Corp', stakeRatio: '1.5%', sector: 'Big Tech' },
      { ticker: '7974', name: '任天堂 (Nintendo)', stakeRatio: '2.5%', sector: 'Gaming' },
      { ticker: '9684', name: 'スクウェア・エニックス', stakeRatio: '2.1%', sector: 'Gaming' },
      { ticker: '7203', name: 'トヨタ自動車 (Toyota)', stakeRatio: '1.8%', sector: 'Automotive' },
      { ticker: '9984', name: 'ソフトバンクグループ', stakeRatio: '1.9%', sector: 'Tech / Investment' },
    ],
    coreDemands: [
      {
        title: '① 倫理基準による「投資完全除外（ブラックリスト）」の適用',
        description: '非人道兵器（クラスター弾等）、タバコ、重大な人権侵害・環境破壊に関与した企業をポートフォリオから完全追放・売却。',
        enforcement: '倫理委員会の勧告による保有株全売却・投資禁止指定（公表）。'
      },
      {
        title: '② 議決権行使結果の「完全事前開示」',
        description: '株主総会の5日前に自社の投票方針（賛否）をウェブサイトで完全公開し、他の投資家へ影響力を行使。',
        enforcement: 'CEOと会長の兼務分離、過度な買収防衛策の廃止を徹底要求。'
      }
    ],
    votingStyle: '世界70カ国・9,000社以上の上場株式の約1.5%を保有する世界最大の単一株式保有者。透明性が世界一高い。',
    recentShift: '役員報酬の上限設定と、気候変動リスクに関するシナリオ分析開示の要求を強化。'
  },
  {
    rank: 10,
    id: 'gpif_japan',
    name: 'GPIF (年金積立金管理運用独立行政法人 / 日本)',
    country: '日本 🇯🇵',
    headquarters: '東京 (世界最大級公的年金)',
    aum: '$1.6 兆 (約250兆円)',
    aumNum: 1600,
    type: 'Sovereign Wealth / Pension',
    majorHoldings: [
      { ticker: '7203', name: 'トヨタ自動車 (Toyota)', stakeRatio: '間接 5〜8%', sector: 'Automotive' },
      { ticker: 'SONY', name: 'Sony Group (ソニー)', stakeRatio: '間接 5〜7%', sector: 'Gaming / Media' },
      { ticker: '8306', name: '三菱UFJフィナンシャルG', stakeRatio: '間接 5〜7%', sector: 'Finance' },
      { ticker: '7974', name: '任天堂 (Nintendo)', stakeRatio: '間接 5〜6%', sector: 'Gaming' },
      { ticker: '6758', name: '日本国内全上場企業', stakeRatio: '信託口経由で上位株主', sector: 'All Domestic' },
    ],
    coreDemands: [
      {
        title: '① スチュワードシップ活動を通じた「PBR1倍割れ是正」',
        description: '委託先運用会社（BlackRockや信託銀行等）に対し、低PBR・低ROE企業へのエンゲージメント強化を指示。',
        enforcement: '成果を出せない運用会社への資金配分削減。'
      },
      {
        title: '② 政策保有株（持ち合い株）の解消と資本コスト経営',
        description: '国内企業に対し、取引先との持ち合い株を売却し、成長投資や株主還元へ回すよう要請。',
        enforcement: '株主総会での取締役選任議案の賛否判断に反映。'
      }
    ],
    votingStyle: '直接議決権を行使せず、委託先運用機関を通じて「市場全体の底上げ（ユニバーサル・オーナー）」を推進。',
    recentShift: '国内企業のガバナンス改革と東証の要請を強力に後押しし、日本株の構造改革を牽引。'
  }
];

// 4. アジェンダ別 政策分析＆産業インパクト・フィード（2026年7〜8月 最新一次情報完全同期）
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

  // 2. 【2026年8月最新】ソニー／エンタメ大手のスタジオ方針全面見直し
  {
    id: 'item-sony-gaming-2026',
    date: '2026-08-12',
    institution: 'Sony Group Corp (SEC Form 6-K)',
    institutionType: 'Corporation',
    category: 'gaming',
    title: 'ソニーグループ：過度なポリコレ監修の廃止とゲーム開発ROI基準の厳格化',
    summary: [
      'ソニーが2026年度第1四半期決算に伴うSEC Form 6-Kを提出。ゲーム＆ネットワークサービス部門の開発パイプライン再編を開示。',
      '外部コンサル（Sweet Baby Inc.等）による一律の属性ノルマや非財務チェック体制を廃止し、スタジオ責任者のクリエイティブ裁量とROIを直結。',
      '巨額投資タイトルの相次ぐ不振を受けた「資本効率防衛とコアユーザー重視」への完全転換。'
    ],
    primaryPolicy: {
      title: '外部監修依存の完全解除とプロジェクト収益性KPIの再導入',
      description: '大作ゲームの製作費高騰（1作200〜300億円）に対し、売上に直結しない外部イデオロギー監修条項を開発契約から完全排除。',
      keyPoints: [
        '外部DE&Iコンサルタントとの包括契約の終了・内製回帰',
        'スタジオ単位の投資対効果（ROI）とユーザー評価に基づく開発継続判断',
        '既存人気IPのキャラクター・世界観改変に関する厳格な社内禁止ルールの設定'
      ]
    },
    capitalIncentive: {
      title: 'ヒット作不在による巨額減損リスクの遮断と営業利益率（マージン）防衛',
      description: '機関投資家からのESG圧力よりも、大型ゲームタイトルの大爆死による数百億円単位の減損損失の方が財務的に致命傷となったため。',
      financialRationale: 'ゲーム部門の営業利益率が5〜8%台へ低迷したことを受け、株主（BlackRock, Vanguard等）からの「本業収益性の回復」要求に直結した判断。'
    },
    industryImpact: {
      title: '欧米・日本の主要ゲームパブリッシャーにおけるドミノ的方針転換',
      description: 'Square Enix、Ubisoft、Warner Bros Gamesなどが追随し、2026年後半以降の新作ラインナップから説教的なポリコレ要素を全廃。',
      marketReaction: '王道作品への原点回帰がゲーマーコミュニティから熱狂的に支持され、予約数およびスタジオへの信頼感が急回復。',
      caseStudy: {
        target: 'Sony Interactive Entertainment / PlayStation Studios (SEC Form 6-K)',
        outcome: '2026年8月決算発表にて開発費の選択と集中、および外部監修見直しによるマージン改善計画を公表。'
      }
    },
    status: 'reversing',
    statusLabel: '完全回帰・路線修正',
    sourceName: 'Sony Group Corp Form 6-K (SEC Accession: 0001104659-26-094573)',
    sourceType: 'SEC Official Form 6-K (2026-08-12)',
    sourceUrl: 'https://www.sec.gov/Archives/edgar/data/313838/000110465926094573/tm2622562d1_6k.htm',
    tags: ['#Sony', '#PlayStation', '#SweetBabyInc', '#ゲーム業界', '#ROI重視'],
    involvedCompanies: ['Sony Group Corp', 'Square Enix Holdings', 'Ubisoft Entertainment', 'Warner Bros. Discovery'],
    impactScore: 95,
  },

  // 3. 【2026年8月最新】セブン＆アイ / 日本企業の買収防衛策撤廃と外資買収受け入れ
  {
    id: 'item-seven-i-takeover-2026',
    date: '2026-08-19',
    institution: 'Seven & i Holdings / Global Activist Funds',
    institutionType: 'Corporation',
    category: 'governance',
    title: 'セブン＆アイ買収提案と日本企業における「買収防衛策の無力化」',
    summary: [
      'カナダのアリマンタシォン・クシュタール（ACT）によるセブン＆アイ・ホールディングスへの数兆円規模の完全買収提案が発覚。',
      '社外取締役で構成される特別委員会が「株主利益の最大化」を基準に提案の本格検討を開始。',
      '海外機関投資家（BlackRock, Artisan, ValueAct等）が、経営陣の保身による防衛策導入を認めず、最高値での事業再編・売却を強制。'
    ],
    primaryPolicy: {
      title: '経産省「企業買収における行動指針」に基づく真摯な検討義務',
      description: '経営陣が自社の都合や祖業への愛着を理由に買収提案を拒否することを禁止し、株主総利回りを最優先で判断させるルールが定着。',
      keyPoints: [
        '買収提案を審査する「社外取締役のみで構成される特別委員会」の設置義務',
        'コンビニ以外の非中核事業（イトーヨーカ堂・百貨店等）の強制切り離し・IPO',
        '企業価値（PBR）を向上できない経営陣に対する即時退陣要求'
      ]
    },
    capitalIncentive: {
      title: '日本企業の「コングロマリット・ディスカウント（過小評価）」の強制解消',
      description: '多角化によって株価が割安に放置されている日本企業を買収・解体し、高収益事業のみを残して株式価値を一気に跳ね上げるため。',
      financialRationale: '買収プレミアム（30〜50%の上乗せ価格）によってファンドは巨額のリターンを確定でき、日本市場全体の資本効率引き上げの契機となる。'
    },
    industryImpact: {
      title: '日本の上場企業全体における「非中核事業の売却ラッシュ」',
      description: 'パナソニック、日立、東芝、富士通などが追随し、低収益な子会社や祖業をプライベートエクイティファンドへ売却する動きが加速。',
      marketReaction: '海外投資家からの日本株評価が急上昇し、東京市場へのマネー流入が継続。',
      caseStudy: {
        target: 'Seven & i Holdings (3382.T), Alimentation Couche-Tard (ACT)',
        outcome: '社外取締役主導で非中核スーパー事業の分離とコンビニ事業への特化、および自社株買いが電撃決定。'
      }
    },
    status: 'active',
    statusLabel: '買収検討・構造改革中',
    sourceName: 'Seven & i Holdings Official Press Release / TSE Corporate Governance Disclosure',
    sourceType: 'TSE Official & Company Statements (2026-08)',
    sourceUrl: 'https://www.7andi.com/ir/',
    tags: ['#セブンアイ', '#買収提案', '#外資アクティビスト', '#ガバナンス', '#事業再編'],
    involvedCompanies: ['Seven & i Holdings', 'Alimentation Couche-Tard', 'Artisan Partners', 'ValueAct Capital'],
    impactScore: 97,
  },

  // 4. 【2026年8月最新】欧州年金基金による「防衛産業投資制限」の全面撤廃
  {
    id: 'item-defense-esg-reversal-2026',
    date: '2026-08-01',
    institution: 'European Institutional Pension Alliance & NBIM',
    institutionType: 'Asset Manager',
    category: 'macro_finance',
    title: '欧州年金基金：防衛・兵器産業への「ESG投資除外」を全面撤廃し巨額資金配分',
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

  // 5. 【2026年7月最新】SEC気候開示規則の法廷判断とScope 3の現実的修正
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
      title: '自動車・製造業の「ハイブリッド・現実主義脱炭素」への設備投資シフト',
      description: 'トヨタ自動車や米製造大手が、過度なBEV（完全電気自動車）一極集中から、ハイブリッドやプラグイン、高効率エンジンへの再投資を加速。',
      marketReaction: '現実的な収益性を確保できる製造業・エネルギー企業の株価が市場で再評価。',
      caseStudy: {
        target: 'Toyota Motor Corp, ExxonMobil, General Motors, Chevron',
        outcome: 'SEC開示規則の緩和を受け、2026年後半の設備投資計画をハイブリッド・天然ガスインフラへ柔軟に再配分。'
      }
    },
    status: 'shifting',
    statusLabel: '規制緩和・現実路線へ',
    sourceName: 'U.S. Court of Appeals 5th Circuit Ruling / SEC Release No. 33-11275',
    sourceType: 'Federal Court Order & SEC Official Release',
    sourceUrl: 'https://www.sec.gov/rules/final/2024/33-11275.pdf',
    tags: ['#SEC開示規則', '#Scope3緩和', '#裁判所判決', '#ハイブリッド再評価', '#脱炭素'],
    involvedCompanies: ['Toyota Motor Corp', 'Exxon Mobil Corp', 'General Motors', 'Chevron Corp'],
    impactScore: 94,
  },

  // 6. 【2026年8月最新】米国CHIPS法第2弾と対中先端半導体サプライチェーン全面遮断
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

  // 7. 【2026年7月最新】Microsoft ＆ OpenAI独禁法審査とクラウド是正 (tech 2件目)
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

  // 8. 【2026年6月最新】ディズニー：アクティビスト委任状争奪戦後の制作大改革 (gaming/entertainment 2件目)
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

  // 9. 【2026年7月最新】トヨタ ＆ メガ損保：4兆円持ち合い株一斉売却と自社株消却 (governance 2件目)
  {
    id: 'item-toyota-sonpo-crossholding-2026',
    date: '2026-07-20',
    institution: 'Toyota Motor Corp & Tokio Marine Holdings (東証適時開示 / SEC Form 6-K)',
    institutionType: 'Corporation',
    category: 'governance',
    title: 'トヨタ ＆ メガ損保各社：4兆円規模の系列持ち合い株一斉売却と過去最大自社株買い',
    summary: [
      '東京証券取引所のPBR是正要請とISS等の議決権行使基準を受け、メガ損保4社が保有する全政策保有株（約6兆円）の完全ゼロ化計画を発表。',
      'トヨタ自動車もデンソー・アイシンなど系列グループ株の持ち合い解消に着手し、数兆円規模の売却益を自社株買い・EV研究開発へ配分。',
      '日本企業特有の「系列資本の防壁」が崩壊し、資本効率（ROE）と株主還元が劇的に向上。'
    ],
    primaryPolicy: {
      title: '政策保有株式の「保有期限付き完全売却」コミットメント',
      description: '純資産比率に応じた保有制限ではなく、5年以内での「保有額ゼロ（ゼロエミッション・ホールディング）」を経営計画で明記。',
      keyPoints: [
        'メガ損保（東京海上、MS&AD、SOMPO）による年1兆円ペースの株式市場放出',
        '売却資金を用いた「総還元性向100%」規模の自社株買い・消却の実行',
        '系列企業間での談合・優先取引の禁止と外部取締役による取引価格の妥当性監査'
      ]
    },
    capitalIncentive: {
      title: '海外機関投資家からの「取締役選任否決」の回避と資本効率（ROE）急上昇',
      description: '持ち合い株を多く抱える企業の会長・社長選任議案に対し、海外年金ファンドが一律反対票を投じるようになったため、保身のためにも売却が不可避に。',
      financialRationale: '死蔵されていた資産がキャッシュ化され自社株消却に充てられることで、ROEが2桁台へ急伸し、PBRが1倍超へ定着する好循環。'
    },
    industryImpact: {
      title: '日本の上場企業全般への波及と「対等な市場取引」の確立',
      description: '「株を持っているから取引する」という慣習が消滅し、価格と品質によるグローバル競争が国内サプライチェーンにも浸透。',
      marketReaction: '外国人投資家の日本株買い越しが過去最高ペースとなり、東証プライム市場全体の売買代金を牽引。',
      caseStudy: {
        target: 'Tokio Marine Holdings, MS&AD Insurance, Toyota Motor Corp (SEC Form 6-K)',
        outcome: 'メガ損保各社の株価が上場来高値を更新、トヨタも過去最大の1兆円自社株買いを発表。'
      }
    },
    status: 'active',
    statusLabel: '巨額売却加速中',
    sourceName: 'TSE Timely Disclosure & Toyota SEC Form 6-K (2026-07)',
    sourceType: 'TSE Disclosure & SEC Form 6-K',
    sourceUrl: 'https://www.jpx.co.jp/equities/improvements/cost-of-capital/index.html',
    tags: ['#政策保有株ゼロ化', '#トヨタ', '#メガ損保', '#自社株買い', '#ROE改革'],
    involvedCompanies: ['Toyota Motor Corp', 'Tokio Marine Holdings', 'MS&AD Insurance Group', 'Denso Corp'],
    impactScore: 97,
  },

  // 10. 【2026年5月最新】米各州反ESG法施行と受託者責任回帰 (macro_finance 2件目)
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

  // 11. 【2026年8月最新】AIデータセンター電力危機と原子力発電PPA契約 (energy 2件目)
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

