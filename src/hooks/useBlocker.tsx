import { type Blocker, type Transition, createBrowserHistory } from 'history';
import { useEffect } from 'react';

export default function useBlocker(
  blocker: Blocker,
  when: boolean = false,
): void {
  const history = createBrowserHistory();

  useEffect(() => {
    if (!when) return undefined;

    const unblock = history.block((tx: Transition) => {
      const autoUnblockingTx = {
        ...tx,
        retry() {
          // Automatically unblock the transition so it can play all the way
          // through before retrying it.
          unblock();
          tx.retry();
        },
      };

      blocker(autoUnblockingTx);
    });

    return unblock;
  }, [history, blocker, when]);
}
