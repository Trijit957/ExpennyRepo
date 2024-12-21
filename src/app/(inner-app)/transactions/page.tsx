// import DataTable from "@/components/expenny/data-table/data-table";
"use client";

import DataTable, { ColumnDef } from "@/components/expenny/data-table/data-table";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { PlusIcon } from "lucide-react";
import dynamic from "next/dynamic";
import React, { use, useState } from "react";

// const DataTable = dynamic(() => import("@/components/expenny/data-table/data-table"), {
// 	ssr: false,
// });

interface Transaction {
	id: string;
	name: string;
	amount: number;
	type: string;
	date: string;
	category: string;
	note: string;
}

function Transactions() {
	const [transactions, setTransactions] = useState<Transaction[]>([
		{
			id: "1",
			name: "birthday treat!",
			amount: 6000,
			type: "Expense",
			date: "19/12/2024",
			category: "food",
			note: "It was a great day!",
		},
		{
			id: "2",
			name: "birthday treat!",
			amount: 6000,
			type: "Expense",
			date: "18/12/2024",
			category: "food",
			note: "It was a great day!",
		},
		{
			id: "3",
			name: "birthday treat!",
			amount: 6000,
			type: "Expense",
			date: "17/12/2024",
			category: "food",
			note: "It was a great day!",
		},
		{
			id: "4",
			name: "birthday treat!",
			amount: 6000,
			type: "Expense",
			date: "16/12/2024",
			category: "food",
			note: "It was a great day!",
		},
		{
			id: "5",
			name: "birthday treat!",
			amount: 6000,
			type: "Expense",
			date: "15/12/2024",
			category: "food",
			note: "It was a great day!",
		},
	]);

	const columnDefs: ColumnDef<Transaction>[] = [
		{
			headerName: "Name",
			field: "name",
			flex: 1,
		},
		{
			headerName: "Amount",
			field: "amount",
			flex: 1,
		},
		{
			headerName: "Type",
			field: "type",
			flex: 1,
		},
		{
			headerName: "Date",
			field: "date",
			flex: 1,
		},
		{
			headerName: "Category",
			field: "category",
			flex: 1,
		},
		{
			headerName: "Note",
			field: "note",
			flex: 1,
		},
	];
	return (
		<div>
			<div className="flex justify-between items-center">
				<div className="flex flex-col">
					<span className="text-3xl font-bold">Transactions</span>
					<span className="text-gray-400 text-[14px]">
						Filtering transactions from 2023-11-17 to 2024-11-17
					</span>
				</div>
				<div>
					<Button>
						<PlusIcon />
						Add Transactions
					</Button>
				</div>
			</div>
			<Separator className="my-2" />
			<div>
				<DataTable<Transaction> rowData={transactions} columnDefs={columnDefs} />
			</div>
		</div>
	);
}

export default Transactions;
