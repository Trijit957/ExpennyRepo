"use client";

import React, { useEffect, useState } from "react";
import { AgGridReact, AgGridReactProps } from "ag-grid-react";
import {
	ClientSideRowModelModule,
	ColDef,
	Theme as DataTableTheme,
	DateFilterModule,
	NumberFilterModule,
	PaginationModule,
	TextFilterModule,
	colorSchemeDarkBlue,
	colorSchemeLightCold,
} from "ag-grid-community";
import { themeQuartz } from "ag-grid-community";
import { ModuleRegistry } from "ag-grid-community";

import { useTheme } from "next-themes";
import { Theme } from "@/providers/theme-provider";

ModuleRegistry.registerModules([
	ClientSideRowModelModule,
	PaginationModule,
	NumberFilterModule,
	TextFilterModule,
	DateFilterModule,
]);

interface DataTableProps<TRowData> extends AgGridReactProps {
	rowData: TRowData[];
	columnDefs: ColDef<TRowData>[];
}

export interface ColumnDef<TRowData> extends ColDef<TRowData> {}

function DataTable<TRowData>({ rowData, columnDefs, ...props }: DataTableProps<TRowData>) {
	const { theme } = useTheme();
	const [dataTableTheme, setDataTableTheme] = useState<DataTableTheme>();

	useEffect(() => {
		const dataTableTheme =
			theme === Theme.LIGHT
				? themeQuartz.withPart(colorSchemeLightCold)
				: theme === Theme.DARK
				? themeQuartz.withPart(colorSchemeDarkBlue)
				: themeQuartz.withPart(colorSchemeLightCold);

		setDataTableTheme(dataTableTheme);
	}, [theme]);

	return (
		<div style={{ height: 600 }}>
			<AgGridReact<TRowData>
				theme={dataTableTheme}
				rowData={rowData}
				columnDefs={columnDefs}
				{...props}
			/>
		</div>
	);
}

export default DataTable;
