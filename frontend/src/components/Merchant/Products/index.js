import DashboardLayout from "layouts/DashboardLayout";
import { Grid, Paper } from "@mui/material";
import ProductsTable from "./Table";
import { useEffect, useState } from "react";
import { getShopBoatProducts } from "api/shopBoat";

const MerchantProducts = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      const response = await getShopBoatProducts(
        "65057590877cec153c23bbb0",
        1,
        5
      );
      if (response) {
        setProducts(response.data.data.docs);
      }
    };
    fetchProducts();
  }, []);

  return (
    <DashboardLayout>
      <Grid item xs={12}>
        <ProductsTable products={products} />
      </Grid>
    </DashboardLayout>
  );
};

export default MerchantProducts;
