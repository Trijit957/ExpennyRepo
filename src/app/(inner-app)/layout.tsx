"use client";

import Header from "@/components/expenny/header/header";
import { SidebarProvider } from "@/components/ui/sidebar";
import { ReactChildren } from "@/globals/type";
import dynamic from "next/dynamic";
import React from "react";

const AppSidebar = dynamic(() => import("@/components/expenny/sidebar/app-sidebar"), {
	ssr: false,
});

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
