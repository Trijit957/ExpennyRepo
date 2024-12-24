import { Form } from "@/components/ui/form";
import React, { ReactNode } from "react";
import { DefaultValues, SubmitHandler, useForm } from "react-hook-form";
import { ZodObject } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { cn } from "@/lib/utils";
import { FormSchemaProvider } from "./states/form-schema-context";

interface FormWrapperProps<TFormDataType extends Record<string, any>> {
	children: ReactNode;
	formSchema: ZodObject<any>;
	defaultValues: DefaultValues<TFormDataType>;
	onSubmit: SubmitHandler<TFormDataType>;
	formClassName?: string;
}

function FormWrapper<TFormDataType extends Record<string, any>>({
	formSchema,
	children,
	defaultValues,
	onSubmit,
	formClassName,
}: FormWrapperProps<TFormDataType>) {
	const form = useForm({
		resolver: zodResolver(formSchema),
		defaultValues,
	});
	return (
		<Form {...form}>
			<form
				className={cn("flex w-full flex-col gap-6", !!formClassName && formClassName)}
				onSubmit={e => {
					e.preventDefault();
					void form.handleSubmit(onSubmit)(e);
				}}
			>
				<FormSchemaProvider<TFormDataType> formSchema={formSchema} form={form}>
					{children}
				</FormSchemaProvider>
			</form>
		</Form>
	);
}

export default FormWrapper;
