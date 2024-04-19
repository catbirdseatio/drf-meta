import { useFormContext } from "react-hook-form"

const FieldError = ({name}: {name?: string}) => {
    const { formState: { errors }} = useFormContext()

    if (!name) return null;
    const error = errors[name]

    if (!error) return null;

    return <span style={{color: "red"}}>{error.message}</span>
}

export default FieldError