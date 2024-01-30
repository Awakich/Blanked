import { FC } from 'react'
import PictureList from '../components/Drawer/PictureList'
import CanvasPlace from '../components/Canvas/CanvasPlace'

const Drawer: FC = () => {
    return (
        <section className='flex flex-col py-20 px-10 space-y-8'>
            {/* canvas place */}

            <CanvasPlace />

            {/* Your pictures/skecktes */}
            <PictureList />
        </section>
    )
}

export default Drawer