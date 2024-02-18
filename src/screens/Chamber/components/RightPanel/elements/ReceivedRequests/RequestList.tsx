import { useMemo, type FC } from 'react';
import { t } from 'i18next';
import { type SpaceConnection, SpaceTypeEnum } from '@/apollo/generated/types';
import { UserUtil } from '@/utils/user';
import { matchPath, useLocation } from 'react-router';
import ROUTES from '@/constants/routes';
import { NoResultsContainer } from '@/screens/Chamber/components/modals/RequestsAndInvites/styles';
import { SpaceUtils } from '@/utils/space';
import { type RequestsListProps } from './types';
import MemberRequest from '../MemberRequest';
import { ReceivedRequest } from './styles';
import {
  getTitle,
  getCategoryForModal,
  getProfileImage,
  getName,
} from './helper';

const RequestList: FC<RequestsListProps> = ({
  data,
  loading,
  chamberId,
  isModal,
  refetchReceivedRequests,
}) => {
  const { pathname } = useLocation();
  const receivedConnections = useMemo(() => {
    const items =
      data?.receivedConnectionRequest?.data?.filter(
        (item) =>
          !!item?.requestFrom &&
          !UserUtil.isInactive(item?.requestFrom?.uid) &&
          !SpaceUtils.isRiseApplicatonCategory(item.requestTo),
      ) || [];
    return matchPath(ROUTES.NOUMS, pathname) ? items.slice(0, 3) : items;
  }, [data?.receivedConnectionRequest?.data, pathname]);

  return (
    <>
      {receivedConnections && receivedConnections.length > 0
        ? receivedConnections.map((item) => (
            <div data-testid={item?.requestFrom?._id} key={item?._id}>
              <MemberRequest
                requestFromChamberId={item?.requestFrom?._id}
                refetchReceivedRequests={refetchReceivedRequests}
                chamberId={chamberId}
                noumType={item?.requestTo?.type}
                connectionId={item?._id}
                title={getTitle(item as SpaceConnection, chamberId)}
                name={getName(item as SpaceConnection, chamberId)}
                profileImage={getProfileImage(
                  item as SpaceConnection,
                  chamberId,
                )}
                category={
                  isModal
                    ? getCategoryForModal(item as SpaceConnection, chamberId)
                    : undefined
                }
                inviterId={item?.requestFrom?.uid?._id}
                isHomeType={item?.requestFrom?.type === SpaceTypeEnum.Home}
                message={item?.message}
                isModal={isModal}
              />
            </div>
          ))
        : !loading && (
            <NoResultsContainer isModal={isModal}>
              <ReceivedRequest>
                {t(`noumena.chamber.You_dont_have_any_requests`)}
              </ReceivedRequest>
            </NoResultsContainer>
          )}
    </>
  );
};

export default RequestList;
