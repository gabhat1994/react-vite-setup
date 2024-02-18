export const EXAMPLE_POST_ID = 'example-post-id';

export const isValidPostId = (postId?: string): boolean =>
  !!postId && !(postId === '' || postId.includes(EXAMPLE_POST_ID));

export const htmlToPlainText = (html: string) => {
  const tempDivElement = document.createElement('div');
  tempDivElement.innerHTML = html;
  return tempDivElement.textContent || tempDivElement.innerText || '';
};
