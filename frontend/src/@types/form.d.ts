export interface IInputProps {
    label: string;
    type?: string;
    name: string;
    placeholder?: string;
 }

 export interface IFormProps<T extends FieldValues = never>
 extends Omit<ComponentProps<'form'>, 'onSubmit'> {
     form: UseFormReturn<T>
     onSubmit: SubmitHandler<T>
 }