import { type FC, useCallback, useMemo, useState } from 'react';
import { t } from 'i18next';
import { Trans } from 'react-i18next';
import { sumBy } from 'lodash';
import { Avatar } from '@/components/Avatar/Avatar';
import { Button } from '@/components/Button';
import { TSpan } from '@/components/Typography';
import { UserUtil } from '@/utils/user';
import { distanceDate } from '@/utils/date';
import convertToCurrency from '@/utils/currencyToCurrency';
import { CurrencyEnum, type TipOutput } from '@/apollo/generated/types';
import { useAuth } from '@/features/auth/contexts';
import { useLaunchDarkly } from '@/hooks/launchDarkly';
import { useNoumContext } from '@/screens/Chamber/ViewChamber/ChamberProvider';
import { useNoumUserConnectionContext } from '@/features/noums/contexts/NoumUserConnectionContext';
import {
  AvatarWrapper,
  ContentWrapper,
  HeaderWrapper,
  TipWrapper,
  Wrapper,
} from './styles';
import { AnswerElementType, type AnswerProps } from './types';

const TipsSection = (
  props: {
    userId: string;
    tips: TipOutput[];
    showTipButton?: boolean;
  } & Pick<AnswerProps, 'onTip' | 'onShowAllTips'>,
) => {
  const [isChecking, setIsChecking] = useState(false);
  const { userId, tips, showTipButton, onTip, onShowAllTips } = props;
  const hasTips = tips.length > 0;
  const hasMyTip = tips.some((tip) => tip.tipBy?._id === userId);
  const i18nKey =
    hasMyTip && tips.length === 1
      ? 'noumena.quick_questions.users_tipped'
      : 'noumena.quick_questions.tipped_by_users';

  const tipAmount = convertToCurrency(
    sumBy(tips, 'amount'),
    CurrencyEnum.Usd,
    2,
  );

  const users = useMemo(() => {
    if (!hasTips) return undefined;

    let value = hasMyTip
      ? t('noumena.quick_questions.you')
      : UserUtil.renderFullName(tips[0].tipBy);
    if (tips.length === 2) {
      value += ` and ${tips.length - 1} user`;
    }
    if (tips.length > 2) {
      value += ` and ${tips.length - 1} users`;
    }

    return value;
  }, [hasMyTip, hasTips, tips]);

  const handleTip = useCallback(async () => {
    setIsChecking(true);
    await onTip?.();
    setIsChecking(false);
  }, [onTip]);

  return (
    <TipWrapper>
      {showTipButton && !hasMyTip && (
        <Button loading={isChecking} size="small" neutral onClick={handleTip}>
          {t('noumena.quick_questions.tip')}
        </Button>
      )}
      {hasTips && (
        <TSpan
          cursor={onShowAllTips ? 'pointer' : undefined}
          font="body-m"
          colorToken="--text-card-neutral-default"
          onClick={onShowAllTips}
        >
          <Trans
            i18nKey={i18nKey}
            values={{
              users,
              tipAmount,
            }}
            components={{
              TipAmount: (
                <TSpan
                  font="body-m-bold"
                  colorToken="--text-card-neutral-highlighted"
                />
              ),
            }}
          />
        </TSpan>
      )}
    </TipWrapper>
  );
};

const Answer: FC<AnswerProps> = (props) => {
  const { answer, type, isClosedQuestion, onTip, onShowAllTips } = props;
  const { user } = useAuth();
  const { isOwner } = useNoumContext();
  const { isConnected } = useNoumUserConnectionContext();
  const {
    flags: { webTips },
  } = useLaunchDarkly();

  const {
    fullName,
    createdDateAtTime,
    avatarUrl,
    isAvatar,
    isAllAnswersModal,
    isMyAnswer,
  } = useMemo(
    () => ({
      fullName: UserUtil.renderFullName(answer?.user),
      createdDateAtTime: distanceDate(answer.createdAt),
      avatarUrl: UserUtil.getProfilePicture(answer.user),
      isAvatar: [
        AnswerElementType.ALL_ANSWERS_MODAL,
        AnswerElementType.MY_TIPS,
      ].includes(type),
      isAllAnswersModal: type === AnswerElementType.ALL_ANSWERS_MODAL,
      isMyAnswer: answer.user?._id === user?._id,
    }),
    [answer, type, user],
  );

  const isVisitableOtherProfile = !(
    isMyAnswer ||
    UserUtil.isUnregistered(user) ||
    UserUtil.isUnregistered(answer.user)
  );

  const onClickUser = () => {
    if (!isVisitableOtherProfile) return;
    UserUtil.goToUserProfile(answer.user);
  };

  return (
    <Wrapper fullWidth>
      {isAvatar && (
        <AvatarWrapper>
          <Avatar
            url={avatarUrl}
            size="L"
            onClick={onClickUser}
            overridedIcon={
              type === AnswerElementType.MY_TIPS
                ? isMyAnswer
                  ? 'arrow_down_m'
                  : 'arrow_up_m'
                : undefined
            }
          />
        </AvatarWrapper>
      )}
      <ContentWrapper isMyAnswer={isMyAnswer && isAllAnswersModal}>
        <HeaderWrapper fullWidth>
          <TSpan
            font="body-m-bold"
            cursor={isVisitableOtherProfile ? 'pointer' : 'default  '}
            colorToken={
              isMyAnswer && isAllAnswersModal
                ? '--text-comment-brand-primary-default'
                : '--text-comment-header-neutral-highlighted'
            }
            onClick={onClickUser}
          >
            {isMyAnswer
              ? t(
                  isAllAnswersModal
                    ? 'noumena.quick_questions.you'
                    : 'noumena.quick_questions.your_answer',
                )
              : fullName}
          </TSpan>
          {isAllAnswersModal && (
            <TSpan
              font="body-m"
              colorToken={
                isMyAnswer
                  ? '--text-timestamp-brand-primary-default'
                  : '--text-timestamp-neutral-default'
              }
            >
              {createdDateAtTime}
            </TSpan>
          )}
        </HeaderWrapper>
        <TSpan font="body-m" colorToken="--text-comment-neutral-highlighted">
          {answer.body}
        </TSpan>
        {!!answer.tipDetails?.length && webTips && (
          <TipsSection
            userId={user?._id || ''}
            tips={answer.tipDetails || []}
            showTipButton={
              !isClosedQuestion &&
              (isConnected || isOwner) &&
              !isMyAnswer &&
              isAllAnswersModal
            }
            onTip={onTip}
            onShowAllTips={onShowAllTips}
          />
        )}
      </ContentWrapper>
    </Wrapper>
  );
};

export default Answer;
