import countries from '@/assets/json/countries.json';

type Country = typeof countries[number];

export function getCountryByCode(
  isoCode: string | null | undefined,
): Country | null {
  return (
    (isoCode && countries.find((country) => country.iso2 === isoCode)) || null
  );
}
