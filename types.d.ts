export declare interface Tag {
  tagName: string;
  color: string;
}
export declare type Status = 'open' | 'close';
export declare interface Item {
  title: string;
  _id: number;
  tags: Tag[];
  status: Status;
  'open-date': string;
  creator: string;
  projects: string;
  milestones: string;
  assignee: string;
  subtask: string[];
  'comments-count': number;
}

export declare interface Label {
  name: string;
  color: string;
  description: string;
}
export declare interface Api {
  url: string;
  method?: string;
  body?: any;
  errorMessage?: string;
}
