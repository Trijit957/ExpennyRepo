import { FinanceType } from "@/globals/type";
import { cn } from "@/lib/utils";
import {
  CreditCardIcon,
  DollarSignIcon,
  PiggyBankIcon,
  Repeat2Icon,
} from "lucide-react";
import React, { JSX } from "react";

export interface TransactionData {
  type: FinanceType;
  amount: number;
  description: string;
}

interface DashboardCardProps {
  transaction: TransactionData;
}

const financeCardMappingObject: Record<
  FinanceType,
  { label: string; icon: JSX.Element }
> = {
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

function DashboardCard({
  transaction: { amount, type, description },
}: DashboardCardProps) {
  return (
    <div className="rounded-xl border border-neutral-500 p-5">
      <div className="flex justify-between items-center">
        <span className="text-[14px]">
          {financeCardMappingObject[type].label}
        </span>
        {financeCardMappingObject[type].icon}
      </div>
      <div className="flex flex-col gap-2">
        {type === FinanceType.TRANSACTIONS ? (
          <span className="text-2xl font-bold">{amount}</span>
        ) : (
          <span
            className={cn(
              "text-2xl font-bold",
              amount > 0 ? "text-green-600" : "text-red-500"
            )}
          >
            {amount > 0 ? "+" : "-"}
            {amount}₹
          </span>
        )}
        <span className="text-xs text-muted-foreground text-ellipsis whitespace-nowrap overflow-hidden">
          {description}
        </span>
      </div>
    </div>
  );
}

export default DashboardCard;
