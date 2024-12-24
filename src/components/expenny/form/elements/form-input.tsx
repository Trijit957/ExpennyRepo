import React, { useEffect } from "react";
import { useFormContext } from "react-hook-form";
import { useFormSchema } from "../hooks/useFormSchema";
import { FormControl, FormField } from "@/components/ui/form";
import FieldContainer from "../fields/field-container";
import { cn } from "@/lib/utils";
import FieldLabel from "../fields/field-label";
import { Input } from "@/components/ui/input";
import FieldError from "../fields/field-error";

interface FormInputProps extends React.InputHTMLAttributes<HTMLInputElement | HTMLTextAreaElement> {
	label: string;
	placeholder: string;
	name: string;
	onFieldChange?: (value: string) => void;
	containerClassName?: string;
	labelClassName?: string;
	errorClassName?: string;
	inputClassName?: string;
}

function FormInput({
	label,
	placeholder,
	name,
	onFieldChange,
	containerClassName,
	labelClassName,
	errorClassName,
	inputClassName,
	...props
}: FormInputProps) {
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
					<FormControl>
						<Input
							className={cn(
								"!mt-0",
								!!inputClassName && inputClassName,
								fieldState.error && "border-red-500"
							)}
							placeholder={placeholder}
							{...field}
							{...props}
						/>
					</FormControl>
					<FieldError fieldErrorClassName={errorClassName} />
				</FieldContainer>
			)}
		/>
	);
}

export default FormInput;
