import { useMemo, useCallback, useState, useEffect, useRef } from 'react';
import { t } from 'i18next';
import { type Maybe } from 'graphql/jsutils/Maybe';
import { useAuth } from '@/features/auth/contexts';
import { useToast, useToggle } from '@/hooks';
import {
  useGetCategoryWithSkillsQuery,
  useUpdateUserSkillsMutation,
} from '@/apollo/graphql';
import {
  type CategoryWithSkills,
  type ElementOutput,
  type Skill,
} from '@/apollo/generated/types';
import { type DropdownValueType } from '@/components/Dropdown';

const useSkills = (element?: ElementOutput) => {
  const { data } = useGetCategoryWithSkillsQuery({
    variables: {
      search: '',
    },
  });
  const [updateUserSkills] = useUpdateUserSkillsMutation();

  const { user, refetchUserData } = useAuth();
  const { addToast } = useToast();
  const timer = useRef<NodeJS.Timeout | null>(null);
  /* status: false => "Show all skills list"  true => Collapse skills list */
  const [collapseStatus, setCollapseStatus] = useToggle(false);
  const [selectedSkills, setSelectedSkills] = useState<
    DropdownValueType<string>[]
  >([]);

  useEffect(() => {
    if (user?.skills) {
      setSelectedSkills(
        user?.skills.map((skill) => ({
          key: skill?._id ?? '',
          label: skill?.name,
          type: 'value',
          value: skill?._id ?? '',
        })),
      );
    }
  }, [user?.skills, setSelectedSkills]);

  /* all skills in all categories, skills itself */
  const allSkills = useMemo(() => {
    let result: Maybe<Skill>[] = [];
    data?.getCategoryWithSkills?.map((item: Maybe<CategoryWithSkills>) => {
      if (item?.skills) {
        result = [...result, ...item.skills];
      }
      return undefined;
    });
    return result;
  }, [data]);

  const options = useMemo(
    () =>
      allSkills.map(
        (skill) =>
          ({
            key: skill?._id,
            value: skill?._id,
            type: 'value',
            label: skill?.name,
            icon: skill?.icon,
          } as DropdownValueType<string>),
      ),
    [allSkills],
  );

  const selectSkill = useCallback(
    async (option: DropdownValueType<string>) => {
      const newSkills = selectedSkills.filter(
        (skill) => skill.value !== option.value,
      );
      if (newSkills.length === selectedSkills.length) newSkills.push(option);
      if (!newSkills.length) {
        addToast(
          'error',
          'none',
          t('noumena.myaccount.skills.close_button_text'),
        );
      } else {
        setSelectedSkills(newSkills);
        if (element) {
          if (timer.current) clearTimeout(timer.current);
          timer.current = setTimeout(async () => {
            await updateUserSkills({
              variables: { input: newSkills.map((skill) => skill.value) },
            });
            await refetchUserData();
          }, 1500);
        }
      }
    },
    [selectedSkills, element, updateUserSkills, addToast, refetchUserData],
  );

  const getCategoryBadgeCount = useCallback(
    (categoryId: string) => {
      const categories = data?.getCategoryWithSkills;
      const category = categories?.find((cate) => cate?._id === categoryId);
      let result = 0;
      category?.skills?.map((skill) => {
        const hasSkill = selectedSkills.find(
          (selected) => selected.value === skill?._id,
        );
        if (hasSkill) {
          result += 1;
        }
        return undefined;
      });
      return result;
    },
    [data, selectedSkills],
  );

  const [openedCategories, setOpenedCategories] = useState<string[]>([]);

  const isCategoryOpen = useCallback(
    (categoryId) => !!openedCategories.find((cate) => cate === categoryId),
    [openedCategories],
  );

  const toggleOpenCategory = useCallback(
    (categoryId: string) => {
      const index = openedCategories.findIndex((item) => item === categoryId);
      if (index > -1) {
        const tmp = openedCategories;
        tmp.splice(index, 1);
        setOpenedCategories([...tmp]);
      } else {
        setOpenedCategories([...openedCategories, categoryId]);
      }
    },
    [openedCategories],
  );

  useEffect(
    () => () => {
      if (timer.current) clearTimeout(timer.current);
    },
    [],
  );

  return {
    openedCategories,
    categories: data?.getCategoryWithSkills,
    selectedSkills,
    options,
    collapseStatus,
    allSkills,
    collapseAll: setCollapseStatus,
    toggleOpenCategory,
    isCategoryOpen,
    getCategoryBadgeCount,
    selectSkill,
  };
};
export default useSkills;
