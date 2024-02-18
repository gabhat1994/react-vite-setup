import { t } from 'i18next';
import { Dropdown, type DropdownTargetProps } from '@/components/Dropdown';

const NoSearchResultsForNoums: React.FC = () => (
  <Dropdown
    onSelectOption={() => {}}
    containerWidth="100%"
    usePortal={false}
    isOpen
    options={[]}
    padding="0px"
    usePopStyle={false}
    noAvailableOptions
    noAvailableOptionsText={t('noumena.dropdown.no_users_searched.text')}
  >
    {({ targetRef }: DropdownTargetProps<HTMLDivElement>) => (
      <div ref={targetRef} />
    )}
  </Dropdown>
);

export default NoSearchResultsForNoums;
