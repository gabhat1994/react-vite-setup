import { type FC } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { type SectionLayoutItemProps } from '../types';
import { Column, Container } from './styles';

export const SectionLayoutItem: FC<SectionLayoutItemProps> = ({
  layoutSectionType,
  columnsArray,
  handleSelectSectionType,
}) => {
  const sum = columnsArray?.reduce((a, b) => Math.abs(a) + Math.abs(b), 0);
  return (
    <Container
      aria-label={`${layoutSectionType}`}
      onClick={() => handleSelectSectionType(layoutSectionType)}
    >
      {columnsArray.map((weight: number) => (
        <Column
          key={uuidv4()}
          width={(Math.abs(weight) / sum) * 100}
          className={weight < 0 ? 'inActive' : ''}
        />
      ))}
    </Container>
  );
};
