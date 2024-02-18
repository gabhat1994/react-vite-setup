import { useCallback, useMemo, useState } from 'react';
import { t } from 'i18next';

import { NoumReferenceStatus } from '@/apollo/generated/types';
import { Modal, ModalBody, ModalHeader } from '@/components/ExtendedModal';
import { RichTextEditorView } from '@/features/richTextEditor';
import BasicChipsTabsForm from '@/components/Tabs/TabsForm';
import { type InputListTypes } from '@/components/Tabs/types';
import { Infinite } from '@/components/Infinite';
import { useWindowDimensions } from '@/hooks';
import { useGetNoumReferences } from '@/features/noums/hooks/references';
import { Spacer } from '@/layout';
import { breakpoints } from '@/constants/devices';

import { ReferenceViewItem } from './ReferenceViewItem';
import { type ViewReferenceProps } from './types';
import { ReferenceInnerContainer, TabContainer } from './styles';

const listOfTabs: InputListTypes[] = [
  {
    name: 'test1',
    image: 'terms_m',
    text: t('noumena.chamber_view.experiences'),
    labelSize: 'auto',
  },
  {
    name: 'test1',
    image: 'terms_m',
    text: t('noumena.chamber_view.references'),
    labelSize: 'auto',
  },
];

export const ViewExperience = ({
  id,
  body,
  title,
  isOpen,
  onClose,
}: ViewReferenceProps) => {
  const { width } = useWindowDimensions();

  const isMobile = useMemo(() => width <= breakpoints.MOBILE_MAX, [width]);
  const isDesktop = useMemo(() => width >= breakpoints.LAPTOP, [width]);
  const isTablet = useMemo(() => width >= breakpoints.TABLET, [width]);

  const {
    fetchMoreReferences,
    infiniteState,
    loading: referenceLoading,
    references: referencesData,
  } = useGetNoumReferences(id, NoumReferenceStatus.Accepted, true, 4);

  const [activeTab, setActiveTab] = useState(0);
  const handleSelectTab = useCallback(
    (value: string) => {
      setActiveTab(value ? Number(value) : 0);
    },
    [setActiveTab],
  );

  return (
    <Modal
      open={isOpen}
      testId="view_reference_modal"
      isFullScreen={isMobile}
      onClose={onClose}
      style={{
        width: isDesktop || isTablet ? 750 : undefined,
      }}
      enableCloseButton
      disableBackdropClick
    >
      <ModalHeader isFullScreen={isMobile}>{title}</ModalHeader>
      {referencesData && referencesData.length > 0 && (
        <TabContainer>
          <BasicChipsTabsForm
            onChange={handleSelectTab}
            inputList={listOfTabs}
            selectedId={activeTab.toString()}
            mode="isBackground"
            isWithoutImage
            fontSize="--font-body-medium-regular-size"
            textFont="--font-body-medium-regular-font"
          />
        </TabContainer>
      )}
      <Spacer height={16} />
      <ModalBody isFullScreen={isMobile} noFooter>
        {activeTab === 0 && (
          <RichTextEditorView
            style={{ padding: 0 }}
            data-testid="RichTextEditorView"
            html={body ?? ''}
          />
        )}
        {!referenceLoading && activeTab === 1 && referencesData.length && (
          <Infinite
            onFetchMore={fetchMoreReferences}
            status={infiniteState}
            paddingBottom="15px"
            paddingRight="12px"
            width="100%"
          >
            <ReferenceInnerContainer>
              {referencesData.map((reference) => (
                <ReferenceViewItem
                  key={reference._id}
                  loading={false}
                  isEditing={false}
                  reference={reference}
                />
              ))}
            </ReferenceInnerContainer>
          </Infinite>
        )}
      </ModalBody>
    </Modal>
  );
};
