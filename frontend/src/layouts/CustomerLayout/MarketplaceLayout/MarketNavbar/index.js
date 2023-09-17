import "./style.scss";
import { Container, InputAdornment, TextField } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { useState } from "react";
import { FaPhoneAlt } from "react-icons/fa";
import { BsCart4 } from "react-icons/bs";
import ResponsiveAppBar from "./MarketHeader";
import { useNavigate } from "react-router-dom";
import "react-slideshow-image/dist/styles.css";
import { Link } from "react-router-dom";

const MarketNavbar = () => {
  const [searchTerm, setSearchTerm] = useState("");

  const navigate = useNavigate();

  const handleChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleLogin = () => {
    navigate("/signin");
  };

  return (
    <div className="container-nav">
      <div className="content-nav">
        <Link className="logo" to="/marketplace">
          <img
            src="https://chonoicairang.net/wp-content/uploads/2020/04/chonoicairang.net_.png"
            alt="logo"
          />
        </Link>
        <div className="search-bar">
          <Container maxWidth="md" sx={{ mt: 20 }} className="fix-margintop">
            <TextField
              id="search"
              type="search"
              label="Tìm mọi thứ"
              value={searchTerm}
              onChange={handleChange}
              style={{ boxShadow: "0px 5px 15px ", borderRadius: "10px" }}
              sx={{ width: 300 }}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <SearchIcon />
                  </InputAdornment>
                ),
              }}
            />
          </Container>
          <div className="phone-number">
            <FaPhoneAlt size={15} />
            <span className="tracking-tight text-red-500"> 0939.39.39.39</span>
          </div>
        </div>
        <div className="login-item">
          <div className="login" onClick={() => handleLogin()}>
            <span className="tracking-tight font-medium text-black">
              Đăng nhập
            </span>
          </div>
          <div className="item-cart">
            <span className=" font-medium relative mr-2">
              <span className="text-base">0</span>
              <span className="text-xs relative top-[-0.2em] font-medium underline">
                đ
              </span>
            </span>
            <span>
              <BsCart4 />
            </span>
          </div>
        </div>
      </div>
      <div className="menu-header">
        <div className="ResponsiveAppBar">{/* <ResponsiveAppBar /> */}</div>
      </div>
    </div>
  );
};

export default MarketNavbar;
