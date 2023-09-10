import "./style.scss"
import * as React from 'react';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import SliderProduct from "./SliderProduct";

function CustomTabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box sx={{ p: 4 }}>
                    <Typography>{children}</Typography>
                </Box>
            )}
        </div>
    );
}

CustomTabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.number.isRequired,
    value: PropTypes.number.isRequired,
};

function a11yProps(index) {
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`,
    };
}


const ListProduct = () => {

    const [value, setValue] = React.useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    const [NSS, setNSS] = React.useState([
        {
            id: 1,
            name: "Xoài Cát Hòa Lộc | Vị Ngon Khó Cưỡng",
            price: "50.000",
            sale: "39.000",
            img: "https://chonoicairang.net/wp-content/uploads/2020/04/xoaicathoaloc.jpg"
        }
        , {
            id: 2,
            name: "Sầu Riêng Ri 6",
            price: "100.000",
            sale: "80.000",
            img: "https://chonoicairang.net/wp-content/uploads/2020/04/framesaurieng.jpg"
        }
        , {
            id: 3,
            name: "Măng Cụt Vĩnh Long",
            price: "100.000",
            sale: "80.000",
            img: "https://chonoicairang.net/wp-content/uploads/2020/04/mang-cut.jpg"
        }
        , {
            id: 4,
            name: "Gạo ST25 Ngon Nhất Thế Giới Năm 2019",
            price: "40.000",
            sale: "33.000",
            img: "https://chonoicairang.net/wp-content/uploads/2020/06/7404A066-B8F5-4A3A-B31F-6A1B72A45AF0-768x573.jpeg"
        }
        , {
            id: 5,
            name: "Gạo Hữu Cơ - Hạt Ngọc Rồng",
            price: "150.000",
            sale: "140.000",
            img: "https://chonoicairang.net/wp-content/uploads/2020/04/gaohuuco.jpg"
        }
        , {
            id: 6,
            name: "Dưa Lưới Nhật Hữu Cơ",
            price: "40.000",
            sale: "33.000",
            img: "https://chonoicairang.net/wp-content/uploads/2020/04/dualuoi.jpg"
        }
        , {
            id: 7,
            name: "Cam Xoàn - Vua Các Loại Cam",
            price: "55.000",
            sale: "45.000",
            img: "https://chonoicairang.net/wp-content/uploads/2020/04/cam-xoan-1.jpg"
        }
        , {
            id: 8,
            name: "Bưởi Da Xanh Loại 1",
            price: "55.000",
            sale: "45.000",
            img: "https://chonoicairang.net/wp-content/uploads/2020/04/buoidaxanh.jpg"
        }
    ])

    const [NSCB, setNSCB] = React.useState([
        {
            id: 1,
            name: "Bánh Pía Can Xại Đặc Sản Sóc Trăng",
            price: "75.000",
            sale: "65.000",
            img: "https://chonoicairang.net/wp-content/uploads/2020/04/banh-pia-can-xai-soc-trang-2-768x576.jpg"
        },
        {
            id: 2,
            name: "Trái Cây Sấy Goco Fruit",
            price: "50.000",
            sale: "39.000",
            img: "https://chonoicairang.net/wp-content/uploads/2020/04/traicaysay.jpg"
        },
        {
            id: 3,
            name: "Muối Tôm Như Ý - Mặn Mòi Vị Muối Tây Ninh",
            price: "20.000",
            sale: "17.000",
            img: "https://chonoicairang.net/wp-content/uploads/2020/04/muoi-ot-tom-nhu-y-cho-noi-cai-rang-768x1024.jpg"
        },
        {
            id: 4,
            name: "Mật Hoa Dừa Đặc Sản Trà Vinh",
            price: "150.000",
            sale: "145.000",
            img: "https://chonoicairang.net/wp-content/uploads/2020/04/mathoadua.jpg"
        },
        {
            id: 5,
            name: "Bánh Pía Tân Hưng",
            price: "75.000",
            sale: "65.000",
            img: "https://chonoicairang.net/wp-content/uploads/2020/05/banh-pia-tan-hung-3-1024x1536.jpg"
        },

    ])

    const [TCMN, setTCMN] = React.useState([
        {
            id: 1,
            name: "Lãnh Mỹ A",
            price: "50.000",
            sale: "39.000",
            img: "https://chonoicairang.net/wp-content/uploads/2020/04/lua-lanh-my-a.jpg"
        },
        {
            id: 2,
            name: "Dây Chuối Khô Miền Tây",
            price: "25.000",
            sale: "18.000",
            img: "https://chonoicairang.net/wp-content/uploads/2021/06/cong-chuoi-.jpeg"
        }
    ])

    const [MHK, setMHK] = React.useState([
        {
            id: 1,
            name: "Lá Chuối Tươi",
            price: "50.000",
            sale: "39.000",
            img: "https://chonoicairang.net/wp-content/uploads/2020/04/lachuoi.jpg"
        },
        {
            id: 2,
            name: "Cá Thác Lác Rút Xương Hậu Giang",
            price: "200.000",
            sale: "170.000",
            img: "https://chonoicairang.net/wp-content/uploads/2020/04/ca-thac-lac.jpg"
        },
        {
            id: 3,
            name: "Quả Bần Nam Bộ",
            price: "60.000",
            sale: "50.000",
            img: "https://chonoicairang.net/wp-content/uploads/2020/05/trai-ban-3-768x512.jpeg"
        },
        {
            id: 4,
            name: "Phân Hữu Cơ Lục Bình",
            price: "30.000",
            sale: "25.000",
            img: "https://chonoicairang.net/wp-content/uploads/2020/04/mua-phan-huu-co-sinh-hoc-can-tho.jpg"
        },
        {
            id: 5,
            name: "Ống Hút Cỏ Bàng",
            price: "50.000",
            sale: "39.000",
            img: "https://chonoicairang.net/wp-content/uploads/2020/04/onghut.jpg"
        },
        {
            id: 6,
            name: "Nước Mắm Cá Cơm Phú Quốc",
            price: "100.000",
            sale: "90.000",
            img: "https://chonoicairang.net/wp-content/uploads/2020/04/nuocmam-800x800.png"
        },


    ])

    return (
        <div className="container-listproduct">
            <div className="listproduct">
                <div className="listproduct__blank"></div>
                <div className="listproduct__title">
                    <b></b>
                    <div className="listproduct__title--text">
                        <h2>CÁC SẢN PHẨM</h2>
                    </div>
                    <b></b>
                </div>
                <div className="listproduct__content">
                    <Box sx={{ width: '100%' }}>
                        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                            <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
                                <Tab label="NÔNG SẢN SẠCH" {...a11yProps(0)}
                                    sx={{ backgroundColor: value === 0 ? '#7DB249' : '', transition: "0.8s", color: value === 0 ? '#FFFFFF !important' : '', fontSize: "17px", fontWeight: "600" }} />
                                <Tab label="NÔNG SẢN CHẾ BIẾN" {...a11yProps(1)}
                                    sx={{ backgroundColor: value === 1 ? '#7DB249' : '', transition: "0.8s", color: value === 1 ? '#FFFFFF !important' : '', fontSize: "17px", fontWeight: "600" }} />
                                <Tab label="THỦ CÔNG MỸ NGHỆ" {...a11yProps(2)}
                                    sx={{ backgroundColor: value === 2 ? '#7DB249' : '', transition: "0.8s", color: value === 2 ? '#FFFFFF !important' : '', fontSize: "17px", fontWeight: "600" }} />
                                <Tab label="MẶT HÀNG KHÁC" {...a11yProps(3)}
                                    sx={{ backgroundColor: value === 3 ? '#7DB249' : '', transition: "0.8s", color: value === 3 ? '#FFFFFF !important' : '', fontSize: "17px", fontWeight: "600" }} />
                            </Tabs>
                        </Box>
                        <CustomTabPanel value={value} index={0}>
                            <SliderProduct item={NSS} />
                        </CustomTabPanel>
                        <CustomTabPanel value={value} index={1}>
                            <SliderProduct item={NSCB} />
                        </CustomTabPanel>
                        <CustomTabPanel value={value} index={2}>
                            <SliderProduct item={TCMN} />
                        </CustomTabPanel>
                        <CustomTabPanel value={value} index={3}>
                            <SliderProduct item={MHK} />
                        </CustomTabPanel>
                    </Box>
                </div>
            </div>
        </div>
    )
}

export default ListProduct