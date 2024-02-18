import React from 'react';
import { useTranslation } from 'react-i18next';
import S from './styles';

interface TableNoResultsProps {
  columnsCount: number;
  rowsCount: number;
  message: React.ReactNode;
}

export function TableNoResults({
  columnsCount,
  rowsCount,
  message,
}: TableNoResultsProps) {
  const { t } = useTranslation();

  return (
    <S.TableRow>
      <S.TableCell colSpan={columnsCount}>
        <S.NoResults $rowsCount={rowsCount}>
          {message ?? t('noumena.data_grid.table.no_results')}
        </S.NoResults>
      </S.TableCell>
    </S.TableRow>
  );
}
