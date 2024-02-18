import { NoumLinkStatus } from '@/apollo/generated/types';
import {
  defaultVisibilityType,
  type NoumVisibility,
  type OptionType,
} from '@/screens/LinkNoum/types';
import ChamberDefaultImage from '@/assets/images/chamber_default.png';
import { capitalizeAllWord } from '@/utils/strings';
import {
  type LinkedNoumFragment,
  type NoumLinkFragment,
  type SpaceOutputFragment,
} from '@/apollo/graphql';
import { cleanList } from '@/utils/list';
import { type Maybe } from '@/common/types';

type DataType = Pick<
  SpaceOutputFragment,
  | 'name'
  | 'connectionsCount'
  | 'followersCount'
  | 'projectType'
  | '_id'
  | 'profileImage'
  | 'category'
  | 'type'
> & {
  link?:
    | (Pick<NoumLinkFragment, '_id' | 'status' | 'linkedNoumsCount'> & {
        linkedNoums?: Maybe<LinkedNoumFragment>[];
      })
    | null;
  members?: Maybe<{
    count?: number;
  }>;
};

export const transformNoum = ({
  data,
  defaultVal,
  subNoum,
  isElementPermissionsEnabled,
}: {
  data: DataType;
  defaultVal?: Partial<OptionType>;
  subNoum?: string;
  isElementPermissionsEnabled?: boolean;
}): OptionType => ({
  name: data.name ?? '',
  connections: isElementPermissionsEnabled
    ? data.members?.count ?? 0
    : data.connectionsCount ?? 0,
  followers: data.followersCount ?? 0,
  visibility: capitalizeAllWord(
    data.projectType ?? defaultVisibilityType,
  ) as NoumVisibility,
  checked: defaultVal?.checked || false,
  type: data.category?.name ?? capitalizeAllWord(data.type ?? '') ?? '',
  linked:
    data.link?.status === NoumLinkStatus.Linked
      ? (data.link?.linkedNoumsCount
          ? (data.link?.linkedNoumsCount ?? 1) - 1
          : 0) ?? 0
      : 0,
  linkedNoums:
    data.link?.status === NoumLinkStatus.Linked
      ? cleanList(data.link?.linkedNoums).map((linkedNoum) =>
          transformNoum({
            data: linkedNoum as DataType,
            defaultVal: {},
            subNoum: data._id ?? '',
          }),
        )
      : [],
  linkId: data.link?._id ?? '',
  spaceId: data._id ?? '',
  profileImage: data.profileImage ?? ChamberDefaultImage,
  disabled: defaultVal?.disabled ?? false,
  isSubNoum: !!subNoum,
  key: subNoum ? `${subNoum}-${data._id ?? ''}` : data._id ?? '',
});
