import {
  type NmUserInput,
  type InviteNonNoumenaMemberInput,
} from '@/apollo/generated/types';
import { type SpaceOutputFragment } from '@/apollo/graphql';
import { UserUtil } from '@/utils/user';
import { type Maybe } from '@/common/types';
import { type InviteNonMemberValues } from './schema';

function toNmUserInput(
  noumId: string,
  values: InviteNonMemberValues,
  space: Maybe<SpaceOutputFragment>,
): NmUserInput {
  return {
    noumDetails: {
      owner: UserUtil.renderFullName(space?.uid),
      profileUrl: space?.profileImage ?? '',
      title: space?.name ?? '',
      type: space?.category?.name ?? '',
    },
    requestedForNoumId: noumId,
    message: values.message,
    email: values.email,
    firstName: values.firstName,
    lastName: values.lastName,
  };
}

function toInviteNonNoumenaMemberInput(
  noumId: string,
  values: InviteNonMemberValues,
): InviteNonNoumenaMemberInput {
  return {
    noumId,
    email: values.email,
    firstName: values.firstName,
    lastName: values.lastName,
    invitationMessage: values.message,
  };
}

export const InviteNonMemberFormMapper = {
  toInviteNonNoumenaMemberInput,
  toNmUserInput,
};
