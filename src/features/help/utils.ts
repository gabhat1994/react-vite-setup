/**
 * @method to position side provider help button that opens chat
 * called on Account Settings and hide iframe to show HELP item
 */
const setHelperPosition = () => {
  const help = document.querySelector<HTMLIFrameElement>('#launcher-frame');
  const logOut = document.querySelector(
    '[data-testid="SideMenu-LogoutWrapper"]',
  );
  if (!help) return;
  const innerDocument = (help.contentDocument ||
    help?.contentWindow?.document) as unknown as HTMLElement;
  const innerHelp = innerDocument?.getElementsByClassName(
    'launcher-button',
  )[0] as HTMLElement;
  if (!logOut) {
    help?.style?.setProperty('opacity', `1`);
    help?.style?.setProperty('bottom', `22px`);
    help?.style?.setProperty('top', `unset`);
    help?.style?.setProperty('transform', 'unset');
    help?.style?.setProperty('max-width', '156px');
    help?.style?.setProperty('z-index', '1000001', 'important');
    innerHelp?.style?.setProperty('width', 'unset');
    return;
  }
  const offset =
    logOut.getBoundingClientRect().top + document.body.offsetTop - 60;
  help?.style?.setProperty('opacity', `0`);
  help?.style?.setProperty('bottom', `unset`);
  help?.style?.setProperty('top', `${offset}px`);
  help?.style?.setProperty('transform', 'translateX(36px)');
  help?.style?.setProperty('max-width', '360px');
  innerHelp?.style?.setProperty('width', '275px');
};

export const defaultStyles = {
  opacity: '1',
  bottom: `22px`,
  top: `unset`,
  transform: 'unset',
  'max-width': '156px',
  'z-index': '1000001',
  width: 'unset',
  left: { value: '0', priority: 'unimportant' },
  right: { value: 'unset', priority: 'unimportant' },
  display: 'none',
};

export const setCSSStyles = (
  el: HTMLElement | null,
  options: typeof defaultStyles,
) => {
  if (!el) return;
  Object.keys(options).map((key) =>
    // @ts-ignore
    typeof options[key] === 'string'
      ? // @ts-ignore
        el?.style?.setProperty(key, options[key])
      : // @ts-ignore
        el?.style?.setProperty(key, options[key]?.value, options[key].priority),
  );
};

export const resetHelpStyles = (display: string = 'none') => {
  const node = document.querySelector('#launcher-frame') as HTMLElement;
  if (!node) return;
  setCSSStyles(node, { ...defaultStyles, display });
  ['left', 'right', 'top'].map((key) => node.style?.removeProperty?.(key));
};

export default setHelperPosition;
