import React, { useEffect, useState } from "react";
import FieldContainer from "../fields/field-container";
import { cn } from "@/lib/utils";
import FieldLabel from "../fields/field-label";
import { FormControl, FormField } from "@/components/ui/form";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { Check, ChevronsUpDown, PlusIcon } from "lucide-react";
import {
	Command,
	CommandEmpty,
	CommandGroup,
	CommandInput,
	CommandItem,
	CommandList,
} from "@/components/ui/command";
import { useFormContext } from "react-hook-form";
import { useFormSchema } from "../hooks/useFormSchema";
import FieldError from "../fields/field-error";
import { Separator } from "@/components/ui/separator";

interface ComboBoxItemContent {
	label: string;
	value: string;
}

interface FormComboBoxProps {
	name: string;
	label: string;
	items: ComboBoxItemContent[];
	onAddNewItem?: (item: ComboBoxItemContent) => void;
	placeholder: string;
	searchPlaceholder: string;
	noItemsFoundText: string;
	containerClassName?: string;
	labelClassName?: string;
	errorClassName?: string;
	onFieldChange?: (value: string) => void;
}

function FormComboBox({
	name,
	label,
	items,
	onAddNewItem,
	placeholder,
	searchPlaceholder,
	noItemsFoundText,
	containerClassName,
	labelClassName,
	onFieldChange,
	errorClassName,
}: FormComboBoxProps) {
	const { control } = useFormContext();
	const {
		form: { watch, setValue },
		formSchema,
	} = useFormSchema();

	const watchedField = watch(name);

	const [searchTerm, setSearchTerm] = useState<string>("");

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
									variant="outline"
									role="combobox"
									className={cn("!mt-0 justify-between", !field.value && "text-muted-foreground")}
								>
									{field.value
										? items.find(item => item.value === field.value)?.label
										: placeholder}
									<ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
								</Button>
							</FormControl>
						</PopoverTrigger>
						<PopoverContent className="p-0">
							<Command>
								<CommandInput
									onChangeCapture={ev => {
										setSearchTerm(ev.currentTarget.value);
									}}
									placeholder={searchPlaceholder}
								/>
								<CommandList>
									<CommandEmpty>{noItemsFoundText}</CommandEmpty>
									<CommandGroup>
										{items.map(item => (
											<CommandItem
												value={item.label}
												key={item.value}
												onSelect={() => {
													setValue(name, item.value);
												}}
											>
												{item.label}
												<Check
													className={cn(
														"ml-auto",
														item.value === field.value ? "opacity-100" : "opacity-0"
													)}
												/>
											</CommandItem>
										))}
									</CommandGroup>
								</CommandList>
							</Command>
							<Separator />
							{searchTerm.trim() && (
								<Command>
									<CommandList>
										<CommandGroup>
											<CommandItem
												onSelect={() => {
													setValue(name, searchTerm);
													console.log("select");
													onAddNewItem?.({ label: searchTerm, value: searchTerm });
													setSearchTerm("");
												}}
											>
												<PlusIcon />
												Add {searchTerm}
											</CommandItem>
										</CommandGroup>
									</CommandList>
								</Command>
							)}
						</PopoverContent>
					</Popover>
					<FieldError fieldErrorClassName={errorClassName} />
				</FieldContainer>
			)}
		/>
	);
}

export default FormComboBox;
