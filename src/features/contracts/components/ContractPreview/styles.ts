import styled from 'styled-components';
import { Card as OriginalCard } from '@/components/Card';
import { Separator as OriginalSeparator } from '@/components/Separator/Separator';
import { TSpan } from '@/components/Typography';

const Card = styled(OriginalCard)`
  padding: 24px;
`;

const Separator = styled(OriginalSeparator)`
  width: 100%;
  margin: 0;
`;

const PDFPreview = styled.div`
  width: 100%;
  height: 300px;
  background-color: var(--text-tab-basic-neutral-disabled);
  border-radius: 8px;
`;

const NoSOWsValue = styled(TSpan).attrs(() => ({
  font: 'body-m',
  colorToken: '--text-card-neutral-default',
}))`
  margin-left: 12px;
`;

const SowButtonLink = styled.div`
  cursor: pointer;
`;

export default {
  Card,
  Separator,
  PDFPreview,
  NoSOWsValue,
  SowButtonLink,
};
