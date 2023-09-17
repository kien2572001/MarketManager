import "./style.scss";
import * as React from "react";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import SliderProduct from "./SliderProduct";
import { getListProductsInHomePage } from "api/product";

function CustomTabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 4 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

CustomTabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

const ListProduct = () => {
  const [value, setValue] = React.useState(0);
  const [top1Category, setTop1Category] = React.useState("Category 1"); // "Category 1
  const [top1Products, setTop1Products] = React.useState([]);
  const [top2Category, setTop2Category] = React.useState("Category 2"); // "Category 2"
  const [top2Products, setTop2Products] = React.useState([]);
  const [top3Category, setTop3Category] = React.useState("Category 3"); // "Category 3
  const [top3Products, setTop3Products] = React.useState([]);
  const [otherCategory, setOtherCategory] = React.useState("Others"); // "Others"
  const [otherProducts, setOtherProducts] = React.useState([]);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  React.useEffect(() => {
    const fetchListProductsInHomePage = async () => {
      try {
        const response = await getListProductsInHomePage();
        setTop1Category(response.data.data[0].category);
        setTop1Products(response.data.data[0].products);
        setTop2Category(response.data.data[1].category);
        setTop2Products(response.data.data[1].products);
        setTop3Category(response.data.data[2].category);
        setTop3Products(response.data.data[2].products);
        setOtherCategory(response.data.data[3].category);
        setOtherProducts(response.data.data[3].products);
      } catch (error) {
        console.log(error);
      }
    };
    fetchListProductsInHomePage();
  }, []);

  return (
    <div className="container-listproduct">
      <div className="listproduct">
        <div className="listproduct__blank"></div>
        <div className="listproduct__title">
          <b></b>
          <div className="listproduct__title--text">
            <h2>CÁC SẢN PHẨM</h2>
          </div>
          <b></b>
        </div>
        <div className="listproduct__content">
          <Box sx={{ width: "100%" }}>
            <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
              <Tabs
                value={value}
                onChange={handleChange}
                aria-label="basic tabs example"
              >
                <Tab
                  label={top1Category ? top1Category.name : ""}
                  {...a11yProps(0)}
                  sx={{
                    backgroundColor: value === 0 ? "#7DB249" : "",
                    transition: "0.8s",
                    color: value === 0 ? "#FFFFFF !important" : "",
                    fontSize: "17px",
                    fontWeight: "600",
                  }}
                />
                <Tab
                  label={top2Category ? top2Category.name : ""}
                  {...a11yProps(1)}
                  sx={{
                    backgroundColor: value === 1 ? "#7DB249" : "",
                    transition: "0.8s",
                    color: value === 1 ? "#FFFFFF !important" : "",
                    fontSize: "17px",
                    fontWeight: "600",
                  }}
                />
                <Tab
                  label={top3Category ? top3Category.name : ""}
                  {...a11yProps(2)}
                  sx={{
                    backgroundColor: value === 2 ? "#7DB249" : "",
                    transition: "0.8s",
                    color: value === 2 ? "#FFFFFF !important" : "",
                    fontSize: "17px",
                    fontWeight: "600",
                  }}
                />
                <Tab
                  label={otherCategory ? otherCategory.name : ""}
                  {...a11yProps(3)}
                  sx={{
                    backgroundColor: value === 3 ? "#7DB249" : "",
                    transition: "0.8s",
                    color: value === 3 ? "#FFFFFF !important" : "",
                    fontSize: "17px",
                    fontWeight: "600",
                  }}
                />
              </Tabs>
            </Box>
            <CustomTabPanel value={value} index={0}>
              <SliderProduct items={top1Products} />
            </CustomTabPanel>
            <CustomTabPanel value={value} index={1}>
              <SliderProduct items={top2Products} />
            </CustomTabPanel>
            <CustomTabPanel value={value} index={2}>
              <SliderProduct items={top3Products} />
            </CustomTabPanel>
            <CustomTabPanel value={value} index={3}>
              <SliderProduct items={otherProducts} />
            </CustomTabPanel>
          </Box>
        </div>
      </div>
    </div>
  );
};

export default ListProduct;
