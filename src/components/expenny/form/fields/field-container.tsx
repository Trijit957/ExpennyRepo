import { FormItem } from "@/components/ui/form";
import { cn } from "@/lib/utils";
import React, { ReactNode } from "react";

interface FieldContainerProps {
	children: ReactNode;
	fieldContainerClassName?: string;
}

function FieldContainer({ children, fieldContainerClassName }: FieldContainerProps) {
	return (
		<FormItem
			className={cn(
				"flex w-full flex-col gap-2",
				!!fieldContainerClassName && fieldContainerClassName
			)}
		>
			{children}
		</FormItem>
	);
}

export default FieldContainer;
