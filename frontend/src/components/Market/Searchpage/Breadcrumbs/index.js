import * as React from 'react';
import Typography from '@mui/material/Typography';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Link from '@mui/material/Link';

function handleClick(event) {
    event.preventDefault();
    console.info('You clicked a breadcrumb.');
}

export default function BasicBreadcrumbs() {
    return (
        <div role="presentation" onClick={handleClick}>
            <Breadcrumbs aria-label="breadcrumb">
                <Link underline="hover" color="inherit" href="/">
                    Trang chủ
                </Link>
                <Link
                    underline="hover"
                    color="inherit"
                    href="/material-ui/getting-started/installation/"
                >
                    Cửa hàng
                </Link>
                <Typography color="text.primary">Kết quả tìm kiếm cho "Táo"</Typography>
            </Breadcrumbs>
        </div>
    );
}