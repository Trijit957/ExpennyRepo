import React, { useEffect } from "react";
import { useFormContext } from "react-hook-form";
import { useFormSchema } from "../hooks/useFormSchema";
import { FormControl, FormField } from "@/components/ui/form";
import FieldContainer from "../fields/field-container";
import { cn } from "@/lib/utils";
import FieldLabel from "../fields/field-label";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import FieldError from "../fields/field-error";

interface SelectItemContent {
	label: string;
	value: string;
}

interface FormSelectProps {
	name: string;
	label: string;
	placeholder: string;
	items: SelectItemContent[];
	onFieldChange?: (value: string) => void;
	containerClassName?: string;
	labelClassName?: string;
	errorClassName?: string;
	selectTriggerClassName?: string;
}

function FormSelect({
	name,
	label,
	placeholder,
	items,
	onFieldChange,
	containerClassName,
	labelClassName,
	errorClassName,
	selectTriggerClassName,
}: FormSelectProps) {
	const { control } = useFormContext();
	const {
		form: { watch },
		formSchema,
	} = useFormSchema();

	const watchedField = watch(name);

	useEffect(() => {
		onFieldChange?.(watchedField);
	}, [onFieldChange, watchedField]);

	return (
		<FormField
			control={control}
			name={name}
			render={({ field, fieldState }) => (
				<FieldContainer fieldContainerClassName={cn(!!containerClassName && containerClassName)}>
					<FieldLabel
						label={label}
						labelClassName={cn(!!labelClassName && labelClassName)}
						required={!formSchema.shape[field.name]?.isOptional()}
					/>
					<Select onValueChange={field.onChange} defaultValue={field.value}>
						<FormControl>
							<SelectTrigger
								className={cn(
									"!mt-0",
									fieldState.error && "border-red-500",
									!!selectTriggerClassName && selectTriggerClassName
								)}
							>
								<SelectValue placeholder={placeholder} />
							</SelectTrigger>
						</FormControl>
						<SelectContent>
							{items.map(({ label, value }, index) => (
								<SelectItem key={index} value={value}>
									{label}
								</SelectItem>
							))}
						</SelectContent>
					</Select>
					<FieldError fieldErrorClassName={errorClassName} />
				</FieldContainer>
			)}
		/>
	);
}

export default FormSelect;
