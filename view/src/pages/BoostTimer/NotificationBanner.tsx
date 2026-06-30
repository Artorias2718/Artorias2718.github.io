import type {NotifPermission} from '@/pages/BoostTimer/Types.ts';
import {alpha, Box, Button, Card, CardContent, Typography} from '@mui/material';
import {Bell, BellOff} from 'lucide-react';

const NotificationBanner = ({
                                permission,
                                onRequest,
                            }: {
    permission: NotifPermission;
    onRequest: () => void;
}) => {
    const granted = permission === 'granted';
    const denied = permission === 'denied';

    const borderColor = granted
        ? 'primary.main'
        : denied
            ? 'error.main'
            : 'divider';

    const bgColor = granted
        ? (theme: any) => alpha(theme.palette.primary.main, 0.05)
        : denied
            ? (theme: any) => alpha(theme.palette.error.main, 0.05)
            : 'background.paper';

    const iconBg = granted
        ? (theme: any) => alpha(theme.palette.primary.main, 0.1)
        : denied
            ? (theme: any) => alpha(theme.palette.error.main, 0.1)
            : 'action.hover';

    const iconColor = granted ? 'primary.main' : denied ? 'error.main' : 'text.secondary';

    return (
        <Card
            variant='outlined'
            sx={{
                borderColor,
                bgcolor: bgColor,
            }}
        >
            <CardContent
                sx={{ p: 2.5, display: 'flex', gap: 2, alignItems: 'flex-start', '&:last-child': { pb: 2.5 } }}
            >
                <Box
                    sx={{
                        flexShrink: 0,
                        p: 1.25,
                        borderRadius: 2.5,
                        bgcolor: iconBg,
                        color: iconColor,
                        display: 'flex',
                    }}
                >
                    {granted ? <Bell size={20} /> : <BellOff size={20} />}
                </Box>

                <Box sx={{ flex: 1, minWidth: 0 }}>
                    {granted && (
                        <>
                            <Typography variant='body2' sx={{ fontWeight: 700, color: 'primary.main', mb: 0.25 }}>
                                Notifications on
                            </Typography>
                            <Typography variant='caption' color='text.secondary'>
                                Both timers will send you an alert linking to Atlas Earth when they expire.
                            </Typography>
                        </>
                    )}
                    {denied && (
                        <>
                            <Typography variant='body2' sx={{ fontWeight: 700, color: 'error.main', mb: 0.25 }}>
                                Notifications blocked
                            </Typography>
                            <Typography variant='caption' color='text.secondary'>
                                Open your browser's site settings and allow notifications to re-enable alerts.
                            </Typography>
                        </>
                    )}
                    {permission === 'default' && (
                        <>
                            <Typography variant='body2' sx={{ fontWeight: 700, mb: 0.25 }}>
                                Enable notifications for both timers
                            </Typography>
                            <Typography variant='caption' sx={{ color: 'text.secondary', display: 'block', mb: 1.5 }}>
                                Get push alerts that open Atlas Earth when your boost or daily reward expires
                                — even with this tab in the background.
                            </Typography>
                            <Button
                                size='small'
                                variant='contained'
                                startIcon={<Bell size={14} />}
                                onClick={onRequest}
                                data-testid='button-enable-notifications'
                            >
                                Enable Notifications
                            </Button>
                        </>
                    )}
                    {permission === 'unsupported' && (
                        <>
                            <Typography variant='body2' sx={{ fontWeight: 700, mb: 0.25 }}>
                                Notifications not supported
                            </Typography>
                            <Typography variant='caption' color='text.secondary'>
                                Your browser does not support web notifications. Both timers will still count
                                down while this tab is open.
                            </Typography>
                        </>
                    )}
                </Box>
            </CardContent>
        </Card>
    );
}

export default NotificationBanner;