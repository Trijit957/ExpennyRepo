import { useContext } from "react";
import { FormSchemaContext } from "../states/form-schema-context";

const useFormSchema = () => useContext(FormSchemaContext);

export { useFormSchema };
