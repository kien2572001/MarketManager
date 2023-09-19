import * as React from "react";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Badge from "react-bootstrap/Badge";
import { updateShopBoatById } from "api/shopBoat";
import { Button } from "react-bootstrap";

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

export default function ShopsTable({ shopBoats, updateData }) {
  const handleApprove = async (id, isApproved, data) => {
    try {
      const response = await updateShopBoatById(id, {
        ...data,
        isApproved: !isApproved,
      });
      console.log(response);
      console.log(updateData);
      if (response?.status === 200) {
        console.log(response.data.data);
        updateData(response.data.data);
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 700 }} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell>
              <span className="font-bold">Image</span>
            </StyledTableCell>
            <StyledTableCell>
              <span className="font-bold">Name</span>
            </StyledTableCell>
            <StyledTableCell align="center">
              <span className="font-bold">Description</span>
            </StyledTableCell>
            <StyledTableCell align="center">
              <span className="font-bold">Address</span>
            </StyledTableCell>
            <StyledTableCell align="center">
              <span className="font-bold">Status</span>
            </StyledTableCell>
            <StyledTableCell align="center">
              <span className="font-bold">Actions</span>
            </StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {shopBoats.map((row) => (
            <StyledTableRow key={row.name}>
              <StyledTableCell component="th" scope="row">
                <img src={row.avatar} alt={row.name} width="100" />
              </StyledTableCell>
              <StyledTableCell align="center">{row.name}</StyledTableCell>
              <StyledTableCell align="center">
                {row.description}
              </StyledTableCell>
              <StyledTableCell align="center">{row.address}</StyledTableCell>
              <StyledTableCell align="center">
                {row.isApproved ? (
                  <Badge bg="success">Approved</Badge>
                ) : (
                  <Badge bg="danger">Pending</Badge>
                )}
              </StyledTableCell>
              <StyledTableCell align="center">
                {row.isApproved ? (
                  <Button
                    variant="danger"
                    onClick={() => handleApprove(row._id, row.isApproved, row)}
                  >
                    Unapprove
                  </Button>
                ) : (
                  <Button
                    variant="success"
                    onClick={() => handleApprove(row._id, row.isApproved, row)}
                  >
                    Approve
                  </Button>
                )}
              </StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
