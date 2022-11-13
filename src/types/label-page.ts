import type { Labels } from '~/types/label';

// 라벨 페이지
export interface InitLabelPageLayoutArgs {
  parentSelector?: string
}

export interface InitLabelListComponentArgs {
  parentSelector?: string
  labels: Labels
}

// 라벨 리스트 컴포넌트
export interface RenderLabelListArgs {
  parent: Element | null
  labels: Labels
}

// 라벨 카운트 컴포넌트
export interface InitLabelCountComponentArgs {
  parentSelector?: string
  labels: Labels
}

export interface RenderLabelCountArgs {
  parent: Element | null
  html: string
}
