import * as React from "react";
import Box from "@mui/material/Box";
import { Button } from "react-bootstrap";
import Modal from "@mui/material/Modal";
import { Table } from "react-bootstrap";
import Badge from "react-bootstrap/Badge";
import moment from "moment";
import IconButton from "@mui/material/IconButton";
import VisibilityIcon from "@mui/icons-material/Visibility";
import Tooltip from "@mui/material/Tooltip";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 800,
  maxHeight: "80vh", // Đặt chiều cao cố định và sử dụng thanh cuộn khi nội dung vượt quá 80vh
  overflowY: "auto", // Tạo thanh cuộn theo chiều dọc
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

export default function DetailModal({ tourOrder }) {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <div>
      <Tooltip title="Chi tiết">
        <IconButton onClick={handleOpen} color="primary">
          <VisibilityIcon />
        </IconButton>
      </Tooltip>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <div className="d-flex justify-content-center w-full  mb-4">
            <img
              src={tourOrder?.tourId?.image}
              alt="Tour image"
              style={{ width: "100%" }}
            />
          </div>
          <div className="d-flex justify-content-between">
            <Table striped bordered hover>
              <tbody>
                <tr>
                  <td>
                    <strong>Thời gian đặt</strong>
                  </td>
                  <td>
                    {moment(tourOrder?.createdAt).format("DD/MM/YYYY HH:mm")}
                  </td>
                </tr>
                <tr>
                  <td>
                    <strong>Email</strong>
                  </td>
                  <td>{tourOrder?.userId?.email}</td>
                </tr>
                <tr>
                  <td>
                    <strong>Ngày xuất phát</strong>
                  </td>
                  <td>
                    {moment(tourOrder?.tourId?.tourTime).format("DD/MM/YYYY")}
                  </td>
                </tr>
                <tr>
                  <td>
                    <strong>Tên Tour</strong>
                  </td>
                  <td>
                    <strong>{tourOrder?.tourId?.name}</strong> -{" "}
                    {tourOrder?.tourId?.tourDuration}{" "}
                  </td>
                </tr>
                <tr>
                  <td>
                    <strong>Địa điểm xuất phát</strong>
                  </td>
                  <td>{tourOrder?.tourId?.startLocation}</td>
                </tr>
                <tr>
                  <td>
                    <strong>Phương tiện</strong>
                  </td>
                  <td>{tourOrder?.tourId?.transportation}</td>
                </tr>
                <tr>
                  <td>
                    <strong>Tên khách hàng</strong>
                  </td>
                  <td>
                    {tourOrder?.userId?.firstName} {tourOrder?.userId?.lastName}
                  </td>
                </tr>
                <tr>
                  <td>
                    <strong>Email</strong>
                  </td>
                  <td>{tourOrder?.userId?.email}</td>
                </tr>
                <tr>
                  <td>
                    <strong>Số điện thoại</strong>
                  </td>
                  <td>{tourOrder?.userId?.phone}</td>
                </tr>
                <tr>
                  <td>
                    <strong>Địa chỉ</strong>
                  </td>
                  <td>{tourOrder?.userId?.address}</td>
                </tr>
                <tr>
                  <td>
                    <strong>Số lượng</strong>
                  </td>
                  <td>{tourOrder?.quantity}</td>
                </tr>
                <tr>
                  <td>
                    <strong>Đơn giá</strong>
                  </td>
                  <td>{tourOrder?.tourPrice}</td>
                </tr>
                <tr>
                  <td>
                    <strong>Tổng tiền</strong>
                  </td>
                  <td>{tourOrder?.total}</td>
                </tr>
                <tr>
                  <td>
                    <strong>Trạng thái</strong>
                  </td>
                  <td>
                    {tourOrder?.status === "pending" ? (
                      <Badge bg="warning">Chờ xác nhận</Badge>
                    ) : tourOrder?.status === "accepted" ? (
                      <Badge bg="success">Đã xác nhận</Badge>
                    ) : (
                      <Badge bg="danger">Đã hủy</Badge>
                    )}
                  </td>
                </tr>
              </tbody>
            </Table>
          </div>
        </Box>
      </Modal>
    </div>
  );
}
