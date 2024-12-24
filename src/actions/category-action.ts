import { ID, databases } from "@/app/utils/appwrite";
import { Category } from "@/globals/type";
import { Models, Query } from "appwrite";

export async function createCategories(categories: Category[], userId: string) {
	try {
		for (const category of categories) {
			await databases.createDocument<Category & Models.Document>(
				process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID!,
				process.env.NEXT_PUBLIC_CATEGORY_COLLECTION_ID!,
				ID.unique(),
				{ user_id: userId, ...category }
			);
		}
		return "success";
	} catch (error) {
		return "error";
	}
}

export async function getCategories(userId: string) {
	try {
		return await databases.listDocuments(
			process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID!,
			process.env.NEXT_PUBLIC_CATEGORY_COLLECTION_ID!,
			[Query.equal("user_id", userId)]
		);
	} catch (error) {
		console.error(error);
	}
}
