import { Client, Account, Databases } from "appwrite";

export const client = new Client();

client
	.setEndpoint("https://cloud.appwrite.io/v1")
	.setProject(process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID!); // Replace with your project ID

export const account = new Account(client);
export { ID } from "appwrite";

export const databases = new Databases(client);
