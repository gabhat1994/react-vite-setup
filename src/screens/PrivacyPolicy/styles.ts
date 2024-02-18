import styled from 'styled-components';

export const Wrapper = styled.div`
  height: 100%;
  gap: 0;
  margin-left: 36px;
`;
export const TextWrapper = styled.div`
  font-family: var(--font-family);
  font-style: normal;
  font-weight: var(--font-link-xsmall-weight);
  font-size: var(--font-body-medium-size);
  line-height: var(--font-body-medium-line-height);
  flex: none;
  order: 1;
  align-self: stretch;
  flex-grow: 0;
`;

export const TextHeaderH2 = styled.h2`
  font-family: var(--font-family);
  font-style: normal;
  font-weight: var(--font-link-large-weight);
  font-size: var(--font-header-xsmall-size);
  line-height: var(--font-header-medium-line-height);
  color: var(--text-card-header-neutral-highlighted);
  order: 0;
`;
export const TextSubHeader = styled.h5`
  font-family: var(--font-family);
  font-style: normal;
  font-weight: var(--font-link-medium-weight);
  font-size: var(--font-link-xsmall-size);
  line-height: var(--font-header-xsmall-line-height) %;
  color: var(--text-card-neutral-highlighted);
  order: 0;
`;
