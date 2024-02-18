import React from 'react';
import { useTranslation } from 'react-i18next';
import { StyledDropDownWrapper } from '@/screens/Chamber/components/modals/ProjectCreate/styles';
import { Dropdown } from '@/components/Dropdown';
import { TextField } from '@/components/TextField';
import { ProjectChamberType } from '@/apollo/generated/types';
import { Icon } from '@/components/Icon';
import { type ProjectTypeDropdownProps } from '@/screens/Chamber/components/modals/ProjectCreate/types';

const ProjectTypeDropdown: React.FC<ProjectTypeDropdownProps> = ({
  selectedProjectType,
  handleSelectProjectType,
  errors,
  setValue,
  projectTypeOptions,
}) => {
  const { t } = useTranslation();

  return (
    <StyledDropDownWrapper>
      <Dropdown
        options={projectTypeOptions}
        inputValue={selectedProjectType?.value}
        onSelectOption={handleSelectProjectType}
        usePortal={false}
        isPopperStyle
        iconColumnWidth={40}
      >
        {({ inputProps, inputRef, toggle }) => (
          <TextField
            readOnly
            {...inputProps}
            ref={inputRef}
            value={
              selectedProjectType ? String(selectedProjectType?.label) : ''
            }
            label={t('noumena.chamber_create.visibility_label')}
            spellCheck="false"
            onChange={() => {
              setValue(
                'projectType',
                selectedProjectType?.value || ProjectChamberType.Private,
              );
            }}
            error={!!errors.projectType}
            helperText={
              errors.projectType?.message ||
              t('noumena.chamber_create.visibility_helper_text')
            }
            rightIcon={
              <Icon
                name="chevron_down_m"
                color="--icon-input-neutral-default"
                size={16}
                onClick={toggle}
              />
            }
            data-testid="CreateProject-Modal-ProjectType"
          />
        )}
      </Dropdown>
    </StyledDropDownWrapper>
  );
};

export default ProjectTypeDropdown;
