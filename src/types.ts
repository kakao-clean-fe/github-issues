export interface Issue {
    title: string,
    "_id": number,
    tags: Array<{tagName: string, color: string}>,
    status: "open" | "close",
    "open-date": string,
    creator: string,
    projects: string,
    milestones: string,
    assignee: string,
    subtask: Array<string>,
    "comments-count": number
}

export interface Label {
    name: string,
    color: string,
    description: string
}