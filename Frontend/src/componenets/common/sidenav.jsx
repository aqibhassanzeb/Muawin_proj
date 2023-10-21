import * as React from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import colorConfigs from "../../configs/colorConfigs";
import appRoutes from "../../routes/appRoutes";
import SidebarItem from "./SidebarItem";
import SidebarItemCollapse from "./SidebarItemCollapse";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  handleDrawerClose,
  handleDrawerOpen,
} from "../../redux/reducers/appStateSlice";
import useMediaQuery from "@mui/material/useMediaQuery";

const drawerWidth = 245;

export default function PersistentDrawerLeft() {
  const user = useSelector((state) => state.authReducer.activeUser);
  const { open } = useSelector((state) => state.appState);
  const isMobile = useMediaQuery("(max-width:600px)");

  const dispatch = useDispatch();

  React.useEffect(() => {
    if (isMobile) {
      dispatch(handleDrawerClose());
    } else {
      dispatch(handleDrawerOpen());
    }
  }, [isMobile]);

  return (
    <Box sx={{ display: "flex", backgroundColor: "#343a40" }}>
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: drawerWidth,
            boxSizing: "border-box",
            backgroundColor: "#343a40",
            color: colorConfigs.sidebar.color,
          },
        }}
        variant="persistent"
        anchor="left"
        open={open}
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
            <span style={{ marginLeft: 50 }}>
              <IconButton onClick={() => dispatch(handleDrawerClose())}>
                <ChevronLeftIcon sx={{ color: "white" }} />
              </IconButton>
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
    </Box>
  );
}
