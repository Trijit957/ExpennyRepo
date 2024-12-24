import { FormControl, FormField } from "@/components/ui/form";
import React, { useEffect } from "react";
import { useFormContext } from "react-hook-form";
import { useFormSchema } from "../hooks/useFormSchema";
import FieldError from "../fields/field-error";
import FieldContainer from "../fields/field-container";
import { cn } from "@/lib/utils";
import FieldLabel from "../fields/field-label";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { CalendarIcon } from "lucide-react";
import { Calendar } from "@/components/ui/calendar";
import { format } from "date-fns";

interface FormDatePickerProps {
	name: string;
	label: string;
	onFieldChange?: (value: string) => void;
	containerClassName?: string;
	labelClassName?: string;
	errorClassName?: string;
}

function FormDatePicker({
	name,
	label,
	onFieldChange,
	containerClassName,
	labelClassName,
	errorClassName,
}: FormDatePickerProps) {
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
			render={({ field }) => (
				<FieldContainer fieldContainerClassName={cn(!!containerClassName && containerClassName)}>
					<FieldLabel
						label={label}
						labelClassName={cn(!!labelClassName && labelClassName)}
						required={!formSchema.shape[field.name]?.isOptional()}
					/>
					<Popover>
						<PopoverTrigger asChild>
							<FormControl>
								<Button
									variant={"outline"}
									className={cn(
										"!mt-0 pl-3 text-left font-normal",
										!field.value && "text-muted-foreground"
									)}
								>
									{field.value ? format(field.value, "PPP") : <span>Pick a date</span>}
									<CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
								</Button>
							</FormControl>
						</PopoverTrigger>
						<PopoverContent className="w-auto p-0" align="start">
							<Calendar
								mode="single"
								selected={field.value}
								onSelect={field.onChange}
								disabled={date => date > new Date() || date < new Date("1900-01-01")}
								initialFocus
							/>
						</PopoverContent>
					</Popover>
					<FieldError fieldErrorClassName={errorClassName} />
				</FieldContainer>
			)}
		/>
	);
}

export default FormDatePicker;
