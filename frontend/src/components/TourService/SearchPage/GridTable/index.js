import * as React from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Unstable_Grid2';
import CardTour from 'components/TourService/Homepage/TopTour/CardTuor';

const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
}));

export default function GridTable() {

    const item = {
        sale: 10,
        image: 'https://chonoicairang.net/wp-content/uploads/2020/04/dualuoi.jpg',
        name: 'Dưa lưới',
        price: 100000,
        slug: 'dua-luoi',
    }
    return (
        <Box sx={{ flexGrow: 1 }}>
            <Grid container spacing={2} columns={12}>
                {
                    Array.from(new Array(5)).map((items, index) => (
                        <Grid key={index} xs={4} >
                            <CardTour />
                        </Grid>
                    ))
                }
            </Grid>
        </Box>
    );
}
