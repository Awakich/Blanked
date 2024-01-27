export type NoteType = {
    _id: string
    text: string
}

export type TaskType = {
    _id: string
    name: string
    description: string
    level: "Eeasy" | "Medium" | "Hard"
}

export type TypeProps = {
    type: "tasks" | "notes"
}