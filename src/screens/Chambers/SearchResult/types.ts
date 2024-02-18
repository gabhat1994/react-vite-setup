export interface SearchResultProps {
  isNoum?: boolean;
  offsetTop?: number;
  noResultText?: string;
  noResultSubText?: string;
  children: React.ReactNode;
  tab?: string;
  isFilterApplied?: boolean;
}
