/**
 * Type guard. Useful for filtering out null/undefined from an array.
 * https://www.typescriptlang.org/docs/handbook/advanced-types.html#user-defined-type-guards
 *
 * Without a type guard like this, TypeScript will normally complain about example
 * containing null/undefined.
 *
 * @example
 * const example: MyType[] = [val1, null, undefined, val2].filter(notEmpty);
 *
 * @param value
 */
export function notEmpty<TValue>(
  value: TValue | null | undefined,
): value is TValue {
  return value !== null && value !== undefined;
}

/**
 * Type guard. Useful for finding null and undefined
 * https://www.typescriptlang.org/docs/handbook/advanced-types.html#user-defined-type-guards
 *
 * Without a type guard like this, TypeScript will normally complain about example
 * containing null/undefined.
 *
 * @example
 * const example: (null | undefined)[] = [val1, null, undefined, val2].filter(isEmpty);
 *
 *
 * @param value
 */
export function isEmpty<TValue>(
  value: TValue | null | undefined,
): value is null | undefined {
  return value === null || value === undefined;
}

export function isHTMLNode(node: unknown): node is HTMLElement {
  return (
    typeof node === 'object' && notEmpty(node) && node instanceof HTMLElement
  );
}
