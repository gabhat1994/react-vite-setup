import {
  type FieldArrayPath,
  type FieldArrayPathValue,
  type FieldArrayWithId,
  type FieldValues,
} from 'react-hook-form';

export type RenderOptions<
  Values extends FieldValues,
  Name extends FieldArrayPath<Values>,
  FieldNamePrefix extends string = `${Name}.${number}.`,
> = {
  values: FieldArrayWithId<Values, Name>;
  index: number;
  name: Name;
  fieldNamePrefix: FieldNamePrefix;
};

export type CreateEditOptions<
  Values extends FieldValues,
  Name extends FieldArrayPath<Values>,
  FieldNamePrefix extends string = `${Name}.${number}.`,
> = Omit<RenderOptions<Values, Name, FieldNamePrefix>, 'values'> & {
  values: Partial<FieldArrayWithId<Values, Name>>;
};

export type SummaryOptions<
  Values extends FieldValues,
  Name extends FieldArrayPath<Values>,
> = {
  rows: FieldArrayPathValue<Values, Name>;
};
