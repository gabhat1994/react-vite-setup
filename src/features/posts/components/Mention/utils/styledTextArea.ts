export const styledTextArea = (
  minHeight: number | undefined,
  maxHeight: number | undefined,
) => ({
  control: {
    backgroundColor: 'var(--bg-tablecell-neutral-alt-default)',
    fontSize: 16,
    fontWeight: 'normal',
  },

  '&multiLine': {
    control: {
      fontFamily: 'var(--font-family)',
      minHeight: minHeight ?? 56,
    },
    highlighter: {
      padding: 9,
      border: '1px solid transparent',
    },
    input: {
      padding: '16px 12px',
      border: 'unset',
      borderRadius: 8,
      backgroundColor: 'var(--bg-input-neutral-default)',
      fontFamily: 'var(--font-body-large-regular-font)',
      color: 'var(--text-input-neutral-filled)',
      fontSize: 16,
      width: '99%',
      marginLeft: '0.5%',
      height: '100%',
      maxHeight,
      outlineColor: 'var(--text-input-brand-primary-default)',
      overflowY: 'auto',
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
      outline: '2px inset',
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
});
