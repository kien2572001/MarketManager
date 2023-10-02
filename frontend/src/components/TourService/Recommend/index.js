import TitleSection from '../TitleSection'
import './style.scss'
import * as React from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import CardRecommend from './CardRecommend';


const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
}));

const Recommend = () => {

    const [listRecommend, setListRecommend] = React.useState([
        {
            id: 1,
            adress: 'Cần Thơ',
            liked: 501,
            img: 'https://innoviet.com/upload/2018/04/can-tho-1512635131.jpg'
        },
        {
            id: 2,
            adress: 'Côn Đảo',
            liked: 301,
            img: 'https://s3.nucuoimekong.com/ncmk/wp-content/uploads/dinh-tinh-yeu-o-con-dao.jpg'
        },
        {
            id: 3,
            adress: 'Phú Quốc',
            liked: 401,
            img: 'https://s3.nucuoimekong.com/ncmk/wp-content/uploads/phu-quoc.jpg'
        },
        {
            id: 4,
            adress: 'Miền Tây',
            liked: 601,
            img: 'https://s3.nucuoimekong.com/ncmk/wp-content/uploads/mua-nuoc-noi.jpg'
        },
    ])

    return (
        <div className="container-recommend">
            <div className='title-recommend'>
                <TitleSection title={'ĐỊA ĐIỂM HẤP DẪN'} />
            </div>
            <div className="grid-recommend">
                <Box sx={{ flexGrow: 1 }}>
                    <Grid container spacing={2}>
                        {
                            listRecommend.map((item, index) => {
                                console.log(index)
                                return (
                                    <Grid item xs >
                                        <Item className='auiui '>
                                            <CardRecommend itemRecommend={listRecommend[index]} />
                                        </Item>
                                    </Grid>
                                )
                            })
                        }
                    </Grid>
                </Box>
            </div>
        </div>
    )
}

export default Recommend