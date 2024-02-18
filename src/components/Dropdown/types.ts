import { type Placement } from '@popperjs/core';
import { type Property } from 'csstype';
import {
  type HTMLAttributes,
  type InputHTMLAttributes,
  type ReactNode,
  type Ref,
} from 'react';
import { type Maybe } from '@/common/types';
import { type TabbedSectionTabType } from '../TabbedSection';

export type Intent = 'default' | 'danger' | 'brand-primary';

export interface DropdownValueType<OriginalValue, Key extends string = string> {
  /** Unique identifier for the option */
  key: Key;
  /** Text label for the option */
  label: string | ReactNode;
  /** Discriminated union literal */
  type: 'value';
  /** Show option as disabled */
  disabled?: boolean;
  /** Description to render */
  description?: string;
  /** Icon to render */
  icon?: Maybe<JSX.Element>;
  /** Right Icon to render */
  rightIcon?: Maybe<JSX.Element>;
  /** Show option as selected  */
  selected?: boolean;
  /** Link to render - changes behavior to open link in new browser tab */
  href?: string;
  /** Label Color */
  labelColor?: string;
  /** Sub options to render */
  subItems?: DropdownItemType<OriginalValue, Key>[];
  onClick?: () => void;
  onClickIcon?: (value: unknown) => void;
  /** Callback fired on clicking the sub menu arrow icon * */
  onClickSubItem?: (value: unknown) => void;
  /** The underlying data related to the option, for the convenience of the user */
  value: OriginalValue;
  /** The default behaviour will only open submenu on clicking th right arrow icon, this will make the whole item
   * clickable, overriding the onSelect behaviour
   */
  openSubmenuOnSelect?: boolean;
  /** Callback fired to handle fetch more scrolling for sub items  */
  onFetchMoreSubItems?: () => void;
  /** Intent drives variation of style of the items */
  intent?: Intent;
  fontFamily?: string;
  /** If true, the icon is not rendered for this item, and no space is reserved for the icon. */
  hideIconPlace?: boolean;
}

export interface DropdownHeaderType {
  type: 'header';
  label: React.ReactNode | string;
  childLabels?: string[];
  rightIcon?: ReactNode;
}

interface DropdownDivider {
  type: 'divider';
}

export type DropdownItemType<T = unknown, Key extends string = string> =
  | DropdownValueType<T, Key>
  | DropdownHeaderType
  | DropdownDivider;

export interface DropdownTargetProps<TargetRef extends HTMLElement> {
  index: number;
  targetProps: HTMLAttributes<HTMLElement>;
  targetRef: Ref<TargetRef>;

  inputProps: InputHTMLAttributes<HTMLInputElement>;
  inputRef: Ref<HTMLInputElement>;
  handleOnClear?: () => void;
  active: boolean;
  disabled?: boolean;
  inputValue?: string;
  toggle: () => void;
}

interface DropdownItemMeta {
  /** Whether to render as an "active" element */
  active: boolean;
  /** The current search input */
  input: string;
}
interface TabProps<TabId> {
  tabs: TabbedSectionTabType<TabId>[];
  activeTabId: TabId;
  onTabChange: (value: TabbedSectionTabType<TabId>) => void;
}

type DropdownOptions<T, Key extends string = string> = DropdownItemType<
  T,
  Key
>[];

export interface DropdownProps<
  T,
  TargetRef extends HTMLElement,
  TabId extends string = string,
  Key extends string = string,
> {
  /** List of options to render */
  options: DropdownOptions<T, Key>;
  /** Control over whether the dropdown is open - default uncontrolled */
  isOpen?: boolean;
  hideLeftIconPlace?: boolean;
  /** List of options to render as sticky options at the head of any of the normal
   * options
   */
  stickyHeaderOptions?: DropdownOptions<T, Key>;
  /** Control footer divider visibility - default true */
  showHeaderDivider?: boolean;
  /** List of options to render as sticky options at the foot of any of the normal
   * options
   */
  stickyFooterOptions?: DropdownOptions<T, Key>;

  /** Control footer divider visibility - default true */
  showFooterDivider?: boolean;

  /** PoppperJS placement option. Defaults to "bottom-start" */
  placement?: Placement;
  /** Wether to render the dropdown in a portal. Default true */
  usePortal?: boolean;
  /** The input value to render in the search box */
  inputValue?: string;
  /** Show a loading indicator */
  isLoading?: boolean;
  /** To add Mobile style */
  isMobile?: boolean;
  /** To add popper style */
  isPopperStyle?: boolean;
  /** Show an internal search input for filtering options. The Dropdown does not
   * do any filtering itself
   */
  showInternalSearch?: boolean;
  /** Whether to autofocus internal search. Defults to "true" */
  autoFocusInternalSearch?: boolean;
  /** Whether to disable the dropdown */
  disabled?: boolean;
  /** Whether to calculate top distance of parent element */
  calRefTop?: boolean;
  /** Whether to animate or not */
  isAnimation?: boolean;
  /** only bold the searched text */
  isMatchedBoldText?: boolean;
  /** to show or hide empty message */
  isShowEmptyText?: boolean;
  /** Whether to use popper style as force or not */
  checkboxPosition?: 'left' | 'right';
  /** Position of a checkbox in multiselect mode */
  usePopStyle?: boolean;
  /** Whether subitems are rendered in an expanding or non-expanding style */
  expandingDrillDown?: boolean;
  /** Placeholder for search input box */
  searchPlaceholder?: string;
  /** Whether the dropdown should close on selections. default true */
  closeOnSelect?: boolean;
  /** Whether to hide item's icon for the whole list */
  hideIcons?: boolean;
  /** renders checkboxes on the right side of label */
  multiselect?: boolean;

  /** Whether to set disable search option in multiselect */
  searchDisabled?: boolean;

  /** The width of the column in which icons are rendered */
  iconColumnWidth?: number;

  /** Add in custom styling to the dropdown container */
  containerWidth?: string;

  /** Add in custom styling to the dropdown container */
  containerHeight?: string;

  /** Add in custom styling to the dropdown container */
  maxContainerHeight?: string;

  /** Add in custom padding to the dropdown container */
  containerPadding?: string;

  /** min height for infinity observer */
  observerMinHeight?: string;

  /** to change default dropdown padding */
  padding?: string;

  unsetOverflow?: boolean;
  minHeight?: string;

  /** Add in custom styling to the dropdown container */
  containerStyle?: React.CSSProperties;

  /** Add in custom styling to the dropdown container */
  dropdownItemStyle?: React.CSSProperties;

  /** Left Icon to render */
  leftIcon?: JSX.Element;
  searchLeftIcon?: JSX.Element;

  /** Event handler for when the "active" item changes via keyboard events */
  onActiveOptionChange?: (item: DropdownValueType<T, Key> | null) => void;
  /** Event handler for when the "clear" event is triggered for the search input */
  onClear?: () => void;
  /** Event handler for when an option is selected */
  onSelectOption?: (item: DropdownValueType<T, Key>) => void;
  /** Event handler for when the search input value changes */
  onInputChange?: (input: string) => void;
  /** Event handler for when the user requests more options.
   *  For use with paginated options */
  onFetchMore?: () => void;
  /** Event handler for when the dropdown closes */
  onClose?: () => void;
  /** Event handler for when the dropdown opens */
  onOpen?: () => void;

  /** The target for the dropdown. Either a normal ReactNode or a render
   * prop with additional state from the dropdown */
  children:
    | ((props: DropdownTargetProps<TargetRef>) => JSX.Element)
    | JSX.Element;
  /** Tag to use for the wrapper element, default div */
  renderItem?: (
    item: DropdownValueType<T, Key>,
    meta: DropdownItemMeta,
  ) => JSX.Element;
  /** Override the rendering of dropdown labels within dropdown options */
  renderLabel?: (
    item: DropdownValueType<T, Key>,
    meta: DropdownItemMeta,
  ) => JSX.Element;
  /** Override the rendering of menu container */
  renderMenu?: () => JSX.Element;
  /** Override the rendering of divider elements in the list of options */
  renderDivider?: () => JSX.Element;
  /** Override the rendering of header elements in the list of options */
  renderHeader?: (item: DropdownHeaderType) => JSX.Element;
  /** Override the rendering of the sticky header in the list of options */
  renderStickyHeader?: ReactNode;
  /** Override the rendering of the sticky footer in the list of options */
  renderStickyFooter?: ReactNode;
  /** Override the rendering of the internal search input */
  renderInternalSearch?: (
    props: InputHTMLAttributes<HTMLInputElement>,
  ) => JSX.Element;
  /** Render the create new option - no default implementation and renders as a
   * sticky footer above the normal sticky footer
   */
  renderCreateNewOption?: ReactNode;
  /** Override the rendering of the contents of the dropdown container */
  optionsRenderer?: (
    options: DropdownOptions<T, Key>,
    handleSelectOption: (value: DropdownValueType<T, Key>) => void,
    activeItem: DropdownValueType<T, Key> | null,
    activeSubItem: string | null,
    setActiveSubItem: React.Dispatch<React.SetStateAction<string | null>>,
    hideIcons: boolean | undefined,
  ) => ReactNode;
  /** Props for rendering tabs within the dropdown */
  tabProps?: TabProps<TabId>;

  /** Flag for available options */
  noAvailableOptions?: boolean;
  /** Placeholder for search input box */
  noAvailableOptionsText?: string;
  /** Placeholder for search input box */
  noSearchOptionsText?: string;
  noSearchOptionsTextAlign?: Property.JustifyContent;

  /** Hide default close button in any device */
  forceHideCloseButton?: boolean;

  /** If true, container will be rendered from bottom applicable ONLY FOR MOBILE VIEW used in "mobileStylesDropdown" */
  renderContainerFromBottom?: boolean;
  /** If true, container will be rendered from bottom applicable */
  forceListFromBottom?: boolean;
  /** If true, container will be rendered from bottom and its content is centerd that is applicable ONLY FOR MOBILE VIEW used in "mobileStylesDropdown" */
  isRenderFromBottomContentCentered?: boolean;
}

export interface DropdownContentProps<
  T,
  TargetRef extends HTMLElement,
  TabId extends string = string,
  Key extends string = string,
> extends Partial<DropdownProps<T, TargetRef, TabId, Key>> {
  activeItem: DropdownValueType<T, Key> | null;
  stickyHeader?: ReactNode;
  stickyFooter?: ReactNode;
  innerDropdownContent: (contentCentered?: boolean) => ReactNode;
  activePlacement?: Placement;
  setIsOpenState: (state: boolean) => void;
  setActiveItem: (item: DropdownValueType<T, Key> | null) => void;
  setActiveSubItem: (item: string | null) => void;
}

export type DropDownRenderOptionsType = {
  activeSubItem: string | null;
  hideIcons?: boolean;
  multiselect?: boolean;
  iconColumnWidth?: number;
  leftIcon?: JSX.Element;
  dropdownItemStyle?: React.CSSProperties;
  isMatchedBoldText?: boolean;
  containerPadding?: string;
  inputValue?: string;
  contentCentered?: boolean;
  checkboxPosition?: 'left' | 'right';
};
export interface DropdownItemProps<T = unknown, Key extends string = string> {
  index?: number;
  onSelect?: (value: DropdownValueType<T, Key>) => void;
  onSelectIcon?: (value: T) => void;
  onClickSubItem?: (value: DropdownValueType<T, Key>) => void;
  value: DropdownValueType<T, Key>;
  meta: DropdownItemMeta;
  customLabelRender?: ReactNode;
  containerPadding?: string;
  checkboxPosition?: 'left' | 'right';
  active?: boolean;
  activeSubItem?: string | null;
  setActiveSubItem?: (item: string | null) => void;
  hideIcons?: boolean;
  multiselect?: boolean;
  iconColumnWidth?: number;
  intent?: Intent;
  leftIcon?: JSX.Element;
  labelColor?: string;
  isBottomBorder?: boolean;
  isMatchedBoldText?: boolean;
  inputValue?: string;
  dropdownItemStyle?: React.CSSProperties;
  labelFontFamily?: string;
  contentCentered?: boolean;
}

export enum SortKeys {
  sorting_a_z = 'sorting_a_z',
  sorting_z_a = 'sorting_z_a',
  sorting_new_to_old = 'sorting_new_to_old',
  sorting_old_to_new = 'sorting_old_to_new',
  sorting_recently_visited = 'sorting_recently_visited',
  sorting_select_sorting = 'sorting_select_sorting',
}
