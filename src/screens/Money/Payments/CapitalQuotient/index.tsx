import { t } from 'i18next';
import * as Sentry from '@sentry/react';
import { useEffect, useState, useCallback } from 'react';
import { Icon } from '@/components/Icon';
import { Spacer } from '@/layout';
import { Spinner } from '@/components/Spinner';
import { TSpan } from '@/components/Typography';
import { useUpdatePrivacyMutation } from '@/apollo/graphql';
import { Dropdown, type DropdownValueType } from '@/components/Dropdown';
import { useCQ, useGenerateTokenForCQ } from '@/features/money/hooks';
import { Button } from '@/components/Button';
import { DeviceTypeEnum, useDeviceType, useToast } from '@/hooks';
import { PrivacyDropdownSelctedValue, RightIcon } from './style';
import * as Styles from '../styles';

const CapitalQuotient = () => {
  const cqURl = process.env.VITE_CQ_URL;
  const deviceType = useDeviceType();
  const [updatePrivacyMutation] = useUpdatePrivacyMutation();
  const { cqData } = useCQ();
  const { addToast } = useToast();
  const generateTokenForCQ = useGenerateTokenForCQ();
  const [privacy, setPrivacy] = useState<DropdownValueType<string>>({
    label: '',
    key: '',
    type: 'value',
    value: '',
  });

  const [isOpen, setIsOpen] = useState<boolean>(false);

  useEffect(() => {
    const newData: DropdownValueType<string> = {
      ...privacy,
      key:
        (cqData?.visibility as string).charAt(0).toUpperCase() +
        (cqData?.visibility as string).slice(1),
      type: 'value',
      value:
        (cqData?.visibility as string).charAt(0).toUpperCase() +
        (cqData?.visibility as string).slice(1),
    };
    setPrivacy(newData);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cqData]);

  const options: DropdownValueType<string>[] = [
    {
      key: 'private',
      label: (
        <TSpan
          font="body-m-bold"
          colorToken="--text-tablecell-header-neutral-highlighted"
        >
          {t(`noumena.money.cq.private`)}
        </TSpan>
      ),
      type: 'value',
      value: 'private',
    },
    {
      key: 'public',
      label: (
        <TSpan
          font="body-m-bold"
          colorToken="--text-tablecell-header-neutral-highlighted"
        >
          {t(`noumena.money.cq.public`)}
        </TSpan>
      ),
      type: 'value',
      value: 'public',
    },
  ];

  const handleNavigation = useCallback(async () => {
    const { token, error } = await generateTokenForCQ();
    if (token) {
      const formedUrl: string = `${cqURl}?access_token=${token}`;
      window.open(formedUrl, '_blank');
    }
    if (error) {
      addToast('error', 'none', `${error.message}`);
    }
  }, [addToast, cqURl, generateTokenForCQ]);

  const updatePrivacy = useCallback(
    async (option) => {
      setPrivacy(option);
      await updatePrivacyMutation({
        variables: {
          input: {
            noumId: cqData.noumId || '',
            visibility: option.value.toUpperCase(),
          },
        },
        onError: ({ networkError = null, graphQLErrors = [] }) => {
          const [err] = graphQLErrors;
          Sentry.captureException(new Error(err?.message ?? networkError), {
            tags: {
              section: 'deleteQuestionMutation',
            },
          });
        },
      });
    },
    [cqData.noumId, updatePrivacyMutation],
  );

  return (
    <Styles.CardWrapper style={{ padding: 0 }}>
      <Styles.CardHeader style={{ padding: '16px 16px 16px 16px' }}>
        <Styles.CardInformation
          font="body-l-bold"
          colorToken="--text-card-header-neutral-highlighted"
        >
          {t('noumena.money.wallet.capitalquotient')}
        </Styles.CardInformation>
        <Button
          size="small"
          style={{ width: '40px', height: '40px' }}
          leftIcon={
            <Icon
              name="arrow_right_m"
              size={24}
              color="--icon-button-neutral-default"
            />
          }
          data-testid="stepTwoBackButton"
          tertiary
          onClick={() => handleNavigation()}
        />
      </Styles.CardHeader>
      <Spacer height={deviceType === DeviceTypeEnum.MOBILE ? 8 : 10} />
      {cqData.fetching && <Spinner />}
      {!cqData.fetching && (
        <>
          <TSpan
            style={{ paddingLeft: '16px' }}
            font="heading-m"
            colorToken="--text-card-neutral-highlighted"
          >
            {cqData.score}
          </TSpan>
          <Styles.TextWraaper style={{ paddingBottom: '4px' }}>
            {cqData.status !== 'InComplete' && (
              <Styles.HelperTextWrapper
                font="body-m"
                colorToken="--text-card-neutral-default"
              >
                <Icon
                  name="check_xs"
                  size={16}
                  color="--icon-card-neutral-default"
                />
                {cqData.status}
              </Styles.HelperTextWrapper>
            )}
            {cqData.status === 'InComplete' && Number(cqData.score) < 500 && (
              <Styles.WarningTextWrapper
                font="body-m"
                colorToken="--text-card-neutral-highlighted"
              >
                {t('noumena.money.cq.incomplete_displayText')}
              </Styles.WarningTextWrapper>
            )}

            {/* <Styles.HelperTextWrapper
              font="body-m"
              colorToken="--text-card-neutral-default"
              style={{ marginTop: '-3px' }}
            >
              .
            </Styles.HelperTextWrapper> */}
          </Styles.TextWraaper>
          <Styles.TextWraaper>
            <Dropdown
              hideIcons
              inputValue={
                (privacy?.value as string).charAt(0).toUpperCase() +
                  (privacy?.value as string).slice(1) ?? ''
              }
              options={options}
              onSelectOption={(option) => {
                updatePrivacy(option);
              }}
              onOpen={() => setIsOpen(true)}
              onClose={() => setIsOpen(false)}
              renderContainerFromBottom={true}
            >
              {({ inputProps, inputRef, toggle }) => (
                <Styles.HelperTextWrapper
                  font="body-m"
                  colorToken="--text-card-neutral-default"
                >
                  <PrivacyDropdownSelctedValue {...inputProps} ref={inputRef} />
                  <RightIcon
                    size={12}
                    name="chevron_down_m"
                    color="--icon-card-neutral-default"
                    isOpen={isOpen}
                    onClick={toggle}
                  />
                </Styles.HelperTextWrapper>
              )}
            </Dropdown>
          </Styles.TextWraaper>
        </>
      )}
    </Styles.CardWrapper>
  );
};

export default CapitalQuotient;
