import React from "react";
import { ModeToggle } from "./mode-toggle";
import ProfileMenu from "./profile-menu";
import { SidebarTrigger } from "@/components/ui/sidebar";

function Header() {
	return (
		<div className="flex justify-between items-center py-4 px-24">
			<div className="flex items-center gap-2">
				<SidebarTrigger />
				Expenny
			</div>
			<div className="flex gap-10 items-center">
				<ProfileMenu />
				<ModeToggle />
			</div>
		</div>
	);
}

export default Header;
