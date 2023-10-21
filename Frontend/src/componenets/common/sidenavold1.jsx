import * as React from "react";
import { useTheme } from "@mui/material/styles";
import Divider from "@mui/material/Divider";
import { Sidebar, Menu, MenuItem, SubMenu } from "react-pro-sidebar";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

export default function Sidenav() {
  const user = useSelector((state) => state.authReducer.activeUser);

  return (
    <div>
      <aside
        className="main-sidebar"
        style={{
          width: "249px",
          backgroundColor: "#343a40",
          height: "100%",
        }}
      >
        <Sidebar
          backgroundColor="#343a40"
          rootStyles={{ color: "rgb(194, 199, 208)", height: "100%" }}
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
          <div className="user-panel ml-2 mt-3 mb-3 d-flex">
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
          <Divider variant="middle" sx={{ backgroundColor: "gray" }} />

          <span className="nav-header" style={{ marginLeft: 20, marginTop: 5 }}>
            MUAWIN
          </span>
          <Menu
            menuItemStyles={{
              button: ({ level, active, disabled }) => {
                // only apply styles on first level elements of the tree
                if (level === 0)
                  return {
                    backgroundColor: active ? "#eecef9" : undefined,
                    "&:hover": {
                      backgroundColor: "rgba(255,255,255,.1)",
                      color: "white",
                    },
                  };
               
              },
            }}
          >
            <SubMenu
              label="Member Management"
              icon={<i className="nav-icon far fa-image" />}
            >
              <MenuItem component={<Link to="/membermanagement" />}>
                {" "}
                Add Member{" "}
              </MenuItem>
              <MenuItem component={<Link to="/directory" />}>
                {" "}
                Member Directory{" "}
              </MenuItem>
            </SubMenu>
            <MenuItem> Documentation </MenuItem>
            <MenuItem> Calendar </MenuItem>
          </Menu>
        </Sidebar>
      </aside>
    </div>
  );
}
