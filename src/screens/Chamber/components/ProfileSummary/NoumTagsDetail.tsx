import { NoumMemberStatus } from '@/apollo/generated/types';
import {
  type SpaceOutputFragment,
  type NoumMemberBasicFragment,
} from '@/apollo/graphql';
import { Tag } from '@/components/Tag';
import { MemberRoleTag } from '@/features/noums/components/MemberRoleTag';
import getBgColorByNoumType from '@/utils/getBgColorByNoumType';
import getColorByNoumType from '@/utils/getColorByNoumType';
import { useTranslation } from 'react-i18next';
import { SpaceUtils } from '@/utils/space';
import { useNoumContext } from '../../ViewChamber/ChamberProvider';
import { CQToken } from './CQToken';

interface NoumTagsDetailProps {
  isMasterNoum: boolean | undefined;
  disabled: boolean | undefined;
  member: NoumMemberBasicFragment | undefined | null;
  ownerTitle: string | undefined;
  title: string | undefined;
  icon: JSX.Element | undefined;
  noum: Pick<SpaceOutputFragment, 'uid'>;
}

const NoumTagsDetail = ({
  isMasterNoum,
  disabled,
  member,
  ownerTitle,
  title,
  icon,
}: NoumTagsDetailProps) => {
  const { space, isOwner } = useNoumContext();
  const isRiseApplication = SpaceUtils.isRiseApplicationNoum(space);
  const chamberTitle = isMasterNoum ? ownerTitle : title;
  const chamberType = chamberTitle?.toLocaleLowerCase();
  const { t } = useTranslation();

  return (
    <>
      {isMasterNoum && <CQToken />}
      {!isOwner && member?.status === NoumMemberStatus.Connected && (
        <MemberRoleTag member={member} />
      )}
      {!isMasterNoum && chamberTitle && chamberTitle.length > 0 && (
        <Tag
          icon={icon}
          title={chamberTitle}
          isCursorPointer={false}
          {...(!isMasterNoum && chamberType
            ? {
                color: `var(${getColorByNoumType(chamberType)})`,
                bgColor: `var(${getBgColorByNoumType(chamberType)})`,
              }
            : { secondary: true })}
          size="small"
        >
          {isRiseApplication ? t('noumena.rise_application') : chamberTitle}
        </Tag>
      )}
      {!isMasterNoum && !isRiseApplication && space?.projectType && (
        <Tag tertiary size="small" isCursorPointer={false}>
          {t(`noumena.noum.project_type.${space?.projectType}`)}
        </Tag>
      )}

      {disabled && <Tag tertiary>{t(`noumena.archived`)}</Tag>}
    </>
  );
};

export default NoumTagsDetail;
