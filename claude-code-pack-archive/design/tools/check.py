#!/usr/bin/env python3
"""Проверка вёрстки: python3 check.py путь_к_html [query] — снимки на 4 ширинах, горизонтальный скролл, ошибки консоли.
Нужен: pip install playwright && playwright install chromium"""
import sys, pathlib
from playwright.sync_api import sync_playwright
f = pathlib.Path(sys.argv[1]).resolve()
q = sys.argv[2] if len(sys.argv) > 2 else ''
out = pathlib.Path('check-shots'); out.mkdir(exist_ok=True)
errs = []; bad = 0
with sync_playwright() as p:
    b = p.chromium.launch()
    for w, h in [(1440, 900), (1920, 1080), (820, 1100), (390, 844)]:
        pg = b.new_page(viewport={'width': w, 'height': h})
        pg.on('pageerror', lambda e: errs.append(str(e)))
        pg.on('console', lambda m: m.type == 'error' and 'Failed to load resource' not in m.text and errs.append(m.text))
        pg.goto('file://%s%s' % (f, ('?' + q) if q else ''))
        pg.wait_for_timeout(1200)
        d = pg.evaluate('document.documentElement.scrollWidth-innerWidth')
        bad += d > 0
        print(w, 'overflow-x:', d)
        pg.screenshot(path=str(out / ('%s_%d.png' % (f.stem, w))), full_page=True)
    b.close()
print('ошибки консоли:', errs or 'нет')
sys.exit(1 if bad or errs else 0)
