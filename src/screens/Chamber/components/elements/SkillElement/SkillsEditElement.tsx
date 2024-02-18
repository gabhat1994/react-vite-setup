import { useCallback } from 'react';
import { t } from 'i18next';
import {
  useSkills,
  SearchSkill,
} from '@/features/skills/components/SkillSelection';
import { Chips } from '@/components/Chips/Chips';
import {
  type CategoryWithSkills,
  type Maybe,
  type Skill,
} from '@/apollo/generated/types';
import { Accordion } from '@/components/Accordion';
import { Badge } from '@/components/Badge/Badge';
import { Spacer } from '@/layout';
import { Icon } from '@/components/Icon';
import { TSpan } from '@/components/Typography';
import {
  ChipsSection,
  ChipWrapper,
  CollapseWrap,
  ModalFooter,
  MySkillsWrap,
  Wrapper,
} from './styles';
import { type SkillElementProps } from './types';
import { ElementWrapper } from '../../ElementWrapper';

const SkillsEditElement = (props: SkillElementProps) => {
  const {
    options,
    selectSkill,
    selectedSkills,
    categories,
    getCategoryBadgeCount,
    isCategoryOpen,
    toggleOpenCategory,
    collapseAll,
    collapseStatus,
  } = useSkills(props.element);

  const isSelected = useCallback(
    (skill: Skill) => {
      const index = selectedSkills.findIndex(
        (item) => item.value === skill._id,
      );
      return index !== -1;
    },
    [selectedSkills],
  );

  const renderAccordionChildren = useCallback(
    (skills: Maybe<Skill>[]) =>
      skills.map((skill: Maybe<Skill>) => (
        <ChipWrapper key={skill?._id}>
          <Chips
            onClick={() =>
              selectSkill({
                key: skill?._id!,
                type: 'value',
                value: skill?._id!,
                label: skill?.name,
              })
            }
            primary={isSelected(skill!)}
            secondary={!isSelected(skill!)}
            size="large"
            icon={
              isSelected(skill!) ? (
                <Icon
                  color="--icon-skillbadge-brand-primary-selected"
                  name="close_m"
                  size={20}
                />
              ) : undefined
            }
          >
            {skill?.name}
          </Chips>
        </ChipWrapper>
      )),
    [selectSkill, isSelected],
  );

  const renderCategory = useCallback(
    (category: CategoryWithSkills) => (
      <Accordion
        key={`accord-${category._id}`}
        expanded={isCategoryOpen(category._id)}
        onToggle={() => toggleOpenCategory(category._id)}
        right={
          getCategoryBadgeCount(category._id) ? (
            <Badge
              size="large"
              text={`${getCategoryBadgeCount(category._id)}`}
            />
          ) : undefined
        }
        title={category.name}
      >
        {renderAccordionChildren(category.skills!)}
      </Accordion>
    ),
    [
      renderAccordionChildren,
      getCategoryBadgeCount,
      isCategoryOpen,
      toggleOpenCategory,
    ],
  );

  return (
    <ElementWrapper {...props}>
      <MySkillsWrap>
        <Wrapper>
          <SearchSkill
            options={options}
            onSelect={selectSkill}
            placeholder={t('noumena.homenoum.skills.search_placeholder')}
          />
          <Spacer height={16} />
          <ChipsSection>
            {selectedSkills?.map((item) => (
              <ChipWrapper key={item.value}>
                <Chips
                  onClick={() => selectSkill(item)}
                  icon={
                    <Icon
                      color="--icon-skillbadge-brand-primary-selected"
                      name="close_m"
                      size={20}
                    />
                  }
                  size="large"
                >
                  {item.label}
                </Chips>
              </ChipWrapper>
            ))}
          </ChipsSection>
          {collapseStatus &&
            categories?.map((category) => renderCategory(category!))}
          <ModalFooter>
            <CollapseWrap onClick={collapseAll}>
              <TSpan
                font="button-m"
                colorToken="--text-button-brand-secondary-default"
              >
                {collapseStatus
                  ? t(`noumena.skill_select.collapse_skills`)
                  : t(`noumena.skill_select.show_all_skills`)}
              </TSpan>
            </CollapseWrap>
          </ModalFooter>
        </Wrapper>
      </MySkillsWrap>
    </ElementWrapper>
  );
};

export default SkillsEditElement;
