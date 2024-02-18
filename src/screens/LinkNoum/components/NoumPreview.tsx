import { t } from 'i18next';
import React from 'react';
import { Icon } from '@/components/Icon';
import { Avatar } from '@/components/Avatar/Avatar';
import { TSpan } from '@/components/Typography';
import {
  PreviewContainer,
  PreviewItem,
  IconMainContainer,
  IconDivider,
  IconContainer,
  NoumPreview as NoumPreviewContainer,
} from '../styles';
import ResultContainer from './ResultContainer';
import { type NoumPreviewProps } from './types';
import NoumOptionTag from './NoumOptionTag';

export const NoumPreview: React.FC<NoumPreviewProps> = ({
  options: previewOptions,
  visibility,
  connections,
  followers,
  loading,
  isDesktop,
  unLinkedSelected,
}) => (
  <NoumPreviewContainer>
    {isDesktop ? (
      <TSpan font="body-l-bold" colorToken="--text-body-neutral-default">
        {t(`noumena.link_noums.preview`, {
          punctuation: ':',
        })}
      </TSpan>
    ) : null}
    <PreviewContainer>
      {previewOptions.map((item) => (
        <React.Fragment key={item.key}>
          <PreviewItem border="solid">
            <Avatar url={item.profileImage} />
            <TSpan
              singleLine
              font="body-m-bold"
              style={{
                marginLeft: '12px',
                marginRight: 'auto',
                width: 'calc(100% - 120px)',
              }}
              colorToken="--text-tablecell-header-neutral-highlighted"
            >
              {item.name}
            </TSpan>
            <NoumOptionTag type={item.type} />
          </PreviewItem>
          <IconMainContainer>
            <IconDivider />
            <IconContainer>
              <Icon
                name="link_m"
                size={16}
                color="--icon-card-neutral-default"
              />
            </IconContainer>
          </IconMainContainer>
        </React.Fragment>
      ))}
      <PreviewItem border="dashed">
        <TSpan colorToken="--text-placeholder-neutral-default" font="body-m">
          {previewOptions?.length > 1
            ? t('noumena.link_noums.select_noums_optional')
            : t('noumena.link_noums.select_noums')}
        </TSpan>
      </PreviewItem>
    </PreviewContainer>
    {unLinkedSelected && isDesktop ? (
      <ResultContainer
        visibility={visibility}
        selectedNoums={previewOptions.length}
        followers={followers}
        connections={connections}
        loading={loading}
      />
    ) : undefined}
  </NoumPreviewContainer>
);
