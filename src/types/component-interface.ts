export interface Component {
  parent?: Element | null
  init: (...args: unknown[]) => void
  render: (...args: unknown[]) => void
  initEventHandler?: () => void
}
