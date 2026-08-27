# Capital Flow & Policy Tracker (CFPT)

米証券取引委員会（SEC EDGAR）の一次開示文書（Form 13F, 8-K, 6-K, 10-K, DEF 14A等）および大手資産運用会社の公式スチュワードシップ報告書に直結した、客観的金融インテリジェンス・データプラットフォーム。

---

## 🌐 ライブデモ（公開URL）

👉 **[https://umashika193-collab.github.io/Why/](https://umashika193-collab.github.io/Why/)**

---

## 🏛️ 主な機能

### 1. 資金流入上位セクター（リアルタイムマネーフロー）
* **AIデータセンター＆電力インフラ（$185B）**、**防衛テック＆ドローン（$92B）**、**GLP-1＆次世代バイオ（$64B）**、**プライベートクレジット（$58B）**、**重要鉱物＆レアアース（$41B）** の5大セクターにおける資金流入総額・MoM変動率・主要買い手ファンド・代表銘柄を網羅。

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
* **GitHub Actions** により、平日の毎朝 07:00 (JST) にSEC EDGARサーバーを自動巡回。
* **Google Gemini API** を用いて新着開示資料（Form 8-K/6-K）を「公的開示事実・資本の論理・現場への影響」の3要素に自動構造化してフィードへ追記。
* マネーフロー、Form 13F保有比率、フィード記事のすべてを完全手作業ゼロで自動更新・自動再デプロイ。

---

## 🛠️ 技術スタック

* **Frontend**: React 19 + TypeScript + Vite + Tailwind CSS + Lucide Icons
* **Design & Typography**: Financial Times / Bloomberg Terminal 準拠（Newsreader + JetBrains Mono + Plus Jakarta Sans）
* **Autonomous Pipeline Engine**: Python 3.13 + SEC EDGAR REST API + Google Gemini API (1.5 Flash)
* **CI/CD Automation**: GitHub Actions (`.github/workflows/auto_update.yml`, `.github/workflows/deploy.yml`)

---

## 🚀 ローカル起動方法

```bash
# 依存パッケージのインストール
npm install

# 開発サーバーの起動
npm run dev

# プロダクションビルド
npm run build
```

---

## 📜 ライセンス

MIT License
