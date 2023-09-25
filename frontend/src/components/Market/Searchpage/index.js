import MarketplaceLayout from "layouts/CustomerLayout/MarketplaceLayout"
import * as React from 'react';
import Box from '@mui/material/Box';
import SwipeableDrawer from '@mui/material/SwipeableDrawer';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import Divider from '@mui/material/Divider';
import FilterBar from "./FilterBar";
import "./style.scss"
import BtnOrder from "./BtnOrder";
import BasicBreadcrumbs from "./Breadcrumbs";
import MenuIcon from '@mui/icons-material/Menu';
import GridTable from "./Grid";



const Searchpage = () => {
    const [cost, setCost] = React.useState([20000, 37000]);
    const minDistance = 10000;

    const [state, setState] = React.useState({
        top: false,
        left: false,
        bottom: false,
        right: false,
    });

    const toggleDrawer = (anchor, open) => (event) => {
        if (
            event &&
            event.type === 'keydown' &&
            (event.key === 'Tab' || event.key === 'Shift')
        ) {
            return;
        }

        setState({ ...state, [anchor]: open });
    };

    const list = (anchor) => (
        <Box
            sx={{
                width: anchor === 'top' || anchor === 'bottom' ? 'auto' : 270,
                paddingLeft: '10px'
            }}
            role="presentation"
            // onClick={toggleDrawer(anchor, false)}
            onKeyDown={toggleDrawer(anchor, false)}
        >
            <span
                style={{
                    fontSize: '1.5em',
                    fontWeight: '600'
                }}
            >
                BỘ LỌC
            </span>

            <Divider
                style={{
                    color: 'white',
                    opacity: "inherit",
                    backgroundColor: '#7DB249',
                    height: '3px',
                    width: '100%',
                    maxWidth: '30px',
                    marginTop: '0.66em',
                }}
            />
            <span
                style={{
                    fontSize: '1.em',
                    fontWeight: '600'
                }}
            >
                LỌC THEO GIÁ
            </span>
            <FilterBar
                cost={cost}
                setCost={setCost}
                minDistance={minDistance}
            />
            {/* btn filter */}
            <Stack spacing={2} direction="row">
                <Button
                    variant="contained"
                    color="success"
                >LỌC</Button>
                <div
                    style={{
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center'
                    }}
                >
                    Giá:&nbsp;
                    <span>{cost[0]}₫</span>
                    -
                    <span>{cost[1]}₫</span>
                </div>
            </Stack>
        </Box>
    );

    return (
        <MarketplaceLayout>
            <div className="container-searchpage">
                <div className="searchpage">
                    <div className="search-title">
                        <div className="search-title-left">
                            <div className="text-search">
                                <h2>Kết quả tìm kiếm: “táo”</h2>
                            </div>
                            <div className="path-result">
                                <BasicBreadcrumbs />
                            </div>
                            <div className="category-filter">
                                {['Bộ lọc'].map((anchor) => (
                                    <React.Fragment key={anchor}>
                                        <Button onClick={toggleDrawer(anchor, true)}>
                                            <MenuIcon />
                                            {anchor}
                                        </Button>
                                        <SwipeableDrawer
                                            anchor={anchor}
                                            open={state[anchor]}
                                            onClose={toggleDrawer(anchor, false)}
                                            onOpen={toggleDrawer(anchor, true)}
                                        >
                                            {list(anchor)}
                                        </SwipeableDrawer>
                                    </React.Fragment>
                                ))}
                            </div>
                        </div>
                        <div className="search-title-right">
                            <div className="woocommerce-result-count">
                                Hiển thị 1–12 của 13 kết quả
                            </div>

                            <div className="woocommerce-ordering">
                                <BtnOrder />
                            </div>
                        </div>
                    </div>
                    <div className="search-content">
                        <GridTable />
                    </div>
                </div>
            </div>
        </MarketplaceLayout>
    )
}

export default Searchpage