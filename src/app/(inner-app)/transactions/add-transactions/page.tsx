"use client";

import ContainerLayout from "@/components/expenny/container-layout/container-layout";
import TopRowButton from "@/components/expenny/container-layout/top-row-button";
import AddTransactionLayout from "@/components/expenny/transactions/add-transaction-layout";
import { Undo2Icon } from "lucide-react";
import { useRouter } from "next/navigation";
import React from "react";

function AddTransactions() {
	const { push } = useRouter();
	return (
		<ContainerLayout
			pageTitle="Add transactions"
			pageSubTitle="Add transactions autommatically via CSV or manually"
			topRowButtonComp={
				<TopRowButton
					label="Go back to list"
					icon={<Undo2Icon />}
					onClick={() => {
						push("/transactions");
					}}
				/>
			}
		>
			<div>
				<AddTransactionLayout />
			</div>
		</ContainerLayout>
	);
}

export default AddTransactions;
