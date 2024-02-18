import { ProjectChamberType } from '@/apollo/generated/types';
import ChamberDefaultImage from '@/assets/images/chamber_default.png';
import { Avatar } from '@/components/Avatar/Avatar';
import { type ChamberBoxNameEnum } from '@/components/ChamberBox/types';
import { Icon } from '@/components/Icon';
import { breakpoints } from '@/constants/devices';
import ROUTES from '@/constants/routes';
import { useToggle, useWindowDimensions } from '@/hooks';
import { Stack } from '@/layout';
import { useNoumsContext } from '@/providers';
import HandleUnlinkNoum from '@/screens/Chamber/components/modals/LinkNoum/HandleUnlinkNoum';
import LinkNoumModal from '@/screens/Chamber/components/modals/LinkNoum/LinkNoumModal';
import { type HandleUnlinkNoumRef } from '@/screens/Chamber/components/modals/LinkNoum/types';
import capitalizeFirstLetter from '@/utils/capitalizeFirstLetter';
import { format } from 'date-fns';
import { t } from 'i18next';
import { capitalize } from 'lodash';
import { useCallback, useMemo, useRef } from 'react';
import { useNavigate } from 'react-router';
import { colorsOfCategory, linkedNoumMenuOptions } from '../constants';
import EllipsisMenu from '../EllipsisMenu';
import {
  IncrementLinkNoum,
  LinkedNoum,
  LinkedTagLabel,
  LinkNoumHeadParent,
  ProjectsVisibiltyText,
  StyledLink,
  StyledLinkContainer,
  StyledTSpan,
} from '../styles';
import LinkDetails from './LinkDetailsModal';
import { type INoumContent } from './types';

const NoumContent = ({
  linkedNoums,
  noumsCount,
  connectionsCount,
  followersCount,
  linkedAt,
  noumLinkId,
  projectType,
}: INoumContent) => {
  const navigate = useNavigate();
  const handleUnlinkNoumRef = useRef<HandleUnlinkNoumRef>(null);
  const { refetchLinkedNoums } = useNoumsContext();
  const { width } = useWindowDimensions();
  const isMobile = useMemo(() => width < breakpoints.TABLET, [width]);
  const isTablet = useMemo(
    () => width >= breakpoints.TABLET && width <= breakpoints.TABLET_L,
    [width],
  );
  const enableIncrementNoumCount = isTablet || isMobile ? 3 : 4;
  const [isModalOpen, toggleModalOpen] = useToggle();
  const [isLinkNoumModal, toggleLinkNoumModal] = useToggle();

  const handleClick = useCallback(
    (e?: 'unlink' | 'link' | 'linkDetails' | string) => {
      if (e === 'unlink') {
        if (noumsCount > 2) {
          handleUnlinkNoumRef.current?.toggleUnlinkMultipleNoum();
        } else {
          handleUnlinkNoumRef.current?.toggleUnlinkConfirmationOpen();
        }
      } else if (e === 'link') {
        toggleLinkNoumModal();
      } else if (e === 'linkDetails') {
        toggleModalOpen();
      }
    },
    [noumsCount, toggleLinkNoumModal, toggleModalOpen],
  );

  const handleGoToLinkNoum = useCallback(() => {
    if (noumLinkId) {
      navigate(`${ROUTES.LINK_NOUM}?linkID=${noumLinkId}`);
    }
  }, [navigate, noumLinkId]);

  const projectVisibility = projectType?.toLowerCase();

  return (
    <LinkedNoum padding={16} vertical gap={16}>
      <Stack fullWidth justify="space-between">
        <StyledTSpan
          font="body-m"
          colorToken="--text-tablecell-header-neutral-highlighted"
          gap={8}
          isMobile={isMobile}
          style={{
            display: 'flex',
            alignItems: isMobile ? 'flex-start' : 'center',
          }}
        >
          <StyledTSpan
            font="body-l-bold"
            colorToken="--text-tablecell-header-neutral-highlighted"
          >
            {noumsCount} {t('noumena.link_noums.linked_noums_lower')}
          </StyledTSpan>
          {!isMobile && <div>&middot;</div>}
          <Stack gap={8}>
            <>
              {connectionsCount} {capitalize(t('noumena.connections'))}
            </>
            {projectType !== ProjectChamberType.Secret ? (
              <Stack gap={8}>
                <div>&middot;</div>
                <>
                  {followersCount} {capitalize(t('noumena.followers'))}
                </>
              </Stack>
            ) : null}

            <Stack gap={8}>
              <div>&middot;</div>
              <ProjectsVisibiltyText>{projectVisibility}</ProjectsVisibiltyText>
            </Stack>
          </Stack>
        </StyledTSpan>
        <EllipsisMenu
          menuOptions={linkedNoumMenuOptions}
          isMobile={isMobile}
          textOnly
          containerWidth="170"
          onClick={handleClick}
        />
      </Stack>
      <LinkNoumHeadParent fullWidth justify="space-between" gap={8}>
        {linkedNoums &&
          linkedNoums.length > 0 &&
          linkedNoums.map(
            (item, index) =>
              index < enableIncrementNoumCount && (
                <StyledLink to={`/noum/${item?._id}`} key={item?.name}>
                  <StyledLinkContainer>
                    <Avatar url={item?.profileImage ?? ChamberDefaultImage} />

                    <Stack gap={4} vertical>
                      <StyledTSpan
                        as="div"
                        isTurncate
                        font="body-m-bold"
                        colorToken="--link-card-neutral-highlighted"
                      >
                        {item?.name}
                      </StyledTSpan>
                      <LinkedTagLabel
                        bgColor={
                          colorsOfCategory[
                            item?.category?.name.toLowerCase() as ChamberBoxNameEnum
                          ].bgColor
                        }
                        color={
                          colorsOfCategory[
                            item?.category?.name.toLowerCase() as ChamberBoxNameEnum
                          ].color
                        }
                      >
                        {capitalizeFirstLetter(item?.category?.name ?? '')}
                      </LinkedTagLabel>
                    </Stack>
                  </StyledLinkContainer>
                </StyledLink>
              ),
          )}
        {noumsCount > enableIncrementNoumCount && (
          <IncrementLinkNoum
            align="center"
            padding={24}
            onClick={toggleModalOpen}
          >
            <Stack>
              <Icon
                name="plus_m"
                size={12}
                color="--link-card-neutral-highlighted"
              />
              <StyledTSpan
                as="div"
                font="body-m-bold"
                colorToken="--link-card-neutral-highlighted"
              >
                {noumsCount - enableIncrementNoumCount}
              </StyledTSpan>
            </Stack>
          </IncrementLinkNoum>
        )}
      </LinkNoumHeadParent>
      <LinkDetails
        noumsCount={noumsCount}
        connectionsCount={connectionsCount}
        followersCount={followersCount}
        isOpen={isModalOpen}
        handleClose={toggleModalOpen}
        noumLinkId={noumLinkId}
        linkedNoums={linkedNoums}
        projectType={projectType}
      />
      <StyledTSpan
        font="footnote"
        colorToken="--text-timestamp-neutral-default"
        gap={4}
      >
        <div>{t(`noumena.link_noums.linked_on`)}</div>
        <div>
          {linkedAt && format(new Date(linkedAt), 'dd MMM yyyy, h:mm a')}
        </div>
      </StyledTSpan>
      <LinkNoumModal
        handleClose={toggleLinkNoumModal}
        isOpen={isLinkNoumModal}
        goToNoumLink={handleGoToLinkNoum}
      />
      <HandleUnlinkNoum
        ref={handleUnlinkNoumRef}
        noumLink={{
          _id: noumLinkId,
          linkedNoums: linkedNoums ?? [],
          linkedNoumsCount: noumsCount,
        }}
        refetch={refetchLinkedNoums}
      />
    </LinkedNoum>
  );
};

export default NoumContent;
