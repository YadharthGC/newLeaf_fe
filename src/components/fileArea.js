import { Route, Routes, useNavigate } from "react-router-dom";
import React, { useState } from "react";
import { styled } from "@mui/system";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import { createTheme } from "@mui/material/styles";
import DashboardOutlinedIcon from "@mui/icons-material/DashboardOutlined";
import PeopleAltOutlinedIcon from "@mui/icons-material/PeopleAltOutlined";
import CalendarMonthOutlinedIcon from "@mui/icons-material/CalendarMonthOutlined";
import ScheduleSendTwoToneIcon from "@mui/icons-material/ScheduleSendTwoTone";
import "../CSS/fileArea.css";
import CalendarPage from "./calendarPage";
import AllDetails from "./allDetails";
import Register from "./register";
import DashboardSection from "./dashboardPage";
import EntriesPage from "./entriesPage";
import { handleEmptyValues, themeObj } from "../commonFunctions";
import { useDispatch } from "react-redux";

export default function FileArea() {
  const dispatch = useDispatch();
  const theme = createTheme(themeObj);
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  const handleDrawerOpen = () => {
    console.log("eqwegqwyewy");
    setOpen(true);
  };

  const handleDrawerClose = () => {
    console.log("closing");
    setOpen(false);
  };

  const drawerWidth = 190;

  const openedMixin = (theme) => ({
    width: drawerWidth,
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
    overflowX: "hidden",
    backgroundColor: "white",
  });

  const closedMixin = (theme) => ({
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: "hidden",
    backgroundColor: "#white",
    width: `calc(${theme.spacing(7)} + 1px)`,
    [theme.breakpoints.up("sm")]: {
      width: `calc(${theme.spacing(8)} + 1px)`,
    },
  });

  const DrawerHeader = styled("div")(() => ({
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
    padding: theme.spacing(0, 1),
    ...theme.mixins.toolbar,
  }));

  const StyledDrawer = styled(Drawer, {
    shouldForwardProp: (prop) => prop !== "open",
  })(() => ({
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: "nowrap",
    boxSizing: "border-box",
    ...(open && {
      ...openedMixin(theme),
      "& .MuiDrawer-paper": openedMixin(theme),
    }),
    ...(!open && {
      ...closedMixin(theme),
      "& .MuiDrawer-paper": closedMixin(theme),
    }),
  }));

  return (
    <Box sx={{ display: "flex" }}>
      <StyledDrawer id="leftContentComponent" variant="permanent" open={open}>
        <DrawerHeader>
          {open ? (
            <>
              <span class="material-symbols-outlined" id="spaIcon">
                spa
              </span>
              <span className="ableLyf">AbleLyf</span>
            </>
          ) : (
            ""
          )}
          <IconButton
            onClick={() => {
              if (open) {
                handleDrawerClose();
              } else {
                handleDrawerOpen();
              }
            }}
          >
            {open ? (
              <ChevronRightIcon />
            ) : (
              <MenuIcon
                sx={{
                  color: "black",
                }}
              />
            )}
          </IconButton>
        </DrawerHeader>
        <List>
          <ListItem
            onClick={() => {
              // setComponent("dashboard");
            }}
            key={"dashboard"}
            disablePadding
            sx={{ display: "block" }}
          >
            <ListItemButton
              sx={{
                minHeight: 48,
                justifyContent: open ? "initial" : "center",
                px: 2,
              }}
              onClick={() => {
                handleEmptyValues(dispatch);
                navigate("dashboard");
              }}
            >
              <ListItemIcon
                sx={{
                  minWidth: 0,
                  mr: open ? 3 : "auto",
                  justifyContent: "center",
                  color: "black",
                }}
              >
                <DashboardOutlinedIcon id="dashBoardIcon" />
              </ListItemIcon>
              <ListItemText
                id="dashBoardText"
                primary={"DashBoard"}
                sx={{ opacity: open ? 1 : 0, color: "black", fontSize: "30px" }}
              />
            </ListItemButton>
          </ListItem>
          <ListItem key={"calendar"} disablePadding sx={{ display: "block" }}>
            <ListItemButton
              sx={{
                minHeight: 48,
                justifyContent: open ? "initial" : "center",
                px: 2,
              }}
              onClick={() => {
                handleEmptyValues(dispatch);
                navigate("calendar");
              }}
            >
              <ListItemIcon
                sx={{
                  minWidth: 0,
                  mr: open ? 3 : "auto",
                  justifyContent: "center",
                  color: "black",
                }}
              >
                <CalendarMonthOutlinedIcon id="calendarIcon" />
              </ListItemIcon>
              <ListItemText
                id="calendarText"
                primary={"Attendance"}
                sx={{ opacity: open ? 1 : 0, color: "black" }}
              />
            </ListItemButton>
          </ListItem>

          <ListItem
            onClick={() => {
              handleEmptyValues(dispatch);
              navigate("people");
            }}
            key={"students"}
            disablePadding
            sx={{ display: "block" }}
          >
            <ListItemButton
              sx={{
                minHeight: 48,
                justifyContent: open ? "initial" : "center",
                px: 2,
              }}
            >
              <ListItemIcon
                sx={{
                  minWidth: 0,
                  mr: open ? 3 : "auto",
                  justifyContent: "center",
                  color: "black",
                }}
              >
                <PeopleAltOutlinedIcon id="peopleIcon" />
              </ListItemIcon>
              <ListItemText
                id="peopleText"
                primary={"Students"}
                sx={{ opacity: open ? 1 : 0, color: "black" }}
              />
            </ListItemButton>
          </ListItem>
          <ListItem
            onClick={() => {
              handleEmptyValues(dispatch);
              navigate("entries");
            }}
            key={"students"}
            disablePadding
            sx={{ display: "block" }}
          >
            <ListItemButton
              sx={{
                minHeight: 48,
                justifyContent: open ? "initial" : "center",
                px: 2,
              }}
            >
              <ListItemIcon
                sx={{
                  minWidth: 0,
                  mr: open ? 3 : "auto",
                  justifyContent: "center",
                  color: "black",
                }}
              >
                <ScheduleSendTwoToneIcon id="schedule" />
              </ListItemIcon>
              <ListItemText
                id="peopleText"
                primary={"Students"}
                sx={{ opacity: open ? 1 : 0, color: "black" }}
              />
            </ListItemButton>
          </ListItem>
        </List>
      </StyledDrawer>
      <Box
        id="rightContent"
        component="main"
        sx={{
          flexGrow: 2,
          height: "100vh",
        }}
      >
        <Typography paragraph sx={{ fontFamily: "Nunito Sans, sans-serif" }}>
          <Routes>
            <Route path="/calendar" element={<CalendarPage />} />
            <Route path="/people" element={<AllDetails />} />
            <Route path="/register" element={<Register />} />
            <Route path="/dashboard" element={<DashboardSection />} />
            <Route path="/entries" element={<EntriesPage />} />
          </Routes>
        </Typography>
      </Box>
    </Box>
  );
}
