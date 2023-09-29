import DashboardLayout from "layouts/DashboardLayout";
import { getAllShopBoats } from "api/shopBoat";
import { useEffect, useState } from "react";
import Pagination from "@mui/material/Pagination";
import ShopsTable from "./ShopsTable";
import { Grid } from "@mui/material";
import SearchForm from "./SearchForm";

const Shops = () => {
  const [shopBoats, setShopBoats] = useState([]);
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const limit = 5;

  useEffect(() => {
    const fetchShopBoats = async () => {
      try {
        const response = await getAllShopBoats();
        setShopBoats(response.data.data.docs);
        setTotal(response.data.data.totalPages);
      } catch (error) {
        console.log(error);
      }
    };
    fetchShopBoats();
  }, []);

  useEffect(() => {
    const fetchShopBoats = async () => {
      try {
        const response = await getAllShopBoats(page, limit);
        setShopBoats(response.data.data.docs);
        setTotal(response.data.data.totalPages);
      } catch (error) {
        console.log(error);
      }
    };
    fetchShopBoats();
  }, [page]);

  const updateData = (data) => {
    const newData = shopBoats.map((shopBoat) => {
      if (shopBoat._id === data._id) {
        return data;
      }
      return shopBoat;
    });
    setShopBoats(newData);
  };

  const onSearch = async (data) => {
    try {
      const response = await getAllShopBoats(1, limit, data);
      setShopBoats(response.data.data.docs);
      setTotal(response.data.data.totalPages);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <DashboardLayout layoutRole={0}>
      <h1>Quản lí các thuyền buôn</h1>
      <Grid item xs={12}>
        <SearchForm onSearch={onSearch} />
      </Grid>
      <Grid item xs={12}>
        <ShopsTable shopBoats={shopBoats} updateData={updateData} />
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
          onChange={(e, value) => setPage(value)}
        />
      </Grid>
    </DashboardLayout>
  );
};

export default Shops;
