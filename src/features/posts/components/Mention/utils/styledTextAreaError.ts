export default {
  control: {
    backgroundColor: 'var(--bg-tablecell-neutral-alt-default)',
    fontSize: 16,
    fontWeight: 'normal',
  },

  '&multiLine': {
    control: {
      fontFamily: 'var(--font-family)',
      minHeight: 100,
    },
    highlighter: {
      padding: 9,
    },
    input: {
      padding: 9,
      border: '1px solid var(--text-input-danger-primary-default)',
      borderRadius: 8,
      backgroundColor: 'var(--bg-tablecell-neutral-pressed)',
      paddingTop: 12,
      paddingLeft: 12,
      fontFamily: 'var(--font-body-large-regular-font)',
      fontSize: 16,
      width: '100%',
      height: '100%',
    },
  },

  '&singleLine': {
    display: 'inline-block',
    width: 180,

    highlighter: {
      padding: 1,
      border: '1px solid var(--text-input-danger-primary-default)',
    },
    input: {
      padding: 1,
      borderRadius: 16,
      display: 'flex',
      alignItems: 'center',
      fontFamily: 'var(--font-family)',
      border: '1px solid var(--text-input-danger-primary-default)',
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
