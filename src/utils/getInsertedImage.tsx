import { ChangeEvent } from "react"

export const getInsertedImage = (e: ChangeEvent<HTMLInputElement>, setImages: any) => {
    const files = Array.from(e.target.files as any)
    const urls = files.map((file: any) => URL.createObjectURL(file))
    setImages((prevUrls: any) => [...prevUrls, ...urls])
}