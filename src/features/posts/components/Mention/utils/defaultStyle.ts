export default {
  control: {
    backgroundColor: 'var(--bg-tablecell-neutral-alt-default)',
    fontWeight: 'normal',
  },

  '&multiLine': {
    control: {
      minHeight: 63,
    },
    highlighter: {
      padding: 9,
      border: '1px solid transparent',
    },
    input: {
      padding: 9,
      border: 'unset',
      borderRadius: 8,
      backgroundColor: 'var(--bg-input-brand-primary-hover)',
      color: 'var(--text-input-neutral-filled)',
      paddingTop: 22,
      paddingLeft: 12,
      fontFamily: 'var(--font-body-large-regular-font)',
      fontSize: 16,
      outlineColor: 'var(--text-input-brand-primary-default)',
    },
  },

  '&singleLine': {
    display: 'inline-block',
    width: 180,

    highlighter: {
      padding: 1,
      border: '2px inset transparent',
    },
    input: {
      padding: 1,
      border: '2px inset',
      borderRadius: 16,
      display: 'flex',
      alignItems: 'center',
      fontFamily: 'var(--font-family)',
    },
  },

  suggestions: {
    list: {
      backgroundColor: 'var(--bg-tablecell-neutral-alt-default)',
      fontSize: 14,
      borderRadius: 12,
    },
    item: {
      padding: '5px 15px',
      borderBottom: '1px solid var(--bg-separator-neutral-default)',
      '&focused': {
        backgroundColor: 'var(--bg-separator-neutral-default)',
        color: 'var(--text-tablecell-header-neutral-highlighted)',
      },
    },
  },
};
