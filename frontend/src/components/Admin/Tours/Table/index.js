import * as React from "react";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Button } from "react-bootstrap";
import moment from "moment";
import EditModal from "./EditModal";
import Tooltip from "@mui/material/Tooltip";
import { deleteTour } from "api/tour";
import { successToast, errorToast } from "utilities/toast";
import { tourTimeParser } from "utilities/tourTime";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
    fontSize: 16,
    fontWeight: "bold",
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

export default function ToursTable({ tours, setTours }) {
  const handleDelete = async (id) => {
    try {
      const res = await deleteTour(id);
      if (res?.code === 200) {
        successToast("Xóa tour thành công");
        setTours((prev) => prev.filter((item) => item._id !== id));
      }
    } catch (error) {
      errorToast("Xóa tour thất bại");
      console.log(error);
    }
  };

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 700 }} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell>Name</StyledTableCell>
            <StyledTableCell align="center">Start Time</StyledTableCell>
            <StyledTableCell align="center">Tour Duration</StyledTableCell>
            <StyledTableCell align="center">Start Location</StyledTableCell>
            <StyledTableCell align="center">Transportation</StyledTableCell>
            <StyledTableCell align="center">Price</StyledTableCell>
            <StyledTableCell align="center">Action</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {tours.map((tour) => (
            <StyledTableRow key={tour._id}>
              <StyledTableCell component="th" scope="row">
                <Tooltip title={tour.name} placement="top">
                  <p className="truncate w-32 font-semibold">{tour.name}</p>{" "}
                </Tooltip>
              </StyledTableCell>

              <StyledTableCell align="center">
                {tourTimeParser(tour.startTime, tour.scheduleType)}
              </StyledTableCell>
              <StyledTableCell align="center">
                {tour.tourDuration}
              </StyledTableCell>
              <StyledTableCell align="center">
                {tour.startLocation}
              </StyledTableCell>
              <StyledTableCell align="center">
                {tour.transportation}
              </StyledTableCell>
              <StyledTableCell align="center">{tour.price}</StyledTableCell>
              <StyledTableCell align="center">
                <EditModal tour={tour} setTours={setTours} />
                <Button variant="danger" onClick={() => handleDelete(tour._id)}>
                  Delete
                </Button>
              </StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
