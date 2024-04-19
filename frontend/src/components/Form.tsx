import { FieldValues, FormProvider } from "react-hook-form";
import { IFormProps } from "../@types/form";



export const Form = <T extends FieldValues>({
    form,
    onSubmit,
    children,
    ...props
}: IFormProps<T>) => (
    <FormProvider {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} {...props}>
            {children}
        </form>
    </FormProvider>
)