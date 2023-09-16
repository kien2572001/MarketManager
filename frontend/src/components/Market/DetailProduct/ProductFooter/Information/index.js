import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

const createData = (name, calories, fat, carbs, protein) => {
    return { name, calories, fat, carbs, protein };
}


const Information = () => {
    const rows = [
        createData('KHỐI LƯỢNG', "250 – 300 gam/quả"),
        createData('NGUỒN GỐC/ XUẤT XỨ', "Vĩnh Long, Lai Vung"),
        createData('GIÁ BẢN LẺ', "45.000đ/ 1kg"),
        createData('GIÁ BẢN SỈ', "Liên hệ page cho đơn hàng từ 30 kg trở lên"),
        createData('THỜI GIAN THU HOẠCH', "Theo mùa"),
        createData('QUY CÁCH ĐÓNG GÓI', "Thùng giấy"),
        createData('VẬN CHUYỂN', "Toàn quốc"),
        createData('HƯỚNG DẪN SỬ DỤNG', "vắt nước uống hoặc ăn trực tiếp, bảo quản nơi khô ráo, thoáng mát có thể dùng được khoảng 2 tuần."),
        createData('PHƯƠNG PHÁP TRỒNG VÀ CHĂM SÓC', "Hữu cơ"),
    ];


    return (
        <div className='container-informatio'>
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableBody>
                        {rows.map((row) => (
                            <TableRow
                                key={row.name}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                                <TableCell component="th" scope="row">
                                    {row.name}
                                </TableCell>
                                <TableCell align="left">{row.calories}</TableCell>
                                <TableCell align="left">{row.fat}</TableCell>
                                <TableCell align="left">{row.carbs}</TableCell>
                                <TableCell align="left">{row.protein}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    )
}

export default Information