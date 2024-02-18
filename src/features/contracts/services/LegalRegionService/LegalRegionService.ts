import { getCountryByCode } from '@/utils/country';
import { countries, countriesWithStates, countryRegions } from './constants';

export function hasPresetRegions(countryCode: string) {
  return (
    countryCode in countryRegions && countryRegions[countryCode].length > 0
  );
}

export function hasNoRegions(countryCode: string) {
  return (
    countryCode in countryRegions && countryRegions[countryCode].length === 0
  );
}

export function hasCustomRegion(countryCode: string) {
  return !(countryCode in countryRegions);
}

export function hasState(countryCode: string) {
  return countriesWithStates.includes(countryCode);
}

export function isValidCountryCode(
  countryCode: string | null,
): countryCode is string {
  return (
    !!countryCode && !!countries.find((country) => country.code === countryCode)
  );
}

function getRegionByCountryAndCode(countryCode: string, regionCode: string) {
  return countryRegions[countryCode]?.find(
    (region) => region.code === regionCode,
  );
}

export function formatLegalRegion(
  countryCode: string,
  regionCode: string | null,
) {
  const countryItem = getCountryByCode(countryCode);
  const regionItem = regionCode
    ? getRegionByCountryAndCode(countryCode, regionCode)
    : undefined;

  const formattedLegalRegion = [
    countryItem?.name,
    regionItem ? `(${regionItem.label})` : undefined,
  ]
    .filter(Boolean)
    .join(' ');

  return formattedLegalRegion;
}

export function getAllCountries() {
  return countries;
}

export function getAllRegionsForCountryCode(countryCode: string) {
  return countryRegions[countryCode];
}
