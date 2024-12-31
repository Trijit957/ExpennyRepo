"use client";

import { deleteTransaction, getTransactions } from "@/actions/transaction-action";
import AlertModal from "@/components/expenny/alert-modal/alert-modal";
import ContainerLayout from "@/components/expenny/container-layout/container-layout";
import TopRowButton from "@/components/expenny/container-layout/top-row-button";
import DataTable, { ColumnDef } from "@/components/expenny/data-table/data-table";
import Modal from "@/components/expenny/modal/modal";
import EditTransactionModal from "@/components/expenny/transactions/edit-transaction-modal";
import ViewTransactionModal from "@/components/expenny/transactions/view-transaction-modal";
import { Transaction } from "@/globals/type";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@clerk/nextjs";
import { format } from "date-fns";
import { Edit3Icon, PlusIcon, Trash2Icon, ViewIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

type TransactionAction = "view" | "edit" | "delete";

function Transactions() {
	const { userId } = useAuth();
	const { push } = useRouter();
	const { toast } = useToast();
	const [transactions, setTransactions] = useState<Transaction[]>([]);
	const [selectedTransaction, setSelecetedTransaction] = useState<Transaction>();
	const [transactionAction, setTransactionAction] = useState<TransactionAction>();
	const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
	const [isAlertModalOpen, setIsAlertModalOpen] = useState<boolean>(false);
	const [isTransactionListPending, setTransactionListPending] = useState<boolean>(true);

	const getAllTransactions = async () => {
		const response = await getTransactions(userId!);
		if (response?.documents.length) {
			setTransactions(response.documents as unknown as Transaction[]);
		}
		setTransactionListPending(false);
	};

	const handleTransactionAction = (transaction: Transaction, action: TransactionAction) => {
		setTransactionAction(action);
		setSelecetedTransaction(transaction);
		setIsModalOpen(true);
	};

	const handleDeleteTransaction = async (transaction: Transaction) => {
		const deleteResponse = await deleteTransaction(transaction.$id!);
		if (deleteResponse === "success") {
			getAllTransactions();
			toast({
				title: "Transaction deleted successfully!",
			});
		} else {
			toast({
				title: "Failed to delete transaction!",
				description: "Please try again later",
				variant: "destructive",
			});
		}
	};

	const columnDefs: ColumnDef<Transaction>[] = [
		{
			headerName: "Name",
			field: "name",
			flex: 1,
			filter: true,
			//width: 300,
		},
		{
			headerName: "Amount",
			field: "amount",
			flex: 1,
			filter: "agNumberColumnFilter",
			valueFormatter: ({ data }) => `₹ ${data?.amount}`,
		},
		{
			headerName: "Type",
			field: "type",
			flex: 1,
			filter: true,
			cellRenderer: ({ data }: { data: Transaction }) => {
				return (
					<span
						className={`px-4 py-2 ${
							data.type === "Income"
								? "text-green-600 dark:text-green-400"
								: "text-red-600 dark:text-red-400"
						}`}
					>
						{data.type}
					</span>
				);
			},
		},
		{
			headerName: "Date",
			field: "date",
			flex: 1,
			filter: "agDateColumnFilter",
			filterParams: {
				comparator: (filterDate: any, cellValue: any) => {
					if (cellValue == null) return -1; // Treat null values as less than the filter
					const cellDate = new Date(cellValue);
					if (cellDate < filterDate) return -1;
					if (cellDate > filterDate) return 1;
					return 0;
				},
			},
			valueFormatter: ({ data }) => format(data?.date ?? "", "dd-MMM-yyyy"),
		},
		{
			headerName: "Category",
			field: "category",
			filter: true,
			flex: 1,
		},
		{
			headerName: "Note",
			field: "note",
			filter: true,
			flex: 1,
		},
		{
			headerName: "Actions",
			flex: 1,
			cellRenderer: ({ data }: { data: Transaction }) => {
				return (
					<div className="p-4 flex justify-center items-center gap-4">
						<ViewIcon
							className="cursor-pointer h-4 w-4"
							onClick={() => handleTransactionAction(data, "view")}
						/>
						<Edit3Icon
							className="cursor-pointer h-4 w-4"
							onClick={() => handleTransactionAction(data, "edit")}
						/>
						<Trash2Icon
							className=" cursor-pointer h-4 w-4"
							onClick={() => {
								setSelecetedTransaction(data);
								setIsAlertModalOpen(true);
							}}
						/>
					</div>
				);
			},
		},
	];

	useEffect(() => {
		if (userId) {
			getAllTransactions();
		}
	}, [userId]);

	return (
		<ContainerLayout
			pageTitle="Transactions"
			pageSubTitle="Track and manage all your transactions in one place"
			topRowButtonComp={
				<TopRowButton
					label="Add Transactions"
					icon={<PlusIcon />}
					onClick={() => {
						push("/transactions/add-transactions");
					}}
				/>
			}
		>
			<div className="mt-5">
				<DataTable<Transaction>
					rowData={transactions}
					columnDefs={columnDefs}
					pagination
					loading={isTransactionListPending}
					overlayLoadingTemplate="<span class='ag-overlay-loading-center'>Loading transactions...</span>"
				/>
			</div>
			<Modal
				title={
					transactionAction === "view"
						? "View Transaction"
						: transactionAction === "edit"
						? "Edit Transaction"
						: ""
				}
				description={
					transactionAction === "view"
						? "Details of the transaction"
						: transactionAction === "edit"
						? "Update the transaction"
						: ""
				}
				isOpen={isModalOpen}
				onClose={setIsModalOpen}
			>
				{transactionAction === "view" && (
					<ViewTransactionModal transaction={selectedTransaction!} />
				)}
				{transactionAction === "edit" && (
					<EditTransactionModal
						transaction={selectedTransaction!}
						onAfterUpdate={() => getAllTransactions()}
						onEditModalClose={() => setIsModalOpen(false)}
					/>
				)}
			</Modal>
			<AlertModal
				isOpen={isAlertModalOpen}
				onClose={setIsAlertModalOpen}
				title="Are you absolutely sure?"
				description="This action cannot be undone. This will permanently delete your account
        and remove your data from our servers."
				actionText="Delete"
				onActionClick={() => handleDeleteTransaction(selectedTransaction!)}
			/>
		</ContainerLayout>
	);
}

export default Transactions;
