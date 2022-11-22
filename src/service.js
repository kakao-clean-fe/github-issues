import { withAbortController } from './util';

export async function fetchIssues() {
  const response = await fetch('/data-sources/issues.json');
  return response.json();
}

export async function fetchLabels() {
  const response = await fetch('/labels');
  return response.json();
}

export async function addLabel(label) {
  const response = await fetch('/labels', {
    method: 'post',
    body: JSON.stringify(label)
  });
  if (!response.ok) {
    throw new Error('레이블 생성에 실패했습니다. 잠시후 다시 시도해주세요.');
  }
  return response.json();
}

export const fetchLabelsWithDelay = withAbortController(async (signal) => {
  const response = await fetch('/labels-delay', { signal });
  return response.json();
})
