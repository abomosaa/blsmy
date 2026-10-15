"""Import presentation assets explicitly referenced by the original Blsmy homepage."""
import concurrent.futures
import hashlib
from html.parser import HTMLParser
import json
from pathlib import Path
from urllib.parse import urlparse, parse_qs, unquote
from urllib.request import urlopen, Request

ROOT = Path(__file__).resolve().parents[1]
DEST = ROOT / 'assets' / 'original'
DEST.mkdir(parents=True, exist_ok=True)

class Images(HTMLParser):
    def __init__(self):
        super().__init__()
        self.images = {}

    def handle_starttag(self, tag, attrs):
        attrs = dict(attrs)
        if tag != 'img':
            return
        src = attrs.get('src', '')
        if src.startswith('/_next/image?'):
            src = parse_qs(urlparse(src).query).get('url', [''])[0]
        if src.startswith(('/images/', '/_next/static/media/')):
            self.images.setdefault(src, attrs.get('alt', ''))

parser = Images()
source_file = ROOT / 'tmp/source/home.html'
if source_file.exists():
    html = source_file.read_text(encoding='utf-8-sig')
else:
    with urlopen('https://blsmy.com/', timeout=40) as response:
        html = response.read().decode('utf-8')
parser.feed(html)
parser.images['/_next/static/media/hero-bg.1pm_ybpsucqw5.webp'] = 'خلفية الواجهة الأصلية'

def download(item):
    src, alt = item
    target = DEST / Path(unquote(urlparse(src).path)).name
    url = 'https://blsmy.com' + src
    if not target.exists():
        req = Request(url, headers={'User-Agent': 'Blsmy-site-asset-import'})
        with urlopen(req, timeout=40) as response:
            data = response.read()
            content_type = response.headers.get('Content-Type', '')
            if not content_type.startswith('image/'):
                raise ValueError(f'Expected image for {src}: {content_type}')
            target.write_bytes(data)
    data = target.read_bytes()
    return {'source': url, 'local': target.relative_to(ROOT).as_posix(), 'alt': alt,
            'bytes': len(data), 'sha256': hashlib.sha256(data).hexdigest()}

with concurrent.futures.ThreadPoolExecutor(max_workers=6) as pool:
    manifest = list(pool.map(download, parser.images.items()))
output = ROOT / 'docs/original-assets.json'
output.write_text(json.dumps({'source': 'https://blsmy.com/', 'imported_on': '2026-10-15',
                             'assets': manifest}, ensure_ascii=False, indent=2), encoding='utf-8')
print(json.dumps({'assets': len(manifest), 'bytes': sum(x['bytes'] for x in manifest),
                  'manifest': str(output)}, ensure_ascii=False))
