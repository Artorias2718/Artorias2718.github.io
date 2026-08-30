import { useMemo, useState } from 'react';
import Box from '@mui/material/Box';
import Chip from '@mui/material/Chip';
import MenuItem from '@mui/material/MenuItem';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import Tab from '@mui/material/Tab';
import Tabs from '@mui/material/Tabs';
import TextField from '@mui/material/TextField';
import Tooltip from '@mui/material/Tooltip';
import Typography from '@mui/material/Typography';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';
import * as Flags from 'country-flag-icons/react/3x2';
import { DataGrid, type GridColDef } from '@mui/x-data-grid';
import {
  type IBoostTierRowRead,
  type IRegionCountryRead, type IRegionTierTableRead
} from '@/Types';

import { type IParcelRead } from '@/Types';
import useGetParcels from "@/api/queryHooks/BoostTiers/useGetParcels.ts";
import useGetRegionTiers from "@/api/queryHooks/BoostTiers/useGetRegionTiers.ts";

import { decode } from 'html-entities';

const currencyFmt = (currency: string) =>
  new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency,
    minimumFractionDigits: 2,
    maximumFractionDigits: 4,
  });

const SUPERSCRIPTS: Record<string, string> = {
  '-': '\u207B', '0': '\u2070', '1': '\u00B9', '2': '\u00B2', '3': '\u00B3',
  '4': '\u2074', '5': '\u2075', '6': '\u2076', '7': '\u2077', '8': '\u2078',
  '9': '\u2079',
};

/** Formats sub-dollar values as e.g. "$2.506 × 10⁻¹" (up to 4 sig figs). */
function sciDollars(value: number): string {
  const [mantissaRaw, exponent] = value > 0
      ? value.toExponential(3).split('e')
      : ['-1', '-1'];
  const mantissa = parseFloat(mantissaRaw); // strips trailing zeros
  const sup = exponent
    .replace('+', '')
    .split('')
    .map((ch) => SUPERSCRIPTS[ch] ?? ch)
    .join('');
  return `$${mantissa} \u00D7 10${sup}`;
}

type MoneyField = 'noAdsMonth' | 'withAdsMonth' | 'withAdsYear' | 'srbYear';

const MONEY_FIELDS: { field: MoneyField; header: string; shortHeader: string }[] = [
  { field: 'noAdsMonth',   header: 'No Ads/mo.',                  shortHeader: 'No Ads/mo.' },
  { field: 'withAdsMonth', header: 'With Ads/mo.',                shortHeader: 'With Ads/mo.' },
  { field: 'withAdsYear',  header: 'With Ads/yr.',                shortHeader: 'With Ads/yr.' },
  { field: 'srbYear',      header: '+ Super Rent Boosts/yr.',     shortHeader: '+SRB/yr.' },
];

type FlagComponent = (typeof Flags)['US'];

function CountryFlagList({ countries }: { countries: IRegionCountryRead[] }) {
  return (
    <Stack direction="row" spacing={1} useFlexGap sx={{ flexWrap: 'wrap', alignItems: 'center' }}>
      {countries.map(({ code, name }) => {
        const Flag = (Flags as Record<string, FlagComponent | undefined>)[code];
        return (
          <Tooltip key={code} title={name} arrow>
            {Flag ? (
              <Box
                component="span"
                tabIndex={0}
                aria-label={name}
                sx={{
                  display: 'inline-flex',
                  width: 30,
                  lineHeight: 0,
                  borderRadius: 0.5,
                  overflow: 'hidden',
                  boxShadow: 1,
                  '&:focus-visible': {
                    outline: (theme) => `2px solid ${theme.palette.primary.main}`,
                    outlineOffset: 2,
                  },
                }}
              >
                <Flag title={name} />
              </Box>
            ) : (
              <Chip label={code} size="small" tabIndex={0} aria-label={name} />
            )}
          </Tooltip>
        );
      })}
    </Stack>
  );
}

const RARITY_CHIP_COLOR: Record<
  IParcelRead['rarity'],
  'default' | 'info' | 'secondary' | 'warning'
> = {
  Common: 'default',
  Rare: 'info',
  Epic: 'secondary',
  Legendary: 'warning',
};

function ParcelRarityRatesGrid({ isMobile }: { isMobile: boolean }) {
  const { data: parcels } = useGetParcels();

  const columns = useMemo<GridColDef<IParcelRead>[]>(
    () => [
      {
        field: 'rarity',
        headerName: 'Rarity',
        flex: 1,
        minWidth: isMobile ? 100 : 110,
        renderCell: ({ value }) => (
          <Chip
            label={value}
            size="small"
            color={RARITY_CHIP_COLOR[value as IParcelRead['rarity']]}
            variant="outlined"
          />
        ),
      },
      {
        field: 'odds',
        headerName: 'Odds',
        type: 'number',
        flex: 0.6,
        minWidth: isMobile ? 60 : 80,
        valueFormatter: (value: number) => `${Math.round(value * 100)}%`,
      },
      {
        field: 'rate',
        headerName: 'Rent/sec.',
        type: 'number',
        flex: 1,
        minWidth: isMobile ? 120 : 140,
        valueFormatter: (value: number) => sciDollars(value),
      },
      {
        field: 'perDay',
        headerName: 'Rent/day',
        type: 'number',
        flex: 1,
        minWidth: 140,
        valueGetter: (_value, row) => row.rate * 86400,
        valueFormatter: (value: number) => sciDollars(value),
      },
    ],
    [isMobile],
  );

  return (
    <Stack spacing={1}>
      <Typography variant="h2" component="h2">
        Base Rent by Parcel Rarity
      </Typography>
      <Typography variant="body1">
        Every parcel you buy is assigned a rarity at random — you don't get to pick — so this table isn't a shopping menu, it's the odds sheet for a lottery you're already playing. Half of everything you'll ever own comes up Common, and only one parcel in twenty lands as Legendary. That spread matters because the payouts are far from equal: a Legendary earns about 4× what a Common does, an Epic about 2×, while a Rare only edges out a Common by roughly 45%.
      </Typography>
      <Typography variant="body1">
        Because rarity is fixed by those odds, the number that actually governs your income isn't any single row — it's the blended average, what a typical parcel earns once you account for the whole 50/30/15/5 mix. That works out to roughly $1.37 × 10⁻⁴ per parcel per day, or about five cents per parcel per year in raw base rent. That sounds like nothing, and it is — which is the single most important thing to understand about Atlas Earth's economy. Base rent alone will never move the needle; nearly everything you earn comes from the boosts and ads layered on top of it (see the tier table below). So plan around the average, not the jackpot: chasing that 1-in-20 Legendary feeling only ever adds a rounding error to a number that's decided elsewhere.
      </Typography>
      <Paper variant="outlined">
        <DataGrid
          rows={parcels || []}
          columns={columns}
          columnVisibilityModel={{ perDay: !isMobile }}
          density="compact"
          disableRowSelectionOnClick
          disableColumnMenu
          hideFooter
          sx={{ border: 0 }}
        />
      </Paper>
    </Stack>
  );
}

export default function BoostTiers() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const { data: regionTierTables, status: regionTierTablesStatus } = useGetRegionTiers();

  const [regionKey, setRegionKey] = useState('USA');
  const [mobileMetric, setMobileMetric] = useState<MoneyField>('withAdsMonth');

  const region: IRegionTierTableRead = useMemo(
    () => regionTierTables && regionTierTablesStatus === 'success'
      ? regionTierTables.find((r: IRegionTierTableRead) => r.key === regionKey)
      : null,
    [regionKey, regionTierTables, regionTierTablesStatus],
  );

  // Hide the money columns entirely for any region lacking dollar data.
  const hasRentOutcomes = useMemo(
    () =>
        region && region.tiers
        ? region.tiers.some((row) => row.noAdsMonth != null)
        : false,
    [region],
  );

  //console.log(region);

  const columns = useMemo<GridColDef<IBoostTierRowRead>[]>(() => {
    const money = currencyFmt(region ? region.currency : 'USD');
    const moneyCol = ({
      field,
      header,
      shortHeader,
    }: (typeof MONEY_FIELDS)[number]): GridColDef<IBoostTierRowRead> => ({
      field,
      headerName: isMobile ? shortHeader : header,
      type: 'number',
      flex: 1,
      minWidth: isMobile ? 120 : 150,
      valueFormatter: (value: number | undefined) => {
        if (value == null) return '—';
        return value > 0 && value < 1 ? sciDollars(value) : money.format(value);
      },
    });

    const base: GridColDef<IBoostTierRowRead>[] = [
      {
        field: 'parcelsLabel',
        headerName: isMobile ? 'Parcels' : 'Parcels Owned',
        flex: 1,
        minWidth: isMobile ? 95 : 130,

        // Sort by the numeric lower bound, not the label string.
        sortComparator: (_a, _b, p1, p2) =>
          (p1.api.getRow(p1.id) as IBoostTierRowRead).minParcels -
          (p2.api.getRow(p2.id) as IBoostTierRowRead).minParcels,
      },
      {
        field: 'boost',
        headerName: 'Boost',
        type: 'number',
        flex: 0.8,
        minWidth: isMobile ? 75 : 120,
        renderCell: ({ value }) => (
          <Chip
            label={`${value}x`}
            size="small"
            color={value >= 20 ? 'success' : value >= 10 ? 'primary' : 'default'}
            variant="outlined"
          />
        ),
      },
    ];

    if (!hasRentOutcomes) return base;

    // Mobile: Parcels + Boost + one user-selected money metric.
    // Desktop: all four money columns.
    const moneyFields = isMobile
      ? MONEY_FIELDS.filter((f) => f.field === mobileMetric)
      : MONEY_FIELDS;

    return [...base, ...moneyFields.map(moneyCol)];
}, [region && region.currency, hasRentOutcomes, isMobile, mobileMetric]);

  return (
    <Box sx={{ maxWidth: 1200, mx: 'auto', px: { xs: 2, sm: 3 }, py: 3 }}>
      <Stack spacing={2}>
        <ParcelRarityRatesGrid isMobile={isMobile} />

        <Typography variant="h2" component="h2">
          Tier Jump Tables
        </Typography>

        <Typography variant="subtitle1">
          These are the tables that actually predict your earnings, and they hide three things the raw numbers won't tell you at a glance.
        </Typography>
        <Typography variant="subtitle1">
          <strong>First, many players watch the Boost column run the wrong way.</strong> New players see the <strong>30×</strong> multiplier on their first parcels and assume bigger holdings bring bigger boosts — but it's actually the opposite. The multiplier drops as you grow: for instance, in the US, your boost multiplier goes from <strong>30×</strong> under 150 parcels down to <strong>7×</strong> by the 546–625 tier. Your total rent still climbs, because more parcels more than make up for the smaller multiplier — but if you were counting on that 30× sticking around, consider this your warning. It's a starter bonus, not a permanent rate.
        </Typography>
        <Typography variant="subtitle1">
          <strong>Second — and this is the big one for anyone just starting — look at how flat the "With Ads/mo." column is.</strong> From your very first parcel to more than 500 of them, it barely moves, hovering right around $15.50 the entire way. Meanwhile "No Ads/mo." — your income if you never watch a single ad — climbs from about 63¢ to $2.61. Put those together and the takeaway is blunt: roughly 96% of your income comes from watching ads when you're starting out, and it's still more than 80% even once you're past 500 parcels. Grinding to buy your 200th parcel will change your monthly total far less than simply showing up for your daily ads. Acquisition matters eventually — ad discipline matters first.
        </Typography>
        <Typography variant="subtitle1">
          <strong>Third, notice where parcel count actually pays off: the "Super Rent Boosts/yr." column.</strong> Super rent boosts multiply your parcel rent, so their value scales directly with how much you own. For a small holder they add only about 17% on top of the ads-included yearly total; by the 546–625 tier they add over 70%. That's the real argument for continuing to acquire — not the base rent, but the fact that a larger portfolio makes every super rent boost dramatically more powerful. If you're weighing whether more parcels are worth it, this column is your answer.
        </Typography>

        <Tabs
          value={regionKey}
          onChange={(_e, v: string) => setRegionKey(v)}
          variant="scrollable"
          allowScrollButtonsMobile
          aria-label="Boost tier tables by region"
        >
          {regionTierTablesStatus === 'success' && regionTierTables.map((r) => (
            <Tab key={r.key} value={r.key} label={decode(r.label)} />
          ))}
        </Tabs>

        <Stack
          direction="row"
          spacing={1.5}
          useFlexGap
          sx={{ alignItems: 'center', flexWrap: 'wrap', justifyContent: 'space-between' }}
        >
          <Stack direction="row" spacing={1.5} sx={{ alignItems: 'center' }}>
            <Typography variant="body2" color="text.secondary">
              Applies to:
            </Typography>
            <CountryFlagList countries={region && region.countries || []} />
          </Stack>

          {isMobile && hasRentOutcomes && (
            <TextField
              select
              size="small"
              label="Column"
              value={mobileMetric}
              onChange={(e) => setMobileMetric(e.target.value as MoneyField)}
              sx={{ minWidth: 170 }}
            >
              {MONEY_FIELDS.map((f) => (
                <MenuItem key={f.field} value={f.field}>
                  {f.shortHeader}
                </MenuItem>
              ))}
            </TextField>
          )}
        </Stack>

        <Paper variant="outlined">
          <DataGrid
            rows={region && region.tiers || []}
            columns={columns}
            density="compact"
            disableRowSelectionOnClick
            disableColumnMenu
            hideFooter={region && region.tiers && region.tiers.length <= 25}
            initialState={{
              sorting: { sortModel: [{ field: 'parcelsLabel', sort: 'asc' }] },
            }}
            sx={{ border: 0 }}
          />
        </Paper>

        <Box>
          <Typography variant="caption" color="text.secondary" component="p">
            {'Values are transcribed verbatim from the official Atlas Reality boost ' +
              'rate charts, which assume weighted-average rarity distribution odds, ' +
              'max parcels per bracket, and 20 boosts a day.'}
          </Typography>
        </Box>
      </Stack>
    </Box>
  );
}