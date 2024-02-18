import styled from 'styled-components';

const Label = styled.label`
  display: flex;
  align-items: center;
  gap: 10px;
  cursor: pointer;
`;

const Switch = styled.div`
  position: relative;
  width: 45px;
  height: 24px;
  background: var(--bg-toggle-neutral-default);
  border-radius: 14px;
  padding: 0.6px;
  transition: 300ms all;

  &:before {
    transition: 300ms all;
    content: '';
    position: absolute;
    width: 20px;
    height: 20px;
    border-radius: 35px;
    top: 50%;
    left: 4px;
    background: white;
    transform: translate(0, -50%);
  }
`;

const Input = styled.input`
  opacity: 0;
  position: absolute;

  &:checked + ${Switch} {
    background: var(--bg-toggle-brand-primary-selected);

    &:before {
      transform: translate(18px, -50%);
    }
  }
`;

export { Label, Switch, Input };
