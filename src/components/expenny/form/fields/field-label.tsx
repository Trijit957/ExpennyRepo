import { FormLabel } from "@/components/ui/form";
import { cn } from "@/lib/utils";
import React from "react";

interface FieldLabelProps {
	label: string;
	labelClassName?: string;
	required?: boolean;
}

function FieldLabel({ label, labelClassName, required = true }: FieldLabelProps) {
	return (
		<FormLabel className={cn("text-[14px]", !!labelClassName && labelClassName)}>
			<span className="font-bold">{label}</span>
			{required && <span className="pl-1 text-red-500">*</span>}
		</FormLabel>
	);
}

export default FieldLabel;
