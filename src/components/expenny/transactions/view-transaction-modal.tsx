import { Transaction } from "@/globals/type";
import { format } from "date-fns";
import React from "react";

interface ViewTrasacntionModalProps {
	transaction: Transaction;
}

function ViewTransactionModal({ transaction }: ViewTrasacntionModalProps) {
	return (
		<div className="flex flex-col gap-4">
			<div className="flex items-center justify-between">
				<span className="text-neutral-500 text-[14px]">Name: </span>
				<span className="font-bold text-[16px]">{transaction.name}</span>
			</div>

			<div className="flex items-center justify-between">
				<span className="text-neutral-500 text-[14px]">Amount: </span>
				<span className="font-bold text-[16px]">₹ {transaction.amount}</span>
			</div>

			<div className="flex items-center justify-between">
				<span className="text-neutral-500 text-[14px]">Type: </span>
				<span className="font-bold text-[16px]">{transaction.type}</span>
			</div>

			<div className="flex items-center justify-between">
				<span className="text-neutral-500 text-[14px]">Date: </span>
				<span className="font-bold text-[16px]">{format(transaction.date, "dd-MMM-yyyy")}</span>
			</div>

			<div className="flex items-center justify-between">
				<span className="text-neutral-500 text-[14px]">Category: </span>
				<span className="font-bold text-[16px]">{transaction.category}</span>
			</div>

			<div className="flex flex-col gap-2">
				<span className="text-neutral-500 text-[14px]">Note: </span>
				<span className="border p-2 rounded border-neutral-200 text-[16px]">
					{transaction.note}
				</span>
			</div>
		</div>
	);
}

export default ViewTransactionModal;
