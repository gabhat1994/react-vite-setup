import { useState } from 'react';
import { useNavigate } from 'react-router';
import { useTranslation } from 'react-i18next';
import { useAuth } from '@/features/auth/contexts';
import { Icon } from '@/components/Icon';
import { Button } from '@/components/Button';
import { TSpan } from '@/components/Typography';
import { Spacer } from '@/layout/Stack';
import routes from '@/constants/routes';
import useEvent from '@/hooks/useEvent';
import { Tag } from '@/components/Tag';
import {
  StyledSideBar,
  StyledUserInfoCard,
  StyledCompleteInfoCard,
  UserName,
  Designation,
} from './styles';
import { type SidePanel } from '../types';
import { NoumMeModal } from '../NoumMeModal/Modal';

type SideBarProps = {
  data: SidePanel[] | undefined;
};

export default function SideBar(props: SideBarProps) {
  const [showNoumMeModal, setShowNoumMeModal] = useState<boolean>(false);

  const { t } = useTranslation();
  const navigate = useNavigate();
  const { user, isActive } = useAuth();
  const { data } = props;

  const title = data?.length && data[0]?.Title;
  const description = data?.length && data[0]?.Description;
  const buttonLabel = data?.length && data[0]?.Button_Label;

  const firstName = user?.firstName || '';
  const middleName = user?.middleName || '';
  const lastName = user?.lastName || '';
  const jobTitle = user?.title || '';
  const profilePicture = user?.profile?.profilePicture || '';

  const handleOpenNoumMeModal = useEvent(() => {
    setShowNoumMeModal(true);
  });
  const handleCloseNoumMeModal = useEvent(() => {
    setShowNoumMeModal(false);
  });

  return (
    <>
      <StyledSideBar>
        <StyledUserInfoCard profileImageUrl={profilePicture}>
          {!!profilePicture && <div className="image" />}
          {!profilePicture && (
            <Icon imageIconName="avatar_m" size={56} data-testid="avatarIcon" />
          )}
          <Spacer height={16} />
          <UserName
            font="heading-xs-bold"
            colorToken="--text-card-header-neutral-highlighted"
            title={`${firstName} ${middleName} ${lastName}`}
          >{`${firstName} ${middleName} ${lastName}`}</UserName>
          <Designation colorToken="--text-card-neutral-default">
            <Tag title={jobTitle}>
              <TSpan font="body-l" colorToken="--text-card-neutral-default">
                {jobTitle}
              </TSpan>
            </Tag>
          </Designation>
          <Spacer height={16} />
          <Button
            textOnly
            rightIcon={
              <Icon
                name="arrow_right_m"
                size={20}
                color="--icon-button-brand-secondary-default"
              />
            }
            onClick={() => navigate(routes.HOME_NOUM)}
          >
            {t('noumena.home.go_to_your_home_noum')}
          </Button>
        </StyledUserInfoCard>
        <StyledCompleteInfoCard>
          <TSpan
            font="body-xl-bold"
            colorToken="--text-card-neutral-alt-default"
          >
            {title}
          </TSpan>
          <Spacer height={16} />
          <TSpan font="body-l" colorToken="--text-card-brand-secondary-default">
            {description}
          </TSpan>
          <Spacer height={48} />
          <Button
            primary
            size="small"
            className={`${!isActive ? 'disabled' : ''}`}
            disabled={!isActive}
            onClick={handleOpenNoumMeModal}
          >
            {buttonLabel}
          </Button>
        </StyledCompleteInfoCard>
      </StyledSideBar>
      <NoumMeModal open={showNoumMeModal} onClose={handleCloseNoumMeModal} />
    </>
  );
}
