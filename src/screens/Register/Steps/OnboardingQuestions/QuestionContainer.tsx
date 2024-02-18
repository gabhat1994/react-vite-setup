import {
  type FC,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import { useTranslation } from 'react-i18next';
import { isAndroid } from 'react-device-detect';
import { debounce } from 'lodash';
import { Spacer } from '@/layout';
import { Dropdown, type DropdownValueType } from '@/components/Dropdown';
import { TSpan } from '@/components/Typography';
import { TextField } from '@/components/TextField';
import { Icon } from '@/components/Icon';
import { type Country } from '@/components/PhoneInput/types';
import { Flag } from '@/components/Flag';
import { breakpoints } from '@/constants/devices';
import { useWindowDimensions } from '@/hooks';
import { QuestionContainerWrapper } from './styles';

interface QuestionContainerProps {
  questionKey: string;
  description: string;
  answerOptions: DropdownValueType<string | Country>[];
  setAnswer: (answer?: string) => void;
  answer?: string;
  error?: boolean;
  isLoading?: boolean;
  helperText?: string;
  onFocus?: () => void;
}

const QuestionContainer: FC<QuestionContainerProps> = ({
  questionKey,
  description,
  answerOptions,
  setAnswer,
  error,
  isLoading,
  helperText,
  onFocus,
}: QuestionContainerProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { width } = useWindowDimensions();
  const isMobile = useMemo(() => width <= breakpoints.MOBILE_MAX, [width]);
  const { t } = useTranslation();
  const isSearchDisabled = [
    'age_range',
    'year_of_self_employed',
    'business_stage',
    'revenue',
    'business_entity',
    // 'business_industry',
  ].includes(questionKey);
  const isSkillQuestion = questionKey === 'business_industry';
  const isBusinessCountry = questionKey === 'business_country';

  const [isOpenDropdown, setIsOpenDropdown] = useState<boolean>(false);
  const [selectedLabel, setSelectedLabel] = useState<string | undefined>(
    undefined,
  );
  const [selectedCountry, setSelectedCountry] = useState<Country | undefined>(
    questionKey === 'business_country'
      ? {
          name: 'United States',
          dialCode: '1',
          iso2: 'us',
        }
      : undefined,
  );

  const [search, setSearch] = useState<string>('');
  const [options, setOptions] = useState<DropdownValueType<string | Country>[]>(
    [],
  );

  const [numberOfItems, setNumberOfItems] = useState(15);
  useEffect(() => {
    const searchPattern = search?.toLocaleLowerCase()?.trim() || '';
    if (!isSearchDisabled) {
      if (isSkillQuestion && isAndroid && !searchPattern) {
        setOptions([]);
        return;
      }
      const filteredOptions = answerOptions.filter((option) => {
        if (
          questionKey === 'business_country' &&
          option &&
          option.type === 'value' &&
          option.value &&
          typeof option.value === 'object'
        ) {
          return String(option.value.name)
            ?.toLowerCase()
            .includes(searchPattern);
        }
        if (isSkillQuestion) {
          return String(option.value)?.toLowerCase().includes(searchPattern);
        }
        return true;
      });

      setOptions(filteredOptions);
    }
  }, [answerOptions, isSearchDisabled, isSkillQuestion, questionKey, search]);

  const handleChangeAnswer = useCallback(
    (newAnswer?: string | Country) => {
      let option;
      if (typeof newAnswer === 'string') {
        option = answerOptions.find((_option) => _option.value === newAnswer);
        setSelectedLabel(
          option?.label && typeof option.label === 'string' ? option.label : '',
        );
        setAnswer(newAnswer);
      } else if (
        questionKey === 'business_country' &&
        typeof newAnswer === 'object'
      ) {
        setSelectedCountry(newAnswer);
        setAnswer(newAnswer.iso2);
      }
      setSearch('');
    },
    [answerOptions, questionKey, setAnswer],
  );

  const handleFetchMore = useCallback(
    () => setNumberOfItems(numberOfItems + 15),
    [numberOfItems],
  );

  const debouncedSearch = useRef(
    debounce(async (searchValue) => {
      setSearch(searchValue.trim());
    }, 200),
  ).current;

  useEffect(() => () => debouncedSearch.cancel(), [debouncedSearch]);

  const handleSearchChange = useCallback(
    (searchValue: string) => {
      if (questionKey === 'business_country') {
        setIsOpenDropdown(true);
      }
      debouncedSearch(searchValue);
      if (selectedLabel || selectedCountry) {
        setSelectedLabel(undefined);
        setSelectedCountry(undefined);
        setAnswer(undefined);
      }
      if (
        (searchValue === '' && isBusinessCountry) ||
        (searchValue === '' && isSkillQuestion)
      ) {
        setSelectedLabel('');
      }
    },
    [
      questionKey,
      debouncedSearch,
      selectedLabel,
      selectedCountry,
      isBusinessCountry,
      isSkillQuestion,
      setAnswer,
    ],
  );

  const renderLeftIcon = useCallback(
    ({ toggle }: { toggle: () => void }) => {
      if (questionKey === 'business_country' && selectedCountry) {
        return (
          <Flag
            flag={`flag_${selectedCountry?.iso2}` as keyof typeof Flag}
            size={24}
            onClick={toggle}
          />
        );
      }
      if (isSkillQuestion)
        return (
          <Icon
            name="search_m"
            size={24}
            color="var(--icon-card-placeholder-neutral-default)"
          />
        );
      return undefined;
    },
    [isSkillQuestion, questionKey, selectedCountry],
  );

  const handleClose = useCallback(() => {
    setIsOpenDropdown(false);
    if (isMobile) setSearch('');
  }, [isMobile]);

  const placeholder = isSkillQuestion
    ? t(`noumena.register.onboarding_questions.select_industry`)
    : t(`noumena.register.onboarding_questions.answer.placeholder`);
  const inputValue = isSearchDisabled ? undefined : search || '';
  const dropDownOptions =
    isSearchDisabled || search.length === 0 ? answerOptions : options;

  return (
    <QuestionContainerWrapper ref={containerRef}>
      <TSpan colorToken="--text-tablecell-header-neutral-highlighted">
        {description}
      </TSpan>
      <Spacer height={8} />
      <Dropdown
        inputValue={inputValue}
        key={questionKey}
        hideIcons={questionKey !== 'business_country'}
        isOpen={isOpenDropdown}
        options={dropDownOptions}
        onSelectOption={(option) => {
          handleChangeAnswer(option.value);
        }}
        onInputChange={(val) => setSearch(val)}
        onFetchMore={handleFetchMore}
        onOpen={onFocus}
        onClose={handleClose}
        isLoading={isLoading}
        closeOnSelect
        renderContainerFromBottom={isSearchDisabled && isMobile}
        showInternalSearch={!isSearchDisabled && isMobile}
        forceHideCloseButton={false}
        containerHeight={!isSearchDisabled && isMobile ? '100vh' : 'auto'}
        noAvailableOptionsText={t('noumena.dropdown.no_search_results.text')}
        noSearchOptionsText={t('noumena.dropdown.no_search_results.text')}
        containerWidth={`${containerRef.current?.scrollWidth}px` ?? 'auto'}
        containerStyle={isSkillQuestion ? { minHeight: 192 } : undefined}
        observerMinHeight="0px"
        searchPlaceholder={
          isSkillQuestion
            ? t(
                `noumena.register.onboarding_questions.select_industry_placeholder`,
              )
            : undefined
        }
        searchLeftIcon={isSkillQuestion ? <></> : undefined}
        hideLeftIconPlace
        forceListFromBottom={isSkillQuestion && !isMobile}
      >
        {({ inputProps, inputRef, toggle }) => (
          <TextField
            onClick={() => setIsOpenDropdown(true)}
            readOnly={isSearchDisabled}
            ref={inputRef}
            {...inputProps}
            error={!isOpenDropdown ? error : false}
            onChange={(e) => {
              handleSearchChange(e.target.value);
            }}
            helperText={
              error && helperText && !isOpenDropdown ? helperText : undefined
            }
            placeholder={placeholder}
            value={
              search.length > 0
                ? search
                : selectedCountry && questionKey === 'business_country'
                ? selectedCountry?.name
                : selectedLabel
            }
            rightIcon={
              isSearchDisabled ? (
                <Icon
                  color="--icon-input-neutral-disabled"
                  name="chevron_down_m"
                  size={16}
                  onClick={() => setIsOpenDropdown(true)}
                />
              ) : (
                search.trim().length > 0 && (
                  <Icon
                    name="clear_m"
                    size={16}
                    onClick={() => {
                      handleSearchChange('');
                    }}
                    color="--icon-input-brand-primary-default"
                  />
                )
              )
            }
            leftIcon={renderLeftIcon({ toggle })}
            onFocus={onFocus}
          />
        )}
      </Dropdown>
    </QuestionContainerWrapper>
  );
};

export default QuestionContainer;
