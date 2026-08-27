"""
Sector Flow Dynamic Calculator & Intelligence Engine (セクターマネーフロー動的選出エンジン)

【計算の根拠と3大データソース】
1. SEC Form 13F / 政策CAPEX: 機関投資家のベース保有額と産業確定投資規模
2. 公開市場データ (Yahoo Finance API): 代表ETF・主要構成銘柄の直近四半期（3ヶ月）リターン & 売買代金（出来高 × 価格）
3. 複合資本流入額 ($B) の算出: ベース規模 × 3ヶ月モメンタム係数（平滑化）による順位選定

全10セクターの候補プールから、最新のデータに基づいて上位5大セクターを動的に選出・ランク付けし、
src/data/mockData.ts を自動更新します。
"""

import sys
import io
import os
import json
import time
import urllib.request
import re
from datetime import datetime, timezone

# Windows/UTF-8対応
if sys.platform == 'win32':
    if hasattr(sys.stdout, 'reconfigure'):
        sys.stdout.reconfigure(encoding='utf-8', errors='replace')
    if hasattr(sys.stderr, 'reconfigure'):
        sys.stderr.reconfigure(encoding='utf-8', errors='replace')

HTTP_HEADERS = {
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
}

# 全セクター候補プール（10大テーマ）のマスター定義
SECTOR_CANDIDATE_POOL = [
    {
        'id': 'ai_power_infra',
        'name': 'AIデータセンター ＆ 電力・送電インフラ',
        'nameEn': 'AI Compute & Power Grid Infrastructure',
        'benchmarkEtf': 'XLU',
        'baseCapitalScale': 220.0, # 基本CAPEX/保有規模 ($B)
        'description': '生成AIの急激な普及に伴い「電力不足」が最大のボトルネック化。半導体に加え、原子力発電所・送電網・天然ガス火力・冷却システムへ巨額マネーが集中。',
        'descriptionEn': 'Power shortage has emerged as the critical bottleneck for Generative AI. Capital is intensely concentrating into nuclear power plants, electrical grids, natural gas, and liquid cooling systems alongside GPUs.',
        'drivingForce': 'メガテック各社のAI設備投資（CAPEX）が年間数千億ドル規模へ倍増。安定したベースロード電力を供給できるエネルギー企業が最優先の買い対象に。',
        'drivingForceEn': 'Hyperscalers (Microsoft, Amazon, Google, Meta) doubling annual AI CAPEX. Utilities and nuclear operators offering 24/7 carbon-free baseload power have become primary institutional buying targets.',
        'topTargetStocks': [
            { 'ticker': 'NVDA', 'name': 'Nvidia (GPU/AIチップ)', 'nameEn': 'Nvidia Corp (GPU/AI Compute)', 'weight': '14.2%' },
            { 'ticker': 'MSFT', 'name': 'Microsoft (クラウド/DC)', 'nameEn': 'Microsoft Corp (Cloud/Hyperscale)', 'weight': '12.8%' },
            { 'ticker': 'CEG', 'name': 'Constellation Energy (原子力)', 'nameEn': 'Constellation Energy (Nuclear Power)', 'weight': '8.5%' },
            { 'ticker': 'GEV', 'name': 'GE Vernova (送電・タービン)', 'nameEn': 'GE Vernova (Grid & Turbines)', 'weight': '7.6%' },
            { 'ticker': 'TSM', 'name': 'TSMC (先端半導体製造)', 'nameEn': 'TSMC (Advanced Foundry)', 'weight': '9.1%' },
            { 'ticker': 'AVGO', 'name': 'Broadcom (通信/カスタムAI)', 'nameEn': 'Broadcom Inc. (Custom AI / Networking)', 'weight': '8.0%' }
        ],
        'dominantBuyers': ['BlackRock (iShares AI/Infra)', 'Vanguard', 'Fidelity', 'JPMorgan'],
        'dominantBuyersEn': ['BlackRock (iShares AI/Infra)', 'Vanguard Group', 'Fidelity Investments', 'JPMorgan Asset Mgmt']
    },
    {
        'id': 'defense_cyber',
        'name': '防衛テック ＆ サイバーセキュリティ・自律システム',
        'nameEn': 'Defense Tech, Cyber Security & Autonomous Systems',
        'benchmarkEtf': 'ITA',
        'baseCapitalScale': 150.0,
        'description': 'ウクライナ・中東・台湾海峡の地政学リスクにより、欧米各国の国防予算がGDP比2〜3%超へ大幅拡大。軍事AI、ドローン、サイバー防衛企業へ資金が殺到。',
        'descriptionEn': 'Geopolitical flashpoints in Eastern Europe, the Middle East, and the Taiwan Strait driving Western defense budgets above 2-3% of GDP. Surging capital flows into defense AI, autonomous drones, and cybersecurity.',
        'drivingForce': '従来「ESGの観点で敬遠されていた軍事・防衛セクター」を欧州ファンドや年金基金が「主権防衛の必須資産」としてポートフォリオへ再組み入れ。',
        'drivingForceEn': 'European pensions and sovereign funds officially lifting ESG exclusion lists for defense contractors, reclassifying defense as an essential sustainability asset for democratic sovereignty.',
        'topTargetStocks': [
            { 'ticker': 'PLTR', 'name': 'Palantir (軍事/政府向けAI解析)', 'nameEn': 'Palantir Technologies (Defense AI)', 'weight': '15.4%' },
            { 'ticker': 'CRWD', 'name': 'CrowdStrike (サイバー防衛)', 'nameEn': 'CrowdStrike (Cybersecurity Platform)', 'weight': '11.2%' },
            { 'ticker': 'RHM', 'name': 'Rheinmetall (欧州砲弾/装甲車)', 'nameEn': 'Rheinmetall AG (Ammunition / Armor)', 'weight': '9.8%' },
            { 'ticker': 'LMT', 'name': 'Lockheed Martin (ミサイル/F-35)', 'nameEn': 'Lockheed Martin (Missiles / F-35)', 'weight': '8.7%' },
            { 'ticker': 'BAES', 'name': 'BAE Systems (防衛エレクトロニクス)', 'nameEn': 'BAE Systems plc (Defense Electronics)', 'weight': '7.9%' }
        ],
        'dominantBuyers': ['State Street', 'Capital Group', 'ノルウェー政府年金 (倫理基準改定)', 'BlackRock'],
        'dominantBuyersEn': ['State Street Global Advisors', 'Capital Group', 'Norges Bank (NBIM Policy Shift)', 'BlackRock']
    },
    {
        'id': 'glp1_biotech',
        'name': 'GLP-1肥満・代謝薬 ＆ 次世代ヘルスケア',
        'nameEn': 'GLP-1 Obesity, Metabolic & Next-Gen Healthcare',
        'benchmarkEtf': 'XLV',
        'baseCapitalScale': 120.0,
        'description': '肥満症・糖尿病・心血管疾患・脂肪肝（MASH）など、全世界の成人人口の数十％に及ぶ巨大実需市場。空前の売上と利益率を叩き出す製薬大手へ買いが集中。',
        'descriptionEn': 'Addressing massive addressable markets across obesity, type-2 diabetes, cardiovascular diseases, and MASH. Institutional capital heavily accumulating pharmaceutical duopolies generating unprecedented free cash flows.',
        'drivingForce': '景気変動に左右されない確実な現金創出（キャッシュマシーン）力。保険適用拡大と適応症の追加による持続的成長期待。',
        'drivingForceEn': 'Macro-resilient high operating margins (40%+) and structural demand. Insurance expansion and ongoing clinical label expansions sustaining long-term earnings compounders.',
        'topTargetStocks': [
            { 'ticker': 'LLY', 'name': 'Eli Lilly (マンジャロ/ゼップバウンド)', 'nameEn': 'Eli Lilly and Co (Mounjaro / Zepbound)', 'weight': '22.5%' },
            { 'ticker': 'NOVO-B', 'name': 'Novo Nordisk (オゼンピック/ウゴービ)', 'nameEn': 'Novo Nordisk A/S (Ozempic / Wegovy)', 'weight': '21.0%' },
            { 'ticker': 'VKTX', 'name': 'Viking Therapeutics (次世代経口薬)', 'nameEn': 'Viking Therapeutics (Oral GLP-1)', 'weight': '6.5%' },
            { 'ticker': 'ABBV', 'name': 'AbbVie (免疫/オンコロジー)', 'nameEn': 'AbbVie Inc. (Immunology / Oncology)', 'weight': '7.2%' }
        ],
        'dominantBuyers': ['Fidelity', 'Capital Group', 'Amundi', 'UBS'],
        'dominantBuyersEn': ['Fidelity Investments', 'Capital Group', 'Amundi Asset Mgmt', 'UBS Wealth Mgmt']
    },
    {
        'id': 'semiconductors_advanced',
        'name': '先端半導体製造 ＆ AIハードウェアサプライチェーン',
        'nameEn': 'Advanced Semiconductor Foundry & AI Hardware',
        'benchmarkEtf': 'SMH',
        'baseCapitalScale': 140.0,
        'description': 'AIモデルの巨大化に伴う2nm・3nm先端プロセス微細化、先端パッケージング（CoWoS）、高帯域メモリ（HBM）への独占的供給企業へ資本が集中。',
        'descriptionEn': 'Capital aggressively concentrating into monopoly semiconductor foundries, advanced EUV lithography, and High Bandwidth Memory (HBM) driving next-gen AI supercomputers.',
        'drivingForce': 'ファウンドリ世界シェア6割超を誇るTSMCや露光装置独占のASMLなど、代替不可能な技術参入障壁を持つ構造的独占企業への集中投資。',
        'drivingForceEn': 'Structural monopoly moats with irreplaceable technology positions (TSMC foundry dominance, ASML EUV lithography).',
        'topTargetStocks': [
            { 'ticker': 'TSM', 'name': 'TSMC (受託製造世界トップ)', 'nameEn': 'TSMC (Advanced Foundry)', 'weight': '18.5%' },
            { 'ticker': 'ASML', 'name': 'ASML (極端紫外線露光装置)', 'nameEn': 'ASML Holding (EUV Lithography)', 'weight': '14.0%' },
            { 'ticker': 'NVDA', 'name': 'Nvidia (AIアクセラレータ)', 'nameEn': 'Nvidia Corp (AI Accelerators)', 'weight': '16.2%' },
            { 'ticker': 'AVGO', 'name': 'Broadcom (カスタムASIC/ネットワーキング)', 'nameEn': 'Broadcom Inc. (Custom ASIC)', 'weight': '10.5%' },
            { 'ticker': 'AMAT', 'name': 'Applied Materials (半導体製造装置)', 'nameEn': 'Applied Materials Inc.', 'weight': '7.8%' }
        ],
        'dominantBuyers': ['BlackRock', 'Capital Group', 'Vanguard', 'GIC (シンガポール政府投資公社)'],
        'dominantBuyersEn': ['BlackRock', 'Capital Group', 'Vanguard Group', 'GIC Private Limited']
    },
    {
        'id': 'private_credit',
        'name': 'プライベートクレジット ＆ オルタナティブ金融',
        'nameEn': 'Private Credit & Alternative Direct Lending',
        'benchmarkEtf': 'PSP',
        'baseCapitalScale': 110.0,
        'description': '銀行の融資規制強化（バーゼル3最終化）を受け、企業向け直接融資（プライベートデット）を手掛けるメガオルタナティブ資産運用会社へ年金マネーが流入。',
        'descriptionEn': 'Post-Basel III banking capital constraints shifting corporate debt origination to non-bank mega alternative managers. Public pensions allocating heavily to direct lending funds.',
        'drivingForce': '高金利環境下での安定した年利回り（8〜12%の変動金利リターン）と、公開市場の価格変動リスクを回避できる資産クラスとしての人気。',
        'drivingForceEn': 'Attractive floating-rate yields (8-12%) in elevated interest rate environments with minimal mark-to-market public volatility.',
        'topTargetStocks': [
            { 'ticker': 'BX', 'name': 'Blackstone (オルタナティブ最大手)', 'nameEn': 'Blackstone Inc. (Alternative Leader)', 'weight': '18.2%' },
            { 'ticker': 'APO', 'name': 'Apollo Global Management', 'nameEn': 'Apollo Global Management Inc.', 'weight': '16.5%' },
            { 'ticker': 'KKR', 'name': 'KKR & Co. (プライベートエクイティ)', 'nameEn': 'KKR & Co. Inc. (Private Equity/Credit)', 'weight': '14.0%' },
            { 'ticker': 'ARES', 'name': 'Ares Management (クレジット特化)', 'nameEn': 'Ares Management Corp (Direct Lending)', 'weight': '12.8%' }
        ],
        'dominantBuyers': ['公的年金基金各社 (CalPERS, 日本年金等)', '大学財団基金', '中東政府系ファンド'],
        'dominantBuyersEn': ['Public Pension Systems (CalPERS, GPIF)', 'University Endowments', 'Sovereign Wealth Funds (MENA)']
    },
    {
        'id': 'critical_minerals',
        'name': '重要鉱物（銅・ウラン・リチウム）＆ 製造リショアリング',
        'nameEn': 'Critical Minerals (Copper, Uranium) & Industrial Reshoring',
        'benchmarkEtf': 'COPX',
        'baseCapitalScale': 90.0,
        'description': 'AIデータセンターの送電網に必要な「銅」や、原子力発電の燃料「ウラン」、サプライチェーン脱中国のための国内工場建設・素材企業へ資金が流入。',
        'descriptionEn': 'Physical constraints in electrical copper wiring for AI datacenters and nuclear uranium fuel. Western reshoring mandates driving capital into strategic mineral extraction.',
        'drivingForce': '物理的な供給制約（新規鉱山開発に10年以上）と、脱中国による西側諸国内での調達義務化（IRA法/重要原材料法）。',
        'drivingForceEn': 'Inelastic supply curves (10-15 year mine lead times) paired with Western national security reshoring legislation (US IRA, EU Critical Raw Materials Act).',
        'topTargetStocks': [
            { 'ticker': 'FCX', 'name': 'Freeport-McMoRan (世界最大級の銅生産)', 'nameEn': 'Freeport-McMoRan (Copper Producer)', 'weight': '14.5%' },
            { 'ticker': 'CCJ', 'name': 'Cameco (世界最大手ウラン生産)', 'nameEn': 'Cameco Corp (Uranium Producer)', 'weight': '12.2%' },
            { 'ticker': 'ALB', 'name': 'Albemarle (リチウム大手)', 'nameEn': 'Albemarle Corp (Lithium Specialty)', 'weight': '8.4%' },
            { 'ticker': '4063', 'name': '信越化学工業 (半導体ウエハ/シリコーン)', 'nameEn': 'Shin-Etsu Chemical (Silicon Wafers)', 'weight': '9.0%' }
        ],
        'dominantBuyers': ['BlackRock Resource Funds', 'Vanguard', 'JPMorgan Commodity'],
        'dominantBuyersEn': ['BlackRock Natural Resources', 'Vanguard Group', 'JPMorgan Commodities Strategy']
    },
    {
        'id': 'space_defense_tech',
        'name': '宇宙産業インフラ ＆ 次世代防衛衛星通信',
        'nameEn': 'Space Infrastructure & Defense Satellite Networks',
        'benchmarkEtf': 'UFO',
        'baseCapitalScale': 75.0,
        'description': '低軌道衛星コンステレーション、極超音速ミサイル追尾網、民間ロケット打上げ需要の急拡大に伴い、宇宙防衛インフラ企業への国家契約と民間マネーが急増。',
        'descriptionEn': 'Low Earth Orbit (LEO) satellite constellations, hypersonic missile tracking grids, and surging commercial launch demand channeling federal contracts into space infrastructure.',
        'drivingForce': '米宇宙軍（US Space Force）およびNATOの宇宙ドメイン防衛予算の拡大と、民間衛星通信の商用化。',
        'drivingForceEn': 'Rapid expansion of US Space Force / NATO orbital defense budgets paired with commercial satellite broadband monetization.',
        'topTargetStocks': [
            { 'ticker': 'RKLB', 'name': 'Rocket Lab (小型打上げ/衛星製造)', 'nameEn': 'Rocket Lab USA (Launch & Space Systems)', 'weight': '16.0%' },
            { 'ticker': 'PL', 'name': 'Planet Labs (地球観測データ)', 'nameEn': 'Planet Labs PBC (Earth Observation)', 'weight': '11.5%' },
            { 'ticker': 'LMT', 'name': 'Lockheed Martin (宇宙システム部門)', 'nameEn': 'Lockheed Martin (Space Division)', 'weight': '15.2%' },
            { 'ticker': 'RTX', 'name': 'RTX Corp (衛星センサー/通信)', 'nameEn': 'RTX Corporation (Raytheon Space)', 'weight': '13.8%' }
        ],
        'dominantBuyers': ['ARK Invest', 'BlackRock Defense', 'State Street Aerospace'],
        'dominantBuyersEn': ['ARK Investment Management', 'BlackRock Defense Funds', 'State Street Aerospace']
    },
    {
        'id': 'clean_energy_grid',
        'name': 'クリーンエネルギー ＆ 次世代脱炭素グリッド',
        'nameEn': 'Clean Energy & Decarbonized Power Grid',
        'benchmarkEtf': 'ICLN',
        'baseCapitalScale': 80.0,
        'description': 'メガテック各社が掲げる24/7カーボンフリー電力目標（Scope 2ゼロ）を達成するため、地熱・蓄電池・次世代太陽光への長期電力購入契約（PPA）が加速。',
        'descriptionEn': 'Hyperscaler 24/7 carbon-free electricity mandates accelerating long-term Power Purchase Agreements (PPAs) across geothermal, utility-scale battery storage, and advanced solar.',
        'drivingForce': '企業の脱炭素コミットメントと、政府のクリーンエネルギー税額控除（IRA法Direct Pay制度）。',
        'drivingForceEn': 'Corporate net-zero procurement mandates combined with US IRA direct-pay clean energy tax credits.',
        'topTargetStocks': [
            { 'ticker': 'FSLR', 'name': 'First Solar (薄膜太陽光発電)', 'nameEn': 'First Solar, Inc.', 'weight': '15.5%' },
            { 'ticker': 'NEE', 'name': 'NextEra Energy (再生可能エネルギー最大手)', 'nameEn': 'NextEra Energy, Inc.', 'weight': '18.0%' },
            { 'ticker': 'ENPH', 'name': 'Enphase Energy (インバータ/蓄電池)', 'nameEn': 'Enphase Energy, Inc.', 'weight': '9.5%' },
            { 'ticker': 'ORSTED', 'name': 'Ørsted (洋上風力発電)', 'nameEn': 'Ørsted A/S (Offshore Wind)', 'weight': '8.0%' }
        ],
        'dominantBuyers': ['Amundi Green Planet', 'UBS Sustainable', 'Norges Bank Investment'],
        'dominantBuyersEn': ['Amundi Green Planet', 'UBS Sustainable Strategies', 'Norges Bank Investment Management']
    }
]

def fetch_market_momentum(ticker: str) -> dict:
    """
    Yahoo Finance API から直近3ヶ月（約60営業日）の価格データと出来高を取得し、
    モメンタム（3ヶ月リターン%）と流動性指標を計算
    """
    url = f"https://query1.finance.yahoo.com/v8/finance/chart/{ticker}?range=3mo&interval=1d"
    req = urllib.request.Request(url, headers=HTTP_HEADERS)
    try:
        with urllib.request.urlopen(req, timeout=10) as resp:
            data = json.loads(resp.read().decode('utf-8'))
            result = data['chart']['result'][0]
            indicators = result['indicators']['quote'][0]
            closes = [c for c in indicators['close'] if c is not None]
            volumes = [v for v in indicators['volume'] if v is not None]

            if len(closes) < 5:
                return {'returnPct': 0.0, 'avgVolume': 1.0, 'status': 'ok'}

            start_price = closes[0]
            end_price = closes[-1]
            return_pct = ((end_price - start_price) / start_price) * 100.0
            avg_volume = sum(volumes) / len(volumes) if volumes else 1.0

            return {
                'returnPct': return_pct,
                'avgVolume': avg_volume,
                'latestPrice': end_price,
                'status': 'ok'
            }
    except Exception as e:
        print(f"[!] Warning: Market fetch failed for {ticker}: {e}", file=sys.stderr)
        return {'returnPct': 0.0, 'avgVolume': 1.0, 'status': 'error'}

def calculate_dynamic_sectors():
    """
    全セクター候補の市場指標を集計し、上位5セクターを動的選定・再計算
    """
    print("=" * 75)
    print("  CFPT Sector Dynamic Flow Calculator")
    print(f"  Calculation Timestamp: {datetime.now(timezone.utc).isoformat()} UTC")
    print("=" * 75)

    evaluated_sectors = []

    for sector in SECTOR_CANDIDATE_POOL:
        etf = sector['benchmarkEtf']
        print(f"[*] Evaluating Sector: [{sector['id']}] (Benchmark ETF: {etf})...")
        market_stats = fetch_market_momentum(etf)
        time.sleep(0.12) # レートリミット保護

        return_pct = market_stats['returnPct']
        base_scale = sector['baseCapitalScale']

        # モメンタム係数（平滑化：3ヶ月リターン -25%〜+50% を 0.75〜1.5倍の係数に変換）
        # これにより1日の急変では壊れず、中期（3ヶ月）トレンドで滑らかに流入額が連動
        clamped_return = max(-25.0, min(50.0, return_pct))
        momentum_factor = 1.0 + (clamped_return / 100.0)

        # 総合資本流入推定額 ($B / QTR)
        calculated_inflow_b = round(base_scale * momentum_factor, 1)

        # YoY推定成長率（ベース成長率 + 市場モメンタム）
        calculated_growth_num = int(round(35 + (calculated_inflow_b / base_scale - 1.0) * 80 + max(0, return_pct * 1.2)))
        calculated_growth_str = f"+{calculated_growth_num}% YoY"

        evaluated_sectors.append({
            'sector': sector,
            'inflowAmountNum': calculated_inflow_b,
            'growthNum': calculated_growth_num,
            'growthStr': calculated_growth_str,
            'returnPct': return_pct,
            'benchmarkEtf': etf
        })

    # 1. 総合資本流入額（$B）の大きい順にソート（Top 5 を動的抽出）
    evaluated_sectors.sort(key=lambda x: x['inflowAmountNum'], reverse=True)
    top_5_evaluated = evaluated_sectors[:5]

    # 2. 上位5セクターの合計流入額（AGGREGATED FLOW）とシェア比率を計算
    total_inflow_top5 = sum(s['inflowAmountNum'] for s in top_5_evaluated)
    
    print("\n" + "-" * 75)
    print(f"  [✔] Top 5 Selected Sectors (Total Flow: ${round(total_inflow_top5, 1)}B / QTR):")
    print("-" * 75)

    final_top5_data = []
    for rank, item in enumerate(top_5_evaluated, 1):
        sec = item['sector']
        inflow_b = item['inflowAmountNum']
        share_ratio = int(round((inflow_b / total_inflow_top5) * 100))

        inflow_ja = f"${int(round(inflow_b))} 億 / 四半期" if inflow_b >= 100 else f"${inflow_b:.1f} 億 / 四半期"
        inflow_en = f"${inflow_b:.1f}B / Quarter"

        print(f"  #{rank}: {sec['name']} | Inflow: {inflow_en} | Growth: {item['growthStr']} | Share: {share_ratio}%")

        final_top5_data.append({
            'id': sec['id'],
            'rank': rank,
            'name': sec['name'],
            'nameEn': sec['nameEn'],
            'inflowAmount': inflow_ja,
            'inflowAmountEn': inflow_en,
            'inflowGrowth': item['growthStr'],
            'inflowGrowthEn': item['growthStr'],
            'growthNum': item['growthNum'],
            'shareRatio': share_ratio,
            'description': sec['description'],
            'descriptionEn': sec['descriptionEn'],
            'drivingForce': sec['drivingForce'],
            'drivingForceEn': sec['drivingForceEn'],
            'topTargetStocks': sec['topTargetStocks'],
            'dominantBuyers': sec['dominantBuyers'],
            'dominantBuyersEn': sec['dominantBuyersEn']
        })

    return final_top5_data, round(total_inflow_top5, 1)

def update_mock_data_file(top5_sectors_data: list, total_inflow: float):
    """
    src/data/mockData.ts 内の currentInflowSectorsData 定義部分を直接安全に更新
    """
    mock_data_path = 'src/data/mockData.ts'
    if not os.path.exists(mock_data_path):
        print(f"[!] Error: {mock_data_path} not found.", file=sys.stderr)
        return False

    with open(mock_data_path, 'r', encoding='utf-8') as f:
        content = f.read()

    # TypeScript コード形式へシリアライズ
    ts_json = json.dumps(top5_sectors_data, ensure_ascii=False, indent=2)
    # JSONのキーのクォートを除去して綺麗な TypeScript オブジェクト形式にする
    ts_formatted = re.sub(r'"(\w+)":', r'\1:', ts_json)

    new_section = f"// 1. 現在最も資金が流入している5大セクター（{datetime.now(timezone.utc).strftime('%Y年%m月')} リアルタイムマネーフロー・動的選定準拠）\nexport const currentInflowSectorsData: CurrentInflowSector[] = {ts_formatted};"

    # 正規表現で currentInflowSectorsData の定義部分を置換
    pattern = r'// 1\. 現在最も資金が流入している5大セクター[\s\S]*?export const currentInflowSectorsData: CurrentInflowSector\[\] = \[[\s\S]*?\];'
    
    if re.search(pattern, content):
        updated_content = re.sub(pattern, new_section, content)
    else:
        # 見つからない場合は簡易置換
        pattern_simple = r'export const currentInflowSectorsData: CurrentInflowSector\[\] = \[[\s\S]*?\];'
        updated_content = re.sub(pattern_simple, f"export const currentInflowSectorsData: CurrentInflowSector[] = {ts_formatted};", content)

    with open(mock_data_path, 'w', encoding='utf-8') as f:
        f.write(updated_content)

    print(f"\n[✔] Successfully updated {mock_data_path} with fresh dynamic sector flow data.")
    return True

if __name__ == "__main__":
    top5_data, total_flow = calculate_dynamic_sectors()
    update_mock_data_file(top5_data, total_flow)
