export const adminRoutes = [
  {
    path: "/dashboard",
    name: "Dashboard",
    icon: <i className="nav-icon fas fa-tachometer-alt" />,
  },
  {
    path: "/users",
    name: "Member Management",
    icon: <i className="nav-icon far fa-image" />,
    subRoutes: [
      {
        path: "/membermanagement",
        name: "Add Member",
        icon: <i className="far fa-circle nav-icon" />,
      },
      {
        path: "/admin-directory",
        name: "Member Directory",
        icon: <i className="far fa-circle nav-icon" />,
      },
    ],
  },
  {
    path: "/events",
    name: "Program & Circulation",
    icon: <i className="nav-icon fas fa-columns" />,
    exact: true,
    subRoutes: [
      {
        path: "/addevent",
        name: "Add Event ",
        icon: <i className="far fa-circle nav-icon" />,
      },
      {
        path: "/admin-event-directory",
        name: "Events Directory",
        icon: <i className="far fa-circle nav-icon" />,
      },
    ],
  },
  {
    path: "/reports",
    name: "Reports and Analytics",
    icon: <i class="nav-icon fas fa-edit"></i>,
  },
  {
    path: "/donations",
    name: "Donations",
    icon: <i class="nav-icon fas fa-tree"></i>,
  },
  {
    path: "/literature",
    name: "Literature",
    icon: <i class="nav-icon fas fa-file"></i>,
  },
  {
    path: "/config",
    name: "Configuration",
    icon: <i class="nav-icon far fa-plus-square"></i>,
  },
];

export const rukanRoutes = [
  {
    path: "/dashboard",
    name: "Dashboard",
    icon: <i className="nav-icon fas fa-tachometer-alt" />,
  },
  {
    path: "/users",
    name: "Muawin Management",
    icon: <i className="nav-icon far fa-image" />,
    subRoutes: [
      {
        path: "/membermanagement",
        name: "Add Muawin",
        icon: <i className="far fa-circle nav-icon" />,
      },
      {
        path: "/directory",
        name: "Muawin's Directory",
        icon: <i className="far fa-circle nav-icon" />,
      },
    ],
  },
  {
    path: "/events",
    name: "Program & Circulation",
    icon: <i className="nav-icon fas fa-columns" />,
    exact: true,
    subRoutes: [
      {
        path: "/addevent",
        name: "Add Event ",
        icon: <i className="far fa-circle nav-icon" />,
      },
      {
        path: "/eventdirectory",
        name: "Events Directory",
        icon: <i className="far fa-circle nav-icon" />,
      },
    ],
  },
  {
    path: "/reports",
    name: "Reports and Analytics",
    icon: <i class="nav-icon fas fa-edit"></i>,
  },
  {
    path: "/donations",
    name: "Donations",
    icon: <i class="nav-icon fas fa-tree"></i>,
  },
  {
    path: "/literature",
    name: "Literature",
    icon: <i class="nav-icon fas fa-file"></i>,
  },
];

export const muawinRoutes = [
  {
    path: "/dashboard",
    name: "Dashboard",
    icon: <i className="nav-icon fas fa-tachometer-alt" />,
  },

  {
    path: "/events",
    name: "Program & Circulation",
    icon: <i className="nav-icon fas fa-columns" />,
    exact: true,
    subRoutes: [
      //   {
      //     path: "/addevent",
      //     name: "Add Event ",
      //     icon: <i className="far fa-circle nav-icon" />,
      //   },
      {
        path: "/muawin-event-directory",
        name: "Events Directory",
        icon: <i className="far fa-circle nav-icon" />,
      },
    ],
  },
  {
    path: "/reports",
    name: "Reports and Analytics",
    icon: <i class="nav-icon fas fa-edit"></i>,
  },
  {
    path: "/donations",
    name: "Donations",
    icon: <i class="nav-icon fas fa-tree"></i>,
  },
  {
    path: "/literature",
    name: "Literature",
    icon: <i class="nav-icon fas fa-file"></i>,
  },
];
