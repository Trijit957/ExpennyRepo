import React from "react";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { format } from "date-fns";
import TabsLayout from "../tabs-layout/tabs-layout";
import TransactionLineChart from "./transaction-line-chart";
import TransactionBarChart from "./transaction-bar-chart";

interface BaseTransactionChartData {
  income: number;
  expense: number;
}
export interface TransactionChartData extends BaseTransactionChartData {
  date: string;
}

export interface MonthWiseTransactionChartData
  extends BaseTransactionChartData {
  monthYear: string;
}
interface TransactionChartProps {
  chartData: TransactionChartData[];
  monthWiseTransactionChartData: MonthWiseTransactionChartData[];
  date: {
    from: Date;
    to: Date;
  };
}

function TransactionChart({
  chartData,
  monthWiseTransactionChartData,
  date: { from, to },
}: TransactionChartProps) {
  return (
    <Card className="relative">
      <CardHeader>
        <CardTitle className="mb-2">Transaction overview</CardTitle>
        <CardDescription>
          {format(from, "dd-MMM-yyyy")} to {format(to, "dd-MMM-yyyy")}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <TabsLayout
          tabsClassName="mt-5"
          tabListClassName="w-[200px] absolute top-[14px] right-[24px]"
          tabInfo={[
            {
              label: "Daily",
              value: "daily",
              component: <TransactionLineChart chartData={chartData} />,
            },
            {
              label: "Monthly",
              value: "monthly",
              component: (
                <TransactionBarChart
                  chartData={monthWiseTransactionChartData}
                />
              ),
            },
          ]}
        />
      </CardContent>
      <CardFooter>
        <div className="flex w-full items-start gap-2 text-sm">footer</div>
      </CardFooter>
    </Card>
  );
}

export default TransactionChart;
