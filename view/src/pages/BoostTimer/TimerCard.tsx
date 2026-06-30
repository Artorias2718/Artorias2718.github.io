import {alpha, Box, Button, Paper, Stack, Typography, useTheme} from '@mui/material';
import type { NotifPermission } from '@/pages/BoostTimer/Types.ts';
import { useCountdownTimer } from '@/pages/BoostTimer/hooks/useCountdownTimer.ts';
import { formatTime, sendNotification } from '@/pages/BoostTimer/Utils.ts';
import {CIRCUMFERENCE, RADIUS } from '@/pages/BoostTimer/Constants.ts';
import { Play, RotateCcw } from 'lucide-react';
import { Pause } from "@mui/icons-material";

interface props {
  label: string;
  sublabel: string;
  icon: React.ElementType;
  accentColor: string;
  storageKey: string;
  duration: number;
  notifPermission: NotifPermission;
  notifTitle: string;
  notifBody: string;
  notifTag: string;
  toastTitle: string;
  toastDescription: string;
  howItWorks: { step: string; title: string; description: string }[];
  testIdPrefix: string;
  onToast: (title: string, description: string) => void;
}

const TimerCard = ({
  label,
  sublabel,
  icon: Icon,
  accentColor,
  storageKey,
  duration,
  notifPermission,
  notifTitle,
  notifBody,
  notifTag,
  toastTitle,
  toastDescription,
  howItWorks,
  testIdPrefix,
  onToast,
}: props) => {
  const theme = useTheme();
  const { state, remaining, start, pause, reset, onExpire } = useCountdownTimer(
    storageKey,
    duration
  );

  onExpire.current = () => {
    if (notifPermission === 'granted')
      sendNotification(notifTitle, notifBody, notifTag);
    onToast(toastTitle, toastDescription);
  };

  const progress = remaining / duration;
  const dashOffset = CIRCUMFERENCE * (1 - progress);

  const ringStroke =
    state === 'expired'
      ? theme.palette.error.main
      : remaining <= Math.min(duration * 0.05, 300)
      ? theme.palette.warning.main
      : accentColor;

  const statusLabel = {
    idle: 'Ready',
    running: label + ' active',
    paused: 'Paused',
    expired: 'Collect now!',
  }[state];

  const startLabel =
    state === 'idle' ? 'Start' : state === 'paused' ? 'Resume' : 'Restart';

  return (
    <Paper
      variant='outlined'
      sx={{ borderRadius: 4, overflow: 'hidden', bgcolor: 'background.paper' }}
    >
      {/* Header */}
      <Stack
        sx={{
          direction: 'row',
          alignItems: 'center',
          gap: 1.5,
          px: 3,
          pt: 3,
          pb: 2,
          borderBottom: '1px solid',
          borderColor: 'divider',
        }}
      >
        <Box
          sx={{
            p: 1,
            borderRadius: 2.5,
            bgcolor: alpha(accentColor, 0.12),
            color: accentColor,
            display: 'flex',
          }}
        >
          <Icon size={20} />
        </Box>
        <Box>
          <Typography sx={{ fontWeight: 700, fontSize: '1.05rem', lineHeight: 1.1 }}>
            {label}
          </Typography>
          <Typography variant='caption' sx={{ color: 'text.secondary', display: 'block', mt: 0.25 }}>
            {sublabel}
          </Typography>
        </Box>
      </Stack>

      <Box sx={{ p: 3 }}>
        {/* Ring */}
        <Box sx={{ display: 'flex', justifyContent: 'center', mb: 3 }}>
          <Box
            sx={{ position: 'relative', width: 192, height: 192 }}
            data-testid={`${testIdPrefix}-ring`}
          >
            <Box
              component='svg'
              sx={{ width: '100%', height: '100%', transform: 'rotate(-90deg)' }}
              viewBox='0 0 200 200'
            >
              {/* Track */}
              <circle
                cx='100'
                cy='100'
                r={RADIUS}
                fill='none'
                stroke={theme.palette.divider}
                strokeWidth='10'
              />
              {/* Progress */}
              <circle
                cx='100'
                cy='100'
                r={RADIUS}
                fill='none'
                stroke={ringStroke}
                strokeWidth='10'
                strokeLinecap='round'
                strokeDasharray={CIRCUMFERENCE}
                strokeDashoffset={dashOffset}
                style={{
                  transition: 'stroke-dashoffset 0.8s linear, stroke 0.4s ease',
                }}
              />
            </Box>

            {/* Center label */}
            <Stack
              sx={{ alignItems: 'center', justifyContent: 'center', position: 'absolute', inset: 0 }}
            >
              <Typography
                sx={{ fontFamily: 'monospace', fontWeight: 700, letterSpacing: '-0.02rem', fontSize: duration >= 3600 ? '1.6rem' : '2rem', lineHeight: 1 }}
                data-testid={`${testIdPrefix}-display`}
              >
                {formatTime(remaining)}
              </Typography>
              <Typography
                variant='caption'
                sx={{
                  color: 'text.secondary',
                  textTransform: 'uppercase',
                  letterSpacing: '0.1rem',
                  fontWeight: 600,
                  mt: 0.5
                }}
              >
                {statusLabel}
              </Typography>
            </Stack>
          </Box>
        </Box>

        {/* Controls */}
        <Stack direction='row' sx={{ justifyContent: 'center', gap: 1.5, mb: 3 }}>
          {state === 'running' ? (
            <Button
              variant='outlined'
              size='large'
              onClick={pause}
              startIcon={<Pause sx={{ size: 16 }} />}
              data-testid={`${testIdPrefix}-pause`}
              sx={{ height: 44, px: 3 }}
            >
              Pause
            </Button>
          ) : (
            <Button
              variant='contained'
              size='large'
              onClick={start}
              disabled={remaining === 0}
              startIcon={<Play size={16} />}
              data-testid={`${testIdPrefix}-start`}
              sx={{
                height: 44,
                px: 3,
                ...(state !== 'expired' && {
                  boxShadow: `0 4px 14px ${alpha(accentColor, 0.35)}`,
                  bgcolor: accentColor,
                  '&:hover': { bgcolor: alpha(accentColor, 0.85) },
                }),
              }}
            >
              {startLabel}
            </Button>
          )}
          <Button
            variant='text'
            size='large'
            onClick={reset}
            data-testid={`${testIdPrefix}-reset`}
            sx={{ height: 44, minWidth: 44, px: 1.5, color: 'text.secondary' }}
          >
            <RotateCcw size={18} />
          </Button>
        </Stack>

        {/* How it works */}
        <Stack spacing={1.25}>
          {howItWorks.map((item) => (
            <Stack key={item.step} sx={{ direction: 'row', gap: 1.5, alignItems: 'flex-start' }}>
              <Box
                sx={{
                  flexShrink: 0,
                  width: 20,
                  height: 20,
                  borderRadius: '50%',
                  bgColor: accentColor,
                  color: '#fff',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '0.65rem',
                  fontWeight: 700,
                  mt: 0.25,
                }}
              >
                {item.step}
              </Box>
              <Typography variant='body2' sx={{ lineHeight: 1.6 }}>
                <Box component='span' sx={{ fontWeight: 700, color: 'text.primary' }}>
                  {item.title}
                </Box>{' '}
                <Box component='span' sx={{ color: 'text.secondary' }}>
                  — {item.description}
                </Box>
              </Typography>
            </Stack>
          ))}
        </Stack>
      </Box>
    </Paper>
  );
}

export default TimerCard;