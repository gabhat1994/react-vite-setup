import { forwardRef, type Ref } from 'react';
import { format } from 'date-fns';
import { Avatar } from '@/components/Avatar/Avatar';
import { Stack } from '@/layout';
import { TSpan } from '@/components/Typography';

import { generatePath, useNavigate } from 'react-router';
import ROUTES from '@/constants/routes';
import { t } from 'i18next';
import { Trans } from 'react-i18next';
import { type ProjectRequest } from './types';

export const ProjectRequestInformation = forwardRef(
  (
    {
      profileURL,
      date,
      noumId,
      projectName,
      userName,
      isRequested,
    }: ProjectRequest,
    ref: Ref<HTMLDivElement>,
  ) => {
    const navigate = useNavigate();
    const handleClick = () => {
      navigate(generatePath(ROUTES.NOUM, { id: noumId }));
    };

    const labelForDateTime = isRequested
      ? t(`noumena.noum.requested_by`, {
          userName,
        })
      : t(`noumena.noum.invited_by_`, {
          userName,
        });
    const dateTime = date ? format(new Date(date), 'dd MMM yyyy') : '';
    return (
      <Stack
        data-testid="MemberRequest_container"
        ref={ref}
        onClick={handleClick}
        padding={12}
      >
        <Stack gap={12} align="center">
          <Avatar url={profileURL || ''} />
          <Stack vertical>
            <Stack align="center" gap={8}>
              <TSpan
                font="body-m-bold"
                colorToken="--text-tablecell-header-neutral-highlighted"
              >
                {projectName}
              </TSpan>
            </Stack>
            <TSpan
              font="footnote"
              colorToken="--text-timestamp-neutral-default"
            >
              <Trans
                i18nKey="noumena.noums.requests_or_invites_item.date_time_information"
                values={{ labelForDateTime, dateTime }}
                components={{
                  link1: <TSpan font="footnote-bold" />,
                }}
              />
            </TSpan>
          </Stack>
        </Stack>
      </Stack>
    );
  },
);
