import { Id } from "../../convex/_generated/dataModel"

export type NoteType = {
    _id: Id<"notes">
    text: string
}

export type TaskType = {
    _id: Id<"tasks">
    name: string
    description: string
    level: "Easy" | "Medium" | "Hard",
    isComplete: boolean
}

export type TypeProps = {
    type: "tasks" | "notes"
}