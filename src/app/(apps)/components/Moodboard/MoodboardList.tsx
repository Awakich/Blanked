import { FC } from 'react'
import MoodboardListItem from './MoodboardListItem'

type MoodboardListType = {
    messages: any[]
}

const MoodboardList: FC<MoodboardListType> = ({ messages }) => {
    return (
        <>
            {
                messages.map((message) => (
                    <li className='h-full' key={message._id}>
                        {message.format === "image" &&
                            <MoodboardListItem message={message} />
                        }
                    </li>
                ))
            }
        </>
    )
}

export default MoodboardList