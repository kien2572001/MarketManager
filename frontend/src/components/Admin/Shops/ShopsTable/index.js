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
const DetailModal = React.lazy(() => import("./DetailModal"));

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
  const handleChangeStatus = async (id, status, data) => {
    try {
      const response = await updateShopBoatById(id, {
        ...data,
        status: status,
      });
      console.log(response);
      console.log(updateData);
      if (response?.status === 200) {
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
              <span className="font-bold">Code</span>
            </StyledTableCell>
            <StyledTableCell align="center">
              <span className="font-bold">Owner</span>
            </StyledTableCell>
            <StyledTableCell align="center">
              <span className="font-bold">Phone</span>
            </StyledTableCell>
            <StyledTableCell align="center">
              <span className="font-bold">Address</span>
            </StyledTableCell>
            <StyledTableCell align="center">
              <span className="font-bold">Type</span>
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
          {shopBoats.map((row) => (
            <StyledTableRow key={row._id}>
              <StyledTableCell component="th" scope="row">
                <img src={row.avatar} alt={row.name} width="100" />
              </StyledTableCell>
              <StyledTableCell align="center">{row.name}</StyledTableCell>
              <StyledTableCell align="center">
                {row.code || "Chưa có"}
              </StyledTableCell>
              <StyledTableCell align="center">
                {row.owner?.firstName} {row.owner?.lastName}
              </StyledTableCell>
              <StyledTableCell align="center">
                {row.owner?.phone || "Chưa có"}
              </StyledTableCell>
              <StyledTableCell align="center">
                {row.owner?.address}
              </StyledTableCell>
              <StyledTableCell align="center">{row.type}</StyledTableCell>
              <StyledTableCell align="center">
                {row?.status === "active" ? (
                  <Badge bg="success">Active</Badge>
                ) : row?.status === "inactive" ? (
                  <Badge bg="warning">Inactive</Badge>
                ) : (
                  <Badge bg="danger">Banned</Badge>
                )}
              </StyledTableCell>
              <StyledTableCell align="center">
                <DetailModal shopBoat={row} />
              </StyledTableCell>
              <StyledTableCell align="center">
                {row?.status === "active" ? (
                  <Button
                    variant="danger"
                    onClick={() => handleChangeStatus(row._id, "banned", row)}
                  >
                    Ban
                  </Button>
                ) : row?.status === "inactive" ? (
                  <Button
                    variant="success"
                    onClick={() => handleChangeStatus(row._id, "active", row)}
                  >
                    Active
                  </Button>
                ) : (
                  <Button
                    variant="warning"
                    onClick={() => handleChangeStatus(row._id, "active", row)}
                  >
                    Unban
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
