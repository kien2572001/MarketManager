import "./style.scss"
import * as React from 'react';

import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import Collapse from '@mui/material/Collapse';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import MenuImg from "./MenuImg";


const MenuProduct = () => {
    const [open1, setOpen1] = React.useState(false);
    const [open2, setOpen2] = React.useState(false);
    const [open3, setOpen3] = React.useState(false);
    const [open4, setOpen4] = React.useState(false);

    const [NSS, setNSS] = React.useState(['Sầu Riêng', 'Cam', 'Dưa lưới', 'Măng cụt', 'Xoài', 'Bưởi', 'Dừa', 'Gạo']);
    const [NSCB, setNSCB] = React.useState(['Socola', 'Đường Thốt Nốt', 'Mật Hoa Dừa', 'Tinh Dầu', 'Trái Cây Sấy', 'Bánh Pía'])
    const [TCMN, setTCMN] = React.useState(['Giỏ Xách', 'Đồ Handmade', 'Thảm Trang Trí', 'Sợi', 'Lụa Lãnh Mỹ A']);
    const [MHKhac, setMHKhac] = React.useState(['Lá Chuối Tươi', 'Phân Hữu Cơ', 'Ống Hút Hữu Cơ', 'Thủy Sản']);

    const handleClick = (tmp) => {
        switch (tmp) {
            case 'open1':
                setOpen1(!open1);
                setOpen2(false);
                setOpen3(false);
                setOpen4(false);
                break;
            case 'open2':
                setOpen2(!open2);
                setOpen1(false);
                setOpen3(false);
                setOpen4(false);
                break;
            case 'open3':
                setOpen3(!open3);
                setOpen1(false);
                setOpen2(false);
                setOpen4(false);
                break;
            case 'open4':
                setOpen4(!open4);
                setOpen1(false);
                setOpen2(false);
                setOpen3(false);
                break;
            default:
                break;
        }
    };


    return (
        <div className="menu-product-container">
            <div className="menu-product">
                <div className="menu-list">
                    <List
                        sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}
                        component="nav"
                        aria-labelledby="nested-list-subheader"
                    >
                        <ListItemButton onClick={() => handleClick('open1')}>
                            <ListItemText primary="NÔNG SẢN SẠCH" className="title-product" />
                            {open1 ? <ExpandLess /> : <ExpandMore />}
                        </ListItemButton>
                        <Collapse in={open1} timeout="auto" unmountOnExit>
                            <List component="div" disablePadding>
                                {
                                    NSS.map((item, index) => {
                                        return (
                                            <ListItemButton sx={{ pl: 4 }} key={index} >
                                                <ListItemText primary={item} className="name-product" />
                                            </ListItemButton>
                                        )
                                    })
                                }
                            </List>
                        </Collapse>
                        <ListItemButton onClick={() => handleClick('open2')}>
                            <ListItemText primary="NÔNG SẢN CHẾ BIẾN" className="title-product" />
                            {open2 ? <ExpandLess /> : <ExpandMore />}
                        </ListItemButton>
                        <Collapse in={open2} timeout="auto" unmountOnExit>
                            <List component="div" disablePadding>
                                {
                                    NSCB.map((item, index) => {
                                        return (
                                            <ListItemButton sx={{ pl: 4 }} key={index}>
                                                <ListItemText primary={item} className="name-product" />
                                            </ListItemButton>
                                        )
                                    })
                                }
                            </List>
                        </Collapse>
                        <ListItemButton onClick={() => handleClick('open3')}>
                            <ListItemText primary="THỦ CÔNG MỸ NGHỆ" className="title-product" />
                            {open3 ? <ExpandLess /> : <ExpandMore />}
                        </ListItemButton>
                        <Collapse in={open3} timeout="auto" unmountOnExit>
                            <List component="div" disablePadding>
                                {
                                    TCMN.map((item, index) => {
                                        return (
                                            <ListItemButton sx={{ pl: 4 }} key={index}>
                                                <ListItemText primary={item} className="name-product" />
                                            </ListItemButton>
                                        )
                                    })
                                }
                            </List>
                        </Collapse>
                        <ListItemButton onClick={() => handleClick('open4')}>
                            <ListItemText primary="MẶT HÀNG KHÁC" className="title-product" />
                            {open4 ? <ExpandLess /> : <ExpandMore />}
                        </ListItemButton>
                        <Collapse in={open4} timeout="auto" unmountOnExit>
                            <List component="div" disablePadding>
                                {
                                    MHKhac.map((item, index) => {
                                        return (
                                            <ListItemButton sx={{ pl: 4 }} key={index}>
                                                <ListItemText primary={item} className="name-product" />
                                            </ListItemButton>
                                        )
                                    })
                                }
                            </List>
                        </Collapse>
                        <ListItemButton>
                            <ListItemText primary="CHỢ NỔI CÁI RĂNG ONLINE" className="title-product" />
                        </ListItemButton>

                    </List>

                </div>
                <div className="menu-img">
                    <MenuImg />
                </div>
            </div>
        </div>
    )
}

export default MenuProduct