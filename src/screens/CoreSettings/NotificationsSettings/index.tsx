import { Checkbox } from '@/components/Checkbox';
import { Icon } from '@/components/Icon';
import { Spinner } from '@/components/Spinner';
import { useBreakpoints } from '@/hooks/useBreakpoints';
import { Stack } from '@/layout';
import S from './styles';
import { useUserPreferences } from './useUserPreferences';

function NotificationsSettings() {
  const { isDesktop } = useBreakpoints();
  const { loading, options, updatePreference } = useUserPreferences();

  return (
    <S.Layout>
      <S.Container>
        <S.Header>
          {isDesktop && (
            <S.HeaderText font="heading-m-bold">Notifications</S.HeaderText>
          )}

          <Stack vertical gap={8}>
            <S.SubTitle>E-mail notifications</S.SubTitle>
            <S.NoteText>I want to receive notifications for:</S.NoteText>
          </Stack>
        </S.Header>

        {loading && !options.length ? (
          <Spinner />
        ) : (
          <S.OptionsContainer>
            {options.map((option) => (
              <S.Option key={option.id}>
                <Checkbox
                  isChecked={option.isSubscribed}
                  disableClick={option.disabled}
                  onChange={(value) => updatePreference(option.id, value)}
                  icon={
                    <Icon
                      name="tick_m"
                      size={18}
                      color="--icon-checkbox-neutral-alt-default"
                    />
                  }
                />
                <S.CheckboxLabel>{option.label}</S.CheckboxLabel>
              </S.Option>
            ))}
          </S.OptionsContainer>
        )}
        <S.NoteText>{`Uncheck the notifications you don't wish to receive.`}</S.NoteText>
      </S.Container>
    </S.Layout>
  );
}

export default NotificationsSettings;
