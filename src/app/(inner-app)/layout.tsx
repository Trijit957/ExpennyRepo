import Header from "@/components/expenny/header/header";
import AppSidebar from "@/components/expenny/sidebar/app-sidebar";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { ReactChildren } from "@/globals/type";
import React from "react";

function InnerAppLayout({ children }: ReactChildren) {
	return (
		<SidebarProvider>
			<AppSidebar />
			<main className="w-full">
				<Header />
				<div className="p-6">{children}</div>
			</main>
		</SidebarProvider>
	);
}

export default InnerAppLayout;
