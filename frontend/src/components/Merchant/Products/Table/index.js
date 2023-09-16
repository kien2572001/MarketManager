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
import { Chip } from "@mui/material";

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
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

function createData(name, image, price, sale, unit, countInStock) {
  return { name, image, price, sale, unit, countInStock };
}

const rows = [
  createData("Product 1", "image1.jpg", 10.99, 8.99, "pcs", 50),
  createData("Product 2", "image2.jpg", 15.99, 12.99, "pcs", 30),
  createData("Product 3", "image3.jpg", 12.49, 9.99, "pcs", 20),
  // Add more products as needed
];

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
};

export default function ProductsTable({ products }) {
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 700 }} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell>
              <span className="font-bold">Image</span>
            </StyledTableCell>
            <StyledTableCell>Product</StyledTableCell>
            <StyledTableCell align="right">Price</StyledTableCell>
            <StyledTableCell align="right">Sale Price</StyledTableCell>
            <StyledTableCell align="right">Stock</StyledTableCell>
            <StyledTableCell align="right">Unit</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {products.map((product, index) => (
            <StyledTableRow key={index}>
              <StyledTableCell align="right">
                <img
                  src={product.image}
                  alt={product.name}
                  style={{ maxWidth: "70px" }}
                />
              </StyledTableCell>
              <StyledTableCell component="th" scope="row">
                {product.name}
              </StyledTableCell>
              <StyledTableCell align="right">
                ${product.price.toFixed(2)}
              </StyledTableCell>
              <StyledTableCell align="right">
                ${product.sale.toFixed(2)}
                {product.sale > 0 ? (
                  <Chip label="primary" color="primary" variant="outlined" />
                ) : (
                  <Chip
                    label="secondary"
                    color="secondary"
                    variant="outlined"
                  />
                )}
              </StyledTableCell>
              <StyledTableCell align="right">
                {product.countInStock}
              </StyledTableCell>
              <StyledTableCell align="right">{product.unit}</StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
