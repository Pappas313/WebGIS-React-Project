import { Box, Paper, Typography } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import PropTypes from 'prop-types';

const Dashboard = ({ data = [] }) => {
    const columns = [
        { field: 'CITY', headerName: 'City', flex: 1, minWidth: 140 },
        { field: 'CITY_GREEK', headerName: 'Greek Name', flex: 1, minWidth: 140 },
        { field: 'REGION', headerName: 'Region', flex: 1.5, minWidth: 190 },
        { field: 'LATITUDE', headerName: 'Latitude', flex: 1, minWidth: 110 },
        { field: 'LONGITUDE', headerName: 'Longitude', flex: 1, minWidth: 110 },
    ];

    const rows = data.map((city) => ({ ...city, id: city.id }));
    const citiesByRegion = Object.values(
        data.reduce((regions, city) => {
            regions[city.REGION] ??= { region: city.REGION, cities: 0 };
            regions[city.REGION].cities += 1;
            return regions;
        }, {})
    );

    return (
        <Box sx={{ padding: 2, overflow: 'auto', height: '100%' }}>
            <Typography variant="h5" gutterBottom>
                Greek Cities Dashboard
            </Typography>
            <Typography variant="body1" sx={{ mb: 2 }}>
                {data.length} cities across {citiesByRegion.length} regions
            </Typography>

            <Paper sx={{ height: 400, width: '100%', mb: 4 }}>
                <DataGrid
                    rows={rows}
                    columns={columns}
                    initialState={{ pagination: { paginationModel: { pageSize: 10 } } }}
                    pageSizeOptions={[5, 10, 25]}
                />
            </Paper>

            <Typography variant="h6" gutterBottom>
                Cities by Region
            </Typography>
            <ResponsiveContainer width="100%" height={300}>
                <BarChart data={citiesByRegion}>
                    <XAxis dataKey="region" angle={-25} textAnchor="end" height={80} />
                    <YAxis allowDecimals={false} />
                    <Tooltip />
                    <Bar dataKey="cities" fill="#1976d2" />
                </BarChart>
            </ResponsiveContainer>
        </Box>
    );
};

Dashboard.propTypes = {
    data: PropTypes.arrayOf(PropTypes.shape({
        id: PropTypes.number.isRequired,
        CITY: PropTypes.string.isRequired,
        CITY_GREEK: PropTypes.string.isRequired,
        REGION: PropTypes.string.isRequired,
        LATITUDE: PropTypes.number.isRequired,
        LONGITUDE: PropTypes.number.isRequired,
    })),
};

export default Dashboard;
