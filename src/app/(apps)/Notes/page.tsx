import FormComponent from '@/entities/FormComponent'
import { FC } from 'react'

const Notes: FC = () => {
    return (
        <section className='flex flex-col p-10'>
            {/* form of input for notes */}

            <FormComponent type='notes' />

            {/* array of notes and funtcional of redact text like markdown */}
        </section>
    )
}

export default Notes