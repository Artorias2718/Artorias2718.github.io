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
      <Typography variant="subtitle2" component="h3">
        Base Rent by Parcel Rarity
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
    () => regionTierTablesStatus === 'success'
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

  const columns = useMemo<GridColDef<IBoostTierRowRead>[]>(() => {
    const money = currencyFmt(region.currency ?? 'USD');
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
        sortComparator: (_a, _b, p1, p2) => (p1.value.id > p2.value.id ? p2.value.id : p1.value.id)
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
  }, [region.currency, hasRentOutcomes, isMobile, mobileMetric]);

  console.log('Region: ', region);
  console.log('Region Tier Tables: ', regionTierTables);

  return (
    <Box sx={{ maxWidth: 1200, mx: 'auto', px: { xs: 2, sm: 3 }, py: 3 }}>
      <Stack spacing={2}>
        <ParcelRarityRatesGrid isMobile={isMobile} />

        <Tabs
          value={regionKey}
          onChange={(_e, v: string) => setRegionKey(v)}
          variant="scrollable"
          allowScrollButtonsMobile
          aria-label="Boost tier tables by region"
        >
          {regionTierTablesStatus === 'success' && regionTierTables.map((r) => (
            <Tab key={r.key} value={r.key} label={r.label} />
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
            <CountryFlagList countries={region.countries || []} />
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
            rows={region.tiers || []}
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