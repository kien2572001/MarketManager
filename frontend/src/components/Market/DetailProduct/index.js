import "./style.scss"
import MarketplaceLayout from "layouts/CustomerLayout/MarketplaceLayout";
import ProductMain from "./ProductMain";
import ProductFooter from "./ProductFooter";

const DetailProduct = () => {
    return (
        <MarketplaceLayout>
            <div className="container-DetailProduct">
                <ProductMain />
                <ProductFooter />
            </div>
        </MarketplaceLayout>
    );
};

export default DetailProduct;