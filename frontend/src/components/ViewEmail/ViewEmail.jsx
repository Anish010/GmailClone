import { ArrowBack } from "@mui/icons-material";
import { Box, Typography } from "@mui/material";
import React from "react";
import { useOutletContext, useLocation } from "react-router-dom";
import { emptyProfilePic } from "../../assets/constants";

const ViewEmail = () => {
  const { openDrawer } = useOutletContext();
  const { state } = useLocation();
  const { email } = state;

  return (
    <Box
      style={
        openDrawer ? { marginLeft: "17%", width: "100%" } : { width: "100%" }
      }>
      <Box>
        <ArrowBack
          style={{ cursor: "pointer" }}
          onClick={() => window.history.back()}
          color="action"
          fontSize="small"
        />
        <span
          className="material-symbols-outlined"
          style={{ cursor: "pointer", marginLeft: "3rem", fontSize: "1.2rem" }}>
          delete
        </span>
      </Box>
      <Typography>{email.subject}</Typography>
      <Box>
        <img src={emptyProfilePic} alt="profile picture" />
        <Box>
          <Box>
            <Typography>
              {email.name}
              <Box component="span">&nbsp;&#60;{email.to}&#62;</Box>
            </Typography>
            <Box>
              {new window.Date(email.date).getDate()}&nbsp;
              {new window.Date(email.date).toLocaleString("default", {
                month: "long",
              })}&nbsp;
              {new window.Date(email.data).getFullYear()}
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default ViewEmail;
