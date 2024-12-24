import { Separator } from "@/components/ui/separator";
import React, { JSX, ReactNode } from "react";

interface ContainerLayoutProps {
	pageTitle: string;
	pageSubTitle?: string;
	topRowButtonComp?: JSX.Element;
	children: ReactNode;
}

function ContainerLayout({
	pageTitle,
	pageSubTitle,
	topRowButtonComp,
	children,
}: ContainerLayoutProps) {
	return (
		<div>
			<div className="flex justify-between items-center">
				<div className="flex flex-col">
					<span className="text-3xl font-bold">{pageTitle}</span>
					<span className="text-gray-400 text-[14px]">{pageSubTitle}</span>
				</div>
				<div>{topRowButtonComp}</div>
			</div>
			<Separator className="my-2" />
			{children}
		</div>
	);
}

export default ContainerLayout;
