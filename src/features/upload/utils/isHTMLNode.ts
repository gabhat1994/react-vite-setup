import { notEmpty } from '@/utils/notEmpty';

export function isHTMLNode(node: unknown): node is HTMLElement {
  return (
    typeof node === 'object' && notEmpty(node) && node instanceof HTMLElement
  );
}
