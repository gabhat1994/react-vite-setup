export const displayNameEllipsis = (width: number, userName: string) => {
  const SCREEN_BREAK_POINT = 1024;
  let name = userName;
  if (width >= SCREEN_BREAK_POINT && userName.length > 20) {
    name = `${userName.substring(0, 17)}...`;
  }
  if (width < SCREEN_BREAK_POINT && userName.length > 10) {
    name = `${userName.substring(0, 7)}...`;
  }
  return name;
};
