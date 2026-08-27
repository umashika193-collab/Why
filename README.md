# CapGazer (資本ゲイザー)
### 世の中のお金の流れを眺める — Institutional Money Flow & Policy Observatory

米証券取引委員会（SEC EDGAR）の一次開示文書（Form 13F, 8-K, 6-K, 10-K, DEF 14A等）および世界の巨大運用会社の公式スチュワードシップ報告書に基づき、世の中のお金の流れと大株主の意図を淡々と眺める客観的データプラットフォーム。

---

## 🌐 ライブデモ（公開URL）

👉 **[https://umashika193-collab.github.io/capgazer/](https://umashika193-collab.github.io/capgazer/)**

---

## 🏛️ 主な機能

### 1. 資金流入上位セクター（動的マネーフロー選出エンジン）
* **万物は流転する（固定値の完全撤廃）**:
  全10セクターの候補プール（AIインフラ、防衛、バイオ・GLP-1、先端半導体、オルタナティブ金融、重要鉱物、宇宙防衛、クリーンエネルギー等）から、その時々で最も資本が集中している**上位5大セクターを動的に選出・ランク付け**。
* **3層マネーフロー・フィルター（風見鶏ノイズの排除）**:
  単なる日々の株価上昇率（相場の後追い・風見鶏）ではなく、**「① SEC 13F / 確定CAPEX（岩盤資本）」×「② 60日平滑化 ETF資金流向（中期トレンド）」×「③ SEC Form 8-K/13G 重要開示」** を統合した総合資本流入額（$B/QTR）で順位を決定。
* **完全連動データパネル**:
  選出されたセクターに応じて、代表構成銘柄（ウェイト付）、主要買い手メガファンド、資本流入の背景・構造的要因、合計流入額（AGGREGATED FLOW）が自動で整合。

### 2. 世界の資産運用会社 AUM上位10社 ＆ 保有マトリクス（2026年最新公開報告準拠）
* 各社の最新公式開示（2025年末〜2026年上半期 / RankiaPro等）に基づく、世界のトップ10運用機関の運用資産規模（AUM）、主要保有株式比率、および企業への要求方針（議決権行使ガイドライン）：
  1. 🇺🇸 **ブラックロック (BlackRock)**: 約 $14.0兆 〜 15.3兆 (世界最大・iShares・Aladdin)
  2. 🇺🇸 **バンガード (Vanguard Group)**: 約 $11.6兆 〜 12.5兆 (低コストインデックスの世界的巨頭)
  3. 🇺🇸 **フィデリティ (Fidelity Investments)**: 約 $7.0兆 〜 7.1兆 (アクティブ運用の代表格)
  4. 🇨🇭 **UBSグループ (UBS Group)**: 約 $6.9兆 (クレディ・スイス買収後欧州最大)
  5. 🇺🇸 **ステート・ストリート (State Street)**: 約 $5.6兆 〜 6.3兆 (SPDRシリーズ・ETF強み)
  6. 🇺🇸 **JPモルガン・アセット・マネジメント (JPMorgan)**: 約 $4.8兆 〜 5.1兆 (金融財閥系・オルタナティブ)
  7. 🇺🇸 **ゴールドマン・サックス (Goldman Sachs)**: 約 $3.4兆 〜 3.6兆 (富裕層・機関投資家ソリューション)
  8. 🇺🇸 **キャピタル・グループ (Capital Group)**: 約 $3.2兆 〜 3.4兆 (老舗独立系アクティブ運用)
  9. 🇫🇷 **アムンディ (Amundi)**: 約 $2.6兆 〜 2.7兆 (欧州系純粋運用会社トップ)
  10. 🇩🇪/🇺🇸 **PIMCO / アリアンツグループ**: 約 $2.3兆 〜 2.5兆 (債券アクティブ世界最高峰)

### 3. アジェンダ別 政策分析 ＆ 産業インパクト・フィード
* **AI & REGULATION** (Nvidia独禁法調査、Microsoft/OpenAI独占審査)
* **GAMING / ENTERTAINMENT** (ソニー過度なポリコレ監修廃止、ディズニー委任状争奪戦後のROI改革)
* **TAKEOVER & BUYBACK** (セブン＆アイ買収防衛策是正、トヨタ・メガ損保4兆円持ち合い株ゼロ化)
* **DEFENSE & PENSION** (欧州年金基金防衛ESG除外撤廃、米各州反ESG法と受託者責任回帰)
* **SCOPE 3 & ENERGY** (SEC気候開示規則Scope3凍結、AI電力需要と原子力PPA直接契約)
* **CHIPS & RESHORING** (米商務省対中迂回規制、TSMC先端半導体日米欧多極化)
* 全項目に**SEC公式原本リンク（SEC Accession URL）**を完備。

### 4. 100%完全自律型 自動更新パイプライン
* **GitHub Actions** により、平日の毎朝 07:00 (JST) に自動巡回・計算を実行。
* **セクター動的選定エンジン (`scripts/sector_flow_calculator.py`)**:
  公開市場データ（ETF出来高・3ヶ月モメンタム）を取得し、5大セクターの順位と流入額を再計算。
* **Google Gemini API (2.0 Flash)**:
  新着開示資料（Form 8-K/6-K）を「公的開示事実・資本の論理・現場への影響」の3要素に自動構造化してフィードへ追記。
* マネーフロー、Form 13F保有比率、フィード記事のすべてを完全手作業ゼロで自動更新・自動再デプロイ。

---

## 🛠️ 技術スタック

* **Frontend**: React 19 + TypeScript + Vite + Tailwind CSS + Lucide Icons
* **Design & Typography**: Financial Times / Bloomberg Terminal 準拠（Newsreader + JetBrains Mono + Plus Jakarta Sans）
* **Dynamic Intelligence Engine**: Python 3.13 + Yahoo Finance API + SEC EDGAR REST API + Google Gemini API (2.0 Flash)
* **CI/CD Automation**: GitHub Actions (`.github/workflows/auto_update.yml`, `.github/workflows/deploy.yml`)

---

## 🚀 ローカル起動方法

```bash
# 依存パッケージのインストール
npm install

# 開発サーバーの起動
npm run dev

# セクター動的計算・更新エンジンの実行
py scripts/sector_flow_calculator.py

# フルパイプライン（SEC巡回＋セクター再計算）の実行
py scripts/full_pipeline_updater.py

# プロダクションビルド
npm run build
```

---

## 📜 ライセンス

MIT License
