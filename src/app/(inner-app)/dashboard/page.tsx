"use client";

import { getTransactionsByDate } from "@/actions/transaction-action";
import TransactionChart, {
  TransactionChartData,
} from "@/components/expenny/charts/transaction-chart";
import ContainerLayout from "@/components/expenny/container-layout/container-layout";
import DashboardCard, {
  TransactionData,
} from "@/components/expenny/dashboard-card/dashboard-card";
import { DatePickerWithRange } from "@/components/expenny/date-picker/date-picker";
import { FinanceType, Transaction, TransactionTypeEnum } from "@/globals/type";
import { useUser } from "@clerk/nextjs";
import { addDays, format } from "date-fns";
import React, { useEffect, useState } from "react";
import { DateRange } from "react-day-picker";

function Dashboard() {
  const { user } = useUser();
  const [transactionsByDate, setTransactionsByDate] = useState<Transaction[]>(
    []
  );
  const [dateRange, setDateRange] = React.useState<DateRange | undefined>({
    from: new Date(2024, 11, 1),
    to: addDays(new Date(2025, 11, 31), 0),
  });
  const [totalDays, setTotalDays] = useState<number>(0);
  const [transactionData, setTransactionData] = useState<TransactionData[]>([]);
  const [transactionChartData, setTransactionChartData] = useState<
    TransactionChartData[]
  >([]);

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
    const incomeTransactions = transactionsByDate.filter(
      (transaction) => transaction.type === TransactionTypeEnum.INCOME
    );
    const incomeTransactionCount = incomeTransactions.length;
    const totalIncome = incomeTransactions
      .map((incomeTransaction) => incomeTransaction.amount)
      .reduce((accu, curr) => accu + curr, 0);
    const incomeDescription = `${incomeTransactionCount} income transactions`;

    const expenseTransactions = transactionsByDate.filter(
      (transaction) => transaction.type === TransactionTypeEnum.EXPENSE
    );
    const expenseTransactionCount = expenseTransactions.length;
    const totalExpense = expenseTransactions
      .map((incomeTransaction) => incomeTransaction.amount)
      .reduce((accu, curr) => accu + curr, 0);
    const expenseDescription = `${expenseTransactionCount} expense transactions`;

    const totalSavings = totalIncome - totalExpense;
    const savingsDescription = `${totalSavings > 0 ? "+" : "-"}${(
      totalSavings / totalDays
    ).toFixed(2)} per day (in ${totalDays} days)`;

    const totalTransactions = transactionsByDate?.length;
    const totalTransactionValue = totalIncome + totalExpense;
    const incomePercentage = (
      (totalIncome / totalTransactionValue) *
      100
    ).toFixed(2);
    const expensePercentage = (
      (totalExpense / totalTransactionValue) *
      100
    ).toFixed(2);
    const transactionDescription = `Income: ${incomePercentage}%, Expense: ${expensePercentage}%`;

    setTransactionData([
      {
        type: FinanceType.INCOME,
        amount: totalIncome,
        description: incomeDescription,
      },
      {
        type: FinanceType.EXPENSE,
        amount: totalExpense,
        description: expenseDescription,
      },
      {
        type: FinanceType.SAVINGS,
        amount: totalSavings,
        description: savingsDescription,
      },
      {
        type: FinanceType.TRANSACTIONS,
        amount: totalTransactions,
        description: transactionDescription,
      },
    ]);
  };

  const countTotalDays = () => {
    if (dateRange?.from && dateRange?.to) {
      const timeDifference = dateRange.to.getTime() - dateRange.from.getTime();
      const daysDifference = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
      console.log("days", daysDifference);
      setTotalDays(daysDifference);
    }
  };

  const createTransactionChartInfo = () => {
    let chartData: TransactionChartData[] = [];
    transactionsByDate.forEach((transaction) => {
      chartData.push({
        date: format(transaction.date, "dd/MM/yyyy"),
        income:
          transaction.type === TransactionTypeEnum.INCOME
            ? transaction.amount
            : 0,
        expense:
          transaction.type === TransactionTypeEnum.EXPENSE
            ? transaction.amount
            : 0,
      });
    });
    console.log("chartData", chartData);
    setTransactionChartData(chartData);
  };

  useEffect(() => {
    console.log("dateRange", dateRange);
    if (user && dateRange?.from && dateRange?.to) {
      countTotalDays();
      getTransactions();
    }
  }, [dateRange, user]);

  useEffect(() => {
    if (transactionsByDate?.length) {
      processTransactions();
      createTransactionChartInfo();
    }
  }, [transactionsByDate]);

  return (
    <ContainerLayout
      pageTitle={`Hi, Welcome back ${user?.firstName} ${user?.lastName} 👋`}
    >
      <div className="flex flex-col gap-5">
        <div className="flex justify-end pt-5">
          <DatePickerWithRange
            dateRange={dateRange}
            setDateRange={setDateRange}
          />
        </div>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {transactionData?.length > 0 &&
            transactionData.map((transaction, i) => {
              return (
                <DashboardCard
                  key={`${transaction.type}-${i}`}
                  transaction={transaction}
                />
              );
            })}
        </div>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-7">
          <div className="col-span-4">
            {transactionChartData?.length > 0 && (
              <TransactionChart chartData={transactionChartData} />
            )}
          </div>
          <div className="col-span-4 xl:col-span-3">hello</div>
        </div>
      </div>
    </ContainerLayout>
  );
}

export default Dashboard;
