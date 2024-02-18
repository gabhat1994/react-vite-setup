import { memo, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import {
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalHeader,
  ModalSize,
} from '@/components/ExtendedModal';
import { DocumentType } from '@/features/contracts/types';
import { Button } from '@/components/Button';
import { Icon } from '@/components/Icon';
import { breakpoints } from '@/constants/devices';
import { useWindowDimensions } from '@/hooks';
import { Spacer } from '@/layout';
import { Infinite } from '@/components/Infinite';
import { NoumLayoutViewMode } from '@/features/conversation/types';
import { useNoumAuthorization } from '@/features/noums/contexts/NoumAuthorizationContext';
import { PermissibleElementType } from '@/apollo/generated/types';
import FiltersViewMode from './Filters';
import { useContractsElement } from '../../../useContractsElement';
import { type ContractViewAllModalProp } from '../../../types';
import { CustomHeadContainer, FilterContainer } from './styles';
import BodyViewMode from './Body';

export const ContractViewAllModal = memo(
  ({
    isOpen,
    onClose,
    isOwner,
    spaceId,
    filterType,
    ROWS_PER_PAGE = 10,
    handleNewContract,
  }: ContractViewAllModalProp) => {
    const { t } = useTranslation();
    const { width } = useWindowDimensions();
    const isTablet = width < breakpoints.LAPTOP;
    const {
      filters,
      setFilters,
      handleNavigateToStatementOfWork,
      handleNavigateToContractManager,
      handleNavigateToContract,
      statementsOfWork,
      contracts,
      isLoading,
      infiniteState,
      onFetchMore,
    } = useContractsElement({
      isOwner,
      spaceId,
      ROWS_PER_PAGE,
      filterType,
    });

    const { hasElementPermission } = useNoumAuthorization();

    useEffect(() => {
      if (isOpen && filterType)
        setFilters((current) => ({ ...current, type: filterType }));
    }, [filterType, isOpen, setFilters]);

    const canAddDocument = hasElementPermission(
      PermissibleElementType.ContractTool,
      'add-contract-sow',
      isOwner,
    );

    return (
      <Modal
        open={isOpen}
        onClose={onClose}
        enableCloseButton
        size={ModalSize.XL}
        testId="view-all-contracts-sows-modal"
        isFullScreen={isTablet}
        disableBackdropClick
        style={{ maxHeight: 700 }}
        customCloseButton={
          <>
            <CustomHeadContainer
              isTablet={isTablet}
              gap={16}
              align="center"
              fullWidth
            >
              {canAddDocument ? (
                <Button
                  secondary
                  textOnly
                  size="small"
                  leftIcon={<Icon name="add_m" size={24} />}
                  onClick={handleNewContract}
                >
                  {t('noumena.noum_contract_manager.new_contract')}
                </Button>
              ) : (
                // Want to reserve the space.
                <div />
              )}
              <Button
                secondary
                textOnly
                size="small"
                onClick={handleNavigateToContractManager}
              >
                {t('noumena.noum_contract_manager.manage')}
              </Button>
            </CustomHeadContainer>
            <ModalCloseButton isFullScreen={isTablet} onClose={onClose} />
          </>
        }
      >
        <ModalHeader isFullScreen={isTablet} justifyContent="flex-start">
          {t('noumena.chambers.toolbox.element.contracts')}
        </ModalHeader>
        <FilterContainer>
          <FiltersViewMode
            filterType={filterType}
            filters={filters}
            setFilters={setFilters}
          />
        </FilterContainer>
        <Spacer height={16} />
        <ModalBody isFullScreen={isTablet} mobileFlex>
          <Infinite
            onFetchMore={onFetchMore}
            status={infiniteState}
            scrollbarWidth={0}
            width="100%"
          >
            <BodyViewMode
              layoutMode={NoumLayoutViewMode.NOUMLAYOUTBIG}
              isLoading={isLoading}
              handleNavigateToStatementOfWork={handleNavigateToStatementOfWork}
              handleNavigateToContract={handleNavigateToContract}
              isContract={filters.type === DocumentType.Contract}
              contracts={contracts}
              rowsPerPage={ROWS_PER_PAGE}
              statementsOfWork={statementsOfWork}
            />
          </Infinite>
        </ModalBody>
      </Modal>
    );
  },
);
