import React from 'react';
import { Card, CardContent, Typography, Box, Grid, alpha, useTheme } from '@mui/material';
import PeopleIcon from '@mui/icons-material/People';
import InventoryIcon from '@mui/icons-material/Inventory';
import AssignmentIcon from '@mui/icons-material/Assignment';

interface StatCardProps {
    title: string;
    count: number;
    icon: React.ReactNode;
    color: string;
}

const StatCard: React.FC<StatCardProps> = ({ title, count, icon, color }) => {
    // const theme = useTheme();

    return (
        <Card
            elevation={0}
            sx={{
                height: '100%',
                bgcolor: alpha(color, 0.1),
                border: '1px solid',
                borderColor: alpha(color, 0.2),
                borderRadius: 4,
                position: 'relative',
                overflow: 'hidden',
                transition: 'transform 0.2s, box-shadow 0.2s',
                '&:hover': {
                    transform: 'translateY(-4px)',
                    boxShadow: `0 4px 20px 0 ${alpha(color, 0.2)}`,
                }
            }}
        >
            <CardContent sx={{ p: 3, display: 'flex', flexDirection: 'column', height: '100%', justifyContent: 'space-between' }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 2 }}>
                    <Box
                        sx={{
                            p: 1.5,
                            borderRadius: 3,
                            bgcolor: color,
                            color: 'white',
                            display: 'flex',
                            boxShadow: `0 4px 12px 0 ${alpha(color, 0.4)}`,
                        }}
                    >
                        {icon}
                    </Box>
                </Box>

                <Box>
                    <Typography variant="h6" component="div" sx={theme => ({ fontWeight: 'bold', mb: 0.5, color: (theme.vars || theme).palette.text.primary })}>
                        {count.toLocaleString()}
                    </Typography>
                    <Typography variant="body2" sx={theme => ({ color: (theme.vars || theme).palette.text.primary, fontWeight: 500 })}>
                        {title}
                    </Typography>
                </Box>

                {/* Decorative circle background */}
                <Box
                    sx={{
                        position: 'absolute',
                        top: -20,
                        right: -20,
                        width: 100,
                        height: 100,
                        borderRadius: '50%',
                        bgcolor: color,
                        opacity: 0.05,
                        pointerEvents: 'none',
                    }}
                />
            </CardContent>
        </Card>
    );
};

export default function SummaryCard() {
    const theme = useTheme();
    const stats = [
        {
            title: 'Active Users',
            count: 1250,
            icon: <PeopleIcon fontSize="medium" />,
            color: theme.palette.primary.main, // Primary Blue
        },
        {
            title: 'Total Products',
            count: 856,
            icon: <InventoryIcon fontSize="medium" />,
            color: theme.palette.success.main,
        },
        {
            title: 'Pending Requisitions',
            count: 42,
            icon: <AssignmentIcon fontSize="medium" />,
            color: theme.palette.error.main,
        },
    ];

    return (
        <Box sx={{ flexGrow: 1, mb: 3 }}>
            <Grid container spacing={3} sx={(theme) => ({
                backgroundColor: (theme.vars || theme).palette.background.paper,
                borderRadius: 1,
                p: 2,
            })}>
                {stats.map((stat, index) => (
                    <Grid size={{ xs: 12, sm: 6, md: 4 }} key={index}>
                        <StatCard {...stat} />
                    </Grid>
                ))}
            </Grid>
        </Box >
    );
}
