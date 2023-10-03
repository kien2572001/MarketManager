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

// ProductsTable.propTypes = {
//   products: PropTypes.arrayOf(
//     PropTypes.shape({
//       name: PropTypes.string.isRequired,
//       image: PropTypes.string.isRequired,
//       price: PropTypes.number.isRequired,
//       sale: PropTypes.number.isRequired,
//       unit: PropTypes.string.isRequired,
//       countInStock: PropTypes.number.isRequired,
//     })
//   ),
//   updateData: PropTypes.func.isRequired,
//   handleDeleteProduct: PropTypes.func.isRequired,
// };

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
              <span className="font-bold">Time</span>
            </StyledTableCell>
            <StyledTableCell>
              <span className="font-bold">Customer</span>
            </StyledTableCell>
            <StyledTableCell align="center">
              <span className="font-bold">Phone</span>
            </StyledTableCell>
            <StyledTableCell align="center">
              <span className="font-bold">Address</span>
            </StyledTableCell>
            <StyledTableCell align="center">
              <span className="font-bold">Total</span>
            </StyledTableCell>
            <StyledTableCell align="center">
              <span className="font-bold">Status</span>
            </StyledTableCell>
            <StyledTableCell align="center">
              <span className="font-bold">Detail</span>
            </StyledTableCell>
            <StyledTableCell align="center">
              <span className="font-bold">Actions</span>
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
                    Pending
                  </Badge>
                ) : order.status === "accepted" ? (
                  <Badge pill bg="success">
                    Accepted
                  </Badge>
                ) : (
                  <Badge pill bg="danger">
                    Cancelled
                  </Badge>
                )}
              </StyledTableCell>
              <StyledTableCell align="center">
                <DetailModal order={order} />
              </StyledTableCell>
              <StyledTableCell align="center">
                {order.status === "pending" && (
                  <div className="flex">
                    <Button
                      variant="success"
                      className="me-2"
                      onClick={() => handleChaneStatus(order._id, "accepted")}
                    >
                      Accept
                    </Button>
                    <Button
                      variant="danger"
                      className="me-2"
                      onClick={() => handleChaneStatus(order._id, "cancelled")}
                    >
                      Cancel
                    </Button>
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
