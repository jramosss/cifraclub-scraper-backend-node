import { chromium as PlaywrightChromium } from 'playwright';

export async function htmlToPdf(html: string, pdfPath: string) {
    const browser = await PlaywrightChromium.launch({
        headless: true,
    });
    const page = await browser.newPage();
    await page.setContent(html);
    await page.pdf({ path: pdfPath, format: 'A4', margin: { top: '10mm', right: '10mm', bottom: '10mm', left: '10mm' } });
    await browser.close();
}