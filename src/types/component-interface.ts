export interface Component {
  parent?: Element | null
  isEventHandlerInitialized?: boolean
  init: (...args: unknown[]) => void
  render: (...args: unknown[]) => void
  unmount?: (...args: unknown[]) => void
  initEventHandler?: () => void
  clearEventHandler?: () => void
}
