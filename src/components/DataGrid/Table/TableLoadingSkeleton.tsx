/* eslint-disable react/no-array-index-key */
import Skeleton from 'react-loading-skeleton';
import S, { ROW_HEIGHT } from './styles';

interface TableLoadingSkeletonProps {
  rowsCount: number;
  columnsCount: number;
}

export function TableLoadingSkeleton({
  rowsCount,
  columnsCount,
}: TableLoadingSkeletonProps) {
  return (
    <>
      {Array.from({ length: rowsCount }).map((row, rowIndex) => (
        <S.TableRow key={rowIndex}>
          {Array.from({ length: columnsCount }).map((column, columnIndex) => (
            <S.TableCell key={columnIndex}>
              <Skeleton height={`${ROW_HEIGHT / 2} px`} />
            </S.TableCell>
          ))}
        </S.TableRow>
      ))}
    </>
  );
}
