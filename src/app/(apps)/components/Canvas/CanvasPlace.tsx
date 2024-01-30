"use client"
import { api } from '../../../../../convex/_generated/api'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { useToast } from '@/components/ui/use-toast'
import { useMutation } from 'convex/react'
import { ChangeEvent, FC, MouseEvent, useEffect, useRef, useState } from 'react'

const CanvasPlace: FC = () => {
    const canvasRef = useRef<HTMLCanvasElement | null>(null)
    const [context, setContext] = useState<CanvasRenderingContext2D | any>()
    const [_, setMouse] = useState<{ x: number, y: number }>({ x: 0, y: 0 })
    const [draw, setDraw] = useState(false)
    const [baseColor, setBaseColor] = useState('#000000')

    const createPicture = useMutation(api.pictures.createPicture)
    const { toast } = useToast()

    useEffect(() => {
        const canvas = canvasRef.current;
        const canvasContext = canvas?.getContext("2d")
        setContext(canvasContext)
    }, [])

    const clearCanvasHandler = () => {
        context.clearRect(0, 0, context.canvas.width, context.canvas.height);
    };

    const createPictureHandler = () => {
        const canvas = canvasRef.current;
        if (canvas) {
            const imageUrl = canvas.toDataURL()
            createPicture({ imageUrl })
            toast({
                title: "Succes!",
                description: "Success creation of your picture!"
            })
            clearCanvasHandler()
        }
    }

    const mouseDownHandler = (e: MouseEvent<HTMLCanvasElement>) => {
        const { offsetX, offsetY } = e.nativeEvent;
        setMouse({ x: offsetX, y: offsetY });
        setDraw(true);
        context.beginPath();
        context.moveTo(offsetX, offsetY);
    }

    const mouseMoveHandler = (e: MouseEvent<HTMLCanvasElement>) => {
        if (draw) {
            const { offsetX, offsetY } = e.nativeEvent;
            setMouse({ x: offsetX, y: offsetY });
            context.lineTo(offsetX, offsetY);
            context.strokeStyle = baseColor;
            context.stroke();
        }
    }

    const mouseUpHandler = () => {
        context.closePath()
        setDraw(false)
    }

    const colorChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setBaseColor(e.target.value);
    };

    return (
        <section className='space-y-4'>
            <canvas ref={canvasRef}
                width={350}
                height={250}
                className='bg-gray-100 rounded-lg'
                onMouseDown={mouseDownHandler}
                onMouseMove={mouseMoveHandler}
                onMouseUp={mouseUpHandler}>
            </canvas>

            <div className='flex items-center space-x-4 md:block md:space-x-0 md:space-y-4'>

                <Input className='w-[120px] h-[60px]' type='color' value={baseColor} onChange={colorChangeHandler} />

                <div className='space-x-8 flex md:block'>
                    <Button variant={"secondary"} size={"lg"} onClick={clearCanvasHandler}>Clear Canvas</Button>
                    <Button onClick={createPictureHandler}>Add</Button>
                </div>
            </div>
        </section>
    )
}

export default CanvasPlace