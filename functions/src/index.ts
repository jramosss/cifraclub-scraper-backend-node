import { onSchedule } from "firebase-functions/v2/scheduler";
import * as logger from "firebase-functions/logger";
import { initializeApp } from 'firebase-admin/app';
import * as admin from 'firebase-admin';

initializeApp();
const storage = admin.storage();

const removeOldStorageObjects = async () => {
    logger.info("Starting to remove old storage objects");

    const bucket = storage.bucket();
    const [files] = await bucket.getFiles();

    const sixHoursAgo = Date.now() - 6 * 60 * 60 * 1000;

    try {
        const deletions = files.map(async (file) => {
            const [metadata] = await file.getMetadata();
            // biome-ignore lint/style/noNonNullAssertion: <explanation>
            const createdTime = new Date(metadata.timeCreated!).getTime();

            if (createdTime < sixHoursAgo) {
                await file.delete();
                console.log(`Deleted file: ${file.name}`);
            }
        });

        await Promise.all(deletions);
        console.log("Old files cleanup completed.");
    } catch (error) {
        console.error("Error deleting old files: ", error);
    }
};

export const cleanup = onSchedule("every 6 hours", removeOldStorageObjects);