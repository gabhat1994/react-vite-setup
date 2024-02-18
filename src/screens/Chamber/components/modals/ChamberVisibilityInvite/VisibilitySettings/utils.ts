import { ProjectChamberType } from '@/apollo/generated/types';

export function mapStringToProjectChamberType(
  value: string | undefined,
): ProjectChamberType {
  switch (value) {
    case 'PRIVATE':
      return ProjectChamberType.Private;
    case 'PUBLIC':
      return ProjectChamberType.Public;
    case 'SECRET':
      return ProjectChamberType.Secret;
    default:
      return ProjectChamberType.Public;
  }
}
