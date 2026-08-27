"""
CFPT Autonomous Data Updater (自動更新エンジン)

GitHub Actions 等の定期実行（Cron）から呼び出され、
米証券取引委員会（SEC EDGAR）の最新提出書類（13F, 8-K, 6-K, SC 13G）を自動巡回・検知し、
サイトのデータファイルを自動更新します。
"""

import sys
import io
import json
import time
import urllib.request
from datetime import datetime, timezone

# Windows/UTF-8対応
if sys.platform == 'win32':
    sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding='utf-8', errors='replace')
    sys.stderr = io.TextIOWrapper(sys.stderr.buffer, encoding='utf-8', errors='replace')

SEC_HEADERS = {
    'User-Agent': 'CFPTRadar AutoBot/1.0 (contact: research@cfpt-radar.org)',
    'Accept-Encoding': 'gzip, deflate',
    'Host': 'data.sec.gov'
}

TARGET_ENTITIES = {
    # メガファンド
    'BLACKROCK': ('BlackRock, Inc.', '0001364742'),
    'VANGUARD': ('Vanguard Group Inc', '0000102909'),
    'STATE_STREET': ('State Street Corp', '0000093751'),
    
    # 主要監視企業
    'NVDA': ('Nvidia Corp', '0001045810'),
    'SONY': ('Sony Group Corp', '0000313838'),
    'AAPL': ('Apple Inc.', '0000320193'),
    'MSFT': ('Microsoft Corp', '0000789019'),
    'DIS': ('Walt Disney Co', '0001744489'),
    'CEG': ('Constellation Energy', '0001868275'),
    'TSM': ('TSMC (ADR)', '0001046179'),
}

def fetch_sec_json(url: str) -> dict:
    req = urllib.request.Request(url, headers=SEC_HEADERS)
    try:
        with urllib.request.urlopen(req, timeout=15) as response:
            data = response.read()
            if response.info().get('Content-Encoding') == 'gzip':
                import gzip
                data = gzip.decompress(data)
            return json.loads(data.decode('utf-8'))
    except Exception as e:
        print(f"[!] Warning: Failed to fetch {url}: {e}", file=sys.stderr)
        return {}

def check_new_filings():
    print("=" * 70)
    print("  CFPT Autonomous SEC Filing Monitor")
    print(f"  Execution Timestamp: {datetime.now(timezone.utc).isoformat()} UTC")
    print("=" * 70)

    detected_filings = []

    for key, (name, cik) in TARGET_ENTITIES.items():
        cik_padded = str(cik).zfill(10)
        url = f"https://data.sec.gov/submissions/CIK{cik_padded}.json"
        
        print(f"[*] Checking [{key}] {name} (CIK: {cik_padded})...")
        data = fetch_sec_json(url)
        
        if not data or 'filings' not in data:
            continue

        recent = data['filings']['recent']
        forms = recent['form']
        dates = recent['filingDate']
        accessions = recent['accessionNumber']
        docs = recent['primaryDocument']

        # 直近3件のフォームをチェック
        for i in range(min(3, len(forms))):
            form_type = forms[i]
            filing_date = dates[i]
            acc_no = accessions[i]
            primary_doc = docs[i]
            clean_acc = acc_no.replace('-', '')
            doc_url = f"https://www.sec.gov/Archives/edgar/data/{int(cik)}/{clean_acc}/{primary_doc}"

            # 監視対象の重要フォーム
            if form_type in ['13F-HR', '8-K', '6-K', 'SC 13G', 'DEF 14A', '10-K', '20-F']:
                detected_filings.append({
                    'ticker': key,
                    'companyName': name,
                    'form': form_type,
                    'filingDate': filing_date,
                    'url': doc_url,
                    'accession': acc_no
                })
                print(f"    -> Detected: Form {form_type:<8} [{filing_date}] {doc_url}")
                break

        time.sleep(0.15) # レートリミット遵守

    # 最新ステータスログの出力
    log_data = {
        'lastCheckedUtc': datetime.now(timezone.utc).isoformat(),
        'totalMonitored': len(TARGET_ENTITIES),
        'latestFilings': detected_filings
    }

    with open('scripts/latest_sec_status.json', 'w', encoding='utf-8') as f:
        json.dump(log_data, f, ensure_ascii=False, indent=2)

    print("\n" + "=" * 70)
    print(f"[✔] Monitor check completed. Total {len(detected_filings)} live filings verified.")
    print("=" * 70)

if __name__ == "__main__":
    check_new_filings()
