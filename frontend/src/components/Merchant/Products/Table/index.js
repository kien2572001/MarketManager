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
import EditModal from "./EditModal";

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

ProductsTable.propTypes = {
  products: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      image: PropTypes.string.isRequired,
      price: PropTypes.number.isRequired,
      sale: PropTypes.number.isRequired,
      unit: PropTypes.string.isRequired,
      countInStock: PropTypes.number.isRequired,
    })
  ),
  updateData: PropTypes.func.isRequired,
};

export default function ProductsTable({ products, updateData }) {
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 700 }} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell>
              <span className="font-bold">Image</span>
            </StyledTableCell>
            <StyledTableCell>
              <span className="font-bold">Product</span>
            </StyledTableCell>
            <StyledTableCell align="center">
              <span className="font-bold">Price</span>
            </StyledTableCell>
            <StyledTableCell align="center">
              <span className="font-bold">Sale</span>
            </StyledTableCell>
            <StyledTableCell align="center">
              <span className="font-bold">Stock</span>
            </StyledTableCell>
            <StyledTableCell align="center">
              <span className="font-bold">Unit</span>
            </StyledTableCell>
            <StyledTableCell align="center">
              <span className="font-bold">Categories</span>
            </StyledTableCell>
            <StyledTableCell align="center">
              <span className="font-bold">Actions</span>
            </StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {products.map((product, index) => (
            <StyledTableRow key={index}>
              <StyledTableCell align="center">
                <img
                  src={product.image}
                  alt={product.name}
                  style={{ maxWidth: "70px" }}
                />
              </StyledTableCell>
              <StyledTableCell component="th" scope="row">
                <span className="font-semibold">{product.name}</span>
              </StyledTableCell>
              <StyledTableCell align="center">
                ${product.price.toFixed(2)}
              </StyledTableCell>
              <StyledTableCell align="center">
                {product.sale > 0 ? (
                  <Badge pill bg="danger">
                    -{product.sale.toFixed(2)}%
                  </Badge>
                ) : (
                  <Badge pill bg="warning" text="dark">
                    No Sale
                  </Badge>
                )}
              </StyledTableCell>
              <StyledTableCell align="center">
                {product.countInStock > 0 ? (
                  product.countInStock
                ) : (
                  <Badge pill bg="danger">
                    Out of Stock
                  </Badge>
                )}
              </StyledTableCell>
              <StyledTableCell align="center">{product.unit}</StyledTableCell>
              <StyledTableCell align="center">
                {product.categories.map((category, index) => (
                  <Badge key={index} pill bg="primary" className="me-1">
                    {category.name}
                  </Badge>
                ))}
              </StyledTableCell>
              <StyledTableCell align="center">
                <EditModal product={product} updateData={updateData} />{" "}
                <Button variant="danger">Delete</Button>
              </StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
