import { ReactChildren } from "@/globals/type";
import React from "react";

function AuthLayout({ children }: ReactChildren) {
	return (
		<div className="h-screen w-full flex justify-center items-center bg-gradient-to-r from-primary to-indigo-500 via-purple-500 text-white p-6 shadow-md">
			{children}
		</div>
	);
}

export default AuthLayout;
