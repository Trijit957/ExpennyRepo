"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import React from "react";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuGroup,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuShortcut,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { LogOutIcon } from "lucide-react";
import { useAuth, useUser } from "@clerk/nextjs";

function ProfileMenu() {
	const { user } = useUser();
	const { signOut, userId } = useAuth();
	return (
		<div>
			<DropdownMenu>
				<DropdownMenuTrigger asChild>
					<Avatar>
						<AvatarImage className="h-12 w-12 rounded-full cursor-pointer" src={user?.imageUrl} />
						<AvatarFallback className="h-12 w-12 bg-primary text-white">
							{user?.firstName?.at(0)}
							{user?.lastName?.at(0)}
						</AvatarFallback>
					</Avatar>
				</DropdownMenuTrigger>
				<DropdownMenuContent className="w-56">
					<DropdownMenuLabel>
						<div>{user?.fullName}</div>
						<div className="text-gray-400">{user?.emailAddresses[0]?.emailAddress}</div>
					</DropdownMenuLabel>
					<DropdownMenuSeparator />
					<DropdownMenuGroup>
						<DropdownMenuItem onClick={() => signOut()}>
							Logout
							<DropdownMenuShortcut>
								<LogOutIcon />
							</DropdownMenuShortcut>
						</DropdownMenuItem>
					</DropdownMenuGroup>
				</DropdownMenuContent>
			</DropdownMenu>
		</div>
	);
}

export default ProfileMenu;
