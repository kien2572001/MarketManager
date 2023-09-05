// Material Dashboard 2 PRO React components
import MDAvatar from "components/MDAvatar";
import Icon from "@mui/material/Icon";

//Import Components
import ProfileOverview from "examples/Profile/ProfileOverview";
import Settings from "examples/Profile/Settings";
import SignInBasic from "examples/Authentication/SignInBasic";

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
        route: "/pages/profile/profile-overview",
        component: <ProfileOverview />,
      },
      {
        name: "Settings",
        key: "profile-settings",
        route: "/pages/account/settings",
        component: <Settings />,
      },
      {
        name: "Logout",
        key: "logout",
        route: "/authentication/sign-in/basic",
        component: <SignInBasic />,
      },
    ],
  },
];