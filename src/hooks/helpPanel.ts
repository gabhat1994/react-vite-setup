export function useHelpPanel() {
  return {
    toggleHelpPanel: () => {
      const helpButton = document
        .querySelector<HTMLIFrameElement>('#launcher-frame')
        ?.contentWindow?.document.body.querySelector<HTMLIFrameElement>(
          '[data-testid="launcher-wrapper"]',
        );

      helpButton?.click();
    },
  };
}
