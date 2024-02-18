import { Fragment, useMemo } from 'react';
import { Trans, useTranslation } from 'react-i18next';
import generate from 'uniqid';
import Skeleton from 'react-loading-skeleton';
import capitalizeFirstLetter from '@/utils/capitalizeFirstLetter';
import riseAvatar from '@/assets/images/riseavatar.png';
import { Avatar, AVATAR_SIZE } from '@/components/Avatar/Avatar';
import ChamberDefaultImage from '@/assets/images/chamber_default.png';
import { useSkeletonIsLoadingContext } from '@/components/SkeletonLoader/SkeletonLoaderProvider';
import { useTimeIndicator } from '@/hooks';
import { TSpan } from '@/components/Typography';
import { typeOfChamberBox } from './consts';
import SkeletonChamberBox, { StyledSkeleton } from './SkeletonChamberBox';
import {
  AvatarBackground,
  BodySection,
  ChamberWrapper,
  FooterSection,
  HeaderTitle,
  MemberTitle,
  OwnedBy,
  OwnedByBold,
  TagLabel,
  TopBackground,
  Underline,
  UnpublishedNote,
  FavouriteIcon,
} from './styles';
import {
  ChamberBoxNameEnum,
  type ChamberBoxProps,
  DiscoveryCategoryEnum,
} from './types';

const AVATAR_SIZE_INDEX = 'XVL';

export default function ChamberBox({
  id,
  chamberUrl = '#',
  url,
  ownerImageURL,
  title,
  name,
  ownedby,
  followers,
  archived,
  location,
  chamberTitle,
  category,
  startDate,
  hasDraftElement = false,
  isSecretNoum = false,
  isFavouriteNoum = false,
  projectType = '',
}: ChamberBoxProps) {
  const { t } = useTranslation();
  const { isLoading } = useSkeletonIsLoadingContext();
  const isMemberNoLocation = useMemo(
    () => name === ChamberBoxNameEnum.member && !location,
    [location, name],
  );

  const [countDown] = useTimeIndicator(startDate ?? '');

  const isRiseNoum = name === ChamberBoxNameEnum.rise;

  const isRiseApplication = name === ChamberBoxNameEnum.rise_application;

  const avatarURL = useMemo(() => {
    const isMember = name === ChamberBoxNameEnum.member;
    let avatar;
    if (isRiseNoum || isRiseApplication) {
      avatar = riseAvatar;
      return avatar;
    }
    if (isMember && !url) {
      avatar = ownerImageURL;
    } else if (!isMember && !url) {
      avatar = ChamberDefaultImage;
    } else {
      avatar = isMember ? ownerImageURL : url;
    }
    return avatar;
  }, [name, isRiseNoum, isRiseApplication, url, ownerImageURL]);

  const widthHeight = AVATAR_SIZE[AVATAR_SIZE_INDEX];

  return (
    <ChamberWrapper
      data-testid="chamberbox-testid"
      key={id || generate()}
      to={isLoading ? '' : chamberUrl}
      cursor={isLoading ? 'auto' : 'pointer'}
    >
      <div>
        <TopBackground
          bgColor={isLoading ? 'unset' : typeOfChamberBox[name]?.bgColor}
        >
          {isFavouriteNoum && (
            <FavouriteIcon
              name="star_filled_m"
              color="--icon-button-neutral-pressed"
              size={24}
            />
          )}
          {isLoading && <Skeleton height={56} />}
        </TopBackground>
        <AvatarBackground archived={archived}>
          {isLoading ? (
            <Skeleton width={widthHeight} height={widthHeight} />
          ) : (
            <Avatar
              opacity={archived ? 0.4 : 1}
              url={avatarURL}
              size={AVATAR_SIZE_INDEX}
            />
          )}
        </AvatarBackground>
        <TagLabel
          data-testid="chamberbox-tag-label"
          bgColor={typeOfChamberBox[name]?.bgColor}
          color={typeOfChamberBox[name]?.color}
        >
          {isLoading ? (
            <StyledSkeleton w={40} h={18} r={8} />
          ) : isRiseApplication ? (
            t('noumena.rise_application')
          ) : (
            capitalizeFirstLetter(name)
          )}
        </TagLabel>
      </div>
      <BodySection>
        <HeaderTitle
          archived={archived}
          isMemberNoLocation={isMemberNoLocation}
          isEllipsis={hasDraftElement}
        >
          {isLoading ? (
            <SkeletonChamberBox />
          ) : name === ChamberBoxNameEnum.member ? (
            ownedby
          ) : (
            chamberTitle
          )}
        </HeaderTitle>
        <OwnedBy data-testid="test-owned-by" archived={archived}>
          {archived && (
            <Trans
              i18nKey="noumena.archived_owned_by"
              components={{
                badge: (
                  <TSpan
                    font="body-m-bold"
                    colorToken="--text-tag-neutral-default"
                  />
                ),
                dot: (
                  <TSpan
                    font="body-m-bold"
                    colorToken="--text-card-neutral-default"
                  />
                ),
              }}
            />
          )}
          {name === ChamberBoxNameEnum.member ? (
            <MemberTitle>{title}</MemberTitle>
          ) : (
            <Trans
              i18nKey="noumena.chamberBox.ownedby"
              values={{
                name: ownedby,
              }}
              components={{
                strong: <OwnedByBold title={ownedby} />,
              }}
            />
          )}
        </OwnedBy>
        {category === DiscoveryCategoryEnum.Featured && startDate && (
          <TSpan
            font="body-s"
            colorToken="--text-card-neutral-default"
            style={{ margin: 'auto' }}
          >
            {t('noumena.discovery.featured.broadcasting.countdown', {
              countDown,
            })}
          </TSpan>
        )}
        {hasDraftElement && (
          <UnpublishedNote
            colorToken="--text-card-brand-primary-default"
            font="body-s"
          >
            ({t('noumena.chamberBox.unpublished_changes')})
          </UnpublishedNote>
        )}
      </BodySection>
      <FooterSection hide={isMemberNoLocation}>
        <Underline />
        <TSpan
          flex="max-content"
          font="footnote"
          colorToken="--text-card-neutral-default"
        >
          {name !== ChamberBoxNameEnum.member &&
            !isRiseApplication &&
            !isRiseNoum && (
              <>
                {[
                  projectType &&
                    capitalizeFirstLetter(projectType.toLocaleLowerCase()),
                  !isSecretNoum &&
                    t('noumena.chamberBox.followers', { count: followers }),
                ]
                  .filter(Boolean)
                  .map((item, index) => (
                    <Fragment key={`${item}`}>
                      {!!index && <> &#xb7; </>}
                      {item}
                    </Fragment>
                  ))}
              </>
            )}
          {name === ChamberBoxNameEnum.member && <>{location || ' '} </>}
        </TSpan>
      </FooterSection>
    </ChamberWrapper>
  );
}
