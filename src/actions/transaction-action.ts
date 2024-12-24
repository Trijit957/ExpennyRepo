import { ID, databases } from "@/app/utils/appwrite";
import { Transaction } from "@/globals/type";
import { Models, Query } from "appwrite";

export async function createTransaction(transaction: Transaction) {
	try {
		await databases.createDocument(
			process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID!,
			process.env.NEXT_PUBLIC_TRANSACTION_COLLECTION_ID!,
			ID.unique(),
			transaction
		);
		return "success";
	} catch (error) {
		console.error(error);
		return "error";
	}
}

export async function createTransactions(transactions: Transaction[], userId: string) {
	try {
		for (const transaction of transactions) {
			await databases.createDocument<Transaction & Models.Document>(
				process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID!,
				process.env.NEXT_PUBLIC_TRANSACTION_COLLECTION_ID!,
				ID.unique(),
				{ user_id: userId, ...transaction }
			);
		}
		return "success";
	} catch (error) {
		console.error(error);
		return "error";
	}
}

export async function getTransactions(userId: string) {
	try {
		return await databases.listDocuments(
			process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID!,
			process.env.NEXT_PUBLIC_TRANSACTION_COLLECTION_ID!,
			[Query.equal("user_id", userId)]
		);
	} catch (error) {
		console.error(error);
	}
}
