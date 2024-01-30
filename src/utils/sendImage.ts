import { Dispatch, FormEvent, SetStateAction } from "react";
import { Id } from "../../convex/_generated/dataModel";
import { ReactMutation } from "convex/react";
import { FunctionReference } from "convex/server";
import { EmptyObject } from "react-hook-form";

export const handleSendImage = async (
    e: FormEvent,
    setEventActive: Dispatch<SetStateAction<boolean>>,
    selectedImage: File | null,
    setSelectedImage: (e: File | null) => void,
    sendImage: ReactMutation<FunctionReference<"mutation", "public", { storageId: Id<"_storage"> }, null>>,
    generateUploadUrl: ReactMutation<FunctionReference<"mutation", "public", EmptyObject, string>>,
    toast: Function
) => {
    e.preventDefault()

    setEventActive(true)

    const postUrl = await generateUploadUrl();

    const result = await fetch(postUrl, {
        method: "POST",
        headers: { "Content-Type": selectedImage!.type },
        body: selectedImage,
    });

    setSelectedImage(null)

    const json = await result.json();

    if (!result.ok) {
        toast({
            title: "Upload failed",
            description: "Error with adding of images!",
            variant: "destructive"
        })
    }

    const { storageId } = json;
    await sendImage({ storageId });

    setEventActive(false)

    toast({
        title: "Success added!",
        description: "Your image was added succesfully!"
    })
}