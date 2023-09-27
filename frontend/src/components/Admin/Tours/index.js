import DashboardLayout from "layouts/DashboardLayout";
import Pagination from "@mui/material/Pagination";
import { Grid, Paper } from "@mui/material";
import { useEffect, useState } from "react";
import ToursTable from "./Table";
import { getAllTours } from "api/tour";
const Tours = () => {
  const [tours, setTours] = useState([]);
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const limit = 5;

  useEffect(() => {
    const fetchTours = async () => {
      try {
        const response = await getAllTours(page, limit);
        setTours(response.data.docs);
        setTotal(response.data.totalPages);
      } catch (error) {
        console.log(error);
      }
    };
    fetchTours();
  }, [page]);

  const handleChangePage = (event, value) => {
    setPage(value);
  };

  return (
    <DashboardLayout layoutRole={0}>
      <h1>Tours</h1>
      <Grid item xs={12}>
        <Paper sx={{ p: 2 }}>
          <ToursTable tours={tours} setTours={setTours} />
        </Paper>
      </Grid>
      <Grid
        item
        xs={12}
        sx={{ display: "flex", justifyContent: "center", mt: 2 }}
      >
        <Pagination
          count={total}
          color="primary"
          size="large"
          onChange={handleChangePage}
        />
      </Grid>
    </DashboardLayout>
  );
};

export default Tours;
