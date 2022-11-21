
export interface FindElementArgs {
  fromElement?: Element | Document | null
  selector: string
}

export interface RenderInnerHtmlArgs {
  parent: Element | null
  html: string
}

export interface SetEventListenerToElementArgs {
  element: Element | null
  event: string
  eventHandler: Parameters<typeof addEventListener>[1]
}
