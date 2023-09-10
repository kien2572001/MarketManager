// Material Dashboard 2 PRO React components
import MDAvatar from "components/MDAvatar";
import Icon from "@mui/material/Icon";
import profilePicture from "assets/images/team-3.jpg";
import Analytics from "layouts/dashboards/analytics";
import Sales from "layouts/dashboards/sales";
import ProfileOverview from "layouts/pages/profile/profile-overview";
//Import Components
import Settings from "layouts/pages/account/settings";
import BoatsInfo from "layouts/merchant/Boats";
import Products from "layouts/merchant/Products";
import Feedbacks from "layouts/merchant/Feedbacks";
import Orders from "layouts/merchant/Orders";
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
        route: "/merchant/account/profile-overview",
        component: <ProfileOverview />,
      },
      {
        name: "Settings",
        key: "profile-settings",
        route: "/merchant/account/settings",
        component: <Settings />,
      },
      {
        name: "Logout",
        key: "logout",
        route: "/merchant/logout",
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
        route: "/merchant/dashboards/analytics",
        component: <Analytics />,
      },
      {
        name: "Sales",
        key: "sales",
        route: "/merchant/dashboards/sales",
        component: <Sales />,
      },
    ],
  },
  {
    type: "collapse",
    name: "Shop",
    key: "shop",
    icon: <Icon fontSize="medium">storefront</Icon>,
    collapse: [
      {
        name: "Boats",
        key: "boats",
        route: "/merchant/shop/boats",
        component: <BoatsInfo />,
      },
      {
        name: "Products",
        key: "products",
        route: "/merchant/shop/products",
        component: <Products />,
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
        route: "/merchant/feedbacks",
        component: <Feedbacks />,
      },
    ],
  },
  {
    type: "collapse",
    name: "Orders",
    key: "orders",
    icon: <Icon fontSize="medium">shopping_cart</Icon>,
    collapse: [
      {
        name: "List",
        key: "list",
        route: "/merchant/orders",
        component: <Orders />,
      },
    ],
  },
];

export default routes;
