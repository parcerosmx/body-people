"""Genera public/og-body-people.jpg (1200×630) desde scripts/og/og.html con Playwright."""
import asyncio, io, pathlib
from PIL import Image
from playwright.async_api import async_playwright

RAIZ = pathlib.Path(__file__).resolve().parents[2]

async def main():
    async with async_playwright() as p:
        b = await p.chromium.launch()
        pg = await b.new_page(viewport={"width": 1200, "height": 630})
        await pg.goto((RAIZ / "scripts/og/og.html").as_uri())
        await pg.evaluate("document.fonts.ready")
        await pg.wait_for_timeout(500)
        png = await pg.screenshot()
        await b.close()
    Image.open(io.BytesIO(png)).convert("RGB").save(RAIZ / "public/og-body-people.jpg", "JPEG", quality=84, optimize=True, progressive=True)
    print("ok", (RAIZ / "public/og-body-people.jpg").stat().st_size // 1024, "KB")

asyncio.run(main())
