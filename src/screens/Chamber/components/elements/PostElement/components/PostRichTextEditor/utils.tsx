import { TSpan } from '@/components';
import createLinkifyPlugin from '@draft-js-plugins/linkify';
import createMentionPlugin from '@draft-js-plugins/mention';
import '@draft-js-plugins/mention/lib/plugin.css';
import createToolbarPlugin from '@draft-js-plugins/static-toolbar';
import '@draft-js-plugins/static-toolbar/lib/plugin.css';
import { type EntityInstance, type RawDraftContentState } from 'draft-js';
import { type Options as OptionsStateToHTML } from 'draft-js-export-html';
import { type Options as OptionsStateFromHTML } from 'draft-js-import-html';
import 'draft-js/dist/Draft.css';
import Immutable from 'immutable';
import { get } from 'lodash';
import mentionStyles from './MentionStyles.module.css';
import { MentionLink } from './styles';
import { type EditorBlock } from './type';

const parseRawWithMentions = (raw: RawDraftContentState) => {
  const newRaw = Object.assign(raw);
  Object.keys(raw.entityMap).forEach((key) => {
    const entity = raw.entityMap[key];
    if (
      entity?.data['data-mention-id'] ||
      entity?.data['data-test'] === 'mentionPlugin-MentionLink'
    ) {
      const noumId = entity.data?.url?.replace(/\/noum\//, '');
      newRaw.entityMap[key] = {
        type: 'mention',
        mutability: 'IMMUTABLE',
        data: {
          mention: {
            name: entity?.data['data-mention-id'] || entity?.data?.title,
            link: noumId,
            id: noumId,
          },
        },
      };
    }
  });
  return newRaw;
};

const truncateBlocksByLength = (blocks: EditorBlock[], maxLength?: number) => {
  if (!maxLength) return blocks;

  const { list } = Object.values(blocks).reduce<{
    list: EditorBlock[];
    sum: number;
  }>(
    (acc, block) => {
      acc.sum += block.text.length;
      if (maxLength > acc.sum) {
        acc.list.push(block);
      } else {
        const newText = block.text.substring(
          0,
          block.text.length - (acc.sum - maxLength),
        );
        if (newText.length > 0) {
          acc.list.push({ ...block, text: `${newText}...` });
        }
      }
      return acc;
    },
    { list: [], sum: 0 },
  );
  return list;
};

const htmlOptions: OptionsStateToHTML = {
  entityStyleFn: (entity: EntityInstance) => {
    const entityType = entity.getType().toLowerCase();
    if (entityType === 'mention') {
      const data = entity.getData();
      return {
        element: 'a',
        attributes: {
          'data-mention-id': get(data, 'mention.name'),
          href: get(data, 'mention.link'),
          class: 'draft-mention',
        },
        style: {},
      };
    }
    if (entityType === '#mention') {
      const data = entity.getData();
      return {
        element: 'a',
        attributes: {
          'data-mention-id': get(data, 'mention.name'),
          href: get(data, 'mention.link'),
          class: 'draft-mention',
        },
        style: {},
      };
    }
    return undefined;
  },
};

const clipboardOptions: OptionsStateFromHTML = {
  customInlineFn: (element) => {
    const styleValue = element.getAttribute('style');
    let styleForEntity;
    if (!styleValue) return undefined;
    if (styleValue.indexOf('bold') > -1) {
      styleForEntity = 'BOLD';
    }
    return styleForEntity
      ? { type: 'STYLE', style: styleForEntity }
      : undefined;
  },
};

const styleMap = {
  BOLD: {
    fontWeight: 'var(--font-body-medium-bold-weight)',
  },
};

const blockRenderMap = Immutable.Map({
  'header-one': {
    element: 'div',
    wrapper: (
      <TSpan
        className="header-one"
        font="heading-s-bold"
        color="--text-input-neutral-filled"
      />
    ),
  },
  'header-two': {
    element: 'div',
    wrapper: (
      <TSpan
        className="header-two"
        font="body-xl-bold"
        color="--text-input-neutral-filled"
      />
    ),
  },
  unstyled: {
    element: 'div',
    wrapper: <TSpan font="body-m" color="--text-input-neutral-filled" />,
  },
});

const getPlugins = () => {
  const toolbarPlugin = createToolbarPlugin();
  const linkifyPlugin = createLinkifyPlugin({ target: '_blank' });
  const mentionPlugin = createMentionPlugin({
    theme: mentionStyles,
    entityMutability: 'IMMUTABLE',
    mentionPrefix: '@',
    mentionTrigger: '@',
    supportWhitespace: true,
    mentionComponent: (mentionProps) => {
      const href = `/noum/${mentionProps.mention.link}`;
      return (
        <MentionLink to={href} title={mentionProps.mention.name}>
          {mentionProps.mention.name}
        </MentionLink>
      );
    },
  });
  const { Toolbar } = toolbarPlugin;
  const { MentionSuggestions } = mentionPlugin;
  const plugins = [toolbarPlugin, mentionPlugin, linkifyPlugin];
  return {
    plugins,
    Toolbar,
    MentionSuggestions,
  };
};

export const EditorUtils = {
  parseRawWithMentions,
  truncateBlocksByLength,
  htmlOptions,
  clipboardOptions,
  styleMap,
  blockRenderMap,
  getPlugins,
};
