import React from 'react';
import { AppBar, Toolbar, Typography } from '@mui/material' 

const TopBar = () => {
    return ( 
        <>
            <AppBar possition="relative">
                <Toolbar>
                    <Typography variant='h4'>
                        LastFM Stats
                    </Typography>
                </Toolbar>
            </AppBar>
        </>
     );
}
 
export default TopBar;