"use client";

import { Category, Transaction, TransactionTypeEnum } from "@/globals/type";
import React, { useEffect, useState } from "react";
import FormWrapper from "../form/form-wrapper";
import FormInput from "../form/elements/form-input";
import FormSelect from "../form/elements/form-select";
import FormDatePicker from "../form/elements/form-date-picker";
import FormComboBox from "../form/elements/form-combobox";
import { Button } from "@/components/ui/button";
import { Loader2Icon, PlusIcon } from "lucide-react";
import { z } from "zod";
import { useAuth } from "@clerk/nextjs";
import { useToast } from "@/hooks/use-toast";
import { createCategories, getCategories } from "@/actions/category-action";
import { editTransaction } from "@/actions/transaction-action";

interface EditTrasacntionModalProps {
	transaction: Transaction;
	onEditModalClose: () => void;
	onAfterUpdate: () => void;
}
const transactionFormSchema = z.object({
	name: z.string().min(1, "Name is required"),
	amount: z.coerce.number().min(1, "Amount is required"),
	type: z.enum(["Income", "Expense"], { required_error: "Type is required" }),
	date: z.date({ required_error: "Date is required" }),
	category: z.string().optional(),
	note: z.string().optional(),
});

type TransactionFromData = z.infer<typeof transactionFormSchema>;

interface CategoryItem {
	label: string;
	value: string;
}

function EditTransactionModal({
	transaction,
	onEditModalClose,
	onAfterUpdate,
}: EditTrasacntionModalProps) {
	const { userId } = useAuth();
	const { toast } = useToast();
	const [categories, setCategories] = useState<CategoryItem[]>([]);
	const [isPendingCreateTransaction, setIsPendingCreateTransaction] = useState<boolean>(false);
	let newCategories: CategoryItem[] = [];

	const defaultFormValues = {
		name: transaction.name,
		amount: transaction.amount,
		type: transaction.type,
		date: new Date(transaction.date),
		category: transaction.category ?? "",
		note: transaction.note ?? "",
	};

	const getUserDefinedCategories = async () => {
		const response = await getCategories(userId!);
		if (response?.documents?.length) {
			response.documents.forEach(doc => {
				setCategories(prev => {
					let isFound = prev.find(category => category.label === doc.name);
					if (!isFound) {
						prev.push({
							label: doc.name,
							value: (doc.name as string).toLowerCase(),
						});
					}
					return [...prev];
				});
			});
		}
	};

	const handleSubmit = async (data: TransactionFromData) => {
		setIsPendingCreateTransaction(true);
		const transactionResponse = await editTransaction({
			$id: transaction.$id,
			name: data.name,
			type: data.type as TransactionTypeEnum,
			category: data.category ?? "",
			date: data.date.toISOString(),
			note: data.note ?? "",
			amount: data.amount,
		});

		if (newCategories?.length > 0) {
			let newCategoriesToAdd: Category[] = [];

			newCategories.forEach(category => {
				newCategoriesToAdd.push({
					name: category.label,
				});
			});

			const categoryResposne = await createCategories(newCategoriesToAdd, userId!);
			if (categoryResposne === "success") {
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

		if (transactionResponse === "success") {
			toast({
				title: "Transaction successfully updated!",
				description: "You can view this in the transaction list.",
			});
		} else {
			toast({
				title: "Failed to update transaction!",
				description: "Please try again later",
				variant: "destructive",
			});
		}
		setIsPendingCreateTransaction(false);
		onAfterUpdate();
		onEditModalClose();
	};

	useEffect(() => {
		if (userId) {
			getUserDefinedCategories();
		}
	}, [userId]);

	return (
		<div>
			<FormWrapper<TransactionFromData>
				formSchema={transactionFormSchema}
				defaultValues={defaultFormValues}
				onSubmit={handleSubmit}
			>
				<FormInput name="name" label="Name" placeholder="Enter transaction name" />
				<FormInput
					type="number"
					name="amount"
					label="Amount"
					placeholder="Enter transaction amount"
				/>
				<FormSelect
					label="Type"
					name="type"
					placeholder="Select transaction type"
					items={[
						{ label: "Income", value: "Income" },
						{ label: "Expense", value: "Expense" },
					]}
				/>
				<FormDatePicker name="date" label="Transaction Date" />
				<FormComboBox
					name="category"
					label="Category"
					placeholder="Select transaction category"
					noItemsFoundText="No Category Found."
					searchPlaceholder="Search Category"
					items={categories}
					onAddNewItem={item => {
						setCategories(prev => {
							prev.push(item);
							newCategories.push(item);
							return prev;
						});
					}}
				/>
				<FormInput name="note" label="Note" placeholder="Take notes about this transaction" />
				<div className="flex justify-end">
					<Button type="submit" disabled={isPendingCreateTransaction}>
						{isPendingCreateTransaction ? (
							<Loader2Icon className="animate-spin" />
						) : (
							<PlusIcon className="h-4 w-4" />
						)}
						{isPendingCreateTransaction ? "Please wait..." : "Edit Transaction"}
					</Button>
				</div>
			</FormWrapper>
		</div>
	);
}

export default EditTransactionModal;
