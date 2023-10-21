import { Avatar, Divider, Drawer, List, Stack, Toolbar } from "@mui/material";
// import assets from "../../assets";
import colorConfigs from "../../configs/colorConfigs";
import sizeConfigs from "../../configs/sizeConfigs";
import appRoutes from "../../routes/appRoutes";
import SidebarItem from "./SidebarItem";
import SidebarItemCollapse from "./SidebarItemCollapse";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

const Sidenav = ({ open }) => {
  const user = useSelector((state) => state.authReducer.activeUser);

  return (
    <Drawer
      variant="permanent"
      sx={{
        // display: open ? "block" : "none",
        // transition: "all 0.5s ease",
        width: sizeConfigs.sidebar.width,
        flexShrink: 0,
        "& .MuiDrawer-paper": {
          width: sizeConfigs.sidebar.width,
          boxSizing: "border-box",
          borderRight: "0px",
          backgroundColor: colorConfigs.sidebar.bg,
          color: colorConfigs.sidebar.color,
        },
      }}
    >
      <div>
        <Link to="/dashboard" className="brand-link">
          <div>
            <img
              src="dist/img/MuawinLogoWhite.png"
              alt="Admin Logo"
              className="brand-image img-circle elevation-3"
              style={{ opacity: ".8" }}
            />
          </div>
          <span
            className="brand-text font-weight-light "
            style={{ color: "rgb(194, 199, 208)" }}
          >
            Muawin
          </span>
        </Link>
      </div>
      <Divider sx={{ backgroundColor: "gray" }} variant="middle" />
      <div
        className="user-panel ml-2 mt-3 mb-3 d-flex"
        style={{ minHeight: 35 }}
      >
        <div className="image">
          <img
            src="dist/img/user.png"
            className="img-circle elevation-2"
            alt="User Image"
          />
        </div>
        <div className="info">
          <Link
            href="/profile"
            className="d-block"
            style={{ color: "rgb(194, 199, 208)" }}
          >
            {user.firstName} {user.lastName}
          </Link>
        </div>
      </div>
      <Divider
        variant="middle"
        sx={{ backgroundColor: "gray", marginBottom: "10px" }}
      />

      <div
        className="bg-blue d-flex mx-3 px-2"
        style={{ borderRadius: 4, marginTop: 10 }}
      >
        <Link
          to="/dashboard"
          className="d-flex"
          style={{ gap: 10, height: 35 }}
        >
          <i className="nav-icon fas fa-tachometer-alt mt-2 ml-3 " />
          <p className="mt-1">Dashboard</p>
        </Link>
      </div>
      <span
        className="nav-header"
        style={{ marginLeft: 20, padding: "10px 0px" }}
      >
        MUAWIN
      </span>
      <List disablePadding>
        {appRoutes.map((route, index) =>
          route.sidebarProps ? (
            route.child ? (
              <SidebarItemCollapse item={route} key={index} />
            ) : (
              <SidebarItem item={route} key={index} />
            )
          ) : null
        )}
      </List>
    </Drawer>
  );
};

export default Sidenav;
