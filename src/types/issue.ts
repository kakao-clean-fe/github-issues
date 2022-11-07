interface Tag {
  tagName: string
  color: string
}

export type Status = 'open' | 'close';

export interface Issue {
  title: string
  _id: number
  tags: Tag[]
  status: Status
  'open-date': string
  creator: string
  projects: string
  milestones: string
  assignee: string
  subtask: string[]
  'comments-count': number
}
