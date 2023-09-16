import * as React from 'react';
import Box from '@mui/material/Box';
import Input from '@mui/material/Input';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import FormControl from '@mui/material/FormControl';
import TextField from '@mui/material/TextField';
import AccountCircle from '@mui/icons-material/AccountCircle';

const Review = () => {
    return (
        <div className='container-review-product'>
            <h2>
                Đánh giá
            </h2>
            <Box sx={{ '& > :not(style)': { m: 1 } }}>
                <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
                    <AccountCircle sx={{ color: 'action.active', mr: 1, my: 0.5 }} />
                    <TextField id="input-with-sx" label="Hãy để lại bình luận" variant="standard" />
                </Box>
            </Box>
        </div>
    )
}

export default Review