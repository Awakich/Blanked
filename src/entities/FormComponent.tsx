import { FC } from 'react'
import FormTask from './FormTask'
import FormNotes from './FormNotes'

type FormType = {
    type: "tasks" | "notes"
}

const FormComponent: FC<FormType> = ({ type }) => {
    return (
        <>
            {type === "tasks" ? <FormTask /> : <FormNotes />}
        </>
    )
}

export default FormComponent