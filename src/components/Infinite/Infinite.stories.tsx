import { useState, useCallback } from 'react';
import styled from 'styled-components';
import * as fc from 'fast-check';
import { ObservedDiv } from './ObservedDiv';
import { Infinite } from './Infinite';
import { Stack } from '../../layout/Stack';

const RelativeContainer = styled.div`
  height: 1400px;
  width: 500px;
  position: relative;
  border: 1px solid black;
  overflow: auto;
`;

const Container = styled.div`
  height: 500px;
  width: 500px;
  border: 1px solid black;
  overflow: hidden;
`;

export default {
  title: 'Atoms/Infinite',
};

export const ObserverDiv = () => {
  const [state, setState] = useState(0);
  const handleIntersect = useCallback(() => {
    setState((prev) => prev + 1);
  }, []);

  const reverse = true;

  return (
    <RelativeContainer>
      Scroll the {reverse ? 'top' : 'bottom'} in and out of view. Observe count:{' '}
      {state}
      <ObservedDiv onIntersect={handleIntersect} reverse={reverse} />
    </RelativeContainer>
  );
};

const messagesArbitary = fc
  .tuple(
    fc.constantFrom('Batman', 'Superman', 'Spiderman', 'Ironman', 'Hulk'),
    fc.lorem({ maxCount: 150 }),
  )
  .chain(([name, message]) =>
    fc.record({
      id: fc.uuid(),
      name: fc.constant(name),
      email: fc.constant(`${name.toLowerCase().replace(' ', '_')}@deskpro.com`),
      message: fc.constant(message),
    }),
  );

export const Example = () => {
  const [state, setState] = useState(() =>
    fc.sample(messagesArbitary, { numRuns: 4, seed: 2324 }),
  );
  const [infiniteState, setInfiniteState] = useState<
    'loading' | 'hasNextPage' | 'end' | 'end-with-force'
  >('hasNextPage');

  const handleFetchMore = useCallback(() => {
    setInfiniteState('loading');
    setTimeout(() => {
      setState((prev) => [
        ...prev,
        ...fc.sample(messagesArbitary, { numRuns: 4 }),
      ]);
      if (state.length > 15) {
        setInfiniteState('end-with-force');
      } else {
        setInfiniteState('hasNextPage');
      }
    }, 1000);
  }, [state.length]);

  const handleNewMessage = useCallback(() => {
    setTimeout(() => {
      setState((prev) => [
        ...fc.sample(messagesArbitary, { numRuns: 1 }),
        ...prev,
      ]);
    }, 500);
  }, []);

  return (
    <>
      <button type="button" onClick={handleNewMessage}>
        submit
      </button>
      <Container>
        <Infinite onFetchMore={handleFetchMore} status={infiniteState}>
          <Stack vertical align="stretch">
            {state.map((message) => (
              <div style={{ overflow: 'hidden' }} key={message.id}>
                <h1>Name: {message.name}</h1>
                <p> {message.message}</p>
              </div>
            ))}
          </Stack>
        </Infinite>
      </Container>
    </>
  );
};
