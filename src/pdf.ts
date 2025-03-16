import { chromium as PlaywrightChromium } from 'playwright';

export async function htmlToPdf(html: string) {
    const browser = await PlaywrightChromium.launch({
        headless: true,
    });
    const page = await browser.newPage();
    await page.setContent(html);
    const buffer = await page.pdf({ format: 'A4', margin: { top: '10mm', right: '10mm', bottom: '10mm', left: '10mm' } });
    await browser.close();

    return new Blob([buffer], { type: 'application/pdf' });
}