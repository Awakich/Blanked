import { useQuery } from 'convex/react'
import { api } from '../../../../../convex/_generated/api'
import { FC } from 'react'
import NoteListItem from './NoteListItem'

const NoteList: FC = () => {
    // const notes = useQuery(api.notes.getNotes)
    return (
        <div>
            NoteList
            {/* <NoteListItem /> */}
        </div>
    )
}

export default NoteList