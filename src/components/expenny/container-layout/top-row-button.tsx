import { Button } from "@/components/ui/button";
import React, { JSX } from "react";

interface TopRowButtonProps {
	label: string;
	onClick: () => void;
	icon: JSX.Element;
}

function TopRowButton({ label, icon, onClick }: TopRowButtonProps) {
	return (
		<Button onClick={onClick}>
			{icon}
			{label}
		</Button>
	);
}

export default TopRowButton;
