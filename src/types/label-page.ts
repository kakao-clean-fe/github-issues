import type { Labels } from '~/types/label';
export interface InitLabelPageLayoutArgs {
  parentSelector?: string
}

export interface InitLabelListComponentArgs {
  parentSelector?: string
  labels: Labels
}

export interface RenderLabelListArgs {
  parent: Element | null
  labels: Labels
}
