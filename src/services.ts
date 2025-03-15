import { htmlToPdf } from "./pdf";
import { getScraper } from "./utils/utils";

export async function scrapeAndGenerate(connectionId: string, listUrl: string) {
	const scraper = getScraper(connectionId);
	const htmlContent = await scraper.scrape(listUrl);

	const pdfFileName = `${connectionId}.pdf`;
	const pdfPath = `./static/${pdfFileName}`;

	await htmlToPdf(htmlContent, pdfPath);

	return {
		pdfFileName,
		total_songs: scraper.total_songs,
	};
}