import { FC } from 'react'
import FormTask from '../components/Form/FormTask'
import TaskList from '../components/Task/TaskList'

const Tasks: FC = () => {
    return (
        <section className='flex flex-col space-y-4 py-20 px-10'>
            {/* form of inputs for tasks */}

            <FormTask />

            {/* array of tasks */}

            <TaskList />
        </section>
    )
}

export default Tasks