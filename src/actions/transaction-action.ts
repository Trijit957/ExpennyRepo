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

export async function editTransaction(transaction: Transaction) {
	try {
		await databases.updateDocument(
			process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID!,
			process.env.NEXT_PUBLIC_TRANSACTION_COLLECTION_ID!,
			transaction.$id!, // documentId
			{
				name: transaction.name,
				type: transaction.type,
				amount: transaction.amount,
				category: transaction.category,
				date: transaction.date,
				note: transaction.note,
			}
			// ["read("any")"] // permissions (optional)
		);
		return "success";
	} catch (error) {
		console.error(error);
		return "error";
	}
}

export async function deleteTransaction(transactionId: string) {
	try {
		await databases.deleteDocument(
			process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID!,
			process.env.NEXT_PUBLIC_TRANSACTION_COLLECTION_ID!,
			transactionId
		);
		return "success";
	} catch (error) {
		console.error(error);
		return "error";
	}
}
