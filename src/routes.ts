import { Router } from "express";
import { scrapeAndGenerate } from "./services";

export function MainRouter() {
	const router = Router();

	// TODO add express-validator
	router.post("/generate/:id", async (req, res) => {
		const connectionId = req.params.id;

		if (!connectionId) {
			res.status(400).json({ error: "Connection id is required" });
			return;
		}

		if (!req.body.list_url) {
			res.status(400).json({ error: "list_url is required" });
			return;
		}

		const { list_url } = req.body;
		
		const { pdfFileName } = await scrapeAndGenerate(connectionId, list_url);
	
		res.json({ url: pdfFileName });
	});

	return router
}
