import { FormMessage } from "@/components/ui/form";
import { cn } from "@/lib/utils";
import React from "react";

interface FieldErrorProps {
	fieldErrorClassName?: string;
}

function FieldError({ fieldErrorClassName }: FieldErrorProps) {
	return (
		<FormMessage
			className={cn(
				"relative top-[2px] !mt-0 text-red-500 text-xs",
				!!fieldErrorClassName && fieldErrorClassName
			)}
		/>
	);
}

export default FieldError;
