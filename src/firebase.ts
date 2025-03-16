import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
import serviceAccount from "../service-account.json";

// biome-ignore lint/suspicious/noExplicitAny: <explanation>
export const firebase = initializeApp(serviceAccount as any);
export const storage = getStorage(firebase);