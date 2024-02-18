import {
  type FC,
  memo,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from 'react';
import { min } from 'lodash';
import { t } from 'i18next';
import { endOfToday, startOfToday, startOfYear } from 'date-fns';
import { type DateRange } from 'react-day-picker';
import {
  Modal,
  ModalBody,
  ModalHeader,
  ModalSize,
} from '@/components/ExtendedModal';
import BasicChipsTabsForm from '@/components/Tabs/TabsForm';
import { useWindowDimensions } from '@/hooks';
import { breakpoints } from '@/constants/devices';
import { useNoumContext } from '@/screens/Chamber/ViewChamber/ChamberProvider';
import {
  type NoumDashboardMetricsModalProps,
  NoumDashboardMetricsModalTabEnum,
  NoumDashboradTypeEnum,
} from './types';
import {
  TabSectionHead,
  Container,
  TabHeaderContainer,
  DateRangeContainer,
  TabsContainer,
} from './styles';
import { getModalHeadList } from './ModalHeadList';
import StatisticsTab from './Tabs/StatisticsTab';
import ListsTab from './Tabs/ListsTab';
import { DateRangePicker } from './DateRangePicker/DateRangePicker';
import { DateRangeOptions } from './constants';

export const NoumDashboardMetricsModal: FC<NoumDashboardMetricsModalProps> =
  memo(
    ({
      isOpen,
      dashboardType = NoumDashboradTypeEnum.connections,
      defaultTab = NoumDashboardMetricsModalTabEnum.Statistics,
      handleClose,
    }) => {
      const { space } = useNoumContext();
      const { width } = useWindowDimensions();
      const isTablet = width < breakpoints.LAPTOP;
      const [referenceElement, setReferenceElement] =
        useState<HTMLSpanElement | null>(null);
      const [selectedId, setSelectedId] = useState('0');
      const [selectedTab, setSelectedTab] = useState(defaultTab);

      const oldestLinkedNoumCreatedAt = useMemo(
        () =>
          min([
            space?.createdAt,
            ...(space?.link?.linkedNoums.map(
              (linkedNoum) => linkedNoum?.createdAt,
            ) || []),
          ]),
        [space?.createdAt, space?.link?.linkedNoums],
      );

      const defaultSelectedForConnectedTab = useMemo(
        () => ({
          from: oldestLinkedNoumCreatedAt
            ? new Date(oldestLinkedNoumCreatedAt)
            : startOfYear(new Date()),
          to: endOfToday(),
        }),
        [oldestLinkedNoumCreatedAt],
      );

      const defaultSelected = useMemo(
        () =>
          selectedTab === NoumDashboardMetricsModalTabEnum.Connected
            ? defaultSelectedForConnectedTab
            : { from: startOfToday(), to: endOfToday() },
        [defaultSelectedForConnectedTab, selectedTab],
      );

      const [range, setRange] = useState<DateRange>(defaultSelected);

      useEffect(() => {
        if (selectedTab === NoumDashboardMetricsModalTabEnum.Connected)
          setRange(defaultSelectedForConnectedTab);
      }, [defaultSelectedForConnectedTab, selectedTab]);

      const modalHeadList = getModalHeadList({ dashboardType });
      const title = t(`noumena.noum.dashboard.modal.title.${dashboardType}`);

      const handleChange = useCallback(
        (id: string) => {
          if (id) {
            setSelectedId(id);
            setSelectedTab(
              modalHeadList[parseInt(id, 10)]
                .name as NoumDashboardMetricsModalTabEnum,
            );
          }
        },
        [modalHeadList],
      );

      const onDateChange = (rangeValue: DateRange) => {
        setRange(rangeValue);
      };

      const filterDateRangeOptions = useMemo(
        () =>
          DateRangeOptions.filter(
            (x) =>
              (x.value !== 'lifetime' &&
                selectedTab !== NoumDashboardMetricsModalTabEnum.Connected) ||
              selectedTab === NoumDashboardMetricsModalTabEnum.Connected,
          ),
        [selectedTab],
      );

      const tabComponent = useCallback(() => {
        if (selectedTab === NoumDashboardMetricsModalTabEnum.Statistics)
          return (
            <StatisticsTab
              noumId={space?._id || ''}
              dashboardType={dashboardType}
              range={range}
            />
          );
        return (
          <ListsTab
            selectedTab={selectedTab}
            dateRange={range}
            noumId={space?._id || ''}
          />
        );
      }, [dashboardType, range, selectedTab, space?._id]);

      return (
        <Modal
          testId="testNoumDashboardMetricsModal"
          open={isOpen && !!dashboardType}
          onClose={handleClose}
          enableCloseButton
          size={ModalSize.XXL}
          isFullScreen={isTablet}
          closeButtonStyles={{
            enforceLeft: true,
          }}
        >
          <Container data-testid="noum_dashboard_metrics_container">
            <ModalHeader>{title}</ModalHeader>
            <TabHeaderContainer>
              <TabsContainer>
                {modalHeadList.length > 1 && (
                  <TabSectionHead autoWidth>
                    <BasicChipsTabsForm
                      onChange={handleChange}
                      inputList={modalHeadList}
                      selectedId={selectedId}
                      mode="isBackground"
                      isWithoutImage
                      fontSize="--font-button-small-size"
                      fullWidth={true}
                      textFont="--font-body-medium-regular-font"
                    />
                  </TabSectionHead>
                )}
              </TabsContainer>
              <DateRangeContainer ref={setReferenceElement}>
                <DateRangePicker
                  defaultSelected={defaultSelected}
                  onDateChange={onDateChange}
                  referenceElement={referenceElement}
                  dateRangeOptions={filterDateRangeOptions}
                  selectedTab={selectedTab}
                />
              </DateRangeContainer>
            </TabHeaderContainer>
            <ModalBody minHeight={54}>{tabComponent()}</ModalBody>
          </Container>
        </Modal>
      );
    },
  );
