import React from "react";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import PropTypes from "prop-types";
import Badge from "react-bootstrap/Badge";
import Button from "react-bootstrap/Button";
import moment from "moment";
import { updateOrderStatus } from "api/productOrder";
import DetailModal from "./DetailModal";
import IconButton from "@mui/material/IconButton";
import CheckIcon from "@mui/icons-material/Check";
import CloseIcon from "@mui/icons-material/Close";
import Tooltip from "@mui/material/Tooltip";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
    fontSize: 18,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 16,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

export default function OrdersTable({ orders, updateData }) {
  const handleChaneStatus = async (orderId, status) => {
    try {
      const response = await updateOrderStatus(orderId, status);
      if (response?.status === 200) {
        updateData(response.data.data);
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 700 }} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell>
              <span className="font-bold">Thời gian đặt hàng</span>
            </StyledTableCell>
            <StyledTableCell>
              <span className="font-bold">Tên khách hàng</span>
            </StyledTableCell>
            <StyledTableCell align="center">
              <span className="font-bold">Điện thoại</span>
            </StyledTableCell>
            <StyledTableCell align="center">
              <span className="font-bold">Địa chỉ</span>
            </StyledTableCell>
            <StyledTableCell align="center">
              <span className="font-bold">Tổng hóa đơn</span>
            </StyledTableCell>
            <StyledTableCell align="center">
              <span className="font-bold">Trạng thái</span>
            </StyledTableCell>
            <StyledTableCell align="center">
              <span className="font-bold">Chi tiết</span>
            </StyledTableCell>
            <StyledTableCell align="center">
              <span className="font-bold">Thao tác</span>
            </StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {orders.map((order, index) => (
            <StyledTableRow key={index}>
              <StyledTableCell align="center">
                {moment(order.createdAt).format("DD/MM/YYYY HH:mm")}
              </StyledTableCell>
              <StyledTableCell component="th" scope="row">
                <span className="font-semibold">
                  {order.customer.firstName} {order.customer.lastName}
                </span>
              </StyledTableCell>
              <StyledTableCell align="center">
                {order.customer.phone}
              </StyledTableCell>
              <StyledTableCell align="center">
                {order.customer.address}
              </StyledTableCell>
              <StyledTableCell align="center">{order.total}</StyledTableCell>
              <StyledTableCell align="center">
                {order.status === "pending" ? (
                  <Badge pill bg="warning">
                    Chờ xác nhận
                  </Badge>
                ) : order.status === "accepted" ? (
                  <Badge pill bg="success">
                    Đã xác nhận
                  </Badge>
                ) : (
                  <Badge pill bg="danger">
                    Đã hủy
                  </Badge>
                )}
              </StyledTableCell>
              <StyledTableCell align="center">
                <DetailModal order={order} />
              </StyledTableCell>
              <StyledTableCell align="center">
                {order.status === "pending" && (
                  <div className="flex">
                    <Tooltip title="Xác nhận">
                      <IconButton
                        onClick={() => handleChaneStatus(order._id, "accepted")}
                        color="success"
                      >
                        <CheckIcon />
                      </IconButton>
                    </Tooltip>
                    <Tooltip title="Hủy">
                      <IconButton
                        onClick={() =>
                          handleChaneStatus(order._id, "cancelled")
                        }
                        color="error"
                      >
                        <CloseIcon />
                      </IconButton>
                    </Tooltip>
                  </div>
                )}
              </StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
