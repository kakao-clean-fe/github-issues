import { Status } from '../types'

export const selector = {
    app: '#app',
    issueList: '.issue-list ul',
    openButton: '.statusTab .open-count',
    closeButton: '.statusTab .close-count'
}

export const STATUS: {
  OPEN: Status
  CLOSE: Status 
} = {
  OPEN: 'open',
  CLOSE: 'close'
}

