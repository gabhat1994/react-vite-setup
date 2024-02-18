import { useCallback, useEffect, useRef, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { t } from 'i18next';
import { useNavigate, useLocation } from 'react-router-dom';
import { TSpan } from '@/components/Typography';
import { TextField } from '@/components/TextField';
import { Dropdown } from '@/components/Dropdown';
import { Icon } from '@/components/Icon';
import { TextArea } from '@/components/TextArea';
import { Button } from '@/components/Button';
import { Spacer } from '@/layout';
import { useLaunchDarkly } from '@/hooks/launchDarkly';
import ROUTES from '@/constants/routes';
import { useToast } from '@/hooks';
import { NoumReferenceServices } from '@/services/rest/reference';
import Logo from '@/components/Logo';
import {
  type ExternalReferencePayload,
  type NoumReferenceMetadata,
} from './types';
import { capacityOptions } from './data';
import ReferenceDetailModal from './ReferenceDetailModal';
import {
  CompletedProvidingReferenceContainer,
  Container,
  Header,
  ProjectContainer,
  WrapperContainer,
} from './styles';

const elementSchema = yup
  .object({
    providerName: yup.string().required(),
    capacity: yup.string().required(),
  })
  .required();

const Reference = () => {
  const {
    flags: { references },
  } = useLaunchDarkly();
  const navigate = useNavigate();
  const { addToast } = useToast();
  const { search } = useLocation();
  const referenceTokenRef = useRef('');
  const [showModalDetail, setShowModalDetail] = useState(false);
  const [experienceError, setExperienceError] = useState('');
  const [noumReferenceLoading, setNoumReferenceLoading] = useState(false);
  const [completedProvidingReference, setCompletedProvidingReference] =
    useState(false);

  const [noumReferenceMetadata, setNoumReferenceMetadata] =
    useState<NoumReferenceMetadata>({
      capacity: '',
      experience: {
        body: '',
        id: '',
        title: '',
        _id: '',
        url: '',
      },
      experienceId: '',
      experienceOwnerName: '',
      providerName: '',
      _id: '',
    });

  const { control, handleSubmit, setValue } = useForm<
    Omit<ExternalReferencePayload, 'capacity' | ''> & {
      providerName: string;
      capacity: string;
      referenceText: string;
    }
  >({
    resolver: yupResolver(elementSchema),
    defaultValues: {
      referenceText: '',
      capacity: 'Client',
    },
    reValidateMode: 'onBlur',
    mode: 'onBlur',
  });

  useEffect(() => {
    if (references === false) {
      navigate(ROUTES.LOGIN, { replace: true });
    }
  }, [navigate, references]);

  const handleGetNoumReferenceMetadata = useCallback(
    async (referenceToken: string) => {
      setNoumReferenceLoading(true);
      try {
        const response = await NoumReferenceServices.getNoumReferenceMetadata(
          referenceToken,
        );
        setNoumReferenceMetadata({ ...response });
      } catch (err) {
        addToast(
          'error',
          'none',
          t('noumena.give_reference.get_reference_fail'),
        );
      } finally {
        setNoumReferenceLoading(false);
      }
    },
    [addToast],
  );

  useEffect(() => {
    const query = new URLSearchParams(search);
    const referenceToken = query.get('reference_token');
    if (referenceToken && !noumReferenceMetadata._id) {
      referenceTokenRef.current = referenceToken;
      handleGetNoumReferenceMetadata(referenceTokenRef.current);
    }
  }, [search, handleGetNoumReferenceMetadata, noumReferenceMetadata._id]);

  useEffect(() => {
    if (noumReferenceMetadata.capacity && noumReferenceMetadata.providerName) {
      const { capacity, providerName } = noumReferenceMetadata;
      setValue('providerName', providerName);
      const foundCapacity = capacityOptions.find(
        (item) => item.key.toLowerCase() === capacity.toLowerCase(),
      );
      setValue('capacity', foundCapacity ? foundCapacity.value : capacity);
    }
  }, [noumReferenceMetadata, setValue]);

  const onSubmit = useCallback(
    async (
      externalNoumReference: Omit<ExternalReferencePayload, 'capacity'> & {
        capacity: string;
      },
    ) => {
      const { capacity, imageUrl, referenceText } = externalNoumReference;
      if (
        !referenceText ||
        referenceText.trim().split(' ').length < 3 ||
        referenceText.length > 2000
      ) {
        setExperienceError(t('noumena.give_reference.experience_error'));
        return;
      }
      setNoumReferenceLoading(true);
      const foundCapacity = capacityOptions.find(
        (item) => item.value === capacity,
      );
      try {
        await NoumReferenceServices.fillOutReferenceByExternalUser({
          referenceToken: referenceTokenRef.current,
          referenceText,
          ...(imageUrl?.length && { imageUrl }),
          ...(capacity?.length && { capacity: foundCapacity?.key ?? capacity }),
        });
        setCompletedProvidingReference(true);
      } catch (err) {
        addToast('error', 'none', t('noumena.give_reference.request_fail'));
      }
      setNoumReferenceLoading(false);
    },
    [addToast],
  );

  return (
    <Container>
      <Header>
        <Logo />
      </Header>
      {completedProvidingReference ? (
        <CompletedProvidingReferenceContainer>
          <TSpan
            font="heading-xl-bold"
            colorToken="--text-body-header-neutral-default"
          >
            {t('noumena.give_reference.completed')}
          </TSpan>
          <TSpan font="body-l" colorToken="--text-body-neutral-highlighted">
            {t('noumena.give_reference.completed_description', {
              referenceRequest: noumReferenceMetadata.experienceOwnerName,
            })}
          </TSpan>
        </CompletedProvidingReferenceContainer>
      ) : (
        <WrapperContainer>
          <TSpan
            font="heading-xs-bold"
            colorToken="--text-body-header-neutral-default"
          >
            {t('noumena.chamber_edit.give_reference.title', {
              referenceRequest: noumReferenceMetadata.experienceOwnerName,
            })}
          </TSpan>
          <Spacer height={24} />
          <TSpan font="body-m" colorToken="--text-body-neutral-highlighted">
            {t('noumena.chamber_edit.give_reference.description')}
          </TSpan>
          <ProjectContainer
            onClick={
              noumReferenceMetadata._id
                ? () => setShowModalDetail(true)
                : undefined
            }
          >
            <TSpan
              font="body-m-bold"
              colorToken="--text-card-header-neutral-highlighted"
            >
              {noumReferenceMetadata.experience.title}
            </TSpan>
            <Icon
              name="chevron_small_right_m"
              size={20}
              color="--icon-card-neutral-default"
            />
          </ProjectContainer>
          <div>
            <Controller
              control={control}
              name="providerName"
              render={({ field: { value, onChange } }) => (
                <TextField
                  label={t(
                    'noumena.chamber_edit.give_reference.input.name_placeholder',
                  )}
                  value={value}
                  onChange={onChange}
                />
              )}
            />
            <Spacer height={16} />
            <Controller
              control={control}
              name="capacity"
              render={({
                field: { value, onChange },
                fieldState: { error },
              }) => (
                <Dropdown
                  containerStyle={{
                    padding: '0',
                  }}
                  observerMinHeight="0px"
                  hideIcons
                  placement="bottom-start"
                  options={capacityOptions}
                  inputValue={value ?? ''}
                  onSelectOption={(e) => {
                    onChange(e.value);
                  }}
                  usePortal={false}
                >
                  {({ inputProps, inputRef, toggle }) => (
                    <TextField
                      readOnly
                      {...inputProps}
                      ref={inputRef}
                      value={value ?? ''}
                      label={t(
                        'noumena.chamber_edit.give_reference.input.capacity_placeholder',
                        {
                          experienceOwner:
                            noumReferenceMetadata.experienceOwnerName,
                        },
                      )}
                      spellCheck="false"
                      onChange={(e) => {
                        onChange(e.currentTarget.value);
                      }}
                      error={!!error?.message}
                      rightIcon={
                        <Icon
                          name="chevron_down_m"
                          size={16}
                          onClick={toggle}
                          color="--icon-input-neutral-default"
                        />
                      }
                    />
                  )}
                </Dropdown>
              )}
            />
            <Spacer height={16} />
            <Controller
              control={control}
              name="referenceText"
              render={({ field: { value, onChange } }) => (
                <TextArea
                  label={t(
                    'noumena.chamber_edit.give_reference.input.reference_text_placeholder',
                    {
                      experienceOwner:
                        noumReferenceMetadata.experienceOwnerName,
                    },
                  )}
                  value={value}
                  onChange={(e) => {
                    onChange(e);
                    setExperienceError('');
                  }}
                  error={!!experienceError}
                  helperText={experienceError}
                />
              )}
            />
            <Spacer height={16} />
            <Button
              primary
              size="full"
              disabled={noumReferenceLoading}
              onClick={handleSubmit(onSubmit)}
            >
              {t('noumena.submit')}
            </Button>
          </div>
          <Spacer height={16} />
          <TSpan font="body-m" colorToken="--text-body-neutral-default">
            {t('noumena.chamber_edit.give_reference.footer_2')}
          </TSpan>
        </WrapperContainer>
      )}
      <ReferenceDetailModal
        imageUrl={noumReferenceMetadata.experience.url}
        experienceDetail={noumReferenceMetadata.experience.body}
        experienceTitle={noumReferenceMetadata.experience.title}
        isOpen={showModalDetail}
        onClose={() => setShowModalDetail(false)}
      />
    </Container>
  );
};

export default Reference;
