import {ReactNode} from "react";

export type ReactChildren = {
    children: ReactNode;
};

export enum TransactionTypeEnum {
    INCOME = "Income",
    EXPENSE = "Expense",
}

export interface Transaction {
    $id?: string;
    $createdAt?: string;
    name: string;
    amount: number;
    type: TransactionTypeEnum;
    date: string;
    category: string;
    note: string;
    user_id?: string;
}

export interface Category {
    $id?: string;
    $createdAt?: string;
    user_id?: string;
    name: string;
}

export enum FinanceType {
    INCOME = "income",
    EXPENSE = "expense",
    SAVINGS = "savings",
    TRANSACTIONS = "transactions",
}
