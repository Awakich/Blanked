import { FC } from 'react'
import FormNotes from '../components/Form/FormNotes'
import NoteList from '../components/Note/NoteList'

const Notes: FC = () => {
    return (
        <section className='flex flex-col p-10'>
            {/* form of input for notes */}

            <FormNotes />

            {/* array of notes and funtcional of redact text like markdown */}

            <NoteList />
        </section>
    )
}

export default Notes