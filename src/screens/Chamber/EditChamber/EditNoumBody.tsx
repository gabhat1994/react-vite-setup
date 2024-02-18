import Skeleton from 'react-loading-skeleton';
import { type FC, useEffect, useMemo, useState } from 'react';
import { Spacer, Stack } from '@/layout/Stack';
import { useWindowDimensions } from '@/hooks';
import { breakpoints } from '@/constants/devices';
import { SpaceUtils } from '@/utils/space';
import { type NoumLayoutSection } from '@/apollo/generated/types';
import {
  AddSectionPopover,
  EmptyNoumState,
} from '@/features/noums/noumEditor/components';
import { emptyStateNoum } from './mockdata';
import { Rearrage } from '../components/SectionElementRearrange/Rearrange';
import { type EditNoumBodyProps } from './types';
import { Container } from './styles';
import { useEditChamberState } from './provider';

export const EditNoumBody: FC<EditNoumBodyProps> = (props) => {
  const { sections: orignalSections } = useEditChamberState();
  const [isLoading, setIsLoading] = useState(false);
  const [sections, setSections] = useState<NoumLayoutSection[]>();
  const { width } = useWindowDimensions();
  const isLaptop = useMemo(() => width <= breakpoints.TABLET_L, [width]);

  useEffect(() => {
    setSections(orignalSections);
  }, [orignalSections]);

  return (
    <Container>
      {sections && sections.length > 0 ? (
        <>
          <Rearrage sections={sections!} setSections={setSections} {...props} />
          <Spacer height={4} />
          <AddSectionPopover
            position={SpaceUtils.getSectionMaxPosition(sections!) + 1}
            setIsLoading={setIsLoading}
          />
          {isLoading && (
            <>
              <Spacer height={4} />
              <Skeleton
                width="100%"
                height={134}
                borderRadius={12}
                enableAnimation
                baseColor="var(--color-base-gray-100)"
              />
            </>
          )}
        </>
      ) : (
        <Stack aria-label="noum_empty_state" gap={16} vertical={isLaptop}>
          {emptyStateNoum.map((item) => (
            <EmptyNoumState
              key={item.key}
              title={item.title}
              description={item.description}
            />
          ))}
        </Stack>
      )}
    </Container>
  );
};
