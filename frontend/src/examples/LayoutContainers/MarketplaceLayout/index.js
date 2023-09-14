import { useEffect } from "react";

// react-router-dom components
import { useLocation } from "react-router-dom";

// prop-types is a library for typechecking of props.
import PropTypes from "prop-types";

// Material Dashboard 2 PRO React components
import MDBox from "components/MDBox";

// Material Dashboard 2 PRO React context
import { useMaterialUIController, setLayout } from "context";

//Market navbar
import MarketNavbar from "./MarketNavbar";

//Market footer
import MarketFooter from "./MarketFooter";

function MarketplaceLayout({ background, children }) {
  const [, dispatch] = useMaterialUIController();
  const { pathname } = useLocation();

  useEffect(() => {
    setLayout(dispatch, "marketplace");
  }, [pathname]);

  return (
    <MDBox
      // width="100vw"
      height="100%"
      // minHeight="100vh"
      bgColor={background}
      sx={{ overflowX: "hidden" }}
    >
      <MarketNavbar />
      {children}
      <MarketFooter />
    </MDBox>
  );
}

// Setting default values for the props for PageLayout
MarketplaceLayout.defaultProps = {
  background: "default",
};

// Typechecking props for the PageLayout
MarketplaceLayout.propTypes = {
  background: PropTypes.oneOf(["white", "light", "default"]),
  children: PropTypes.node.isRequired,
};

export default MarketplaceLayout;
