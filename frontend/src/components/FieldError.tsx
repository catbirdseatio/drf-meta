import { useFormContext } from "react-hook-form"

const FieldError = ({name}: {name?: string}) => {
    const { formState: { errors }} = useFormContext()

    return <>{errors[name!] && <span style={{color: 'red', fontSize: '.75rem'}}>{errors[name!].message}</span>}</>
}

export default FieldError