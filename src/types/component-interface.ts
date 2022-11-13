export interface Component {
  parent: Element | null
  templateFunction: (...args: unknown[]) => string
  init: () => void
  render: () => void
  setEventHandler?: () => void
}
