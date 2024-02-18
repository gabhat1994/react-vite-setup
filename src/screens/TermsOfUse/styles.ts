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
  font-size: var(--font-link-medium-size);
  line-height: var(--font-link-medium-lineheight);
  color: var(--text-card-neutral-highlighted);
  flex: none;
  order: 1;
  align-self: stretch;
  flex-grow: 0;
`;
export const TextWrapperColor = styled.div`
  font-family: var(--font-family);
  font-style: normal;
  font-weight: var(--font-link-xsmall-weight);
  font-size: var(--font-body-medium-size);
  line-height: var(--font-body-medium-line-height);
  color: var(--text-card-neutral-default);
  flex: none;
  order: 1;
  align-self: stretch;
  flex-grow: 0;
`;

export const TextHeaderH2 = styled.h2`
  height: 30px;
  font-family: var(--font-family);
  font-style: normal;
  font-weight: var(--font-link-large-weight);
  font-size: var(--font-header-xsmall-size);
  line-height: var(--font-header-medium-line-height);
  color: var(--text-card-header-neutral-highlighted);
  order: 0;
`;
