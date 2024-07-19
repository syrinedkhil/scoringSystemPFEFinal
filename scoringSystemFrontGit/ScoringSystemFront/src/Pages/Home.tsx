import React, { useEffect, useState } from "react";
import {
  styled,
  Menu,
  MenuItem,
  Avatar,
  Tooltip,
  Toolbar,
  Divider,
  List,
  Typography,
  IconButton,
  CssBaseline,
  Box,
} from "@mui/material";
import MuiDrawer from "@mui/material/Drawer";
import MuiAppBar, { AppBarProps as MuiAppBarProps } from "@mui/material/AppBar";

import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import DashboardIcon from "@mui/icons-material/Dashboard";
import ArticleIcon from "@mui/icons-material/Article";
import NewspaperIcon from "@mui/icons-material/Newspaper";
import FeedIcon from "@mui/icons-material/Feed";

import { Link } from "react-router-dom";
import { useNavigate, Outlet } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

const drawerWidth: number = 240;


export default function Home() {
  const navigate = useNavigate();
  const accessToken = localStorage.getItem("accessToken");
  const [homeDrawerOpen, setHomeDrawerOpen] = useState(false);
  const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null);
  const [userRole, setUserRole] = useState("");

  useEffect(() => {
    checkUserRole();
  }, []);

  useEffect(() => {
    if (!accessToken) {
      navigate("/signin");
    } else {
      if (userRole === "client") {
        navigate("/feed");
      } else {
        navigate("/search");
      }
    }
  }, [userRole]);
  const checkUserRole = () => {
    if (accessToken) {
      const DecodeToken = jwtDecode(accessToken);

      if (DecodeToken) {
        let clientRole = false;
        let reviewerRole = false;
        let adminRole = false;

        for (const key in DecodeToken) {
          if (key === "Client") {
            clientRole = true;
            break;
          } else if (key === "Admin") {
            adminRole = true;
            break;
          } else if (key === "Reviewer") {
            reviewerRole = true;
            break;
          }
        }

        if (clientRole) {
          setUserRole("client");
        } else if (adminRole) {
          setUserRole("Admin");
        } else {
          if (reviewerRole) {
            setUserRole("Reviewer");
          }
        }
      }
    }
  };
  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };
  const handleClickUserMenu = () => {};

  const handleLogout = () => {
    localStorage.removeItem("accessToken");
    navigate("/signin");
  };

  const toggleDrawer = () => {
    setHomeDrawerOpen(!homeDrawerOpen);
  };

  return (
    <div>
      <Box sx={{ display: "flex" }}>
        <CssBaseline />
        <AppBar position="absolute" open={homeDrawerOpen}>
          <Toolbar
            sx={{
              pr: "24px",
            }}
          >
            <IconButton
              edge="start"
              color="inherit"
              aria-label="open drawer"
              onClick={toggleDrawer}
              sx={{
                marginRight: "36px",
                ...(homeDrawerOpen && { display: "none" }),
              }}
            >
              <MenuIcon />
            </IconButton>

            <Typography
              component="h1"
              variant="h6"
              color="inherit"
              noWrap
              sx={{ flexGrow: 1 }}
            >
              Scoring System
            </Typography>

            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar alt="Remy Sharp" src="/static/images/avatar/2.jpg" />
              </IconButton>
            </Tooltip>

            <Menu
              sx={{ mt: "45px" }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
             
              <MenuItem onClick={handleLogout}>
                <Typography textAlign="center">Logout</Typography>
              </MenuItem>
            </Menu>
          </Toolbar>
        </AppBar>
        <Drawer variant="permanent" open={homeDrawerOpen}>
          <Toolbar
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "flex-end",
              px: [1],
            }}
          >
            <IconButton onClick={toggleDrawer}>
              <ChevronLeftIcon />
            </IconButton>
          </Toolbar>
          <Divider />
          <List component="nav">
            {userRole === "Admin" && (
              <>
                <ListItemButton component={Link} to="/home">
                  <ListItemIcon>
                    <DashboardIcon />
                  </ListItemIcon>
                  <ListItemText primary="Dashboard" />
                </ListItemButton>
                <ListItemButton component={Link} to="/score">
                  <ListItemIcon>
                    <ArticleIcon />
                  </ListItemIcon>
                  <ListItemText primary="Score" />
                </ListItemButton>

                <ListItemButton component={Link} to="/search">
                  <ListItemIcon>
                    <NewspaperIcon />
                  </ListItemIcon>
                  <ListItemText primary="Search the web" />
                </ListItemButton>
              </>
            )}
            {userRole === "Reviewer" && (
              <>
              
                <ListItemButton component={Link} to="/score">
                  <ListItemIcon>
                    <ArticleIcon />
                  </ListItemIcon>
                  <ListItemText primary="Score" />
                </ListItemButton>

                <ListItemButton component={Link} to="/search">
                  <ListItemIcon>
                    <NewspaperIcon />
                  </ListItemIcon>
                  <ListItemText primary="Search the web" />
                </ListItemButton>
              </>
            )}

            {userRole === "client" && (
              <ListItemButton component={Link} to="/feed">
                <ListItemIcon>
                  <FeedIcon />
                </ListItemIcon>
                <ListItemText primary="News feed" />
              </ListItemButton>
            )}
          </List>
        </Drawer>
        <Box
          component="main"
          sx={{
            backgroundColor: (theme) =>
              theme.palette.mode === "light"
                ? theme.palette.grey[100]
                : theme.palette.grey[900],
            flexGrow: 1,
            height: "100vh",
            overflow: "auto",
          }}
        >
          <Toolbar />

          <main>
            <Outlet />
          </main>
        </Box>
      </Box>
    </div>
  );
}

interface AppBarProps extends MuiAppBarProps {
  open?: boolean;
}

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})<AppBarProps>(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(["width", "margin"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  "& .MuiDrawer-paper": {
    position: "relative",
    whiteSpace: "nowrap",
    width: drawerWidth,
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
    boxSizing: "border-box",
    ...(!open && {
      overflowX: "hidden",
      transition: theme.transitions.create("width", {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
      width: theme.spacing(7),
      [theme.breakpoints.up("sm")]: {
        width: theme.spacing(9),
      },
    }),
  },
}));
