import "./style.scss";
import MarketplaceLayout from "layouts/CustomerLayout/MarketplaceLayout";
import ProductMain from "./ProductMain";
import ProductFooter from "./ProductFooter";
import { useParams } from "react-router-dom";
import { getProductBySlug } from "api/product";
import React, { useEffect } from "react";

const DetailProduct = () => {
  const { slug } = useParams();
  const [product, setProduct] = React.useState({});

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await getProductBySlug(slug);
        setProduct(response.data.data);
        console.log(response.data.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchProduct();
  }, [slug]);

  return (
    <MarketplaceLayout>
      <div className="container-DetailProduct">
        <ProductMain product={product} />
        <ProductFooter product={product} />
      </div>
    </MarketplaceLayout>
  );
};

export default DetailProduct;
