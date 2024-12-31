import { FinanceType } from "@/globals/type";
import { CreditCardIcon, DollarSignIcon, PiggyBankIcon, Repeat2Icon } from "lucide-react";
import React, { JSX } from "react";

interface DashboardCardProps {
	financeType: FinanceType;
	infoText: string;
}

const financeCardMappingObject: Record<FinanceType, { label: string; icon: JSX.Element }> = {
	[FinanceType.INCOME]: {
		label: "Incomes in this period",
		icon: <DollarSignIcon />,
	},
	[FinanceType.EXPENSE]: {
		label: "Expenses in this period",
		icon: <CreditCardIcon />,
	},
	[FinanceType.SAVINGS]: {
		label: "Net savings in this period",
		icon: <PiggyBankIcon />,
	},
	[FinanceType.TRANSACTIONS]: {
		label: "Transactions in this period",
		icon: <Repeat2Icon />,
	},
};

function DashboardCard({ financeType, infoText }: DashboardCardProps) {
	return (
		<div className="rounded-xl border border-neutral-500 p-5">
			<div className="flex justify-between items-center">
				<span className="text-[14px]">{financeCardMappingObject[financeType].label}</span>
				{financeCardMappingObject[financeType].icon}
			</div>
			<div className="flex flex-col gap-2">
				<span className="text-2xl font-bold text-green-600">+17,900₹</span>
				<span className="text-xs text-muted-foreground text-ellipsis whitespace-nowrap overflow-hidden">
					{infoText}
				</span>
			</div>
		</div>
	);
}

export default DashboardCard;
