import { getSpaceById } from '@/screens/Chamber/ViewChamber/mockdata';
import { useNoumContext } from '@/screens/Chamber/ViewChamber/ChamberProvider';
import { type IChamberContext } from '@/screens/Chamber/ViewChamber/types';

vi.mock('@/screens/Chamber/ViewChamber/ChamberProvider');

export const useNoumContextMock = vi.mocked(useNoumContext);

export const useNoumContextReturnValue: IChamberContext = {
  loading: false,
  loadingSpace: false,
  space: getSpaceById,
  isOwner: false,
  refetchSpaceByConfig: vi.fn(),
  refetchSpaceById: vi.fn(),
  editDisabled: false,
};
