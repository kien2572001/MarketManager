import DashboardLayout from "layouts/DashboardLayout";
import Pagination from "@mui/material/Pagination";
import { Grid, Paper } from "@mui/material";
import TourOrdersTable from "./Table";
import { getAllTourOrders } from "api/tourOrder";
import { useEffect, useState } from "react";
const TourOrders = () => {
  const [tourOrders, setTourOrders] = useState([]); // [1]
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const limit = 5;

  const fetchTourOrders = async (queryCondition = {}) => {
    try {
      const response = await getAllTourOrders(page, limit, queryCondition);
      setTourOrders(response.data.docs);
      setTotal(response.data.totalPages);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchTourOrders({});
  }, [page]);

  const handleChangePage = (event, value) => {
    setPage(value);
  };

  return (
    <DashboardLayout layoutRole={0}>
      <h1>Quản lí đặt Tour du lịch</h1>
      <Grid item xs={12}>
        <Paper sx={{ p: 2 }}>
          {/* <SearchForm onSearch={handleSearch} setTours={setTours} /> */}
          <TourOrdersTable
            tourOrders={tourOrders}
            setTourOrders={setTourOrders}
          />
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

export default TourOrders;
