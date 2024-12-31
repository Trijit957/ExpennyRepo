"use client";

import { getTransactionsByDate } from "@/actions/transaction-action";
import ContainerLayout from "@/components/expenny/container-layout/container-layout";
import DashboardCard from "@/components/expenny/dashboard-card/dashboard-card";
import { DatePickerWithRange } from "@/components/expenny/date-picker/date-picker";
import { FinanceType, Transaction } from "@/globals/type";
import { useUser } from "@clerk/nextjs";
import { addDays } from "date-fns";
import React, { useEffect, useState } from "react";
import { DateRange } from "react-day-picker";

function Dashboard() {
	const { user } = useUser();
	const [transactionsByDate, setTransactionsByDate] = useState<Transaction[]>([]);
	const [dateRange, setDateRange] = React.useState<DateRange | undefined>({
		from: new Date(2024, 11, 1),
		to: addDays(new Date(2025, 11, 31), 0),
	});
	const [transactionData, setTransactionData] = useState({
		income: {
			amount: null!,
			count: null!,
		},
	});

	const getTransactions = async () => {
		const response = await getTransactionsByDate(
			user?.id!,
			dateRange?.from?.toISOString()!,
			dateRange?.to?.toISOString()!
		);
		console.log("response", response);
		setTransactionsByDate(response?.documents as unknown as Transaction[]);
	};

	const processTransactions = () => {
		if (transactionsByDate?.length) {
		}
	};

	useEffect(() => {
		console.log("dateRange", dateRange);
		if (user && dateRange) {
			getTransactions();
		}
	}, [dateRange, user]);

	return (
		<ContainerLayout pageTitle={`Hi, Welcome back ${user?.firstName} ${user?.lastName} 👋`}>
			<div className="flex flex-col gap-5">
				<div className="flex justify-end pt-5">
					<DatePickerWithRange dateRange={dateRange} setDateRange={setDateRange} />
				</div>
				<div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
					<DashboardCard financeType={FinanceType.INCOME} infoText={"4 income transactions"} />
					<DashboardCard financeType={FinanceType.EXPENSE} infoText={"2 expense transactions"} />
					<DashboardCard financeType={FinanceType.SAVINGS} infoText={"4 income transactions"} />
					<DashboardCard
						financeType={FinanceType.TRANSACTIONS}
						infoText={"4 income transactions"}
					/>
				</div>
			</div>
		</ContainerLayout>
	);
}

export default Dashboard;
