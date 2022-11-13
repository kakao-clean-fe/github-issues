import type { Labels, Label } from '~/types/label';

// 라벨 페이지
export interface LabelPageLayoutArgs {
  parentSelector?: string
  templateFunction?: () => string
}

// 라벨 리스트 컴포넌트
export interface LabelListComponentArgs {
  parentSelector?: string
  labelItemTemplateFunction?: (label: Label) => string
  labels: Labels
}

// 라벨 카운트 컴포넌트
export interface LabelCountComponentArgs {
  parentSelector?: string
  templateFunction?: (count: number) => string
  labels: Labels
}
