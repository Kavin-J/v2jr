
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Avatar from '@mui/material/Avatar';
import Stack from '@mui/material/Stack';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { RoleType } from '../app/features/auth/auth.type';
import React from 'react';
import { useGetUsersQuery } from '../app/services/userApi';

interface User {
    id: string;
    name: string;
    email: string;
    role: RoleType;
    avatar?: string;
}

const columns: GridColDef<User>[] = [
    { field: 'id', headerName: 'ID', width: 90 },
    {
        field: 'name',
        headerName: 'Name',
        width: 200,
        editable: false,
        renderCell: (params) => (
            <Stack direction="row" spacing={2} alignItems="center" sx={{ height: '100%' }}>
                <Avatar src={params.row.avatar} alt={params.row.name} />
                <Typography variant="body2" sx={{ fontWeight: 'bold' }}>{params.row.name}</Typography>
            </Stack>
        ),
    },
    {
        field: 'email',
        headerName: 'Email',
        width: 250,
        editable: false,
    },
    {
        field: 'role',
        headerName: 'Role',
        width: 150,
        editable: false,
    },
];




export default function UsersPage() {
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);

    const { data, isLoading } = useGetUsersQuery()
    console.log(data)
    return (
        <Box sx={{ height: 700, width: '100%', p: 3 }}>
            <Typography variant="h4" gutterBottom>
                Users
            </Typography>
            <DataGrid
                rows={data?.users || []}
                columns={columns}
                loading={isLoading}
                initialState={{
                    pagination: {
                        paginationModel: {
                            pageSize: rowsPerPage,
                        },
                    },
                }}
                pageSizeOptions={[5, 10, 25]}
                checkboxSelection
                disableRowSelectionOnClick

            />
        </Box>
    );
}
