import { Button, Icon } from '@/components';
import {
  useRedoNoumLayoutHelper,
  useUndoNoumLayoutHelper,
} from '@/features/noums/hooks/spaceQuery';
import { Stack } from '@/layout';
import { useEditChamberState } from '@/screens/Chamber/EditChamber/provider';

export const UndoRedo = () => {
  const { undoNoumLayoutChangeHelper, loading: undoLoader } =
    useUndoNoumLayoutHelper();
  const { redoNoumLayoutChangeHelper, loading: redoLoader } =
    useRedoNoumLayoutHelper();
  const { space, setSectionSideBarOptions } = useEditChamberState();
  const hasUndoAction = space?.layout?.hasUndoAction;
  const hasRedoAction = space?.layout?.hasRedoAction;

  const undoLayoutHandler = () => {
    if (!space?._id) return;
    const isUndoSuccess = undoNoumLayoutChangeHelper(space._id);
    if (!isUndoSuccess) return;
    setSectionSideBarOptions({});
  };

  const redoLayoutHandler = () => {
    if (!space?._id) return;
    redoNoumLayoutChangeHelper(space._id);
  };

  return (
    <Stack gap={16}>
      <Button
        size="small"
        tooltipText="Undo"
        tooltipPosition="bottom-center"
        icon={
          <Icon
            name="undo_m"
            size={24}
            color={
              hasUndoAction && !undoLoader
                ? '--icon-button-brand-primary-default'
                : '--icon-button-neutral-disabled'
            }
          />
        }
        textOnly
        disabled={!hasUndoAction || undoLoader}
        onClick={undoLayoutHandler}
      />
      <Button
        size="small"
        tooltipText="Redo"
        tooltipPosition="bottom-center"
        icon={
          <Icon
            name="redo_m"
            size={24}
            color={
              hasRedoAction && !redoLoader
                ? ' --icon-button-brand-primary-default'
                : '--icon-button-neutral-disabled'
            }
          />
        }
        disabled={!hasRedoAction || redoLoader}
        textOnly
        onClick={redoLayoutHandler}
      />
    </Stack>
  );
};
