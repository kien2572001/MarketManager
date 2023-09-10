import Analytics from "layouts/dashboards/analytics";
import Sales from "layouts/dashboards/sales";
import ProfileOverview from "layouts/pages/profile/profile-overview";
import AllProjects from "layouts/pages/profile/all-projects";
import NewUser from "layouts/pages/users/new-user";
import Settings from "layouts/pages/account/settings";
import Billing from "layouts/pages/account/billing";
import Invoice from "layouts/pages/account/invoice";
import Timeline from "layouts/pages/projects/timeline";
import PricingPage from "layouts/pages/pricing-page";
import Widgets from "layouts/pages/widgets";
import RTL from "layouts/pages/rtl";
import Charts from "layouts/pages/charts";
import Notifications from "layouts/pages/notifications";
import Kanban from "layouts/applications/kanban";
import Wizard from "layouts/applications/wizard";
import DataTables from "layouts/applications/data-tables";
import Calendar from "layouts/applications/calendar";
import NewProduct from "layouts/ecommerce/products/new-product";
import EditProduct from "layouts/ecommerce/products/edit-product";
import ProductPage from "layouts/ecommerce/products/product-page";
import OrderList from "layouts/ecommerce/orders/order-list";
import OrderDetails from "layouts/ecommerce/orders/order-details";
import SignInBasic from "layouts/authentication/sign-in/basic";
import SignInCover from "layouts/authentication/sign-in/cover";
import SignInIllustration from "layouts/authentication/sign-in/illustration";
import SignUpCover from "layouts/authentication/sign-up/cover";
import ResetCover from "layouts/authentication/reset-password/cover";

// Material Dashboard 2 PRO React components
import MDAvatar from "components/MDAvatar";

// @mui icons
import Icon from "@mui/material/Icon";

// Images
import profilePicture from "assets/images/team-3.jpg";

//Import components
import Feedbacks from "layouts/admin/Feedbacks";
import Users from "layouts/admin/Users";
import ShopBoats from "layouts/admin/ShopBoats";
import NewShopBoatRequests from "layouts/admin/NewShopBoatRequests";
import QualityCheck from "layouts/admin/QualityCheck";
import Tours from "layouts/admin/Tours";
import NewTour from "layouts/admin/NewTour";
import MarketFees from "layouts/admin/MarketFees";
import NewMarketFee from "layouts/admin/NewMarketFee";
import Logout from "components/Logout";

const routes = [
  {
    type: "collapse",
    name: "Brooklyn Alice",
    key: "brooklyn-alice",
    icon: <MDAvatar src={profilePicture} alt="Brooklyn Alice" size="sm" />,
    collapse: [
      {
        name: "My Profile",
        key: "my-profile",
        route: "/admin/account/profile-overview",
        component: <ProfileOverview />,
      },
      {
        name: "Settings",
        key: "profile-settings",
        route: "/admin/account/settings",
        component: <Settings />,
      },
      {
        name: "Logout",
        key: "logout",
        route: "/admin/logout",
        component: <Logout />,
      },
    ],
  },
  { type: "divider", key: "divider-0" },
  {
    type: "collapse",
    name: "Dashboards",
    key: "dashboards",
    icon: <Icon fontSize="medium">dashboard</Icon>,
    collapse: [
      {
        name: "Analytics",
        key: "analytics",
        route: "/admin/dashboards/analytics",
        component: <Analytics />,
      },
      {
        name: "Sales",
        key: "sales",
        route: "/admin/dashboards/sales",
        component: <Sales />,
      },
    ],
  },
  {
    type: "collapse",
    name: "Users",
    key: "users",
    icon: <Icon fontSize="medium">people</Icon>,
    collapse: [
      {
        name: "List",
        key: "list",
        route: "/admin/users",
        component: <Users />,
      },
    ],
  },
  {
    type: "collapse",
    name: "Feedback",
    key: "feedback",
    icon: <Icon fontSize="medium">feedback</Icon>,
    collapse: [
      {
        name: "List",
        key: "list",
        route: "/admin/feedbacks",
        component: <Feedbacks />,
      },
    ],
  },
  {
    type: "collapse",
    name: "Shop Boat",
    key: "shop-boat",
    icon: <Icon fontSize="medium">shop</Icon>,
    collapse: [
      {
        name: "List",
        key: "list",
        route: "/admin/shop-boats",
        component: <ShopBoats />,
      },
      {
        name: "New Request",
        key: "new-request",
        route: "/admin/shop-boats/new-request",
        component: <NewShopBoatRequests />,
      },
      {
        name: "Quality Check",
        key: "quality-check",
        route: "/admin/shop-boats/quality-check",
        component: <QualityCheck />,
      },
    ],
  },
  {
    type: "collapse",
    name: "Tours",
    key: "tours",
    icon: <Icon fontSize="medium">tour</Icon>,
    collapse: [
      {
        name: "List",
        key: "list",
        route: "/admin/tours",
        component: <Tours />,
      },
      {
        name: "New Tour",
        key: "new-tour",
        route: "/admin/tours/new-tour",
        component: <NewTour />,
      },
    ],
  },
  {
    type: "collapse",
    name: "Market Fee",
    key: "market-fee",
    icon: <Icon fontSize="medium">monetization_on</Icon>,
    collapse: [
      {
        name: "List",
        key: "list",
        route: "/admin/market-fees",
        component: <MarketFees />,
      },
      {
        name: "New Market Fee",
        key: "new-market-fee",
        route: "/admin/market-fee/new-market-fee",
        component: <NewMarketFee />,
      },
    ],
  },
];

export default routes;
