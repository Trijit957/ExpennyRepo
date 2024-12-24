"use client";

import React, { useEffect, useState } from "react";
import FileUpload from "../file-upload/file-upload";
import { Button } from "@/components/ui/button";
import { Loader2, PlusIcon, UploadIcon } from "lucide-react";
import Papa from "papaparse";
import { Category, Transaction } from "@/globals/type";
import { format } from "date-fns";
import { useAuth } from "@clerk/nextjs";
import { createCategories, getCategories } from "@/actions/category-action";
import { createTransaction, createTransactions } from "@/actions/transaction-action";
import { useToast } from "@/hooks/use-toast";
import ParsedTransactionTable from "./parsed-transaction-table";

function CsvUploadTransaction() {
	const { userId } = useAuth();
	const { toast } = useToast();
	const [csvFile, setCsvFile] = useState<File | null>();
	const [parsedTransactionData, setParsedTransactionData] = useState<Transaction[]>([]);
	const [isPendingAddTransactions, setPendingAddTransactions] = useState<boolean>(false);

	const handleAddTransactions = async () => {
		setPendingAddTransactions(true);
		let _categories: Category[] = [];

		const userDefinedCategories = await getUserDefinedCategories();

		if (userDefinedCategories.length > 0) {
			parsedTransactionData.forEach(transaction => {
				userDefinedCategories.forEach(async category => {
					if (transaction.category !== category.name) {
						_categories.push({ user_id: userId!, name: transaction.category });
					}
				});
			});
		} else {
			parsedTransactionData.forEach(transaction => {
				_categories.push({ user_id: userId!, name: transaction.category });
			});
		}

		if (_categories.length > 0) {
			const categoryResponse = await createCategories(_categories, userId!);
			if (categoryResponse === "success") {
				toast({
					title: "Category successfully added!",
					description: "You can view this in the transaction list.",
				});
			} else {
				toast({
					title: "Failed to add Categories!",
					description: "Please try again later",
					variant: "destructive",
				});
			}
		}

		const transactionResponse = await createTransactions(parsedTransactionData, userId!);
		if (transactionResponse === "success") {
			toast({
				title: "Transactions successfully added!",
				description: "You can view this in the transaction list.",
			});
		} else {
			toast({
				title: "Failed to add transactions!",
				description: "Please try again later",
				variant: "destructive",
			});
		}
		setCsvFile(null);
		setParsedTransactionData([]);
		setPendingAddTransactions(false);
	};

	useEffect(() => {
		if (csvFile) {
			Papa.parse(csvFile, {
				header: true,
				skipEmptyLines: true,
				complete: results => {
					results.data.forEach((data: any) => {
						if (["Income", "Expense"].includes(data.type)) {
							data.amount = Number(data.amount);
							data.date = new Date(data.date).toISOString();
						}
					});
					setParsedTransactionData(results.data as Transaction[]);
				},
			});
		}
	}, [csvFile]);

	const getUserDefinedCategories = async () => {
		const response = await getCategories(userId!);
		return (response?.documents as unknown as Category[]) ?? [];
	};

	return (
		<div>
			{!csvFile ? (
				<FileUpload onFileUpload={file => setCsvFile(file)} />
			) : (
				<>
					<div className="mt-5 border-2 flex flex-col gap-5 items-center p-4 border-neutral-200 rounded">
						<span>Selected file: {csvFile.name}</span>
						<div>
							<Button onClick={() => setCsvFile(null)}>
								<UploadIcon className="h-4 w-4" />
								Clear and Reupload
							</Button>
						</div>
					</div>
					{parsedTransactionData?.length > 0 && (
						<div className="p-4 mt-4 bg-white dark:bg-gray-800 rounded-lg shadow-md mb-4">
							<div className="flex justify-between items-center mb-4">
								<h2 className="text-lg font-bold text-gray-900 dark:text-gray-100">
									Parsed Transactions:
								</h2>
								<Button
									type="button"
									disabled={isPendingAddTransactions}
									onClick={handleAddTransactions}
								>
									{isPendingAddTransactions ? (
										<Loader2 className="animate-spin" />
									) : (
										<PlusIcon className="h-4 w-4" />
									)}
									{isPendingAddTransactions ? "Please wait..." : "Add Transaction"}
								</Button>
							</div>
							<div className="overflow-x-auto">
								<ParsedTransactionTable parsedTransactionData={parsedTransactionData} />
							</div>
						</div>
					)}
				</>
			)}
		</div>
	);
}

export default CsvUploadTransaction;
