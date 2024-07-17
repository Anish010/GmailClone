import { Box, Button, List, ListItem, styled, Typography } from "@mui/material";
import React, { useState } from "react";
import { CreateOutlined } from "@mui/icons-material";
import { SIDEBAR_DATA } from "../../config/sidebar.config";
import ComposeMail from "../ComposeMail/ComposeMail";
import { useParams, NavLink } from "react-router-dom";
import { routes } from "../../routes/routes";

const ComposeButton = styled(Button)({
  backgroundColor: "#C2E7FF",
  color: "#001D35",
  textTransform: "none",
  marginLeft: "0.5rem",
  padding: "1rem 0",
  width: "61%",
  borderRadius: "16px",
  display: "flex",
  justifyContent: "space-evenly",
  "& > p ": {
    margin: "0 6px 0 0",
    fontSize: 14,
    fontWeight: "500",
  },
  "&:hover": {
    backgroundColor: "#C2E7FF",
    border: "none",
    boxShadow: "0px 2px 4px rgba(0,0,0,0.24)",
  },
  "&:after": {
    border: "none",
  },
});

const Container = styled(Box)({
  padding: "0 1rem 1rem 0",
  "& > ul": {
    paddingTop: "10px",
    fontSize: 14,
    fontWeight: 500,
    cursor: "pointer",
    "& > a": {
      textDecoration: "none",
      color: "inherit",
    },
  },
  "& > ul > a > li > span": {
    marginRight: "1rem",
    fontSize: "1.2rem",
  },
});

const SidebarContent = () => {
  const [openDialog, setOpenDialog] = useState(false);
  const { type } = useParams();

  const onComposeClick = () => {
    setOpenDialog(true);
  };
  return (
    <>
      <Container>
        <ComposeButton onClick={() => onComposeClick()}>
          <span
            className="material-symbols-rounded"
            style={{ color: "#000000"  }}>
            edit
          </span>
          <Typography>Compose</Typography>
        </ComposeButton>
        <List>
          {SIDEBAR_DATA.map((data, index) => (
            <NavLink key={data.name} to={`${routes.emails.path}/${data.name}`}>
              <ListItem
                key={data.name}
                style={
                  type === data.name.toLowerCase()
                    ? {
                        backgroundColor: "#D3E3FD",
                        borderRadius: "0 16px 16px 0",
                      }
                    : {}
                }>
                {/* <data.icon /> */}
                <span className="material-symbols-sharp">{data.icon}</span>
                {data.title}
              </ListItem>
            </NavLink>
          ))}
        </List>
        <ComposeMail setOpenDialog={setOpenDialog} openDialog={openDialog} />
      </Container>
    </>
  );
};

export default SidebarContent;
