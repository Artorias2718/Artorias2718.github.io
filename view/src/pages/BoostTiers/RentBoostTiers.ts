/**
 * Atlas Earth ad-boost tier tables ("Rent Boost Outcomes"), keyed by region.
 *
 * Source: official Atlas Reality support-site charts ("At max parcels per
 * bracket, 20 boosts a day"), transcribed from the published chart images
 * (July 2026). All dollar values are verbatim from the official charts.
 *
 * Official chart assumptions:
 * - Weighted-average rarity distribution odds.
 * - Dollar figures computed at the MAX parcel count of each bracket.
 * - "With Ads" assumes 20 boosts (~20 boosted hours) per day.
 * - Final column is "All Accrued + Super Rent Boosts per year".
 *
 * Known errata in the official charts (kept verbatim; noted inline):
 * - US: the 366-435 and 731-875 "no ads" cells don't match the per-parcel
 *   rate implied by every other row (historic chart quirk).
 * - Asia/ME: the 71-105 row is labeled 12X but its dollar columns are
 *   computed with a 10x boost blend.
 * - Nordics+ and TH/SK/PL/PH: the "no ads" column in the first ~6 rows
 *   repeats the Brazil chart's values (e.g. 0.2506 for a 30-parcel bracket)
 *   while the remaining columns are computed from the correct parcel counts.
 * - TH/SK/PL/PH: the 3,000 / 6,000 / 10,000 rows' yearly columns are not
 *   12x their monthly columns.
 */

export interface BoostTierRow {
  id: number;
  /** Lower bound of the parcel range — used for sorting. */
  minParcels: number;
  /** Display label, e.g. "1-150" or "6000". */
  parcelsLabel: string;
  /** Ad boost multiplier for this range, e.g. 30 for "30x". */
  boost: number;
  /** Virtual rent accrued (no ads) per month, USD. */
  noAdsMonth?: number;
  /** Virtual rent accrued (with ads) per month, USD. */
  withAdsMonth?: number;
  /** Virtual rent accrued (with ads) per year, USD. */
  withAdsYear?: number;
  /** All accrued + Super Rent Boosts per year, USD. */
  srbYear?: number;
}

export interface RegionCountry {
  /** ISO 3166-1 alpha-2 code, matching country-flag-icons exports. */
  code: string;
  /** Display name shown in the flag tooltip. */
  name: string;
}

export interface RegionTierTable {
  /** Stable key, e.g. "us". */
  key: string;
  /** Tab label, e.g. "United States". */
  label: string;
  /** Currency the chart is denominated in. */
  currency: string;
  /** Which countries this table applies to (rendered as flag icons). */
  countries: RegionCountry[];
  /**
   * True when the rent-outcome dollar columns are derived rather than
   * published by Atlas Reality. (All tables are currently official.)
   */
  derived?: boolean;
  rows: BoostTierRow[];
}

const usRows: BoostTierRow[] = [
  { id: 1,  minParcels: 1,     parcelsLabel: '1-150',     boost: 30, noAdsMonth: 0.6266, withAdsMonth: 15.77, withAdsYear: 189.23, srbYear: 221.99 },
  { id: 2,  minParcels: 151,   parcelsLabel: '151-220',   boost: 20, noAdsMonth: 0.9190, withAdsMonth: 15.47, withAdsYear: 185.64, srbYear: 233.69 },
  { id: 3,  minParcels: 221,   parcelsLabel: '221-290',   boost: 15, noAdsMonth: 1.2114, withAdsMonth: 15.34, withAdsYear: 184.13, srbYear: 247.48 },
  { id: 4,  minParcels: 291,   parcelsLabel: '291-365',   boost: 12, noAdsMonth: 1.5247, withAdsMonth: 15.50, withAdsYear: 186.01, srbYear: 265.74 },
  // Official chart erratum: 1.8171 doesn't match the per-parcel rate at 435.
  { id: 5,  minParcels: 366,   parcelsLabel: '366-435',   boost: 10, noAdsMonth: 1.8171, withAdsMonth: 15.45, withAdsYear: 185.35, srbYear: 280.36 },
  { id: 6,  minParcels: 436,   parcelsLabel: '436-545',   boost: 8,  noAdsMonth: 2.2766, withAdsMonth: 15.56, withAdsYear: 186.68, srbYear: 305.72 },
  { id: 7,  minParcels: 546,   parcelsLabel: '546-625',   boost: 7,  noAdsMonth: 2.6108, withAdsMonth: 15.66, withAdsYear: 187.98, srbYear: 324.49 },
  { id: 8,  minParcels: 626,   parcelsLabel: '626-730',   boost: 6,  noAdsMonth: 3.0494, withAdsMonth: 15.76, withAdsYear: 189.06, srbYear: 348.51 },
  // Official chart erratum: 3.6551 doesn't match the per-parcel rate at 875.
  { id: 9,  minParcels: 731,   parcelsLabel: '731-875',   boost: 5,  noAdsMonth: 3.6551, withAdsMonth: 15.84, withAdsYear: 190.07, srbYear: 381.18 },
  { id: 10, minParcels: 876,   parcelsLabel: '876-1100',  boost: 4,  noAdsMonth: 4.595,  withAdsMonth: 16.08, withAdsYear: 192.99, srbYear: 433.25 },
  { id: 11, minParcels: 1101,  parcelsLabel: '1101-1500', boost: 3,  noAdsMonth: 6.266,  withAdsMonth: 16.65, withAdsYear: 199.84, srbYear: 527.47 },
  { id: 12, minParcels: 1501,  parcelsLabel: '1501-3000', boost: 2,  noAdsMonth: 12.53,  withAdsMonth: 22.97, withAdsYear: 275.70, srbYear: 930.96 },
  { id: 13, minParcels: 6000,  parcelsLabel: '6,000',     boost: 2,  noAdsMonth: 25.06,  withAdsMonth: 45.95, withAdsYear: 551.40, srbYear: 1861.91 },
  { id: 14, minParcels: 10000, parcelsLabel: '10,000',    boost: 2,  noAdsMonth: 41.77,  withAdsMonth: 76.58, withAdsYear: 919.00, srbYear: 3103.19 },
];

const commonwealthRows: BoostTierRow[] = [
  { id: 1,  minParcels: 1,     parcelsLabel: '1-60',     boost: 20, noAdsMonth: 0.2506, withAdsMonth: 4.22,  withAdsYear: 50.63,  srbYear: 63.73 },
  { id: 2,  minParcels: 61,    parcelsLabel: '61-100',   boost: 15, noAdsMonth: 0.4177, withAdsMonth: 5.29,  withAdsYear: 63.49,  srbYear: 85.34 },
  { id: 3,  minParcels: 101,   parcelsLabel: '101-150',  boost: 10, noAdsMonth: 0.6266, withAdsMonth: 5.33,  withAdsYear: 63.91,  srbYear: 96.68 },
  { id: 4,  minParcels: 151,   parcelsLabel: '151-180',  boost: 8,  noAdsMonth: 0.752,  withAdsMonth: 5.14,  withAdsYear: 61.66,  srbYear: 100.97 },
  { id: 5,  minParcels: 181,   parcelsLabel: '181-220',  boost: 7,  noAdsMonth: 0.919,  withAdsMonth: 5.51,  withAdsYear: 66.17,  srbYear: 114.22 },
  { id: 6,  minParcels: 221,   parcelsLabel: '221-250',  boost: 6,  noAdsMonth: 1.044,  withAdsMonth: 5.40,  withAdsYear: 64.75,  srbYear: 119.35 },
  { id: 7,  minParcels: 251,   parcelsLabel: '251-300',  boost: 5,  noAdsMonth: 1.25,   withAdsMonth: 5.43,  withAdsYear: 65.17,  srbYear: 130.69 },
  { id: 8,  minParcels: 301,   parcelsLabel: '301-350',  boost: 4,  noAdsMonth: 1.46,   withAdsMonth: 5.12,  withAdsYear: 61.41,  srbYear: 137.85 },
  { id: 9,  minParcels: 351,   parcelsLabel: '351-450',  boost: 3,  noAdsMonth: 1.88,   withAdsMonth: 5.013, withAdsYear: 60.15,  srbYear: 158.44 },
  { id: 10, minParcels: 451,   parcelsLabel: '451-3000', boost: 2,  noAdsMonth: 12.53,  withAdsMonth: 22.97, withAdsYear: 275.70, srbYear: 930.96 },
  { id: 11, minParcels: 6000,  parcelsLabel: '6,000',    boost: 2,  noAdsMonth: 25.06,  withAdsMonth: 45.95, withAdsYear: 551.40, srbYear: 1861.91 },
  { id: 12, minParcels: 10000, parcelsLabel: '10,000',   boost: 2,  noAdsMonth: 41.77,  withAdsMonth: 76.58, withAdsYear: 919.00, srbYear: 3103.19 },
];

const mexicoRows: BoostTierRow[] = [
  { id: 1,  minParcels: 1,     parcelsLabel: '1-50',     boost: 20, noAdsMonth: 0.2089, withAdsMonth: 3.52,  withAdsYear: 42.19,  srbYear: 53.11 },
  { id: 2,  minParcels: 51,    parcelsLabel: '51-85',    boost: 15, noAdsMonth: 0.3551, withAdsMonth: 4.50,  withAdsYear: 53.97,  srbYear: 72.54 },
  { id: 3,  minParcels: 86,    parcelsLabel: '86-100',   boost: 12, noAdsMonth: 0.4177, withAdsMonth: 4.25,  withAdsYear: 50.96,  srbYear: 72.80 },
  { id: 4,  minParcels: 101,   parcelsLabel: '101-140',  boost: 8,  noAdsMonth: 0.585,  withAdsMonth: 4.00,  withAdsYear: 47.96,  srbYear: 78.53 },
  { id: 5,  minParcels: 141,   parcelsLabel: '141-175',  boost: 7,  noAdsMonth: 0.731,  withAdsMonth: 4.39,  withAdsYear: 52.63,  srbYear: 89.76 },
  { id: 6,  minParcels: 176,   parcelsLabel: '176-225',  boost: 5,  noAdsMonth: 0.940,  withAdsMonth: 4.07,  withAdsYear: 48.87,  srbYear: 98.02 },
  { id: 7,  minParcels: 226,   parcelsLabel: '226-300',  boost: 4,  noAdsMonth: 1.25,   withAdsMonth: 4.39,  withAdsYear: 52.63,  srbYear: 118.16 },
  { id: 8,  minParcels: 301,   parcelsLabel: '301-400',  boost: 3,  noAdsMonth: 1.67,   withAdsMonth: 4.46,  withAdsYear: 53.47,  srbYear: 140.84 },
  { id: 9,  minParcels: 401,   parcelsLabel: '401-1000', boost: 2,  noAdsMonth: 4.18,   withAdsMonth: 7.66,  withAdsYear: 91.90,  srbYear: 310.32 },
  { id: 10, minParcels: 3000,  parcelsLabel: '3,000',    boost: 2,  noAdsMonth: 12.53,  withAdsMonth: 22.97, withAdsYear: 275.70, srbYear: 930.96 },
  { id: 11, minParcels: 6000,  parcelsLabel: '6,000',    boost: 2,  noAdsMonth: 25.06,  withAdsMonth: 45.95, withAdsYear: 551.40, srbYear: 1861.91 },
  { id: 12, minParcels: 10000, parcelsLabel: '10,000',   boost: 2,  noAdsMonth: 41.77,  withAdsMonth: 76.58, withAdsYear: 919.00, srbYear: 3103.19 },
];

const europeRows: BoostTierRow[] = [
  { id: 1,  minParcels: 1,     parcelsLabel: '1-70',     boost: 20, noAdsMonth: 0.2924, withAdsMonth: 4.92,  withAdsYear: 59.07,  srbYear: 74.36 },
  { id: 2,  minParcels: 71,    parcelsLabel: '71-100',   boost: 15, noAdsMonth: 0.4177, withAdsMonth: 5.29,  withAdsYear: 63.49,  srbYear: 85.34 },
  { id: 3,  minParcels: 101,   parcelsLabel: '101-135',  boost: 10, noAdsMonth: 0.5639, withAdsMonth: 4.79,  withAdsYear: 57.52,  srbYear: 87.01 },
  { id: 4,  minParcels: 136,   parcelsLabel: '136-170',  boost: 8,  noAdsMonth: 0.7101, withAdsMonth: 4.85,  withAdsYear: 58.23,  srbYear: 95.36 },
  { id: 5,  minParcels: 171,   parcelsLabel: '171-200',  boost: 7,  noAdsMonth: 0.8355, withAdsMonth: 5.01,  withAdsYear: 60.15,  srbYear: 103.84 },
  { id: 6,  minParcels: 201,   parcelsLabel: '201-250',  boost: 6,  noAdsMonth: 1.04,   withAdsMonth: 5.40,  withAdsYear: 64.75,  srbYear: 119.35 },
  { id: 7,  minParcels: 251,   parcelsLabel: '251-300',  boost: 5,  noAdsMonth: 1.25,   withAdsMonth: 5.43,  withAdsYear: 65.17,  srbYear: 130.69 },
  { id: 8,  minParcels: 301,   parcelsLabel: '301-350',  boost: 4,  noAdsMonth: 1.46,   withAdsMonth: 5.12,  withAdsYear: 61.41,  srbYear: 137.85 },
  { id: 9,  minParcels: 351,   parcelsLabel: '351-400',  boost: 3,  noAdsMonth: 1.67,   withAdsMonth: 4.46,  withAdsYear: 53.47,  srbYear: 140.84 },
  { id: 10, minParcels: 401,   parcelsLabel: '401-1000', boost: 2,  noAdsMonth: 4.18,   withAdsMonth: 7.66,  withAdsYear: 91.90,  srbYear: 310.32 },
  { id: 11, minParcels: 3000,  parcelsLabel: '3,000',    boost: 2,  noAdsMonth: 12.53,  withAdsMonth: 22.97, withAdsYear: 275.70, srbYear: 930.96 },
  { id: 12, minParcels: 6000,  parcelsLabel: '6,000',    boost: 2,  noAdsMonth: 25.06,  withAdsMonth: 45.95, withAdsYear: 551.40, srbYear: 1861.91 },
  { id: 13, minParcels: 10000, parcelsLabel: '10,000',   boost: 2,  noAdsMonth: 41.77,  withAdsMonth: 76.58, withAdsYear: 919.00, srbYear: 3103.19 },
];

const asiaMiddleEastRows: BoostTierRow[] = [
  { id: 1,  minParcels: 1,     parcelsLabel: '1-50',     boost: 20, noAdsMonth: 0.2089, withAdsMonth: 3.52,  withAdsYear: 42.19,  srbYear: 53.11 },
  { id: 2,  minParcels: 51,    parcelsLabel: '51-70',    boost: 15, noAdsMonth: 0.2924, withAdsMonth: 3.70,  withAdsYear: 44.43,  srbYear: 59.74 },
  // Official chart erratum: labeled 12X but dollar columns computed at 10x.
  { id: 3,  minParcels: 71,    parcelsLabel: '71-105',   boost: 12, noAdsMonth: 0.4386, withAdsMonth: 3.73,  withAdsYear: 44.74,  srbYear: 67.67 },
  { id: 4,  minParcels: 106,   parcelsLabel: '106-130',  boost: 8,  noAdsMonth: 0.5430, withAdsMonth: 3.71,  withAdsYear: 44.53,  srbYear: 72.92 },
  { id: 5,  minParcels: 131,   parcelsLabel: '131-150',  boost: 7,  noAdsMonth: 0.6266, withAdsMonth: 3.76,  withAdsYear: 45.11,  srbYear: 77.88 },
  { id: 6,  minParcels: 151,   parcelsLabel: '151-175',  boost: 6,  noAdsMonth: 0.7310, withAdsMonth: 3.78,  withAdsYear: 45.32,  srbYear: 83.55 },
  { id: 7,  minParcels: 176,   parcelsLabel: '176-200',  boost: 5,  noAdsMonth: 0.8355, withAdsMonth: 3.62,  withAdsYear: 43.44,  srbYear: 87.13 },
  { id: 8,  minParcels: 201,   parcelsLabel: '201-225',  boost: 4,  noAdsMonth: 0.9399, withAdsMonth: 3.29,  withAdsYear: 39.48,  srbYear: 88.62 },
  { id: 9,  minParcels: 226,   parcelsLabel: '226-300',  boost: 3,  noAdsMonth: 1.25,   withAdsMonth: 3.34,  withAdsYear: 40.10,  srbYear: 105.63 },
  { id: 10, minParcels: 301,   parcelsLabel: '301-1000', boost: 2,  noAdsMonth: 4.18,   withAdsMonth: 7.66,  withAdsYear: 91.90,  srbYear: 310.32 },
  { id: 11, minParcels: 3000,  parcelsLabel: '3,000',    boost: 2,  noAdsMonth: 12.53,  withAdsMonth: 22.97, withAdsYear: 275.70, srbYear: 930.96 },
  { id: 12, minParcels: 6000,  parcelsLabel: '6,000',    boost: 2,  noAdsMonth: 25.06,  withAdsMonth: 45.95, withAdsYear: 551.40, srbYear: 1861.91 },
  { id: 13, minParcels: 10000, parcelsLabel: '10,000',   boost: 2,  noAdsMonth: 41.77,  withAdsMonth: 76.58, withAdsYear: 919.00, srbYear: 3103.19 },
];

const brazilRows: BoostTierRow[] = [
  { id: 1,  minParcels: 1,     parcelsLabel: '1-60',     boost: 20, noAdsMonth: 0.2506, withAdsMonth: 4.22,  withAdsYear: 50.63,  srbYear: 63.73 },
  { id: 2,  minParcels: 61,    parcelsLabel: '61-75',    boost: 15, noAdsMonth: 0.3133, withAdsMonth: 3.97,  withAdsYear: 47.62,  srbYear: 62.91 },
  { id: 3,  minParcels: 76,    parcelsLabel: '76-100',   boost: 12, noAdsMonth: 0.4177, withAdsMonth: 4.25,  withAdsYear: 50.96,  srbYear: 72.80 },
  { id: 4,  minParcels: 101,   parcelsLabel: '101-120',  boost: 10, noAdsMonth: 0.5013, withAdsMonth: 4.26,  withAdsYear: 51.13,  srbYear: 77.34 },
  { id: 5,  minParcels: 121,   parcelsLabel: '121-150',  boost: 8,  noAdsMonth: 0.6266, withAdsMonth: 4.28,  withAdsYear: 51.38,  srbYear: 84.14 },
  { id: 6,  minParcels: 151,   parcelsLabel: '151-200',  boost: 6,  noAdsMonth: 0.8355, withAdsMonth: 4.32,  withAdsYear: 51.80,  srbYear: 95.48 },
  { id: 7,  minParcels: 201,   parcelsLabel: '201-250',  boost: 5,  noAdsMonth: 1.0443, withAdsMonth: 4.53,  withAdsYear: 54.30,  srbYear: 108.91 },
  { id: 8,  minParcels: 251,   parcelsLabel: '251-300',  boost: 4,  noAdsMonth: 1.25,   withAdsMonth: 4.39,  withAdsYear: 52.63,  srbYear: 118.16 },
  { id: 9,  minParcels: 301,   parcelsLabel: '301-400',  boost: 3,  noAdsMonth: 1.67,   withAdsMonth: 4.46,  withAdsYear: 53.47,  srbYear: 140.84 },
  { id: 10, minParcels: 401,   parcelsLabel: '401-1000', boost: 2,  noAdsMonth: 4.18,   withAdsMonth: 7.66,  withAdsYear: 91.90,  srbYear: 310.32 },
  { id: 11, minParcels: 3000,  parcelsLabel: '3,000',    boost: 2,  noAdsMonth: 12.53,  withAdsMonth: 22.97, withAdsYear: 275.70, srbYear: 930.96 },
  { id: 12, minParcels: 6000,  parcelsLabel: '6,000',    boost: 2,  noAdsMonth: 25.06,  withAdsMonth: 45.95, withAdsYear: 551.40, srbYear: 1861.91 },
  { id: 13, minParcels: 10000, parcelsLabel: '10,000',   boost: 2,  noAdsMonth: 41.77,  withAdsMonth: 76.58, withAdsYear: 919.00, srbYear: 3103.19 },
];

// Note: the official chart's "no ads" column in rows 1-6 repeats the Brazil
// chart's values; the remaining columns are consistent with the correct
// parcel counts. Kept verbatim.
const nordicPlusRows: BoostTierRow[] = [
  { id: 1,  minParcels: 1,     parcelsLabel: '1-30',     boost: 15, noAdsMonth: 0.2506, withAdsMonth: 1.59,  withAdsYear: 19.05,  srbYear: 25.60 },
  { id: 2,  minParcels: 31,    parcelsLabel: '31-50',    boost: 12, noAdsMonth: 0.3133, withAdsMonth: 2.12,  withAdsYear: 25.48,  srbYear: 36.40 },
  { id: 3,  minParcels: 51,    parcelsLabel: '51-70',    boost: 8,  noAdsMonth: 0.4177, withAdsMonth: 2.00,  withAdsYear: 23.98,  srbYear: 39.27 },
  { id: 4,  minParcels: 71,    parcelsLabel: '71-105',   boost: 5,  noAdsMonth: 0.5013, withAdsMonth: 1.90,  withAdsYear: 22.81,  srbYear: 45.74 },
  { id: 5,  minParcels: 106,   parcelsLabel: '106-130',  boost: 4,  noAdsMonth: 0.6266, withAdsMonth: 1.90,  withAdsYear: 22.81,  srbYear: 51.20 },
  { id: 6,  minParcels: 131,   parcelsLabel: '131-150',  boost: 3,  noAdsMonth: 0.8355, withAdsMonth: 1.15,  withAdsYear: 13.78,  srbYear: 46.55 },
  { id: 7,  minParcels: 151,   parcelsLabel: '151-250',  boost: 2,  noAdsMonth: 1.0443, withAdsMonth: 1.91,  withAdsYear: 22.97,  srbYear: 77.58 },
  { id: 8,  minParcels: 251,   parcelsLabel: '251-300',  boost: 2,  noAdsMonth: 1.25,   withAdsMonth: 2.30,  withAdsYear: 27.57,  srbYear: 93.10 },
  { id: 9,  minParcels: 301,   parcelsLabel: '301-400',  boost: 2,  noAdsMonth: 1.67,   withAdsMonth: 3.06,  withAdsYear: 36.76,  srbYear: 124.13 },
  { id: 10, minParcels: 401,   parcelsLabel: '401-1000', boost: 2,  noAdsMonth: 4.18,   withAdsMonth: 7.66,  withAdsYear: 91.90,  srbYear: 310.32 },
  { id: 11, minParcels: 3000,  parcelsLabel: '3,000',    boost: 2,  noAdsMonth: 12.53,  withAdsMonth: 22.97, withAdsYear: 275.70, srbYear: 930.96 },
  { id: 12, minParcels: 6000,  parcelsLabel: '6,000',    boost: 2,  noAdsMonth: 25.06,  withAdsMonth: 45.95, withAdsYear: 551.40, srbYear: 1861.91 },
  { id: 13, minParcels: 10000, parcelsLabel: '10,000',   boost: 2,  noAdsMonth: 41.77,  withAdsMonth: 76.58, withAdsYear: 919.00, srbYear: 3103.19 },
];

// Note: same "no ads" column quirk as the Nordics+ chart, and the
// 3,000 / 6,000 / 10,000 rows' yearly columns are not 12x their monthly
// columns in the official chart. Kept verbatim.
const thSkPlPhRows: BoostTierRow[] = [
  { id: 1,  minParcels: 1,     parcelsLabel: '1-30',     boost: 8, noAdsMonth: 0.2506, withAdsMonth: 1.00,  withAdsYear: 11.95,  srbYear: 18.50 },
  { id: 2,  minParcels: 31,    parcelsLabel: '31-50',    boost: 6, noAdsMonth: 0.3133, withAdsMonth: 1.15,  withAdsYear: 13.78,  srbYear: 24.71 },
  { id: 3,  minParcels: 51,    parcelsLabel: '51-70',    boost: 4, noAdsMonth: 0.4177, withAdsMonth: 1.30,  withAdsYear: 15.62,  srbYear: 30.91 },
  { id: 4,  minParcels: 71,    parcelsLabel: '71-105',   boost: 3, noAdsMonth: 0.5013, withAdsMonth: 1.57,  withAdsYear: 18.84,  srbYear: 41.77 },
  { id: 5,  minParcels: 106,   parcelsLabel: '106-130',  boost: 2, noAdsMonth: 0.6266, withAdsMonth: 1.76,  withAdsYear: 21.14,  srbYear: 49.53 },
  { id: 6,  minParcels: 131,   parcelsLabel: '131-150',  boost: 2, noAdsMonth: 0.8355, withAdsMonth: 1.91,  withAdsYear: 22.97,  srbYear: 55.74 },
  { id: 7,  minParcels: 151,   parcelsLabel: '151-250',  boost: 2, noAdsMonth: 1.0443, withAdsMonth: 2.68,  withAdsYear: 32.16,  srbYear: 86.77 },
  { id: 8,  minParcels: 251,   parcelsLabel: '251-300',  boost: 2, noAdsMonth: 1.25,   withAdsMonth: 3.06,  withAdsYear: 36.76,  srbYear: 102.29 },
  { id: 9,  minParcels: 301,   parcelsLabel: '301-400',  boost: 2, noAdsMonth: 1.67,   withAdsMonth: 3.83,  withAdsYear: 45.95,  srbYear: 133.32 },
  { id: 10, minParcels: 401,   parcelsLabel: '401-1000', boost: 2, noAdsMonth: 4.18,   withAdsMonth: 8.42,  withAdsYear: 101.09, srbYear: 319.51 },
  { id: 11, minParcels: 3000,  parcelsLabel: '3,000',    boost: 2, noAdsMonth: 12.53,  withAdsMonth: 23.74, withAdsYear: 181.71, srbYear: 836.97 },
  { id: 12, minParcels: 6000,  parcelsLabel: '6,000',    boost: 2, noAdsMonth: 25.06,  withAdsMonth: 45.95, withAdsYear: 363.42, srbYear: 1673.94 },
  { id: 13, minParcels: 10000, parcelsLabel: '10,000',   boost: 2, noAdsMonth: 41.77,  withAdsMonth: 76.58, withAdsYear: 605.70, srbYear: 2789.90 },
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
    key: 'commonwealth',
    label: 'UK / CA / AU +',
    currency: 'USD',
    countries: [
      { code: 'AU', name: 'Australia' },
      { code: 'CA', name: 'Canada' },
      { code: 'ZA', name: 'South Africa' },
      { code: 'IE', name: 'Ireland' },
      { code: 'NZ', name: 'New Zealand' },
      { code: 'GB', name: 'United Kingdom' },
    ],
    rows: commonwealthRows,
  },
  {
    key: 'mexico',
    label: 'Mexico',
    currency: 'USD',
    countries: [{ code: 'MX', name: 'Mexico' }],
    rows: mexicoRows,
  },
  {
    key: 'europe',
    label: 'Western Europe',
    currency: 'USD',
    countries: [
      { code: 'DE', name: 'Germany' },
      { code: 'FR', name: 'France' },
      { code: 'NL', name: 'Netherlands' },
      { code: 'ES', name: 'Spain' },
      { code: 'IT', name: 'Italy' },
      { code: 'PT', name: 'Portugal' },
    ],
    rows: europeRows,
  },
  {
    key: 'asia-middle-east',
    label: 'Asia & Middle East',
    currency: 'USD',
    countries: [
      { code: 'KR', name: 'South Korea' },
      { code: 'JP', name: 'Japan' },
      { code: 'SG', name: 'Singapore' },
      { code: 'AE', name: 'United Arab Emirates' },
      { code: 'CH', name: 'Switzerland' },
    ],
    rows: asiaMiddleEastRows,
  },
  {
    key: 'brazil',
    label: 'Brazil',
    currency: 'USD',
    countries: [{ code: 'BR', name: 'Brazil' }],
    rows: brazilRows,
  },
  {
    key: 'nordic-plus',
    label: 'Nordics +',
    currency: 'USD',
    countries: [
      { code: 'SE', name: 'Sweden' },
      { code: 'FI', name: 'Finland' },
      { code: 'AT', name: 'Austria' },
      { code: 'TW', name: 'Taiwan' },
      { code: 'NO', name: 'Norway' },
      { code: 'DK', name: 'Denmark' },
      { code: 'BE', name: 'Belgium' },
    ],
    rows: nordicPlusRows,
  },
  {
    key: 'th-sk-pl-ph',
    label: 'TH / SK / PL / PH',
    currency: 'USD',
    countries: [
      { code: 'TH', name: 'Thailand' },
      { code: 'SK', name: 'Slovakia' },
      { code: 'PL', name: 'Poland' },
      { code: 'PH', name: 'Philippines' },
    ],
    rows: thSkPlPhRows,
  },
];