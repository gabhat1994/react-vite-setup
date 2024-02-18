import { memo, useCallback, useEffect, useState } from 'react';
import { t } from 'i18next';
import { RichTextEditor } from '@/features/richTextEditor';
import SkeletonLoaderTextElement from '@/screens/Chamber/components/elements/SkeletonLoader/SkeletonLoaderTextElement';
import { useSkeletonIsLoadingContext } from '@/components/SkeletonLoader/SkeletonLoaderProvider';
import { ApplicationResultStatusAdmin } from '@/apollo/generated/types';
import { useGetNoumClassByNoumIdQuery } from '@/apollo/graphql';
import { useToast } from '@/hooks';
import { TSpan } from '@/components/Typography';
import { Icon } from '@/components/Icon';
import EditRiseQuestionModal from './EditRiseQuestionModal';
import { CharacterWrapper } from './styles';
import { type RiseEssayQuestionType } from './types';

export const RiseEssayQuestion = memo((props: RiseEssayQuestionType) => {
  const { isLoading } = useSkeletonIsLoadingContext();
  const [initialValue, setInitialValue] = useState<string | undefined>();
  const [editText, setEditText] = useState(false);
  const [render, setRender] = useState(true);

  const { data, loading: noumClassLoading } = useGetNoumClassByNoumIdQuery({
    skip: !props.parentNoumId,
    variables: {
      noumId: props.parentNoumId!,
    },
  });

  const isClassDeleted = data?.getNoumClassByNoumId?.isDeleted ?? false;

  const handleEditorRender = () => {
    setRender(false);
    setTimeout(() => setRender(true), 10);
  };

  const { addToast } = useToast();
  useEffect(() => {
    handleEditorRender();
  }, []);
  useEffect(() => {
    if (props?.resultJson && props?.questionId) {
      // @ts-ignore
      const res: string =
        props?.resultJson[props?.questionId as keyof JSON] || '';
      setInitialValue(res);
      setEditText(false);
      handleEditorRender();
    }
  }, [props.initialValue, props.questionId, props?.resultJson]);

  const handleCheck = useCallback(() => {
    if (isClassDeleted) {
      addToast('error', 'icon', t(`noumena.rise_program.can_user_apply`));
    } else {
      setEditText(true);
    }
  }, [addToast, isClassDeleted]);

  if (isLoading || noumClassLoading) return <SkeletonLoaderTextElement />;

  const Answer = () => (
    <>
      <CharacterWrapper>
        <TSpan
          font="body-m"
          colorToken="--text-tablecell-header-neutral-default"
        >
          {`(${
            (initialValue || '').replace(/(<([^>]+)>)/gi, '').length
          } characters)`}
        </TSpan>
        {props.isOwner &&
          props.status === ApplicationResultStatusAdmin.Inprogress && (
            <Icon
              name="edit_m"
              size={24}
              color="--icon-button-brand-secondary-default"
              onClick={() => {
                handleCheck();
              }}
            />
          )}
      </CharacterWrapper>
      {render && (
        <RichTextEditor
          initialValue={initialValue}
          editEnabled={false}
          basicToolbar={true}
        />
      )}
    </>
  );

  return (
    <>
      <Answer />
      <EditRiseQuestionModal
        isOpen={editText}
        onClose={() => setEditText(false)}
        currentTitle={props.question}
        initialValue={initialValue}
        applicationId={props.applicationId}
        questionId={props.questionId}
        refetch={props.refetch}
      />
    </>
  );
});
