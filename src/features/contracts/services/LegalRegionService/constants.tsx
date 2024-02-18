// TODO: Import from the json when we add support for more countries.
// import allCountries from '@/assets/json/countries.json';

export const countriesWithStates = ['us'];

export const countries = [
  // TODO: Uncomment when we add support for more countries.
  // { code: 'jp', label: 'Japan' },
  // { code: 'pl', label: 'Poland' },
  // { code: 'in', label: 'India' },
  // { code: 'gb', label: 'UK' },
  { code: 'us', label: 'US' },
];

interface Region {
  code: string;
  label: string;
}

/**
 * When the array is empty, it means we know that this country has no regions,
 * so we won't display the region input.
 */
export const countryRegions: Record<string, Region[]> = {
  us: [
    { code: 'NY', label: 'New York' },
    { code: 'AK', label: 'Alaska' },
    { code: 'AL', label: 'Alabama' },
    { code: 'AR', label: 'Arkansas' },
    { code: 'AZ', label: 'Arizona' },
    { code: 'CA', label: 'California' },
    { code: 'CO', label: 'Colorado' },
    { code: 'CT', label: 'Connecticut' },
    { code: 'DE', label: 'Delaware' },
    { code: 'FL', label: 'Florida' },
    { code: 'GA', label: 'Georgia' },
    { code: 'HI', label: 'Hawaii' },
    { code: 'IA', label: 'Iowa' },
    { code: 'ID', label: 'Idaho' },
    { code: 'IL', label: 'Illinois' },
    { code: 'IN', label: 'Indiana' },
    { code: 'KS', label: 'Kansas' },
    { code: 'KY', label: 'Kentucky' },
    { code: 'LA', label: 'Louisiana' },
    { code: 'MA', label: 'Massachusetts' },
    { code: 'MD', label: 'Maryland' },
    { code: 'ME', label: 'Maine' },
    { code: 'MI', label: 'Michigan' },
    { code: 'MN', label: 'Minnesota' },
    { code: 'MO', label: 'Missouri' },
    { code: 'MS', label: 'Mississippi' },
    { code: 'MT', label: 'Montana' },
    { code: 'NC', label: 'North Carolina' },
    { code: 'ND', label: 'North Dakota' },
    { code: 'NE', label: 'Nebraska' },
    { code: 'NH', label: 'New Hampshire' },
    { code: 'NJ', label: 'New Jersey' },
    { code: 'NM', label: 'New Mexico' },
    { code: 'NV', label: 'Nevada' },
    { code: 'OH', label: 'Ohio' },
    { code: 'OK', label: 'Oklahoma' },
    { code: 'OR', label: 'Oregon' },
    { code: 'PA', label: 'Pennsylvania' },
    { code: 'RI', label: 'Rhode Island' },
    { code: 'SC', label: 'South Carolina' },
    { code: 'SD', label: 'South Dakota' },
    { code: 'TN', label: 'Tennessee' },
    { code: 'TX', label: 'Texas' },
    { code: 'UT', label: 'Utah' },
    { code: 'VA', label: 'Virginia' },
    { code: 'VT', label: 'Vermont' },
    { code: 'WA', label: 'Washington' },
    { code: 'WI', label: 'Wisconsin' },
    { code: 'WV', label: 'West Virginia' },
    { code: 'WY', label: 'Wyoming' },
  ],
  gb: [
    { code: 'EN', label: 'England' },
    { code: 'NI', label: 'Northern Ireland' },
    { code: 'SC', label: 'Scotland' },
    { code: 'WA', label: 'Wales' },
  ],
  pl: [],
  in: [],
};
