import React from 'react';
import PageContainer from '../components/PageContainer';
import Typography from "@mui/material/Typography";
import SummaryCard from '../components/Dashboard/SummaryCard';
export default function Dashboard() {
    React.useEffect(() => {
        window.document.title = 'Dashboard';
    }, []);
    return (
        <PageContainer>
            <Typography variant="h5" sx={{ mb: 3, fontWeight: 'bold' }}>Dashboard Overview</Typography>
            <SummaryCard />
        </PageContainer>
    );
}