import DashboardLayout from "layouts/DashboardLayout";
import { Grid, Paper } from "@mui/material";
import { useLayoutEffect, useState, useEffect } from "react";
import { navigate, useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import jwt_decode from "jwt-decode";
import { getShopBoatByOwnerId } from "api/shopBoat";
import { getOrdersOfShop } from "api/productOrder";
import OrdersTable from "./Table";
import Pagination from "@mui/material/Pagination";
import SearchForm from "./SearchForm";

const Orders = () => {
  const [cookies, setCookie] = useCookies(["access_token"]);
  const [shopBoatId, setShopBoatId] = useState(null);
  const limit = 5;
  const navigate = useNavigate();
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const [orders, setOrders] = useState([]);

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
            const shopBoatId = response.data.data._id;
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
    if (shopBoatId) {
      const fetchOrders = async () => {
        try {
          const response = await getOrdersOfShop(shopBoatId, page, limit);
          if (response?.status === 200) {
            setOrders(response.data.data.docs);
            setTotal(response.data.data.totalPages);
          }
        } catch (err) {
          console.log(err);
        }
      };
      fetchOrders();
    }
  }, [shopBoatId, page]);

  const handleChangePage = (event, value) => {
    setPage(value);
  };

  const updateData = (data) => {
    const newOrders = orders.map((order) => {
      if (order._id === data._id) {
        return data;
      }
      return order;
    });
    setOrders(newOrders);
  };

  const handleSearch = (data) => {
    const fetchOrders = async () => {
      try {
        const response = await getOrdersOfShop(shopBoatId, page, limit, data);
        if (response?.status === 200) {
          setOrders(response.data.data.docs);
          setTotal(response.data.data.totalPages);
        }
      } catch (err) {
        console.log(err);
      }
    };
    fetchOrders();
  };

  return (
    <DashboardLayout layoutRole={1}>
      <Grid item xs={12}>
        <SearchForm onSearch={handleSearch} />
      </Grid>
      <Grid item xs={12}>
        <OrdersTable orders={orders} updateData={updateData} />
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

export default Orders;
