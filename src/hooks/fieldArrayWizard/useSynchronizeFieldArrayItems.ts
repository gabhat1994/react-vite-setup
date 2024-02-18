import { isEqual } from 'lodash';
import { useLayoutEffect } from 'react';

interface UseSynchronizeFieldArrayItemsOptions {
  thisArray: Array<unknown> | undefined;
  otherArray: Array<unknown> | undefined;
  append: () => void;
  remove: (index: number) => void;
}

export function useSynchronizeFieldArrayItems({
  thisArray,
  otherArray,
  append,
  remove,
}: UseSynchronizeFieldArrayItemsOptions) {
  const otherSerialized = JSON.stringify(otherArray ?? null);
  const thisSerialized = JSON.stringify(thisArray ?? null);

  useLayoutEffect(() => {
    const other = JSON.parse(otherSerialized) as Array<unknown> | null;
    const previous = JSON.parse(thisSerialized) as Array<unknown> | null;

    if (!previous || !other || other.length === previous.length) {
      return;
    }

    if (other.length > previous.length) {
      append();
      return;
    }

    const removedIndex = previous.findIndex(
      (p, index) => !isEqual(p, other[index]),
    );
    remove(removedIndex);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [otherSerialized, thisSerialized]);
}
