import { useTranslation } from 'react-i18next';
import Skeleton from 'react-loading-skeleton';
import { type FooterActionsProps } from '@/screens/Chamber/components/elements/FooterActions/types';
import {
  ButtonWrap,
  ItemFooter,
} from '@/screens/Chamber/components/elements/PostElement/components/PostItem/styles';
import { Icon } from '@/components/Icon';
import { TSpan } from '@/components/Typography';
import { Spacer } from '@/layout';
import { ICON_SIZE } from '@/screens/Chamber/components/elements/PostElement/components/PostItem/constants';

const FooterActions = ({
  handleLike,
  handleComment,
  isLiked,
  numberOfComments,
  showComments,
  isSkeletonVisible = false,
}: FooterActionsProps) => {
  const { t } = useTranslation();

  return (
    <ItemFooter>
      <ButtonWrap onClick={handleLike}>
        <Icon
          name="thumb_up_m"
          size={ICON_SIZE}
          color={
            isLiked
              ? '--icon-card-brand-primary-default'
              : '--icon-card-neutral-default'
          }
        />
        <TSpan
          colorToken={
            isLiked
              ? '--button-card-brand-primary-default'
              : '--button-card-neutral-default'
          }
          font="body-m-bold"
          style={{ marginLeft: 10 }}
        >
          {isSkeletonVisible ? (
            <Skeleton width={62} height={24} />
          ) : isLiked ? (
            t('noumena.reaction.liked')
          ) : (
            t('noumena.reaction.like')
          )}
        </TSpan>
      </ButtonWrap>

      <Spacer width={ICON_SIZE} />

      <ButtonWrap onClick={handleComment}>
        <Icon
          name="message_m"
          size={ICON_SIZE}
          color={
            showComments
              ? '--icon-card-brand-primary-default'
              : '--icon-card-neutral-default'
          }
        />
        <TSpan
          colorToken={
            showComments
              ? '--button-card-brand-primary-default'
              : '--button-card-neutral-default'
          }
          font="body-m-bold"
          style={{ marginLeft: 10 }}
        >
          {isSkeletonVisible ? (
            <Skeleton width={62} height={24} />
          ) : numberOfComments && numberOfComments > 0 ? (
            numberOfComments
          ) : (
            t('noumena.reaction.comment')
          )}
        </TSpan>
      </ButtonWrap>
    </ItemFooter>
  );
};

export default FooterActions;
