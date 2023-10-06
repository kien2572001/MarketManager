import "./style.scss";
import React from "react";
import Button from "@mui/material/Button";
import ButtonGroup from "@mui/material/ButtonGroup";
import Badge from "react-bootstrap/Badge";
import { getCategoryById } from "api/category";
import { Link } from "react-router-dom";
import Skeleton from "@mui/material/Skeleton";

const ProductMain = (props) => {
  const { product } = props;
  const [quantity, setQuantity] = React.useState(0);

  const handleIncrement = () => {
    setQuantity(quantity + 1);
  };

  const handleDecrement = () => {
    if (quantity > 0) {
      setQuantity(quantity - 1);
    } else {
      alert("Số lượng không thể nhỏ hơn 0");
    }
  };

  return (
    <div className="product-main">
      <div className="product-main__content">
        <div className="product-main__content__left">
          <div className="product-main__content__left__image">
            {product.image ? (
              <img src={product.image} alt="" />
            ) : (
              <Skeleton
                variant="rectangular"
                style={{ width: "100%", height: "100%" }}
              />
            )}
          </div>
        </div>
        <div className="product-main__content__right">
          <div className="product-main__content__path_product">
            <a href="#">TRANG CHỦ</a>
            <span> / </span>
            <a href="#">TRÁI CÂY</a>
            <span> / </span>
            <a href="#">CAM</a>
          </div>
          <div className="product-main__content__name_product">
            <h1>{product.name}</h1>
          </div>
          <div className="product-main__content__dash"></div>
          <div className="product-main__content__price_product">
            <del>{product.price + "₫"}</del>
            <ins>
              {Number.parseInt(
                product.price - (product.price * product.sale) / 100
              )}
              {" ₫"}
            </ins>
          </div>
          <div className="product-main__content__order_product">
            <ButtonGroup
              variant="contained"
              aria-label="outlined button group"
              size="small"
            >
              <Button onClick={handleIncrement}>+</Button>
              <Button>{quantity}</Button>
              <Button onClick={handleDecrement}>-</Button>
            </ButtonGroup>
            <Button
              variant="contained"
              sx={{
                bgcolor: "#7DB249 !important",
                borderRadius: "1.35rem !important",
                fontWeight: "bold !important",
              }}
            >
              Thêm hàng vào giỏ
            </Button>
          </div>
          <div className="product-main__content__description_product">
            Giá cả có thể thay đổi tùy theo vụ mùa
            <br />
            Liên hệ giá tốt nhất:
            <a href="#"> 0909.090.090</a>
            <br />
            Fanpage:
            <a href="#"> Chợ Nổi Cái Răng</a>
          </div>
          <br />
          <div className="product-main__content__right_tel">
            <img
              src="https://chonoicairang.net/wp-content/uploads/2020/05/banner-si-ngang.jpg"
              alt=""
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductMain;
