import * as React from "react";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import moment from "moment";
import { v4 as uuidv4 } from "uuid";
import { Badge, Button } from "react-bootstrap";
import DetailModal from "./DetailModal";
import { changeStatus } from "api/tourOrder";
import IconButton from "@mui/material/IconButton";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CancelIcon from "@mui/icons-material/Cancel";
import Tooltip from "@mui/material/Tooltip";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

export default function TourOrdersTable({ tourOrders, setTourOrders }) {
  const handleChangeStatus = async (tourOrderId, status) => {
    try {
      const response = await changeStatus(tourOrderId, status);
      if (response?.code === 200) {
        const newTourOrders = tourOrders.map((tourOrder) => {
          if (tourOrder._id === tourOrderId) {
            return { ...tourOrder, status: status };
          }
          return tourOrder;
        });
        setTourOrders(newTourOrders);
      }

      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 700 }} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell>Thời gian đặt</StyledTableCell>
            <StyledTableCell align="center">Email</StyledTableCell>
            <StyledTableCell align="center">Tên Tour</StyledTableCell>
            <StyledTableCell align="center">Số lượng</StyledTableCell>
            <StyledTableCell align="center">Đơn giá</StyledTableCell>
            <StyledTableCell align="center">Ngày đi</StyledTableCell>
            <StyledTableCell align="center">Tổng tiền</StyledTableCell>
            <StyledTableCell align="center">Trạng thái</StyledTableCell>
            <StyledTableCell align="center">Chi tiết</StyledTableCell>
            <StyledTableCell align="center">Hành động</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {tourOrders.map((row) => (
            <StyledTableRow key={uuidv4()}>
              <StyledTableCell align="center">
                {moment(row?.createdAt).format("DD/MM/YYYY HH:mm:ss")}
              </StyledTableCell>
              <StyledTableCell align="center">
                {row?.userId?.email}
              </StyledTableCell>
              <StyledTableCell align="center">
                {row?.tourId?.name}
              </StyledTableCell>
              <StyledTableCell align="center">{row?.quantity}</StyledTableCell>
              <StyledTableCell align="center">{row?.tourPrice}</StyledTableCell>
              <StyledTableCell align="center">
                {moment(row?.tourId?.tourTime).format("DD/MM/YYYY")}
              </StyledTableCell>
              <StyledTableCell align="center">{row?.total}</StyledTableCell>
              <StyledTableCell align="center">
                {row?.status === "pending" ? (
                  <Badge bg="warning">Chờ xác nhận</Badge>
                ) : row?.status === "accepted" ? (
                  <Badge bg="success">Đã xác nhận</Badge>
                ) : (
                  <Badge bg="danger">Đã hủy</Badge>
                )}
              </StyledTableCell>
              <StyledTableCell align="center">
                <DetailModal tourOrder={row} />
              </StyledTableCell>
              <StyledTableCell align="center">
                {row?.status === "pending" ? (
                  <div className="d-flex justify-content-center">
                    {/* <Button
                      variant="success"
                      onClick={() => handleChangeStatus(row?._id, "accepted")}
                    >
                      Xác nhận
                    </Button> */}
                    {/* <Button
                      variant="danger"
                      onClick={() => handleChangeStatus(row?._id, "cancelled")}
                    >
                      Hủy
                    </Button> */}
                    <Tooltip title="Xác nhận" arrow>
                      <IconButton
                        onClick={() => handleChangeStatus(row?._id, "accepted")}
                        color="success"
                      >
                        <CheckCircleIcon />
                      </IconButton>
                    </Tooltip>
                    <Tooltip title="Hủy" arrow>
                      <IconButton
                        onClick={() =>
                          handleChangeStatus(row?._id, "cancelled")
                        }
                        color="error"
                      >
                        <CancelIcon />
                      </IconButton>
                    </Tooltip>
                  </div>
                ) : row?.status === "accepted" ? (
                  <></>
                ) : (
                  <></>
                )}
              </StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
