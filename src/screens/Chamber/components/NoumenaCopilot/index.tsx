import { useTranslation } from 'react-i18next';
import { useCallback, useMemo, useState, type KeyboardEvent } from 'react';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import generate from 'uniqid';
import { SideModal } from '@/components/SideModal';
import { useAuth } from '@/features/auth/contexts';
import { TextField } from '@/components/TextField';
import { Icon } from '@/components/Icon';
import { useAdKeyWordsLazyQuery } from '@/apollo/graphql';
import { RichTextEditor } from '@/features/richTextEditor';
import { Button } from '@/components/Button';
import defaultProfile from '@/assets/images/profile_default.png';
import { useBreakpoints } from '@/hooks/useBreakpoints';
import * as S from './styles';
import {
  type NoumenaCopilotInputs,
  type NoumenaCopilotProps,
  type SearchHistory,
} from './types';

export const NoumenaCopilot = ({
  open,
  onClose,
  noumId: nounId,
  ...sideModalProps
}: NoumenaCopilotProps) => {
  const { t } = useTranslation();
  const { user } = useAuth();
  const [keyWord, setKeyWord] = useState<string>('');
  const [searchHistory, setSearchHistory] = useState<SearchHistory[]>([]);
  const { isDesktop } = useBreakpoints();
  const [getkeyWords, { loading }] = useAdKeyWordsLazyQuery({
    onCompleted: ({ getAdKeywords }) => {
      const { choices = [] } = getAdKeywords;
      if (!choices.length) return;
      const text = ((choices[0].text || '') as string).trim();
      const data = [...searchHistory];
      data.unshift({
        name: keyWord,
        text,
      });
      setSearchHistory(data);
      setKeyWord('');
    },
  });

  const validationSchema = useMemo(
    () =>
      yup
        .object({
          keyWord: yup.string().required('Can Not be empty'),
        })
        .required(),
    [],
  );

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setKeyWord(e.currentTarget.value);
    },
    [setKeyWord],
  );

  const onIconClick = useCallback(() => {
    if (loading) return;
    getkeyWords({
      variables: {
        promptText: keyWord,
        options: {
          temperature: 0.5,
          // model: "gpt-3.5-turbo"
        },
      },
    });
  }, [getkeyWords, keyWord, loading]);

  const {
    register,
    formState: { errors },
  } = useForm<NoumenaCopilotInputs>({
    resolver: yupResolver(validationSchema),
  });

  const searchHistoryList = useMemo(
    () =>
      searchHistory.map((history) => (
        <div key={generate()}>
          <S.ResultWrapper>
            <S.StyledAvatar src={defaultProfile} alt="addingUserAvatar" />
            <RichTextEditor
              initialValue={
                history.text ? (history.text as string) : 'Not Found'
              }
              editEnabled={false}
              basicToolbar={true}
            />
          </S.ResultWrapper>
          <S.KeywordWrapper>
            <S.StyledAvatar
              src={user?.profile?.profilePicture || defaultProfile}
              alt="addingUserAvatar"
            />
            <RichTextEditor
              initialValue={history.name}
              editEnabled={false}
              basicToolbar={true}
            />
          </S.KeywordWrapper>
        </div>
      )),
    [searchHistory, user?.profile?.profilePicture],
  );

  const handleEnterPress = useCallback(
    (e: KeyboardEvent<HTMLInputElement>) => {
      if (!keyWord) return;
      if (e.key === 'Enter') {
        onIconClick();
      }
    },
    [keyWord, onIconClick],
  );
  return (
    <>
      <SideModal
        placement="right"
        showCloseButton
        enableAnimation
        nonBlockingModal={isDesktop}
        disableEscapeKeyDown
        isBackgroundOpacity={!isDesktop}
        height="100%"
        padding={0}
        title={t('noumena.chamber_edit.noumena_copilot')}
        open={open}
        onClose={onClose}
        {...sideModalProps}
        actionButton={
          <Button
            primary
            size="small"
            onClick={() => {
              setKeyWord('');
              setSearchHistory([]);
            }}
          >
            Clear
          </Button>
        }
      >
        <S.NoumenaCopilotContainer>
          <S.Header>
            <TextField
              {...register('keyWord', {
                required: {
                  value: true,
                  message: t(
                    'noumena.email_login_form.valid_email.field_empty',
                  ),
                },
                onChange: handleChange,
              })}
              value={keyWord}
              label={t('noumena.chamber_edit.noumena_copilot_label')}
              onKeyPress={handleEnterPress}
              error={!!errors.keyWord}
              helperText={errors.keyWord?.message}
              data-testid="testEmailLoginTextField"
              rightIcon={
                <Icon
                  name="RocketIcon"
                  color="--icon-card-neutral-default"
                  size={24}
                  onClick={() => onIconClick()}
                />
              }
            />
          </S.Header>
          {loading ? (
            <S.NoResultWrapper>
              <RichTextEditor
                initialValue="Fetching results..."
                editEnabled={false}
                basicToolbar={true}
              />
            </S.NoResultWrapper>
          ) : !searchHistory.length && !loading ? (
            <S.NoResultWrapper>
              <RichTextEditor
                initialValue="No Chat History"
                editEnabled={false}
                basicToolbar={true}
              />
            </S.NoResultWrapper>
          ) : null}
          {searchHistoryList}
        </S.NoumenaCopilotContainer>
      </SideModal>
    </>
  );
};
