import { type IUser } from '../types/context';

export const isMembersChanged = (
  original: IUser[],
  newUsers: IUser[],
): boolean => {
  if (original.length !== newUsers.length) return true;

  const originalIds: string[] = original.map((o) => o._id!).sort();
  const newUserIds: string[] = newUsers.map((o) => o._id!).sort();

  return originalIds.some((item, index) => item !== newUserIds[index]);
};
