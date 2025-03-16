import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { storage } from "./firebase";
import { htmlToPdf } from "./pdf";
import { getScraper } from "./utils/utils";

export async function scrapeAndGenerate(connectionId: string, listUrl: string) {
	const scraper = getScraper(connectionId);
	const htmlContent = await scraper.scrape(listUrl);

	const blob = await htmlToPdf(htmlContent);
	const dbRef = ref(storage, `${connectionId}.pdf`);
	const result = await uploadBytes(dbRef, blob, {
		contentType: "application/pdf",
	})

	const url = await getDownloadURL(result.ref);

	return {
		url,
		total_songs: scraper.total_songs,
	};
}