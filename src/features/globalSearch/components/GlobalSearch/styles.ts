import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { TextField } from '@/components/TextField';

export const GLOBAL_SEARCH_DROPDOWN_MAX_WIDTH = 500;

export const SearchField = styled(TextField)`
  svg path {
    fill: var(--icon-input-neutral-default);
  }
`;

export const OptionHeaderWrapper = styled.div`
  border-bottom: 1px solid var(--bg-separator-neutral-default);
  padding: 12px;
`;

export const StyledLink = styled(Link)`
  text-decoration: none;
`;
export const StyledForm = styled.form`
  width: 100%;
`;

export const SpinnerHead = styled.form`
  min-height: 40px;
`;

export const RecentSearchHead = styled.form`
  padding: 8px;
  text-align: center;
`;

export const DropdownPicker = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  cursor: pointer;
`;
