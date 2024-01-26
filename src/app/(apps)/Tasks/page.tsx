import FormComponent from '@/entities/FormComponent'
import { FC } from 'react'

const Tasks: FC = () => {
    return (
        <section className='flex flex-col space-y-4 py-20 px-10'>
            {/* form of inputs for tasks */}

            <FormComponent type='tasks' />

            {/* array of tasks */}
        </section>
    )
}

export default Tasks