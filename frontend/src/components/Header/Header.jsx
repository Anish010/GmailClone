import React from "react";
import { AppBar, Avatar, Box, InputBase, Toolbar, styled } from "@mui/material";
import {
  Menu as MenuIcon,
  Search,
  Tune,
  HelpOutlineOutlined,
  SettingsOutlined,
  AppsOutlined,
} from "@mui/icons-material";
import "./Header.css";
import { gmailLogo } from "../../constants/constants";

const StyledAppBar = styled(AppBar)({
  backgroundColor: "#F6F8FC",
  boxShadow: "none",
  minHeight: "4rem !important",
});

const SearchWrapper = styled(Box)({
  backgroundColor: "#EAF1FB",
  marginLeft: "5.2rem",
  borderRadius: 30,
  minWidth: "46.6%",
  minHeight: "3rem",
  display: "flex",
  alignItems: "center",
  padding: "0 0.8rem",
  "& > div": {
    paddingRight: "0.5rem",
  },
  "&:placeholder": {
    color: "#5F6368",
  },
});

const OptionsWrapper = styled(Box)({
  width: "100%",
  display: "flex",
  justifyContent: "flex-end",
  alignItems: "center",
  gap: "1rem",
});

const Header = ({ toggleDrawer }) => {
  return (
    <StyledAppBar position="static">
      <Toolbar>
        <MenuIcon
          sx={{ color: "#5F6368", cursor: "pointer" }}
          onClick={toggleDrawer}
        />
        <Box className="gmail-icon" style={{ display: "flex" }}>
          <img className="gmail-logo-img" src={gmailLogo} alt="logo" />
        </Box>

        <SearchWrapper>
          <Search sx={{ color: "#444746" }} />
          <InputBase
            sx={{ ml: 1, flex: 1 }}
            placeholder="Search mail"
            inputProps={{ "aria-label": "search mail" }}
          />
          <Tune sx={{ color: "#444746" }} />
        </SearchWrapper>
        <OptionsWrapper>
          <HelpOutlineOutlined color="action" />
          <span className="material-symbols-sharp" style={{ color: "#5F6368" }}>
            settings
          </span>
          <span className="material-symbols-sharp" style={{ color: "#5F6368" }}>
            apps
          </span>
          <Avatar className="avatar-icon" />
        </OptionsWrapper>
      </Toolbar>
    </StyledAppBar>
  );
};

export default Header;
