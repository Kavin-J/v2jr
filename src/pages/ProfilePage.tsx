import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { useAppSelector } from '../app/hook';
import { selectAuthUser } from '../app/features/auth/auth.selectors';
import Avatar from '@mui/material/Avatar';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';

const ProfilePage = () => {
    const user = useAppSelector(selectAuthUser);

    return (
        <Box sx={{ p: 3 }}>
            <Typography variant="h4" gutterBottom>
                User Profile
            </Typography>
            <Card sx={{ maxWidth: 400 }}>
                <CardContent sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2 }}>
                    <Avatar
                        alt={user?.name}
                        src={user?.avatar}
                        sx={{ width: 100, height: 100 }}
                    />
                    <Typography variant="h5" component="div">
                        {user?.name}
                    </Typography>
                    <Typography color="text.secondary">
                        {user?.email}
                    </Typography>
                    <Typography variant="body2" color="text.secondary" sx={{ textTransform: 'capitalize' }}>
                        Role: {user?.role}
                    </Typography>
                </CardContent>
            </Card>
        </Box>
    );
};//

export default ProfilePage;
