function setTitleBadge(newValue: number) {
  if (!('title' in document)) {
    return;
  }

  clearTitleBadge();
  if (newValue > 0) {
    document.title = `(${newValue}) ${document.title}`;
  }
}

function clearTitleBadge() {
  document.title = document.title.replace(/^\(\d+\) /, '');
}

function setPwaAppBadge(newValue: number) {
  navigator.setAppBadge?.(newValue);
}

function clearPwaAppBadge() {
  navigator.clearAppBadge?.();
}

export const AppBadge = {
  setTitleBadge,
  clearTitleBadge,
  setPwaAppBadge,
  clearPwaAppBadge,
};
