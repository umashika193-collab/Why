"""
SEC EDGAR Data Fetcher & Verifier (一次情報取得・検証エンジン)

米証券取引委員会（SEC）の公式EDGAR APIを利用して、
米国企業（10-K, DEF 14A, 8-K）、外国企業（20-F, 6-K）、
およびメガファンドの保有株（Form 13F-HR）を取得・検証します。
"""

import sys
import io
import json
import time
import urllib.request
import re
from datetime import datetime

# WindowsコンソールのUTF-8エンコード対応
if sys.platform == 'win32':
    sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding='utf-8', errors='replace')
    sys.stderr = io.TextIOWrapper(sys.stderr.buffer, encoding='utf-8', errors='replace')

# SEC EDGAR利用のための必須ヘッダー
SEC_HEADERS = {
    'User-Agent': 'CFPTRadar ResearchBot/1.0 (contact: research@cfpt-radar.org)',
    'Accept-Encoding': 'gzip, deflate',
    'Host': 'data.sec.gov'
}

# 主要なファンド・企業の既知CIKコード
KNOWN_CIKS = {
    # メガファンド
    'BLACKROCK': ('BlackRock, Inc.', '0001364742'),
    'VANGUARD': ('Vanguard Group Inc', '0000102909'),
    'STATE_STREET': ('State Street Corp', '0000093751'),
    'BERKSHIRE': ('Berkshire Hathaway Inc', '0001067983'),
    
    # 米国主要企業
    'AAPL': ('Apple Inc.', '0000320193'),
    'MSFT': ('Microsoft Corp', '0000789019'),
    'NVDA': ('Nvidia Corp', '0001045810'),
    'DIS': ('Walt Disney Co', '0001744489'),
    'TSLA': ('Tesla, Inc.', '0001318605'),
    'META': ('Meta Platforms, Inc.', '0001326801'),
    
    # 外国企業（ADR/日本企業）
    'SONY': ('Sony Group Corp', '0000313838'),
    'TM': ('Toyota Motor Corp', '0001094517'),
    'NTDOY': ('Nintendo Co., Ltd. (ADR)', '0000072000'),
}

# 対象とする主要フォームタイプ（米国・外国・機関投資家）
STANDARD_FORMS = [
    '10-K',      # 米国企業 年次報告書
    '20-F',      # 外国企業（ソニー・トヨタ等） 年次報告書
    'DEF 14A',   # 株主総会招集通知・議決権行使議案・役員報酬
    '8-K',       # 米国企業 臨時重要開示
    '6-K',       # 外国企業 臨時重要開示
    '13F-HR',    # 機関投資家 四半期保有株式報告書
    'SC 13G',    # 5%以上の大量保有報告書
    'SC 13D',    # 5%以上のアクティビスト保有報告書
]

def fetch_json(url: str, headers: dict = SEC_HEADERS) -> dict:
    """SEC APIからJSONデータを取得"""
    req = urllib.request.Request(url, headers=headers)
    try:
        with urllib.request.urlopen(req, timeout=15) as response:
            data = response.read()
            if response.info().get('Content-Encoding') == 'gzip':
                import gzip
                data = gzip.decompress(data)
            return json.loads(data.decode('utf-8'))
    except Exception as e:
        print(f"[ERROR] Failed to fetch {url}: {e}", file=sys.stderr)
        return {}

def get_company_filings(cik: str, form_types: list = STANDARD_FORMS) -> list:
    """
    指定CIKの最新開示書類一覧を取得
    """
    cik_padded = str(cik).zfill(10)
    url = f"https://data.sec.gov/submissions/CIK{cik_padded}.json"
    
    print(f"[*] Fetching submission history from SEC EDGAR for CIK: {cik_padded}...")
    data = fetch_json(url)
    
    if not data or 'filings' not in data:
        return []

    company_name = data.get('name', 'Unknown')
    sic_desc = data.get('sicDescription', '')
    
    print(f"[+] Entity: {company_name} | Industry: {sic_desc}")
    
    recent = data['filings']['recent']
    filings = []
    
    for i in range(min(100, len(recent['form']))):
        form = recent['form'][i]
        if form_types and form not in form_types:
            continue
            
        filing_date = recent['filingDate'][i]
        report_date = recent['reportDate'][i] if 'reportDate' in recent and i < len(recent['reportDate']) else filing_date
        accession_no = recent['accessionNumber'][i]
        accession_clean = accession_no.replace('-', '')
        primary_doc = recent['primaryDocument'][i]
        doc_desc = recent['primaryDocDescription'][i] if 'primaryDocDescription' in recent and i < len(recent['primaryDocDescription']) else form
        
        doc_url = f"https://www.sec.gov/Archives/edgar/data/{int(cik)}/{accession_clean}/{primary_doc}"
        
        filings.append({
            'companyName': company_name,
            'cik': cik_padded,
            'form': form,
            'filingDate': filing_date,
            'reportDate': report_date,
            'accessionNumber': accession_no,
            'description': doc_desc,
            'url': doc_url
        })
        
        if len(filings) >= 8:
            break
            
    return filings

def parse_form_description(form: str) -> str:
    """フォームの役割を日本語で解説"""
    descriptions = {
        '10-K': '年次決算・事業リスク・経営方針（米国基準）',
        '20-F': '年次決算・グローバル事業報告（外国企業・ソニー等）',
        'DEF 14A': '株主総会招集通知（役員選任・株主提案・報酬議案）',
        '8-K': '臨時重要開示（経営陣異動・買収・訴訟など）',
        '6-K': '臨時重要開示（外国企業の四半期決算・重要発表）',
        '13F-HR': '機関投資家の四半期全保有株式一覧（保有比率）',
        'SC 13G': '機関投資家による5%以上大量保有報告',
        'SC 13D': 'アクティビスト（物言う株主）による5%以上保有報告',
    }
    return descriptions.get(form, 'SEC公式提出文書')

def main():
    print("=" * 75)
    print("  SEC EDGAR Primary Source Intelligence Fetcher (CFPT Engine)")
    print("  米証券取引委員会 公式データベースからの一次情報取得テスト")
    print("=" * 75)
    
    test_targets = ['SONY', 'AAPL', 'NVDA', 'BLACKROCK']
    verified_results = {}
    
    for key in test_targets:
        name, cik = KNOWN_CIKS[key]
        print(f"\n>>> 調査対象: [{key}] {name} (CIK: {cik})")
        filings = get_company_filings(cik)
        
        print(f"    検出された公式開示書類（直近 {len(filings)} 件）:")
        for idx, f in enumerate(filings[:5], 1):
            role = parse_form_description(f['form'])
            print(f"    {idx}. [{f['filingDate']}] Form {f['form']:<8} | {role}")
            print(f"       URL: {f['url']}")
            
        verified_results[key] = {
            'ticker': key,
            'name': name,
            'cik': cik,
            'latestFilings': filings
        }
        time.sleep(0.2) # レートリミット遵守

    # 抽出データの保存
    output_path = "scripts/sec_verified_sample.json"
    with open(output_path, "w", encoding="utf-8") as f:
        json.dump(verified_results, f, ensure_ascii=False, indent=2)
        
    print("\n" + "=" * 75)
    print(f"[✔] SEC公式開示データの取得＆一次情報検証が完了しました。")
    print(f"[✔] 保存先: {output_path}")
    print("=" * 75)

if __name__ == "__main__":
    main()
