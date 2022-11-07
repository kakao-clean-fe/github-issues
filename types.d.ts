export declare type Status = 'open' | 'close'

export declare interface Issue {
  title: string,
  _id: number,
  tags: Tag[],
  status: string,
  'open-date': string,
  creator: string,
  projects: string,
  milestones: string,
  assignee: string,
  subtask: string[],
  "comments-count": number
}

declare interface Tag {
  tagName: string,
  color: string
}