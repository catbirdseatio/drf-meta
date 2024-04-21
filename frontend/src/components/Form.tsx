import { zodResolver } from '@hookform/resolvers/zod'

// We will fully type `<Form />` component by providing component props and fwding // those
import { ComponentProps } from 'react'

import {
	useForm as useHookForm,
	UseFormProps as UseHookFormProps,
	FormProvider,
	UseFormReturn,
	FieldValues,
	SubmitHandler,
	useFormContext,
} from 'react-hook-form'

// Type of zod schema
import { ZodSchema, TypeOf } from 'zod'


// We provide additional option that would be our zod schema.
interface UseFormProps<T extends ZodSchema<any>>
	extends UseHookFormProps<TypeOf<T>> {
	schema: T
}

export const useForm = <T extends ZodSchema<never>>({
	schema,
	...formConfig
}: UseFormProps<T>) => {
	return useHookForm({
		...formConfig,
		resolver: zodResolver(schema),
	})
}

interface FormProps<T extends FieldValues = never>
	extends Omit<ComponentProps<'form'>, 'onSubmit'> {
	form: UseFormReturn<T>
	onSubmit: SubmitHandler<T>
}

export const Form = <T extends FieldValues>({
	form,
	onSubmit,
	children,
	...props
}: FormProps<T>) => {
	return (
		<FormProvider {...form}>
          {/* the `form` passed here is return value of useForm() hook */}
			<form onSubmit={form.handleSubmit(onSubmit)} {...props}>
					{children}
			</form>
		</FormProvider>
	)
}