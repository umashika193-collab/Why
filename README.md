# Capital Flow & Policy Tracker (CFPT)

米証券取引委員会（SEC EDGAR）の一次開示文書および大手ファンドの公式スチュワードシップ報告書に直結した、客観的金融インテリジェンス・データプラットフォーム。

---

## 🏛️ 主な機能

1. **資金流入上位セクター（リアルタイムマネーフロー）**:
   * AIデータセンター＆電力インフラ、防衛テック、GLP-1バイオ、プライベートクレジット、重要鉱物などの資金流入額と買い手ファンド・代表銘柄を一覧化。
2. **世界の巨大資本トップ10 ＆ 要求方針マトリクス**:
   * BlackRock, Vanguard, Fidelity, State Street, UBS, JPモルガン, Capital Group, Amundi, ノルウェー政府年金, 日本GPIF の保有株式比率と企業への要求方針（議決権行使基準）。
3. **アジェンダ別 政策分析 ＆ 産業インパクト・フィード**:
   * AI独禁法調査、エンタメ開発ROI回帰、買収防衛策是正、防衛産業投資、Scope3緩和、先端半導体製造多極化の6大アジェンダをSEC公式原本リンク（8-K, 6-K, 10-K, DEF 14A等）付きで収録。
4. **SEC EDGAR 自律自動更新システム**:
   * GitHub Actions により、平日の毎朝 07:00 (JST) にSEC提出書類を自動巡回・検証。

---

## 🛠️ 技術スタック

* **Frontend**: React 19 + TypeScript + Vite + Tailwind CSS + Lucide Icons
* **Typography**: Newsreader (Serif) + JetBrains Mono + Plus Jakarta Sans
* **Data Verification Engine**: Python 3.13 + SEC EDGAR REST API
* **CI/CD Automation**: GitHub Actions (`.github/workflows/auto_update.yml`)

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
