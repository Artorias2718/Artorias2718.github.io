import { useMemo, useState } from 'react';
import Box from '@mui/material/Box';
import Chip from '@mui/material/Chip';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import Tab from '@mui/material/Tab';
import Tabs from '@mui/material/Tabs';
import Tooltip from '@mui/material/Tooltip';
import Typography from '@mui/material/Typography';
import * as Flags from 'country-flag-icons/react/3x2';
import { DataGrid, type GridColDef } from '@mui/x-data-grid';
import {
  REGION_TIER_TABLES,
  type BoostTierRow,
  type RegionCountry,
} from './RentBoostTiers';

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
  const [mantissaRaw, exponent] = value.toExponential(3).split('e');
  const mantissa = parseFloat(mantissaRaw); // strips trailing zeros
  const sup = exponent
    .replace('+', '')
    .split('')
    .map((ch) => SUPERSCRIPTS[ch] ?? ch)
    .join('');
  return `$${mantissa} \u00D7 10${sup}`;
}

type FlagComponent = (typeof Flags)['US'];

function CountryFlagList({ countries }: { countries: RegionCountry[] }) {
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

export default function BoostTiers() {
  const [regionKey, setRegionKey] = useState(REGION_TIER_TABLES[0].key);

  const region = useMemo(
    () => REGION_TIER_TABLES.find((r) => r.key === regionKey) ?? REGION_TIER_TABLES[0],
    [regionKey],
  );

  // Official rent-outcome dollar figures are only published for some regions
  // (currently the US). Hide the money columns when a region has none.
  const hasRentOutcomes = useMemo(
    () => region.rows.some((row) => row.noAdsMonth != null),
    [region],
  );

  const columns = useMemo<GridColDef<BoostTierRow>[]>(() => {
    const money = currencyFmt(region.currency);
    const moneyCol = (
      field: keyof BoostTierRow,
      headerName: string,
    ): GridColDef<BoostTierRow> => ({
      field,
      headerName,
      type: 'number',
      flex: 1,
      minWidth: 150,
      valueFormatter: (value: number | undefined) => {
        if (value == null) return '—';
        return value > 0 && value < 1 ? sciDollars(value) : money.format(value);
      },
    });

    const base: GridColDef<BoostTierRow>[] = [
      {
        field: 'parcelsLabel',
        headerName: 'Parcels Owned',
        flex: 1,
        minWidth: 130,
        // Sort by the numeric lower bound, not the label string.
        sortComparator: (_a, _b, p1, p2) =>
          (p1.api.getRow(p1.id) as BoostTierRow).minParcels -
          (p2.api.getRow(p2.id) as BoostTierRow).minParcels,
      },
      {
        field: 'boost',
        headerName: 'Boost Available',
        type: 'number',
        flex: 0.8,
        minWidth: 120,
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

    return [
      ...base,
      moneyCol('noAdsMonth', 'Rent Accrued (No Ads)/mo.'),
      moneyCol('withAdsMonth', 'Rent Accrued (With Ads)/mo.'),
      moneyCol('withAdsYear', 'Rent Accrued (With Ads)/yr.'),
      moneyCol('srbYear', 'Rent Accrued (With Event Bonus SRB)/yr.'),
    ];
  }, [region.currency, hasRentOutcomes]);

  return (
    <Stack spacing={2}>
      <Tabs
        value={regionKey}
        onChange={(_e, v: string) => setRegionKey(v)}
        variant="scrollable"
        allowScrollButtonsMobile
        aria-label="Boost tier tables by region"
      >
        {REGION_TIER_TABLES.map((r) => (
          <Tab key={r.key} value={r.key} label={r.label} />
        ))}
      </Tabs>

      <Stack direction="row" spacing={1.5} sx={{ alignItems: 'center' }}>
        <Typography variant="body2" color="text.secondary">
          Applies to:
        </Typography>
        <CountryFlagList countries={region.countries} />
      </Stack>

      <Paper variant="outlined">
        <DataGrid
          rows={region.rows}
          columns={columns}
          density="compact"
          disableRowSelectionOnClick
          disableColumnMenu
          hideFooter={region.rows.length <= 25}
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
  );
}