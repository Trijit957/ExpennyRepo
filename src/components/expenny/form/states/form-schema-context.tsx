import { ReactNode, createContext } from "react";
import { FieldValues, UseFormReturn } from "react-hook-form";
import { ZodObject } from "zod";

interface FormSchemaContext<TFormDataType extends FieldValues> {
	formSchema: ZodObject<TFormDataType>;
	form: UseFormReturn<TFormDataType>;
}

const FormSchemaContext = createContext<FormSchemaContext<any>>({} as FormSchemaContext<any>);

const FormSchemaProvider = <TFormDataType extends FieldValues>({
	children,
	formSchema,
	form,
}: {
	children: ReactNode;
	formSchema: ZodObject<any>;
	form: UseFormReturn<TFormDataType>;
}) => {
	return (
		<FormSchemaContext.Provider value={{ formSchema, form }}>{children}</FormSchemaContext.Provider>
	);
};

export { FormSchemaContext, FormSchemaProvider };
