import React, { JSX } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { cn } from "@/lib/utils";

interface TabsLayoutProps {
	tabInfo: Tab[];
	tabsClassName?: string;
	tabListClassName?: string;
}

interface Tab {
	label: string;
	value: string;
	component: JSX.Element;
}

function TabsLayout({ tabInfo, tabsClassName, tabListClassName }: TabsLayoutProps) {
	return (
		<Tabs defaultValue={tabInfo[0].value} className={cn(!!tabsClassName && tabsClassName)}>
			<TabsList className={cn("w-full", !!tabListClassName && tabListClassName)}>
				{tabInfo.map(tab => {
					return (
						<TabsTrigger className="flex-1" key={tab.value} value={tab.value}>
							{tab.label}
						</TabsTrigger>
					);
				})}
			</TabsList>
			{tabInfo.map(tab => {
				return (
					<TabsContent key={tab.value} value={tab.value}>
						{tab.component}
					</TabsContent>
				);
			})}
		</Tabs>
	);
}

export default TabsLayout;
