
export interface FindElementArgs {
  fromElement?: Element | Document
  selector: string
}

export interface RenderInnerHtmlArgs {
  parent: Element | null
  html: string
}

export interface FindParentAndRenderInnerHtmlArgs extends FindElementArgs, Pick<RenderInnerHtmlArgs, 'html'> {}
