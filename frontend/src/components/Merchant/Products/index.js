import DashboardLayout from "layouts/DashboardLayout";
import { Grid, Paper } from "@mui/material";
import ProductsTable from "./Table";
import { useEffect, useState, useLayoutEffect } from "react";
import { getShopBoatProducts, deleteProduct } from "api/shopBoat";
import Pagination from "@mui/material/Pagination";
import { useCookies } from "react-cookie";
import jwt_decode from "jwt-decode";
import { navigate } from "react-router-dom";
import { getShopBoatByOwnerId } from "api/shopBoat";
import { getListCategories } from "api/category";
import { useNavigate } from "react-router-dom";
import ProductSearchForm from "./ProductSearchForm";

const MerchantProducts = () => {
  const [products, setProducts] = useState([]);
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const [cookies, setCookie] = useCookies(["access_token"]);
  const limit = 5;
  const navigate = useNavigate();
  const [shopBoatId, setShopBoatId] = useState(null);
  const [categories, setCategories] = useState([]);

  useLayoutEffect(() => {
    const checkRole = async () => {
      if (cookies.access_token) {
        const { id, role } = await jwt_decode(cookies.access_token);
        if (role !== 1) {
          navigate("/signin");
        }
        const fetchShopBoat = async (id) => {
          const response = await getShopBoatByOwnerId(id);
          if (response) {
            //console.log(response.data.data._id);
            const shopBoatId = response.data.data._id;
            console.log(shopBoatId);
            setShopBoatId(shopBoatId);
          }
        };
        fetchShopBoat(id);
      } else {
        // Nếu không có access_token, chuyển hướng đến trang đăng nhập
        navigate("/signin");
      }
    };
    checkRole();
  }, [cookies.access_token, navigate]);

  useEffect(() => {
    const fetchProducts = async () => {
      if (shopBoatId) {
        const response = await getShopBoatProducts(shopBoatId, 1, limit);
        if (response) {
          setProducts(response.data.data.docs);
          setTotal(response.data.data.totalPages);
        }
      }
    };
    fetchProducts();
  }, [shopBoatId]);

  useEffect(() => {
    const fetchCategories = async () => {
      const response = await getListCategories();
      if (response?.status === 200) {
        let categories = response.data.data;
        categories = categories.map((category) => {
          return { value: category._id, label: category.name };
        });
        setCategories(categories);
      }
    };
    fetchCategories();
  }, []);

  useEffect(() => {
    const fetchProducts = async () => {
      const response = await getShopBoatProducts(shopBoatId, page, limit);
      if (response?.status === 200) {
        setProducts(response.data.data.docs);
        setTotal(response.data.data.totalPages);
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

  const handleDeleteProduct = async (id) => {
    try {
      const response = await deleteProduct(id);
      if (response) {
        let newProducts = products.filter((product) => product._id !== id);
        setProducts(newProducts);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const handleSearch = async (formData) => {
    try {
      const response = await getShopBoatProducts(
        shopBoatId,
        1,
        limit,
        formData
      );
      if (response?.status === 200) {
        setProducts(response.data.data.docs);
        setTotal(response.data.data.totalPages);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const addProduct = (product) => {
    let newProducts = [product, ...products];
    setProducts(newProducts);
  };

  return (
    <DashboardLayout role="merchant">
      <Grid item xs={12} sx={{ mb: 2 }}>
        <ProductSearchForm
          onSearch={handleSearch}
          categories={categories}
          updateData={updateData}
          addProduct={addProduct}
        />
      </Grid>
      <Grid item xs={12}>
        <ProductsTable
          products={products}
          updateData={updateData}
          handleDeleteProduct={handleDeleteProduct}
        />
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
