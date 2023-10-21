import React from "react";
import { Link, NavLink } from "react-router-dom";
import { useSelector } from "react-redux";

const Sidenav = () => {
  const user = useSelector((state) => state.authReducer.activeUser);
  return (
    <div>
      <aside className="main-sidebar sidebar-dark-primary elevation-4">
        {/* Brand Logo */}
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
            <span className="brand-text font-weight-light">Muawin</span>
          </Link>
        </div>

        {/* Sidebar */}
        <div className="sidebar">
          {/* Sidebar user panel (optional) */}
          <div className="user-panel mt-3 pb-3 mb-3 d-flex">
            <div className="image">
              <img
                src="dist/img/user.png"
                className="img-circle elevation-2"
                alt="User Image"
              />
            </div>
            <div className="info">
              <Link href="/profile" className="d-block">
                {user.firstName} {user.lastName}
              </Link>
            </div>
          </div>
          {/* SidebarSearch Form */}
          <div className="form-inline">
            <div className="input-group" data-widget="sidebar-search">
              <input
                className="form-control form-control-sidebar"
                type="search"
                placeholder="Search"
                aria-label="Search"
              />
              <div className="input-group-append">
                <button className="btn btn-sidebar">
                  <i className="fas fa-search fa-fw" />
                </button>
              </div>
            </div>
          </div>
          {/* Sidebar Menu */}
          <nav className="mt-2">
            <ul
              className="nav nav-pills nav-sidebar flex-column"
              data-widget="treeview"
              role="menu"
              data-accordion="false"
            >
              {/* Add icons to the links using the .nav-icon class
         with font-awesome or any other icon font library */}
              <div className="nav-item">
                <Link to="/dashboard" className="nav-link active">
                  <i className="nav-icon fas fa-tachometer-alt" />
                  <p>Dashboard</p>
                </Link>
              </div>

              <li className="nav-header">MUAWIN</li>
              <li className="nav-item">
                <a href="#" className="nav-link">
                  <i className="nav-icon far fa-image" />
                  <p>Member Management</p>
                  <i className="fas fa-angle-left right" />
                </a>
                <ul class="nav nav-treeview">
                  <li class="nav-item">
                    <Link to="/MemberManagement" class="nav-link">
                      <i class="far fa-circle nav-icon"></i>
                      <p>Add Member</p>
                    </Link>
                  </li>
                  <li class="nav-item">
                    <Link to="/directory" class="nav-link">
                      <i class="far fa-circle nav-icon"></i>
                      <p>Member Directory</p>
                    </Link>
                  </li>
                </ul>
              </li>
              <li className="nav-item">
                <a href="#" className="nav-link">
                  <i className="nav-icon fas fa-columns" />
                  <p>Program & Circulation</p>
                  <i className="fas fa-angle-left right" />
                </a>
                <ul class="nav nav-treeview">
                  <li class="nav-item">
                    <Link to="/addevent" class="nav-link">
                      <i class="far fa-circle nav-icon"></i>
                      <p>Add Event</p>
                    </Link>
                  </li>

                  <li class="nav-item">
                    <Link to="/eventdirectory" class="nav-link">
                      <i class="far fa-circle nav-icon"></i>
                      <p>Event Directory</p>
                    </Link>
                  </li>
                </ul>
              </li>
              <li className="nav-item">
                <Link to="/reports" className="nav-link">
                  <i class="nav-icon fas fa-edit"></i>
                  <p>Reports and Analytics</p>
                </Link>
              </li>
              <li className="nav-item has-treeview">
                <a href="#" className="nav-link">
                  <i className="nav-icon far fa-envelope" />
                  <p>
                    Mailbox
                    <i className="fas fa-angle-left right" />
                  </p>
                </a>
                <ul className="nav nav-treeview">
                  <li className="nav-item">
                    <a href="/inbox" className="nav-link">
                      <i className="far fa-circle nav-icon" />
                      <p>Inbox</p>
                    </a>
                  </li>
                  <li className="nav-item">
                    <a href="/compose" className="nav-link">
                      <i className="far fa-circle nav-icon" />
                      <p>Compose</p>
                    </a>
                  </li>
                </ul>
              </li>
              <li className="nav-item">
                <a href="/donations" className="nav-link">
                  <i class="nav-icon fas fa-tree"></i>
                  <p>Donations</p>
                </a>
              </li>
              <li className="nav-item">
                <a href="/literature" className="nav-link">
                  <i class="nav-icon fas fa-file"></i>
                  <p>Literature</p>
                </a>
              </li>
              <li className="nav-item">
                <a href="/config" className="nav-link">
                  <i class="nav-icon far fa-plus-square"></i>
                  <p>Configuration</p>
                </a>
              </li>
            </ul>
          </nav>
          {/* /.sidebar-menu */}
        </div>
        {/* /.sidebar */}
      </aside>
    </div>
  );
};

export default Sidenav;
