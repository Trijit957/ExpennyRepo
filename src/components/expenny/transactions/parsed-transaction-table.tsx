import { Transaction } from "@/globals/type";
import { format } from "date-fns";
import React from "react";

interface ParsedTransactionTableProps {
	parsedTransactionData: Transaction[];
}

function ParsedTransactionTable({ parsedTransactionData }: ParsedTransactionTableProps) {
	return (
		<table className="w-full border-collapse border border-gray-200 dark:border-gray-700">
			<thead className="bg-gray-100 dark:bg-gray-700">
				<tr>
					<th className="px-4 py-2 text-left border-b border-gray-200 dark:border-gray-700 text-gray-900 dark:text-gray-100">
						Name
					</th>
					<th className="px-4 py-2 text-left border-b border-gray-200 dark:border-gray-700 text-gray-900 dark:text-gray-100">
						Amount
					</th>
					<th className="px-4 py-2 text-left border-b border-gray-200 dark:border-gray-700 text-gray-900 dark:text-gray-100">
						Type
					</th>
					<th className="px-4 py-2 text-left border-b border-gray-200 dark:border-gray-700 text-gray-900 dark:text-gray-100">
						Date
					</th>
					<th className="px-4 py-2 text-left border-b border-gray-200 dark:border-gray-700 text-gray-900 dark:text-gray-100">
						Category
					</th>
					<th className="px-4 py-2 text-left border-b border-gray-200 dark:border-gray-700 text-gray-900 dark:text-gray-100">
						Note
					</th>
				</tr>
			</thead>
			<tbody>
				{parsedTransactionData.map((transaction, index) => (
					<tr
						key={index}
						className={`${
							index % 2 === 0 ? "bg-gray-50 dark:bg-gray-900" : "bg-white dark:bg-gray-800"
						}`}
					>
						<td className="px-4 py-2 border-b border-gray-200 dark:border-gray-700 text-gray-900 dark:text-gray-100">
							{transaction.name}
						</td>
						<td className="px-4 py-2 border-b border-gray-200 dark:border-gray-700 text-gray-900 dark:text-gray-100">
							{transaction.amount}
						</td>
						<td
							className={`px-4 py-2 border-b border-gray-200 dark:border-gray-700 ${
								transaction.type === "Income"
									? "text-green-600 dark:text-green-400"
									: "text-red-600 dark:text-red-400"
							}`}
						>
							{transaction.type}
						</td>
						<td className="px-4 py-2 border-b border-gray-200 dark:border-gray-700 text-gray-900 dark:text-gray-100">
							{format(transaction.date, "dd-MMM-yyyy")}
						</td>
						<td className="px-4 py-2 border-b border-gray-200 dark:border-gray-700 text-gray-900 dark:text-gray-100">
							{transaction.category}
						</td>
						<td className="px-4 py-2 border-b border-gray-200 dark:border-gray-700 text-gray-900 dark:text-gray-100">
							{transaction.note}
						</td>
					</tr>
				))}
			</tbody>
		</table>
	);
}

export default ParsedTransactionTable;
