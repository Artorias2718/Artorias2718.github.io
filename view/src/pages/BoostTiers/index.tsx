import { useMemo, useState } from 'react';
import Box from '@mui/material/Box';
import Chip from '@mui/material/Chip';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import Tab from '@mui/material/Tab';
import Tabs from '@mui/material/Tabs';
import Typography from '@mui/material/Typography';
import { DataGrid, type GridColDef } from '@mui/x-data-grid';
import { REGION_TIER_TABLES, type BoostTierRow } from './Constants';

const currencyFmt = (currency: string) =>
  new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency,
    minimumFractionDigits: 2,
    maximumFractionDigits: 4,
  });

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
      valueFormatter: (value: number | undefined) =>
        value != null ? money.format(value) : '—',
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

      {region.countries && (
        <Typography variant="body2" color="text.secondary">
          Applies to: {region.countries}
        </Typography>
      )}

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
          {hasRentOutcomes
            ? 'Values reflect the official Rent Boost Outcomes chart and assume a ' +
              'weighted-average rarity distribution, ~20 boosted hours/day for the ' +
              '"With Ads" columns, and two 32-hour 50x Super Rent Boost events per ' +
              'month (64 SRB hrs/mo.) for the Event Bonus column.'
            : 'Parcel ranges and boost multipliers for this region are community-verified. ' +
              'Official rent-outcome dollar figures are not published in text form for ' +
              'this chart.'}
        </Typography>
      </Box>
    </Stack>
  );
}