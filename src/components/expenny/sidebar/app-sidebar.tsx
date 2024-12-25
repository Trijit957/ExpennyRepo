"use client";

import React from "react";
import {
	Sidebar,
	SidebarContent,
	SidebarFooter,
	SidebarGroup,
	SidebarGroupContent,
	SidebarGroupLabel,
	SidebarHeader,
	SidebarMenu,
	SidebarMenuButton,
	SidebarMenuItem,
} from "@/components/ui/sidebar";
import { HomeIcon, LayoutDashboardIcon, WalletIcon } from "lucide-react";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { useTheme } from "next-themes";
import { Theme } from "@/providers/theme-provider";
import Link from "next/link";

const items = [
	{
		title: "Dashboard",
		url: "/dashboard",
		icon: LayoutDashboardIcon,
	},
	{
		title: "Transactions",
		url: "/transactions",
		icon: WalletIcon,
	},
];

function AppSidebar() {
	const pathname = usePathname();
	const { theme } = useTheme();
	console.log("pathname", pathname);
	return (
		<Sidebar>
			<SidebarHeader />
			<SidebarContent>
				<SidebarGroup>
					<SidebarGroupLabel>Expenny</SidebarGroupLabel>
					<SidebarGroupContent>
						<SidebarMenu>
							{items.map(item => (
								<SidebarMenuItem key={item.title}>
									<SidebarMenuButton asChild>
										<Link
											href={item.url}
											className={cn({
												"bg-slate-200": pathname.startsWith(item.url) && theme === Theme.LIGHT,
												"bg-slate-700": pathname.startsWith(item.url) && theme === Theme.DARK,
											})}
										>
											<item.icon />
											<span>{item.title}</span>
										</Link>
									</SidebarMenuButton>
								</SidebarMenuItem>
							))}
						</SidebarMenu>
					</SidebarGroupContent>
				</SidebarGroup>
			</SidebarContent>
			<SidebarFooter />
		</Sidebar>
	);
}

export default AppSidebar;
