import DashboardLayout from "layouts/DashboardLayout";
import { Grid, Paper } from "@mui/material";
import ProductsTable from "./Table";
import { useEffect, useState } from "react";
import { getShopBoatProducts } from "api/shopBoat";
import Pagination from "@mui/material/Pagination";
import TablePagination from "@mui/material/TablePagination";

const MerchantProducts = () => {
  const [products, setProducts] = useState([]);
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const limit = 5;

  useEffect(() => {
    const fetchProducts = async () => {
      const response = await getShopBoatProducts(
        "65057590877cec153c23bbb0",
        1,
        limit
      );
      if (response) {
        setProducts(response.data.data.docs);
        setTotal(response.data.data.totalPages);
        //console.log(response.data.data);
      }
    };
    fetchProducts();
  }, []);

  useEffect(() => {
    const fetchProducts = async () => {
      const response = await getShopBoatProducts(
        "65057590877cec153c23bbb0",
        page,
        limit
      );
      if (response) {
        setProducts(response.data.data.docs);
      }
    };
    fetchProducts();
  }, [page]);

  const handleChangePage = (event, value) => {
    setPage(value);
  };

  const updateData = (updatedProduct) => {
    let newProducts = products.map((product) => {
      if (product._id === updatedProduct._id) {
        return updatedProduct;
      }
      return product;
    });
    setProducts(newProducts);
  };

  return (
    <DashboardLayout>
      <Grid item xs={12}></Grid>
      <Grid item xs={12}>
        <ProductsTable products={products} updateData={updateData} />
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

export default MerchantProducts;
