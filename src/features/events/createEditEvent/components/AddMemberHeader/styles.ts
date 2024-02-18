import { Stack } from "@/layout";
import { TSpan } from "@/components";
import styled from "styled-components";

export const Wrapper = styled(Stack) <{ isDisabled: boolean }>`
    cursor: ${({ isDisabled }) => isDisabled ? 'default' : 'pointer'};
`;

export const EventFieldLabel = styled(TSpan)`
    display: flex;
`