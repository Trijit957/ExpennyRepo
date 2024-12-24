"use client";

import { getTransactions } from "@/actions/transaction-action";
import ContainerLayout from "@/components/expenny/container-layout/container-layout";
import TopRowButton from "@/components/expenny/container-layout/top-row-button";
import DataTable, { ColumnDef } from "@/components/expenny/data-table/data-table";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Transaction } from "@/globals/type";
import { useAuth } from "@clerk/nextjs";
import { format } from "date-fns";
import { Edit3Icon, PlusIcon, Trash2Icon, ViewIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

function Transactions() {
	const { userId } = useAuth();
	const { push } = useRouter();
	const [transactions, setTransactions] = useState<Transaction[]>([]);

	const columnDefs: ColumnDef<Transaction>[] = [
		{
			headerName: "Name",
			field: "name",
			flex: 1,
			filter: true,
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
			// valueGetter: ({ data }) => format(data?.date ?? "", "yyyy-mm-dd"),
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
			cellRenderer: () => {
				return (
					<div className="p-4 flex justify-center items-center gap-4">
						{/* <Button> */}
						<ViewIcon className="cursor-pointer h-4 w-4" />
						{/* </Button> */}
						{/* <Button> */}
						<Edit3Icon className="cursor-pointer h-4 w-4" />
						{/* </Button> */}
						{/* <Button> */}
						<Trash2Icon className=" cursor-pointer h-4 w-4" />
						{/* </Button> */}
					</div>
				);
			},
		},
	];

	const getAllTransactions = async () => {
		const response = await getTransactions(userId!);
		console.log("response", response);
		if (response?.documents.length) {
			setTransactions(response.documents as unknown as Transaction[]);
		}
	};

	useEffect(() => {
		if (userId) {
			getAllTransactions();
		}
	}, [userId]);

	return (
		<ContainerLayout
			pageTitle="Transactions"
			pageSubTitle="Filtering transactions from 2023-11-17 to 2024-11-17"
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
				<DataTable<Transaction> rowData={transactions} columnDefs={columnDefs} pagination />
			</div>
		</ContainerLayout>
	);
}

export default Transactions;
