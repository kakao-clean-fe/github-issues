export interface Component {
  parent?: Element | null
  init: () => void
  render: () => void
  initEventHandler?: () => void
}
