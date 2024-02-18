import { UserUtil } from '@/utils/user';
import { TSpan } from '@/components/Typography';
import { Stack } from '@/layout';
import { getFullName } from '@/utils/fullName';
import { t } from 'i18next';
import { Avatar } from '@/components/Avatar/Avatar';
import { attendeesOptions } from './constants';
import EllipsisMenu from '../Chambers/EllipsisMenu';
import { type EventAttendeesProps } from './types';

export const AttendeesView = ({
  isHost,
  attendees,
  onRemove,
  isExpired,
  setFullName,
}: EventAttendeesProps): JSX.Element => (
  <>
    {attendees.length > 0 ? (
      attendees.map((attendee) => (
        <Stack
          key={attendee.userId?._id}
          padding="24px 16px"
          justify="space-between"
          align="center"
          borderBottom
        >
          <Stack align="center" justify="space-between" fullWidth>
            <Stack gap={16}>
              <Avatar
                url={UserUtil.getProfilePicture(attendee.userId) ?? ''}
                onClick={() => UserUtil.goToUserProfile(attendee.userId)}
              />
              <Stack
                vertical
                onClick={() => UserUtil.goToUserProfile(attendee.userId)}
              >
                <TSpan font="body-m-bold">
                  {getFullName(
                    attendee.userId?.firstName,
                    '',
                    attendee.userId?.lastName,
                  )}
                </TSpan>
                <TSpan
                  font="footnote"
                  colorToken="--text-tablecell-body-neutral-default"
                >
                  {attendee.userId?.title}
                </TSpan>
              </Stack>
            </Stack>
            {!isExpired && isHost && (
              <EllipsisMenu
                size="small"
                textOnly
                menuOptions={attendeesOptions}
                containerWidth="max-content"
                placement="bottom-end"
                onClick={() => {
                  setFullName(
                    getFullName(
                      attendee.userId?.firstName,
                      '',
                      attendee.userId?.lastName,
                    ),
                  );
                  onRemove(attendee);
                }}
              />
            )}
          </Stack>
        </Stack>
      ))
    ) : (
      <Stack padding="16px" align="center" borderBottom justify="center">
        <TSpan font="body-l">{t('noumena.editor.no_attendees_yet')}</TSpan>
      </Stack>
    )}
  </>
);
