import type IntersectionObserverMockType from '@shopify/jest-dom-mocks/build/ts/intersection-observer';
// @ts-ignore
import IntersectionObserverMock from '@shopify/jest-dom-mocks/build/cjs/intersection-observer';

const intersectionObserver =
  new IntersectionObserverMock() as IntersectionObserverMockType;

export { intersectionObserver };
