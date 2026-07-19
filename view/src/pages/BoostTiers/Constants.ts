/**
 * Atlas Earth ad-boost tier tables ("Rent Boost Outcomes"), keyed by region.
 *
 * Sources:
 * - US parcel ranges, boosts, and rent-outcome dollar figures: official
 *   Atlas Reality help-center chart
 *   https://atlasreality.helpshift.com/hc/en/3-atlas-earth/faq/39-why-do-ad-boosts-change-and-how-do-i-see-my-current-boost-rate/
 * - International / Mexico / Nordic parcel ranges and boosts:
 *   community-verified tables at https://www.atlasearthrent.app/calculator
 *   (the official charts for these regions are published only as images).
 *
 * Notes from the official chart:
 * - Assumes weighted-average rarity distribution odds.
 * - "With Ads" assumes boosting ~20 hours/day.
 * - Event Bonus assumes two 32-hour 50x SRB events per month (64 SRB hrs/mo).
 */

export interface BoostTierRow {
  id: number;
  /** Lower bound of the parcel range — used for sorting. */
  minParcels: number;
  /** Display label, e.g. "1-150" or "6000". */
  parcelsLabel: string;
  /** Ad boost multiplier for this range, e.g. 30 for "30x". */
  boost: number;
  /** Rent accrued (no ads) per month, USD. Only published for the US chart. */
  noAdsMonth?: number;
  /** Rent accrued (with ads) per month, USD. */
  withAdsMonth?: number;
  /** Rent accrued (with ads) per year, USD. */
  withAdsYear?: number;
  /** Rent accrued (with SRB event bonus) per year, USD. */
  srbYear?: number;
}

export interface RegionCountry {
  /** ISO 3166-1 alpha-2 code, matching country-flag icons exports */
  code: string;
  /** Display name shown in the flag tooltip */
  name: string;
}

export interface RegionTierTable {
  /** Stable key, e.g. "us". */
  key: string;
  /** Tab label, e.g. "United States". */
  label: string;
  /** Currency the chart is denominated in. */
  currency: string;
  /** Which countries this table applies to (shown as a caption). */
  countries?: RegionCountry[];
  rows: BoostTierRow[];
}

const usRows: BoostTierRow[] = [
  { id: 1,  minParcels: 1,    parcelsLabel: '1-150',     boost: 30, noAdsMonth: 0.6266, withAdsMonth: 15.769, withAdsYear: 189.23, srbYear: 201.52 },
  { id: 2,  minParcels: 151,  parcelsLabel: '151-220',   boost: 20, noAdsMonth: 0.9189, withAdsMonth: 15.569, withAdsYear: 185.64, srbYear: 203.66 },
  { id: 3,  minParcels: 221,  parcelsLabel: '221-290',   boost: 15, noAdsMonth: 1.2114, withAdsMonth: 15.449, withAdsYear: 184.13, srbYear: 207.89 },
  { id: 4,  minParcels: 291,  parcelsLabel: '291-365',   boost: 12, noAdsMonth: 1.5247, withAdsMonth: 15.501, withAdsYear: 186.01, srbYear: 215.91 },
  { id: 5,  minParcels: 366,  parcelsLabel: '366-435',   boost: 10, noAdsMonth: 1.871,  withAdsMonth: 15.447, withAdsYear: 185.35, srbYear: 220.97 },
  { id: 6,  minParcels: 436,  parcelsLabel: '436-545',   boost: 8,  noAdsMonth: 2.2766, withAdsMonth: 15.556, withAdsYear: 186.70, srbYear: 231.32 },
  { id: 7,  minParcels: 546,  parcelsLabel: '546-625',   boost: 7,  noAdsMonth: 2.6108, withAdsMonth: 15.664, withAdsYear: 187.98, srbYear: 239.17 },
  { id: 8,  minParcels: 626,  parcelsLabel: '626-730',   boost: 6,  noAdsMonth: 3.0494, withAdsMonth: 15.775, withAdsYear: 189.06, srbYear: 248.86 },
  { id: 9,  minParcels: 731,  parcelsLabel: '731-875',   boost: 5,  noAdsMonth: 3.3487, withAdsMonth: 15.84,  withAdsYear: 190.07, srbYear: 261.74 },
  { id: 10, minParcels: 876,  parcelsLabel: '876-1100',  boost: 4,  noAdsMonth: 4.595,  withAdsMonth: 16.08,  withAdsYear: 192.99, srbYear: 283.09 },
  { id: 11, minParcels: 1101, parcelsLabel: '1101-1500', boost: 3,  noAdsMonth: 6.266,  withAdsMonth: 16.71,  withAdsYear: 200.5,  srbYear: 324.37 },
  { id: 12, minParcels: 1501, parcelsLabel: '1501-3000', boost: 2,  noAdsMonth: 12.53,  withAdsMonth: 22.97,  withAdsYear: 275.70, srbYear: 521.42 },
  { id: 13, minParcels: 6000, parcelsLabel: '6000',      boost: 2,  noAdsMonth: 25.06,  withAdsMonth: 45.95,  withAdsYear: 551.40, srbYear: 1042.84 },
  { id: 14, minParcels: 10000, parcelsLabel: '10000',    boost: 2,  noAdsMonth: 41.77,  withAdsMonth: 76.58,  withAdsYear: 918.99, srbYear: 1738.07 },
];

const internationalRows: BoostTierRow[] = [
  { id: 1,  minParcels: 1,   parcelsLabel: '1-60',    boost: 20 },
  { id: 2,  minParcels: 61,  parcelsLabel: '61-100',  boost: 15 },
  { id: 3,  minParcels: 101, parcelsLabel: '101-150', boost: 10 },
  { id: 4,  minParcels: 151, parcelsLabel: '151-180', boost: 8 },
  { id: 5,  minParcels: 181, parcelsLabel: '181-220', boost: 7 },
  { id: 6,  minParcels: 221, parcelsLabel: '221-250', boost: 6 },
  { id: 7,  minParcels: 251, parcelsLabel: '251-300', boost: 5 },
  { id: 8,  minParcels: 301, parcelsLabel: '301-350', boost: 4 },
  { id: 9,  minParcels: 351, parcelsLabel: '351-450', boost: 3 },
  { id: 10, minParcels: 451, parcelsLabel: '451+',    boost: 2 },
];

const mexicoRows: BoostTierRow[] = [
  { id: 1, minParcels: 1,   parcelsLabel: '1-50',    boost: 20 },
  { id: 2, minParcels: 51,  parcelsLabel: '51-85',   boost: 15 },
  { id: 3, minParcels: 86,  parcelsLabel: '86-100',  boost: 12 },
  { id: 4, minParcels: 101, parcelsLabel: '101-140', boost: 8 },
  { id: 5, minParcels: 141, parcelsLabel: '141-175', boost: 7 },
  { id: 6, minParcels: 176, parcelsLabel: '176-225', boost: 5 },
  { id: 7, minParcels: 226, parcelsLabel: '226-300', boost: 4 },
  { id: 8, minParcels: 301, parcelsLabel: '301-400', boost: 3 },
  { id: 9, minParcels: 401, parcelsLabel: '401+',    boost: 2 },
];

const nordicRows: BoostTierRow[] = [
  { id: 1, minParcels: 1,   parcelsLabel: '1-30',    boost: 15 },
  { id: 2, minParcels: 31,  parcelsLabel: '31-50',   boost: 12 },
  { id: 3, minParcels: 51,  parcelsLabel: '51-70',   boost: 8 },
  { id: 4, minParcels: 71,  parcelsLabel: '71-105',  boost: 5 },
  { id: 5, minParcels: 106, parcelsLabel: '106-130', boost: 4 },
  { id: 6, minParcels: 131, parcelsLabel: '131-150', boost: 3 },
  { id: 7, minParcels: 151, parcelsLabel: '151+',    boost: 2 },
];

export const REGION_TIER_TABLES: RegionTierTable[] = [
  {
    key: 'us',
    label: 'United States',
    currency: 'USD',
    countries: [{ code: 'US', name: 'United States' }],
    rows: usRows,
  },
  {
    key: 'mexico',
    label: 'Mexico',
    currency: 'USD',
    countries: [{ code: 'MX', name: 'Mexico' }],
    rows: mexicoRows,
  },
  {
    key: 'international',
    label: 'International',
    currency: 'USD',
    countries: [
      { code: 'AU', name: 'Australia' },
      { code: 'BR', name: 'Brazil' },
      { code: 'CA', name: 'Canada' },
      { code: 'FR', name: 'France' },
      { code: 'DE', name: 'Germany' },
      { code: 'IE', name: 'Ireland' },
      { code: 'IT', name: 'Italy' },
      { code: 'JP', name: 'Japan' },
      { code: 'NL', name: 'Netherlands' },
      { code: 'NZ', name: 'New Zealand' },
      { code: 'ES', name: 'Spain' },
      { code: 'ZA', name: 'South Africa' },
      { code: 'KR', name: 'South Korea' },
      { code: 'GB', name: 'United Kingdom' },
    ],
    rows: internationalRows,
  },
  {
    key: 'nordic',
    label: 'Nordic',
    currency: 'USD',
    countries: [
      { code: 'SE', name: 'Sweden' },
      { code: 'FI', name: 'Finland' },
      { code: 'NO', name: 'Norway' },
      { code: 'DK', name: 'Denmark' },
    ],
    rows: nordicRows,
  },
];